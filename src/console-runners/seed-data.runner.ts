import { hash } from '#common/helpers/index.js';
import { getUserContext } from '#dals/user/user.context.js';
import { dbServer } from "#core/servers/db.server.js";
import { db } from "#dals/mock.data.js";

export const run = async (connectionString: string) => {
  try {
    await dbServer.connect(connectionString);

    for (const user of db.users) {
      const hashedPassword = await hash(user.contraseña);
    
      await getUserContext().insertOne({
        ...user,
        contraseña: hashedPassword,
      });
    }

    console.log("Data seeded successfully");

    await dbServer.disconnect();
  } catch (error) {
    console.error(error);
  }
};
