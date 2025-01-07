import { dbServer } from '#core/servers/db.server.js';
import { db } from '#dals/mock.data.js';
import { getRolesContext, getUnidadesProponentesContext } from '#dals/lookup/index.js';
import { getUserContext } from '#dals/user/index.js';

export const run = async (connectionString: string) => {
  try {
    await dbServer.connect(connectionString);

    await getUserContext().insertMany(db.usuarios);

    await getUnidadesProponentesContext().insertMany(db.unidadProponentes);

    await getRolesContext().insertMany(db.roles);

    console.log('Data seeded successfully');

    await dbServer.disconnect();
  } catch (error) {
    console.error(error);
  }
};
