import sequelize from '../../infrastructure/database';

export class AuthRaw {
  _id?: string;
  jwt?: string;
  apikey?: string;
  instanceId?: string;
}

//export const AuthModel = dbserver?.model(AuthRaw.name, authSchema, 'authentication');
