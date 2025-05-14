import { LookupApiModel, LookupModel } from '#common/models/index.js';
import { mapToCollection } from './collection.mapper.js';
import { mapObjectIdToString, mapStringToObjectId } from './object-id.mappers.js';

export const mapLookupToModel = (lookup: LookupApiModel): LookupModel => ({
  _id: mapStringToObjectId(lookup.id),
  nombre: lookup.nombre,
  ...(lookup.code && { code: lookup.code }),
});

export const mapLookupToApiModel = (lookup: LookupModel): LookupApiModel => ({
  id: mapObjectIdToString(lookup._id),
  nombre: lookup.nombre,
  ...(lookup.code && { code: lookup.code }),
});

export const mapLookupListToApiModel = (lookupList: LookupModel[]): LookupApiModel[] =>
  mapToCollection(lookupList, mapLookupToApiModel);
