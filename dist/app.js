"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const telegraf_1 = require("telegraf");
const config_1 = require("./conf/config");
const localtunnel_1 = require("./scripts/localtunnel");
const dotenv_1 = __importDefault(require("dotenv"));
const zapatos_config_1 = require("./conf/zapatos.config");
const swine_handlers_1 = require("./bot/swine.handlers");
console.log(`Your tg bot token is ${config_1.botConfig.BOT_TOKEN}`);
const start = async () => {
    const CONFIG_PATH = `.${process.env.NODE_ENV}.env`;
    dotenv_1.default.config({ path: CONFIG_PATH });
    console.log(`Using env: ${process.env.NODE_ENV}`);
    try {
        if (config_1.botConfig.BOT_TOKEN === undefined) {
            throw new Error('Bot token is not present in .env file or in env variable');
        }
        await (0, zapatos_config_1.configZapatos)();
        let bot = new telegraf_1.Telegraf(config_1.botConfig.BOT_TOKEN);
        let url = `${process.env.HOST}`;
        if (process.env.NODE_ENV === 'dev') {
            url = await (0, localtunnel_1.getTunnel)();
        }
        const secretPath = `/telegraf/${bot.secretPathComponent()}`;
        console.log('Current webhook, will be deleted:');
        console.log(await bot.telegram.getWebhookInfo());
        await bot.telegram.deleteWebhook();
        await bot.telegram.setWebhook(`${url}${secretPath}`);
        console.log('New webhook:');
        console.log(await bot.telegram.getWebhookInfo());
        const app = (0, express_1.default)();
        app.use(bot.webhookCallback(secretPath));
        app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}!`);
        });
        bot = (0, swine_handlers_1.addSwineHandlers)(bot);
        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
void start();
//# sourceMappingURL=app.js.map