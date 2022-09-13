import { Markup, Telegraf } from 'telegraf';
import { BtnAction, buttons } from '../../const/buttons';
import { commands } from '../../const/commands';
import { messages } from '../../const/messages';
import { fightService } from '../../service/fight.service';
import { BotContext } from '../swinebot.context';
import { meta } from './swine.handlers';

export function addFightHandlers(bot: Telegraf): void {
  bot.command(commands.FIGHT, async ctx => {
    const acceptFightAction: BtnAction = 'action.accept_fight';
    const declineFightAction: BtnAction = 'action.decline_fight';
    const cmeta = meta(ctx);
    if (BotContext.session?.chatIdSwine[cmeta.chat.id] !== undefined) {
      return BotContext.session.chatIdUser[cmeta.chat.id].id !== cmeta.user.id
        ? ctx.replyWithMarkdownV2(
            messages.FIGHT_ALREADY_STARTED(
              BotContext.session.chatIdUser[cmeta.chat.id].first_name,
              BotContext.session.chatIdUser[cmeta.chat.id].id.toString(),
            ),
            Markup.inlineKeyboard([
              Markup.button.callback(buttons[acceptFightAction], acceptFightAction),
              Markup.button.callback(buttons[declineFightAction], declineFightAction),
            ]),
          )
        : ctx.replyWithMarkdownV2(messages.SELF_FIGHT_MSG);
    }
    const [msg, succ]: [string, boolean] = await fightService.startFight(cmeta);
    return !succ
      ? ctx.replyWithMarkdownV2(msg)
      : ctx.replyWithMarkdownV2(
          msg,
          Markup.inlineKeyboard([
            Markup.button.callback(buttons[acceptFightAction], acceptFightAction),
            Markup.button.callback(buttons[declineFightAction], declineFightAction),
          ]),
        );
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
      const msg = await fightService.acceptFight(cmeta);
      if (msg[1]) {
        await ctx.replyWithMarkdownV2(messages.ACCEPT_FIGHT_MSG(cmeta.user.first_name, cmeta.user.id.toString()));
      }
      await ctx.replyWithMarkdownV2(msg[0]);
    }
  });

  bot.action('action.decline_fight', async ctx => {
    if (ctx.callbackQuery === undefined) throw Error('undef callbackQuery');
    if (ctx.chat === undefined) throw Error('undef chat');
    if (ctx.from === undefined) throw Error('undef from');

    const cmeta = meta(ctx);
    const chatId = cmeta.chat.id;
    if (BotContext.session === undefined)
      return ctx.replyWithMarkdownV2(
        messages.CANNOT_DECLINE_DONE_FIGHT(cmeta.user.first_name, cmeta.user.id.toString()),
      );
    else if (BotContext.session.chatIdSwine === undefined || BotContext.session.chatIdSwine[chatId] === undefined) {
      return ctx.replyWithMarkdownV2(
        messages.CANNOT_DECLINE_DONE_FIGHT(cmeta.user.first_name, cmeta.user.id.toString()),
      );
    } else if (cmeta.user.id.toString() === BotContext.session.chatIdSwine[chatId].owner_id) {
      delete BotContext.session.chatIdSwine[chatId];
      return ctx.replyWithMarkdownV2(messages.FIGHT_DECLINED);
    } else
      return ctx.replyWithMarkdownV2(
        messages.ONLY_BEGINNER_CAN_DECLINE(cmeta.user.first_name, cmeta.user.id.toString()),
      );
  });
}
