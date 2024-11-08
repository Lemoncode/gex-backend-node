import { ObjectId } from "mongodb";

export const mapStringToObjectId = (id: string): ObjectId =>
  Boolean(id) ? new ObjectId(id) : new ObjectId();

export const mapObjectIdToString = (id: ObjectId): string =>
  Boolean(id) ? id.toHexString() : undefined;
