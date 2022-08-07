import {botConfig} from '../conf/config';
import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import {pool} from './pool';
import {MessageMeta} from '../bot/swine.handlers';
import {tgUserRepository} from './tg-user.repository';
import {tgChatRepository} from './tg-chat.repository';

const SWINES_TABLE: s.swines.Table = 'swines';

export const swineRepository = Object.freeze({
  findSwine: async (userId: string, chatId: string)
    : Promise<s.swines.JSONSelectable | undefined> =>
    db.selectOne(
        SWINES_TABLE, {owner_id: userId, chat_id: chatId},
    ).run(pool),
  // TODO: upgrade to JOIN with owners
  findTopSwines: async (meta: MessageMeta, n?: number)
    : Promise<[s.swines.Selectable[], s.tg_chats.JSONSelectable]> => {
    const chat: s.tg_chats.JSONSelectable =
      await tgChatRepository.createOrUpdateChat(meta);
    await tgUserRepository.createOrUpdateUser(meta);
    return [
      await db.sql<s.swines.SQL, s.swines.Selectable[]>`
        SELECT * FROM ${SWINES_TABLE} WHERE ${{chat_id: meta.chatId}}
        ORDER BY ${'weight'} DESC 
        LIMIT ${db.param(n ?? botConfig.SWINE_TOP_ROWS_DEFAULT)}`.run(pool),
      chat,
    ];
  },
  findOrCreateSwine: async (meta: MessageMeta, name?: string)
    : Promise<[s.swines.JSONSelectable, boolean]> =>
    (
      swineRepository.findSwine(meta.userId, meta.chatId)
          .then(async (swine: s.swines.JSONSelectable | undefined) => {
            if (!swine) {
              await tgChatRepository.createOrUpdateChat(meta);
              await tgUserRepository.createOrUpdateUser(meta);
              return [await swineRepository.upsertSwine({
                owner_id: meta.userId,
                chat_id: meta.chatId,
                name: name ?? botConfig.SWINE_DEFAULT_NAME,
                weight: botConfig.SWINE_DEFAULT_WEIGHT,
                last_time_fed: db.toString(dateDayAgo(), 'timestamptz'),
              }), true];
            }
            return [swine, false];
          })
    ),
  upsertSwine: async (swine: s.swines.Insertable)
  : Promise<s.swines.JSONSelectable> =>
    db.upsert(SWINES_TABLE, swine, ['owner_id', 'chat_id']).run(pool),
  deleteByPk: (chatId: string, ownerId: string)
  : Promise<s.swines.JSONSelectable> => {
    return db.deletes(
        SWINES_TABLE, {chat_id: chatId, owner_id: ownerId},
    ).run(pool).then((deleted) => {
      if (deleted.length > 1) {
        throw new Error(
            'Somehow delted more than 1 swine using primary key',
        );
      }
      return deleted[0];
    });
  },
});

export const dateDayAgo = () =>
  new Date(new Date().setDate(new Date().getDate() - 1));
