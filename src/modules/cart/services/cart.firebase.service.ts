import { db } from "../../../config/firebase"
import { CartCreateDto } from "../dtos/cart-create.dto"
import { CartReadDto } from "../dtos/cart-read.dto"
import moment from 'moment'
import { CartAddProductDto } from "../dtos/cart-add-product.dto"

export default class CartService {
    public carts = db.collection('carts')

    async create(cart: CartCreateDto): Promise<CartReadDto> {
        let cartRet: CartReadDto = null

        try {         
            cart['createdAt'] = moment().format()
            console.log(cart)
            const cartCreated = await this.carts.add(JSON.parse(JSON.stringify(cart)))            
            cartRet = await this.getById(cartCreated.id)            
        } catch (error) {
            throw new Error(error.message)
        }

        return cartRet
    }

    async getById(id: string): Promise<CartReadDto> {
        let cartRet: CartReadDto = null

        try {
            const cartGet = await this.carts.doc(`${id}`).get()
            if(cartGet.data()){
                cartRet = this.mapCart(cartGet.data(), cartGet.id)            
            }
        } catch (error) {
            throw new Error(error.message)
        }

        return cartRet
    }

    async getAll(): Promise<CartReadDto[]> {
        let cartsRet: CartReadDto[] = null
        try {
            const cartsGet = (await this.carts.get()).docs            
            cartsRet = cartsGet.map<CartReadDto>((doc) => (this.mapCart(doc.data(), doc.id)))
        } catch (error) {
            throw new Error(error.message)
        }

        return cartsRet
    }

    async deleteById(id: string): Promise<CartReadDto> {
        let productDeleted: CartReadDto = null
        try {
            productDeleted = await this.getById(id)
            if(productDeleted){
                await this.carts.doc(id).delete()
            }
        } catch (error) {
            throw new Error(error.message)
        }

        return productDeleted
    }

    async update(id: string, carts: CartAddProductDto[]): Promise<CartReadDto> { 
        let cartUpdated: CartReadDto = null
        let cart: any 
        try{
            cart = await this.getById(id)
            for (let index = 0; index < carts.length; index++) {
                const element = carts[index];
                const cartProdIndex: number = cart.products.findIndex((prod: { _id: string }) => prod._id == element._id)

                if (cartProdIndex != -1) {
                    cart.products[cartProdIndex].amount += element.amount                                        
                    
                } else {
                    cart.products.push(element)
                }                
            }
            await this.carts.doc(id).update(JSON.parse(JSON.stringify(cart)))
            cartUpdated = await this.getById(id)            
        }catch (error) {
            throw new Error(error.message)
        }

        return cartUpdated
    }

    async deleteProduct(id_cart: string, id_product: string): Promise<{ CartReadDto: CartReadDto, productIndex: number }> {
        let cartUpdated: CartReadDto = null
        let productIndexRet: number = -1
        try {
            const cart = await this.getById(id_cart)
            const productIndex = cart.products.findIndex(prod => prod._id == id_product)
            if (productIndex !== -1) {
                productIndexRet = productIndex
                cart.products.splice(productIndex, 1)
                await this.carts.doc(id_cart).update(JSON.parse(JSON.stringify(cart)))
                cartUpdated = cart
            }

        } catch (error) {
            throw new Error(error.message)
        }

        return {
            CartReadDto: cartUpdated,
            productIndex: productIndexRet
        }
    }

    private mapCart(cart: any, id: string): CartReadDto {
        let cartRet: CartReadDto = {            
            _id: id,
            products: cart.products,
            createdAt: cart.createdAt            
        }       

        return cartRet
    }
}