import { ObjectId } from "mongodb"; 

export interface LookupModel {
  _id: ObjectId; 
  code?: string;
  nombre: string; 
}