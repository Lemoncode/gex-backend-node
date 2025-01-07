import { Lookup } from '#common/models/lookup.js';
import { ObjectId } from 'mongodb';

export interface Usuario {
  _id: ObjectId;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  movil: string;
  rol: Lookup;
  esResponsable: boolean;
  esProponente: boolean;
  esAutorizante: boolean;
  esContraseñaTemporal: boolean;
  contraseña: string;
  unidad: Lookup;
}
