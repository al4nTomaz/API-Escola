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
exports.listarDisciplinaDoAluno = exports.vincularDisciplinasDoAluno = void 0;
const Aluno_1 = require("../models/Aluno");
const Disciplina_1 = require("../models/Disciplina");
const vincularDisciplinasDoAluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alunoId, disciplinaId } = req.body;
    const aluno = yield Aluno_1.Aluno.findByPk(alunoId);
    const disciplina = yield Disciplina_1.Disciplina.findByPk(disciplinaId);
    if (!aluno || !disciplina) {
        res.status(404).json({ error: "Aluno ou disciplina não encontrado." });
    }
    yield aluno.addDisciplina(disciplina);
    res.json({ message: "aluno vinculado à disciplina com sucesso!" });
});
exports.vincularDisciplinasDoAluno = vincularDisciplinasDoAluno;
const listarDisciplinaDoAluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alunoId } = req.params;
    const aluno = yield Aluno_1.Aluno.findByPk(alunoId, {
        include: { model: Disciplina_1.Disciplina },
    });
    if (aluno) {
        res.json(aluno);
    }
    res.status(404).json({ error: "Aluno não encontrado." });
});
exports.listarDisciplinaDoAluno = listarDisciplinaDoAluno;
