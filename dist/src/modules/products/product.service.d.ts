import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductReadDto } from './dtos/product-read.dto';
import { ProductUpdateDto } from './dtos/product-update.dto';
export default class ProductService {
    fileName: string;
    constructor(fileName: any);
    create(product: ProductCreateDto): Promise<ProductReadDto>;
    save(product: ProductCreateDto): Promise<number>;
    getById(id: number): Promise<ProductReadDto>;
    getAll(): Promise<ProductReadDto[]>;
    deleteAll(): Promise<void>;
    update(id: number, product: ProductUpdateDto): Promise<ProductReadDto>;
    deleteById(id: number): Promise<boolean>;
}
