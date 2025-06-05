import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Disciplina } from './Disciplina';
import { Aluno } from './Aluno';

export class AlunoDisciplina extends Model {
    public id_aluno!: number;
    public id_disciplina!: number;
}

AlunoDisciplina.init(
    {
        id_aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_aluno',
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        id_disciplina: {
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
        tableName: "aluno_disciplina",
        timestamps: false,

    }
)