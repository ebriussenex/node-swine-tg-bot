import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import {MessageMeta} from '../app';
import {botConfig} from '../conf/config';
import {forbiddenSymbols, messages} from '../const/const';
import {dateDayAgo, swineRepository} from '../repository/Swine.repository';

export const swineService = Object.freeze({
  get: async (meta: MessageMeta): Promise<string> => {
    const [swine, created]: [s.swines.JSONSelectable, boolean] =
      await swineRepository.findOrCreateSwine(meta);
    if (created) return messages.SWINE_CREATION_MSG(swine.name);
    const ltf: number = db.toDate(swine.last_time_fed)?.getTime();
    let diff = 0;
    if (ltf < new Date().getTime()) diff = ltf - new Date().getTime();
    return messages.SWINE_INFO_MSG(
        swine.name,
        swine.weight,
        new Date(diff).getUTCHours(),
        new Date(diff).getUTCMinutes());
  },
  feed: async (meta: MessageMeta): Promise<string> => {
    const [swine, created]: [s.swines.JSONSelectable, boolean] =
      await swineRepository.findOrCreateSwine(meta);
    if (created) return messages.SWINE_CREATION_MSG(swine.name);
    const ltf = db.toDate(swine.last_time_fed);
    if (ltf <= dateDayAgo()) {
      let weightChange = Math.floor(
          (Math.random() - 0.5) * 2 * botConfig.SWINE_WEIGHT_CHANGE_ABS,
      );
      console.log(weightChange);
      if (weightChange < 0 && swine.weight < Math.abs(weightChange)) {
        weightChange = -(swine.weight - 1);
      }
      swine.weight += weightChange;
      swine.last_time_fed = db.toString(new Date(), 'timestamptz');
      await swineRepository.upsertSwine(swine);
      return messages.SWINE_WEIGHT_CHANGE_MSG(
          swine.name,
          weightChange,
          swine.weight,
      );
    }
    ltf.setDate(ltf.getDate() + 1);
    const diff = new Date(
        ltf.getTime() - new Date().getTime(),
    );
    console.log(diff);
    return messages.SWINE_FEED_TIMEOUT_MSG(
        diff.getUTCHours(),
        diff.getUTCMinutes(),
    );
  },
  rename: async (meta: MessageMeta, name: string): Promise<string> => {
    name = name.trim();
    if (name.length > botConfig.MAX_NAME_LENGTH) {
      return messages.TOO_LARGE_NAME_MSG;
    }
    if (name.length === 0) return messages.SPECIFY_NAME;
    let forbiddenChar = '';
    if (forbiddenSymbols.some(
        (s) => {
          forbiddenChar = s;
          return name.includes(s);
        },
    )) {
      return messages.FORBIDDEN_NAME_CHAR_MSG(forbiddenChar);
    }
    const [swine, created]: [s.swines.JSONSelectable, boolean] =
      await swineRepository.findOrCreateSwine(meta, name);
    if (created) return messages.SWINE_CREATION_MSG(swine.name);

    swine.name = name;
    await swineRepository.upsertSwine(swine);
    return messages.SWINE_RENAME_MSG(swine.name);
  },
  getTop: async (meta: MessageMeta, n?: number): Promise<string> => {
    const [swines, chat]: [s.swines.Selectable[], s.tg_chats.JSONSelectable] =
      await swineRepository.findTopSwines(meta, n);
    return messages.TOP_MSG(chat.first_name ?? chat.title ?? '') +
      swines.map(
          (swine, index) => messages.TOP_ROW_MSG(
              index + 1, swine.name, swine.weight,
          ),
      ).join('');
  },
  delete: async (meta: MessageMeta): Promise<string> =>
    swineRepository.findSwine(meta.userId, meta.chatId).then(async (swine) => {
      if (!swine) return messages.SWINE_NOT_EXISTS_MSG;
      await swineRepository.deleteByPk(meta.chatId, meta.userId);
      return messages.SWINE_DELETE_MSG;
    }),
});
