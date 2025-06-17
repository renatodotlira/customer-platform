import sequelize from '../../infrastructure/database';
import { DataTypes, Model, Optional } from 'sequelize';
import Business from './business.model';
import RelationUserAccountRole from './relationUserAccountRoles.model';


export interface UserAttributes {
  id?: string;
  email: string;
  password: string;
  number?: string;
  businessId?: string;
  emailConfirmed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class UserAccount extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public phoneNumber!: string;
  public email!: string
  public password!: string;
  public businessId!: string;
  public userAccountRoles?: RelationUserAccountRole;
  public emailConfirmed!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public status?: string;
}

UserAccount.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  businessId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "business_id"
  },
  emailConfirmed: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  tableName: 'user_account',
  timestamps: false
});

Business.hasMany(UserAccount, {
  foreignKey: 'business_id',
  as: 'userAccounts',
});
UserAccount.belongsTo(Business, { foreignKey: 'business_id', as: 'business' });

export default UserAccount;
