import { ProductCreateDto } from "../dtos/product-create.dto"
import { ProductReadDto } from "../dtos/product-read.dto"
import { ProductUpdateDto } from "../dtos/product-update.dto"
import { ProductModel } from "../schemas/product.schema"


export default class ProductService {

    async create(product: ProductCreateDto): Promise<ProductReadDto> {
        let productCreated = null
        try {
            productCreated = await ProductModel.create(product)
        } catch (error) {
            throw new Error(error.message)
        }

        return productCreated
    }

    async getById(id: string): Promise<ProductReadDto> {
        let productRet: ProductReadDto = null
        try {
            productRet = await ProductModel.findById(id)
        } catch (error) {
            throw new Error(error.message)
        }

        return productRet
    }

    async getAll(): Promise<ProductReadDto[]> {
        let productsRet: ProductReadDto[] = null
        try {
            productsRet = await ProductModel.find()
        } catch (error) {
            throw new Error(error.message)
        }

        return productsRet
    }

    async deleteAll(): Promise<void> {
        try {
            await ProductModel.deleteMany()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteById(id: string): Promise<ProductReadDto> {
        let productDeleted: ProductReadDto = null
        try {
            productDeleted = await ProductModel.findByIdAndDelete({ _id: id })            
        } catch (error) {
            throw new Error(error.message)
        }

        return productDeleted
    }

    async update(id: string, product: ProductUpdateDto): Promise<ProductReadDto> { 
        let productUpdated: ProductReadDto = null
        try{
            await ProductModel.updateOne({_id: id}, product)
            productUpdated = await this.getById(id)
        }catch (error) {
            throw new Error(error.message)
        }

        return productUpdated
    }
}