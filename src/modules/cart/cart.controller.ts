import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CartsResultMessage } from '../../messages/cart.messages';
import { ProductReadDto } from '../products/dtos/product-read.dto';
import ProductService from '../products/product.service';

import CartService from "./cart.service";
import { CartAddProductDto } from './dtos/cart-add-product.dto';
import { CartUpdateDto } from './dtos/cart-update.dto';
import { CartCreateDto } from './dtos/cart-create.dto';
import { CartReadDto } from "./dtos/cart-read.dto";

const cartService = new CartService('carts')
class CartController {
    public productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }

    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(StatusCodes.BAD_REQUEST).json(new CartsResultMessage(StatusCodes.BAD_REQUEST, 'Cart id parameter must be required.', null))
            }

            const cart: CartReadDto = await cartService.getById(parseInt(req.params.id))

            if (!cart) {
                res.status(StatusCodes.NOT_FOUND).json(new CartsResultMessage(StatusCodes.NOT_FOUND, 'Cart not found.', null))
            } else {
                res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, cart))
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let carts: CartReadDto[] = await cartService.getAll()
            res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, carts))
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cartCreate: CartCreateDto = plainToClass(CartCreateDto, req.body)
            const errors = await validate(cartCreate, { skipMissingProperties: true })

            if (errors.length > 0) {
                const messages: string = this.validateErrors(errors)
                res.status(StatusCodes.CONFLICT).json(new CartsResultMessage(StatusCodes.CONFLICT, messages, null))
            } else {
                const cartAddProduct: CartAddProductDto = plainToClass(CartAddProductDto, cartCreate.products[0])
                const errorsProduct = await validate(cartAddProduct, { skipMissingProperties: true })
                if (errorsProduct.length > 0) {
                    const messagesProduct: string = this.validateErrors(errorsProduct)
                    res.status(StatusCodes.CONFLICT).json(new CartsResultMessage(StatusCodes.CONFLICT, messagesProduct, null))
                } else {
                    const product: ProductReadDto = await this.productService.getById(cartAddProduct.idProduct)
                    if (!product) {
                        res.status(StatusCodes.NOT_FOUND).json(new CartsResultMessage(StatusCodes.NOT_FOUND, 'Product id not found.', null))
                    } else {
                        if (product.stock < cartAddProduct.amount) {
                            res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.CONFLICT, 'stock is les than amount.', null))
                        } else {
                            const cartCreated: CartReadDto = await cartService.create(cartCreate)
                            res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, cartCreated))
                        }
                    }
                }
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.params) {
                res.status(StatusCodes.BAD_REQUEST).json(new CartsResultMessage(StatusCodes.BAD_REQUEST, 'Cart id parameter must be required.', null))
            }

            const cartUpdate: CartUpdateDto = plainToClass(CartUpdateDto, req.body)
            const errors = await validate(cartUpdate, { skipMissingProperties: true })

            if (errors.length > 0) {
                const messages: string = this.validateErrors(errors)
                res.status(StatusCodes.CONFLICT).json(new CartsResultMessage(StatusCodes.CONFLICT, messages, null))
            } else {
                const cartAddProduct: CartAddProductDto = plainToClass(CartAddProductDto, cartUpdate.products[0])
                const errorsProduct = await validate(cartAddProduct, { skipMissingProperties: true })
                if (errorsProduct.length > 0) {
                    const messagesProduct: string = this.validateErrors(errorsProduct)
                    res.status(StatusCodes.CONFLICT).json(new CartsResultMessage(StatusCodes.CONFLICT, messagesProduct, null))
                } else {
                    const product: ProductReadDto = await this.productService.getById(cartAddProduct.idProduct)
                    if (!product) {
                        res.status(StatusCodes.NOT_FOUND).json(new CartsResultMessage(StatusCodes.NOT_FOUND, 'Product id not found.', null))
                    } else {
                        if (product.stock < cartAddProduct.amount) {
                            res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.CONFLICT, 'stock is les than amount.', null))
                        } else {
                            const cartUpdated: CartReadDto = await cartService.update(parseInt(req.params.id), cartUpdate.products[0])
                            res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, cartUpdated))
                        }
                    }
                }
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(StatusCodes.BAD_REQUEST).json(new CartsResultMessage(StatusCodes.BAD_REQUEST, 'Cart id parameter must be required.', null))
            }

            const deleted: Boolean = await cartService.deleteById(parseInt(req.params.id))

            if (!deleted) {
                res.status(StatusCodes.NOT_FOUND).json(new CartsResultMessage(StatusCodes.NOT_FOUND, 'Cart not found.', null))
            } else {
                res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, null))
            }

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
        }
        next()
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.params.id_cart) {
                res.status(StatusCodes.BAD_REQUEST).json(new CartsResultMessage(StatusCodes.BAD_REQUEST, 'Cart id parameter must be required.', null))
            }

            if (!req.params.id_product) {
                res.status(StatusCodes.BAD_REQUEST).json(new CartsResultMessage(StatusCodes.BAD_REQUEST, 'Product id parameter must be required.', null))
            }

            const cartUpdated: { CartReadDto: CartReadDto, productIndex: number } = await cartService.deleteProduct(parseInt(req.params.id_cart), parseInt(req.params.id_product))

            if (!cartUpdated) {
                res.status(StatusCodes.NOT_FOUND).json(new CartsResultMessage(StatusCodes.NOT_FOUND, 'Cart not found.', null))
            } else if (cartUpdated.productIndex === -1) {
                res.status(StatusCodes.NOT_FOUND).json(new CartsResultMessage(StatusCodes.NOT_FOUND, 'Product not found in carts products.', null))
            } else {
                res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, cartUpdated.CartReadDto))
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new CartsResultMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null))
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

export default new CartController(new ProductService('products'))