import { Rol } from "#dals/user/user.model.js";

export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  movil: string;
  rol : {
    id: string,
    nombre: Rol,
  };
  esResponsable: boolean;
  esProponente: boolean;
  esAutorizante : boolean;
  esContraseñaTemporal : boolean;
  contraseña?: string;
  salt?: string;
  unidad: {
    id: string;
    nombre: string;
  }
}
