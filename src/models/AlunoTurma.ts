import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Turma } from './Turma';
import { Aluno } from './Aluno';

export class AlunoTurma extends Model {
  public aluno_id!: number;
  public turma_id!: number;
}

AlunoTurma.init(
  {
    aluno_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'aluno_id',
      references: {
        model: Aluno,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    turma_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'turma_id',
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
