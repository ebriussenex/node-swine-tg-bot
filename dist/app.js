"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_1 = require("./const/config");
const const_1 = require("./const/const");
const repository_1 = require("./repository");
const Swine_service_1 = require("./service/Swine.service");
console.log(`Your tg bot token is ${config_1.botConfig.BOT_TOKEN}`);
const start = async () => {
    try {
        await repository_1.connection.sync();
        if (config_1.botConfig.BOT_TOKEN === undefined) {
            throw new Error('Bot token is not present in .env file or in env variable');
        }
        const bot = new telegraf_1.Telegraf(config_1.botConfig.BOT_TOKEN);
        bot.command('hipster', telegraf_1.Telegraf.reply('λ'));
        bot.command(const_1.commands.FEED, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.feed(meta(ctx.message)));
        });
        bot.command(const_1.commands.NAME, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.rename(meta(ctx.message), ctx.message.text.split(' ')[1]));
        });
        bot.command(const_1.commands.TOP, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.getTop(ctx.chat.id));
        });
        bot.command(const_1.commands.MY_SWINE, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.get(meta(ctx.message)));
        });
        bot.command(const_1.commands.KILL, async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, await Swine_service_1.swineService.delete(meta(ctx.message)));
        });
        bot.launch();
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
    if (chatType !== 'group' && chatType !== 'private') {
        throw Error('Bot is supposed to be used only in group or private chat');
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
        userName: msg.from.username,
        chatFirstName: msg.chat.type === 'group' ? undefined : msg.chat.first_name,
        chatLastName: msg.chat.type === 'group' ? undefined : msg.chat.last_name,
        chatTitle: msg.chat.type === 'private' ? undefined : msg.chat.title,
    };
}
//# sourceMappingURL=app.js.map