import { ProductReadDto } from '../../products/dtos/product-read.dto';
export declare class CartReadDto {
    id: number;
    timestamp: Date;
    products: ProductReadDto[];
}
