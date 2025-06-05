import request from 'supertest';
import server from '../server'; // Certifique-se de que seu app.ts ou server.ts exporta corretamente o app

describe("Teste de cadastro de Aluno", () => {
    it("Deve cadastrar um aluno na rota /cadastrarAluno", async () => {
        const novoAluno = {
            nome: "aluno teste",
            email: `teste${Date.now()}@email.com`, // evita conflito de email único
            senha: "123456",
            matricula: `MAT${Date.now()}`, // evita conflito de matrícula
            id_curso: 2
        };

        const response = await request(server)
            .post("/cadastrarAluno")
            .send(novoAluno);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nome", novoAluno.nome);
        expect(response.body).toHaveProperty("email", novoAluno.email);
    });
});

describe("Teste de listagem de alunos", () => {
    it("Deve listar todos os alunos na rota /listarAlunos", async () => {
        const response = await request(server).get("/listarAlunos");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("Teste de atualização de aluno", () => {
    it("Deve atualizar um aluno na rota /atualizarAluno/:alunoId", async () => {
        // Primeiro criamos um aluno para atualizar
        const novoAluno = {
            nome: "aluno para update",
            email: `update${Date.now()}@email.com`,
            senha: "123456",
            matricula: `MAT-UP-${Date.now()}`,
            id_curso: 1
        };

        const criado = await request(server).post("/cadastrarAluno").send(novoAluno);

        const dadosAtualizados = {
            nome: "aluno atualizado",
            email: `atualizado${Date.now()}@email.com`
        };

        const response = await request(server)
            .put(`/atualizarAluno/${criado.body.id}`)
            .send(dadosAtualizados);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("nome", dadosAtualizados.nome);
        expect(response.body).toHaveProperty("email", dadosAtualizados.email);
    });
});

describe("Teste de deletar aluno", () => {
    it("Deve deletar um aluno na rota /deletarAluno/:alunoId", async () => {
        const alunoCriado = await request(server).post("/cadastrarAluno").send({
            nome: "aluno deletar",
            email: `deletar${Date.now()}@email.com`,
            senha: "123456",
            matricula: `MAT-DEL-${Date.now()}`,
            id_curso: 1
        });

        const response = await request(server).delete(`/deletarAluno/${alunoCriado.body.id}`);

        expect(response.status).toBe(204); // conforme seu controller
    });
});

describe("Teste de recuperação de aluno", () => {
    it("Deve recuperar um aluno deletado na rota /recuperarAluno/:alunoId", async () => {
        const alunoCriado = await request(server).post("/cadastrarAluno").send({
            nome: "aluno recuperar",
            email: `recuperar${Date.now()}@email.com`,
            senha: "123456",
            matricula: `MAT-REC-${Date.now()}`,
            id_curso: 1
        });

        await request(server).delete(`/deletarAluno/${alunoCriado.body.id}`);

        const response = await request(server).put(`/recuperarAluno/${alunoCriado.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aluno restaurado com sucesso.");
    });
});
