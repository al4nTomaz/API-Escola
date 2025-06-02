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
exports.recuperarTurma = exports.listarTurmasDeletadas = exports.deletarTurma = exports.atualizarTurma = exports.buscarTurma = exports.cadastrarTurma = exports.listarTurmas = void 0;
const Turma_1 = require("../models/Turma");
const sequelize_1 = require("sequelize");
const Aluno_1 = require("../models/Aluno");
const listarTurmas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const turmas = yield Turma_1.Turma.findAll();
    res.status(200).json(turmas);
});
exports.listarTurmas = listarTurmas;
const cadastrarTurma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, descricao: periodo, idCurso } = req.body;
    if (nome) {
        let turmaExiste = yield Turma_1.Turma.findOne({ where: { nome } });
        if (turmaExiste) {
            return res.status(400).json({ error: "Nome da turma já existe." });
        }
        let novaTurma = yield Turma_1.Turma.create({ nome, descricao: periodo, idCurso });
        res.status(201).json({
            message: "Turma cadastrada com sucesso",
            novaTurma
        });
    }
    return res.status(400).json({ error: "Nome da turma é obrigatório." });
});
exports.cadastrarTurma = cadastrarTurma;
const buscarTurma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { turmaId } = req.params;
        const turma = yield Turma_1.Turma.findByPk(turmaId);
        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada.' });
        }
        res.status(200).json(turma);
    }
    catch (error) {
        console.error('Erro ao buscar turma:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar turma.' });
    }
});
exports.buscarTurma = buscarTurma;
const atualizarTurma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { turmaId } = req.params;
        const dadosAtualizados = req.body;
        const turma = yield Turma_1.Turma.findByPk(turmaId);
        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada.' });
        }
        yield turma.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });
        res.status(200).json(turma);
    }
    catch (error) {
        console.error('Erro ao atualizar turma:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar turma.' });
    }
});
exports.atualizarTurma = atualizarTurma;
const deletarTurma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { turmaId } = req.params;
        const turma = yield Turma_1.Turma.findByPk(turmaId);
        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada.' });
        }
        const alunoTurma = yield Aluno_1.Aluno.findOne({ where: { turmaId: turmaId } });
        if (alunoTurma) {
            return res.status(400).json({ error: 'Turma não pode ser excluída, há disciplinas associadas a esta turma.' });
        }
        yield turma.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error('Erro ao deletar turma:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar turma.' });
    }
});
exports.deletarTurma = deletarTurma;
const listarTurmasDeletadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const turmas = yield Turma_1.Turma.findAll({
        where: {
            deletedAt: {
                [sequelize_1.Op.not]: null
            }
        },
        paranoid: false
    });
    res.status(200).json(turmas);
});
exports.listarTurmasDeletadas = listarTurmasDeletadas;
const recuperarTurma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { turmaId } = req.params;
        const turma = yield Turma_1.Turma.findByPk(turmaId, {
            paranoid: false
        });
        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada (incluindo deletadas).' });
        }
        yield turma.restore();
        res.status(200).json({ message: 'Turma restaurada com sucesso.', turma });
    }
    catch (error) {
        console.error('Erro ao recuperar turma:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao recuperar turma.' });
    }
});
exports.recuperarTurma = recuperarTurma;
