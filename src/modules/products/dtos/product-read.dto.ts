import { IsNotEmpty } from "class-validator"

export class ProductReadDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    timestamp: Date
    
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