import { MessageMeta } from '../bot/handlers/swine.handlers';
import { botConfig } from '../conf/config';
import { swineRepository, swinesJoinOneTgUser } from '../repository/swine.repository';
import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import { messages } from '../const/messages';
import { computeCD } from './cooldown';

export type FightStatisctics = {
  win: number;
  loss: number;
  draw: number;
};

export const swineService = Object.freeze({
  get: async (meta: MessageMeta): Promise<string> => {
    const swineOrMsg = await isCreated(meta);
    if (typeof swineOrMsg === 'string') return swineOrMsg;
    const cdFeed = computeCD(db.toDate(swineOrMsg.last_time_fed), botConfig.SWINE_FEED_TIMEOUT);
    const cdFight = computeCD(db.toDate(swineOrMsg.last_time_fought), botConfig.SWINE_FIGHT_TIMEOUT);
    return messages.SWINE_INFO_MSG(swineOrMsg.name, swineOrMsg.weight, cdFeed[1], cdFight[1], {
      win: swineOrMsg.win,
      loss: swineOrMsg.loss,
      draw: swineOrMsg.draw,
    });
  },
  feed: async (meta: MessageMeta): Promise<string> => {
    const swineOrMsg = await isCreated(meta);
    if (typeof swineOrMsg === 'string') return swineOrMsg;
    const cd = computeCD(db.toDate(swineOrMsg.last_time_fed), botConfig.SWINE_FEED_TIMEOUT);
    if (cd[0]) {
      return messages.SWINE_FEED_TIMEOUT_MSG(cd[1][0], cd[1][1]);
    }
    const chance = (botConfig.WEIGHTCHANGE_BALANCE.find(w => swineOrMsg.weight <= w[0]) ?? [, 0.5])[1];
    let weightChange = Math.floor(((Math.random() - 0.5) * 2 + chance) * botConfig.SWINE_WEIGHT_CHANGE_ABS);
    console.log(weightChange);
    if (weightChange < 0 && swineOrMsg.weight <= Math.abs(weightChange)) {
      weightChange = -(swineOrMsg.weight - 1);
    }
    swineOrMsg.weight += weightChange;
    swineOrMsg.last_time_fed = db.toString(new Date(), 'timestamptz');
    await swineRepository.upsertSwine(swineOrMsg);
    return messages.SWINE_WEIGHT_CHANGE_MSG(
      swineOrMsg.name,
      weightChange,
      swineOrMsg.weight,
      meta.user.first_name.toString(),
      meta.user.id.toString(),
    );
  },
  rename: async (meta: MessageMeta, name: string): Promise<string> => {
    name = name.trim();
    if (name.length > botConfig.MAX_NAME_LENGTH) {
      return messages.TOO_LARGE_NAME_MSG;
    }
    if (name.length === 0) return messages.SPECIFY_NAME;
    const swineOrMsg = await isCreated(meta);
    if (typeof swineOrMsg === 'string') return swineOrMsg;

    swineOrMsg.name = name;
    await swineRepository.upsertSwine(swineOrMsg);
    return messages.SWINE_RENAME_MSG(swineOrMsg.name);
  },
  getTop: async (meta: MessageMeta, n?: number): Promise<string> => {
    const [swines, chat]: [s.swines.JSONSelectable[], s.tg_chats.JSONSelectable] = await swineRepository.findTopSwines(
      meta,
      n,
    );
    return (
      messages.TOP_MSG(chat.first_name ?? chat.title ?? '') +
      swines.map((swine, index) => messages.TOP_ROW_MSG(index + 1, swine.name, swine.weight)).join('')
    );
  },
  getTopWithOwners: async (meta: MessageMeta, n?: number): Promise<string> => {
    const [swinesAndOwners, chat]: [swinesJoinOneTgUser[], s.tg_chats.JSONSelectable] =
      await swineRepository.findTopSwinesWithOwners(meta, n);
    return (
      messages.TOP_MSG(chat.first_name ?? chat.title ?? '') +
      swinesAndOwners
        .map((swineAndOwner, index) =>
          messages.TOP_ROW_OWNERS_MSG(
            index + 1,
            swineAndOwner.name,
            swineAndOwner.weight,
            swineAndOwner.tg_user.first_name,
          ),
        )
        .join('')
    );
  },
  delete: async (meta: MessageMeta): Promise<string> =>
    swineRepository.findSwine(meta.user.id.toString(), meta.chat.id.toString()).then(async swine => {
      if (!swine) return messages.SWINE_NOT_EXISTS_MSG(meta.user.first_name, meta.user.id.toString());
      await swineRepository.deleteByPk(meta.chat.id.toString(), meta.user.id.toString());
      return messages.SWINE_DELETE_MSG;
    }),
});

const isCreated = async (meta: MessageMeta): Promise<string | s.swines.JSONSelectable> => {
  const [swine, created]: [s.swines.JSONSelectable, boolean] = await swineRepository.findOrCreateSwine(meta);
  if (created) return messages.SWINE_CREATION_MSG(swine.name);
  return swine;
};
