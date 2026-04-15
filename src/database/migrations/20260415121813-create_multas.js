'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('multas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      emprestimo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'emprestimos',
          key: 'id'
        },
        allowNull: false,
      },
      valor_total: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      data_devolucao: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }

    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('multas')
  }
};
