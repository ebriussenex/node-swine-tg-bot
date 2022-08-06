import {Composer, Telegraf} from 'telegraf';
import {Message} from 'typegram';
import {botConfig} from './conf/config';
import {commands, commandsDescr, messages} from './const/const';
import {conifgZapatos} from './scripts/config-zapatos';
import {swineService} from './service/Swine.service';

export type MessageMeta = {
  chatId: number;
  userId: number;
  userIsBot: boolean;
  chatType: string;
  userFirstName: string;
  userLastName?: string;
  username?: string;
  chatFirstName?: string;
  chatLastName?: string;
  chatTitle?: string;
};
console.log(`Your tg bot token is ${botConfig.BOT_TOKEN}`);

const start = async (): Promise<void> => {
  try {
    if (botConfig.BOT_TOKEN === undefined) {
      throw new Error(
          'Bot token is not present in .env file or in env variable',
      );
    }
    conifgZapatos();
    const bot = new Telegraf(botConfig.BOT_TOKEN);
    bot.command(commands.FEED, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.feed(meta(ctx.message)),
          {parse_mode: 'Markdown'},
      );
    });
    bot.command(commands.NAME, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.rename(
              meta(ctx.message),
              ctx.message.text.slice(commands.NAME.length + 2),
          ),
          {parse_mode: 'Markdown'},
      );
    });
    bot.command(commands.TOP, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.getTop(meta(ctx.message)),
          {parse_mode: 'Markdown'},
      );
    });
    bot.command(commands.MY_SWINE, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.get(meta(ctx.message)),
          {parse_mode: 'Markdown'},
      );
    });
    bot.command(commands.KILL, async (ctx) => {
      await ctx.telegram.sendMessage(
          ctx.chat.id,
          await swineService.delete(meta(ctx.message)),
      );
    });
    bot.command(commands.HELP, async (ctx) => {
      const reqCommands: string[] =
        ctx.message.text.slice(commands.HELP.length + 2).trim().split(' ');
      let msg = '';
      if (reqCommands.length === 1 && reqCommands[0] === '') {
        msg = commandsDescr.map((command, index) =>
          `${(index + 1)}. ${command.name}\n\t${command.description}\n`,
        ).join('');
      } else {
        let counter = 1;
        commandsDescr.map(
            (command) => {
              if (
                reqCommands.includes(command.name) ||
                reqCommands.includes(command.name.slice(1))
              ) {
                counter++;
                msg +=
                  `${counter}. ${command.name}\n\t${command.description}\n`;
              }
            },
        );
      }
      if (msg === '' && reqCommands.length === 1) {
        msg = messages.NO_SUCH_COMMAND(reqCommands[0]);
      }
      await ctx.telegram.sendMessage(
          ctx.chat.id, msg, {parse_mode: 'Markdown'},
      );
    });
    bot.command(
        commands.INFO,
        async (ctx) =>
          await ctx.telegram.sendMessage(
              ctx.chat.id,
              messages.BOT_DESCRIPTION_MSG,
              {parse_mode: 'Markdown'},
          ),
    );
    await bot.launch();

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
    username: msg.from.username,
    chatFirstName: msg.chat.type === 'group' ? undefined : msg.chat.first_name,
    chatLastName: msg.chat.type === 'group' ? undefined : msg.chat.last_name,
    chatTitle: msg.chat.type === 'private' ? undefined : msg.chat.title,
  };
}
