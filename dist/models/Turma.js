"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const Curso_1 = require("./Curso");
class Turma extends sequelize_1.Model {
}
exports.Turma = Turma;
Turma.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    periodo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    idCurso: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: Curso_1.Curso,
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    sequelize: mysql_1.sequelize,
    tableName: "turmas",
    timestamps: true,
    paranoid: true,
});
