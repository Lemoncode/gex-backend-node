import { mapToCollection, mapObjectIdToString } from '#common/mappers/index.js';
import { Lookup } from '#common/models/index.js';
import * as apiModel from './unidad-proponente.api-model.js';

const mapLookupFromModelToApi = (lookup: Lookup): apiModel.Lookup => ({
  id: mapObjectIdToString(lookup._id),
  nombre: lookup.nombre,
  code: lookup.code,
});

export const mapLookupListFromModelToApi = (lookupList: Lookup[]): apiModel.Lookup[] =>
  mapToCollection(lookupList, mapLookupFromModelToApi);
