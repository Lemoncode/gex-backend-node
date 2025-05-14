import { Router } from 'express';
import { UserSession } from '#common/models/index.js';
import { authenticationMiddleware } from './security.middlewares.js';
import { authConstants } from '#core/constants/index.js';
import { userRepository } from '#dals/user/index.js';
import { getCookieOptions, signToken } from './security.helpers.js';
import { mapUserToUserSession } from './security.mappers.js';
import { UserCredentials } from './security.api-model.js';

export const securityApi = Router();

securityApi
  .post('/login', async (req, res, next) => {
    try {
      const { email, contraseña } = req.body as UserCredentials;
      const user = await userRepository.isValidLogin(email, contraseña);

      if (user) {
        const userSession: UserSession = mapUserToUserSession(user);
        const token = signToken(userSession);
        res.cookie(authConstants.sessionKey, `${authConstants.sessionType} ${token}`, getCookieOptions());
        res.sendStatus(204);
      } else {
        // TODO: send custom error
        res.sendStatus(401);
        res.clearCookie(authConstants.sessionKey);
      }
    } catch (error) {
      next(error);
    }
  })
  // .get('/whoami', authenticationMiddleware, async (req, res, next) => {
  //   try {
  //     const user = await userRepository.getUserById(req.userSession?.id);

  //     if (user) {
  //       res.status(200).send({ id: user._id.toHexString(), nombre: user.nombre, rol: user.rol });
  //     } else {
  //       res.sendStatus(401);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // })
  .post('/logout', authenticationMiddleware, async (req, res, next) => {
    try {
      res.clearCookie(authConstants.sessionKey);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });
