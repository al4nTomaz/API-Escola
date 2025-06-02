import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'senha-super-secreta'

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