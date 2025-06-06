import { Router } from 'express';
import { authMiddleware, autorizaTipos } from '../middlewares/auth';
import { login, gerarToken } from '../controllers/apiController';

import {
  listarAlunos,
  cadastrarAluno,
  buscarAluno,
  atualizarAluno,
  deletarAluno,
  listarAlunosDeletados,
  recuperarAluno,
  listarNotasComMedia,
  percentualPresenca,
  situacaoAluno
} from '../controllers/AlunoController';

import {
  listarProfessores,
  cadastrarProfessor,
  buscarProfessor,
  atualizarProfessor,
  deletarProfessor,
  listarProfessoresDeletados,
  recuperarProfessor
} from '../controllers/ProfessorController';

import {
  listarCursos,
  cadastrarCurso,
  buscarCurso,
  atualizarCurso,
  deletarCurso,
  listarCursosDeletados,
  recuperarCurso
} from '../controllers/CursoController';

import {
  listarTurmas,
  cadastrarTurma,
  buscarTurma,
  atualizarTurma,
  deletarTurma,
  listarTurmasDeletadas,
  recuperarTurma
} from '../controllers/TurmaController';

import {
  listarDisciplinas,
  cadastrarDisciplina,
  buscarDisciplina,
  atualizarDisciplina,
  deletarDisciplina
} from '../controllers/DisciplinaController';

import {
  listarDisciplinaDoAluno,
  vincularDisciplinasDoAluno
} from '../controllers/AlunoDisciplinaController';

import {
  listarTurmasDoAluno,
  vincularTurmaDoAluno
} from '../controllers/AlunoTurmaController';

import {
  listarNotas,
  cadastrarNota,
  buscarNota,
  atualizarNota,
  deletarNota,
  listarNotasDeletadas,
  recuperarNota
} from '../controllers/NotaController';

import {
  listarPresencas,
  cadastrarPresenca,
  buscarPresenca,
  atualizarPresenca,
  deletarPresenca,
  listarPresencasDeletadas,
  recuperarPresenca
} from '../controllers/PresencaController';

const router = Router();

// LOGIN / TOKEN
router.post('/login', login);
router.get('/gerar-token', gerarToken);

// ALUNOS
router.get('/alunos', authMiddleware, autorizaTipos('professor'), listarAlunos);
router.post('/alunos', cadastrarAluno);
router.get('/alunos/:alunoId', buscarAluno);
router.put('/alunos/:alunoId', atualizarAluno);
router.delete('/alunos/:alunoId', deletarAluno);
router.get('/alunos-deletados', listarAlunosDeletados);
router.post('/alunos/:alunoId/recuperar', recuperarAluno);

router.get('/alunos/:alunoId/notas', authMiddleware, autorizaTipos('professor'), listarNotasComMedia);
router.get('/alunos/:alunoId/presencas', authMiddleware, autorizaTipos('professor'), percentualPresenca);
router.get('/alunos/:alunoId/situacao', authMiddleware, situacaoAluno);

// PROFESSORES
router.get('/professores', listarProfessores);
router.post('/professores', cadastrarProfessor);
router.get('/professores/:professorId', buscarProfessor);
router.put('/professores/:professorId', atualizarProfessor);
router.delete('/professores/:professorId', deletarProfessor);
router.get('/professores-deletados', listarProfessoresDeletados);
router.post('/professores/:professorId/recuperar', recuperarProfessor);

// CURSOS
router.get('/cursos', listarCursos);
router.post('/cursos', cadastrarCurso);
router.get('/cursos/:cursoId', buscarCurso);
router.put('/cursos/:cursoId', atualizarCurso);
router.delete('/cursos/:cursoId', deletarCurso);
router.get('/cursos-deletados', listarCursosDeletados);
router.post('/cursos/:cursoId/recuperar', recuperarCurso);

// TURMAS
router.get('/turmas', listarTurmas);
router.post('/turmas', cadastrarTurma);
router.get('/turmas/:turmaId', buscarTurma);
router.put('/turmas/:turmaId', atualizarTurma);
router.delete('/turmas/:turmaId', deletarTurma);
router.get('/turmas-deletadas', listarTurmasDeletadas);
router.post('/turmas/:turmaId/recuperar', recuperarTurma);

// DISCIPLINAS
router.get('/disciplinas', listarDisciplinas);
router.post('/disciplinas', cadastrarDisciplina);
router.get('/disciplinas/:disciplinaId', buscarDisciplina);
router.put('/disciplinas/:disciplinaId', atualizarDisciplina);
router.delete('/disciplinas/:disciplinaId', deletarDisciplina);

// ALUNO-DISCIPLINA
router.get('/alunos/:alunoId/disciplinas', listarDisciplinaDoAluno);
router.post('/alunos/:alunoId/disciplinas/vincular', vincularDisciplinasDoAluno);

// ALUNO-TURMA
router.get('/alunos/:alunoId/turmas', listarTurmasDoAluno);
router.put('/alunos/:alunoId/turmas/:turmaId', vincularTurmaDoAluno);

// NOTAS
router.get('/notas', listarNotas);
router.post('/notas', cadastrarNota);
router.get('/notas/:notaId', buscarNota);
router.put('/notas/:notaId', atualizarNota);
router.delete('/notas/:notaId', deletarNota);
router.get('/notas-deletadas', listarNotasDeletadas);
router.post('/notas/:notaId/recuperar', recuperarNota);

// PRESENCAS
router.get('/presencas', listarPresencas);
router.post('/presencas', cadastrarPresenca);
router.get('/presencas/:presencaId', buscarPresenca);
router.put('/presencas/:presencaId', atualizarPresenca);
router.delete('/presencas/:presencaId', deletarPresenca);
router.get('/presencas-deletadas', listarPresencasDeletadas);
router.post('/presencas/:presencaId/recuperar', recuperarPresenca);

export default router;
