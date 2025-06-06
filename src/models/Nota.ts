import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Aluno } from './Aluno';
import { Disciplina } from './Disciplina';

export class Nota extends Model {
    public id!: number;
    public aluno_id!: number;
    public disciplina_id!: number;
    public nota!: number;
    public data_avaliacao!: Date;
    public disciplina?: Disciplina;
}

Nota.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        aluno_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'aluno_id',
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        disciplina_id: {
            type: DataTypes.INTEGER,
            field: 'disciplina_id',
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
        data_avaliacao: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
    },
    {
        sequelize,
        tableName: "notas",
        timestamps: true,
        paranoid: true,
    }
)