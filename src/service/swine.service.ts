'use strict';

import { MessageMeta } from '../bot/handlers/swine.handlers';
import { botConfig } from '../conf/config';
import { swineInsertableForRPJobs, swineRepository, SwineJoinOneTgUser } from '../repository/swine.repository';
import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import { messages } from '../const/messages';
import { computeCD } from './cooldown';
import { add } from 'date-fns';
import _ from 'lodash';
import { BotContext } from '../bot/swinebot.context';

export type FightStatisctics = {
  win: number;
  loss: number;
  draw: number;
};

export const swineService = Object.freeze({
  getStats: async (meta: MessageMeta): Promise<string> => {
    const swineOrMsg = await isCreated(meta);
    if (typeof swineOrMsg === 'string') return swineOrMsg;
    const cdFeed = computeCD(db.toDate(swineOrMsg.last_time_fed), botConfig.SWINE_FEED_TIMEOUT);
    const cdFight = computeCD(db.toDate(swineOrMsg.last_time_fought), botConfig.SWINE_FIGHT_TIMEOUT);
    return messages.SWINE_STATS_MSG(
      swineOrMsg.name,
      swineOrMsg.weight,
      swineOrMsg.max_weight,
      cdFeed[1],
      cdFight[1],
      {
        win: swineOrMsg.win,
        loss: swineOrMsg.loss,
        draw: swineOrMsg.draw,
      },
      botConfig.EXP_TO_LVL_FUNC(swineOrMsg.experience),
      swineOrMsg.win_in_row,
      swineOrMsg.draw_in_row,
      swineOrMsg.loss_in_row,
      swineOrMsg.win_in_row_max,
      swineOrMsg.draw_in_row_max,
      swineOrMsg.loss_in_row_max,
      swineOrMsg.fed_times,
    );
  },
  get: async (meta: MessageMeta): Promise<string> => {
    const swineOrMsg = await isCreated(meta);
    if (typeof swineOrMsg === 'string') return swineOrMsg;
    const cdFeed = computeCD(db.toDate(swineOrMsg.last_time_fed), botConfig.SWINE_FEED_TIMEOUT);
    const cdFight = computeCD(db.toDate(swineOrMsg.last_time_fought), botConfig.SWINE_FIGHT_TIMEOUT);
    return messages.SWINE_INFO_MSG(
      swineOrMsg.name,
      swineOrMsg.weight,
      swineOrMsg.max_weight,
      cdFeed[1],
      cdFight[1],
      {
        win: swineOrMsg.win,
        loss: swineOrMsg.loss,
        draw: swineOrMsg.draw,
      },
       botConfig.EXP_TO_LVL_FUNC(swineOrMsg.experience),
    );
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
    swineOrMsg.fed_times++;
    swineOrMsg.to_delete = false;
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
      messages.TOP_WEIGHT_MSG(chat.first_name ?? chat.title ?? '') +
      swines.map((swine, index) => messages.TOP_WEIGHT_ROW_MSG(index + 1, swine.name, swine.weight)).join('')
    );
  },
  getTopWithOwners: async (meta: MessageMeta, n?: number): Promise<string> => {
    const [swinesAndOwners, chat]: [SwineJoinOneTgUser[], s.tg_chats.JSONSelectable] =
      await swineRepository.findTopSwinesWithOwners(meta, n);
    return (
      messages.TOP_WEIGHT_MSG(chat.first_name ?? chat.title ?? '') +
      swinesAndOwners
        .map((swineAndOwner, index) =>
          messages.TOP_ROW_OWNERS_WEIGHT_MSG(
            index + 1,
            swineAndOwner.name,
            swineAndOwner.weight,
            swineAndOwner.tg_user.first_name,
          ),
        )
        .join('')
    );
  },
  getTopFighters: async (meta: MessageMeta, n?: number): Promise<string> => {
    const [swinesAndOwners, chat]: [SwineJoinOneTgUser[], s.tg_chats.JSONSelectable] =
      await swineRepository.findTopFightersPointsWithOwners(meta, n);
    return (
      messages.TOP_FIGHT_MSG(chat.first_name ?? chat.title ?? '') +
      swinesAndOwners
        .map((swineAndOwner, index) =>
          messages.TOP_ROW_OWNERS_FIGHT_MSG(
            index + 1,
            swineAndOwner.name,
            swineAndOwner.points,
            swineAndOwner.win,
            swineAndOwner.loss,
            swineAndOwner.draw,
            swineAndOwner.tg_user.first_name,
          ),
        )
        .join('')
    );
  },
  getTopExpWithOwners: async (meta: MessageMeta, n?: number): Promise<string> => {
    const [swinesAndOwners, chat]: [SwineJoinOneTgUser[], s.tg_chats.JSONSelectable] =
      await swineRepository.findTopExperiencedWithOwners(meta, n);
    return (
      messages.TOP_LVL_MSG(chat.first_name ?? chat.title ?? '') +
      swinesAndOwners
        .map((swineAndOwner, index) =>
          messages.TOP_ROW_OWNERS_LVL_MSG(
            index + 1,
            swineAndOwner.name,
            botConfig.EXP_TO_LVL_FUNC(swineAndOwner.experience),
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
  findNotFed: async (): Promise<
    [Record<string, [SwineJoinOneTgUser, number][]>, Record<string, SwineJoinOneTgUser[]>]
  > => {
    const lossWeight: Record<string, [SwineJoinOneTgUser, number][]> = {};
    const toKill: Record<string, SwineJoinOneTgUser[]> = {};
    const swines: SwineJoinOneTgUser[] = await swineRepository.findNotFed();
    if (swines !== undefined && swines.length > 0) {
      for (const sw of swines) {
        if (
          sw.weight <= 1 ||
          sw.last_time_fed <
            db.toString(
              add(new Date(), { hours: botConfig.SWINE_FEED_TIMEOUT + botConfig.TIME_BEFORE_DEATH }),
              'timestamptz',
            )
        ) {
          sw.to_delete = true;
          if (!toKill.hasOwnProperty(sw.chat_id)) {
            toKill[sw.chat_id] = [];
          }
          toKill[sw.chat_id].push(sw);
        } else {
          let wc = _.random(botConfig.MIN_WEIGHT_LOSS, botConfig.SWINE_WEIGHT_CHANGE_ABS);
          wc = wc > sw.weight - 1 ? sw.weight - 1 : wc;
          sw.weight -= wc;

          if (!lossWeight.hasOwnProperty(sw.chat_id)) {
            lossWeight[sw.chat_id] = [];
          }
          lossWeight[sw.chat_id].push([sw, wc]);
        }
      }
    }
    await swineRepository.upsertSwines(swines.map(s => swineInsertableForRPJobs(s)));
    return [lossWeight, toKill];
  },
  deleteDeadSwines: async (): Promise<s.swines.JSONSelectable[]> => await swineRepository.deleteDead(),
});

const isCreated = async (meta: MessageMeta): Promise<string | s.swines.JSONSelectable> => {
  const [swine, created]: [s.swines.JSONSelectable, boolean] = await swineRepository.findOrCreateSwine(meta);
  if (created) return messages.SWINE_CREATION_MSG(swine.name);
  return swine;
};
