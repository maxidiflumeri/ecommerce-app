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
const class_validator_1 = require("class-validator");
const http_status_codes_1 = require("http-status-codes");
const cart_messages_1 = require("../../messages/cart.messages");
const cart_service_1 = __importDefault(require("./cart.service"));
const cart_create_dto_1 = require("./dtos/cart-create.dto");
const cartService = new cart_service_1.default('carts');
class CartController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Cart id parameter must be required.', null));
                }
                const cart = yield cartService.getById(parseInt(req.params.id));
                if (!cart) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.NOT_FOUND, 'Cart not found.', null));
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.OK).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, cart));
                }
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let carts = yield cartService.getAll();
                res.status(http_status_codes_1.StatusCodes.OK).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, carts));
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartCreate = (0, class_transformer_1.plainToClass)(cart_create_dto_1.CartCreateDto, req.body);
                const errors = yield (0, class_validator_1.validate)(cartCreate, { skipMissingProperties: true });
                if (errors.length > 0) {
                    const messages = this.validateErrors(errors);
                    res.status(http_status_codes_1.StatusCodes.CONFLICT).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.CONFLICT, messages, null));
                }
                else {
                    const cartCreated = yield cartService.create(req.body);
                    res.status(http_status_codes_1.StatusCodes.OK).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, cartCreated));
                }
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Cart id parameter must be required.', null));
                }
                const cartUpdated = yield cartService.update(parseInt(req.params.id), req.body);
                if (!cartUpdated) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.NOT_FOUND, 'Cart not found.', null));
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.OK).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, cartUpdated));
                }
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Cart id parameter must be required.', null));
                }
                const deleted = yield cartService.deleteById(parseInt(req.params.id));
                if (!deleted) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.NOT_FOUND, 'Cart not found.', null));
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.OK).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, null));
                }
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id_cart) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Cart id parameter must be required.', null));
                }
                if (!req.params.id_product) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Product id parameter must be required.', null));
                }
                const cartUpdated = yield cartService.deleteProduct(parseInt(req.params.id_cart), parseInt(req.params.id_product));
                if (!cartUpdated) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.NOT_FOUND, 'Cart not found.', null));
                }
                else if (cartUpdated.productIndex === -1) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found in carts products.', null));
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.OK).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, cartUpdated.CartReadDto));
                }
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new cart_messages_1.CartsResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
        });
    }
    validateErrors(errors) {
        let stringResult = '';
        for (const errorItem of errors) {
            stringResult = stringResult + errorItem.constraints.isDefined + ', ';
        }
        return stringResult;
    }
}
exports.default = new CartController();
//# sourceMappingURL=cart.controller.js.map