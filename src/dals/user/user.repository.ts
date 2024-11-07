import { getUserContext } from "./user.context.js";
import { User } from "./user.model.js";

export const userRepository = {
  getUserList: async (page?: number, pageSize?: number): Promise<User[]> => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;

    return await getUserContext().find().skip(skip).limit(limit).toArray();
  },
};
