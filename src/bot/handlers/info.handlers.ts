import {Telegraf} from 'telegraf';
import {commands} from '../../const/commands';
import {messages} from '../../const/messages';
import {infoService} from '../../service/info.service';


export function addInfoHandlers(bot: Telegraf) : void {
  bot.command(commands.HELP, async (ctx) => {
    await ctx.replyWithMarkdown(infoService.getHelpOnCommands(ctx.message.text));
  });
  bot.command(
      commands.INFO,
      async (ctx) =>
        await ctx.replyWithMarkdown(messages.BOT_DESCRIPTION_MSG),
  );
}
