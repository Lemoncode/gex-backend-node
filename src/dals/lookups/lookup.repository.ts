import { Lookup } from '#common/models/index.js';
import { getUnidadesProponentesContext } from './lookup.context.js';

export const lookupRepository = {
  getUnidadesList: async (page?: number, pageSize?: number): Promise<Lookup[]> => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await getUnidadesProponentesContext().find().skip(skip).limit(limit).toArray();
  },
};
