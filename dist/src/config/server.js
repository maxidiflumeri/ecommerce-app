"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("../modules/products/product.routes"));
const cart_routes_1 = __importDefault(require("../modules/cart/cart.routes"));
const morgan_1 = __importDefault(require("morgan"));
const config_service_1 = __importDefault(require("./config.service"));
const config_key_1 = require("./config.key");
const PORT = config_service_1.default.get(config_key_1.Configuration.PORT) || process.env.PORT;
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeSetters();
        this.initializeMiddleares();
        this.initializeRoutes();
    }
    listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening on port ${this.app.get('port')}`);
        });
    }
    initializeMiddleares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, morgan_1.default)('dev'));
    }
    initializeRoutes() {
        this.app.use('/api/products', product_routes_1.default);
        this.app.use('/api/carts', cart_routes_1.default);
    }
    initializeSetters() {
        this.app.set('port', PORT);
    }
}
exports.default = new Server();
//# sourceMappingURL=server.js.map