import sequelize from '../../infrastructure/database';
import { DataTypes, Model, Optional } from 'sequelize';
import Business from './business.model';

export interface PhoneAttributes {
  id?: string;
  businessId?: string;
  number?: string;
  instanceCode?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}
interface PhoneCreationAttributes extends Optional<PhoneAttributes, 'id'> { }

class Phone extends Model<PhoneAttributes, PhoneCreationAttributes> implements PhoneAttributes {
  public id!: string;
  public number!: string;
  public instanceCode!: string;
  public businessId!: string;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public active!: boolean;
}

Phone.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  instanceCode: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "instance_code"
  },
  businessId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "business_id"
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "created_at"
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "updated_at"
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  sequelize,
  tableName: 'phone',
  timestamps: false
});

Business.hasMany(Phone, {
  foreignKey: 'business_id',
  as: 'phones',
});
Phone.belongsTo(Business, { foreignKey: 'business_id', as: 'business' });

export default Phone;
