"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
class Curso extends sequelize_1.Model {
}
exports.Curso = Curso;
Curso.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: mysql_1.sequelize,
    tableName: "cursos",
    timestamps: true,
    paranoid: true,
});
