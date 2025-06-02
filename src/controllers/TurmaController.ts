import { Request, Response } from 'express';
import { Turma } from '../models/Turma'; 
import { Op } from 'sequelize';
import { Disciplina } from '../models/Disciplina'; 
import { Aluno } from '../models/Aluno';

export const listarTurmas = async (req: Request, res: Response) => {
    const turmas = await Turma.findAll();
    res.status(200).json(turmas);
}

export const cadastrarTurma = async (req: Request, res: Response) => {
    const { nome, descricao: periodo, idCurso } = req.body;

    if (nome) {
        let turmaExiste = await Turma.findOne({ where: { nome } });
        if (turmaExiste) {
            return res.status(400).json({ error: "Nome da turma já existe." });
        }

        let novaTurma = await Turma.create({ nome, descricao: periodo, idCurso });
        res.status(201).json({
            message: "Turma cadastrada com sucesso",
            novaTurma
        });
    }
    return res.status(400).json({ error: "Nome da turma é obrigatório." });
}

export const buscarTurma = async (req: Request, res: Response) => {
    try {
        const { turmaId } = req.params;

        const turma = await Turma.findByPk(turmaId);
        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada.' });
        }

        res.status(200).json(turma);
    } catch (error) {
        console.error('Erro ao buscar turma:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar turma.' });
    }
}

export const atualizarTurma = async (req: Request, res: Response) => {
    try {
        const { turmaId } = req.params;
        const dadosAtualizados = req.body;

        const turma = await Turma.findByPk(turmaId);
        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada.' });
        }

        await turma.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });

        res.status(200).json(turma);
    } catch (error) {
        console.error('Erro ao atualizar turma:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar turma.' });
    }
}

export const deletarTurma = async (req: Request, res: Response) => {
    try {
        const { turmaId } = req.params;

        const turma = await Turma.findByPk(turmaId);
        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada.' });
        }

        const alunoTurma = await Aluno.findOne({ where: { turmaId: turmaId } });
        if (alunoTurma) {
            return res.status(400).json({ error: 'Turma não pode ser excluída, há disciplinas associadas a esta turma.' });
        }

        await turma.destroy();

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar turma:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar turma.' });
    }
}

export const listarTurmasDeletadas = async (req: Request, res: Response) => {
    const turmas = await Turma.findAll({
        where: {
            deletedAt: {
                [Op.not]: null
            }
        },
        paranoid: false
    });

    res.status(200).json(turmas);
}

export const recuperarTurma = async (req: Request, res: Response) => {
    try {
        const { turmaId } = req.params;

        const turma = await Turma.findByPk(turmaId, {
            paranoid: false
        });

        if (!turma) {
            return res.status(404).json({ error: 'Turma não encontrada (incluindo deletadas).' });
        }

        await turma.restore();

        res.status(200).json({ message: 'Turma restaurada com sucesso.', turma });
    } catch (error) {
        console.error('Erro ao recuperar turma:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao recuperar turma.' });
    }
}