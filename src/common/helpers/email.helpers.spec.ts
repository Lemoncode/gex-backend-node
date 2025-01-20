import { formatEmail } from "./email.helpers.js";

describe('common/helpers/email.helpers', () => {

  describe('formatEmail function', () => {
    it('should delete whitespaces from the beginning and end of the string', () => {
      // Arrange
      const mockEmail = " testwithws@test.com    ";

      // Act
      const result = formatEmail(mockEmail);

      // Assert
      expect(result).toMatch("testwithws@test.com");
    });

    it('should delete whitespaces in the middle of the string', () => {
      // Arrange
      const mockEmail = "testwithws  @test.com";

      // Act
      const result = formatEmail(mockEmail);

      // Assert
      expect(result).toMatch("testwithws@test.com");
    });

    it('should convert any upper case letters into lower case', () => {
      // Arrange
      const mockEmail = "testWITHCAPS@test.COM";

      // Act
      const result = formatEmail(mockEmail);

      // Assert
      expect(result).toMatch("testwithcaps@test.com");
    });
  });
});