import { Aluno } from "./Aluno";
import { Disciplina } from './Disciplina';
import { AlunoDisciplina } from './AlunoDisciplina';

Aluno.belongsToMany(Disciplina, { 
    through: AlunoDisciplina,
    foreignKey: 'alunoId',
});

Disciplina.belongsToMany(Aluno, { 
    through: AlunoDisciplina,
    foreignKey: 'disciplinaId',
});

console.log("Relação entre models configuradas!")