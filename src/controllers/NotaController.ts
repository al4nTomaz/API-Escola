import { Request, Response } from 'express';
import { Nota } from '../models/Nota';
import { Op } from 'sequelize';
import { Disciplina } from '../models/Disciplina'; 
import { Aluno } from '../models/Aluno';

export const listarNotas = async (req: Request, res: Response) => {
    const notas = await Nota.findAll();
    res.status(200).json(notas);
}

export const cadastrarNota = async (req: Request, res: Response) => {
    const { alunoId, disciplinaId, nota, data_avaliacao } = req.body;

    if (!alunoId || !disciplinaId || nota === undefined || !data_avaliacao) {
        return res.status(400).json({ error: "alunoId, disciplinaId, nota e data_avaliacao são obrigatórios." });
    }

    try {
        let novaNota = await Nota.create({ alunoId, disciplinaId, nota, data_avaliacao });
        res.status(201).json({
            message: "Nota cadastrada com sucesso",
            novaNota
        });
    } catch (error) {
        console.error('Erro ao cadastrar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao cadastrar nota.' });
    }
}

export const buscarNota = async (req: Request, res: Response) => {
    try {
        const { notaId } = req.params;

        const nota = await Nota.findByPk(notaId);
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada.' });
        }

        res.status(200).json(nota);
    } catch (error) {
        console.error('Erro ao buscar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar nota.' });
    }
}

export const atualizarNota = async (req: Request, res: Response) => {
    try {
        const { notaId } = req.params;
        const dadosAtualizados = req.body;

        const nota = await Nota.findByPk(notaId);
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada.' });
        }

        await nota.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });

        res.status(200).json(nota);
    } catch (error) {
        console.error('Erro ao atualizar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar nota.' });
    }
}

export const deletarNota = async (req: Request, res: Response) => {
    try {
        const { notaId } = req.params;

        const nota = await Nota.findByPk(notaId);
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada.' });
        }

        const alunoNota = await Aluno.findOne({ where: { notaId: notaId } });
        if (alunoNota) {
            return res.status(400).json({ error: 'Nota não pode ser excluída, há disciplinas associadas a esta nota.' });
        }

        await nota.destroy();

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar nota.' });
    }
}

export const listarNotasDeletadas = async (req: Request, res: Response) => {
    const notas = await Nota.findAll({
        where: {
            deletedAt: {
                [Op.not]: null
            }
        },
        paranoid: false
    });

    res.status(200).json(notas);
}

export const recuperarNota = async (req: Request, res: Response) => {
    try {
        const { notaId } = req.params;

        const nota = await Nota.findByPk(notaId, {
            paranoid: false
        });

        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada (incluindo deletadas).' });
        }

        await nota.restore();

        res.status(200).json({ message: 'Nota restaurada com sucesso.', nota });
    } catch (error) {
        console.error('Erro ao recuperar nota:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao recuperar nota.' });
    }
}