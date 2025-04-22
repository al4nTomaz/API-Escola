import { Request, Response } from 'express';
import { AlunoDisciplina } from '../models/AlunoDisciplina';
import { Aluno } from '../models/Aluno';
import { Disciplina } from '../models/Disciplina';
import { error } from 'console';


export const vincularDisciplinasDoAluno = async (req: Request, res: Response) => {
    const { alunoId, disciplinaId } = req.body;

    const aluno = await Aluno.findByPk(alunoId);
    const disciplina = await Disciplina.findByPk(disciplinaId);

    if (!aluno || !disciplina) {
        res.status(404).json({ error: "Aluno ou disciplina não encontrado." });
    }

    await (aluno as any).addDisciplina(disciplina);

    res.json({ message: "aluno vinculado à disciplina com sucesso!" })
}
export const listarDisciplinaDoAluno = async (req: Request, res: Response) => {
    const { alunoId } = req.params;

    const aluno = await Aluno.findByPk(alunoId, {
        include: { model: Disciplina },
    });

    if (aluno) {
        res.json(aluno);
    }

    res.status(404).json({ error: "Aluno não encontrado." });
}

