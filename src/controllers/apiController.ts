import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { Professor } from '../models/Professor';
import { Aluno } from '../models/Aluno';

const JWT_SECRET = process.env.JWT_SECRET || 'senha'

export const login = async (req: Request, res: Response): Promise<any> => {
  const { identificador, senha } = req.body;

  if (!identificador || !senha) {
    return res.status(400).json({ erro: 'Identificador e senha são obrigatórios' });
  }

  try {
    let usuario = await Professor.findOne({ where: { matricula: identificador } });
    let tipo = 'professor';

    if (!usuario) {
      usuario = await Aluno.findOne({ where: { matricula: identificador } });
      tipo = 'aluno';
    }

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida' });
    }

    const payload = { id: usuario.id, nome: usuario.nome, tipo };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, usuario: payload });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno no login' });
  }
};



interface Payload {
  aula: string
  turma: string
  tristeza: string
}

export const gerarToken = async (req: Request, res: Response): Promise<void> => {
  const payload: Payload = {
    aula: 'JWT',
    turma: 'TADS23',
    tristeza: 'restam só mais 3 aulas com essa',
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })

  res.json({ token })
}