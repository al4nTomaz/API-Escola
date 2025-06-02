"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disciplina = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
class Disciplina extends sequelize_1.Model {
}
exports.Disciplina = Disciplina;
Disciplina.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    idProfessor: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: mysql_1.sequelize,
    tableName: "disciplinas",
    timestamps: true,
    paranoid: true,
});
