import { Request, Response } from 'express';
import { Curso } from '../models/Curso';
import { Op } from 'sequelize';
import { Disciplina } from '../models/Disciplina';

export const listarCursos = async (req: Request, res: Response) => {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
}

export const cadastrarCurso = async (req: Request, res: Response) => {
    const { nome, descricao } = req.body;

    if (nome) {
        let cursoExiste = await Curso.findOne({ where: { nome } });
        if (cursoExiste) {
            return res.status(400).json({ error: "Nome do curso já existe." });
        }

        let novoCurso = await Curso.create({ nome, descricao });
        res.status(201).json({
            message: "Curso cadastrado com sucesso",
            novoCurso
        });
    }
    return res.status(400).json({ error: "Nome do curso é obrigatório." });
}

export const buscarCurso = async (req: Request, res: Response) => {
    try {
        const { cursoId } = req.params;

        const curso = await Curso.findByPk(cursoId);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }

        res.status(200).json(curso);
    } catch (error) {
        console.error('Erro ao buscar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar curso.' });
    }
}

export const atualizarCurso = async (req: Request, res: Response) => {
    try {
        const { cursoId } = req.params;
        const dadosAtualizados = req.body;

        const curso = await Curso.findByPk(cursoId);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }

        await curso.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });

        res.status(200).json(curso);
    } catch (error) {
        console.error('Erro ao atualizar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar curso.' });
    }
}

export const deletarCurso = async (req: Request, res: Response) => {
    try {
        const { cursoId } = req.params;

        const curso = await Curso.findByPk(cursoId);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }

        const disciplinaCurso = await Disciplina.findOne({ where: { cursoId: cursoId } });
        if (disciplinaCurso) {
            return res.status(400).json({ error: 'Curso não pode ser excluído, há disciplinas matriculados neste curso.' });
        }

        await curso.destroy();

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar curso.' });
    }
}

export const listarCursosDeletados = async (req: Request, res: Response) => {
    const cursos = await Curso.findAll({
        where: {
            deletedAt: {
                [Op.not]: null
            }
        },
        paranoid: false
    });

    res.status(200).json(cursos);
}

export const recuperarCurso = async (req: Request, res: Response) => {
    try {
        const { cursoId } = req.params;

        const curso = await Curso.findByPk(cursoId, {
            paranoid: false
        });

        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado (incluindo deletados).' });
        }

        await curso.restore();

        res.status(200).json({ message: 'Curso restaurado com sucesso.', curso });
    } catch (error) {
        console.error('Erro ao recuperar curso:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao recuperar curso.' });
    }
}