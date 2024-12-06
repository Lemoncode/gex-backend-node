import { mapStringToObjectId } from '#common/mappers/object-id.mappers.js';
import { getUserContext } from './user.context.js';
import { User } from './user.model.js';

export const userRepository = {
  getUserList: async (page?: number, pageSize?: number): Promise<User[]> => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;

    return await getUserContext().find().skip(skip).limit(limit).toArray();
  },
  getUser: async (id: string) => {
    const result = await getUserContext().findOne(
      { _id: mapStringToObjectId(id) },
      {
        projection: {
          id: 1,
          nombre: 1,
          apellidos: 1,
          email: 1,
          telefonoFijo: 1,
          telefonoMovil: 1,
          telefonoInstitucional: 1,
          clave: 1,
          rol: 1,
          esResponsable: 1,
          esAutorizante: 1,
        },
      }
    );
    return result;
  },
};
