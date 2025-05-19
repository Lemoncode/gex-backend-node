export enum CustomInternalCodes {
  FieldNotInformed = 'validation-field-not-informed',
  DuplicatedEmail = 'user-001',
  UserNotFound = 'user-002',
  RolNotFound = 'user-003',
  UnidadNotFound = 'user-004',
}

export interface Error {
  error: CustomInternalCodes;
}

export interface ValidationInfo {
  succeded: boolean;
  error?: Error;
}
