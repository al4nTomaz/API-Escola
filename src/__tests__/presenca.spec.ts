import request from 'supertest';
import server from '../server'; // Certifique-se de exportar corretamente o app Express

describe("Teste de cadastro de presença", () => {
    it("Deve cadastrar uma presença na rota /cadastrarPresenca", async () => {
        // Você precisa de um aluno e uma disciplina válidos no banco.
        const alunoId = 1;
        const disciplinaId = 1;

        const novaPresenca = {
            alunoId,
            disciplinaId,
            data: new Date().toISOString().split('T')[0],
            presente: true
        };

        const response = await request(server)
            .post("/cadastrarPresenca")
            .send(novaPresenca);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Presença cadastrada com sucesso");
        expect(response.body.novaPresenca).toHaveProperty("alunoId", alunoId);
    });
});

describe("Teste de listagem de presenças", () => {
    it("Deve listar todas as presenças na rota /listarPresencas", async () => {
        const response = await request(server).get("/listarPresencas");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("Teste de atualização de presença", () => {
    it("Deve atualizar uma presença na rota /atualizarPresenca/:presencaId", async () => {
        const alunoId = 1;
        const disciplinaId = 1;

        const criada = await request(server).post("/cadastrarPresenca").send({
            alunoId,
            disciplinaId,
            data: new Date().toISOString().split('T')[0],
            presente: true
        });

        const atualizacao = {
            presente: false
        };

        const response = await request(server)
            .put(`/atualizarPresenca/${criada.body.novaPresenca.id}`)
            .send(atualizacao);

        expect(response.status).toBe(200);
        expect(response.body.presente).toBe(false);
    });
});

describe("Teste de deletar presença", () => {
    it("Deve deletar uma presença na rota /deletarPresenca/:presencaId", async () => {
        const alunoId = 1;
        const disciplinaId = 1;

        const criada = await request(server).post("/cadastrarPresenca").send({
            alunoId,
            disciplinaId,
            data: new Date().toISOString().split('T')[0],
            presente: true
        });

        const response = await request(server).delete(`/deletarPresenca/${criada.body.novaPresenca.id}`);

        expect(response.status).toBe(204);
    });
});

describe("Teste de listagem de presenças deletadas", () => {
    it("Deve listar presenças deletadas na rota /listarPresencasDeletadas", async () => {
        const alunoId = 1;
        const disciplinaId = 1;

        const criada = await request(server).post("/cadastrarPresenca").send({
            alunoId,
            disciplinaId,
            data: new Date().toISOString().split('T')[0],
            presente: true
        });

        await request(server).delete(`/deletarPresenca/${criada.body.novaPresenca.id}`);

        const response = await request(server).get("/listarPresencasDeletadas");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some((p: any) => p.id === criada.body.novaPresenca.id)).toBe(true);
    });
});

describe("Teste de recuperação de presença", () => {
    it("Deve recuperar uma presença deletada na rota /recuperarPresenca/:presencaId", async () => {
        const alunoId = 1;
        const disciplinaId = 1;

        const criada = await request(server).post("/cadastrarPresenca").send({
            alunoId,
            disciplinaId,
            data: new Date().toISOString().split('T')[0],
            presente: true
        });

        await request(server).delete(`/deletarPresenca/${criada.body.novaPresenca.id}`);

        const response = await request(server).put(`/recuperarPresenca/${criada.body.novaPresenca.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Presença restaurada com sucesso.");
    });
});
