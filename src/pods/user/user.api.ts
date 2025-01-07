import { Router } from 'express';
import { userRepository } from '#dals/user/user.repository.js';
import { mapUserListFromModelToApi, mapUserFromModelToApi } from './user.mappers.js';

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
        apellidos: 1,
        email: 1,
        telefonoFijo: 1,
        telefonoMovil: 1,
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
  });
