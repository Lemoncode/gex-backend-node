import { Lookup } from '#common/models/index.js';
import { getUnidadesProponentesContext } from './unidad-proponente.context.js';
import { getRolesContext } from './role.context.js';

export const lookupRepository = {
  getUnidadList: async (): Promise<Lookup[]> => await getUnidadesProponentesContext().find().toArray(),
  getRolList: async (): Promise<Lookup[]> => await getRolesContext().find().toArray(),
};
