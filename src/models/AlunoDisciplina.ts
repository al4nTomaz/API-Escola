import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Disciplina } from './Disciplina';
import { Aluno } from './Aluno';

export class AlunoDisciplina extends Model {
    public alunoId!: number;
    public disciplinaId!: number;
}

AlunoDisciplina.init(
    {
        alunoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        disciplinaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Disciplina,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "aluno_disciplinas",
        timestamps: false,

    }
)