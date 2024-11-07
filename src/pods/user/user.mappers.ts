import * as model from "#dals/user/user.model.js";
import * as apiModel from "./user.api-model.js";

export const mapUserFromModelToApi = (user: model.User): apiModel.User => ({
  id: user._id,
  nombre: user.nombre,
  apellidos: user.apellidos,
  email: user.email,
  telefonoFijo: user.telefonoFijo,
  telefonoMovil: user.telefonoMovil,
  telefonoInstitucional: user.telefonoInstitucional,
  clave: user.clave,
  rol: user.rol,
  esResponsable: user.esResponsable,
  esAutorizante: user.esAutorizante,
});

export const mapUserListFromModelToApi = (
  userList: model.User[]
): apiModel.User[] => userList.map(mapUserFromModelToApi);
