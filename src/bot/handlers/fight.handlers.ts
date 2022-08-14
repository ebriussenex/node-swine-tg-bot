import {Markup, Telegraf} from 'telegraf';
import {botConfig} from '../../conf/config';
import {BtnAction, buttons} from '../../const/buttons';
import {commands} from '../../const/commands';
import {messages} from '../../const/messages';
import {fightService} from '../../service/fight.service';
import {BotContext} from '../swinebot.context';
import {meta} from './swine.handlers';

export function addFightHandlers(bot: Telegraf) : void {
  bot.command(commands.FIGHT, async (ctx) => {
    const action: BtnAction = 'action.accept_fight';
    ctx.chat.id;
    const [msg, succ]: [string, boolean] = await fightService.startFight(meta(ctx));
    return !succ ? ctx.replyWithMarkdown(msg) :
      ctx.replyWithMarkdown(msg,
          Markup.inlineKeyboard([
            Markup.button.callback(buttons[action], action),
          ]),
      );
  },
  );
  bot.action('action.accept_fight', async (ctx) => {
    if (ctx.callbackQuery === undefined) throw Error('undef callbackQuery');
    if (ctx.chat === undefined) throw Error('undef chat');
    if (ctx.from === undefined) throw Error('undef from');

    const cmeta = meta(ctx);
    const chatId = cmeta.chat.id;
    if (BotContext.session === undefined) return ctx.replyWithMarkdown(messages.ACCEPTED_INVALID_FIGHT_SESS_MSG);
    else if (
      BotContext.session.chatIdSwine === undefined || BotContext.session.chatIdSwine[chatId] === undefined
    ) {
      return ctx.replyWithMarkdown(
          messages.ACCEPTED_INVALID_FIGHT_MSG(cmeta.user.first_name, cmeta.user.id.toString()),
      );
    } else if (cmeta.user.id.toString() === BotContext.session.chatIdSwine[chatId].owner_id) {
      return ctx.replyWithMarkdown(messages.SELF_FIGHT_MSG);
    } else {
      await ctx.replyWithMarkdown(messages.ACCEPT_FIGHT_MSG(cmeta.user.first_name, cmeta.user.id.toString()));
      const msg = await fightService.acceptFight(cmeta);
      return ctx.replyWithMarkdown(msg);
    }
  });
}
