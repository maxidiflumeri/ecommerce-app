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
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("./cart.controller"));
const cartsRouter = (0, express_1.Router)();
cartsRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_controller_1.default.getAll(req, res, next);
}));
cartsRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_controller_1.default.get(req, res, next);
}));
cartsRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_controller_1.default.create(req, res, next);
}));
cartsRouter.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_controller_1.default.update(req, res, next);
}));
cartsRouter.put('/:id_cart/product/:id_product', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_controller_1.default.deleteProduct(req, res, next);
}));
cartsRouter.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_controller_1.default.delete(req, res, next);
}));
exports.default = cartsRouter;
//# sourceMappingURL=cart.routes.js.map