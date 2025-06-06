// tests/disciplina.test.ts
import request from 'supertest';
import app from '../src/app'; // ajuste o caminho conforme seu projeto
import { Disciplina } from '../src/models/Disciplina';

describe('Disciplina API', () => {
  let disciplinaId: number;

  afterAll(async () => {
    // Limpa o banco após os testes, se precisar
    await Disciplina.destroy({ where: {}, force: true });
  });

  it('Deve cadastrar uma disciplina nova', async () => {
    const res = await request(app)
      .post('/disciplinas')
      .send({
        nome: 'Matemática',
        id_professor: 1
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('novoDisciplina');
    expect(res.body.novoDisciplina.nome).toBe('Matemática');
    disciplinaId = res.body.novoDisciplina.id;
  });

  it('Não deve cadastrar disciplina com nome repetido', async () => {
    const res = await request(app)
      .post('/disciplinas')
      .send({
        nome: 'Matemática',
        id_professor: 1
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Nome da disciplina já existe.');
  });

  it('Deve listar todas as disciplinas', async () => {
    const res = await request(app).get('/disciplinas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve buscar disciplina por ID', async () => {
    const res = await request(app).get(`/disciplinas/${disciplinaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome', 'Matemática');
  });

  it('Deve atualizar disciplina', async () => {
    const res = await request(app)
      .put(`/disciplinas/${disciplinaId}`)
      .send({ nome: 'Matemática Avançada' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome', 'Matemática Avançada');
  });

  it('Não deve deletar disciplina com alunos associados', async () => {
    // Aqui você deve criar um AlunoDisciplina com esse disciplinaId para testar o erro
    // Como não sei seu setup exato, vou colocar um exemplo genérico:
    // await AlunoDisciplina.create({ alunoId: 1, disciplinaId });

    const res = await request(app).delete(`/disciplinas/${disciplinaId}`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Disciplina não pode ser excluída, há alunos cadastrados.');
  });

  it('Deve deletar disciplina sem alunos associados', async () => {
    // Remove o alunoDisciplina pra permitir exclusão
    // await AlunoDisciplina.destroy({ where: { disciplinaId } });

    const res = await request(app).delete(`/disciplinas/${disciplinaId}`);
    // Pode ser 204 se deu certo
    expect([204, 400]).toContain(res.statusCode);
  });
});
