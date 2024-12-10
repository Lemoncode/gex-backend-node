import { ObjectId } from "mongodb";
import { User } from "./user/index.js";

export interface DB {
  users: User[];
}

export const db: DB = {
  users: [
    {
      _id: new ObjectId(),
      nombre: "Carlos",
      apellidos: "González Pérez",
      email: "carlos.gonzalez@example.com",
      telefono: "910123456",
      movil: "620123456",
      rol: {
        _id: new ObjectId(),
        nombre: "Usuario-Administrador",
      },
      esResponsable: true,
      esProponente: true,
      esAutorizante: true,
      esContraseñaTemporal: false,
      contraseña: "carlos123",
      salt: '',
      unidad: {
        id: new ObjectId(),
        nombre: "Unidad E",
      }
    },
    {
      _id: new ObjectId(),
      nombre: "María",
      apellidos: "Martínez López",
      email: "maria.martinez@example.com",
      telefono: "910234567",
      movil: "620234567",
      rol: {
        _id: new ObjectId(),
        nombre: "Usuario-Escritura",
      },
      esResponsable: true,
      esProponente: false,
      esAutorizante: true,
      esContraseñaTemporal: false,
      contraseña: "maria456",
      salt: '',
      unidad: {
        id: new ObjectId(),
        nombre: "Unidad B",
      },
    },
    {
      _id: new ObjectId(),
      nombre: "Juan",
      apellidos: "Rodríguez Sánchez",
      email: "juan.rodriguez@example.com",
      telefono: "910345678",
      movil: "620345678",
      rol: {
        _id: new ObjectId(),
        nombre: "Usuario-Escritura",
      },
      esResponsable: true,
      esProponente: false,
      esAutorizante: false,
      esContraseñaTemporal: false,
      contraseña: "juan789",
      salt: '',
      unidad: {
        id: new ObjectId(),
        nombre: "Unidad B",
      },
    },
    {
      _id: new ObjectId(),
      nombre: "Laura",
      apellidos: "García Ruiz",
      email: "laura.garcia@example.com",
      telefono: "910456789",
      movil: "620456789",
      rol: {
        _id: new ObjectId(),
        nombre: "Usuario-Lectura",
      },
      esResponsable: false,
      esProponente: false,
      esAutorizante: false,
      esContraseñaTemporal: false,
      contraseña: "laura101",
      salt: '',
      unidad: {
        id: new ObjectId(),
        nombre: "Unidad C",
      },
    },
    {
      _id: new ObjectId(),
      nombre: "Miguel",
      apellidos: "Fernández Gómez",
      email: "miguel.fernandez@example.com",
      telefono: "910567890",
      movil: "620567890",
      rol: {
        _id: new ObjectId(),
        nombre: "Usuario-Lectura",
      },
      esResponsable: false,
      esProponente: false,
      esAutorizante: false,
      esContraseñaTemporal: false,
      contraseña: "miguel202",
      salt: '',
      unidad: {
        id: new ObjectId(),
        nombre: "Unidad C",
      },
    },
  ],
};
