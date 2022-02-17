"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const fs_1 = __importDefault(require("fs"));
const product_read_dto_1 = require("./dtos/product-read.dto");
class ProductService {
    constructor(fileName) {
        this.fileName = fileName;
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = 0;
            try {
                yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                id = yield this.save(product);
            }
            catch (error) {
                yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, '[]');
                id = yield this.save(product);
            }
            let productCreated = yield this.getById(id);
            return (0, class_transformer_1.plainToClass)(product_read_dto_1.ProductReadDto, productCreated);
        });
    }
    save(product) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = 0;
            try {
                const productsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                const products = JSON.parse(productsString.toString());
                if (products.length == 0) {
                    id = 1;
                    product.id = id;
                    products.push(product);
                }
                else {
                    id = products[products.length - 1].id + 1;
                    product.id = id;
                    products.push(product);
                }
                yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(products));
            }
            catch (error) {
                throw new Error(error.message);
            }
            return id;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var productRet = null;
            try {
                const productsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                const products = JSON.parse(productsString.toString());
                productRet = products.find(product => product.id == id);
                if (!productRet) {
                    throw new Error('Product not found');
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
            return (0, class_transformer_1.plainToClass)(product_read_dto_1.ProductReadDto, productRet);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var productsRet = [];
            try {
                const productsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                productsRet = JSON.parse(productsString.toString());
            }
            catch (error) {
                throw new Error(error.message);
            }
            return productsRet.map((product) => (0, class_transformer_1.plainToClass)(product_read_dto_1.ProductReadDto, product));
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, '[]');
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            let productUpdated = null;
            try {
                const productsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                const products = JSON.parse(productsString.toString());
                var prodIndex = products.findIndex(product => product.id == id);
                if (prodIndex !== -1) {
                    products[prodIndex].name = product.name;
                    products[prodIndex].description = product.description;
                    products[prodIndex].code = product.code;
                    products[prodIndex].price = product.price;
                    products[prodIndex].stock = product.stock;
                    products[prodIndex].urlPhoto = product.urlPhoto;
                    productUpdated = products[prodIndex];
                    yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(products));
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
            return productUpdated;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleted = false;
            try {
                const productsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                const products = JSON.parse(productsString.toString());
                var prodIndex = products.findIndex(product => product.id == id);
                if (prodIndex !== -1) {
                    products.splice(prodIndex, 1);
                    yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(products));
                    deleted = true;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
            return deleted;
        });
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map