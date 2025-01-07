import { Lookup } from '#common/models/lookup.js';
import { dbServer } from '#core/servers/index.js';

export const getRolesContext = () => dbServer.db?.collection<Lookup>('roles');
