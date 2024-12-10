import { ObjectId } from "mongodb"; 

export interface LookupModel {
  _id: ObjectId; 
  codigo?: string;
  nombre: string; 
}