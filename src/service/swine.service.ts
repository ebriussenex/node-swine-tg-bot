import { MessageMeta } from '../bot/handlers/swine.handlers';
import { botConfig } from '../conf/config';
import { swineRepository, swinesJoinOneTgUser } from '../repository/swine.repository';
import { add } from 'date-fns';
import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import { forbiddenSymbols } from '../const/commands';
import { messages } from '../const/messages';

export type FightStatisctics = {
  win: number;
  loss: number;
  draw: number;
};

export const swineService = Object.freeze({
  get: async (meta: MessageMeta): Promise<string> => {
    const [swine, created]: [s.swines.JSONSelectable, boolean] = await swineRepository.findOrCreateSwine(meta);
    if (created) return messages.SWINE_CREATION_MSG(swine.name);
    return messages.SWINE_INFO_MSG(
      swine.name,
      swine.weight,
      getHoursMinDiffFromNow(add(db.toDate(swine.last_time_fed), { hours: botConfig.SWINE_FEED_TIMEOUT }).getTime()),
      getHoursMinDiffFromNow(
        add(db.toDate(swine.last_time_fought), { hours: botConfig.SWINE_FIGHT_TIMEOUT }).getTime(),
      ),
      {
        win: swine.win,
        loss: swine.loss,
        draw: swine.draw,
      },
    );
  },
  feed: async (meta: MessageMeta): Promise<string> => {
    const [swine, created]: [s.swines.JSONSelectable, boolean] = await swineRepository.findOrCreateSwine(meta);
    if (created) return messages.SWINE_CREATION_MSG(swine.name);
    const ltf = db.toDate(swine.last_time_fed);
    if (ltf <= add(new Date(), { hours: -botConfig.SWINE_FEED_TIMEOUT })) {
      const chance = (botConfig.WEIGHTCHANGE_BALANCE.find(w => swine.weight <= w[0]) ?? [, 0.5])[1];
      let weightChange = Math.floor(((Math.random() - 0.5) * 2 + chance) * botConfig.SWINE_WEIGHT_CHANGE_ABS);
      console.log(weightChange);
      if (weightChange < 0 && swine.weight <= Math.abs(weightChange)) {
        weightChange = -(swine.weight - 1);
      }
      swine.weight += weightChange;
      swine.last_time_fed = db.toString(new Date(), 'timestamptz');
      await swineRepository.upsertSwine(swine);
      return messages.SWINE_WEIGHT_CHANGE_MSG(
        swine.name,
        weightChange,
        swine.weight,
        meta.user.first_name.toString(),
        meta.user.id.toString(),
      );
    }
    add(ltf, { hours: botConfig.SWINE_FEED_TIMEOUT });
    const diff = new Date(ltf.getTime() - new Date().getTime());
    return messages.SWINE_FEED_TIMEOUT_MSG(diff.getUTCHours(), diff.getUTCMinutes());
  },
  rename: async (meta: MessageMeta, name: string): Promise<string> => {
    name = name.trim();
    if (name.length > botConfig.MAX_NAME_LENGTH) {
      return messages.TOO_LARGE_NAME_MSG;
    }
    if (name.length === 0) return messages.SPECIFY_NAME;
    let forbiddenChar = '';
    if (
      forbiddenSymbols.some(s => {
        forbiddenChar = s;
        return name.includes(s);
      })
    ) {
      return messages.FORBIDDEN_NAME_CHAR_MSG(forbiddenChar);
    }
    const [swine, created]: [s.swines.JSONSelectable, boolean] = await swineRepository.findOrCreateSwine(meta, name);
    if (created) return messages.SWINE_CREATION_MSG(swine.name);

    swine.name = name;
    await swineRepository.upsertSwine(swine);
    return messages.SWINE_RENAME_MSG(swine.name);
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

const getHoursMinDiffFromNow = (date: number): [number, number] => {
  let diff = 0;
  if (date > new Date().getTime()) diff = date - new Date().getTime();
  return [new Date(diff).getUTCHours(), new Date(diff).getUTCMinutes()];
};
