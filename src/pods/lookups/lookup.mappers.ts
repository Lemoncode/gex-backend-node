import { mapToCollection } from "#common/mappers/collection.mapper.js";
import { mapObjectIdToString } from "#common/mappers/object-id.mappers.js";
import * as model from "#dals/lookups/lookup.model.js"
import * as apiModel from "./lookup.api-model.js";

export const mapLookupFromModelToApi = (lookup: model.LookupModel): apiModel.LookupModel => ({
    ...lookup,
    id: mapObjectIdToString(lookup._id)
});

export const mapLookupListFromModelToApi = (lookupList: model.LookupModel[]): apiModel.LookupModel[] =>
    mapToCollection(lookupList, mapLookupFromModelToApi);