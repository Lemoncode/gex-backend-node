import jwt from 'jsonwebtoken';
import { ENV } from '#core/constants/index.js';
import { CookieOptions } from 'express';

export const signToken = <Payload extends Object>(payload: Payload): string =>
  jwt.sign(payload, ENV.AUTH_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

export const getCookieOptions = (): CookieOptions => {
  const expires = new Date();
  expires.setDate(new Date().getDate() + parseInt('1d'));

  return {
    httpOnly: true,
    secure: ENV.IS_PRODUCTION,
    expires,
  };
};
