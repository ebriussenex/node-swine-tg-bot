import type * as s from 'zapatos/schema';

interface SessionData {
  chatIdSwine: Record<number, s.swines.JSONSelectable>;
}

export abstract class BotContext {
  static session?: SessionData;
}
