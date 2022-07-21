"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_1 = require("./const/config");
console.log(`Your tg bot token is ${config_1.config.BOT_TOKEN}`);
if (config_1.config.BOT_TOKEN === undefined) {
    throw new Error('Bot token is not present in .env file or in env variable');
}
const bot = new telegraf_1.Telegraf(config_1.config.BOT_TOKEN);
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('hipster', telegraf_1.Telegraf.reply('λ'));
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
//# sourceMappingURL=app.js.map