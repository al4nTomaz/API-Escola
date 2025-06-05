import request from 'supertest';
import server from '../server'; // certifique-se de que o server exporta o app corretamente

describe("Teste de cadastro de Turma", () => {
    it("Deve cadastrar uma turma na rota /cadastrarTurma", async () => {
        const novaTurma = {
            nome: `Turma Teste ${Date.now()}`,
            periodo: "Noturno",
            idCurso: null // conforme sua lógica, idCurso deve ser null para permitir cadastro
        };

        const response = await request(server)
            .post("/cadastrarTurma")
            .send(novaTurma);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Turma cadastrada com sucesso");
        expect(response.body).toHaveProperty("novaTurma");
        expect(response.body.novaTurma).toHaveProperty("nome", novaTurma.nome);
    });
});

describe("Teste de listagem de turmas", () => {
    it("Deve listar todas as turmas na rota /listarTurmas", async () => {
        const response = await request(server).get("/listarTurmas");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("Teste de atualização de turma", () => {
    it("Deve atualizar uma turma na rota /atualizarTurma/:turmaId", async () => {
        const turmaCriada = await request(server)
            .post("/cadastrarTurma")
            .send({
                nome: `Turma Update ${Date.now()}`,
                periodo: "Tarde",
                idCurso: null
            });

        const dadosAtualizados = {
            nome: `Turma Atualizada ${Date.now()}`,
            periodo: "Integral"
        };

        const response = await request(server)
            .put(`/atualizarTurma/${turmaCriada.body.novaTurma.id}`)
            .send(dadosAtualizados);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("nome", dadosAtualizados.nome);
        expect(response.body).toHaveProperty("periodo", dadosAtualizados.periodo);
    });
});

describe("Teste de deletar turma", () => {
    it("Deve deletar uma turma na rota /deletarTurma/:turmaId", async () => {
        const turmaCriada = await request(server)
            .post("/cadastrarTurma")
            .send({
                nome: `Turma Deletar ${Date.now()}`,
                periodo: "Manhã",
                idCurso: null
            });

        const response = await request(server).delete(`/deletarTurma/${turmaCriada.body.novaTurma.id}`);

        expect(response.status).toBe(204);
    });
});

describe("Teste de listagem de turmas deletadas", () => {
    it("Deve retornar turmas deletadas na rota /listarTurmasDeletadas", async () => {
        const turmaCriada = await request(server)
            .post("/cadastrarTurma")
            .send({
                nome: `Turma Del-List ${Date.now()}`,
                periodo: "Noturno",
                idCurso: null
            });

        await request(server).delete(`/deletarTurma/${turmaCriada.body.novaTurma.id}`);

        const response = await request(server).get("/listarTurmasDeletadas");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some(turma => turma.id === turmaCriada.body.novaTurma.id)).toBe(true);
    });
});

describe("Teste de recuperação de turma", () => {
    it("Deve recuperar uma turma deletada na rota /recuperarTurma/:turmaId", async () => {
        const turmaCriada = await request(server)
            .post("/cadastrarTurma")
            .send({
                nome: `Turma Recuperar ${Date.now()}`,
                periodo: "Integral",
                idCurso: null
            });

        await request(server).delete(`/deletarTurma/${turmaCriada.body.novaTurma.id}`);

        const response = await request(server).put(`/recuperarTurma/${turmaCriada.body.novaTurma.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Turma restaurada com sucesso.");
    });
});
