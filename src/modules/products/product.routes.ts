import { Router, Request, Response, NextFunction } from 'express'
import { ProductResultMessage } from '../../messages/products.messages'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import ProductsController from './product.controller';
import { ProductReadDto } from './dtos/product-read.dto';

const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products: ProductReadDto[] = await ProductsController.getAll()
        res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, products))
    } catch (error) {        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

productsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product: ProductReadDto = await ProductsController.get(parseInt(req.params.id))
        res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, product))
    } catch (error) {         
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

productsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product: ProductReadDto = await ProductsController.create(req.body)
        res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, product))
    } catch (error) {        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

productsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productUpdated: ProductReadDto = await ProductsController.update(req.body, parseInt(req.params.id))
        res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, productUpdated))
    } catch (error) {        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

productsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await ProductsController.delete(parseInt(req.params.id))
        res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, null))
    } catch (error) {        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
    }
    next()
})

export default productsRouter