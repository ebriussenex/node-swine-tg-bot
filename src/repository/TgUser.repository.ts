import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import {pool} from './pool';
import {MessageMeta} from '../app';

const TG_USERS_TABLE: s.tg_users.Table = 'tg_users';

export const tgUserRepository = Object.freeze({
  createOrUpdateUser: async (
      meta: MessageMeta,
  ): Promise<s.tg_users.JSONSelectable> =>
    await db.upsert(TG_USERS_TABLE, {
      id: meta.userId,
      is_bot: meta.userIsBot,
      username: meta.username,
      first_name: meta.userFirstName,
      last_name: meta.userLastName,
    }, 'id').run(pool),
});
