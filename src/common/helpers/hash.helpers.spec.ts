import crypto from 'node:crypto';
import { hash, verifyHash } from './hash.helpers.js';

describe('common/helpers/hash-password-helpers', () => {
  const mockPassword = 'securePassword123';

  describe('hash function', () => {
    it('should generate a hash in the expected format (salt:hashedPassword)', async () => {
      // Arrange
      const password = mockPassword;

      // Act
      const hashedPassword = await hash(password);

      // Assert
      expect(hashedPassword).toMatch(/^[a-f0-9]{64}:[a-f0-9]{128}$/);
    });

    it('should generate a different hash for different passwords', async () => {
      // Arrange
      const password1 = mockPassword;
      const password2 = 'anotherSecurePassword123';

      // Act
      const hash1 = await hash(password1);
      const hash2 = await hash(password2);

      // Assert
      expect(hash1).not.toBe(hash2);
    });

    it('should generate a different hash for the same password due to the salt', async () => {
      // Arrange
      const password = mockPassword;

      // Act
      const hash1 = await hash(password);
      const hash2 = await hash(password);

      // Assert
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('verifyHash function', () => {
    it('should return true if the password matches the hash', async () => {
      // Arrange
      const password = mockPassword;
      const hashedPassword = await hash(password);

      // Act
      const isVerified = await verifyHash(password, hashedPassword);

      // Assert
      expect(isVerified).toBe(true);
    });

    it('should return false if the password does not match the hash', async () => {
      // Arrange
      const password = mockPassword;
      const wrongPassword = 'wrongPassword123';
      const hashedPassword = await hash(password);

      // Act
      const isVerified = await verifyHash(wrongPassword, hashedPassword);

      // Assert
      expect(isVerified).toBe(false);
    });

    it('should throw an error if the hash format is invalid', async () => {
      // Arrange
      const invalidHash = 'invalidHash';
      const password = mockPassword;

      // Act & Assert
      await expect(verifyHash(password, invalidHash)).rejects.toThrowError();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty passwords', async () => {
      // Arrange
      const emptyPassword = '';

      // Act
      const hashedPassword = await hash(emptyPassword);
      const isVerified = await verifyHash(emptyPassword, hashedPassword);

      // Assert
      expect(isVerified).toBe(true);
    });

    it('should handle very long passwords', async () => {
      // Arrange
      const longPassword = 'a'.repeat(10_000);

      // Act
      const hashedPassword = await hash(longPassword);
      const isVerified = await verifyHash(longPassword, hashedPassword);

      // Assert
      expect(isVerified).toBe(true);
    });

    it('should handle passwords with special characters', async () => {
      // Arrange
      const specialPassword = '!@#$%^&*()_+{}:"<>?`~';

      // Act
      const hashedPassword = await hash(specialPassword);
      const isVerified = await verifyHash(specialPassword, hashedPassword);

      // Assert
      expect(isVerified).toBe(true);
    });
  });

  describe('Security (timingSafeEqual)', () => {
    it('should securely compare hashes to prevent timing attacks', async () => {
      // Arrange
      const password1 = mockPassword;
      const password2 = 'anotherPassword';
      const hashedPassword1 = await hash(password1);
      const hashedPassword2 = await hash(password2);

      // Act
      const [salt1, hash1] = hashedPassword1.split(':');
      const [salt2, hash2] = hashedPassword2.split(':');
      const isEqual = crypto.timingSafeEqual(Buffer.from(hash1, 'hex'), Buffer.from(hash2, 'hex'));

      // Assert
      expect(isEqual).toBe(false);
    });
  });
});
