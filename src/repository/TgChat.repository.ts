import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import {pool} from './pool';
import {MessageMeta} from '../app';

const TG_CHATS_TABLE: s.tg_chats.Table = 'tg_chats';

export const tgChatRepository = Object.freeze({
  createOrUpdateChat: async (
      meta: MessageMeta,
  ): Promise<s.tg_chats.JSONSelectable> =>
    await db.upsert(TG_CHATS_TABLE, {
      id: meta.chatId,
      chat_type: meta.chatType,
      title: meta.chatTitle,
      first_name: meta.chatFirstName,
      last_name: meta.chatLastName,
    }, 'id').run(pool),
});
