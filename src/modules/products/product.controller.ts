import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ProductResultMessage } from '../../messages/products.messages';
import { ProductCreateDto } from "./dtos/product-create.dto";
import { ProductReadDto } from "./dtos/product-read.dto";
import { ProductUpdateDto } from './dtos/product-update.dto';
import ProductService from './product.service'

const productService: ProductService = new ProductService('products')

class ProductController {
    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(StatusCodes.BAD_REQUEST).json(new ProductResultMessage(StatusCodes.BAD_REQUEST, 'Product id parameter must be required.', null))
            }

            const product: ProductReadDto = await productService.getById(parseInt(req.params.id))

            if (!product) {
                res.status(StatusCodes.NOT_FOUND).json(new ProductResultMessage(StatusCodes.NOT_FOUND, 'Product not found.', null))
            } else {
                res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, product))
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products: ProductReadDto[] = await productService.getAll()
            res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, products))
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productCreate: ProductCreateDto = plainToClass(ProductCreateDto, req.body)
            const errors = await validate(productCreate, { skipMissingProperties: true })

            if (errors.length > 0) {
                const messages: string = this.validateErrors(errors)
                res.status(StatusCodes.CONFLICT).json(new ProductResultMessage(StatusCodes.CONFLICT, messages, null))
            } else {
                const productCreated: ProductReadDto = await productService.create(req.body)
                res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, productCreated))
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.params) {
                res.status(StatusCodes.BAD_REQUEST).json(new ProductResultMessage(StatusCodes.BAD_REQUEST, 'Product id parameter must be required.', null))
            }

            const productUpdate: ProductUpdateDto = plainToClass(ProductUpdateDto, req.body)
            const errors = await validate(productUpdate, { skipMissingProperties: true })

            if (errors.length > 0) {
                const messages: string = this.validateErrors(errors)
                res.status(StatusCodes.CONFLICT).json(new ProductResultMessage(StatusCodes.CONFLICT, messages, null))
            } else {
                const productUpdated: ProductReadDto = await productService.update(parseInt(req.params.id), req.body)
                if (!productUpdated) {
                    res.status(StatusCodes.NOT_FOUND).json(new ProductResultMessage(StatusCodes.NOT_FOUND, 'Product not found.', null))
                } else {
                    res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, productUpdated))
                }
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(StatusCodes.BAD_REQUEST).json(new ProductResultMessage(StatusCodes.BAD_REQUEST, 'Product id parameter must be required.', null))
            }

            const deleted: Boolean = await productService.deleteById(parseInt(req.params.id))

            if (!deleted) {
                res.status(StatusCodes.NOT_FOUND).json(new ProductResultMessage(StatusCodes.NOT_FOUND, 'Product not found.', null))
            } else {
                res.status(StatusCodes.OK).json(new ProductResultMessage(StatusCodes.OK, ReasonPhrases.OK, null))
            }

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ProductResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    private validateErrors(errors): string {
        let stringResult = ''

        for (const errorItem of errors) {
            stringResult = stringResult + errorItem.constraints.isDefined + ', '
        }
        return stringResult
    }
}

export default new ProductController()