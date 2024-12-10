import { dbServer } from "#core/servers/index.js";
import { LookupModel } from "./lookup.model.js";

export const getUnidadesProponentesContext = () => dbServer.db?.collection<LookupModel>("unidadesProponentesLookups");
