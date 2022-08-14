import { Context, Middleware, MiddlewareFn } from 'telegraf';
import { messages } from '../../const/messages';

export const noChannelAllowed: Middleware<Context> = async (ctx, next) => {
  if (ctx.channelPost || ctx.myChatMember?.chat.type === 'channel') {
    await ctx.reply(messages.CHANNEL_IS_NOT_ALLOWED_MSG);
    await ctx.leaveChat();
  }
  return next();
};
