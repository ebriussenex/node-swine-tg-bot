import {MessageMeta} from '../app';
import {botConfig} from '../const/config';
import {messages} from '../const/const';
import {Swine} from '../repository/model/Swine.model';
import {swineRepository} from '../repository/Swine.repository';
import {tgChatRepository} from '../repository/TgChat.repository';
import {tgUserRepository} from '../repository/TgUser.repository';

export const swineService = Object.freeze({
  get: async (meta: MessageMeta): Promise<string> => {
    return await swineRepository
        .getByPk(meta.userId, meta.chatId)
        .then(async (swine: Swine | null) => {
          if (!swine) return createSwine(meta);
          const diff = new Date(
              new Date().getTime() - swine.lastTimeFed.getTime(),
          );
          return messages.SWINE_INFO_MSG(
              swine.name,
              swine.weight,
              diff.getHours(),
              diff.getMinutes(),
          );
        });
  },
  feed: async (meta: MessageMeta): Promise<string> => {
    return await swineRepository
        .getByPk(meta.userId, meta.chatId)
        .then(async (swine: Swine | null) => {
          if (!swine) return createSwine(meta);
          if (swine.lastTimeFed <= new Date()) {
            const weightChange = Math.floor(
                (Math.random() - 0.5) * 2 * botConfig.SWINE_WEIGHT_CHANGE_ABS,
            );
            swine.weight += weightChange;
            swine.lastTimeFed = new Date();
            await swineRepository.updateSwine(swine);
            return messages.SWINE_WEIGHT_CHANGE_MSG(
                swine.name,
                weightChange,
                swine.weight,
            );
          }
          const diff = new Date(
              new Date().getTime() - swine.lastTimeFed.getTime(),
          );
          return messages.SWINE_FEED_TIMEOUT_MSG(
              diff.getHours(),
              diff.getMinutes(),
          );
        });
  },
  rename: async (meta: MessageMeta, name: string): Promise<string> => {
    return await swineRepository
        .getByPk(meta.userId, meta.chatId)
        .then(async (swine: Swine | null) => {
          if (!swine) return createSwine(meta, name);
          swine.name = name;
          await swineRepository.updateSwine(swine);
          return messages.SWINE_RENAME_MSG(swine.name);
        });
  },
  getTop: async (chatId: number): Promise<string> => {
    return (await swineRepository.getTopSwines(chatId, 10))
        .map((swine, index) =>
          messages.TOP_ROW_MSG(index + 1, swine.name, swine.weight),
        )
        .join('');
  },
  delete: async (meta: MessageMeta): Promise<string> => {
    return await swineRepository
        .getByPk(meta.userId, meta.chatId)
        .then(async (swine: Swine | null) => {
          if (!swine) return messages.SWINE_NOT_EXISTS_MSG;
          await swineRepository.delete(meta.userId, meta.chatId);
          return messages.SWINE_DELETE_MSG;
        });
  },
});

const createSwine = async (meta: MessageMeta, name?: string) => {
  await tgUserRepository.getOrCreate(
      meta.userId,
      meta.userIsBot,
      meta.userFirstName,
      meta.userLastName,
      meta.userName,
  );
  await tgChatRepository.getOrCreate(
      meta.chatId,
      meta.chatType,
      meta.chatFirstName,
      meta.chatLastName,
      meta.chatTitle,
  );
  const swine = await swineRepository.createSwine(
      meta.userId,
      meta.chatId,
      name ?? botConfig.SWINE_DEFAULT_NAME,
  );
  return messages.SWINE_CREATION_MSG(swine.name);
};
