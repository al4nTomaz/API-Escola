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
    foreignKey: 'id_aluno',
    as: 'disciplinas'
});

Disciplina.belongsToMany(Aluno, {
    through: AlunoDisciplina,
    foreignKey: 'id_disciplina',
    as: 'alunos'
});

Curso.hasMany(Aluno, {
  foreignKey: 'id_curso',
  as: 'alunos'
});

// Um Aluno pertence a um Curso
Aluno.belongsTo(Curso, {
  foreignKey: 'id_curso',
  as: 'curso'
});

Aluno.belongsToMany(Turma, {
  through: AlunoTurma,
  foreignKey: 'id_aluno',     // chave que representa o Aluno na tabela de junção
  otherKey: 'id_turma',       // chave que representa a Turma
  as: 'turmas'
});

Turma.belongsToMany(Aluno, {
  through: AlunoTurma,
  foreignKey: 'id_turma',     // chave que representa a Turma na tabela de junção
  otherKey: 'id_aluno',       // chave que representa o Aluno
  as: 'alunos'
});


// Relação 1:N entre Turma e Aluno
// Turma.hasMany(Aluno, {
//     foreignKey: 'id_turma',
//     as: 'alunosDaTurma'
// });

// Aluno.belongsTo(Turma, {
//     foreignKey: 'id_turma',
//     as: 'turma'
// });

// Relação 1:N entre Curso e Turma
Curso.hasMany(Turma, {
    foreignKey: 'id_curso',
    as: 'turmas'
});

Turma.belongsTo(Curso, {
    foreignKey: 'id_curso',
    as: 'curso'
});

// Relação 1:N entre Professor e Disciplina
Professor.hasMany(Disciplina, {
    foreignKey: 'id_professor',
    as: 'disciplinasLecionadas'
});

Disciplina.belongsTo(Professor, {
    foreignKey: 'id_professor',
    as: 'professor'
});

// Relação 1:N entre Aluno e Presenca
Aluno.hasMany(Presenca, {
    foreignKey: 'id_aluno',
    as: 'presencas'
});

Presenca.belongsTo(Aluno, {
    foreignKey: 'id_aluno',
    as: 'aluno'
});

// Relação 1:N entre Disciplina e Presenca
Disciplina.hasMany(Presenca, {
    foreignKey: 'id_disciplina',
    as: 'presencasDaDisciplina'
});

Presenca.belongsTo(Disciplina, {
    foreignKey: 'id_disciplina',
    as: 'disciplina'
});

// Relação 1:N entre Aluno e Nota
Aluno.hasMany(Nota, {
    foreignKey: 'id_aluno',
    as: 'notas'
});

Nota.belongsTo(Aluno, {
    foreignKey: 'id_aluno',
    as: 'aluno'
});

// Relação 1:N entre Disciplina e Nota
Disciplina.hasMany(Nota, {
    foreignKey: 'id_disciplina',
    as: 'notasDaDisciplina'
});

Nota.belongsTo(Disciplina, {
    foreignKey: 'id_disciplina',
    as: 'disciplina'
});

