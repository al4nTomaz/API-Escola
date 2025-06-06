import { Nota } from '../models/Nota';
import { AlunoDisciplina } from '../models/AlunoDisciplina';
import { Aluno } from '../models/Aluno';
import { Disciplina } from '../models/Disciplina';
import { Presenca } from '../models/Presenca';
import { Professor } from '../models/Professor';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Curso } from '../models/Curso';
import app from '../server';
import request from 'supertest';

// Define JWT_SECRET at a higher scope or import it from your config
// For testing, it's common to have a specific test secret or mock it.
// Make sure this matches the secret used in your application's JWT generation.
const JWT_SECRET = process.env.JWT_SECRET || 'senha'; // Ensure this matches your controllers

describe("Teste de listagem de notas de um aluno", () => {
    let alunoTeste: Aluno;
    let disciplina1: Disciplina;
    let disciplina2: Disciplina;
    let curso_id: number;
    let professor_id: number;
    let professor_token: string;

    beforeEach(async () => {
        // --- START CLEANUP ---
        // Delete in order of dependency (most dependent first)
        await Nota.destroy({ where: {}, force: true });
        await Presenca.destroy({ where: {}, force: true });
        await AlunoDisciplina.destroy({ where: {}, force: true }); // Bridge table

        // Now delete the entities that Nota/Presenca/AlunoDisciplina depend on
        await Disciplina.destroy({ where: {}, force: true });
        await Aluno.destroy({ where: {}, force: true });
        await Professor.destroy({ where: {}, force: true });
        await Curso.destroy({ where: {}, force: true });
        // --- END CLEANUP ---

        // Create a Curso
        const curso = await Curso.create({
            nome: `Curso Teste ${Date.now()}`,
            descricao: 'Curso temporário para testes'
        });
        curso_id = curso.id;

        // Create a Professor for the tests
        const professor = await Professor.create({
            nome: "Professor Teste",
            email: `professor${Date.now()}@test.com`,
            senha: await bcrypt.hash("123456", 10),
            matricula: `PROF-TESTE-${Date.now()}`,
            tipo: 'professor'
        });
        professor_id = professor.id;
        professor_token = jwt.sign({ id: professor.id, nome: professor.nome, tipo: professor.tipo }, JWT_SECRET, { expiresIn: '1h' });


        // Criar um aluno para o teste
        alunoTeste = await Aluno.create({
            nome: "Aluno Notas",
            email: `notas${Date.now()}@test.com`,
            senha: await bcrypt.hash("123456", 10),
            matricula: `MAT-NOTAS-${Date.now()}`,
            curso_id: curso_id,
            tipo: 'aluno'
        });

        // Criar disciplinas para o aluno
        disciplina1 = await Disciplina.create({ nome: `Disciplina A ${Date.now()}`, professor_id: professor_id });
        disciplina2 = await Disciplina.create({ nome: `Disciplina B ${Date.now()}`, professor_id: professor_id });

        // Associar o aluno às disciplinas
        await AlunoDisciplina.create({ aluno_id: alunoTeste.id, disciplina_id: disciplina1.id });
        await AlunoDisciplina.create({ aluno_id: alunoTeste.id, disciplina_id: disciplina2.id });

        // Lançar notas para o aluno na disciplina 1
        await Nota.create({ aluno_id: alunoTeste.id, disciplina_id: disciplina1.id, nota: 7.0, dataAvaliacao: new Date() });
        await Nota.create({ aluno_id: alunoTeste.id, disciplina_id: disciplina1.id, nota: 8.0, dataAvaliacao: new Date() });
        await Nota.create({ aluno_id: alunoTeste.id, disciplina_id: disciplina1.id, nota: 6.0, dataAvaliacao: new Date() });

        // Lançar notas para o aluno na disciplina 2
        await Nota.create({ aluno_id: alunoTeste.id, disciplina_id: disciplina2.id, nota: 5.0, dataAvaliacao: new Date() });
        await Nota.create({ aluno_id: alunoTeste.id, disciplina_id: disciplina2.id, nota: 6.0, dataAvaliacao: new Date() });
    });

    it("Deve retornar as notas e média de João da Silva corretamente", async () => {
    // Autenticar como professor Carlos (id = 1, conforme os dados inseridos)
    const professorToken = jwt.sign(
        { id: 1, nome: 'Carlos Professor', tipo: 'efetivo' },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    const response = await request(app)
        .get('/alunos/1/notas') // João da Silva (id = 1)
        .set('Authorization', `Bearer ${professorToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const bancoDeDados = response.body.find((d: any) => d.disciplina === 'Banco de Dados');
    expect(bancoDeDados).toBeDefined();
    expect(bancoDeDados.media).toBeCloseTo(8.5);
});


    it("Deve retornar 404 se o aluno não existir", async () => {
        const nonExistentId = alunoTeste.id + 999; // Um ID que certamente não existe
        const response = await request(app)
            .get(`/alunos/${nonExistentId}/notas`)
            .set('Authorization', `Bearer ${professor_token}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Aluno não encontrado.'); // Sua mensagem de erro no situacaoAluno
    });

    it("Deve retornar um array vazio se o aluno não tiver notas", async () => {
        const alunoSemNotas = await Aluno.create({
            nome: "Aluno Sem Notas",
            email: `semnotas${Date.now()}@test.com`,
            senha: await bcrypt.hash("123456", 10),
            matricula: `MAT-SEM-NOTAS-${Date.now()}`,
            curso_id: curso_id,
            tipo: 'aluno'
        });
        await AlunoDisciplina.create({ aluno_id: alunoSemNotas.id, disciplina_id: disciplina1.id });

        const response = await request(app)
            .get(`/alunos/${alunoSemNotas.id}/notas`)
            .set('Authorization', `Bearer ${professor_token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]); // Deve retornar um array vazio
    });

    it("Não deve permitir que um aluno acesse a rota (403 Forbidden)", async () => {
        const alunoLogado = await Aluno.create({
            nome: "Aluno Logado",
            email: `aluno${Date.now()}@test.com`,
            senha: await bcrypt.hash("123456", 10),
            matricula: `MAT-ALUNO-${Date.now()}`,
            curso_id: curso_id,
            tipo: 'aluno'
        });
        // Important: Ensure the JWT_SECRET here matches the one used in your application (controller)
        const alunoToken = jwt.sign({ id: alunoLogado.id, nome: alunoLogado.nome, tipo: alunoLogado.tipo }, JWT_SECRET, { expiresIn: '1h' });

        const response = await request(app)
            .get(`/alunos/${alunoTeste.id}/notas`)
            .set('Authorization', `Bearer ${alunoToken}`);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('erro', 'Acesso negado: tipo não autorizado');
    });

    it("Deve retornar 401 se nenhum token for fornecido", async () => {
        const response = await request(app).get(`/alunos/${alunoTeste.id}/notas`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('erro', 'Token ausente');
    });

    it("Deve retornar 403 se o token for inválido/expirado", async () => {
        const invalidToken = 'invalid.token.here';
        const response = await request(app)
            .get(`/alunos/${alunoTeste.id}/notas`)
            .set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('erro', 'Token inválido ou expirado');
    });
});