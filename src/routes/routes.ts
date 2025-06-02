import { Router } from 'express';

export const router = Router();

import {
    listarAlunos,
    cadastrarAluno,
    buscarAluno,
    atualizarAluno,
    deletarAluno,
    listarAlunosDeletados,
    recuperarAluno,
    loginAluno
} from '../controllers/AlunoController';

// Rotas para Alunos
router.get('/listarTodosAlunos', listarAlunos);
router.post('/cadastrarAluno', cadastrarAluno);
router.get('/buscarAluno/:alunoId', buscarAluno);
router.put('/atualizarAluno/:alunoId', atualizarAluno);
router.delete('/deletarAluno/:alunoId', deletarAluno);
router.get('/listarAlunosDeletados', listarAlunosDeletados);
router.put('/recuperarAluno/:alunoId', recuperarAluno);
router.post('/login', loginAluno);

import {
    listarDisciplinas,
    cadastrarDisciplina,
    atualizarDisciplina,
    deletarDisciplina,
    buscarDisciplina
} from '../controllers/DisciplinaController';

// Rotas para Disciplinas
router.get('/listarTodasDisciplinas', listarDisciplinas);
router.post('/cadastrarDisciplina', cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', atualizarDisciplina);
router.delete('/deletarDisciplina/:disciplinaId', deletarDisciplina);
router.get('/buscarDisciplina/:disciplinaId', buscarDisciplina);


import {
    listarDisciplinaDoAluno,
    vincularDisciplinasDoAluno
} from '../controllers/AlunoDisciplinaController';

// Rotas para Aluno_Disciplina (Associação)
router.get('/listarDisciplinaDoAluno/:alunoId', listarDisciplinaDoAluno);
router.post('/vincularDisciplinasDoAluno', vincularDisciplinasDoAluno);


// --- Rotas para as tabelas faltantes (agora com imports desestruturados) ---

import {
    listarCursos,
    cadastrarCurso,
    buscarCurso,
    atualizarCurso,
    deletarCurso,
    listarCursosDeletados,
    recuperarCurso
} from '../controllers/CursoController';

// Rotas para Cursos
router.get('/listarCursos', listarCursos);
router.post('/cadastrarCurso', cadastrarCurso);
router.get('/buscarCurso/:cursoId', buscarCurso);
router.put('/atualizarCurso/:cursoId', atualizarCurso);
router.delete('/deletarCurso/:cursoId', deletarCurso);
router.get('/listarCursosDeletados', listarCursosDeletados);
router.put('/recuperarCurso/:cursoId', recuperarCurso);


import {
    listarTurmas,
    cadastrarTurma,
    buscarTurma,
    atualizarTurma,
    deletarTurma,
    listarTurmasDeletadas,
    recuperarTurma
} from '../controllers/TurmaController';

// Rotas para Turmas
router.get('/listarTurmas', listarTurmas);
router.post('/cadastrarTurma', cadastrarTurma);
router.get('/buscarTurma/:turmaId', buscarTurma);
router.put('/atualizarTurma/:turmaId', atualizarTurma);
router.delete('/deletarTurma/:turmaId', deletarTurma);
router.get('/listarTurmasDeletadas', listarTurmasDeletadas);
router.put('/recuperarTurma/:turmaId', recuperarTurma);


import {
    listarProfessores,
    cadastrarProfessor,
    buscarProfessor,
    atualizarProfessor,
    deletarProfessor,
    listarProfessoresDeletados,
    recuperarProfessor
} from '../controllers/ProfessorController';

// Rotas para Professores
router.get('/listarProfessores', listarProfessores);
router.post('/cadastrarProfessor', cadastrarProfessor);
router.get('/buscarProfessor/:professorId', buscarProfessor);
router.put('/atualizarProfessor/:professorId', atualizarProfessor);
router.delete('/deletarProfessor/:professorId', deletarProfessor);
router.get('/listarProfessoresDeletados', listarProfessoresDeletados);
router.put('/recuperarProfessor/:professorId', recuperarProfessor);


import {
    listarNotas,
    cadastrarNota,
    buscarNota,
    atualizarNota,
    deletarNota,
    listarNotasDeletadas,
    recuperarNota
} from '../controllers/NotaController';

// Rotas para Notas
router.get('/listarNotas', listarNotas);
router.post('/cadastrarNota', cadastrarNota);
router.get('/buscarNota/:notaId', buscarNota);
router.put('/atualizarNota/:notaId', atualizarNota);
router.delete('/deletarNota/:notaId', deletarNota);
router.get('/listarNotasDeletadas', listarNotasDeletadas);
router.put('/recuperarNota/:notaId', recuperarNota);


import {
    listarPresencas,
    cadastrarPresenca,
    buscarPresenca,
    atualizarPresenca,
    deletarPresenca,
    listarPresencasDeletadas,
    recuperarPresenca
} from '../controllers/PresencaController';

// Rotas para Presencas
router.get('/listarPresencas', listarPresencas);
router.post('/cadastrarPresenca', cadastrarPresenca);
router.get('/buscarPresenca/:presencaId', buscarPresenca);
router.put('/atualizarPresenca/:presencaId', atualizarPresenca);
router.delete('/deletarPresenca/:presencaId', deletarPresenca);
router.get('/listarPresencasDeletadas', listarPresencasDeletadas);
router.put('/recuperarPresenca/:presencaId', recuperarPresenca);


import { gerarToken } from '../controllers/apiController';

router.get('/gerar-token', gerarToken);

export default router;