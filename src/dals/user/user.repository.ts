import { mapStringToObjectId } from '#common/mappers/object-id.mappers.js';
import { SelectedFields } from '#common/models/index.js';
import { getUserContext } from './user.context.js';
import { Usuario } from './user.model.js';

export const userRepository = {
  getUserList: async (page?: number, pageSize?: number): Promise<Usuario[]> => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;

    return await getUserContext().find().skip(skip).limit(limit).toArray();
  },
  getUser: async (id: string, selectedFields: SelectedFields<Usuario>) =>
    await getUserContext().findOne({ _id: mapStringToObjectId(id) }, { projection: selectedFields }),
};
