import { Lookup } from '#common/models/lookup.js';
import { dbServer } from '#core/servers/index.js';

export const getUnidadesProponentesContext = () => dbServer.db?.collection<Lookup>('unidadProponentes');
