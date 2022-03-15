import { ProductCreateDto } from "../dtos/product-create.dto"
import { ProductReadDto } from "../dtos/product-read.dto"
import { ProductUpdateDto } from "../dtos/product-update.dto"
import { db } from "../../../config/firebase"
import moment from 'moment'
export default class ProductService {    

    public products = db.collection('products')

    async create(product: ProductCreateDto): Promise<ProductReadDto> {
        let productRet: ProductReadDto = null

        try {
            product.createdAt = moment().format()
            const productCreated = await this.products.add(product)            
            productRet = await this.getById(productCreated.id)            
        } catch (error) {
            throw new Error(error.message)
        }

        return productRet
    }

    async getById(id: string): Promise<ProductReadDto> {
        let productRet: ProductReadDto = null

        try {
            const productGet = await this.products.doc(`${id}`).get()
            if(productGet.data()){
                productRet = this.mapProduct(productGet.data(), productGet.id)            
            }
        } catch (error) {
            throw new Error(error.message)
        }

        return productRet
    }

    async getAll(): Promise<ProductReadDto[]> {
        let productsRet: ProductReadDto[] = null
        try {
            const productsGet = (await this.products.get()).docs
            productsRet = productsGet.map<ProductReadDto>((doc) => (this.mapProduct(doc.data(), doc.id)))
        } catch (error) {
            throw new Error(error.message)
        }

        return productsRet
    }

    async deleteById(id: string): Promise<ProductReadDto> {
        let productDeleted: ProductReadDto = null
        try {
            productDeleted = await this.getById(id)
            if(productDeleted){
                await this.products.doc(id).delete()
            }
        } catch (error) {
            throw new Error(error.message)
        }

        return productDeleted
    }

    async update(id: string, product: ProductUpdateDto): Promise<ProductReadDto> { 
        let productUpdated: ProductReadDto = null
        try{
            await this.products.doc(id).update(product)
            productUpdated = await this.getById(id)
        }catch (error) {
            throw new Error(error.message)
        }

        return productUpdated
    }


    private mapProduct(product: any, id: string): ProductReadDto {
        let productRet: ProductReadDto = {            
            _id: id,
            name: product.name,
            description: product.description,
            urlPhoto: product.urlPhoto,
            code: product.code,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt            
        }       

        return productRet
    }
}