import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CartsResultMessage } from '../../messages/cart.messages';
import { ProductReadDto } from '../products/dtos/product-read.dto';
import ProductService from '../products/services/product.mongo.service';
import CartService from "./services/cart.mongo.service";
import { CartAddProductDto } from './dtos/cart-add-product.dto';
import { CartUpdateDto } from './dtos/cart-update.dto';
import { CartCreateDto } from './dtos/cart-create.dto';
import { CartReadDto } from "./dtos/cart-read.dto";

const cartService = new CartService()
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

            const cart: CartReadDto = await cartService.getById(req.params.id)

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
            let isErrors: boolean = false
            const cartCreate: CartCreateDto = plainToClass(CartCreateDto, req.body)
            const errors = await validate(cartCreate, { skipMissingProperties: true })

            if (errors.length > 0) {
                const messages: string = this.validateErrors(errors)
                res.status(StatusCodes.CONFLICT).json(new CartsResultMessage(StatusCodes.CONFLICT, messages, null))
            } else {
                for (let index = 0; index < cartCreate.products.length; index++) {
                    const element = cartCreate.products[index];
                    const cartAddProduct: CartAddProductDto = plainToClass(CartAddProductDto, element)
                    const errorsProduct = await validate(cartAddProduct, { skipMissingProperties: true })

                    if (errorsProduct.length > 0) {
                        isErrors = true
                        const messagesProduct: string = this.validateErrors(errorsProduct)
                        res.status(StatusCodes.CONFLICT).json(new CartsResultMessage(StatusCodes.CONFLICT, messagesProduct, null))
                    } else {
                        const product: ProductReadDto = await this.productService.getById(cartAddProduct._id)
                        if (!product) {
                            isErrors = true
                            res.status(StatusCodes.NOT_FOUND).json(new CartsResultMessage(StatusCodes.NOT_FOUND, `Product id ${cartAddProduct._id} not found.`, null))
                        } else {
                            if (product.stock < cartAddProduct.amount) {
                                isErrors = true
                                res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.CONFLICT, `stock in product id ${cartAddProduct._id} is les than amount.`, null))
                            }
                        }
                    }
                }

                if (!isErrors) {
                    const cartCreated: CartReadDto = await cartService.create(cartCreate)
                    res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, cartCreated))
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
            let isErrors: boolean = false
            const cartUpdate: CartUpdateDto = plainToClass(CartUpdateDto, req.body)
            const errors = await validate(cartUpdate, { skipMissingProperties: true })

            if (errors.length > 0) {
                const messages: string = this.validateErrors(errors)
                res.status(StatusCodes.CONFLICT).json(new CartsResultMessage(StatusCodes.CONFLICT, messages, null))
            } else {
                for (let index = 0; index < cartUpdate.products.length; index++) {
                    const element = cartUpdate.products[index];
                    const cartAddProduct: CartAddProductDto = plainToClass(CartAddProductDto, element)
                    const errorsProduct = await validate(cartAddProduct, { skipMissingProperties: true })
                    if (errorsProduct.length > 0) {
                        isErrors = true
                        const messagesProduct: string = this.validateErrors(errorsProduct)
                        res.status(StatusCodes.CONFLICT).json(new CartsResultMessage(StatusCodes.CONFLICT, messagesProduct, null))
                    } else {
                        const product: ProductReadDto = await this.productService.getById(cartAddProduct._id)
                        const cart: CartReadDto = await cartService.getById(req.params.id)
                        if (!product) {
                            isErrors = true
                            res.status(StatusCodes.NOT_FOUND).json(new CartsResultMessage(StatusCodes.NOT_FOUND, 'Product id not found.', null))
                        } else if (!cart) {
                            isErrors = true
                            res.status(StatusCodes.NOT_FOUND).json(new CartsResultMessage(StatusCodes.NOT_FOUND, 'Cart id not found.', null))
                        } else {
                            if (product.stock < cartAddProduct.amount + cart.products.find(prod => prod._id == cartAddProduct._id).amount) {
                                isErrors = true
                                res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.CONFLICT, 'stock is les than amount.', null))
                            }
                        }
                    }
                }
                if (!isErrors) {
                    const cartUpdated: CartReadDto = await cartService.update(req.params.id, cartUpdate.products)
                    res.status(StatusCodes.OK).json(new CartsResultMessage(StatusCodes.OK, ReasonPhrases.OK, cartUpdated))
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

            const deleted: CartReadDto = await cartService.deleteById(req.params.id)

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

            const cartUpdated: { CartReadDto: CartReadDto, productIndex: number } = await cartService.deleteProduct(req.params.id_cart, req.params.id_product)

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

export default new CartController(new ProductService())