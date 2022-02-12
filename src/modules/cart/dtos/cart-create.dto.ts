import { IsNotEmpty } from "class-validator"
import { ProductReadDto } from '../../products/dtos/product-read.dto'

export class CartCreateDto {  
    @IsNotEmpty()
    id: number

    @IsNotEmpty()    
    products: ProductReadDto[]
}