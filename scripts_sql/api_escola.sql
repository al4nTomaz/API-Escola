-- DROP das tabelas em ordem de dependência reversa
DROP TABLE IF EXISTS presencas;
DROP TABLE IF EXISTS notas;
DROP TABLE IF EXISTS alunos_disciplina;
DROP TABLE IF EXISTS alunos_turmas;
DROP TABLE IF EXISTS disciplinas;
DROP TABLE IF EXISTS professores;
DROP TABLE IF EXISTS alunos;
DROP TABLE IF EXISTS turmas;
DROP TABLE IF EXISTS cursos;

-- =====================
-- Tabela: cursos
-- =====================
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL
);

-- =====================
-- Tabela: turmas
-- =====================
CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    periodo VARCHAR(50),
    curso_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- =====================
-- Tabela: alunos
-- =====================
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    curso_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- =============================
-- Tabela de junção: alunos_turmas
-- =============================
CREATE TABLE alunos_turmas (
    aluno_id INT NOT NULL,
    turma_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    PRIMARY KEY (aluno_id, turma_id),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

-- =====================
-- Tabela: professores
-- =====================
CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL
);

-- =====================
-- Tabela: disciplinas
-- =====================
CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    professor_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);

-- =============================
-- Tabela de junção: alunos_disciplinas
-- =============================
CREATE TABLE alunos_disciplina (
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    PRIMARY KEY (aluno_id, disciplina_id),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

-- =====================
-- Tabela: notas
-- =====================
CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    nota DECIMAL(5,2) NOT NULL,
    data_avaliacao DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

-- =====================
-- Tabela: presencas
-- =====================
CREATE TABLE presencas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    data DATE NOT NULL,
    presente BOOLEAN NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

-- Inserir em cursos
INSERT INTO cursos (nome, descricao) VALUES 
('Engenharia de Software', 'Curso de graduação em Engenharia de Software'),
('Administração', 'Curso de graduação em Administração');

-- Inserir em turmas
INSERT INTO turmas (nome, periodo, curso_id) VALUES
('Turma A - Manhã', 'Matutino', 1),
('Turma B - Noite', 'Noturno', 2);

-- Inserir em alunos
INSERT INTO alunos (nome, email, senha, matricula, curso_id, tipo) VALUES
('João da Silva', 'joao@example.com', '$2b$10$ItW//VclrVVfJvbcCHi9Setcnlfc45yrPRATjVWT693eqyvddbgJa', '20230001', 1, 'aluno'),
('Maria Oliveira', 'maria@example.com', '$2b$10$ItW//VclrVVfJvbcCHi9Setcnlfc45yrPRATjVWT693eqyvddbgJa', '20230002', 2, 'aluno');


-- Inserir em professores
INSERT INTO professores (nome, email, matricula, senha, tipo) VALUES
('Carlos Professor', 'carlos.prof@example.com', 'PRF001', '$2b$10$ItW//VclrVVfJvbcCHi9Setcnlfc45yrPRATjVWT693eqyvddbgJa', 'professor'),
('Ana Professora', 'ana.prof@example.com', 'PRF002', '$2b$10$ItW//VclrVVfJvbcCHi9Setcnlfc45yrPRATjVWT693eqyvddbgJa', 'professor');


-- Inserir em disciplinas
INSERT INTO disciplinas (nome, professor_id) VALUES
('Banco de Dados', 1),
('Administração Financeira', 2);

-- Inserir em alunos_turmas
INSERT INTO alunos_turmas (aluno_id, turma_id) VALUES
(1, 1),
(2, 2);

-- Inserir em alunos_disciplina
INSERT INTO alunos_disciplina (aluno_id, disciplina_id) VALUES
(1, 1),  -- João em Banco de Dados
(2, 2);  -- Maria em Administração Financeira

-- Inserir em notas
INSERT INTO notas (aluno_id, disciplina_id, nota, data_avaliacao) VALUES
(1, 1, 8.5, '2025-05-20'),
(2, 2, 7.8, '2025-05-21');

-- Inserir em presencas
INSERT INTO presencas (aluno_id, disciplina_id, data, presente) VALUES
(1, 1, '2025-05-01', TRUE),
(2, 2, '2025-05-01', FALSE);
