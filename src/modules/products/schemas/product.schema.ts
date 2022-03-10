import { Schema, model } from "mongoose";
import { ProductReadDto } from "../dtos/product-read.dto";

const productSchema = new Schema<ProductReadDto>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    urlPhoto: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
})

export const ProductModel = model<ProductReadDto>('products', productSchema)