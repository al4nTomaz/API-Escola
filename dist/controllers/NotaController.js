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
exports.recuperarNota = exports.listarNotasDeletadas = exports.deletarNota = exports.atualizarNota = exports.buscarNota = exports.cadastrarNota = exports.listarNotas = void 0;
const Nota_1 = require("../models/Nota");
const sequelize_1 = require("sequelize");
const Aluno_1 = require("../models/Aluno");
const listarNotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notas = yield Nota_1.Nota.findAll();
    res.status(200).json(notas);
});
exports.listarNotas = listarNotas;
const cadastrarNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alunoId, disciplinaId, nota, data_avaliacao } = req.body;
    if (!alunoId || !disciplinaId || nota === undefined || !data_avaliacao) {
        return res.status(400).json({ error: "alunoId, disciplinaId, nota e data_avaliacao são obrigatórios." });
    }
    try {
        let novaNota = yield Nota_1.Nota.create({ alunoId, disciplinaId, nota, data_avaliacao });
        res.status(201).json({
            message: "Nota cadastrada com sucesso",
            novaNota
        });
    }
    catch (error) {
        console.error('Erro ao cadastrar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao cadastrar nota.' });
    }
});
exports.cadastrarNota = cadastrarNota;
const buscarNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notaId } = req.params;
        const nota = yield Nota_1.Nota.findByPk(notaId);
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada.' });
        }
        res.status(200).json(nota);
    }
    catch (error) {
        console.error('Erro ao buscar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar nota.' });
    }
});
exports.buscarNota = buscarNota;
const atualizarNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notaId } = req.params;
        const dadosAtualizados = req.body;
        const nota = yield Nota_1.Nota.findByPk(notaId);
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada.' });
        }
        yield nota.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });
        res.status(200).json(nota);
    }
    catch (error) {
        console.error('Erro ao atualizar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar nota.' });
    }
});
exports.atualizarNota = atualizarNota;
const deletarNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notaId } = req.params;
        const nota = yield Nota_1.Nota.findByPk(notaId);
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada.' });
        }
        const alunoNota = yield Aluno_1.Aluno.findOne({ where: { notaId: notaId } });
        if (alunoNota) {
            return res.status(400).json({ error: 'Nota não pode ser excluída, há disciplinas associadas a esta nota.' });
        }
        yield nota.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error('Erro ao deletar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar nota.' });
    }
});
exports.deletarNota = deletarNota;
const listarNotasDeletadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notas = yield Nota_1.Nota.findAll({
        where: {
            deletedAt: {
                [sequelize_1.Op.not]: null
            }
        },
        paranoid: false
    });
    res.status(200).json(notas);
});
exports.listarNotasDeletadas = listarNotasDeletadas;
const recuperarNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notaId } = req.params;
        const nota = yield Nota_1.Nota.findByPk(notaId, {
            paranoid: false
        });
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada (incluindo deletadas).' });
        }
        yield nota.restore();
        res.status(200).json({ message: 'Nota restaurada com sucesso.', nota });
    }
    catch (error) {
        console.error('Erro ao recuperar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao recuperar nota.' });
    }
});
exports.recuperarNota = recuperarNota;
