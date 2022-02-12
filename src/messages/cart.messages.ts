import { IsNotEmpty } from "class-validator";
import { CartReadDto } from "src/modules/cart/dtos/cart-read.dto";

export class CartsResultMessage {
    @IsNotEmpty()
    status: number

    @IsNotEmpty()
    message: string

    data: CartReadDto | CartReadDto[]

    constructor(status: number, message: string, data?: CartReadDto | CartReadDto[]){
        this.status = status
        this.message = message
        this.data = data
    }
}