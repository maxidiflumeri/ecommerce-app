import { Configuration } from '../../../config/config.key'
import configService from '../../../config/config.service'
import CartServiceMongo from './cart.mongo.service'
import CartServiceFile from './cart.file.service'
import CartServiceFirebase from './cart.firebase.service'


export default class ProductFactory {
    static get(){        
        let typePersist = configService.get(Configuration.DB_TYPE)

        switch(typePersist){
            case 'FIREBASE': return new CartServiceFirebase()
            case 'MONGO': return new CartServiceMongo()
            case 'FILE': return new CartServiceFile('carts')
            default: return new CartServiceMongo()
        }
    }
}