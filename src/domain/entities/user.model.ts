import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/database';

class User extends Model {
  public id!: number;
  public number!: string;
  public name!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  tableName: 'user',
  timestamps: false
});

export default User;
