import crypto from 'node:crypto';

const saltLenght = 32;
const hashLength = 64;

const hashSaltAndPassword = (salt: string, password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, hashLength, (error, hashedPassword) => {
      if (error) {
        reject(error);
      }

      resolve(`${salt}:${hashedPassword.toString('hex')}`);
    });
  });

export const hash = async (password: string): Promise<string> => {
  const salt = crypto.randomBytes(saltLenght).toString('hex');

  return await hashSaltAndPassword(salt, password);
};

const areEquals = (hashA: string, hashB: string): boolean =>
  crypto.timingSafeEqual(Buffer.from(hashA, 'hex'), Buffer.from(hashB, 'hex'));

export const verifyHash = async (password: string, hashedPassword: string): Promise<boolean> => {
  const [salt, hash] = hashedPassword.split(':');
  const [, newHash] = (await hashSaltAndPassword(salt, password)).split(':');
  return areEquals(hash, newHash);
};
