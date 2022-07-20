"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const botToken = (process.env.NODE_ENV === 'development') ? process.env.DEV_BOT_TOKEN : process.env.BOT_TOKEN;
exports.config = {
    botToken: botToken
};
//# sourceMappingURL=config.js.map