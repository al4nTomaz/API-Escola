import { Router } from 'express';

export const router = Router();

import {
    listarAlunos,
    cadastrarAluno,
    buscarAluno,
    atualizarAluno,
    deletarAluno,
    listarAlunosDeletados,
    recuperarAluno
} from '../controllers/AlunoController';


router.get('/listarTodosAlunos', listarAlunos);
router.post('/cadastrarAluno', cadastrarAluno);
router.get('/buscarAluno/:alunoId', buscarAluno);
router.put('/atualizarAluno/:alunoId', atualizarAluno);
router.delete('/deletarAluno/:alunoId', deletarAluno);
router.get('/listarAlunosDeletados', listarAlunosDeletados);
router.put('/recuperarAluno/:alunoId', recuperarAluno);

import * as DisciplinaController from '../controllers/DisciplinaController';

router.get('/listarTodasDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.delete('/deletarDisciplina/:disciplinaId', DisciplinaController.deletarDisciplina);
router.get('/buscarDisciplina/:disciplinaId', DisciplinaController.buscarDisciplina);


import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController';

router.get('/listarDisciplinaDoAluno/:alunoId', AlunoDisciplinaController.listarDisciplinaDoAluno);
router.post('/vincularDisciplinasDoAluno', AlunoDisciplinaController.vincularDisciplinasDoAluno);

export default router;
