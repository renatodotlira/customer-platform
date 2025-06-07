import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/database';

export interface OtpAttributes {
  id?: string;
  token?: string;
  consumed?: boolean;
  expirationDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  metadataKey?: string;
  metadataValue?: string;
}
interface OtpCreationAttributes extends Optional<OtpAttributes, 'id'> { }

class Otp extends Model<OtpAttributes, OtpCreationAttributes> implements OtpAttributes {
  public id!: string;
  public token!: string;
  public consumed!: boolean;
  public expirationDate!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
  public metadataKey!: string;
  public metadataValue!: string;
}

Otp.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  consumed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  metadataKey: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metadataValue: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'otp',
  timestamps: false
});

export default Otp;
