/* eslint-disable require-jsdoc */
import {queries} from './queries';
import 'datejs';
import {dbConst} from '../const/const';
import {Swine} from './model/Swine';
import {QueryResultRow} from 'pg';
import {botConfig} from '../const/config';

export const swineRepository = Object.freeze({
  getAll: async (): Promise<Swine[]> =>
    (await queries.getAll(dbConst.SWINE_TABLE)).map((r) => swineFromRow(r)),

  getById: async (id: string | number): Promise<Swine> =>
    await swineFromRow(queries.getById(dbConst.SWINE_TABLE, id)),

  getTopSwines: async (n: number): Promise<Swine[]> =>
    (await queries.getTopByField(dbConst.SWINE_TABLE, dbConst.WEIGHT_FIELD, n)).map((r) =>
      swineFromRow(r),
    ),

  createSwine: async (
      id: number,
      chatId: number,
      name?: string,
  ): Promise<Swine> => {
    const valueMap: Map<string, string | number | Date> = new Map<
      string,
      string | number | Date
    >([
      [dbConst.ID_FIELD, id],
      [dbConst.CHAT_ID_FIELD, chatId],
      [dbConst.NAME_FIELD, name === undefined ? botConfig.SWINE_DEFAULT_NAME : name],
      [dbConst.WEIGHT_FIELD, dbConst.WEIGHT_FIELD],
      [dbConst.LAST_TIME_FED_FIELD, Date.today().addDays(-1)],
    ]);
    return swineFromRow(await queries.create(dbConst.SWINE_TABLE, valueMap));
  },

  updateSwine: async (swine: Swine): Promise<Swine> => {
    const valueMap: Map<string, string | number | Date> = new Map<
      string,
      string | number | Date
    >([
      [dbConst.CHAT_ID_FIELD, swine.chatId],
      [dbConst.NAME_FIELD, swine.name],
      [dbConst.WEIGHT_FIELD, swine.weight],
      [dbConst.LAST_TIME_FED_FIELD, swine.lastTimeFed],
    ]);
    return swineFromRow(
        await queries.update(dbConst.SWINE_TABLE, dbConst.ID_FIELD, swine.id, valueMap),
    );
  },
});

function swineFromRow(row: QueryResultRow): Swine {
  return new Swine(
      row[dbConst.ID_FIELD],
      row[dbConst.CHAT_ID_FIELD],
      row[dbConst.WEIGHT_FIELD],
      row[dbConst.LAST_TIME_FED_FIELD],
      row[dbConst.NAME_FIELD],
  );
}
