import { CustomInternalCodes, ValidationInfo } from '#common/custom-error/index.js';
import { userRepository } from '#dals/user/user.repository.js';
import * as apiModel from '../user.api-model.js';

export const validationPostUser = async (user: apiModel.UsuarioDetalle): Promise<ValidationInfo> => {
  if (!user.nombre || !user.apellido || !user.email) {
    return { succeded: false, error: { error: CustomInternalCodes.FieldNotInformed } };
  }

  if (await userRepository.emailExists(user.email, '')) {
    return { succeded: false, error: { error: CustomInternalCodes.DuplicatedEmail } };
  }

  return { succeded: true };
};
