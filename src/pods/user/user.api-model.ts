export interface UsuarioDetalle {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  movil: string;
  rol: string;
  esResponsable: boolean;
  esProponente: boolean;
  esAutorizante: boolean;
  esContraseñaTemporal?: boolean;
  contraseña?: string;
  unidad: string;
}

export interface UsuarioLista {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  unidad: string;
}

export interface SaveUserParams {
  user: UsuarioDetalle;
  hashedPassword: string;
  isTemporalPassword: boolean;
}
