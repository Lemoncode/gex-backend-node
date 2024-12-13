import { ObjectId } from 'mongodb';

export type Rol = 'Usuario-Administrador' | 'Usuario-Escritura' | 'Usuario-Lectura';

export interface User {
  _id: ObjectId; 
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  movil?: string;
  rol : {
      _id: ObjectId,
      nombre: Rol,
  };
  esResponsable: boolean;
  esProponente: boolean;
  esAutorizante : boolean;
  esContraseñaTemporal : boolean;
  contraseña : string;
  salt: string;
  unidad: {
     id: ObjectId;
     nombre: string;
  }
}
