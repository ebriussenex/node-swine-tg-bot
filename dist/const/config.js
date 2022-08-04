"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = exports.botConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const CONFIG_PATH = `.${process.env.NODE_ENV}.env`;
console.log(`Using config file: ${CONFIG_PATH}`);
dotenv_1.default.config({ path: CONFIG_PATH });
exports.botConfig = Object.freeze({
    BOT_TOKEN: process.env.BOT_TOKEN,
    MAX_NAME_VALUE: 25,
    SWINE_FEED_TIMEOUT: 24,
    SWINE_DEFAULT_WEIGHT: 5,
    SWINE_WEIGHT_CHANGE_ABS: 20,
    SWINE_DEFAULT_NAME: 'Swin',
});
exports.dbConfig = Object.freeze({
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT),
    DB_DIALECT: process.env.DB_DIALECT,
    DB_POOL: {
        MAX: parseInt(process.env.DB_POOL_MAX),
        MIN: parseInt(process.env.DB_POOL_MIN),
        ACQ: parseInt(process.env.DB_POOL_ACQUIRE),
        IDLE: parseInt(process.env.DB_POOL_IDLE),
    },
});
//# sourceMappingURL=config.js.map