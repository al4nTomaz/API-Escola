import { Aluno } from "./Aluno";
import { Disciplina } from './Disciplina';
import { AlunoDisciplina } from './AlunoDisciplina';
import { Turma } from './Turma';
import { Curso } from './Curso';
import { Professor } from './Professor';
import { Presenca } from './Presenca';
import { Nota } from './Nota';
import { AlunoTurma } from './AlunoTurma';

// Relação N:N entre Aluno e Disciplina
Aluno.belongsToMany(Disciplina, {
    through: AlunoDisciplina,
    foreignKey: 'aluno_id',
    as: 'disciplinas'
});

Disciplina.belongsToMany(Aluno, {
    through: AlunoDisciplina,
    foreignKey: 'disciplina_id',
    as: 'alunos'
});

Curso.hasMany(Aluno, {
  foreignKey: 'curso_id',
  as: 'alunos'
});

// Um Aluno pertence a um Curso
Aluno.belongsTo(Curso, {
  foreignKey: 'curso_id',
  as: 'cursos'
});

Aluno.belongsToMany(Turma, {
  through: AlunoTurma,
  foreignKey: 'aluno_id',     // chave que representa o Aluno na tabela de junção
  otherKey: 'turma_id',       // chave que representa a Turma
  as: 'turmas'
});

Turma.belongsToMany(Aluno, {
  through: AlunoTurma,
  foreignKey: 'turma_id',     // chave que representa a Turma na tabela de junção
  otherKey: 'aluno_id',       // chave que representa o Aluno
  as: 'alunos'
});


// Relação 1:N entre Turma e Aluno
// Turma.hasMany(Aluno, {
//     foreignKey: 'turma_id',
//     as: 'alunosDaTurma'
// });

// Aluno.belongsTo(Turma, {
//     foreignKey: 'turma_id',
//     as: 'turma'
// });

// Relação 1:N entre Curso e Turma
Curso.hasMany(Turma, {
    foreignKey: 'curso_id',
    as: 'turmas'
});

Turma.belongsTo(Curso, {
    foreignKey: 'curso_id',
    as: 'cursos'
});

// Relação 1:N entre Professor e Disciplina
Professor.hasMany(Disciplina, {
    foreignKey: 'professor_id',
    as: 'disciplinas'
});

Disciplina.belongsTo(Professor, {
    foreignKey: 'professor_id',
    as: 'professores'
});

// Relação 1:N entre Aluno e Presenca
Aluno.hasMany(Presenca, {
    foreignKey: 'aluno_id',
    as: 'presencas'
});

Presenca.belongsTo(Aluno, {
    foreignKey: 'aluno_id',
    as: 'alunos'
});

// Relação 1:N entre Disciplina e Presenca
Disciplina.hasMany(Presenca, {
    foreignKey: 'disciplina_id',
    as: 'presencas'
});

Presenca.belongsTo(Disciplina, {
    foreignKey: 'disciplina_id',
    as: 'disciplinas'
});

// Relação 1:N entre Aluno e Nota
Aluno.hasMany(Nota, {
    foreignKey: 'aluno_id',
    as: 'notas'
});

Nota.belongsTo(Aluno, {
    foreignKey: 'aluno_id',
    as: 'alunos'
});

// Relação 1:N entre Disciplina e Nota
Disciplina.hasMany(Nota, {
    foreignKey: 'disciplina_id',
    as: 'notas'
});

Nota.belongsTo(Disciplina, {
    foreignKey: 'disciplina_id',
    as: 'disciplinas'
});

