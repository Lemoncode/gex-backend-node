import { Router } from 'express';
import { lookupRepository } from '#dals/lookups/lookup.repository.js';
import { mapLookupListFromModelToApi } from './lookup.mappers.js';

export const lookupApi = Router();

lookupApi.get('/unidad', async (req, res, next) => {
  try {
    const unidadesList = await lookupRepository.getUnidadesList();

    res.send(mapLookupListFromModelToApi(unidadesList));
  } catch (error) {
    next(error);
  }
});
