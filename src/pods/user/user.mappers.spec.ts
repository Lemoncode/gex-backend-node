import { ObjectId } from 'mongodb';
import * as model from '#dals/user/user.model.js';
import * as apiModel from './user.api-model.js';
import { mapUserFromModelToApi } from './user.mappers.js';

describe('pods/user/user.mappers', () => {
  describe('mapUserFromModelToApi', () => {
    it('should return one mapped user when required', () => {
      // Arrange
      const user: model.Usuario = {
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
        esContraseñaTemporal: false,
        contraseña: 'test123',
        unidad: {
          id: '677d1539c3cb57a1f7b57e77',
          nombre: 'Unidad E',
          code: 'E1',
        },
      };

      // Act
      const result = mapUserFromModelToApi(user);

      // Assert
      const expectedResult: apiModel.Usuario = {
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
        unidad: {
          id: '677d1539c3cb57a1f7b57e77',
          nombre: 'Unidad E',
          code: 'E1',
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it.each<{ user: model.Usuario }>([{ user: undefined }, { user: null }])(
      'should return undefined when user equals $resource',
      ({ user }) => {
        // Arrange

        // Act
        const result = mapUserFromModelToApi(user);

        // Assert
        expect(result).toEqual(undefined);
      }
    );
  });
});