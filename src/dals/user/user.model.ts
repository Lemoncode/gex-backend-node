import { LookupModel } from '#common/models/lookup.model.js';
import { ObjectId } from 'mongodb';

export interface Usuario {
  _id: ObjectId;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  movil: string;
  rol: LookupModel;
  esResponsable: boolean;
  esProponente: boolean;
  esAutorizante: boolean;
  esContraseñaTemporal: boolean;
  contraseña: string;
  unidad: LookupModel;
}
