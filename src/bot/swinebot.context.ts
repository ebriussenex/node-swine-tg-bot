import { User } from 'telegraf/typings/core/types/typegram';
import type * as s from 'zapatos/schema';

interface SessionData {
  chatIdSwine: Record<number, s.swines.JSONSelectable>;
  chatIdUser: Record<number, User>;
}

export abstract class BotContext {
  static session?: SessionData;
}
