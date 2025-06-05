// tests/curso.test.ts
import request from 'supertest';
import app from '../src/app'; // ajuste conforme seu projeto
import { Curso } from '../src/models/Curso';
import { Disciplina } from '../src/models/Disciplina';

describe('Curso API', () => {
  let cursoId: number;

  beforeAll(async () => {
    await Disciplina.destroy({ where: {}, force: true });
    await Curso.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    await Disciplina.destroy({ where: {}, force: true });
    await Curso.destroy({ where: {}, force: true });
  });

  it('Deve cadastrar um novo curso', async () => {
    const res = await request(app)
      .post('/cursos')
      .send({ nome: 'Engenharia', descricao: 'Curso de Engenharia' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Engenharia');
    cursoId = res.body.id;
  });

  it('Não deve cadastrar curso com nome duplicado', async () => {
    const res = await request(app)
      .post('/cursos')
      .send({ nome: 'Engenharia', descricao: 'Outro curso' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Curso já existe');
  });

  it('Deve listar todos os cursos', async () => {
    const res = await request(app).get('/cursos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve buscar curso pelo ID', async () => {
    const res = await request(app).get(`/cursos/${cursoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome', 'Engenharia');
  });

  it('Deve atualizar curso', async () => {
    const res = await request(app)
      .put(`/cursos/${cursoId}`)
      .send({ descricao: 'Engenharia Atualizada' });

    expect(res.statusCode).toBe(200);
    expect(res.body.descricao).toBe('Engenharia Atualizada');
  });

  it('Não deve deletar curso com disciplinas associadas', async () => {
    // Cria disciplina associada para bloquear exclusão
    await Disciplina.create({ nome: 'Física', id_professor: 1, cursoId });

    const res = await request(app).delete(`/cursos/${cursoId}`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      'error',
      'Curso não pode ser excluído, há disciplinas matriculados neste curso.'
    );
  });

  it('Deve deletar curso sem disciplinas associadas', async () => {
    await Disciplina.destroy({ where: { cursoId } });

    const res = await request(app).delete(`/cursos/${cursoId}`);
    expect(res.statusCode).toBe(204);
  });

  it('Deve listar cursos deletados', async () => {
    const curso = await Curso.create({ nome: 'Curso Teste', descricao: 'Teste' });
    await curso.destroy();

    const res = await request(app).get('/cursos/deletados');
    expect(res.statusCode).toBe(200);
    expect(res.body.some((c: any) => c.id === curso.id)).toBe(true);
  });

  it('Deve recuperar curso deletado', async () => {
    const curso = await Curso.findOne({ where: { nome: 'Curso Teste' }, paranoid: false });
    if (!curso) throw new Error('Curso deletado não encontrado');

    const res = await request(app).post(`/cursos/${curso.id}/recuperar`);
    expect(res.statusCode).toBe(200);
    expect(res.body.curso).toHaveProperty('nome', 'Curso Teste');
  });
});
