import { Router } from 'express';
import { lookupRepository } from '#dals/lookup/lookup.repository.js';
import { mapLookupListFromModelToApi } from './lookup.mappers.js';

export const lookupApi = Router();

lookupApi
  .get('/unidad', async (req, res, next) => {
    try {
      const unidadesList = await lookupRepository.getUnidadList();

      res.send(mapLookupListFromModelToApi(unidadesList));
    } catch (error) {
      next(error);
    }
  })
  .get('/rol', async (req, res, next) => {
    try {
      const rolesList = await lookupRepository.getRolList();

      res.send(mapLookupListFromModelToApi(rolesList));
    } catch (error) {
      next(error);
    }
  });
