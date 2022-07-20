import { Telegraf, Context } from 'telegraf'

const bot = new Telegraf('5510697066:AAGG0zdHsDWt1qihUyuXDP6RYv4Xqi1bNUw')

bot.command('oldschool', (ctx: { reply: (arg0: string) => any }) => ctx.reply('Hello'))
bot.command('hipster', Telegraf.reply('λ'))

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))