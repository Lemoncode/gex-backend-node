export interface User {
  id: string;
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
