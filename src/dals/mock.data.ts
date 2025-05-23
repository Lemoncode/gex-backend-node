import { ObjectId } from 'mongodb';
import { LookupModel } from '#common/models/index.js';
import { Usuario } from './user/index.js';

export interface DB {
  usuarios: Usuario[];
  unidadProponentes: LookupModel[];
  roles: LookupModel[];
}

export const db: DB = {
  usuarios: [
    {
      _id: new ObjectId(),
      nombre: 'Carlos',
      apellido: 'González Pérez',
      email: 'carlos.gonzalez@example.com',
      telefono: '910123456',
      movil: '620123456',
      rol: {
        _id: new ObjectId('677d15fd24c5646a1f7f69c0'),
        nombre: 'Usuario-Administrador',
      },
      esResponsable: true,
      esProponente: true,
      esAutorizante: false,
      esContraseñaTemporal: false,
      contraseña: 'carlos123',
      unidad: {
        _id: new ObjectId('677d1539c3cb57a1f7b57e77'),
        nombre: 'Unidad E',
        code: 'E1',
      },
    },
    {
      _id: new ObjectId(),
      nombre: 'María',
      apellido: 'Martínez López',
      email: 'maria.martinez@example.com',
      telefono: '910234567',
      movil: '620234567',
      rol: {
        _id: new ObjectId('677d1609d7dfb3725db36e45'),
        nombre: 'Usuario-Escritura',
      },
      esResponsable: true,
      esProponente: true,
      esAutorizante: true,
      esContraseñaTemporal: false,
      contraseña: 'maria456',
      unidad: {
        _id: new ObjectId('677d15df0b8b68a6601e826a'),
        nombre: 'Unidad B',
        code: 'B2',
      },
    },
    {
      _id: new ObjectId(),
      nombre: 'Juan',
      apellido: 'Rodríguez Sánchez',
      email: 'juan.rodriguez@example.com',
      telefono: '910345678',
      movil: '620345678',
      rol: {
        _id: new ObjectId('677d160e6d98cb2a17428884'),
        nombre: 'Usuario-Lectura',
      },
      esResponsable: false,
      esProponente: false,
      esAutorizante: false,
      esContraseñaTemporal: true,
      contraseña: 'temp480',
      unidad: {
        _id: new ObjectId('677d15f51ea7df458590b5f9'),
        nombre: 'Unidad C',
        code: 'C4',
      },
    },
    {
      _id: new ObjectId(),
      nombre: 'Laura',
      apellido: 'García Ruiz',
      email: 'laura.garcia@example.com',
      telefono: '910456789',
      movil: '620456789',
      rol: {
        _id: new ObjectId('677d160e6d98cb2a17428884'),
        nombre: 'Usuario-Lectura',
      },
      esResponsable: false,
      esProponente: false,
      esAutorizante: false,
      esContraseñaTemporal: true,
      contraseña: 'temp480',
      unidad: {
        _id: new ObjectId('677d15f51ea7df458590b5f9'),
        nombre: 'Unidad C',
        code: 'C4',
      },
    },
    {
      _id: new ObjectId(),
      nombre: 'Miguel',
      apellido: 'Fernández Gómez',
      email: 'miguel.fernandez@example.com',
      telefono: '910567890',
      movil: '620567890',
      rol: {
        _id: new ObjectId('677d160e6d98cb2a17428884'),
        nombre: 'Usuario-Lectura',
      },
      esResponsable: false,
      esProponente: false,
      esAutorizante: false,
      esContraseñaTemporal: true,
      contraseña: 'temp480',
      unidad: {
        _id: new ObjectId('677d15f51ea7df458590b5f9'),
        nombre: 'Unidad C',
        code: 'C4',
      },
    },
  ],
  unidadProponentes: [
    { _id: new ObjectId('677d1539c3cb57a1f7b57e77'), nombre: 'Unidad E', code: 'E1' },
    { _id: new ObjectId('677d15df0b8b68a6601e826a'), nombre: 'Unidad B', code: 'B2' },
    { _id: new ObjectId('677d15f51ea7df458590b5f9'), nombre: 'Unidad C', code: 'C4' },
  ],
  roles: [
    {
      _id: new ObjectId('677d15fd24c5646a1f7f69c0'),
      nombre: 'Usuario-Administrador',
    },
    {
      _id: new ObjectId('677d1609d7dfb3725db36e45'),
      nombre: 'Usuario-Escritura',
    },
    {
      _id: new ObjectId('677d160e6d98cb2a17428884'),
      nombre: 'Usuario-Lectura',
    },
  ],
};
