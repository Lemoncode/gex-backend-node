export enum CustomInternalCodes {
  FieldNotInformed = 'validation-field-not-informed',
  DuplicatedEmail = 'user-001',
}

export interface Error {
  error: CustomInternalCodes;
}

export interface ValidationInfo {
  succeded: boolean;
  error?: Error;
}
