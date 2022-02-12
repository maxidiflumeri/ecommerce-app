import { IsNotEmpty } from "class-validator"

export class ProductCreateDto { 
    @IsNotEmpty()
    id: number
       
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