"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Aluno_1 = require("./Aluno");
const Disciplina_1 = require("./Disciplina");
const AlunoDisciplina_1 = require("./AlunoDisciplina");
const Turma_1 = require("./Turma");
const Curso_1 = require("./Curso");
const Professor_1 = require("./Professor");
const Presenca_1 = require("./Presenca");
const Nota_1 = require("./Nota");
// Relação N:N entre Aluno e Disciplina através de AlunoDisciplina
// (Um aluno pode ter muitas disciplinas, e uma disciplina pode ter muitos alunos)
Aluno_1.Aluno.belongsToMany(Disciplina_1.Disciplina, {
    through: AlunoDisciplina_1.AlunoDisciplina,
    foreignKey: 'alunoId',
    as: 'disciplinas'
});
Disciplina_1.Disciplina.belongsToMany(Aluno_1.Aluno, {
    through: AlunoDisciplina_1.AlunoDisciplina,
    foreignKey: 'disciplinaId',
    as: 'alunos'
});
// Relação 1:N entre Turma e Aluno
// (Uma turma tem muitos alunos)
Turma_1.Turma.hasMany(Aluno_1.Aluno, {
    foreignKey: 'id_turma', // No ERD, é 'id_turma' em 'alunos'
    as: 'alunosDaTurma'
});
Aluno_1.Aluno.belongsTo(Turma_1.Turma, {
    foreignKey: 'id_turma', // No ERD, é 'id_turma' em 'alunos'
    as: 'turma'
});
// Relação 1:N entre Curso e Turma
// (Um curso tem muitas turmas)
Curso_1.Curso.hasMany(Turma_1.Turma, {
    foreignKey: 'id_curso', // No ERD, é 'id_curso' em 'turmas'
    as: 'turmas'
});
Turma_1.Turma.belongsTo(Curso_1.Curso, {
    foreignKey: 'id_curso', // No ERD, é 'id_curso' em 'turmas'
    as: 'curso'
});
// Relação 1:N entre Professor e Disciplina
// (Um professor leciona muitas disciplinas)
Professor_1.Professor.hasMany(Disciplina_1.Disciplina, {
    foreignKey: 'id_professor', // No ERD, é 'id_professor' em 'disciplinas'
    as: 'disciplinasLecionadas'
});
Disciplina_1.Disciplina.belongsTo(Professor_1.Professor, {
    foreignKey: 'id_professor', // No ERD, é 'id_professor' em 'disciplinas'
    as: 'professor'
});
// Relação 1:N entre Aluno e Presenca
// (Um aluno tem muitas presenças)
Aluno_1.Aluno.hasMany(Presenca_1.Presenca, {
    foreignKey: 'alunoId', // No ERD, é 'alunoId' em 'presencas'
    as: 'presencas'
});
Presenca_1.Presenca.belongsTo(Aluno_1.Aluno, {
    foreignKey: 'alunoId', // No ERD, é 'alunoId' em 'presencas'
    as: 'aluno'
});
// Relação 1:N entre Disciplina e Presenca
// (Uma disciplina tem muitas presenças registradas)
Disciplina_1.Disciplina.hasMany(Presenca_1.Presenca, {
    foreignKey: 'disciplinaId', // No ERD, é 'disciplinaId' em 'presencas'
    as: 'presencasDaDisciplina'
});
Presenca_1.Presenca.belongsTo(Disciplina_1.Disciplina, {
    foreignKey: 'disciplinaId', // No ERD, é 'disciplinaId' em 'presencas'
    as: 'disciplina'
});
// Relações 1:N para Nota (Corrigidas para refletir o ERD diretamente)
// (Um aluno pode ter muitas notas)
Aluno_1.Aluno.hasMany(Nota_1.Nota, {
    foreignKey: 'alunoId', // No ERD, é 'alunoId' em 'notas'
    as: 'notas'
});
Nota_1.Nota.belongsTo(Aluno_1.Aluno, {
    foreignKey: 'alunoId', // No ERD, é 'alunoId' em 'notas'
    as: 'aluno'
});
// (Uma disciplina pode ter muitas notas)
Disciplina_1.Disciplina.hasMany(Nota_1.Nota, {
    foreignKey: 'disciplinaId', // No ERD, é 'disciplinaId' em 'notas'
    as: 'notasDaDisciplina'
});
Nota_1.Nota.belongsTo(Disciplina_1.Disciplina, {
    foreignKey: 'disciplinaId', // No ERD, é 'disciplinaId' em 'notas'
    as: 'disciplina'
});
console.log("Todas as relações entre os models foram configuradas!");
