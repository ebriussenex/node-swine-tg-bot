import { Telegraf, Context } from 'telegraf'
import { config } from './const/config' 

console.log(`Your tg bot token is ${config.botToken}`);

if(config.botToken === undefined) {
    throw new Error('Bot token is not present in .env file or in env variable');
}

const bot = new Telegraf(config.botToken);

bot.command('oldschool', (ctx: { reply: (arg0: string) => any }) => ctx.reply('Hello'))
bot.command('hipster', Telegraf.reply('λ'))

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))