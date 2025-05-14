import { Router } from 'express';
import { lookupRepository } from '#dals/lookup/lookup.repository.js';
import { mapLookupListToApiModel } from '#common/mappers/index.js';

export const lookupApi = Router();

lookupApi
  .get('/unidad', async (req, res, next) => {
    try {
      const unidadesList = await lookupRepository.getUnidadList();

      res.send(mapLookupListToApiModel(unidadesList));
    } catch (error) {
      next(error);
    }
  })
  .get('/rol', async (req, res, next) => {
    try {
      const rolesList = await lookupRepository.getRolList();

      res.send(mapLookupListToApiModel(rolesList));
    } catch (error) {
      next(error);
    }
  })
  .get('/unidad-rol', async (req, res, next) => {
    try {
      const unidadRolList = await lookupRepository.getUnidadRolList();

      const { roles, unidades } = unidadRolList;
      const mappedRoles = mapLookupListToApiModel(roles);
      const mappedUnidades = mapLookupListToApiModel(unidades);

      res.send({
        roles: mappedRoles,
        unidades: mappedUnidades,
      });
    } catch (error) {
      next(error);
    }
  });
