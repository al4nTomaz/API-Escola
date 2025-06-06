import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        nome: string;
        tipo: string;
        [key: string]: any;
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "senha";

// Middleware de autenticação JWT
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<any> =>{
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ erro: 'Token ausente' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!payload.id || !payload.nome || !payload.tipo) {
      return res.status(403).json({ erro: 'Token inválido: dados incompletos' });
    }

    req.usuario = {
      id: payload.id,
      nome: payload.nome,
      tipo: payload.tipo,
      ...payload // caso queira manter outros dados
    };

    next();
  } catch (err) {
    return res.status(403).json({ erro: 'Token inválido ou expirado' });
  }
}

// Middleware de autorização por tipo de usuário

// export const autorizaTipos = (...tiposPermitidos: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user || !tiposPermitidos.includes(req.user.tipo)) {
//       return res.status(403).json({ erro: 'Acesso negado: tipo não autorizado' });
//     }
//     next();
//   };
// };


export const autorizaTipos = (...tiposPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const usuario = (req as any).usuario; // use 'usuario' se for isso que você usa no JWT

    if (!usuario || !tiposPermitidos.includes(usuario.tipo)) {
      res.status(403).json({ erro: 'Acesso negado: tipo não autorizado' });
      return;
    }

    next();
  };
};
