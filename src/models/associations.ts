import { Aluno } from "./Aluno";
import { Disciplina } from './Disciplina';
import { AlunoDisciplina } from './AlunoDisciplina';
import { Turma } from './Turma';
import { Curso } from './Curso';
import { Professor } from './Professor';
import { Presenca } from './Presenca';
import { Nota } from './Nota';

// Relação Muitos-para-Muitos entre Aluno e Disciplina (já definida no seu código)
Aluno.belongsToMany(Disciplina, {
  through: AlunoDisciplina,
  foreignKey: 'alunoId',
  as: 'disciplinas' // O 'as' define como você acessará as disciplinas do aluno
});

Disciplina.belongsToMany(Aluno, {
  through: AlunoDisciplina,
  foreignKey: 'disciplinaId',
  as: 'alunos' // O 'as' define como você acessará os alunos da disciplina
});

// Relação Um-para-Muitos entre Turma e Aluno
Turma.hasMany(Aluno, {
  foreignKey: 'id_turma',
  as: 'alunos' // O 'as' define como você acessará os alunos da turma
});

Aluno.belongsTo(Turma, {
  foreignKey: 'id_turma',
  as: 'turma' // O 'as' define como você acessará a turma do aluno
});

// Relação Um-para-Muitos entre Curso e Turma
Curso.hasMany(Turma, {
  foreignKey: 'id_curso',
  as: 'turmas' // O 'as' define como você acessará as turmas do curso
});

Turma.belongsTo(Curso, {
  foreignKey: 'id_curso',
  as: 'curso' // O 'as' define como você acessará o curso da turma
});

// Relação Um-para-Muitos entre Disciplina e Professor
Disciplina.belongsTo(Professor, {
  foreignKey: 'id_professor',
  as: 'professor' // O 'as' define como você acessará o professor da disciplina
});

Professor.hasMany(Disciplina, {
  foreignKey: 'id_professor',
  as: 'disciplinasLecionadas' // O 'as' define como você acessará as disciplinas lecionadas pelo professor
});

// Relação Um-para-Muitos entre Aluno e Presenca
Aluno.hasMany(Presenca, {
  foreignKey: 'alunoId',
  as: 'presencas' // O 'as' define como você acessará as presenças do aluno
});

Presenca.belongsTo(Aluno, {
  foreignKey: 'alunoId',
  as: 'aluno' // O 'as' define como você acessará o aluno da presença
});

// Relação Um-para-Muitos entre Disciplina e Presenca
Disciplina.hasMany(Presenca, {
  foreignKey: 'disciplinaId',
  as: 'presencas' // O 'as' define como você acessará as presenças da disciplina
});

Presenca.belongsTo(Disciplina, {
  foreignKey: 'disciplinaId',
  as: 'disciplina' // O 'as' define como você acessará a disciplina da presença
});

// Relação Um-para-Muitos entre AlunoDisciplina e Nota
AlunoDisciplina.hasMany(Nota, {
  foreignKey: 'alunoId', // Embora a chave estrangeira na tabela 'notas' seja 'alunoId', ela se refere à relação com AlunoDisciplina
  sourceKey: 'alunoId', // Indica qual coluna de AlunoDisciplina usar para a correspondência
  as: 'notasAluno' // O 'as' define como você acessará as notas do aluno nesta relação específica
});

Nota.belongsTo(AlunoDisciplina, {
  foreignKey: 'alunoId', // Embora a chave estrangeira na tabela 'notas' seja 'alunoId', ela se refere à relação com AlunoDisciplina
  targetKey: 'alunoId', // Indica qual coluna de AlunoDisciplina usar para a correspondência
  as: 'alunoDisciplina' // O 'as' define como você acessará a entrada de AlunoDisciplina da nota
});

// Relação Um-para-Muitos entre AlunoDisciplina e Nota (para a disciplina)
AlunoDisciplina.hasMany(Nota, {
  foreignKey: 'disciplinaId', // Embora a chave estrangeira na tabela 'notas' seja 'disciplinaId', ela se refere à relação com AlunoDisciplina
  sourceKey: 'disciplinaId', // Indica qual coluna de AlunoDisciplina usar para a correspondência
  as: 'notasDisciplina' // O 'as' define como você acessará as notas da disciplina nesta relação específica
});

Nota.belongsTo(AlunoDisciplina, {
  foreignKey: 'disciplinaId', // Embora a chave estrangeira na tabela 'notas' seja 'disciplinaId', ela se refere à relação com AlunoDisciplina
  targetKey: 'disciplinaId', // Indica qual coluna de AlunoDisciplina usar para a correspondência
  as: 'alunoDisciplina' // O 'as' define como você acessará a entrada de AlunoDisciplina da nota
});

console.log("Todas as relações entre os models foram configuradas!");