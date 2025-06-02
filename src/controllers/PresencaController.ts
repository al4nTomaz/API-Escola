import { Request, Response } from 'express';
import { Presenca } from '../models/Presenca';
import { Op } from 'sequelize';
import { Disciplina } from '../models/Disciplina'; 
import { Aluno } from '../models/Aluno';

export const listarPresencas = async (req: Request, res: Response) => {
    const presencas = await Presenca.findAll();
    res.status(200).json(presencas);
}

export const cadastrarPresenca = async (req: Request, res: Response) => {
    const { alunoId, disciplinaId, data, presente } = req.body;

    if (!alunoId || !disciplinaId || !data || presente === undefined) {
        return res.status(400).json({ error: "alunoId, disciplinaId, data e presente são obrigatórios." });
    }

    try {
        let novaPresenca = await Presenca.create({ alunoId, disciplinaId, data, presente });
        res.status(201).json({
            message: "Presença cadastrada com sucesso",
            novaPresenca
        });
    } catch (error) {
        console.error('Erro ao cadastrar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao cadastrar presença.' });
    }
}

export const buscarPresenca = async (req: Request, res: Response) => {
    try {
        const { presencaId } = req.params;

        const presenca = await Presenca.findByPk(presencaId);
        if (!presenca) {
            return res.status(404).json({ error: 'Presença não encontrada.' });
        }

        res.status(200).json(presenca);
    } catch (error) {
        console.error('Erro ao buscar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar presença.' });
    }
}

export const atualizarPresenca = async (req: Request, res: Response) => {
    try {
        const { presencaId } = req.params;
        const dadosAtualizados = req.body;

        const presenca = await Presenca.findByPk(presencaId);
        if (!presenca) {
            return res.status(404).json({ error: 'Presença não encontrada.' });
        }

        await presenca.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });

        res.status(200).json(presenca);
    } catch (error) {
        console.error('Erro ao atualizar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar presença.' });
    }
}

export const deletarPresenca = async (req: Request, res: Response) => {
    try {
        const { presencaId } = req.params;

        const presenca = await Presenca.findByPk(presencaId);
        if (!presenca) {
            return res.status(404).json({ error: 'Presença não encontrada.' });
        }

        await presenca.destroy();

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar presença.' });
    }
}

export const listarPresencasDeletadas = async (req: Request, res: Response) => {
    const presencas = await Presenca.findAll({
        where: {
            deletedAt: {
                [Op.not]: null
            }
        },
        paranoid: false
    });

    res.status(200).json(presencas);
}

export const recuperarPresenca = async (req: Request, res: Response) => {
    try {
        const { presencaId } = req.params;

        const presenca = await Presenca.findByPk(presencaId, {
            paranoid: false
        });

        if (!presenca) {
            return res.status(404).json({ error: 'Presença não encontrada (incluindo deletadas).' });
        }

        await presenca.restore();

        res.status(200).json({ message: 'Presença restaurada com sucesso.', presenca });
    } catch (error) {
        console.error('Erro ao recuperar presença:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao recuperar presença.' });
    }
}