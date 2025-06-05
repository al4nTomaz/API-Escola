import { Request, Response } from 'express';
import { Aluno } from '../models/Aluno';
import { Turma } from '../models/Turma';

export const vincularTurmaDoAluno = async (req: Request, res: Response): Promise<any> => {
    const { id_aluno, id_turma } = req.params;

    const aluno = await Aluno.findByPk(id_aluno);
    const turma = await Turma.findByPk(id_turma);

    if (!aluno || !turma) {
        return res.status(404).json({ error: "Aluno ou turma não encontrado." });
    }

    await (aluno as any).addTurma(turma);
    return res.json({ message: "Aluno vinculado à turma com sucesso!" });
};

export const listarTurmasDoAluno = async (req: Request, res: Response) : Promise<any> => {
    const { id_aluno } = req.params;

    const aluno = await Aluno.findByPk(id_aluno, {
        include: {
            model: Turma,
            as: 'turmas',
            through: { attributes: [] } // Oculta campos da tabela de junção
        }
    });

    if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado." });
    }

    return res.json(aluno);
};
