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
const products_messages_1 = require("../../messages/products.messages");
const product_create_dto_1 = require("./dtos/product-create.dto");
const product_service_1 = __importDefault(require("./product.service"));
const productService = new product_service_1.default('products');
class ProductController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Product id parameter must be required.', null));
                }
                const product = yield productService.getById(parseInt(req.params.id));
                if (!product) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found.', null));
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.OK).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, product));
                }
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getAll();
                res.status(http_status_codes_1.StatusCodes.OK).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, products));
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCreate = (0, class_transformer_1.plainToClass)(product_create_dto_1.ProductCreateDto, req.body);
                const errors = yield (0, class_validator_1.validate)(productCreate, { skipMissingProperties: true });
                if (errors.length > 0) {
                    const messages = this.validateErrors(errors);
                    res.status(http_status_codes_1.StatusCodes.CONFLICT).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.CONFLICT, messages, null));
                }
                else {
                    const productCreated = yield productService.create(req.body);
                    res.status(http_status_codes_1.StatusCodes.OK).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, productCreated));
                }
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Product id parameter must be required.', null));
                }
                const productUpdated = yield productService.update(parseInt(req.params.id), req.body);
                if (!productUpdated) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found.', null));
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.OK).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, productUpdated));
                }
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Product id parameter must be required.', null));
                }
                const deleted = yield productService.deleteById(parseInt(req.params.id));
                if (!deleted) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found.', null));
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.OK).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, null));
                }
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new products_messages_1.ProductResultMessage(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message, null));
            }
            next();
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
exports.default = new ProductController();
//# sourceMappingURL=product.controller.js.map