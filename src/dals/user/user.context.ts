import { dbServer } from '#core/servers/index.js';
import { Usuario } from './user.model.js';

export const getUserContext = () => dbServer.db?.collection<Usuario>('usuarios');
