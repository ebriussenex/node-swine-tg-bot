"use strict";
const { Telegraf, Context } = require('telegraf');
const bot = new Telegraf('5510697066:AAGG0zdHsDWt1qihUyuXDP6RYv4Xqi1bNUw');
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('hipster', Telegraf.reply('λ'));
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
//# sourceMappingURL=app.js.map