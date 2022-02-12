import { Router, Request, Response, NextFunction } from 'express'
import { CartsResultMessage } from '../../messages/cart.messages'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CartReadDto } from './dtos/cart-read.dto';
import cartController from './cart.controller';

const cartsRouter = Router()

cartsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carts: CartReadDto[] = await cartController.getAll()
        res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, carts))
    } catch (error) {
        console.log(res)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

cartsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cart: CartReadDto = await cartController.get(parseInt(req.params.id))
        res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, cart))
    } catch (error) {
        console.log(res)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

cartsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cart: CartReadDto = await cartController.create(req.body)
        res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, cart))
    } catch (error) {
        console.log(res)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

cartsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cart: CartReadDto = await cartController.update(req.body, parseInt(req.params.id))
        res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, cart))
    } catch (error) {
        console.log(res)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

cartsRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, null))
    } catch (error) {
        console.log(res)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

export default cartsRouter