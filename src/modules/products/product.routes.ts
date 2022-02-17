import { Router, Request, Response, NextFunction } from 'express'
import ProductsController from './product.controller';

const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await ProductsController.getAll(req, res, next)
})

productsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await ProductsController.get(req, res, next)
})

productsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await ProductsController.create(req, res, next)
})

productsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await ProductsController.update(req, res, next)
})

productsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await ProductsController.delete(req, res, next)
})

export default productsRouter