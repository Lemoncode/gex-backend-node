import { CustomInternalCodes, ValidationInfo } from '#common/custom-error/index.js';
import { userRepository } from '#dals/user/user.repository.js';
import { lookupRepository } from '#dals/lookup/lookup.repository.js';
import { mapStringToObjectId } from '#common/mappers/index.js';
import * as apiModel from '../user.api-model.js';
import { LookupModel } from '#common/models/lookup.model.js';

export interface UpdateUserValidationResult extends ValidationInfo {
  rolEncontrado?: LookupModel;
  unidadEncontrada?: LookupModel;
}

export const validationUpdateUser = async (user: apiModel.UsuarioDetalle): Promise<UpdateUserValidationResult> => {
  if (!user.id || !user.nombre || !user.apellido || !user.email) {
    return { succeded: false, error: { error: CustomInternalCodes.FieldNotInformed } };
  }

  if (await userRepository.emailExists(user.email, user.id)) {
    return { succeded: false, error: { error: CustomInternalCodes.DuplicatedEmail } };
  }

  if (!(await userRepository.getUser(user.id))) {
    return { succeded: false, error: { error: CustomInternalCodes.UserNotFound } };
  }

  const { roles, unidades } = await lookupRepository.getUnidadRolList();

  const rolEncontrado = roles.find(rol => mapStringToObjectId(user.rol).equals(rol._id));
  if (!rolEncontrado) {
    return { succeded: false, error: { error: CustomInternalCodes.RolNotFound } };
  }

  const unidadEncontrada = unidades.find(unidad => mapStringToObjectId(user.unidad).equals(unidad._id));
  if (!unidadEncontrada) {
    return { succeded: false, error: { error: CustomInternalCodes.UnidadNotFound } };
  }

  return {
    succeded: true,
    rolEncontrado,
    unidadEncontrada,
  };
};
