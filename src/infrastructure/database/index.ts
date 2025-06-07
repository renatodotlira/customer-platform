import { Sequelize } from 'sequelize';
import { configService } from '../configs/env.config';

const sequelize: Sequelize = new Sequelize(
  configService.get("DATABASE").DB_NAME, 
  configService.get("DATABASE").USER, 
  configService.get("DATABASE").PASSWORD,  
{
  host: configService.get("DATABASE").HOST,
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
