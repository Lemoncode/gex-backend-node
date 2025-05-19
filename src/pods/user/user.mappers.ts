import { formatEmail } from '#common/helpers/index.js';
import { mapLookupToModel, mapObjectIdToString, mapStringToObjectId, mapToCollection } from '#common/mappers/index.js';
import { CollectionQuery } from '#common/models/collection-query.model.js';
import * as model from '#dals/user/user.model.js';
import * as apiModel from './user.api-model.js';

export const mapUsuarioDetalleFromModelToApi = (user: model.Usuario): apiModel.UsuarioDetalle => ({
  id: mapObjectIdToString(user._id),
  nombre: user.nombre,
  apellido: user.apellido,
  email: user.email,
  telefono: user.telefono,
  movil: user.movil,
  rol: mapObjectIdToString(user.rol._id),
  esResponsable: user.esResponsable,
  esProponente: user.esProponente,
  esAutorizante: user.esAutorizante,
  unidad: mapObjectIdToString(user.unidad._id),
});

export const mapUsuarioFromModelToApi = (user: model.Usuario): apiModel.UsuarioLista => ({
  id: mapObjectIdToString(user._id),
  nombre: user.nombre,
  apellido: user.apellido,
  email: user.email,
  unidad: user.unidad.nombre,
});

export const mapUserListFromModelToApi = (
  userList: CollectionQuery<model.Usuario>
): CollectionQuery<apiModel.UsuarioLista> => ({
  data: mapToCollection(userList.data, mapUsuarioFromModelToApi),
  pagination: {
    totalPages: userList.pagination.totalPages,
  },
});

export const mapUserFromApiToModel = (userParams: apiModel.SaveUserParams): model.Usuario => {
  const { user, hashedPassword, isTemporalPassword } = userParams;

  return {
    _id: mapStringToObjectId(user.id),
    nombre: user.nombre,
    apellido: user.apellido,
    email: formatEmail(user.email),
    telefono: user.telefono,
    movil: user.movil,
    rol: { _id: mapStringToObjectId(user.rol), nombre: user.rol },
    esResponsable: user.esResponsable,
    esProponente: user.esProponente,
    esAutorizante: user.esAutorizante,
    esContraseñaTemporal: isTemporalPassword ?? false,
    contraseña: hashedPassword,
    unidad: { _id: mapStringToObjectId(user.unidad), nombre: user.unidad },
  };
};

export const mapUserUpdateFromApiToModel = (user: apiModel.UsuarioDetalle): Partial<model.Usuario> => {
  return {
    _id: mapStringToObjectId(user.id),
    nombre: user.nombre,
    apellido: user.apellido,
    email: formatEmail(user.email),
    telefono: user.telefono,
    movil: user.movil,
    esResponsable: user.esResponsable,
    esProponente: user.esProponente,
    esAutorizante: user.esAutorizante,
  };
};
