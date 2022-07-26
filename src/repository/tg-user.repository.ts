import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import { pool } from './pool';
import { MessageMeta } from '../bot/handlers/swine.handlers';

const TG_USERS_TABLE: s.tg_users.Table = 'tg_users';

export const tgUserRepository = Object.freeze({
  createOrUpdateUser: async (meta: MessageMeta): Promise<s.tg_users.JSONSelectable> =>
    await db
      .upsert(
        TG_USERS_TABLE,
        {
          id: meta.user.id.toString(),
          is_bot: meta.user.is_bot,
          username: meta.user.username,
          first_name: meta.user.first_name,
          last_name: meta.user.last_name,
        },
        'id',
      )
      .run(pool),
});
