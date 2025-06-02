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
exports.recuperarPresenca = exports.listarPresencasDeletadas = exports.deletarPresenca = exports.atualizarPresenca = exports.buscarPresenca = exports.cadastrarPresenca = exports.listarPresencas = void 0;
const Presenca_1 = require("../models/Presenca");
const sequelize_1 = require("sequelize");
const listarPresencas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const presencas = yield Presenca_1.Presenca.findAll();
    res.status(200).json(presencas);
});
exports.listarPresencas = listarPresencas;
const cadastrarPresenca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alunoId, disciplinaId, data, presente } = req.body;
    if (!alunoId || !disciplinaId || !data || presente === undefined) {
        return res.status(400).json({ error: "alunoId, disciplinaId, data e presente são obrigatórios." });
    }
    try {
        let novaPresenca = yield Presenca_1.Presenca.create({ alunoId, disciplinaId, data, presente });
        res.status(201).json({
            message: "Presença cadastrada com sucesso",
            novaPresenca
        });
    }
    catch (error) {
        console.error('Erro ao cadastrar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao cadastrar presença.' });
    }
});
exports.cadastrarPresenca = cadastrarPresenca;
const buscarPresenca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { presencaId } = req.params;
        const presenca = yield Presenca_1.Presenca.findByPk(presencaId);
        if (!presenca) {
            return res.status(404).json({ error: 'Presença não encontrada.' });
        }
        res.status(200).json(presenca);
    }
    catch (error) {
        console.error('Erro ao buscar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar presença.' });
    }
});
exports.buscarPresenca = buscarPresenca;
const atualizarPresenca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { presencaId } = req.params;
        const dadosAtualizados = req.body;
        const presenca = yield Presenca_1.Presenca.findByPk(presencaId);
        if (!presenca) {
            return res.status(404).json({ error: 'Presença não encontrada.' });
        }
        yield presenca.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });
        res.status(200).json(presenca);
    }
    catch (error) {
        console.error('Erro ao atualizar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar presença.' });
    }
});
exports.atualizarPresenca = atualizarPresenca;
const deletarPresenca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { presencaId } = req.params;
        const presenca = yield Presenca_1.Presenca.findByPk(presencaId);
        if (!presenca) {
            return res.status(404).json({ error: 'Presença não encontrada.' });
        }
        yield presenca.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error('Erro ao deletar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar presença.' });
    }
});
exports.deletarPresenca = deletarPresenca;
const listarPresencasDeletadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const presencas = yield Presenca_1.Presenca.findAll({
        where: {
            deletedAt: {
                [sequelize_1.Op.not]: null
            }
        },
        paranoid: false
    });
    res.status(200).json(presencas);
});
exports.listarPresencasDeletadas = listarPresencasDeletadas;
const recuperarPresenca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { presencaId } = req.params;
        const presenca = yield Presenca_1.Presenca.findByPk(presencaId, {
            paranoid: false
        });
        if (!presenca) {
            return res.status(404).json({ error: 'Presença não encontrada (incluindo deletadas).' });
        }
        yield presenca.restore();
        res.status(200).json({ message: 'Presença restaurada com sucesso.', presenca });
    }
    catch (error) {
        console.error('Erro ao recuperar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao recuperar presença.' });
    }
});
exports.recuperarPresenca = recuperarPresenca;
