import { mapObjectIdToString } from '#common/mappers/index.js';
import * as commonModel from '#common/models/index.js';
import * as model from '#dals/user/index.js';

export const mapUserToUserSession = (user: model.Usuario): commonModel.UserSession => ({
  id: mapObjectIdToString(user._id),
  rol: {
    id: mapObjectIdToString(user.rol._id),
    nombre: user.rol.nombre,
  },
});
