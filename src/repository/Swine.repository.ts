import { dbConst } from '../const/const';
import { Swine } from './model/Swine.model';

export const swineRepository = Object.freeze({
  getAll: async (): Promise<Swine[]> => await Swine.findAll(),
  getById: async (id: number): Promise<Swine | null> => await Swine.findByPk(id),
  getTopSwines: async (n?: number): Promise<Swine[]> =>
    await Swine.findAll({
      order: [[dbConst.WEIGHT_FIELD, 'DESC']],
      limit: n ?? dbConst.TOP_AMOUNT,
    }),
  createSwine: async (swine: Swine): Promise<Swine> => await Swine.create(swine),
  updateSwine: async (swine: Swine): Promise<void> => {
    await Swine.update(swine, { where: { id: swine.id } });
  },
  upsertSwine: async (swine: Swine): Promise<[Swine, boolean | null]> =>
    await Swine.upsert(swine),
});
