import { plainToClass } from 'class-transformer'
import fs from 'fs'
import { ProductCreateDto } from './dtos/product-create.dto'
import { ProductReadDto } from './dtos/product-read.dto'
import { ProductUpdateDto } from './dtos/product-update.dto'

export default class ProductService {
    fileName: string

    constructor(fileName) {
        this.fileName = fileName
    }

    async create(product: ProductCreateDto): Promise<ProductReadDto> {
        let id = 0
        try {
            await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            id = await this.save(product)
        } catch (error) {
            await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, '[]')
            id = await this.save(product)
        }
        let productCreated = await this.getById(id)
        return plainToClass(ProductReadDto, productCreated)
    }

    async save(product: ProductCreateDto): Promise<number> {
        let id = 0
        try {
            const productsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const products = JSON.parse(productsString.toString())

            if (products.length == 0) {
                id = 1
                product.id = id
                products.push(product)
            } else {
                id = products[products.length - 1].id + 1
                product.id = id
                products.push(product)
            }
            await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(products))
        } catch (error) {
            throw new Error(error.message)
        }
        return id
    }

    async getById(id: number): Promise<ProductReadDto> {
        var productRet = null
        try {
            const productsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const products = JSON.parse(productsString.toString())
            productRet = products.find(product => product.id == id)
            if (!productRet) {
                throw new Error('Product not found')
            }
        } catch (error) {
            throw new Error(error.message)
        }
        return plainToClass(ProductReadDto, productRet)
    }

    async getAll(): Promise<ProductReadDto[]> {
        var productsRet = []
        try {
            const productsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            productsRet = JSON.parse(productsString.toString())
        } catch (error) {
            throw new Error(error.message)
        }
        return productsRet.map((product: ProductReadDto) => plainToClass(ProductReadDto, product))
    }

    async deleteAll(): Promise<void> {
        try {
            await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, '[]')
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(id: number, product: ProductUpdateDto): Promise<ProductReadDto> {
        let productUpdated: ProductReadDto = null

        try {
            const productsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const products = JSON.parse(productsString.toString())
            var prodIndex = products.findIndex(product => product.id == id)

            if (prodIndex !== -1) {
                products[prodIndex].name = product.name
                products[prodIndex].description = product.description
                products[prodIndex].code = product.code
                products[prodIndex].price = product.price
                products[prodIndex].stock = product.stock
                products[prodIndex].urlPhoto = product.urlPhoto
                productUpdated = products[prodIndex]
                await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(products))
            }
        } catch (error) {
            throw new Error(error.message)
        }

        return productUpdated
    }

    async deleteById(id: number): Promise<boolean> {
        let deleted = false
        try {
            const productsString = await fs.promises.readFile(`./src/database/${this.fileName}.txt`)
            const products = JSON.parse(productsString.toString())
            var prodIndex = products.findIndex(product => product.id == id)

            if (prodIndex !== -1) {
                products.splice(prodIndex, 1)
                await fs.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(products))
                deleted = true
            }
        } catch (error) {
            throw new Error(error.message)
        }
        return deleted
    }
}