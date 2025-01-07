import { mapObjectIdToString, mapToCollection } from '#common/mappers/index.js';
import * as model from '#dals/user/user.model.js';
import * as apiModel from './user.api-model.js';

export const mapUserFromModelToApi = (user: model.Usuario): apiModel.Usuario => ({
  id: mapObjectIdToString(user._id),
  nombre: user.nombre,
  apellido: user.apellido,
  email: user.email,
  telefono: user.telefono,
  movil: user.movil,
  rol: user.rol,
  esResponsable: user.esResponsable,
  esProponente: user.esProponente,
  esAutorizante: user.esAutorizante,
  unidad: user.unidad,
});

export const mapUserListFromModelToApi = (userList: model.Usuario[]): apiModel.Usuario[] =>
  mapToCollection(userList, mapUserFromModelToApi);
