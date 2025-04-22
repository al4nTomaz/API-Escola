import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Truma } from './Turma';

export class Aluno extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public matricula!: string;
    public idTurma!: number;
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
        //talvez nullo
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        idTurma: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Truma,
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