import { ObjectId } from 'mongodb';

export interface LookupModel {
  _id: ObjectId;
  nombre: string;
  code?: string;
}

export interface LookupApiModel {
  id: string;
  nombre: string;
  code?: string;
}
