import { MessageMeta } from '../bot/handlers/swine.handlers';
import { BotContext } from '../bot/swinebot.context';
import { swineRepository } from '../repository/swine.repository';
import type * as s from 'zapatos/schema';
import * as db from 'zapatos/db';
import * as _ from 'lodash';
import { botConfig } from '../conf/config';
import { computeCD } from './cooldown';
import { messages } from '../const/messages';

type ResultType = 'lw' | 'rw' | 'dr';

type FightResult = {
  lhs: s.swines.JSONSelectable;
  rhs: s.swines.JSONSelectable;
  result: ResultType;
  wc: number;
};

export const fightService = Object.freeze({
  startFight: async (meta: MessageMeta): Promise<[string, boolean]> => {
    const swineOrMsg = await isLegitimate(meta);
    if (typeof swineOrMsg === 'string') return [swineOrMsg, false];
    const swine = swineOrMsg;
    BotContext.session ??= { chatIdSwine: {}, chatIdUser: {} };

    BotContext.session.chatIdSwine[meta.chat.id] = swine;
    BotContext.session.chatIdUser[meta.chat.id] = meta.user;

    return [
      messages.FIGHT_START_MSG(meta.user.first_name.toString(), meta.user.id.toString(), swine.name, swine.weight),
      true,
    ];
  },

  acceptFight: async (meta: MessageMeta): Promise<[string, boolean]> => {
    const chatId = meta.chat.id;
    if (BotContext.session === undefined) throw Error("Session undefined, shouldn't happen ever in accceptFight");
    const swineOrMsg = await isLegitimate(meta);
    if (typeof swineOrMsg === 'string') return [swineOrMsg, false];
    const swine = swineOrMsg;
    const initWeight = swine.weight;
    await updateFirstSwine(chatId);
    const fr = battle(BotContext.session.chatIdSwine[chatId], swine);
    await swineRepository.upsertSwines([fr.lhs, fr.rhs]);
    delete BotContext.session.chatIdSwine[chatId];
    if (fr.result === 'rw') [fr.lhs, fr.rhs] = [fr.rhs, fr.lhs];
    return fr.result === 'dr'
      ? [
          messages.DRAW_MSG(
            BotContext.session.chatIdUser[chatId].first_name,
            BotContext.session.chatIdUser[chatId].id.toString(),
            swine.name,
            swine.weight,
          ),
          true,
        ]
      : [
          messages.FIGHT_RES_MSG(
            BotContext.session.chatIdUser[meta.chat.id].first_name,
            BotContext.session.chatIdUser[meta.chat.id].id.toString(),
            swine.name,
            initWeight,
            fr.lhs.name,
            fr.rhs.name,
            fr.wc,
          ),
          true,
        ];
  },
});

const isLegitimate = async (meta: MessageMeta): Promise<string | s.swines.JSONSelectable> => {
  const swine = await swineRepository.findSwine(meta.user.id.toString(), meta.chat.id.toString());
  if (!swine) return messages.SWINE_NOT_EXISTS_MSG(meta.user.first_name, meta.user.id.toString());
  const cd = computeCD(db.toDate(swine.last_time_fought), botConfig.SWINE_FIGHT_TIMEOUT);
  if (cd[0]) {
    return messages.FIGHT_TIMEOUT_MSG(meta.user.first_name, meta.user.id.toString(), cd[1][0], cd[1][1]);
  }
  if (swine.weight < botConfig.MIN_FIGHT_WEIGHT) {
    return messages.NOT_ENOUGH_WEIGHT_TO_FIGHT_MSG(
      meta.user.first_name,
      meta.user.id.toString(),
      swine.weight,
      swine.name,
    );
  }
  return swine;
};

function battle(lhs: s.swines.JSONSelectable, rhs: s.swines.JSONSelectable): FightResult {
  const chance = _.random(0, 4);
  const res: ResultType = chance === 0 ? 'dr' : chance < 3 ? 'lw' : 'rw';
  let weightChange = Math.floor((Math.random() + 0.2) * Math.min(lhs.weight, rhs.weight) * botConfig.MAX_PART_EATEN);
  weightChange = weightChange > botConfig.MAX_FIGHT_WEIGHT_CHANGE ? botConfig.MAX_FIGHT_WEIGHT_CHANGE : weightChange;
  weightChange = weightChange === 0 ? 1 : weightChange;
  console.log(weightChange);
  res === 'lw'
    ? changeWeightsLW(lhs, rhs, weightChange)
    : res === 'rw'
    ? changeWeightsLW(rhs, lhs, weightChange)
    : changeWeightsLW(rhs, lhs, 0);
  lhs.last_time_fought = db.toString(new Date(), 'timestamptz');
  rhs.last_time_fought = db.toString(new Date(), 'timestamptz');
  return { lhs: lhs, rhs: rhs, result: res, wc: weightChange };
}

const changeWeightsLW = (lhs: s.swines.JSONSelectable, rhs: s.swines.JSONSelectable, wc: number): void => {
  if (wc === 0) {
    lhs.draw++;
    rhs.draw++;
  } else {
    lhs.weight += wc;
    rhs.weight -= wc;
    lhs.win++;
    rhs.loss++;
  }
};

async function updateFirstSwine(chatId: number) {
  if (BotContext.session === undefined) throw Error("Session undefined, shouldn't happen ever in updateFirstSwine");
  const before = BotContext.session.chatIdSwine[chatId];
  const after = await swineRepository.findSwine(before.owner_id, before.chat_id)
  if (after === undefined) delete BotContext.session.chatIdSwine[chatId];
  else BotContext.session.chatIdSwine[chatId] = after;
}
