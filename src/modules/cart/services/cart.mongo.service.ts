import { CartAddProductDto } from "../dtos/cart-add-product.dto";
import { CartCreateDto } from "../dtos/cart-create.dto";
import { CartReadDto } from "../dtos/cart-read.dto";
import { CartModel } from "../schemas/cart.schema";

export default class CartService {
    async create(cart: CartCreateDto): Promise<CartReadDto> {
        let productCreated = null
        try {
            productCreated = await CartModel.create(cart)
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }

        return productCreated
    }

    async getById(id: string): Promise<CartReadDto> {
        let cartRet: CartReadDto = null
        try {
            cartRet = await CartModel.findById(id)
        } catch (error) {
            throw new Error(error.message)
        }

        return cartRet
    }

    async getAll(): Promise<CartReadDto[]> {
        let carstRet: CartReadDto[] = null
        try {
            carstRet = await CartModel.find()
        } catch (error) {
            throw new Error(error.message)
        }

        return carstRet
    }

    async deleteAll(): Promise<void> {
        try {
            await CartModel.deleteMany()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteById(id: string): Promise<CartReadDto> {
        let cartDeleted: CartReadDto = null
        try {
            cartDeleted = await CartModel.findByIdAndDelete({ _id: id })
        } catch (error) {
            throw new Error(error.message)
        }

        return cartDeleted
    }

    async update(id: string, products: CartAddProductDto[]): Promise<CartReadDto> {
        let productUpdated: CartReadDto = null
        try {
            for (let index = 0; index < products.length; index++) {
                const element = products[index];
                let cart = await CartModel.findById(id)
                const cartProd: CartAddProductDto = cart.products.find(prod => prod._id == element._id)

                if (cartProd) {
                    cartProd.amount = cartProd.amount + element.amount
                    cart.save()
                    productUpdated = cart
                } else {
                    productUpdated = await CartModel.findByIdAndUpdate({ _id: id }, { $push: { products: element } })
                }
            }
        } catch (error) {
            throw new Error(error.message)
        }

        return productUpdated
    }

    async deleteProduct(id_cart: string, id_product: string): Promise<{ CartReadDto: CartReadDto, productIndex: number }> {
        let cartUpdated: CartReadDto = null
        let productIndexRet: number = -1
        try {
            const cart = await CartModel.findById(id_cart)
            const productIndex = cart.products.findIndex(prod => prod._id == id_product)
            if (productIndex !== -1) {
                productIndexRet = productIndex
                cart.products.splice(productIndex, 1)
                await cart.save()
                cartUpdated = cart
            }
            
        } catch (error) {
            throw new Error(error.message)
        }

        return {
            CartReadDto: cartUpdated,
            productIndex: productIndexRet
        }
    }
}