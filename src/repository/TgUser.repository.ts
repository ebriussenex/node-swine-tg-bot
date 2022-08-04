import {TgUser} from './model/TgUser.model';

export const tgUserRepository = Object.freeze({
  getAll: async (): Promise<TgUser[]> => await TgUser.findAll(),
  getById: async (id: number): Promise<TgUser | null> =>
    await TgUser.findByPk(id),
  updateUser: async (tgUser: TgUser): Promise<void> => {
    await TgUser.update(tgUser, {where: {id: tgUser.id}});
  },
  getOrCreate: async (
      userId: number,
      isBot: boolean,
      firstName: string,
      lastName?: string,
      userName?: string,
  ): Promise<[TgUser, boolean]> =>
    await TgUser.findOrCreate({
      where: {id: userId},
      defaults: {
        id: userId,
        isBot: isBot,
        lastName: lastName ?? null,
        userName: userName ?? null,
      },
    }),
});
