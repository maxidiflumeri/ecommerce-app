import { IsNotEmpty } from "class-validator"

export class ProductReadDto {
    @IsNotEmpty()
    _id: string
    
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

    @IsNotEmpty()
    createdAt: Date
}