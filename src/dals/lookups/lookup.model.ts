import { ObjectId } from 'mongodb';

export interface LookupModel {
  _id: ObjectId;
  nombre: string;
  code?: string;
}
