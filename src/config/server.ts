import express, { Application } from "express"
import productsRouter from "../modules/products/product.routes"
import cartsRouter from "../modules/cart/cart.routes"
import morgan from 'morgan'
import configService from "./config.service"
import { Configuration } from "./config.key"
import { connect } from 'mongoose'

const PORT = configService.get(Configuration.PORT) || process.env.PORT
class Server {
    public app: Application

    constructor() {
        this.app = express()
        this.initializeSetters()
        this.initializeMiddleares()
        this.initializeRoutes()
    }

    public listen() {
        this.app.listen(this.app.get('port'), async () => {
            try {
                console.log(`Server listening on port ${this.app.get('port')}`)
                if (configService.get(Configuration.DB_TYPE) == 'MONGO') {
                    await this.connectDbMongo()
                    console.log('connect to Mongo database successfully')
                } else if (configService.get(Configuration.DB_TYPE) == 'FIREBASE') {
                    console.log('connect to Firebase database successfully')
                } else if (configService.get(Configuration.DB_TYPE) == 'FILE') {
                    console.log('connect to File database successfully')
                } else {
                    console.log('connect to Mongo database successfully')
                }
            } catch (error) {
                console.log(error.message)
            }
        })
    }

    async connectDbMongo() {
        await connect(configService.get(Configuration.MONGO_CONNECTION));
    }

    private initializeMiddleares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('dev'))
    }

    private initializeRoutes() {
        this.app.use('/api/products', productsRouter)
        this.app.use('/api/carts', cartsRouter)
    }

    private initializeSetters() {
        this.app.set('port', PORT)
    }
}

export default new Server()