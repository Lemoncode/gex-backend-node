import { ObjectId } from 'mongodb';
import * as model from '#dals/user/index.js';
import * as apiModel from './user.api-model.js';
import { mapUserFromApiToModel } from './user.mappers.js';

describe('pods/user/user.mappers', () => {
  describe('mapUserFromApiToModel', () => {
    const mockHashedPassword: string = '12345fe'
    it('should return one mapped user when required', () => {
      // Arrange
      const user: apiModel.Usuario = {
        id: '6543d1516ea297f6f49108e5',
        nombre: 'TestName',
        apellido: 'TestSurname',
        email: 'test@example.com',
        telefono: '910000000',
        movil: '620000000',
        rol: {
          id: '677d15fd24c5646a1f7f69c0',
          nombre: 'Usuario-Administrador',
        },
        esResponsable: true,
        esProponente: true,
        esAutorizante: false,
        esContraseñaTemporal: false,
        contraseña: 'test123',
        unidad: {
          id: '677d1539c3cb57a1f7b57e77',
          nombre: 'Unidad E',
          code: 'E1',
        },
      };
      const userParams: apiModel.SaveUserParams = {
        user: user,
        hashedPassword: mockHashedPassword,
        isTemporalPassword: true,
      }

      // Act
      const result = mapUserFromApiToModel(userParams);

      // Assert
      const expectedResult: model.Usuario = {
        _id: new ObjectId('6543d1516ea297f6f49108e5'),
        nombre: 'TestName',
        apellido: 'TestSurname',
        email: 'test@example.com',
        telefono: '910000000',
        movil: '620000000',
        rol: {
          id: '677d15fd24c5646a1f7f69c0',
          nombre: 'Usuario-Administrador',
        },
        esResponsable: true,
        esProponente: true,
        esAutorizante: false,
        esContraseñaTemporal: true,
        contraseña: '12345fe',
        unidad: {
          id: '677d1539c3cb57a1f7b57e77',
          nombre: 'Unidad E',
          code: 'E1',
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it.each<{ user: apiModel.Usuario }>([{ user: undefined }, { user: null }])(
      'should return undefined when user equals $user',
      ({ user }) => {
        // Arrange
        const userParams: apiModel.SaveUserParams = {
          user: user,
          hashedPassword: mockHashedPassword,
          isTemporalPassword: true,
        }

        // Act
        const result = mapUserFromApiToModel(userParams);

        // Assert
        expect(result).toEqual(undefined);
      }
    );
  });
});
