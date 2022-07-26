import { Context, Telegraf } from 'telegraf';
import { Chat, User } from 'typegram';
import { swineService } from '../../service/swine.service';
import { commands } from '../../const/commands';
import { messages } from '../../const/messages';

export type MessageMeta = {
  chat: Chat;
  user: User;
};

export function addSwineHandlers(bot: Telegraf): void {
  bot.command(commands.FEED, async ctx => {
    await ctx.replyWithMarkdownV2(await swineService.feed(meta(ctx)));
  });
  bot.command(commands.NAME, async ctx => {
    if(ctx.message.text[commands.NAME.length + 1] === '@') 
      await ctx.replyWithMarkdownV2(messages.CMD_CANNOT_BE_DONE_WITH_MENU(commands.NAME)); 
    const name: string = parseCommandArgs(ctx.message.text, commands.NAME.length).join(' ');
    await ctx.replyWithMarkdownV2(await swineService.rename(meta(ctx), name));
  });
  bot.command(commands.TOP, async ctx => {
    await ctx.replyWithMarkdownV2(await swineService.getTop(meta(ctx)));
  });
  bot.command(commands.MY_SWINE, async ctx => {
    await ctx.replyWithMarkdownV2(await swineService.get(meta(ctx)));
  });
  bot.command(commands.TOP_OWNERS, async ctx => {
    await ctx.replyWithMarkdownV2(await swineService.getTopWithOwners(meta(ctx)));
  });
  bot.command(commands.TOP_FIGHTERS, async ctx => {
    await ctx.replyWithMarkdownV2(await swineService.getTopFighters(meta(ctx)));
  });
  bot.command(commands.TOP_EXP, async ctx => {
    await ctx.replyWithMarkdownV2(await swineService.getTopExpWithOwners(meta(ctx)));
  });
  bot.command(commands.SWINE_STATS, async ctx => {
    await ctx.replyWithMarkdownV2(await swineService.getStats(meta(ctx)));
  });
}

function parseCommandArgs(command: string, commandLength: number): string[] {
  command = command.trim();
  return command.length >= commandLength + 2 && command[commandLength + 1] === ' '
    ? command
        .slice(commandLength + 2)
        .trim()
        .split(' ')
        .filter(e => e !== '')
    : [];
}

export function meta(ctx: Context): MessageMeta {
  if ('callbackQuery' in ctx && ctx.callbackQuery !== undefined) {
    return { chat: ctx.chat, user: ctx.callbackQuery.from } as MessageMeta;
  } else if ('message' in ctx && ctx.message !== undefined) {
    return { chat: ctx.chat, user: ctx.message.from } as MessageMeta;
  } else {
    throw Error('Bot is supposed to be used only in group and private chats');
  }
}
