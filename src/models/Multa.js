
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Multa = sequelize.define('Multa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emprestimo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'emprestimos',
            key: 'id'
        }
    },
    valor_total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    data_devolucao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'multas',
    timestamps: false

})

module.exports = Multa;