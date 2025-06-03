import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Aluno } from './Aluno';
import { Disciplina } from './Disciplina';

export class Presenca extends Model {
    public id!: number;
    public id_aluno!: number;
    public id_disciplina!: number;
    public data!: Date;
    public presente!: number;
}

Presenca.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_aluno: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'id_aluno',
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        id_disciplina: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'id_disciplina',
            references: {
                model: Disciplina,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        presente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "presencas",
        timestamps: true,
        paranoid: true,
    }
)