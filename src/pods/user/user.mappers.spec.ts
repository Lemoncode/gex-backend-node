import { ObjectId } from "mongodb";
import { mapObjectIdToString } from "#common/mappers/index.js";
import * as model from '#dals/user/user.model.js';
import * as apiModel from './user.api-model.js';
import { mapUserFromModelToApi } from "./user.mappers.js";

describe('pods/user/user.mappers spec', () => {
    describe('mapUserFromModelToApi', () => {
      it('should return a mapped user when required', () => {
        // Arrange
        const modelUser: model.Usuario =  {
            _id: new ObjectId('6543d1516ea297f6f49108e5'),
            nombre: 'Test',
            apellido: 'User',
            email: 'test@email.com',
            telefono: '900100100',
            movil: '600100100',
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
        const result = mapUserFromModelToApi(modelUser);
  
        // Assert
        const expectedResult: apiModel.Usuario = {
            id: '6543d1516ea297f6f49108e5',
            nombre: 'Test',
            apellido: 'User',
            email: 'test@email.com',
            telefono: '900100100',
            movil: '600100100',
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
    });
});