import { TgChat } from './model/TgChat.model';

export const tgChatRepository = Object.freeze({
  getAll: async (): Promise<TgChat[]> => await TgChat.findAll(),
  getById: async (id: number): Promise<TgChat | null> => await TgChat.findByPk(id),
  createChat: async (tgChat: TgChat): Promise<TgChat> => await TgChat.create(tgChat),
  updateChat: async (tgChat: TgChat): Promise<void> => {
    await TgChat.update(tgChat, { where: { id: tgChat.id } });
  },
  upsertUser: async (tgChat: TgChat): Promise<[TgChat, boolean | null]> => await TgChat.upsert(tgChat),
});
