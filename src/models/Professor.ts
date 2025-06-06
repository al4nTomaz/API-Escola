import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export class Professor extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public matricula!: string;
    public tipo!: string;
}

Professor.init(
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
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "professores",
        timestamps: true,
        paranoid: true,
    }
)