import { Lookup } from '#common/models/lookup.js';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  movil: string;
  rol: Lookup;
  esResponsable: boolean;
  esProponente: boolean;
  esAutorizante: boolean;
  esContraseñaTemporal?: boolean;
  contraseña?: string;
  unidad: Lookup;
}
