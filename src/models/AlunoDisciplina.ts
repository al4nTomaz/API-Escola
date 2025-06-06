import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Disciplina } from './Disciplina';
import { Aluno } from './Aluno';

export class AlunoDisciplina extends Model {
    public aluno_id!: number;
    public disciplina_id!: number;
}

AlunoDisciplina.init(
    {
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
            allowNull: false,
            field: 'disciplina_id',
            references: {
                model: Disciplina,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "alunos_disciplinas",
        timestamps: false,

    }
)