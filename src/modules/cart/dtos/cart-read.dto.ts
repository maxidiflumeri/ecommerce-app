import { IsNotEmpty } from "class-validator"
import { ProductReadDto } from '../../products/dtos/product-read.dto'
import { CartAddProductDto } from "./cart-add-product.dto"

export class CartReadDto {
    @IsNotEmpty()
    _id: string

    @IsNotEmpty()
    createdAt: Date

    @IsNotEmpty()
    products: CartAddProductDto[]
}