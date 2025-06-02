import { Aluno } from "./Aluno";
import { Disciplina } from './Disciplina';
import { AlunoDisciplina } from './AlunoDisciplina';
import { Turma } from './Turma';
import { Curso } from './Curso';
import { Professor } from './Professor';
import { Presenca } from './Presenca';
import { Nota } from './Nota';

// Relação N:N entre Aluno e Disciplina através de AlunoDisciplina
// (Um aluno pode ter muitas disciplinas, e uma disciplina pode ter muitos alunos)
Aluno.belongsToMany(Disciplina, {
    through: AlunoDisciplina,
    foreignKey: 'alunoId',
    as: 'disciplinas'
});

Disciplina.belongsToMany(Aluno, {
    through: AlunoDisciplina,
    foreignKey: 'disciplinaId',
    as: 'alunos'
});

// Relação 1:N entre Turma e Aluno
// (Uma turma tem muitos alunos)
Turma.hasMany(Aluno, {
    foreignKey: 'id_turma', // No ERD, é 'id_turma' em 'alunos'
    as: 'alunosDaTurma'
});

Aluno.belongsTo(Turma, {
    foreignKey: 'id_turma', // No ERD, é 'id_turma' em 'alunos'
    as: 'turma'
});

// Relação 1:N entre Curso e Turma
// (Um curso tem muitas turmas)
Curso.hasMany(Turma, {
    foreignKey: 'id_curso', // No ERD, é 'id_curso' em 'turmas'
    as: 'turmas'
});

Turma.belongsTo(Curso, {
    foreignKey: 'id_curso', // No ERD, é 'id_curso' em 'turmas'
    as: 'curso'
});

// Relação 1:N entre Professor e Disciplina
// (Um professor leciona muitas disciplinas)
Professor.hasMany(Disciplina, {
    foreignKey: 'id_professor', // No ERD, é 'id_professor' em 'disciplinas'
    as: 'disciplinasLecionadas'
});

Disciplina.belongsTo(Professor, {
    foreignKey: 'id_professor', // No ERD, é 'id_professor' em 'disciplinas'
    as: 'professor'
});

// Relação 1:N entre Aluno e Presenca
// (Um aluno tem muitas presenças)
Aluno.hasMany(Presenca, {
    foreignKey: 'alunoId', // No ERD, é 'alunoId' em 'presencas'
    as: 'presencas'
});

Presenca.belongsTo(Aluno, {
    foreignKey: 'alunoId', // No ERD, é 'alunoId' em 'presencas'
    as: 'aluno'
});

// Relação 1:N entre Disciplina e Presenca
// (Uma disciplina tem muitas presenças registradas)
Disciplina.hasMany(Presenca, {
    foreignKey: 'disciplinaId', // No ERD, é 'disciplinaId' em 'presencas'
    as: 'presencasDaDisciplina'
});

Presenca.belongsTo(Disciplina, {
    foreignKey: 'disciplinaId', // No ERD, é 'disciplinaId' em 'presencas'
    as: 'disciplina'
});

// Relações 1:N para Nota (Corrigidas para refletir o ERD diretamente)
// (Um aluno pode ter muitas notas)
Aluno.hasMany(Nota, {
    foreignKey: 'alunoId', // No ERD, é 'alunoId' em 'notas'
    as: 'notas'
});

Nota.belongsTo(Aluno, {
    foreignKey: 'alunoId', // No ERD, é 'alunoId' em 'notas'
    as: 'aluno'
});

// (Uma disciplina pode ter muitas notas)
Disciplina.hasMany(Nota, {
    foreignKey: 'disciplinaId', // No ERD, é 'disciplinaId' em 'notas'
    as: 'notasDaDisciplina'
});

Nota.belongsTo(Disciplina, {
    foreignKey: 'disciplinaId', // No ERD, é 'disciplinaId' em 'notas'
    as: 'disciplina'
});

console.log("Todas as relações entre os models foram configuradas!");