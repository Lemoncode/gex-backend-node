import { dbServer } from "#core/servers/db.server.js";
import { db } from "#dals/mock.data.js";

export const run = async (connectionString: string) => {
  try {
    await dbServer.connect(connectionString);

    for (const user of db.users) {
      await dbServer.db.collection("users").insertOne(user);
    }
    for (const up of db.unidadesProponentesLookups){
      await dbServer.db.collection("unidadesProponentesLookups").insertOne(up);
    }

    console.log("Data seeded successfully");

    await dbServer.disconnect();
  } catch (error) {
    console.error(error);
  }
};
