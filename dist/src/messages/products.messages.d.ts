import { ProductReadDto } from "../modules/products/dtos/product-read.dto";
export declare class ProductResultMessage {
    status: number;
    message: string;
    data: ProductReadDto | ProductReadDto[];
    constructor(status: number, message: string, data?: ProductReadDto | ProductReadDto[]);
}
