import { Lookup } from '#common/models/index.js';
import { getUnidadesProponentesContext } from './lookup.context.js';

export const lookupRepository = {
  getUnidadesList: async (): Promise<Lookup[]> => await getUnidadesProponentesContext().find().toArray(),
};
