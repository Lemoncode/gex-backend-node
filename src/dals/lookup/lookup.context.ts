import { dbServer } from "#core/servers/index.js";
import { LookupModel } from "./lookup.model.js";

export const getLookupContext = () => dbServer.db?.collection<LookupModel>("lookups");