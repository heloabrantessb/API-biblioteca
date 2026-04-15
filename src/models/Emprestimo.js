const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Emprestimo = sequelize.define('Emprestimo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data_prevista_devolucao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'emprestimos',
    timestamps: false,
});

module.exports = Emprestimo;