import {botConfig} from '../const/config';
import {dbConst} from '../const/const';
import {Swine} from './model/Swine.model';

export const swineRepository = Object.freeze({
  getAll: async (): Promise<Swine[]> => await Swine.findAll(),
  getByPk: async (ownerId: number, chatId: number): Promise<Swine | null> =>
    await Swine.findOne({
      where: {chatId: chatId, ownerId: ownerId},
    }),
  getTopSwines: async (chatId: number, n?: number): Promise<Swine[]> =>
    await Swine.findAll({
      where: {chatId: chatId},
      order: [[dbConst.WEIGHT_FIELD, 'DESC']],
      limit: n ?? dbConst.TOP_AMOUNT,
    }),
  createSwine: async (
      userId: number,
      chatId: number,
      name?: string,
  ): Promise<Swine> =>
    await Swine.create({
      ownerId: userId,
      chatId: chatId,
      weight: botConfig.SWINE_DEFAULT_WEIGHT,
      lastTimeFed: getDefaultLastTimeFed(),
      name: name ?? botConfig.SWINE_DEFAULT_NAME,
    }),
  updateSwine: async (swine: Swine): Promise<void> => {
    await Swine.update(swine, {
      where: {ownerId: swine.ownerId, chatId: swine.chatId},
    });
  },
  upsertSwine: async (
      userId: number,
      chatId: number,
  ): Promise<[Swine, boolean | null]> =>
    await Swine.upsert({
      ownerId: userId,
      chatId: chatId,
      weight: botConfig.SWINE_DEFAULT_WEIGHT,
      lastTimeFed: getDefaultLastTimeFed(),
    }),
  getOrCreate: async (
      userId: number,
      chatId: number,
  ): Promise<[Swine, boolean]> =>
    await Swine.findOrCreate({
      where: {id: userId},
      defaults: {
        name: botConfig.SWINE_DEFAULT_NAME,
        ownerId: userId,
        chatId: chatId,
        weight: botConfig.SWINE_DEFAULT_WEIGHT,
        lastTimeFed: getDefaultLastTimeFed(),
      },
    }),
  delete: async (userId: number, chatId: number): Promise<number> =>
    await Swine.destroy({
      where: {chatId: chatId, ownerId: userId},
    }),
});

const getDefaultLastTimeFed = (): Date =>
  new Date(new Date().setDate(new Date().getDate() - 1));
