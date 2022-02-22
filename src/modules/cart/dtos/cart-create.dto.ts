import { Expose } from "class-transformer"
import { IsDefined, IsNotEmpty } from "class-validator"
import { CartAddProductDto } from "./cart-add-product.dto"
export class CartCreateDto {
    id: number

    @IsDefined()
    @IsNotEmpty()
    @Expose()
    products: CartAddProductDto[]
}