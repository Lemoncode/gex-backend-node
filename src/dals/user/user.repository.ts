import { verifyHash } from '#common/helpers/index.js';
import { mapStringToObjectId } from '#common/mappers/index.js';
import { CollectionQuery, SelectedFields } from '#common/models/index.js';
import { getUserContext } from './user.context.js';
import { Usuario } from './user.model.js';

export const userRepository = {
  getUserList: async (page?: number, pageSize?: number): Promise<CollectionQuery<Usuario>> => {
    const existPageAndPageSize = page !== undefined && page !== null && pageSize !== undefined && pageSize !== null;
    const totalDocuments = await getUserContext().countDocuments();

    if (existPageAndPageSize) {
      const skip = page !== undefined && page !== null ? page * pageSize : 0;
      const limit = pageSize ?? 0;

      const userListPaginated = await getUserContext().find().skip(skip).limit(limit).toArray();

      return {
        data: userListPaginated,
        pagination: {
          totalPages: totalDocuments,
        },
      };
    }

    const userList = await getUserContext().find().toArray();

    return {
      data: userList,
      pagination: {
        totalPages: totalDocuments,
      },
    };
  },
  getUser: async (id: string, selectedFields?: SelectedFields<Usuario>) =>
    await getUserContext().findOne({ _id: mapStringToObjectId(id) }, { projection: selectedFields }),
  emailExists: async (email: string, id: string) =>
    (await getUserContext().countDocuments({ email, _id: { $ne: mapStringToObjectId(id) } })) > 0,
  saveUser: async (user: Usuario) => {
    const saveUser = await getUserContext().findOneAndUpdate(
      { _id: user._id },
      { $set: user },
      { upsert: true, returnDocument: 'after', ignoreUndefined: true }
    );

    return saveUser;
  },
  isValidLogin: async (email: string, password: string) => {
    const user = await getUserContext().findOne({ email });
    if (user) {
      const { contraseña, ...userInfo } = user;
      const isEqualPassword = verifyHash(password, contraseña);
      return isEqualPassword ? { ...userInfo, contraseña: null } : null;
    }
    return null;
  },
};
