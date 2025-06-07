import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/database';
import UserAccount from './userAccount.model';
import Role from './role.model';

class RelationUserAccountRole extends Model {
  [x: string]: any;
  public userAccountId!: number;
  public roleId!: number;
}

RelationUserAccountRole.init({
  userAccountId: {
    type: DataTypes.INTEGER,
    field: 'user_account_id',
    allowNull: false,
    references: { model: UserAccount, key: 'id' }
  },
  roleId: {
    type: DataTypes.INTEGER,
    field: 'role_id',
    allowNull: false,
    references: { model: Role, key: 'id' }
  }
}, {
  sequelize,
  tableName: 'user_account_role',
  timestamps: false,
});

UserAccount.hasMany(RelationUserAccountRole, {
  foreignKey: 'user_account_id',
  as: 'userAccountRoles',
});

Role.hasMany(RelationUserAccountRole, {
  foreignKey: 'role_id',
  as: 'userAccounts',
});

RelationUserAccountRole.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

UserAccount.belongsToMany(Role, { through: RelationUserAccountRole, foreignKey: 'userAccountId' });
Role.belongsToMany(UserAccount, { through: RelationUserAccountRole, foreignKey: 'roleId' });

export default RelationUserAccountRole;
