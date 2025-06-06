import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Aluno } from './Aluno';
import { Disciplina } from './Disciplina';

export class Presenca extends Model {
    public id!: number;
    public aluno_id!: number;
    public disciplina_id!: number;
    public data!: Date;
    public presente!: number;
    public disciplina?: Disciplina;
}

Presenca.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        aluno_id: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'aluno_id',
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        disciplina_id: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'disciplina_id',
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