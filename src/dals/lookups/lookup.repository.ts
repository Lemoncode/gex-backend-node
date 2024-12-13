import { getUnidadesProponentesContext } from './lookup.context.js';
import { LookupModel } from './lookup.model.js';

export const lookupRepository = {
  getUnidadesList: async (page?: number, pageSize?: number): Promise<LookupModel[]> => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await getUnidadesProponentesContext().find().skip(skip).limit(limit).toArray();
  },
};
