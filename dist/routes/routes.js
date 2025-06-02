"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const AlunoController_1 = require("../controllers/AlunoController");
// Rotas para Alunos
exports.router.get('/listarTodosAlunos', AlunoController_1.listarAlunos);
exports.router.post('/cadastrarAluno', AlunoController_1.cadastrarAluno);
exports.router.get('/buscarAluno/:alunoId', AlunoController_1.buscarAluno);
exports.router.put('/atualizarAluno/:alunoId', AlunoController_1.atualizarAluno);
exports.router.delete('/deletarAluno/:alunoId', AlunoController_1.deletarAluno);
exports.router.get('/listarAlunosDeletados', AlunoController_1.listarAlunosDeletados);
exports.router.put('/recuperarAluno/:alunoId', AlunoController_1.recuperarAluno);
exports.router.post('/login', AlunoController_1.loginAluno);
const DisciplinaController_1 = require("../controllers/DisciplinaController");
// Rotas para Disciplinas
exports.router.get('/listarTodasDisciplinas', DisciplinaController_1.listarDisciplinas);
exports.router.post('/cadastrarDisciplina', DisciplinaController_1.cadastrarDisciplina);
exports.router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController_1.atualizarDisciplina);
exports.router.delete('/deletarDisciplina/:disciplinaId', DisciplinaController_1.deletarDisciplina);
exports.router.get('/buscarDisciplina/:disciplinaId', DisciplinaController_1.buscarDisciplina);
const AlunoDisciplinaController_1 = require("../controllers/AlunoDisciplinaController");
// Rotas para Aluno_Disciplina (Associação)
exports.router.get('/listarDisciplinaDoAluno/:alunoId', AlunoDisciplinaController_1.listarDisciplinaDoAluno);
exports.router.post('/vincularDisciplinasDoAluno', AlunoDisciplinaController_1.vincularDisciplinasDoAluno);
// --- Rotas para as tabelas faltantes (agora com imports desestruturados) ---
const CursoController_1 = require("../controllers/CursoController");
// Rotas para Cursos
exports.router.get('/listarCursos', CursoController_1.listarCursos);
exports.router.post('/cadastrarCurso', CursoController_1.cadastrarCurso);
exports.router.get('/buscarCurso/:cursoId', CursoController_1.buscarCurso);
exports.router.put('/atualizarCurso/:cursoId', CursoController_1.atualizarCurso);
exports.router.delete('/deletarCurso/:cursoId', CursoController_1.deletarCurso);
exports.router.get('/listarCursosDeletados', CursoController_1.listarCursosDeletados);
exports.router.put('/recuperarCurso/:cursoId', CursoController_1.recuperarCurso);
const TurmaController_1 = require("../controllers/TurmaController");
// Rotas para Turmas
exports.router.get('/listarTurmas', TurmaController_1.listarTurmas);
exports.router.post('/cadastrarTurma', TurmaController_1.cadastrarTurma);
exports.router.get('/buscarTurma/:turmaId', TurmaController_1.buscarTurma);
exports.router.put('/atualizarTurma/:turmaId', TurmaController_1.atualizarTurma);
exports.router.delete('/deletarTurma/:turmaId', TurmaController_1.deletarTurma);
exports.router.get('/listarTurmasDeletadas', TurmaController_1.listarTurmasDeletadas);
exports.router.put('/recuperarTurma/:turmaId', TurmaController_1.recuperarTurma);
const ProfessorController_1 = require("../controllers/ProfessorController");
// Rotas para Professores
exports.router.get('/listarProfessores', ProfessorController_1.listarProfessores);
exports.router.post('/cadastrarProfessor', ProfessorController_1.cadastrarProfessor);
exports.router.get('/buscarProfessor/:professorId', ProfessorController_1.buscarProfessor);
exports.router.put('/atualizarProfessor/:professorId', ProfessorController_1.atualizarProfessor);
exports.router.delete('/deletarProfessor/:professorId', ProfessorController_1.deletarProfessor);
exports.router.get('/listarProfessoresDeletados', ProfessorController_1.listarProfessoresDeletados);
exports.router.put('/recuperarProfessor/:professorId', ProfessorController_1.recuperarProfessor);
const NotaController_1 = require("../controllers/NotaController");
// Rotas para Notas
exports.router.get('/listarNotas', NotaController_1.listarNotas);
exports.router.post('/cadastrarNota', NotaController_1.cadastrarNota);
exports.router.get('/buscarNota/:notaId', NotaController_1.buscarNota);
exports.router.put('/atualizarNota/:notaId', NotaController_1.atualizarNota);
exports.router.delete('/deletarNota/:notaId', NotaController_1.deletarNota);
exports.router.get('/listarNotasDeletadas', NotaController_1.listarNotasDeletadas);
exports.router.put('/recuperarNota/:notaId', NotaController_1.recuperarNota);
const PresencaController_1 = require("../controllers/PresencaController");
// Rotas para Presencas
exports.router.get('/listarPresencas', PresencaController_1.listarPresencas);
exports.router.post('/cadastrarPresenca', PresencaController_1.cadastrarPresenca);
exports.router.get('/buscarPresenca/:presencaId', PresencaController_1.buscarPresenca);
exports.router.put('/atualizarPresenca/:presencaId', PresencaController_1.atualizarPresenca);
exports.router.delete('/deletarPresenca/:presencaId', PresencaController_1.deletarPresenca);
exports.router.get('/listarPresencasDeletadas', PresencaController_1.listarPresencasDeletadas);
exports.router.put('/recuperarPresenca/:presencaId', PresencaController_1.recuperarPresenca);
const apiController_1 = require("../controllers/apiController");
exports.router.get('/gerar-token', apiController_1.gerarToken);
exports.default = exports.router;
