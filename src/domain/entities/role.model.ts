import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/database';

class Role extends Model {
  public id!: number;
  public name!: string;
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'role',
  timestamps: false
});

export default Role;
