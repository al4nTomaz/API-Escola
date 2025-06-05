import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Turma } from './Turma';
import { Aluno } from './Aluno';

export class AlunoTurma extends Model {
  public id_aluno!: number;
  public id_turma!: number;
}

AlunoTurma.init(
  {
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_aluno',
      references: {
        model: Aluno,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    id_turma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_turma',
      references: {
        model: Turma,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'alunos_turmas',
    timestamps: false,
  }
);
