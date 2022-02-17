"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const dotenv_1 = require("dotenv");
class ConfigService {
    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== "production";
        if (isDevelopmentEnv) {
            const envFilePath = __dirname + '/../../.env';
            const existPath = fs.existsSync(envFilePath);
            if (!existPath) {
                console.log('.env files does not exist.');
                process.exit(0);
            }
            this.envConfig = (0, dotenv_1.parse)(fs.readFileSync(envFilePath));
        }
        else {
            this.envConfig = {
                PORT: process.env.PORT
            };
        }
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.default = new ConfigService();
//# sourceMappingURL=config.service.js.map