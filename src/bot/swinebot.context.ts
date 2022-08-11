import {Chat, User} from 'telegraf/typings/core/types/typegram';
import type * as s from 'zapatos/schema';

type ChatSwine = {
  swine: s.swines.JSONSelectable
}
interface SessionData {
    chatIdSwine: Record<number, s.swines.JSONSelectable>,
}

export abstract class BotContext {
  static session?: SessionData;
}
