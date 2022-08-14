import {MessageMeta} from '../bot/handlers/swine.handlers';
import {BotContext} from '../bot/swinebot.context';
import {messages} from '../const/messages';
import {swineRepository} from '../repository/swine.repository';
import type * as s from 'zapatos/schema';
import * as db from 'zapatos/db';
import * as _ from 'lodash';
import {botConfig} from '../conf/config';
import {add} from 'date-fns';


type ResultType = 'lw' | 'rw' | 'dr';

type FightResult = {
  lhs: s.swines.JSONSelectable,
  rhs: s.swines.JSONSelectable,
  result: ResultType,
  wc: number
}

export const fightService = Object.freeze({
  startFight: async (meta: MessageMeta): Promise<[string, boolean]> => {
    const swine = await swineRepository.findSwine(meta.user.id.toString(), meta.chat.id.toString());
    if (!swine) return [messages.SWINE_NOT_EXISTS_MSG(meta.user.first_name, meta.user.id.toString()), false];
    const ltf = db.toDate(swine.last_time_fought);
    if (ltf > add(new Date(), {hours: -botConfig.SWINE_FIGHT_TIMEOUT})) {
      const diff = new Date(
          add(ltf, {hours: botConfig.SWINE_FIGHT_TIMEOUT}).getTime() - new Date().getTime(),
      );
      return [messages.FIGHT_TIMEOUT_MSG(
          meta.user.first_name, meta.user.id.toString(), diff.getUTCHours(), diff.getUTCMinutes(),
      ), false];
    }
    if (swine.weight < botConfig.MIN_FIGHT_WEIGHT) {
      return [messages.NOT_ENOUGH_WEIGHT_TO_FIGHT_MSG(
          meta.user.first_name, meta.user.id.toString(), swine.weight, swine.name,
      ), false];
    }
    BotContext.session ??= {chatIdSwine: {}};
    BotContext.session.chatIdSwine[meta.chat.id] = swine;
    return [
      messages.FIGHT_START_MSG(meta.user.first_name.toString(), meta.user.id.toString(), swine.name, swine.weight),
      true,
    ];
  },

  acceptFight: async (meta: MessageMeta): Promise<string> => {
    if (BotContext.session === undefined) throw Error('Session undefined, shouldn\'t happen ever in accceptFight');
    const swine = await swineRepository.findSwine(meta.user.id.toString(), meta.chat.id.toString());

    if (!swine) return messages.SWINE_NOT_EXISTS_MSG(meta.user.first_name, meta.user.id.toString());
    const ltf = db.toDate(swine.last_time_fought);
    const firstWeight = swine.weight;
    if (ltf > add(new Date(), {hours: -botConfig.SWINE_FIGHT_TIMEOUT})) {
      const diff = new Date(
          add(ltf, {hours: botConfig.SWINE_FIGHT_TIMEOUT}).getTime() - new Date().getTime(),
      );
      return messages.FIGHT_TIMEOUT_MSG(
          meta.user.first_name, meta.user.id.toString(), diff.getUTCHours(), diff.getUTCMinutes(),
      );
    }
    if (swine.weight < botConfig.MIN_FIGHT_WEIGHT) {
      return messages.NOT_ENOUGH_WEIGHT_TO_FIGHT_MSG(
          meta.user.first_name, meta.user.id.toString(), swine.weight, swine.name,
      );
    }
    const fr = battle(BotContext.session.chatIdSwine[meta.chat.id], swine);
    await swineRepository.upsertSwines([fr.lhs, fr.rhs]);
    delete BotContext.session.chatIdSwine[meta.chat.id];
    if (fr.result === 'rw') [fr.lhs, fr.rhs] = [fr.rhs, fr.lhs];
    return (fr.result === 'dr' ? messages.DRAW_MSG(swine.name, swine.weight) :
            messages.FIGHT_RES_MSG(swine.name, firstWeight, fr.lhs.name, fr.rhs.name, fr.wc));
  },
});

function battle(lhs: s.swines.JSONSelectable, rhs: s.swines.JSONSelectable): FightResult {
  const chance = _.random(0, 4);
  const res: ResultType = chance === 0 ? 'dr' : chance < 3 ? 'lw' : 'rw';
  let weightChange = Math.floor(
      (Math.random() + 0.2) * Math.min(lhs.weight, rhs.weight) * 0.6,
  );
  weightChange = weightChange > botConfig.MAX_FIGHT_WEIGHT_CHANGE ? botConfig.MAX_FIGHT_WEIGHT_CHANGE : weightChange;
  console.log(weightChange);
  res === 'lw' ?
    changeWeightsLW(lhs, rhs, weightChange) :
    res === 'rw' ?
      changeWeightsLW(rhs, lhs, weightChange) :
        changeWeightsLW(rhs, lhs, 0);
  lhs.last_time_fought = db.toString(new Date(), 'timestamptz');
  rhs.last_time_fought = db.toString(new Date(), 'timestamptz');
  return {lhs: lhs, rhs: rhs, result: res, wc: weightChange};
}

const addDraw = (lhs: s.swines.JSONSelectable, rhs: s.swines.JSONSelectable):
void => {
  lhs.draw++;
  rhs.draw++;
};

const changeWeightsLW = (lhs: s.swines.JSONSelectable, rhs: s.swines.JSONSelectable, wc: number):
  void => {
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
