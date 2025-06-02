import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Aluno } from './Aluno';
import { Disciplina } from './Disciplina';

export class Nota extends Model {
    public id!: number;
    public idAluno!: number;
    public idDisciplina!: number;
    public nota!: number;
    public dataAvaliacao!: Date;
}

Nota.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idAluno: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'id_aluno',
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        idDisciplina: {
            type: DataTypes.INTEGER,
            field: 'id_disciplina',
            allowNull: false,
            references: {
                model: Disciplina,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        nota: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataAvaliacao: {
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