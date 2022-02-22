import { Expose } from "class-transformer"
import { IsDefined, IsNotEmpty } from "class-validator"

export class CartAddProductDto {
    @IsDefined()
    @IsNotEmpty()        
    @Expose()
    idProduct: number    

    @IsDefined()
    @IsNotEmpty()        
    @Expose()
    amount: number
}