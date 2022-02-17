import { CartReadDto } from './dtos/cart-read.dto';
import { ProductReadDto } from '../products/dtos/product-read.dto';
import { CartCreateDto } from './dtos/cart-create.dto';
export default class CartService {
    fileName: string;
    constructor(fileName: any);
    create(cart: CartCreateDto): Promise<CartReadDto>;
    save(cart: CartCreateDto): Promise<number>;
    getById(id: number): Promise<CartReadDto>;
    getAll(): Promise<CartReadDto[]>;
    deleteAll(): Promise<void>;
    update(id: number, product: ProductReadDto): Promise<CartReadDto>;
    deleteProduct(id_cart: number, id_product: number): Promise<{
        CartReadDto: CartReadDto;
        productIndex: number;
    }>;
    deleteById(id: number): Promise<Boolean>;
}
