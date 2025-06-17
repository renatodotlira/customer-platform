import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database';
import Business from './business.model';
import RelationEmployeeService from './relationEmployeeService.model';

export interface EmployeeAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  businessId: string;
  services?: RelationEmployeeService[];
}

interface EmployeeCreationAttributes extends Omit<EmployeeAttributes, 'id'> {}

class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  public id!: number;
  public name!: string;
  public businessId!: string;
  public email!: string;
  public phone!: string;
  public services?: RelationEmployeeService[];
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
    type: DataTypes.STRING,
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

Business.hasMany(Employee, {
    foreignKey: 'business_id',
    as: 'employees',
});
Employee.belongsTo(Business, { foreignKey: 'business_id', as: 'business' });


export default Employee;
