import { ProductReadDto } from "../products/dtos/product-read.dto";
import CartService from "./cart.service";
import { CartCreateDto } from "./dtos/cart-create.dto";
import { CartReadDto } from "./dtos/cart-read.dto";

const cartService = new CartService('carts')

class CartController {
    async get(id: number): Promise<CartReadDto> {
        const cart: CartReadDto = await cartService.getById(id)
        return cart
    }

    async getAll(): Promise<CartReadDto[]> {        
        let carts: CartReadDto[] = await cartService.getAll()
        return carts
    }

    async create(cart: CartCreateDto): Promise<CartReadDto> {
        const cartCreated: CartReadDto = await cartService.create(cart)
        return cartCreated
    }

    async update(product: ProductReadDto, id: number): Promise<CartReadDto> {
        const cartUpdated: CartReadDto = await cartService.update(id, product)        
        return cartUpdated
    }

    async delete(id: number): Promise<void>{
        await cartService.deleteById(id)
    }
}

export default new CartController()