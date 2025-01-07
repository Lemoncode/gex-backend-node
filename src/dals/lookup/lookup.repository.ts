import { Lookup } from '#common/models/index.js';
import { getUnidadesProponentesContext } from './unidad-proponente.context.js';
import { getRolesContext } from './role.context.js';
import { UnidadRolList } from './lookup.model.js';

export const lookupRepository = {
  getUnidadList: async (): Promise<Lookup[]> => await getUnidadesProponentesContext().find().toArray(),
  getRolList: async (): Promise<Lookup[]> => await getRolesContext().find().toArray(),
  getUnidadRolList: async (): Promise<UnidadRolList> => {
    const unidades = await getUnidadesProponentesContext().find().toArray();
    const roles = await getRolesContext().find().toArray();
    return {
      roles,
      unidades,
    };
  },
};
