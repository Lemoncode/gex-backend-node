import { hash, verifyHash } from "./hash-password.helpers.js";

describe("common/helpers/hash-password-helpers spec", () => {
  describe("hash", () => {
    const password = "password123";

    it("should generate a hash with a random salt", async () => {
      // Arrange

      // Act
      const result = await hash(password);
      
      const [salt, hashedPassword] = result.split(':');

      const hashedPassword2 = await hash(password);

      // Assert
      expect(salt).toBeDefined();
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword.length).toBe(128);
      expect(result).not.toBe(hashedPassword2);
    });

    it("should throw an error when hash is called with invalid input", async () => {
      // Arrange
      const invalidPassword = null;

      // Act & Assert
      await expect(hash(invalidPassword)).rejects.toThrow();
    });
  });
});


describe("common/helpers/hash-password-helpers spec", () => {
  describe("verifyHash", () => {
    const password = "password123";

    it('should verify a password against its hash correctly', async () => {
      // Arrange

      // Act
      const result = await hash(password);

      const isVerified = await verifyHash(password, result);

      const incorrectPassword = 'wrongPassword';

      const isIncorrectVerified = await verifyHash(incorrectPassword, result);
      
      // Assert
      expect(isVerified).toBe(true);
      expect(isIncorrectVerified).toBe(false);
    });

    it("should throw an error when verifyHash is called with invalid hash format", async () => {
      // Arrange
      const malformedHash = "invalid:hash:format";

      // Act & Assert
      await expect(verifyHash(password, malformedHash)).rejects.toThrow();
    });
  });
});
