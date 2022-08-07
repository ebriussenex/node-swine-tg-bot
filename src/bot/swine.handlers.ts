import {Telegraf} from 'telegraf';
import {Message} from 'typegram';
import {commands, commandsDescr, messages} from '../const/const';
import {swineService} from '../service/swine.service';

export type MessageMeta = {
    chatId: string;
    userId: string;
    userIsBot: boolean;
    chatType: string;
    userFirstName: string;
    userLastName?: string;
    username?: string;
    chatFirstName?: string;
    chatLastName?: string;
    chatTitle?: string;
  };

export function addSwineHandlers(bot: Telegraf) : Telegraf {
  bot.command(commands.FEED, async (ctx) => {
    await ctx.telegram.sendMessage(
        ctx.chat.id,
        await swineService.feed(meta(ctx.message)),
        {parse_mode: 'Markdown'},
    );
  });
  bot.command(commands.NAME, async (ctx) => {
    const name: string = parseCommandArgs(ctx.message.text, commands.NAME.length).join(' ');
    await ctx.telegram.sendMessage(
        ctx.chat.id,
        await swineService.rename(
            meta(ctx.message),
            name,
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
    const reqCommands: string[] = parseCommandArgs(ctx.message.text, commands.HELP.length);
    let msg = '';
    if (reqCommands.length === 0) {
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
              msg +=
                    `${counter}. ${command.name}\n\t${command.description}\n`;

              counter++;
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
  return bot;
}

function parseCommandArgs(command: string, commandLength: number) : string[] {
  command = command.trim();
  return command.length >= commandLength + 2 && command[commandLength + 1] === ' ' ?
      command.slice(commandLength + 2).trim().split(' ').filter((e) => e !== '') : [];
}

function meta(msg: Message): MessageMeta {
  const chatType = msg.chat.type;
  if (
    chatType !== 'group' && chatType !== 'private' && chatType !== 'supergroup'
  ) {
    throw Error(
        'Bot is supposed to be used only in group/supergroup or private chat',
    );
  }
  if (msg.from === undefined) {
    throw Error('Message from channel is not supported');
  }
  return {
    chatId: msg.chat.id.toString(),
    userId: msg.from.id.toString(),
    userIsBot: msg.from.is_bot,
    chatType: msg.chat.type,
    userFirstName: msg.from.first_name,
    userLastName: msg.from.last_name,
    username: msg.from.username,
    chatFirstName: (
        msg.chat.type === 'group' || msg.chat.type === 'supergroup'
        ) ?
       undefined : msg.chat.first_name,
    chatLastName: (
        msg.chat.type === 'group' || msg.chat.type === 'supergroup'
        ) ? undefined : msg.chat.last_name,
    chatTitle: msg.chat.type === 'private' ? undefined : msg.chat.title,
  };
}
