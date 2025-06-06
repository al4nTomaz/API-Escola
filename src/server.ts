import cors from 'cors';
import dotenv from 'dotenv';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import path from 'path';
import { conectarBanco } from './instances/mysql';
import './models/associations';
import apiRoutes from './routes/routes';

dotenv.config();

const app = express();

// Conectar banco de dados
conectarBanco();

// Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Rotas
app.use(apiRoutes);

// Rota 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint não encontrado.' });
});

// Middleware de erro
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
};
app.use(errorHandler);

// Só inicia o servidor se este arquivo for executado diretamente
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

export default app;
