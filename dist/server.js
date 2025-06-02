"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mysql_1 = require("./instances/mysql");
require("./models/associations");
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
(0, mysql_1.conectarBanco)();
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Definir o formato das requisições
server.use(express_1.default.json()); // Usando JSON
// Definir as rotas da API
server.use('/api', routes_1.default);
// Endpoint para caso o usuário acesse um caminho inexistente
server.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado.' });
});
// Middleware de erro
const errorHandler = (err, req, res, next) => {
    console.error(err); // Exibe o erro no console
    res.status(400).json({ error: 'Ocorreu algum erro.' });
};
server.use(errorHandler);
// Iniciar o servidor e exibir a porta no console
const port = process.env.PORT || 3000; // Defina uma porta padrão se não estiver no .env
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
exports.default = server;
