import { plainToClass } from 'class-transformer'
import fs from 'fs'
import { CartReadDto } from './dtos/cart-read.dto'
import { ProductReadDto } from '../products/dtos/product-read.dto'
import { CartCreateDto } from './dtos/cart-create.dto'

export default class CartService {
    fileName: string

    constructor(fileName) {
        this.fileName = fileName
    }

    async create(cart: CartCreateDto): Promise<CartReadDto> {
        let id = 0
        try {
            await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            id = await this.save(cart)
        } catch (error) {
            await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, '[]')
            id = await this.save(cart)
        }
        let cartCreated = await this.getById(id)
        return plainToClass(CartReadDto, cartCreated)
    }

    async save(cart: CartCreateDto): Promise<number> {
        let id = 0
        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())

            if (carts.length == 0) {
                id = 1
                cart.id = id
                carts.push(cart)
            } else {
                id = carts[carts.length - 1].id + 1
                cart.id = id
                carts.push(cart)
            }
            await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts))
        } catch (error) {
            throw new Error(error.message)
        }
        return id
    }

    async getById(id: number): Promise<CartReadDto> {
        var cartRet = null
        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())
            cartRet = carts.find((cart: { id: number }) => cart.id == id)
        } catch (error) {
            throw new Error(error.message)
        }
        return plainToClass(CartReadDto, cartRet)
    }

    async getAll(): Promise<CartReadDto[]> {
        var cartsRet = []
        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            cartsRet = JSON.parse(cartsString.toString())
        } catch (error) {
            throw new Error(error.message)
        }
        return cartsRet.map((cart: CartReadDto) => plainToClass(CartReadDto, cart))
    }

    async deleteAll(): Promise<void> {
        try {
            await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, '[]')
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(id: number, product: ProductReadDto): Promise<CartReadDto> {
        let cartUpdated: CartReadDto = null

        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())
            var cartIndex = carts.findIndex(cart => cart.id == id)

            if (cartIndex !== -1) {
                carts[cartIndex].products.push(product)
                cartUpdated = carts[cartIndex]
                await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts))
            }
        } catch (error) {
            throw new Error(error.message)
        }

        return cartUpdated
    }

    async deleteProduct(id_cart: number, id_product: number): Promise<{ CartReadDto: CartReadDto, productIndex: number }> {
        let cartUpdated: CartReadDto = null
        let productIndexRet: number = -1

        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())
            var cartIndex = carts.findIndex((cart: { id: number }) => cart.id == id_cart)

            if (cartIndex !== -1) {
                let productIndex = carts[cartIndex].products.findIndex((product: { id: number }) => product.id == id_product)
                if (productIndex !== -1) {
                    productIndexRet = productIndex
                    carts[cartIndex].products.splice(productIndex, 1)
                    cartUpdated = carts[cartIndex]
                    await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts))
                }
            }
        } catch (error) {
            throw new Error(error.message)
        }

        return {
            CartReadDto: cartUpdated,
            productIndex: productIndexRet
        }
    }

    async deleteById(id: number): Promise<Boolean> {
        let deleted = false
        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())
            var cartIndex = carts.findIndex(product => product.id == id)

            if (cartIndex !== -1) {
                carts.splice(cartIndex, 1)
                await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts))
                deleted = true
            }
        } catch (error) {
            throw new Error(error.message)
        }
        return deleted
    }
}