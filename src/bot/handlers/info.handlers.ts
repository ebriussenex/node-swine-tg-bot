import { Telegraf } from 'telegraf';
import { commands } from '../../const/commands';
import { messages } from '../../const/messages';
import { infoService } from '../../service/info.service';

export function addInfoHandlers(bot: Telegraf): void {
  bot.command(commands.HELP, async ctx => {
    if(ctx.message.text[commands.HELP.length + 1] === '@') 
      await ctx.replyWithMarkdownV2(messages.CMD_CANNOT_BE_DONE_WITH_MENU(commands.HELP));
    await ctx.replyWithMarkdownV2(infoService.getHelpOnCommands(ctx.message.text));
  });
  bot.command(commands.INFO, async ctx => await ctx.replyWithMarkdownV2(messages.BOT_DESCRIPTION_MSG));
}
