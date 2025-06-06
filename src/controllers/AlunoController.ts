import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Aluno } from '../models/Aluno';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Nota } from '../models/Nota';
import { Disciplina } from '../models/Disciplina';
import { Presenca } from '../models/Presenca';

const JWT_SECRET = process.env.JWT_SECRET || 'senha'

export const listarAlunos = async (req: Request, res: Response): Promise<any> => {
    const alunos = await Aluno.findAll();
    res.status(200).json(alunos);
}

export const cadastrarAluno = async (req: Request, res: Response): Promise<any> => {
    try {
        const { nome, email, senha, matricula, curso_id } = req.body;

        const existingAluno = await Aluno.findOne({
            where: {
                [Op.or]: [{ email: email }, { matricula: matricula }]
            }
        });

        if (existingAluno) {
            return res.status(409).json({ error: 'Já existe um aluno com este e-mail ou matrícula.' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const novoAluno = await Aluno.create({ nome, email, senha: hashedPassword, matricula, curso_id, tipo: "aluno" });

        return res.status(201).json(novoAluno);
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        return res.status(500).json({ error: 'Erro interno do servidor ao cadastrar aluno.' });
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
        const dadosAtualizados = { ...req.body }; // Create a copy to modify

        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        // If password is being updated, hash it
        if (dadosAtualizados.senha) {
            dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha, 10);
        }

        await aluno.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });

        // Optionally, remove the password hash from the response
        const updatedAluno = aluno.toJSON();
        delete updatedAluno.senha;

        res.status(200).json(updatedAluno);
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
            deleted_at: {
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


export const listarNotasComMedia = async (req: Request, res: Response): Promise<any> => {
  const { alunoId } = req.params;

  if (!alunoId) {
    return res.status(400).json({ erro: 'ID do aluno inválido' });
  }

  try {
    const notas = await Nota.findAll({
      where: { aluno_id: alunoId },
      include: [{ model: Disciplina, as: 'disciplinas' }],
    });

    if (!notas.length) {
      return res.status(404).json({ mensagem: 'Nenhuma nota encontrada para este aluno.' });
    }

    const disciplinasMap = new Map<number, { disciplina: string; notas: number[] }>();

    notas.forEach((nota) => {
      const disciplinaId = nota.disciplina_id;
      const nomeDisciplina = nota.disciplina?.nome || 'Desconhecida';

      if (!disciplinasMap.has(disciplinaId)) {
        disciplinasMap.set(disciplinaId, { disciplina: nomeDisciplina, notas: [] });
      }

      disciplinasMap.get(disciplinaId)?.notas.push(Number(nota.nota));
    });

    const resultado = Array.from(disciplinasMap.values()).map((item) => {
      const media = item.notas.reduce((sum, nota) => sum + nota, 0) / item.notas.length;
      return { ...item, media: Number(media.toFixed(2)) };
    });

    return res.json(resultado);
  } catch (error) {
    console.error('Erro ao buscar notas com média:', error);
    return res.status(500).json({ erro: 'Erro ao buscar notas.' });
  }
};



export const percentualPresenca = async (req: Request, res: Response): Promise<any> => {
    const { id: alunoId } = req.params;

    try {
        // Check if aluno exists first (optional, but good for consistent 404)
        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        const presencas = await Presenca.findAll({
            where: { alunoId: Number(alunoId) },
            include: [Disciplina],
        });

        const resultado: { disciplina: string; percentual: string }[] = [];
        const disciplinasMap = new Map<number, { disciplina: string; total: number; presentes: number }>();

        presencas.forEach((presenca) => {
            const disciplinaId = presenca.disciplina_id;
            const nomeDisciplina = presenca.disciplina?.nome || 'Desconhecida';

            if (!disciplinasMap.has(disciplinaId)) {
                disciplinasMap.set(disciplinaId, { disciplina: nomeDisciplina, total: 0, presentes: 0 });
            }

            const data = disciplinasMap.get(disciplinaId)!;
            data.total += 1;
            if (presenca.presente) data.presentes += 1;
        });

        disciplinasMap.forEach((value) => {
            let percentual = '0.0%'; // Default to 0% if no classes
            if (value.total > 0) {
                percentual = ((value.presentes / value.total) * 100).toFixed(1) + '%';
            }
            resultado.push({ disciplina: value.disciplina, percentual });
        });

        return res.json(resultado);
    } catch (error) {
        console.error('Erro ao calcular presença:', error);
        return res.status(500).json({ error: 'Erro interno do servidor ao calcular presença.' });
    }
};

export const situacaoAluno = async (req: Request, res: Response) : Promise<any> => {
  const { id: alunoId } = req.params;

  try {
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) return res.status(404).json({ mensagem: 'Aluno não encontrado.' });

    const notas = await Nota.findAll({
      where: { alunoId: Number(alunoId) },
      include: [Disciplina],
    });

    const presencas = await Presenca.findAll({ where: { alunoId: Number(alunoId) } });

    const resultado: {
      disciplina: string;
      media: number;
      presenca: number;
      status: string;
    }[] = [];

    const mapaNotas = new Map<number, number[]>();
    const mapaPresencas = new Map<number, { total: number; presentes: number }>();

    notas.forEach((nota) => {
      if (!mapaNotas.has(nota.disciplina_id)) mapaNotas.set(nota.disciplina_id, []);
      mapaNotas.get(nota.disciplina_id)!.push(Number(nota.nota));
    });

    presencas.forEach((p) => {
      if (!mapaPresencas.has(p.disciplina_id)) {
        mapaPresencas.set(p.disciplina_id, { total: 0, presentes: 0 });
      }
      const data = mapaPresencas.get(p.disciplina_id)!;
      data.total += 1;
      if (p.presente) data.presentes += 1;
    });

    mapaNotas.forEach((notasArr, disciplinaId) => {
      const media = notasArr.reduce((a, b) => a + b, 0) / notasArr.length;
      const presencaData = mapaPresencas.get(disciplinaId);
      const presenca = presencaData
        ? (presencaData.presentes / presencaData.total) * 100
        : 0;

      const status = media >= 7 && presenca >= 75 ? 'Aprovado' : 'Reprovado';
      const nome = notas.find(n => n.disciplina_id === disciplinaId)?.disciplina?.nome || 'Desconhecida';

      resultado.push({
        disciplina: nome,
        media: Number(media.toFixed(2)),
        presenca: Number(presenca.toFixed(1)),
        status
      });
    });  
    return res.status(200).json(resultado);

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar situação.' });
  }
};

