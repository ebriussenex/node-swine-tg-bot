import { TgUser } from './model/TgUser.model';

export const tgUserRepository = Object.freeze({
  getAll: async (): Promise<TgUser[]> => await TgUser.findAll(),
  getById: async (id: number): Promise<TgUser | null> => await TgUser.findByPk(id),
  createUser: async (tgUser: TgUser): Promise<TgUser> => await TgUser.create(tgUser),
  updateUser: async (tgUser: TgUser): Promise<void> => {
    await TgUser.update(tgUser, { where: { id: tgUser.id } });
  },
  upsertUser: async (tgUser: TgUser): Promise<[TgUser, boolean | null]> => await TgUser.upsert(tgUser),
});
