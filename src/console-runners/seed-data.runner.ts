import { dbServer } from '#core/servers/db.server.js';
import { db } from '#dals/mock.data.js';
import { getUnidadesProponentesContext } from '#dals/unidad-proponente/index.js';
import { getUserContext } from '#dals/user/index.js';

export const run = async (connectionString: string) => {
  try {
    await dbServer.connect(connectionString);

    await getUserContext().insertMany(db.usuarios);

    await getUnidadesProponentesContext().insertMany(db.unidadProponentes);

    console.log('Data seeded successfully');

    await dbServer.disconnect();
  } catch (error) {
    console.error(error);
  }
};
