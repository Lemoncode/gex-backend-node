import { LookupModel } from '#common/models/lookup.model.js';
import { dbServer } from '#core/servers/index.js';

export const getRolesContext = () => dbServer.db?.collection<LookupModel>('roles');
