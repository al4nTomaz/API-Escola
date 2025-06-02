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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginProfessor = exports.pegarProfessor = exports.recuperarProfessor = exports.listarProfessoresDeletados = exports.deletarProfessor = exports.atualizarProfessor = exports.buscarProfessor = exports.cadastrarProfessor = exports.listarProfessores = void 0;
const Professor_1 = require("../models/Professor");
const sequelize_1 = require("sequelize");
const Disciplina_1 = require("../models/Disciplina");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'senha-super-secreta';
const listarProfessores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const professor = yield Professor_1.Professor.findAll();
    res.status(200).json(professor);
});
exports.listarProfessores = listarProfessores;
const cadastrarProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, matricula, senha } = req.body;
    try {
        const novoProfessor = yield Professor_1.Professor.create({ nome, email, matricula, senha });
        res.status(201).json({
            message: 'Professor cadastrado com sucesso',
            novoProfessor,
        });
    }
    catch (error) {
        console.error('Erro ao cadastrar professor:', error);
        res.status(400).json({ error: 'Erro ao cadastrar professor' });
    }
});
exports.cadastrarProfessor = cadastrarProfessor;
const buscarProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorId } = req.params;
        const resultado = yield (0, exports.pegarProfessor)(professorId);
        const professor = resultado === null || resultado === void 0 ? void 0 : resultado.professor;
        if (!professor) {
            res.status(404).json({ message: resultado.message });
        }
        res.status(200).json({ message: resultado.message, professor: professor });
    }
    catch (error) {
        console.error('Erro ao buscar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.buscarProfessor = buscarProfessor;
const atualizarProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorId } = req.params;
        const dadosAtualizados = req.body;
        const resultado = yield (0, exports.pegarProfessor)(professorId);
        const professor = resultado === null || resultado === void 0 ? void 0 : resultado.professor;
        if (!professor) {
            res.status(404).json({ message: resultado.message });
        }
        yield (professor === null || professor === void 0 ? void 0 : professor.update(dadosAtualizados, {
            fields: Object.keys(dadosAtualizados),
        }));
        res.status(200).json({ message: 'Professor atualizado com sucesso', professor: professor });
    }
    catch (error) {
        console.error('Erro ao atualizar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.atualizarProfessor = atualizarProfessor;
const deletarProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorId } = req.params;
        const resultado = yield (0, exports.pegarProfessor)(professorId);
        const professor = resultado === null || resultado === void 0 ? void 0 : resultado.professor;
        if (!professor) {
            res.status(404).json({ message: resultado.message + " ou já deletado" });
        }
        const disciplina = yield Disciplina_1.Disciplina.findOne({ where: { professorId: professor === null || professor === void 0 ? void 0 : professor.id } });
        if (disciplina) {
            res.status(400).json({ message: 'Professor ainda cadastrado em uma disciplina, não pode ser excluído' });
        }
        yield (professor === null || professor === void 0 ? void 0 : professor.destroy());
        res.status(200).json({ message: 'Professor deletado com sucesso', professor: professor });
    }
    catch (error) {
        console.error('Erro ao deletar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.deletarProfessor = deletarProfessor;
const listarProfessoresDeletados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professores = yield Professor_1.Professor.findAll({
            where: {
                deletedAt: {
                    [sequelize_1.Op.not]: null,
                },
            },
            paranoid: false,
        });
        res.status(200).json(professores);
    }
    catch (error) {
        console.error('Erro ao listar professors deletados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.listarProfessoresDeletados = listarProfessoresDeletados;
const recuperarProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { alunoId: professorId } = req.params;
        const resultado = yield (0, exports.pegarProfessor)(professorId);
        const professor = resultado === null || resultado === void 0 ? void 0 : resultado.professor;
        if (!professor) {
            res.status(404).json({ message: resultado.message });
        }
        yield (professor === null || professor === void 0 ? void 0 : professor.restore());
        res.status(200).json({ message: 'Professor recuperado com sucesso', professor: professor });
    }
    catch (error) {
        console.error('Erro ao recuperar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.recuperarProfessor = recuperarProfessor;
const pegarProfessor = (professorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professor = yield Professor_1.Professor.findByPk(professorId, { paranoid: false });
        if (professor) {
            return { message: 'Professor encontrado com sucesso', professor: professor };
        }
        else {
            return { message: 'Professor não encontrado' };
        }
    }
    catch (error) {
        console.error('Erro ao buscar professor:', error);
        return { message: 'Erro ao buscar professor', error };
    }
});
exports.pegarProfessor = pegarProfessor;
const loginProfessor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, matricula } = req.body;
    console.log('📬 Requisição de login recebida');
    console.log('📦 Dados recebidos:', { email, matricula });
    if (!email || !matricula) {
        console.warn('⚠️ Email ou matrícula não informados');
        return res.status(400).json({ error: 'Informe e-mail e matrícula' });
    }
    try {
        console.log('🔎 Buscando professor no banco de dados...');
        const professor = yield Professor_1.Professor.findOne({ where: { email, matricula } });
        if (!professor) {
            console.warn('🚫 Professor não encontrado ou dados inválidos');
            return res.status(401).json({ error: 'Professor não encontrado ou dados inválidos' });
        }
        console.log('✅ Professor encontrado:', professor.dataValues);
        const payload = {
            id: professor.id,
            nome: professor.nome,
            email: professor.email,
            matricula: professor.matricula,
        };
        console.log('⚙️ Gerando token com payload:', payload);
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        console.log('🔑 Token gerado com sucesso');
        return res.json({
            token,
            mensagem: 'Professor logado com sucesso'
        });
    }
    catch (error) {
        console.error('🔥 Erro ao realizar login:', error);
        return res.status(500).json({ error: 'Erro ao realizar login' });
    }
});
exports.loginProfessor = loginProfessor;
