"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const Turma_1 = require("./Turma");
class Aluno extends sequelize_1.Model {
}
exports.Aluno = Aluno;
Aluno.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    matricula: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    idTurma: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: Turma_1.Turma,
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    sequelize: mysql_1.sequelize,
    tableName: "alunos",
    timestamps: true,
    paranoid: true,
});
