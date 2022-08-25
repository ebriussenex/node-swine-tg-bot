import { botConfig } from '../conf/config';
import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as s from 'zapatos/schema';
import { pool } from './pool';
import { MessageMeta } from '../bot/handlers/swine.handlers';
import { tgUserRepository } from './tg-user.repository';
import { tgChatRepository } from './tg-chat.repository';
import { add } from 'date-fns';

export type SwinesJoinOneTgUser = s.swines.JSONSelectable &
  db.LateralResult<{ tg_user: db.SQLFragment<s.tg_users.JSONSelectable, never> }>;
const SWINES_TABLE: s.swines.Table = 'swines';
const TG_USERS_TABLE: s.tg_users.Table = 'tg_users';

export const swineRepository = Object.freeze({
  findSwine: async (userId: string, chatId: string): Promise<s.swines.JSONSelectable | undefined> =>
    db.selectOne(SWINES_TABLE, { owner_id: userId, chat_id: chatId }).run(pool),
  findTopSwines: async (
    meta: MessageMeta,
    n?: number,
  ): Promise<[s.swines.JSONSelectable[], s.tg_chats.JSONSelectable]> => {
    const chat: s.tg_chats.JSONSelectable = await tgChatRepository.createOrUpdateChat(meta);
    await tgUserRepository.createOrUpdateUser(meta);
    return [
      await db
        .select(
          SWINES_TABLE,
          { chat_id: meta.chat.id.toString() },
          {
            lateral: {
              users: db.select(TG_USERS_TABLE, { id: db.parent('owner_id') }, { columns: ['first_name', 'id'] }),
            },
            order: {
              by: 'weight',
              direction: 'DESC',
            },
            limit: n,
          },
        )
        .run(pool),
      chat,
    ];
  },
  findTopFightersPoints: async (
    meta: MessageMeta,
    n?: number,
  ): Promise<[s.swines.JSONSelectable[], s.tg_chats.JSONSelectable]> => {
    const chat: s.tg_chats.JSONSelectable = await tgChatRepository.createOrUpdateChat(meta);
    await tgUserRepository.createOrUpdateUser(meta);
    return [
      await db
        .select(
          SWINES_TABLE,
          { chat_id: meta.chat.id.toString() },
          {
            lateral: {
              users: db.select(TG_USERS_TABLE, { id: db.parent('owner_id') }, { columns: ['first_name', 'id'] }),
            },
            order: {
              by: 'win',
              direction: 'DESC',
            },
            limit: n,
          },
        )
        .run(pool),
      chat,
    ];
  },

  findTopSwinesWithOwners: async (
    meta: MessageMeta,
    n?: number,
  ): Promise<[SwinesJoinOneTgUser[], s.tg_chats.JSONSelectable]> => {
    const chat: s.tg_chats.JSONSelectable = await tgChatRepository.createOrUpdateChat(meta);
    await tgUserRepository.createOrUpdateUser(meta);
    return [
      await db
        .select(
          SWINES_TABLE,
          { chat_id: meta.chat.id.toString() },
          {
            lateral: {
              tg_user: db.selectExactlyOne(TG_USERS_TABLE, { id: db.parent('owner_id') }),
            },
            order: {
              by: 'weight',
              direction: 'DESC',
            },
            limit: n,
          },
        )
        .run(pool),
      chat,
    ];
  },
  findOrCreateSwine: async (meta: MessageMeta, name?: string): Promise<[s.swines.JSONSelectable, boolean]> =>
    swineRepository
      .findSwine(meta.user.id.toString(), meta.chat.id.toString())
      .then(async (swine: s.swines.JSONSelectable | undefined) => {
        if (!swine) {
          await tgChatRepository.createOrUpdateChat(meta);
          await tgUserRepository.createOrUpdateUser(meta);
          return [
            await swineRepository.upsertSwine({
              owner_id: meta.user.id.toString(),
              chat_id: meta.chat.id.toString(),
              name: name ?? botConfig.SWINE_DEFAULT_NAME,
              weight: botConfig.SWINE_DEFAULT_WEIGHT,
              last_time_fed: db.toString(add(new Date(), { hours: -botConfig.SWINE_FEED_TIMEOUT }), 'timestamptz'),
              last_time_fought: db.toString(add(new Date(), { hours: -botConfig.SWINE_FIGHT_TIMEOUT }), 'timestamptz'),
              win: 0,
              loss: 0,
            }),
            true,
          ];
        }
        return [swine, false];
      }),
  upsertSwine: async (swine: s.swines.Insertable): Promise<s.swines.JSONSelectable> =>
    db.upsert(SWINES_TABLE, swine, ['owner_id', 'chat_id']).run(pool),
  deleteByPk: (chatId: string, ownerId: string): Promise<s.swines.JSONSelectable> => {
    return db
      .deletes(SWINES_TABLE, { chat_id: chatId, owner_id: ownerId })
      .run(pool)
      .then(deleted => {
        if (deleted.length > 1) {
          throw new Error('Somehow delted more than 1 swine using primary key');
        }
        return deleted[0];
      });
  },
  upsertSwines: async (swines: s.swines.Insertable[]): Promise<s.swines.JSONSelectable[]> =>
    db.upsert(SWINES_TABLE, swines, ['owner_id', 'chat_id']).run(pool),
  findNotFed: async (): Promise<SwinesJoinOneTgUser[]> =>
    db
      .select(
        SWINES_TABLE,
        {
          last_time_fed: dc.before(
            dc.fromNow(-(botConfig.SWINE_FEED_TIMEOUT + botConfig.TIME_BEFORE_WEIGHT_LOSE), 'hours'),
          ),
        },
        {
          lateral: {
            tg_user: db.selectExactlyOne(TG_USERS_TABLE, { id: db.parent('owner_id') }),
          },
        },
      )
      .run(pool),
  deleteDead: async (): Promise<s.swines.JSONSelectable[]> =>
    db
      .deletes(SWINES_TABLE, {
        to_delete: true,
      })
      .run(pool),
});

export const swineInsertableFromSwinesJoinOneTgUser = (swine: s.swines.JSONSelectable): s.swines.JSONSelectable => ({
  id: swine.id,
  owner_id: swine.owner_id,
  chat_id: swine.chat_id,
  name: swine.name,
  weight: swine.weight,
  last_time_fed: swine.last_time_fed,
  last_time_fought: swine.last_time_fought,
  win: swine.win,
  loss: swine.loss,
  draw: swine.draw,
  fed_times: swine.fed_times,
  to_delete: swine.to_delete,
});
