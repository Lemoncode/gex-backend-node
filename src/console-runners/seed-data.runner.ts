import { generateSalt, hashPassword } from "#common/helpers/hash-password.helpers.js";
import { dbServer } from "#core/servers/db.server.js";
import { db } from "#dals/mock.data.js";

export const run = async (connectionString: string) => {
  try {
    await dbServer.connect(connectionString);

    for (const user of db.users) {
      const salt = await generateSalt();
      const hashedPassword = await hashPassword(user.contraseña, salt);

      await dbServer.db.collection("users").insertOne({
        ...user,
        contraseña: hashedPassword,
        salt,
      });
    }

    console.log("Data seeded successfully");

    await dbServer.disconnect();
  } catch (error) {
    console.error(error);
  }
};
