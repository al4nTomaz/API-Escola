"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
class Professor extends sequelize_1.Model {
}
exports.Professor = Professor;
Professor.init({
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
}, {
    sequelize: mysql_1.sequelize,
    tableName: "professores",
    timestamps: true,
    paranoid: true,
});
