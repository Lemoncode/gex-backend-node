import express from "express";
import path from "node:path";
import {
  logErrorRequestMiddleware,
  logRequestMiddleware,
} from "#common/middlewares/index.js";
import { logger } from "#core/logger/index.js";
import { createRestApiServer } from "#core/servers/index.js";
import { ENV } from "#core/constants/index.js";
import { userApi } from "#pods/user/index.js";

const app = createRestApiServer();

app.use(logRequestMiddleware(logger));

app.use("/api/user", userApi);

app.use(logErrorRequestMiddleware(logger));

app.listen(ENV.PORT, () => {
  logger.info(`Server ready at port ${ENV.PORT}`);
});

app.use(
  "/",
  express.static(path.resolve(import.meta.dirname, ENV.STATIC_FILES_PATH))
);
