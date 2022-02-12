import { ProductCreateDto } from "./dtos/product-create.dto";
import { ProductReadDto } from "./dtos/product-read.dto";
import { ProductUpdateDto } from "./dtos/product-update.dto";
import ProductService from './product.service'

const productService: ProductService = new ProductService('products')

class ProductController {
    async get(id: number): Promise<ProductReadDto> {
        const product: ProductReadDto = await productService.getById(id)
        return product
    }

    async getAll(): Promise<ProductReadDto[]> {    
        const products: ProductReadDto[] = await productService.getAll()
        return products
    }

    async create(product: ProductCreateDto): Promise<ProductReadDto> {
        const productCreated: ProductReadDto = await productService.create(product)
        return productCreated
    }

    async update(product: ProductUpdateDto, id: number): Promise<ProductReadDto> {
        const productUpdated: ProductReadDto = await productService.update(id, product)        
        return productUpdated
    }

    async delete(id: number): Promise<void> {
        await productService.deleteById(id)
    }
}

export default new ProductController()