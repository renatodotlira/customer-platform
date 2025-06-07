import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/database';

export interface BusinessAttributes {
  id?: string;
  name: string;
  type: string;
  size: string;
}

interface BusinessCreationAttributes extends Optional<BusinessAttributes, 'id'> { }

class Business extends Model<BusinessAttributes, BusinessCreationAttributes> implements BusinessAttributes  {
  public id!: string;
  public name!: string;
  public type!: string;
  public size!: string;
}

Business.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'business',
  timestamps: false
});

export default Business;
