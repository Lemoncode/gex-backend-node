import { db } from "../mock.data.js";
import { User } from "./user.model.js";

const paginateBookList = (
  userList: User[],
  page: number,
  pageSize: number
): User[] => {
  let paginatedUserList = [...userList];
  if (page && pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, paginatedUserList.length);
    paginatedUserList = paginatedUserList.slice(startIndex, endIndex);
  }

  return paginatedUserList;
};

export const userRepository = {
  getUserList: async (page?: number, pageSize?: number) =>
    paginateBookList(db.users, page, pageSize),
};
