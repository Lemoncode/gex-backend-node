import { LookupModel } from '#common/models/lookup.model.js';
import { dbServer } from '#core/servers/index.js';

export const getUnidadesProponentesContext = () => dbServer.db?.collection<LookupModel>('unidadProponentes');
