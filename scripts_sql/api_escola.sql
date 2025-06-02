-- Drop das tabelas de junção e dependentes primeiro
DROP TABLE IF EXISTS presencas;
DROP TABLE IF EXISTS notas;
DROP TABLE IF EXISTS aluno_disciplina;
DROP TABLE IF EXISTS alunos_turmas;
DROP TABLE IF EXISTS disciplinas;
DROP TABLE IF EXISTS professores;
DROP TABLE IF EXISTS turmas;
DROP TABLE IF EXISTS alunos;
DROP TABLE IF EXISTS cursos;


-- Tabela: cursos
CREATE TABLE cursos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    descricao TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL
);

-- Tabela: alunos
CREATE TABLE alunos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(45),
    matricula VARCHAR(50),
    id_curso INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (id_curso) REFERENCES cursos(id)
);

-- Tabela: turmas
CREATE TABLE turmas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    periodo VARCHAR(50),
    id_curso INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (id_curso) REFERENCES cursos(id)
);

-- Tabela de junção: alunos_turmas
CREATE TABLE alunos_turmas (
    id_aluno INT,
    id_turma INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id),
    FOREIGN KEY (id_turma) REFERENCES turmas(id),
    PRIMARY KEY (id_aluno, id_turma)
);

-- Tabela: professores
CREATE TABLE professores (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    matricula VARCHAR(50),
    senha VARCHAR(45),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL
);

-- Tabela: disciplinas
CREATE TABLE disciplinas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    id_professor INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (id_professor) REFERENCES professores(id)
);


-- Tabela de junção: aluno_disciplina
CREATE TABLE aluno_disciplina (
    id_aluno INT,
    id_disciplina INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id),
    PRIMARY KEY (id_aluno, id_disciplina)
);

-- Tabela: notas
CREATE TABLE notas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    alunoId INT,
    disciplinaId INT,
    nota DECIMAL(5,2),
    data_avaliacao DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (alunoId) REFERENCES alunos(id),
    FOREIGN KEY (disciplinaId) REFERENCES disciplinas(id)
);

-- Tabela: presencas
CREATE TABLE presencas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    alunoId INT,
    disciplinaId INT,
    data DATE,
    presente TINYINT(1),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (alunoId) REFERENCES alunos(id),
    FOREIGN KEY (disciplinaId) REFERENCES disciplinas(id)
);