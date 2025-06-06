import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Curso } from './Curso';

export class Aluno extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public matricula!: string;
    public curso_id!: number | 0;
    public tipo!: string;
}

Aluno.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        curso_id: {
            type: DataTypes.INTEGER,
            field: 'curso_id',
            references: {
                model: Curso,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "alunos",
        timestamps: true,
        paranoid: true,
    }
)