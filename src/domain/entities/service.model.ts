import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database';
import Business from './business.model';


export interface ServiceAttributes {
  id?: string;
  name: string;
  price: number;
  duration: number;
  businessId: string;
  type: string;
}

interface ServiceCreationAttributes extends Omit<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id?: string;
  public name!: string;
  public price: number;
  public duration: number;
  public businessId: string;
  public type: string;
}

Service.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  businessId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'business_id'
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false  
  }
}, {
  sequelize,
  tableName: 'service',
  timestamps: false
});

Business.hasMany(Service, {
    foreignKey: 'business_id',
    as: 'services',
});
Service.belongsTo(Business, { foreignKey: 'business_id', as: 'business' });


export default Service;
