import { ObjectId } from 'mongodb';

export interface Usuario {
  _id: ObjectId;
  nombre: string;
  apellidos: string;
  email: string;
  telefonoFijo: string;
  telefonoMovil: string;
  telefonoInstitucional: string;
  clave: string;
  rol: string;
  esResponsable: boolean;
  esAutorizante: boolean;
}
