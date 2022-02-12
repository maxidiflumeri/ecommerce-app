import { IsNotEmpty } from "class-validator"
import { ProductReadDto } from '../../products/dtos/product-read.dto'

export class CartReadDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    timestamp: Date

    @IsNotEmpty()
    products: ProductReadDto[]
}