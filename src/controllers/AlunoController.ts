import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Aluno } from '../models/Aluno';

export const listarAlunos = async (req: Request, res: Response): Promise<any> => {
    const alunos = await Aluno.findAll();
    res.status(200).json(alunos);
}

export const cadastrarAluno = async (req: Request, res: Response): Promise<any> => {
    try {
        const { nome, email, senha, matricula, id_curso} = req.body;

        // let alunoExistente = await Aluno.findOne({ where: { email } });

        // if (alunoExistente) {
        //     return res.status(400).json({ error: 'Aluno já cadastrado' });
        // }

        // alunoExistente = await Aluno.findOne({ where: { matricula } });

        // if (alunoExistente) {
        //     return res.status(400).json({ error: 'Aluno já cadastrado' });
        // }

        const novoAluno = await Aluno.create({ nome, email, senha, matricula, id_curso });

        return res.status(201).json(novoAluno);
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export const buscarAluno = async (req: Request, res: Response): Promise<any> => {
    try {
        const { alunoId } = req.params;

        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        res.status(200).json(aluno);
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar aluno.' });
    }
}

export const atualizarAluno = async (req: Request, res: Response): Promise<any> => {
    try {
        const { alunoId } = req.params;
        const dadosAtualizados = req.body;

        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        await aluno.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });

        res.status(200).json(aluno);
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar aluno.' });
    }
}

export const deletarAluno = async (req: Request, res: Response): Promise<any> => {
    try {
        const { alunoId } = req.params;

        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        // const matricula = await Matricula.findOne({ where: { alunoId } });
        // if (matricula) {
        //     return res.status(400).json({ error: 'Aluno não pode ser excluído, há matrículas ativas.' });
        // }

        await aluno.destroy();

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar aluno.' });
    }
}

export const listarAlunosDeletados = async (req: Request, res: Response): Promise<any> => {
    const alunos = await Aluno.findAll({
        where: {
            deletedAt: {
                [Op.not]: null
            }
        },
        paranoid: false
    });

    res.status(200).json(alunos);
}

export const recuperarAluno = async (req: Request, res: Response): Promise<any> => {
    try {
        const { alunoId } = req.params;

        const aluno = await Aluno.findByPk(alunoId, {
            paranoid: false
        });

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado (incluindo deletados).' });
        }

        await aluno.restore();

        res.status(200).json({ message: 'Aluno restaurado com sucesso.', aluno });
    } catch (error) {
        console.error('Erro ao recuperar aluno:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao recuperar aluno.' });
    }
}

export const loginAluno = async (req: Request, res: Response): Promise<any> => {}
