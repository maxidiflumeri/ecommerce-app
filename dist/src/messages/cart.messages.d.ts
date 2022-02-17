import { CartReadDto } from "src/modules/cart/dtos/cart-read.dto";
export declare class CartsResultMessage {
    status: number;
    message: string;
    data: CartReadDto | CartReadDto[];
    constructor(status: number, message: string, data?: CartReadDto | CartReadDto[]);
}
