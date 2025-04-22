import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Curso } from './Curso';

export class Truma extends Model {
    public id!: number;
    public nome!: string;
    public periodo!: string;
    public idCurso!: number;
}

Truma.init(
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
        periodo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        idCurso: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Curso,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "turmas",
        timestamps: true,
        paranoid: true,
    }
)