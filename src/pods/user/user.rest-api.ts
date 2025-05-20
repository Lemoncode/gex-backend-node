import { Router } from 'express';
import { generateSalt, hash } from '#common/helpers/index.js';
import { CustomInternalCodes } from '#common/custom-error/index.js';
import { userRepository } from '#dals/user/user.repository.js';
import { lookupRepository } from '#dals/lookup/lookup.repository.js';
import { mapStringToObjectId } from '#common/mappers/index.js';
import {
  mapUserListFromModelToApi,
  mapUsuarioDetalleFromModelToApi,
  mapUserFromApiToModel,
  mapUserUpdateFromApiToModel,
} from './user.mappers.js';
import { validationPostUser, validationUpdateUser, validationChangePassword } from './validations/index.js';
import * as apiModel from './user.api-model.js';
import * as model from '#dals/user/user.model.js';

export const userApi = Router();

userApi
  .get('/:email/exists', async (req, res, next) => {
    try {
      const { email } = req.params;
      const isAnExistingEmail = await userRepository.emailExists(email, req.userSession?.id);
      res.send({ isAnExistingEmail });
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const userList = await userRepository.getUserList(page, pageSize);

      res.send(mapUserListFromModelToApi(userList));
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userRepository.getUser(id, {
        id: 1,
        nombre: 1,
        apellido: 1,
        email: 1,
        telefono: 1,
        movil: 1,
        telefonoInstitucional: 1,
        clave: 1,
        rol: 1,
        esResponsable: 1,
        esAutorizante: 1,
        esProponente: 1,
        unidad: 1,
      });

      user ? res.send(mapUsuarioDetalleFromModelToApi(user)) : res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const user: apiModel.UsuarioDetalle = req.body;
      const validationResult = await validationPostUser(user);

      if (validationResult.succeded) {
        const password = await generateSalt();
        const hashedPassword = await hash(password);

        const userModel: model.Usuario = mapUserFromApiToModel({ user, hashedPassword, isTemporalPassword: true });

        await userRepository.saveUser(userModel);

        res.send(mapUsuarioDetalleFromModelToApi(userModel));
      } else {
        res.status(409).send(validationResult.error);
      }
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user: apiModel.UsuarioDetalle = { ...req.body, id };
      const validationResult = await validationUpdateUser(user);

      if (validationResult.succeded) {
        const { rolEncontrado, unidadEncontrada } = validationResult;

        const userModel = mapUserUpdateFromApiToModel(user);
        userModel.rol = { _id: mapStringToObjectId(user.rol), nombre: rolEncontrado.nombre };
        userModel.unidad = { _id: mapStringToObjectId(user.unidad), nombre: unidadEncontrada.nombre };

        const existingUser = await userRepository.getUser(id);

        const updatedUser = await userRepository.saveUser({
          ...existingUser,
          ...userModel,
        });

        res.send(mapUsuarioDetalleFromModelToApi(updatedUser));
      } else {
        const statusCode =
          validationResult.error?.error == CustomInternalCodes.UserNotFound ||
          validationResult.error?.error == CustomInternalCodes.RolNotFound ||
          validationResult.error?.error == CustomInternalCodes.UnidadNotFound
            ? 422
            : 409;

        res.status(statusCode).send(validationResult.error);
      }
    } catch (error) {
      next(error);
    }
  })
  .post('/change-password', async (req, res, next) => {
    try {
      const passwordData: apiModel.ChangePasswordParams = req.body;
      const validationResult = await validationChangePassword(passwordData);

      if (validationResult.succeded) {
        const hashedPassword = await hash(passwordData.nuevaContraseña);
        const user = await userRepository.getUser(passwordData.id);

        await userRepository.saveUser({
          ...user,
          contraseña: hashedPassword,
          esContraseñaTemporal: false,
        });

        res.sendStatus(204);
      } else {
        const statusCode = (() => {
          switch (validationResult.error?.error) {
            case CustomInternalCodes.UserNotFound:
              return 422;
            case CustomInternalCodes.InvalidPassword:
              return 401;
            default:
              return 400;
          }
        })();

        res.status(statusCode).send(validationResult.error);
      }
    } catch (error) {
      next(error);
    }
  });
