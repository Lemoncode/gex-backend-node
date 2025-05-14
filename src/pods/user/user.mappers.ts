import { formatEmail } from '#common/helpers/index.js';
import { mapObjectIdToString, mapStringToObjectId, mapToCollection } from '#common/mappers/index.js';
import { CollectionQuery } from '#common/models/collection-query.model.js';
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

export const mapUserListFromModelToApi = (
  userList: CollectionQuery<model.Usuario>
): CollectionQuery<apiModel.Usuario> => ({
  data: mapToCollection(userList.data, mapUserFromModelToApi),
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
    rol: user.rol,
    esResponsable: user.esResponsable,
    esProponente: user.esProponente,
    esAutorizante: user.esAutorizante,
    esContraseñaTemporal: isTemporalPassword ?? false,
    contraseña: hashedPassword,
    unidad: user.unidad,
  };
};
