"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nota = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const Aluno_1 = require("./Aluno");
const Disciplina_1 = require("./Disciplina");
class Nota extends sequelize_1.Model {
}
exports.Nota = Nota;
Nota.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idAluno: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: Aluno_1.Aluno,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    idDisciplina: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: Disciplina_1.Disciplina,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    nota: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dataAvaliacao: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: mysql_1.sequelize,
    tableName: "presencas",
    timestamps: true,
    paranoid: true,
});
