import { plainToClass } from 'class-transformer'
import fs from 'fs'
import { CartReadDto } from '../dtos/cart-read.dto'
import { ProductReadDto } from '../../products/dtos/product-read.dto'
import { CartCreateDto } from '../dtos/cart-create.dto'
import { CartAddProductDto } from '../dtos/cart-add-product.dto'

export default class CartService {
    fileName: string

    constructor(fileName: string) {
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
        let cartCreated = await this.getById(id.toString())
        return plainToClass(CartReadDto, cartCreated)
    }

    async save(cart: CartCreateDto): Promise<number> {
        let id = 0
        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())

            if (carts.length == 0) {
                id = 1
                cart.id = id.toString()
                carts.push(cart)
            } else {
                id = parseInt(carts[carts.length - 1].id) + 1
                cart.id = id.toString()
                carts.push(cart)
            }
            await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts))
        } catch (error) {
            throw new Error(error.message)
        }
        return id
    }

    async getById(id: string): Promise<CartReadDto> {
        var cartRet = null
        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())
            cartRet = carts.find((cart: { id: number }) => cart.id == parseInt(id))
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

    async update(id: string, product: CartAddProductDto[]): Promise<CartReadDto> {
        let cartUpdated: CartReadDto = null

        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())
            var cartIndex = carts.findIndex((cart: { id: number }) => cart.id == parseInt(id))

            if (cartIndex !== -1) {   
                for (let index = 0; index < product.length; index++) {
                    const element = product[index];
                    const cartProdIndex: number = carts[cartIndex].products.findIndex((prod: { _id: string }) => prod._id == element._id)
                    if(cartProdIndex != -1){
                        carts[cartIndex].products[cartProdIndex].amount += element.amount
                        cartUpdated = carts[cartIndex]
                    }else{
                        carts[cartIndex].products.push(element)
                        cartUpdated = carts[cartIndex]
                    }                    
                }             
                await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts))
            }
        } catch (error) {
            throw new Error(error.message)
        }

        return cartUpdated
    }

    async deleteProduct(id_cart: string, id_product: string): Promise<{ CartReadDto: CartReadDto, productIndex: number }> {
        let cartUpdated: CartReadDto = null
        let productIndexRet: number = -1

        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())
            var cartIndex = carts.findIndex((cart: { id: number }) => cart.id == parseInt(id_cart))

            if (cartIndex !== -1) {
                let productIndex = carts[cartIndex].products.findIndex((product: { _id: number }) => product._id == parseInt(id_product))
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

    async deleteById(id: string): Promise<CartReadDto> {
        let cartDeleted: CartReadDto = null
        try {
            const cartsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const carts = JSON.parse(cartsString.toString())
            var cartIndex = carts.findIndex((product: { id: number }) => product.id == parseInt(id))

            if (cartIndex !== -1) {
                cartDeleted = carts[cartIndex]
                carts.splice(cartIndex, 1)
                await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts))
            }
        } catch (error) {
            throw new Error(error.message)
        }
        return cartDeleted
    }
}