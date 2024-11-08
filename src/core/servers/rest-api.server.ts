import { setupSwagger } from '#core/swagger/swagger.config.js';
import express from 'express';

export const createRestApiServer = () => {
  const app = express();
  app.use(express.json());
  setupSwagger(app);

  return app;
};
