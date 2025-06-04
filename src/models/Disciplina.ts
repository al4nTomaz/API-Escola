import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Professor } from './Professor';

export class Disciplina extends Model {
    public id!: number;
    public nome!: string;
    public id_professor!: number;
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
        id_professor: {
            type: DataTypes.INTEGER,
            field: 'id_professor',
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