import { mapObjectIdToString, mapToCollection } from "#common/mappers/index.js";
import * as model from "#dals/user/user.model.js";
import * as apiModel from "./user.api-model.js";

export const mapUserFromModelToApi = (user: model.User): apiModel.User => ({
  id: mapObjectIdToString(user._id),
  nombre: user.nombre,
  apellidos: user.apellidos,
  email: user.email,
  telefono: user.telefono,
  movil: user.movil,
  rol: {
    id: mapObjectIdToString(user.rol._id),
    nombre: user.rol.nombre,
  },
  esResponsable: user.esResponsable,
  esProponente: user.esProponente,
  esAutorizante: user.esAutorizante,
  esContraseñaTemporal: user.esContraseñaTemporal,
  unidad: {
    id: mapObjectIdToString(user.unidad.id),
    nombre: user.unidad.nombre,
  },
});

export const mapUserListFromModelToApi = (
  userList: model.User[]
): apiModel.User[] => mapToCollection(userList, mapUserFromModelToApi);
