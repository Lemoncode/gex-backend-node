import { Lookup } from '#common/models/index.js';
import { getUnidadesProponentesContext } from './unidad-proponente.context.js';

export const lookupRepository = {
  getUnidadesList: async (): Promise<Lookup[]> => await getUnidadesProponentesContext().find().toArray(),
};
