import { Request, Response } from 'express';
import { Disciplina } from '../models/Disciplina';
import { Op } from 'sequelize';
import { AlunoDisciplina } from '../models/AlunoDisciplina';

export const listarDisciplinas = async (req: Request, res: Response) => {
    const disciplinas = await Disciplina.findAll();
    res.status(200).json(disciplinas);
}

export const cadastrarDisciplina = async (req: Request, res: Response) => {
    const { nome, idProfessor } = req.body;

    if (nome) {
        let disciplinaExiste = await Disciplina.findOne({ where: { nome } });
        if (!disciplinaExiste) {
            let novoDisciplina = await Disciplina.create({ nome, idProfessor });
            res.status(201).json({
                message: "Disciplina cadastrado com sucesso",
                novoDisciplina
            });
        } else{
            res.status(400).json({ error: "Nome da disciplina já existe." });
        }
    }
    res.status(400).json({ error: "Nome da disciplina não enviado." });
}

export const buscarDisciplina = async (req: Request, res: Response) => {

    try {
        const { disciplinaId } = req.params;
        
        const disciplina = await Disciplina.findByPk(disciplinaId);
        if (!disciplina) {
            res.status(404).json({ error: 'Disciplina não encontrado' });    
        }

        res.status(200).json(disciplina);
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}

export const atualizarDisciplina = async (req: Request, res: Response) => {

    try {
        const { disciplinaId } = req.params;
        const dadosAtualizados = req.body;
        
        const disciplina = await Disciplina.findByPk(disciplinaId);
        if (!disciplina) {
            res.status(404).json({ error: 'Disciplina não encontrado' });    
        }
        await disciplina?.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});

        res.status(200).json(disciplina);
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}

export const deletarDisciplina = async (req: Request, res: Response) => {

    try {
        const { disciplinaId } = req.params;
        
        const disciplina = await Disciplina.findByPk(disciplinaId);
        if (!disciplina) {
            res.status(404).json({ error: 'Disciplina não encontrado' });    
        }
        const alunoDisciplina = await AlunoDisciplina.findOne({where: {disciplinaId: disciplinaId}});
        if (!alunoDisciplina) {
            await disciplina?.destroy();
        }

        res.status(400).json({ error: 'Disciplina não pode ser excluido, há alunos cadastrados' });
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}

export const listarDisciplinasDeletados = async (req: Request, res: Response) => {
    const disciplinas = await Disciplina.findAll({
        where: {
          deletedAt:  {
            [Op.not]: null 
          }
        },
        paranoid:false

      });

    res.status(200).json(disciplinas);
}

export const recuperarDisciplina = async (req: Request, res: Response) => {
    try {
        const { disciplinaId } = req.params;
        
        const disciplina = await Disciplina.findByPk(disciplinaId, {
            paranoid: false
        });
        if (!disciplina) {
            res.status(404).json({ error: 'Disciplina não encontrado' });    
        }
        await disciplina?.restore();

        res.status(200).json(disciplina);
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}