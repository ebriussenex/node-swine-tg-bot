import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import {pool} from './pool';
import {MessageMeta} from '../bot/handlers/swine.handlers';

const TG_CHATS_TABLE: s.tg_chats.Table = 'tg_chats';

export const tgChatRepository = Object.freeze({
  createOrUpdateChat: async (
      meta: MessageMeta,
  ): Promise<s.tg_chats.JSONSelectable> =>
    await db.upsert(TG_CHATS_TABLE, {
      id: meta.chat.id.toString(),
      chat_type: meta.chat.type,
      title: 'title' in meta.chat ? meta.chat.title : null,
      first_name: 'first_name' in meta.chat ? meta.chat.first_name : null,
      last_name: 'last_name' in meta.chat ? meta.chat.last_name : null,
    }, 'id').run(pool),
});
