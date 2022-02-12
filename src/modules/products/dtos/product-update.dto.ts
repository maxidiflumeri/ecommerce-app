import { IsNotEmpty } from "class-validator"

export class ProductUpdateDto {    
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    description: string
    
    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    urlPhoto: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    stock: number   
}