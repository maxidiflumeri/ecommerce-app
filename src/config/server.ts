import express, { Application } from "express"
import productsRouter from "../modules/products/product.routes"
import cartsRouter from "../modules/cart/cart.routes"
import morgan from 'morgan'
import configService from "./config.service"
import { Configuration } from "./config.key"

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
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening on port ${this.app.get('port')}`)
        })
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