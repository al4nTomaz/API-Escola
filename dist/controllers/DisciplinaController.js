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
exports.recuperarDisciplina = exports.listarDisciplinasDeletados = exports.deletarDisciplina = exports.atualizarDisciplina = exports.buscarDisciplina = exports.cadastrarDisciplina = exports.listarDisciplinas = void 0;
const Disciplina_1 = require("../models/Disciplina");
const sequelize_1 = require("sequelize");
const AlunoDisciplina_1 = require("../models/AlunoDisciplina");
const listarDisciplinas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const disciplinas = yield Disciplina_1.Disciplina.findAll();
    res.status(200).json(disciplinas);
});
exports.listarDisciplinas = listarDisciplinas;
const cadastrarDisciplina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, idProfessor } = req.body;
    if (nome) {
        let disciplinaExiste = yield Disciplina_1.Disciplina.findOne({ where: { nome } });
        if (!disciplinaExiste) {
            let novoDisciplina = yield Disciplina_1.Disciplina.create({ nome, idProfessor });
            res.status(201).json({
                message: "Disciplina cadastrado com sucesso",
                novoDisciplina
            });
        }
        else {
            res.status(400).json({ error: "Nome da disciplina já existe." });
        }
    }
    res.status(400).json({ error: "Nome da disciplina não enviado." });
});
exports.cadastrarDisciplina = cadastrarDisciplina;
const buscarDisciplina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { disciplinaId } = req.params;
        const disciplina = yield Disciplina_1.Disciplina.findByPk(disciplinaId);
        if (!disciplina) {
            res.status(404).json({ error: 'Disciplina não encontrado' });
        }
        res.status(200).json(disciplina);
    }
    catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
exports.buscarDisciplina = buscarDisciplina;
const atualizarDisciplina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { disciplinaId } = req.params;
        const dadosAtualizados = req.body;
        const disciplina = yield Disciplina_1.Disciplina.findByPk(disciplinaId);
        if (!disciplina) {
            res.status(404).json({ error: 'Disciplina não encontrado' });
        }
        yield (disciplina === null || disciplina === void 0 ? void 0 : disciplina.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) }));
        res.status(200).json(disciplina);
    }
    catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
exports.atualizarDisciplina = atualizarDisciplina;
const deletarDisciplina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { disciplinaId } = req.params;
        const disciplina = yield Disciplina_1.Disciplina.findByPk(disciplinaId);
        if (!disciplina) {
            res.status(404).json({ error: 'Disciplina não encontrado' });
        }
        const alunoDisciplina = yield AlunoDisciplina_1.AlunoDisciplina.findOne({ where: { disciplinaId: disciplinaId } });
        if (!alunoDisciplina) {
            yield (disciplina === null || disciplina === void 0 ? void 0 : disciplina.destroy());
        }
        res.status(400).json({ error: 'Disciplina não pode ser excluido, há alunos cadastrados' });
    }
    catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
exports.deletarDisciplina = deletarDisciplina;
const listarDisciplinasDeletados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const disciplinas = yield Disciplina_1.Disciplina.findAll({
        where: {
            deletedAt: {
                [sequelize_1.Op.not]: null
            }
        },
        paranoid: false
    });
    res.status(200).json(disciplinas);
});
exports.listarDisciplinasDeletados = listarDisciplinasDeletados;
const recuperarDisciplina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { disciplinaId } = req.params;
        const disciplina = yield Disciplina_1.Disciplina.findByPk(disciplinaId, {
            paranoid: false
        });
        if (!disciplina) {
            res.status(404).json({ error: 'Disciplina não encontrado' });
        }
        yield (disciplina === null || disciplina === void 0 ? void 0 : disciplina.restore());
        res.status(200).json(disciplina);
    }
    catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
exports.recuperarDisciplina = recuperarDisciplina;
