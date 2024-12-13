import { lookupRepository } from '#dals/lookups/lookup.repository.js';
import { Router } from 'express';
import { mapLookupListFromModelToApi } from './lookup.mappers.js';
export const lookupApi = Router();

lookupApi.get('/unidades', async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);
    const unidadesList = await lookupRepository.getUnidadesList(page, pageSize);
    res.send(mapLookupListFromModelToApi(unidadesList));
  } catch (error) {
    next(error);
  }
});
