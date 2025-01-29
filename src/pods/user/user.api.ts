import { Router } from 'express';
import { generateSalt, hash } from '#common/helpers/index.js';
import { userRepository } from '#dals/user/user.repository.js';
import { mapUserListFromModelToApi, mapUserFromModelToApi, mapUserFromApiToModel } from './user.mappers.js';
import { validationPostUser } from './validations/index.js';
import * as apiModel from './user.api-model.js';
import * as model from '#dals/user/user.model.js';

export const userApi = Router();

userApi
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
      });

      user ? res.send(mapUserFromModelToApi(user)) : res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const user: apiModel.Usuario = req.body;
      const validationResult = await validationPostUser(user);

      if (validationResult.succeded) {
        const password = await generateSalt();
        const hashedPassword = await hash(password);

        const userModel: model.Usuario = mapUserFromApiToModel({ user, hashedPassword, isTemporalPassword: true });

        await userRepository.saveUser(userModel);

        res.send(mapUserFromModelToApi(userModel));
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
      const editedUser: apiModel.Usuario = req.body;
      const existingUser = await userRepository.getUser(id, {
        contraseña: 1,
        esContraseñaTemporal: 1,
      });
      
      if (userRepository.emailExists(editedUser.email, id) && existingUser) {
        const hashedPassword = existingUser.contraseña;
        const isTemporalPassword = existingUser.esContraseñaTemporal;
        const userWithId = {
          id: id,
          ...editedUser,
        };
        const mappedUser = mapUserFromApiToModel({ user: userWithId, hashedPassword, isTemporalPassword });
        await userRepository.saveUser(mappedUser);
        res.sendStatus(204);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  });
  