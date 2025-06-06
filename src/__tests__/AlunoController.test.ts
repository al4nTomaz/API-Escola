import request from 'supertest';
import app from '../server';

describe('Testes dos controladores de alunos', () => {
  let tokenProfessor: string;
  let alunoId:number;

  alunoId = 1;
  beforeAll(async () => {
    // Login para obter token válido para professor
    const loginResponse = await request(app)
      .post('/login')
      .send({ identificador: 'PRF001', senha: 'senha123' });

    tokenProfessor = loginResponse.body.token;

    // Opcional: criar um aluno para os testes que precisam de alunoId
    // const alunoResponse = await request(app)
    //   .post('/alunos')
    //   .set('Authorization', `Bearer ${tokenProfessor}`)
    //   .send({
    //     nome: 'João Silva',
    //     email: 'joao@example.com',
    //     senha: 'senha123',
    //     matricula: '20230001',
    //     curso_id: 1,
    //     tipo: 'aluno',
    //   });

    // alunoId = alunoResponse.body.id;
  });

  it('Deve listar todos os alunos', async () => {
    const response = await request(app)
      .get('/alunos')
      .set('Authorization', `Bearer ${tokenProfessor}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve cadastrar um novo aluno', async () => {
    const response = await request(app)
      .post('/alunos')
      .send({
        nome: 'Carla Oliveira',
        email: 'mariaCarla@example.com',
        senha: 'senha123',
        matricula: '20240002',
        curso_id: 2,
        tipo: 'aluno',
      });

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe('Carla Oliveira');
  });

  it('Deve buscar um aluno pelo ID', async () => {
    const response = await request(app)
      .get(`/alunos/${alunoId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(3);
  });

  it('Deve atualizar os dados de um aluno', async () => {
    const response = await request(app)
      .put(`/alunos/${alunoId}`).send({ nome: 'João Silva Atualizado' });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('João Silva Atualizado');
  });

  it('Deve deletar um aluno', async () => {
    const response = await request(app)
      .delete(`/alunos/${alunoId}`)
      .set('Authorization', `Bearer ${tokenProfessor}`);

    expect(response.status).toBe(204);
  });

  // it('Deve listar alunos deletados', async () => {
  //   const response = await request(app)
  //     .get('/alunos-deletados')
  //     .set('Authorization', `Bearer ${tokenProfessor}`);

  //   expect(response.status).toBe(200);
  //   expect(Array.isArray(response.body)).toBe(true);
  // });

  // it('Deve recuperar um aluno deletado', async () => {
  //   const response = await request(app)
  //     .post(`/alunos/${3}/recuperar`)
  //     .set('Authorization', `Bearer ${tokenProfessor}`);

  //   expect(response.status).toBe(200);
  //   expect(response.body.mensagem).toBe('Aluno recuperado com sucesso.');
  // });

  it('Deve listar notas com média de um aluno', async () => {
    const response = await request(app)
      .get(`/alunos/${alunoId}/notas`)
      .set('Authorization', `Bearer ${tokenProfessor}`);

      console.log(typeof(alunoId));
    expect(response.status).toBe(200);
  });

  it('Deve calcular percentual de presença de um aluno', async () => {
    // First add some attendance records
    await request(app)
      .post('/presencas')
      .set('Authorization', `Bearer ${tokenProfessor}`)
      .send({
        aluno_id: alunoId,
        disciplina_id: 1,
        presente: true,
        data_aula: new Date().toISOString()
      });

    const response = await request(app)
      .get(`/alunos/${alunoId}/presencas`)
      .set('Authorization', `Bearer ${tokenProfessor}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('disciplina');
      expect(response.body[0]).toHaveProperty('percentual');
    }
  });

  it('Deve verificar situação de um aluno', async () => {
    const response = await request(app)
      .get(`/alunos/${alunoId}/situacao`)
      .set('Authorization', `Bearer ${tokenProfessor}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('disciplina');
      expect(response.body[0]).toHaveProperty('status');
    }
  });
});