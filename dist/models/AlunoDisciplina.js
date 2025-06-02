"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoDisciplina = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const Disciplina_1 = require("./Disciplina");
const Aluno_1 = require("./Aluno");
class AlunoDisciplina extends sequelize_1.Model {
}
exports.AlunoDisciplina = AlunoDisciplina;
AlunoDisciplina.init({
    alunoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aluno_1.Aluno,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    disciplinaId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Disciplina_1.Disciplina,
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    sequelize: mysql_1.sequelize,
    tableName: "aluno_disciplinas",
    timestamps: false,
});
