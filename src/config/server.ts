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
                await this.connectDb()
                console.log('conectado a la base de datos mongo')
            } catch (error) {
                console.log(error.message)
            }
        })
    }

    async connectDb() {
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