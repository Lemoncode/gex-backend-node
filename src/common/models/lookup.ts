import { ObjectId } from 'mongodb';

export interface Lookup {
  _id: ObjectId;
  nombre: string;
  code?: string;
}
