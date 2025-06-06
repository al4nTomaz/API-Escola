import request from 'supertest';
import app from '../server'; 
import { Curso } from '../models/Curso';
import { Turma } from '../models/Turma';
import { Aluno } from '../models/Aluno';

describe('Curso API', () => {
  let curso_id: number;

  beforeAll(async () => {
    await Curso.destroy({ where: {}, force: true });
    await Turma.destroy({ where: {}, force: true });
    await Aluno.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    await Curso.destroy({ where: {}, force: true });
    await Turma.destroy({ where: {}, force: true });
    await Aluno.destroy({ where: {}, force: true });
  });

  it('Deve cadastrar um novo curso', async () => {
    const res = await request(app)
      .post('/cadastrarCurso')
      .send({ nome: 'Engenharia', descricao: 'Curso de Engenharia' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Engenharia');
    curso_id = res.body.id;
  });

  it('Não deve cadastrar curso com nome duplicado', async () => {
    const res = await request(app)
      .post('/cadastrarCurso')
      .send({ nome: 'Engenharia', descricao: 'Outro curso' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Curso já existe');
  });

  it('Deve listar todos os cursos', async () => {
    const res = await request(app).get('/listarCursos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve buscar curso pelo ID', async () => {
    const res = await request(app).get(`/buscarCurso/${curso_id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome', 'Engenharia');
  });

  it('Deve atualizar curso', async () => {
    const res = await request(app)
      .put(`/atualizarCurso/${curso_id}`)
      .send({ descricao: 'Engenharia Atualizada' });

    expect(res.statusCode).toBe(200);
    expect(res.body.descricao).toBe('Engenharia Atualizada');
  });

  it('Não deve deletar curso com turmas ou alunos associadas', async () => {
    // await Turma.create({ nome: 'TADS', periodo: 'NOITE', curso_id });
    await Aluno.create({ nome: "aluno recuperar",
            email: `recuperar${Date.now()}@email.com`,
            senha: "123456",
            matricula: `MAT-REC-${Date.now()}`,
            curso_id: curso_id });

    const res = await request(app).delete(`/deletarCurso/${curso_id}`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      'error',
      'Curso não pode ser excluído, há pendencias neste curso.'
    );
  });

  it('Deve deletar curso sem turmas e alunos associadas', async () => {
    // await Turma.destroy({ where: { curso_id } });
    await Aluno.destroy({ where: { curso_id } });

    const res = await request(app).delete(`/deletarCurso/${curso_id}`);
    expect(res.statusCode).toBe(204);
  });
  
  // it('Não deve deletar curso com alunos associadas', async () => {
  //   await Aluno.create({ nome: "aluno recuperar",
  //           email: `recuperar${Date.now()}@email.com`,
  //           senha: "123456",
  //           matricula: `MAT-REC-${Date.now()}`,
  //           id_curso: 1 });

  //   const res = await request(app).delete(`/deletarCurso/${curso_id}`);
  //   expect(res.statusCode).toBe(400);
  //   expect(res.body).toHaveProperty(
  //     'error',
  //     'Curso não pode ser excluído, há pendencias neste curso.'
  //   );
  // });

  // it('Deve deletar curso sem alunos associadas', async () => {
  //   await Aluno.destroy({ where: { curso_id } });

  //   const res = await request(app).delete(`/deletarCurso/${curso_id}`);
  //   expect(res.statusCode).toBe(204);
  // });
  
});
