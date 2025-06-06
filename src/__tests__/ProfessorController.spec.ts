import request from 'supertest';
import server from '../server'; // certifique-se de que o app está sendo exportado corretamente

describe("Teste de cadastro de professor", () => {
    it("Deve cadastrar um professor na rota /cadastrarProfessor", async () => {
        const novoProfessor = {
            nome: "Professor Teste",
            email: `professor${Date.now()}@email.com`,
            matricula: `MAT-PROF-${Date.now()}`,
            senha: "senha123"
        };

        const response = await request(server)
            .post("/cadastrarProfessor")
            .send(novoProfessor);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Professor cadastrado com sucesso");
        expect(response.body).toHaveProperty("novoProfessor");
        expect(response.body.novoProfessor).toHaveProperty("email", novoProfessor.email);
    });
});

describe("Teste de listagem de professores", () => {
    it("Deve listar todos os professores na rota /listarProfessores", async () => {
        const response = await request(server).get("/listarProfessores");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("Teste de atualização de professor", () => {
    it("Deve atualizar um professor na rota /atualizarProfessor/:professorId", async () => {
        const novoProfessor = {
            nome: "Professor Update",
            email: `update${Date.now()}@email.com`,
            matricula: `MAT-UP-${Date.now()}`,
            senha: "senha123"
        };

        const criado = await request(server).post("/cadastrarProfessor").send(novoProfessor);

        const atualizacao = {
            nome: "Professor Atualizado",
            email: `atualizado${Date.now()}@email.com`
        };

        const response = await request(server)
            .put(`/atualizarProfessor/${criado.body.novoProfessor.id}`)
            .send(atualizacao);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Professor atualizado com sucesso");
        expect(response.body.professor).toHaveProperty("nome", atualizacao.nome);
    });
});

describe("Teste de deleção de professor", () => {
    it("Deve deletar um professor na rota /deletarProfessor/:professorId", async () => {
        const novoProfessor = {
            nome: "Professor Deletar",
            email: `deletar${Date.now()}@email.com`,
            matricula: `MAT-DEL-${Date.now()}`,
            senha: "senha123"
        };

        const criado = await request(server).post("/cadastrarProfessor").send(novoProfessor);

        const response = await request(server).delete(`/deletarProfessor/${criado.body.novoProfessor.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Professor deletado com sucesso");
    });
});

describe("Teste de listagem de professores deletados", () => {
    it("Deve listar os professores deletados na rota /listarProfessoresDeletados", async () => {
        const novoProfessor = {
            nome: "Professor Deletado Lista",
            email: `del-lista${Date.now()}@email.com`,
            matricula: `MAT-DELL-${Date.now()}`,
            senha: "senha123"
        };

        const criado = await request(server).post("/cadastrarProfessor").send(novoProfessor);
        await request(server).delete(`/deletarProfessor/${criado.body.novoProfessor.id}`);

        const response = await request(server).get("/listarProfessoresDeletados");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some((p: any) => p.id === criado.body.novoProfessor.id)).toBe(true);
    });
});

describe("Teste de recuperação de professor", () => {
    it("Deve recuperar um professor deletado na rota /recuperarProfessor/:alunoId", async () => {
        const novoProfessor = {
            nome: "Professor Recuperar",
            email: `recuperar${Date.now()}@email.com`,
            matricula: `MAT-REC-${Date.now()}`,
            senha: "senha123"
        };

        const criado = await request(server).post("/cadastrarProfessor").send(novoProfessor);
        await request(server).delete(`/deletarProfessor/${criado.body.novoProfessor.id}`);

        const response = await request(server).put(`/recuperarProfessor/${criado.body.novoProfessor.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Professor recuperado com sucesso");
    });
});

describe("Teste de login do professor", () => {
    it("Deve fazer login e retornar um token na rota /loginProfessor", async () => {
        const email = `login${Date.now()}@email.com`;
        const matricula = `MAT-LOGIN-${Date.now()}`;
        const senha = "senha123";

        const professor = {
            nome: "Professor Login",
            email,
            matricula,
            senha
        };

        await request(server).post("/cadastrarProfessor").send(professor);

        const response = await request(server).post("/loginProfessor").send({ email, matricula });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("mensagem", "Professor logado com sucesso");
    });
});
