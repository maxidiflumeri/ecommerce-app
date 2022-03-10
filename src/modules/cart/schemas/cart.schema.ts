import { Schema, model } from "mongoose";
import { CartReadDto } from "../dtos/cart-read.dto";

const cartSchema = new Schema<CartReadDto>({
    products: [{
        _id: {type: String, required: true},
        amount: {type: Number, required: true}
    }],
    createdAt: {type: Date, default: Date.now}
})

export const CartModel = model<CartReadDto>('carts', cartSchema)