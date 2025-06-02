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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe("Teste de cadastro de Aluno", () => {
    it("Deve cadastrar um aluno na rota /cadastrarAluno", () => __awaiter(void 0, void 0, void 0, function* () {
        const novoAluno = {
            nome: "aluno teste",
            email: "alunoteste@email.com",
            matricula: "6"
        };
        const response = yield (0, supertest_1.default)(server_1.default).post("/cadastrarAluno").send(novoAluno);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Aluno cadastrado com sucesso");
        expect(response.body.novoAluno).toHaveProperty("nome", novoAluno.nome);
        expect(response.body.novoAluno).toHaveProperty("email", novoAluno.email);
        expect(response.body.novoAluno).toHaveProperty("matricula", novoAluno.matricula);
    }));
});
describe("Teste de Listagem de Alunos", () => {
    it("Deve listar todos os alunos na rota /listarTodosAlunos", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get("/listarTodosAlunos");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    }));
});
describe("Teste de atualizar Aluno", () => {
    it("Deve atualizar um aluno na rota /atualizarAluno/:alunoId", () => __awaiter(void 0, void 0, void 0, function* () {
        const alunoId = 6;
        const dadosAtualizados = {
            nome: "aluno teste atualizado",
            email: "atualizado.teste@email.com",
        };
        const response = yield (0, supertest_1.default)(server_1.default).put(`/atualizarAluno/${alunoId}`).send(dadosAtualizados);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aluno atualizado com sucesso");
        expect(response.body.aluno).toHaveProperty("nome", dadosAtualizados.nome);
        expect(response.body.aluno).toHaveProperty("email", dadosAtualizados.email);
    }));
});
describe("Teste de deletar Aluno", () => {
    it("Deve deletar um aluno na rota /deletarAluno/:alunoId", () => __awaiter(void 0, void 0, void 0, function* () {
        const alunoId = 6;
        const response = yield (0, supertest_1.default)(server_1.default).delete(`/deletarAluno/${alunoId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aluno deletado com sucesso");
    }));
});
describe("Teste de recuperar Aluno", () => {
    it("Deve recuperar um aluno na rota /recuperarAluno/:alunoId", () => __awaiter(void 0, void 0, void 0, function* () {
        const alunoId = 6;
        const response = yield (0, supertest_1.default)(server_1.default).put(`/recuperarAluno/${alunoId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aluno recuperado com sucesso");
    }));
});
