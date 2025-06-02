import { Request, Response } from 'express';
import { Aluno } from '../models/Aluno';
import { Op } from 'sequelize';
import { AlunoDisciplina } from '../models/AlunoDisciplina';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'senha-super-secreta'

export const listarAlunos = async (req: Request, res: Response) => {
  const alunos = await Aluno.findAll();
  res.status(200).json(alunos);
};

export const cadastrarAluno = async (req: Request, res: Response) => {
  const { nome, email, matricula, senha, idTurma } = req.body;

  try {
    const novoAluno = await Aluno.create({ nome, email, matricula, senha, idTurma });
    res.status(201).json({
      message: 'Aluno cadastrado com sucesso',
      novoAluno,
    });
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    res.status(400).json({ error: 'Erro ao cadastrar aluno' });
  }
};

export const buscarAluno = async (req: Request, res: Response) => {
    try {
      const { alunoId } = req.params;
      const resultado = await pegarAluno(alunoId);
      const aluno = resultado?.aluno;
  
      if (!aluno) {
        res.status(404).json({ message: resultado.message }); 
      }
  
      res.status(200).json({ message: resultado.message, aluno }); 
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      res.status(500).json({ error: 'Erro interno do servidor' }); 
    }
  };
  
export const atualizarAluno = async (req: Request, res: Response) => {
  try {
    const { alunoId } = req.params;
    const dadosAtualizados = req.body;

    const resultado = await pegarAluno(alunoId);
    const aluno = resultado?.aluno;

    if (!aluno) {
      res.status(404).json({ message: resultado.message });
    }

    await aluno?.update(dadosAtualizados, {
      fields: Object.keys(dadosAtualizados),
    });

    res.status(200).json({ message: 'Aluno atualizado com sucesso', aluno });
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const deletarAluno = async (req: Request, res: Response) => {
  try {
    const { alunoId } = req.params;

    const resultado = await pegarAluno(alunoId);
    const aluno = resultado?.aluno;

    if (!aluno) {
      res.status(404).json({ message: resultado.message + " ou já deletado" });
    }

    const alunoDisciplina = await AlunoDisciplina.findOne({ where: { alunoId: aluno?.id } });

    if (alunoDisciplina) {
      res.status(400).json({ message: 'Aluno ainda cadastrado em uma disciplina, não pode ser excluído' });
    }

    await aluno?.destroy();
    res.status(200).json({ message: 'Aluno deletado com sucesso', aluno });
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const listarAlunosDeletados = async (req: Request, res: Response) => {
  try {
    const alunos = await Aluno.findAll({
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
      paranoid: false,
    });

    res.status(200).json(alunos);
  } catch (error) {
    console.error('Erro ao listar alunos deletados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const recuperarAluno = async (req: Request, res: Response) => {
  try {
    const { alunoId } = req.params;

    const resultado = await pegarAluno(alunoId);
    const aluno = resultado?.aluno;

    if (!aluno) {
      res.status(404).json({ message: resultado.message });
    }

    await aluno?.restore();
    res.status(200).json({ message: 'Aluno recuperado com sucesso', aluno });
  } catch (error) {
    console.error('Erro ao recuperar aluno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const pegarAluno = async (alunoId: string) => {
  try {
    const aluno = await Aluno.findByPk(alunoId, { paranoid: false });

    if (aluno) {
      return { message: 'Aluno encontrado com sucesso', aluno };
    } else {
      return { message: 'Aluno não encontrado' };
    }
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    return { message: 'Erro ao buscar aluno', error };
  }
};

export const loginAluno = async (req: Request, res: Response): Promise<any> => {
  const { email, matricula } = req.body;

  console.log('📬 Requisição de login recebida');
  console.log('📦 Dados recebidos:', { email, matricula });

  if (!email || !matricula) {
    console.warn('⚠️ Email ou matrícula não informados');
    return res.status(400).json({ error: 'Informe e-mail e matrícula' });
  }

  try {
    console.log('🔎 Buscando aluno no banco de dados...');
    const aluno = await Aluno.findOne({ where: { email, matricula } });

    if (!aluno) {
      console.warn('🚫 Aluno não encontrado ou dados inválidos');
      return res.status(401).json({ error: 'Aluno não encontrado ou dados inválidos' });
    }

    console.log('✅ Aluno encontrado:', aluno.dataValues);

    
    const payload = {
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      matricula: aluno.matricula,
    };

    console.log('⚙️ Gerando token com payload:', payload);
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    console.log('🔑 Token gerado com sucesso');
    return res.json({
      token,
      mensagem: 'Aluno logado com sucesso'
    });
  } catch (error) {
    console.error('🔥 Erro ao realizar login:', error);
    return res.status(500).json({ error: 'Erro ao realizar login' });
  }
};
