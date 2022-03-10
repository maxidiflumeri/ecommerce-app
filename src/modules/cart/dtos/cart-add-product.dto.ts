import { Expose } from "class-transformer"
import { IsDefined, IsNotEmpty } from "class-validator"
import { ProductReadDto } from "src/modules/products/dtos/product-read.dto"

export class CartAddProductDto {
    @IsDefined()
    @IsNotEmpty()        
    @Expose()
    _id: string

    @IsDefined()
    @IsNotEmpty()        
    @Expose()
    amount: number
}