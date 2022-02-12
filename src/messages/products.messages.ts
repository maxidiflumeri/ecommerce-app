import { IsNotEmpty } from "class-validator";
import { ProductReadDto } from "../modules/products/dtos/product-read.dto";

export class ProductResultMessage {
    @IsNotEmpty()
    status: number

    @IsNotEmpty()
    message: string

    data: ProductReadDto | ProductReadDto[]

    constructor(status: number, message: string, data?: ProductReadDto | ProductReadDto[]){
        this.status = status
        this.message = message
        this.data = data
    }
}

