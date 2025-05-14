import express from 'express';
import path from 'node:path';
import { logErrorRequestMiddleware, logRequestMiddleware } from '#common/middlewares/index.js';
import { ENV } from '#core/constants/index.js';
import { logger } from '#core/logger/index.js';
import { createRestApiServer, dbServer } from '#core/servers/index.js';
import { userApi } from '#pods/user/index.js';
import { lookupApi } from '#pods/lookup/index.js';
import { securityApi } from '#pods/security/index.js';
import { authenticationMiddleware } from '#pods/security/index.js';

const app = createRestApiServer();

app.use(logRequestMiddleware(logger));

app.use('/api/security', securityApi);
app.use('/api/usuario', authenticationMiddleware, userApi);
app.use('/api/lookup', authenticationMiddleware, lookupApi);

app.use(logErrorRequestMiddleware(logger));

app.listen(ENV.PORT, async () => {
  await dbServer.connect(ENV.MONGODB_URL);
  logger.info('Running DataBase');
  logger.info(`Server ready at port ${ENV.PORT}`);
});

app.use('/', express.static(path.resolve(import.meta.dirname, ENV.STATIC_FILES_PATH)));
