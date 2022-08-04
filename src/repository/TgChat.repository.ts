import {TgChat} from './model/TgChat.model';

export const tgChatRepository = Object.freeze({
  getAll: async (): Promise<TgChat[]> => await TgChat.findAll(),
  getById: async (id: number): Promise<TgChat | null> =>
    await TgChat.findByPk(id),
  getOrCreate: async (
      chatId: number,
      chatType: string,
      firstName?: string,
      lastName?: string,
      title?: string,
  ): Promise<[TgChat, boolean]> =>
    await TgChat.findOrCreate({
      where: {id: chatId},
      defaults: {
        id: chatId,
        chatType: chatType,
        lastName: lastName ?? null,
        firstName: firstName ?? null,
        title: title ?? null,
      },
    }),
});
