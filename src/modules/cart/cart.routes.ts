import { Router, Request, Response, NextFunction } from 'express'
import cartController from './cart.controller';

const cartsRouter = Router()

cartsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.getAll(req, res, next)
})

cartsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.get(req, res, next)
})

cartsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.create(req, res, next)
})

cartsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.update(req, res, next)
})

cartsRouter.put('/:id_cart/product/:id_product', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.deleteProduct(req, res, next)
})

cartsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await cartController.delete(req, res, next)
})

export default cartsRouter