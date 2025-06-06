import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Professor } from './Professor';

export class Disciplina extends Model {
    public id!: number;
    public nome!: string;
    public professor_id!: number;
}

Disciplina.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        professor_id: {
            type: DataTypes.INTEGER,
            field: 'professor_id',
            references: {
                model: Professor,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "disciplinas",
        timestamps: true,
        paranoid: true,

    }
)