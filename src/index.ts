import express from "express";
import path from "node:path";
import { createRestApiServer } from "./core/servers/index.js";
import { ENV } from "./core/constants/index.js";

const app = createRestApiServer();

app.use(
  "/",
  express.static(path.resolve(import.meta.dirname, ENV.STATIC_FILES_PATH))
);

app.listen(ENV.PORT, () => {
  console.log(`Server ready at port ${ENV.PORT}`);
});
