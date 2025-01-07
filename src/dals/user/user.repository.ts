import { mapStringToObjectId } from '#common/mappers/object-id.mappers.js';
import { SelectedFields } from '#common/models/index.js';
import { getUserContext } from './user.context.js';
import { Usuario } from './user.model.js';

export const userRepository = {
  getUserList: async (page?: number, pageSize?: number): Promise<Usuario[]> => {
    const existPageAndPageSize = page !== undefined && page !== null && pageSize !== undefined && pageSize !== null;

    if (existPageAndPageSize) {
      const skip = page !== undefined && page !== null ? page * pageSize : 0;
      const limit = pageSize ?? 0;

      return await getUserContext().find().skip(skip).limit(limit).toArray();
    }

    return await getUserContext().find().toArray();
  },
  getUser: async (id: string, selectedFields: SelectedFields<Usuario>) =>
    await getUserContext().findOne({ _id: mapStringToObjectId(id) }, { projection: selectedFields }),
};
