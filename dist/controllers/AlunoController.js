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
exports.loginAluno = exports.pegarAluno = exports.recuperarAluno = exports.listarAlunosDeletados = exports.deletarAluno = exports.atualizarAluno = exports.buscarAluno = exports.cadastrarAluno = exports.listarAlunos = void 0;
const Aluno_1 = require("../models/Aluno");
const sequelize_1 = require("sequelize");
const AlunoDisciplina_1 = require("../models/AlunoDisciplina");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'senha-super-secreta';
const listarAlunos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alunos = yield Aluno_1.Aluno.findAll();
    res.status(200).json(alunos);
});
exports.listarAlunos = listarAlunos;
const cadastrarAluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, matricula, senha, idTurma } = req.body;
    try {
        const novoAluno = yield Aluno_1.Aluno.create({ nome, email, matricula, senha, idTurma });
        res.status(201).json({
            message: 'Aluno cadastrado com sucesso',
            novoAluno,
        });
    }
    catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        res.status(400).json({ error: 'Erro ao cadastrar aluno' });
    }
});
exports.cadastrarAluno = cadastrarAluno;
const buscarAluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { alunoId } = req.params;
        const resultado = yield (0, exports.pegarAluno)(alunoId);
        const aluno = resultado === null || resultado === void 0 ? void 0 : resultado.aluno;
        if (!aluno) {
            res.status(404).json({ message: resultado.message });
        }
        res.status(200).json({ message: resultado.message, aluno });
    }
    catch (error) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.buscarAluno = buscarAluno;
const atualizarAluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { alunoId } = req.params;
        const dadosAtualizados = req.body;
        const resultado = yield (0, exports.pegarAluno)(alunoId);
        const aluno = resultado === null || resultado === void 0 ? void 0 : resultado.aluno;
        if (!aluno) {
            res.status(404).json({ message: resultado.message });
        }
        yield (aluno === null || aluno === void 0 ? void 0 : aluno.update(dadosAtualizados, {
            fields: Object.keys(dadosAtualizados),
        }));
        res.status(200).json({ message: 'Aluno atualizado com sucesso', aluno });
    }
    catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.atualizarAluno = atualizarAluno;
const deletarAluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { alunoId } = req.params;
        const resultado = yield (0, exports.pegarAluno)(alunoId);
        const aluno = resultado === null || resultado === void 0 ? void 0 : resultado.aluno;
        if (!aluno) {
            res.status(404).json({ message: resultado.message + " ou já deletado" });
        }
        const alunoDisciplina = yield AlunoDisciplina_1.AlunoDisciplina.findOne({ where: { alunoId: aluno === null || aluno === void 0 ? void 0 : aluno.id } });
        if (alunoDisciplina) {
            res.status(400).json({ message: 'Aluno ainda cadastrado em uma disciplina, não pode ser excluído' });
        }
        yield (aluno === null || aluno === void 0 ? void 0 : aluno.destroy());
        res.status(200).json({ message: 'Aluno deletado com sucesso', aluno });
    }
    catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.deletarAluno = deletarAluno;
const listarAlunosDeletados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alunos = yield Aluno_1.Aluno.findAll({
            where: {
                deletedAt: {
                    [sequelize_1.Op.not]: null,
                },
            },
            paranoid: false,
        });
        res.status(200).json(alunos);
    }
    catch (error) {
        console.error('Erro ao listar alunos deletados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.listarAlunosDeletados = listarAlunosDeletados;
const recuperarAluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { alunoId } = req.params;
        const resultado = yield (0, exports.pegarAluno)(alunoId);
        const aluno = resultado === null || resultado === void 0 ? void 0 : resultado.aluno;
        if (!aluno) {
            res.status(404).json({ message: resultado.message });
        }
        yield (aluno === null || aluno === void 0 ? void 0 : aluno.restore());
        res.status(200).json({ message: 'Aluno recuperado com sucesso', aluno });
    }
    catch (error) {
        console.error('Erro ao recuperar aluno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.recuperarAluno = recuperarAluno;
const pegarAluno = (alunoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aluno = yield Aluno_1.Aluno.findByPk(alunoId, { paranoid: false });
        if (aluno) {
            return { message: 'Aluno encontrado com sucesso', aluno };
        }
        else {
            return { message: 'Aluno não encontrado' };
        }
    }
    catch (error) {
        console.error('Erro ao buscar aluno:', error);
        return { message: 'Erro ao buscar aluno', error };
    }
});
exports.pegarAluno = pegarAluno;
const loginAluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, matricula } = req.body;
    console.log('📬 Requisição de login recebida');
    console.log('📦 Dados recebidos:', { email, matricula });
    if (!email || !matricula) {
        console.warn('⚠️ Email ou matrícula não informados');
        return res.status(400).json({ error: 'Informe e-mail e matrícula' });
    }
    try {
        console.log('🔎 Buscando aluno no banco de dados...');
        const aluno = yield Aluno_1.Aluno.findOne({ where: { email, matricula } });
        if (!aluno) {
            console.warn('🚫 Aluno não encontrado ou dados inválidos');
            return res.status(401).json({ error: 'Aluno não encontrado ou dados inválidos' });
        }
        console.log('✅ Aluno encontrado:', aluno.dataValues);
        const payload = {
            id: aluno.id,
            nome: aluno.nome,
            email: aluno.email,
            matricula: aluno.matricula,
        };
        console.log('⚙️ Gerando token com payload:', payload);
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        console.log('🔑 Token gerado com sucesso');
        return res.json({
            token,
            mensagem: 'Aluno logado com sucesso'
        });
    }
    catch (error) {
        console.error('🔥 Erro ao realizar login:', error);
        return res.status(500).json({ error: 'Erro ao realizar login' });
    }
});
exports.loginAluno = loginAluno;
