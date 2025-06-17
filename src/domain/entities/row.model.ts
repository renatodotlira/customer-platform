import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/database';
import Service from './service.model';
import Employee from './employee.model';

// Tipos das colunas da tabela
export interface RowAttributes {
    id?: number;
    rowId: string;
    sectionId: number;
    serviceId?: number;
    employeeId: number;
    title: string;
    description?: string | null;
    isForward: boolean;
}

// Para criação (id é opcional)
interface RowCreationAttributes extends Optional<RowAttributes, 'id'> { }

// Definição da classe Sequelize
class Row extends Model<RowAttributes, RowCreationAttributes> implements RowAttributes {
    public id!: number;
    public rowId!: string;
    public sectionId!: number;
    public serviceId?: number;
    public employeeId!: number;
    public title!: string;
    public description?: string | null;
    public isForward!: boolean;
}

// Inicialização do modelo
Row.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rowId: {
        type: DataTypes.STRING,
        field: 'row_id'
    },
    sectionId: {
        type: DataTypes.INTEGER,
        field: 'section_id'
    },
    serviceId: {
        type: DataTypes.INTEGER,
        field: 'service_id'
    },
    employeeId: {
        type: DataTypes.INTEGER,
        field: 'employee_id'
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isForward: {
        type: DataTypes.BOOLEAN,
        field: 'is_forward'
    }
}, {
    sequelize,
    tableName: 'row',
    timestamps: false
});

Row.belongsTo(Service, {
    foreignKey: 'serviceId',
    as: 'service'
});
Row.belongsTo(Employee, {
    foreignKey: 'employeeId',
    as: 'employee'
});

export default Row;
