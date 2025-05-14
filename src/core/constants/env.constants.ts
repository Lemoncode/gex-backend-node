export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: Number(process.env.PORT),
  STATIC_FILES_PATH: process.env.STATIC_FILES_PATH,
  MONGODB_URL: process.env.MONGODB_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
};
