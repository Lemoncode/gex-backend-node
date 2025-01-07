import { mapToCollection } from '#common/mappers/collection.mapper.js';
import { mapObjectIdToString } from '#common/mappers/object-id.mappers.js';
import { Lookup } from '#common/models/index.js';

import * as apiModel from './lookup.api-model.js';

const mapLookupFromModelToApi = (lookup: Lookup): apiModel.Lookup => ({
  ...lookup,
  id: mapObjectIdToString(lookup._id),
});

export const mapLookupListFromModelToApi = (lookupList: Lookup[]): apiModel.Lookup[] =>
  mapToCollection(lookupList, mapLookupFromModelToApi);
