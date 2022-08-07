"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const telegraf_1 = require("telegraf");
const config_1 = require("./conf/config");
const const_1 = require("./const/const");
const Swine_service_1 = require("./service/Swine.service");
const dotenv_1 = __importDefault(require("dotenv"));
const zapatos_config_1 = require("./conf/zapatos.config");
console.log(`Your tg bot token is ${config_1.botConfig.BOT_TOKEN}`);
const start = async () => {
    const CONFIG_PATH = `.${process.env.NODE_ENV}.env`;
    dotenv_1.default.config({ path: CONFIG_PATH });
    console.log(`Using env: ${process.env.NODE_ENV}`);
    try {
        if (config_1.botConfig.BOT_TOKEN === undefined) {
            throw new Error('Bot token is not present in .env file or in env variable');
        }
        // migrateDb();
        await (0, zapatos_config_1.configZapatos)();
        const bot = new telegraf_1.Telegraf(config_1.botConfig.BOT_TOKEN);
        const url = `${process.env.HOST}`;
        // if (process.env.NODE_ENV === 'dev') {
        //   url = await getTunnel();
        // }
        const secretPath = `/telegraf/${bot.secretPathComponent()}`;
        console.log(await bot.telegram.getWebhookInfo());
        await bot.telegram.deleteWebhook();
        await bot.telegram.setWebhook(`${url}${secretPath}`);
        console.log(await bot.telegram.getWebhookInfo());
        const app = (0, express_1.default)();
        app.use(bot.webhookCallback(secretPath));
        app.listen(process.env.PORT, () => {
            console.log(`app listening on port ${process.env.PORT}!`);
        });
        bot.command(const_1.commands.FEED, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.feed(meta(ctx.message)), { parse_mode: 'Markdown' });
        });
        bot.command(const_1.commands.NAME, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.rename(meta(ctx.message), ctx.message.text.slice(const_1.commands.NAME.length + 2)), { parse_mode: 'Markdown' });
        });
        bot.command(const_1.commands.TOP, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.getTop(meta(ctx.message)), { parse_mode: 'Markdown' });
        });
        bot.command(const_1.commands.MY_SWINE, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.get(meta(ctx.message)), { parse_mode: 'Markdown' });
        });
        bot.command(const_1.commands.KILL, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.delete(meta(ctx.message)));
        });
        bot.command(const_1.commands.HELP, async (ctx) => {
            const reqCommands = ctx.message.text.slice(const_1.commands.HELP.length + 2).trim().split(' ');
            let msg = '';
            if (reqCommands.length === 1 && reqCommands[0] === '') {
                msg = const_1.commandsDescr.map((command, index) => `${(index + 1)}. ${command.name}\n\t${command.description}\n`).join('');
            }
            else {
                let counter = 1;
                const_1.commandsDescr.map((command) => {
                    if (reqCommands.includes(command.name) ||
                        reqCommands.includes(command.name.slice(1))) {
                        counter++;
                        msg +=
                            `${counter}. ${command.name}\n\t${command.description}\n`;
                    }
                });
            }
            if (msg === '' && reqCommands.length === 1) {
                msg = const_1.messages.NO_SUCH_COMMAND(reqCommands[0]);
            }
            await ctx.telegram.sendMessage(ctx.chat.id, msg, { parse_mode: 'Markdown' });
        });
        bot.command(const_1.commands.INFO, async (ctx) => await ctx.telegram.sendMessage(ctx.chat.id, const_1.messages.BOT_DESCRIPTION_MSG, { parse_mode: 'Markdown' }));
        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
void start();
function meta(msg) {
    const chatType = msg.chat.type;
    if (chatType !== 'group' && chatType !== 'private' && chatType !== 'supergroup') {
        throw Error('Bot is supposed to be used only in group/supergroup or private chat');
    }
    if (msg.from === undefined) {
        throw Error('Message from channel is not supported');
    }
    return {
        chatId: msg.chat.id,
        userId: msg.from.id,
        userIsBot: msg.from.is_bot,
        chatType: msg.chat.type,
        userFirstName: msg.from.first_name,
        userLastName: msg.from.last_name,
        username: msg.from.username,
        chatFirstName: (msg.chat.type === 'group' || msg.chat.type === 'supergroup') ?
            undefined : msg.chat.first_name,
        chatLastName: (msg.chat.type === 'group' || msg.chat.type === 'supergroup') ? undefined : msg.chat.last_name,
        chatTitle: msg.chat.type === 'private' ? undefined : msg.chat.title,
    };
}
//# sourceMappingURL=app.js.map