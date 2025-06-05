import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Curso } from './Curso';

export class Aluno extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public matricula!: string;
    public id_curso!: number | 0;
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
        id_curso: {
            type: DataTypes.INTEGER,
            field: 'id_curso',
            references: {
                model: Curso,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "alunos",
        timestamps: true,
        paranoid: true,
    }
)