import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/database';
import Employee from './employee.model';
import Service from './service.model';

class RelationEmployeeService extends Model {
  public employeeId!: number;
  public serviceId!: string;
}

RelationEmployeeService.init({
  employeeId: {
    type: DataTypes.INTEGER,
    field: 'employee_id',
    allowNull: false,
    references: { model: Employee, key: 'id' }
  },
  serviceId: {
    type: DataTypes.STRING,
    field: 'service_id',
    allowNull: false,
    references: { model: Service, key: 'id' }
  }
}, {
  sequelize,
  tableName: 'employee_service',
  timestamps: false,
});

Employee.hasMany(RelationEmployeeService, {
  foreignKey: 'employee_id',
  as: 'employeeServices',
});

Service.hasMany(RelationEmployeeService, {
  foreignKey: 'service_id',
  as: 'relationEmployeeServices',
});

RelationEmployeeService.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

Employee.belongsToMany(Service, { through: RelationEmployeeService, foreignKey: 'employeeId' });
Service.belongsToMany(Employee, { through: RelationEmployeeService, foreignKey: 'serviceId' });

export default RelationEmployeeService;
