import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database';
import Business from './business.model';

export interface EmployeeAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  businessId: number;
}

interface EmployeeCreationAttributes extends Omit<EmployeeAttributes, 'id'> {}

class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  public id!: number;
  public name!: string;
  public businessId!: number;
  public email!: string;
  public phone!: string;
}

Employee.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'business_id',
    references: {
        model: Business,
        key: 'id'
    }
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  tableName: 'employee',
  timestamps: false
});

export default Employee;
