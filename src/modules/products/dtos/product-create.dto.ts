import { IsDefined, IsNotEmpty } from "class-validator"

export class ProductCreateDto { 
    @IsNotEmpty()
    id: number
       
    @IsDefined()
    @IsNotEmpty()    
    @IsNotEmpty()
    name: string

    @IsDefined()
    @IsNotEmpty()    
    @IsNotEmpty()
    description: string
    
    @IsDefined()
    @IsNotEmpty()    
    @IsNotEmpty()
    code: string

    @IsDefined()
    @IsNotEmpty()    
    @IsNotEmpty()
    urlPhoto: string

    @IsDefined()
    @IsNotEmpty()    
    @IsNotEmpty()
    price: number

    @IsDefined()
    @IsNotEmpty()    
    @IsNotEmpty()
    stock: number   
}