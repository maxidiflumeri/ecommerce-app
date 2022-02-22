import { IsDefined, IsNotEmpty } from "class-validator"

export class ProductUpdateDto {  
    @IsDefined()        
    @IsNotEmpty()
    name: string

    @IsDefined()          
    @IsNotEmpty()
    description: string
    
    @IsDefined()      
    @IsNotEmpty()
    code: string

    @IsDefined()      
    @IsNotEmpty()
    urlPhoto: string

    @IsDefined()      
    @IsNotEmpty()
    price: number

    @IsDefined()      
    @IsNotEmpty()
    stock: number   
}