import { Configuration } from '../../../config/config.key'
import configService from '../../../config/config.service'
import ProductServiceFirebase from './product.firebase.service'
import ProductServiceMongo from './product.mongo.service'
import ProductServiceFile from './product.file.service'


export default class ProductFactory {
    static get(){        
        let typePersist = configService.get(Configuration.DB_TYPE)

        switch(typePersist){
            case 'FIREBASE': return new ProductServiceFirebase()
            case 'MONGO': return new ProductServiceMongo()
            case 'FILE': return new ProductServiceFile('products')
            default: return new ProductServiceMongo()
        }
    }
}
