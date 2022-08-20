import { Markup, Telegraf } from 'telegraf';
import { BtnAction, buttons } from '../../const/buttons';
import { commands } from '../../const/commands';
import { messages } from '../../const/messages';
import { fightService } from '../../service/fight.service';
import { BotContext } from '../swinebot.context';
import { meta } from './swine.handlers';

export function addFightHandlers(bot: Telegraf): void {
  bot.command(commands.FIGHT, async ctx => {
    const action: BtnAction = 'action.accept_fight';
    const cmeta = meta(ctx);
    if (BotContext.session?.chatIdSwine[cmeta.chat.id] !== undefined) {
      return BotContext.session.chatIdUser[cmeta.chat.id].id !== cmeta.user.id
        ? ctx.replyWithMarkdownV2(
            messages.FIGHT_ALREADY_STARTED(
              BotContext.session.chatIdUser[cmeta.chat.id].first_name,
              BotContext.session.chatIdUser[cmeta.chat.id].id.toString(),
            ),
            Markup.inlineKeyboard([Markup.button.callback(buttons[action], action)])
          )
        : ctx.replyWithMarkdownV2(messages.SELF_FIGHT_MSG);
    }
    const [msg, succ]: [string, boolean] = await fightService.startFight(cmeta);
    return !succ
      ? ctx.replyWithMarkdownV2(msg)
      : ctx.replyWithMarkdownV2(msg, Markup.inlineKeyboard([Markup.button.callback(buttons[action], action)]));
  });
  bot.action('action.accept_fight', async ctx => {
    if (ctx.callbackQuery === undefined) throw Error('undef callbackQuery');
    if (ctx.chat === undefined) throw Error('undef chat');
    if (ctx.from === undefined) throw Error('undef from');

    const cmeta = meta(ctx);
    const chatId = cmeta.chat.id;
    if (BotContext.session === undefined)
      return ctx.replyWithMarkdownV2(
        messages.ACCEPTED_INVALID_FIGHT_SESS_MSG(cmeta.user.first_name, cmeta.user.id.toString()),
      );
    else if (BotContext.session.chatIdSwine === undefined || BotContext.session.chatIdSwine[chatId] === undefined) {
      return ctx.replyWithMarkdownV2(
        messages.ACCEPTED_INVALID_FIGHT_MSG(cmeta.user.first_name, cmeta.user.id.toString()),
      );
    } else if (cmeta.user.id.toString() === BotContext.session.chatIdSwine[chatId].owner_id) {
      return ctx.replyWithMarkdownV2(messages.SELF_FIGHT_MSG);
    } else {
      await ctx.replyWithMarkdownV2(messages.ACCEPT_FIGHT_MSG(cmeta.user.first_name, cmeta.user.id.toString()));
      const msg = await fightService.acceptFight(cmeta);
      return ctx.replyWithMarkdownV2(msg[0]);
    }
  });
}
