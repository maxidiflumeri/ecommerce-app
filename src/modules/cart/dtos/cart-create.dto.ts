import { Expose } from "class-transformer"
import { IsDefined, IsNotEmpty } from "class-validator"
import { ProductReadDto } from '../../products/dtos/product-read.dto'

export class CartCreateDto {      
    id: number

    @IsDefined()
    @IsNotEmpty()        
    @Expose()
    products: ProductReadDto[]
}