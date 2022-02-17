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
const cart_read_dto_1 = require("./dtos/cart-read.dto");
class CartService {
    constructor(fileName) {
        this.fileName = fileName;
    }
    create(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = 0;
            try {
                yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                id = yield this.save(cart);
            }
            catch (error) {
                yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, '[]');
                id = yield this.save(cart);
            }
            let cartCreated = yield this.getById(id);
            return (0, class_transformer_1.plainToClass)(cart_read_dto_1.CartReadDto, cartCreated);
        });
    }
    save(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = 0;
            try {
                const cartsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                const carts = JSON.parse(cartsString.toString());
                if (carts.length == 0) {
                    id = 1;
                    cart.id = id;
                    carts.push(cart);
                }
                else {
                    id = carts[carts.length - 1].id + 1;
                    cart.id = id;
                    carts.push(cart);
                }
                yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts));
            }
            catch (error) {
                throw new Error(error.message);
            }
            return id;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var cartRet = null;
            try {
                const cartsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                const carts = JSON.parse(cartsString.toString());
                cartRet = carts.find((cart) => cart.id == id);
            }
            catch (error) {
                throw new Error(error.message);
            }
            return (0, class_transformer_1.plainToClass)(cart_read_dto_1.CartReadDto, cartRet);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var cartsRet = [];
            try {
                const cartsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                cartsRet = JSON.parse(cartsString.toString());
            }
            catch (error) {
                throw new Error(error.message);
            }
            return cartsRet.map((cart) => (0, class_transformer_1.plainToClass)(cart_read_dto_1.CartReadDto, cart));
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
            let cartUpdated = null;
            try {
                const cartsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                const carts = JSON.parse(cartsString.toString());
                var cartIndex = carts.findIndex(cart => cart.id == id);
                if (cartIndex !== -1) {
                    carts[cartIndex].products.push(product);
                    cartUpdated = carts[cartIndex];
                    yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts));
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
            return cartUpdated;
        });
    }
    deleteProduct(id_cart, id_product) {
        return __awaiter(this, void 0, void 0, function* () {
            let cartUpdated = null;
            let productIndexRet = -1;
            try {
                const cartsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                const carts = JSON.parse(cartsString.toString());
                var cartIndex = carts.findIndex((cart) => cart.id == id_cart);
                if (cartIndex !== -1) {
                    let productIndex = carts[cartIndex].products.findIndex((product) => product.id == id_product);
                    if (productIndex !== -1) {
                        productIndexRet = productIndex;
                        carts[cartIndex].products.splice(productIndex, 1);
                        cartUpdated = carts[cartIndex];
                        yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts));
                    }
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
            return {
                CartReadDto: cartUpdated,
                productIndex: productIndexRet
            };
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleted = false;
            try {
                const cartsString = yield fs_1.default.promises.readFile(`./src/database/${this.fileName}.txt`);
                const carts = JSON.parse(cartsString.toString());
                var cartIndex = carts.findIndex(product => product.id == id);
                if (cartIndex !== -1) {
                    carts.splice(cartIndex, 1);
                    yield fs_1.default.promises.writeFile(`./src/database/${this.fileName}.txt`, JSON.stringify(carts));
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
exports.default = CartService;
//# sourceMappingURL=cart.service.js.map