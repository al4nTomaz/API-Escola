import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Disciplina } from './Disciplina';
import { Aluno } from './Aluno';

export class AlunoDisciplina extends Model {
    public idAluno!: number;
    public idDisciplina!: number;
}

AlunoDisciplina.init(
    {
        idAluno: {
            type: DataTypes.INTEGER,
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
            allowNull: false,
            field: 'id_disciplina',
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