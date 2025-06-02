"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recuperarCurso = exports.listarCursosDeletados = exports.deletarCurso = exports.atualizarCurso = exports.buscarCurso = exports.cadastrarCurso = exports.listarCursos = void 0;
const Curso_1 = require("../models/Curso");
const sequelize_1 = require("sequelize");
const Disciplina_1 = require("../models/Disciplina");
const listarCursos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cursos = yield Curso_1.Curso.findAll();
    res.status(200).json(cursos);
});
exports.listarCursos = listarCursos;
const cadastrarCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, descricao } = req.body;
    if (nome) {
        let cursoExiste = yield Curso_1.Curso.findOne({ where: { nome } });
        if (cursoExiste) {
            return res.status(400).json({ error: "Nome do curso já existe." });
        }
        let novoCurso = yield Curso_1.Curso.create({ nome, descricao });
        res.status(201).json({
            message: "Curso cadastrado com sucesso",
            novoCurso
        });
    }
    return res.status(400).json({ error: "Nome do curso é obrigatório." });
});
exports.cadastrarCurso = cadastrarCurso;
const buscarCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cursoId } = req.params;
        const curso = yield Curso_1.Curso.findByPk(cursoId);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }
        res.status(200).json(curso);
    }
    catch (error) {
        console.error('Erro ao buscar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar curso.' });
    }
});
exports.buscarCurso = buscarCurso;
const atualizarCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cursoId } = req.params;
        const dadosAtualizados = req.body;
        const curso = yield Curso_1.Curso.findByPk(cursoId);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }
        yield curso.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });
        res.status(200).json(curso);
    }
    catch (error) {
        console.error('Erro ao atualizar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar curso.' });
    }
});
exports.atualizarCurso = atualizarCurso;
const deletarCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cursoId } = req.params;
        const curso = yield Curso_1.Curso.findByPk(cursoId);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }
        const disciplinaCurso = yield Disciplina_1.Disciplina.findOne({ where: { cursoId: cursoId } });
        if (disciplinaCurso) {
            return res.status(400).json({ error: 'Curso não pode ser excluído, há disciplinas matriculados neste curso.' });
        }
        yield curso.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error('Erro ao deletar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar curso.' });
    }
});
exports.deletarCurso = deletarCurso;
const listarCursosDeletados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cursos = yield Curso_1.Curso.findAll({
        where: {
            deletedAt: {
                [sequelize_1.Op.not]: null
            }
        },
        paranoid: false
    });
    res.status(200).json(cursos);
});
exports.listarCursosDeletados = listarCursosDeletados;
const recuperarCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cursoId } = req.params;
        const curso = yield Curso_1.Curso.findByPk(cursoId, {
            paranoid: false
        });
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado (incluindo deletados).' });
        }
        yield curso.restore();
        res.status(200).json({ message: 'Curso restaurado com sucesso.', curso });
    }
    catch (error) {
        console.error('Erro ao recuperar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao recuperar curso.' });
    }
});
exports.recuperarCurso = recuperarCurso;
