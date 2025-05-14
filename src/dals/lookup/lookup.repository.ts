import { LookupModel } from '#common/models/index.js';
import { getUnidadesProponentesContext } from './unidad-proponente.context.js';
import { getRolesContext } from './role.context.js';
import { UnidadRolList } from './lookup.model.js';

export const lookupRepository = {
  getUnidadList: async (): Promise<LookupModel[]> => await getUnidadesProponentesContext().find().toArray(),
  getRolList: async (): Promise<LookupModel[]> => await getRolesContext().find().toArray(),
  getUnidadRolList: async (): Promise<UnidadRolList> => {
    const unidades = await getUnidadesProponentesContext().find().toArray();
    const roles = await getRolesContext().find().toArray();
    return {
      roles,
      unidades,
    };
  },
};
