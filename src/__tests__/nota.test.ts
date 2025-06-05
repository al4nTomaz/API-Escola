import request from "supertest";
import server from "../server"; // seu app Express exportado

describe("Teste de cadastro de nota", () => {
  it("Deve cadastrar uma nota na rota /cadastrarNota", async () => {
    const alunoId = 1;
    const disciplinaId = 1;

    const novaNota = {
      alunoId,
      disciplinaId,
      nota: 9.5,
      data_avaliacao: new Date().toISOString().split("T")[0],
    };

    const response = await request(server)
      .post("/cadastrarNota")
      .send(novaNota);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Nota cadastrada com sucesso");
    expect(response.body.novaNota).toHaveProperty("nota", 9.5);
  });
});

describe("Teste de listagem de notas", () => {
  it("Deve listar todas as notas na rota /listarNotas", async () => {
    const response = await request(server).get("/listarNotas");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("Teste de atualização de nota", () => {
  it("Deve atualizar uma nota na rota /atualizarNota/:notaId", async () => {
    const alunoId = 1;
    const disciplinaId = 1;

    const criada = await request(server).post("/cadastrarNota").send({
      alunoId,
      disciplinaId,
      nota: 7,
      data_avaliacao: new Date().toISOString().split("T")[0],
    });

    const atualizacao = {
      nota: 8.5,
    };

    const response = await request(server)
      .put(`/atualizarNota/${criada.body.novaNota.id}`)
      .send(atualizacao);

    expect(response.status).toBe(200);
    expect(response.body.nota).toBe(8.5);
  });
});

describe("Teste de deletar nota", () => {
  it("Deve deletar uma nota na rota /deletarNota/:notaId", async () => {
    const alunoId = 1;
    const disciplinaId = 1;

    const criada = await request(server).post("/cadastrarNota").send({
      alunoId,
      disciplinaId,
      nota: 6,
      data_avaliacao: new Date().toISOString().split("T")[0],
    });

    const response = await request(server).delete(`/deletarNota/${criada.body.novaNota.id}`);

    expect(response.status).toBe(204);
  });
});

describe("Teste de listagem de notas deletadas", () => {
  it("Deve listar notas deletadas na rota /listarNotasDeletadas", async () => {
    const alunoId = 1;
    const disciplinaId = 1;

    const criada = await request(server).post("/cadastrarNota").send({
      alunoId,
      disciplinaId,
      nota: 4,
      data_avaliacao: new Date().toISOString().split("T")[0],
    });

    await request(server).delete(`/deletarNota/${criada.body.novaNota.id}`);

    const response = await request(server).get("/listarNotasDeletadas");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.some((n: any) => n.id === criada.body.novaNota.id)).toBe(true);
  });
});

describe("Teste de recuperação de nota", () => {
  it("Deve recuperar uma nota deletada na rota /recuperarNota/:notaId", async () => {
    const alunoId = 1;
    const disciplinaId = 1;

    const criada = await request(server).post("/cadastrarNota").send({
      alunoId,
      disciplinaId,
      nota: 5,
      data_avaliacao: new Date().toISOString().split("T")[0],
    });

    await request(server).delete(`/deletarNota/${criada.body.novaNota.id}`);

    const response = await request(server).put(`/recuperarNota/${criada.body.novaNota.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Nota restaurada com sucesso.");
  });
});
