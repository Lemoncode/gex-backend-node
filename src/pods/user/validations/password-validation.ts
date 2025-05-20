import { CustomInternalCodes, ValidationInfo } from '#common/custom-error/index.js';
import { verifyHash } from '#common/helpers/index.js';
import { userRepository } from '#dals/user/user.repository.js';
import * as apiModel from '../user.api-model.js';

export const validationChangePassword = async (
  passwordData: apiModel.ChangePasswordParams
): Promise<ValidationInfo> => {
  if (!passwordData.id || !passwordData.contraseñaActual || !passwordData.nuevaContraseña) {
    return { succeded: false, error: { error: CustomInternalCodes.FieldNotInformed } };
  }

  const user = await userRepository.getUser(passwordData.id);
  if (!user) {
    return { succeded: false, error: { error: CustomInternalCodes.UserNotFound } };
  }

  const isValidPassword = await verifyHash(passwordData.contraseñaActual, user.contraseña);
  if (!isValidPassword) {
    return { succeded: false, error: { error: CustomInternalCodes.InvalidPassword } };
  }

  return { succeded: true };
};
