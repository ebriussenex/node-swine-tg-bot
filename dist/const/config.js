"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const CONFIG_PATH = `.${process.env.NODE_ENV}.env`;
console.log(`Using config file: ${CONFIG_PATH}`);
dotenv_1.default.config({ path: CONFIG_PATH });
exports.config = Object.freeze({
    BOT_TOKEN: process.env.BOT_TOKEN,
    MAX_NAME_VALUE: 25,
    SWINE_FEED_TIMEOUT: 24,
    SWINE_DEFAULT_WEIGHT: 5,
    SWINE_WEIGHT_CHANGE_ABS: 20,
    SWINE_DEFAULT_NAME: 'Swin'
});
//# sourceMappingURL=config.js.map