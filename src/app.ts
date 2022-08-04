import {Telegraf} from 'telegraf';
import {Message} from 'typegram';
import {botConfig} from './const/config';
import {commands} from './const/const';
import {connection} from './repository';
import {swineService} from './service/Swine.service';

export type MessageMeta = {
  chatId: number;
  userId: number;
  userIsBot: boolean;
  chatType: string;
  userFirstName: string;
  userLastName?: string;
  userName?: string;
  chatFirstName?: string;
  chatLastName?: string;
  chatTitle?: string;
};

console.log(`Your tg bot token is ${botConfig.BOT_TOKEN}`);

const start = async (): Promise<void> => {
  try {
    await connection.sync();

    if (botConfig.BOT_TOKEN === undefined) {
      throw new Error(
          'Bot token is not present in .env file or in env variable',
      );
    }

    const bot = new Telegraf(botConfig.BOT_TOKEN);
    bot.command('hipster', Telegraf.reply('λ'));
    bot.command(commands.FEED, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.feed(meta(ctx.message)),
      );
    });
    bot.command(commands.NAME, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.rename(
              meta(ctx.message),
              ctx.message.text.split(' ')[1],
          ),
      );
    });
    bot.command(commands.TOP, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.getTop(ctx.chat.id),
      );
    });
    bot.command(commands.MY_SWINE, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.get(meta(ctx.message)),
      );
    });
    bot.command(commands.KILL, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.delete(meta(ctx.message)),
      );
    });
    bot.launch();

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();

function meta(msg: Message): MessageMeta {
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
