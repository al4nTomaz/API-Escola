import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
        dialect: 'mysql',
        port: parseInt(process.env.MYSQL_PORT as string),
        host: process.env.MYSQL_HOST as string
    }
);

export const conectarBanco = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado ao banco de dados");
    } catch (error) {
        console.log("Erro ao conectado ao banco de dados", error);
    }
}