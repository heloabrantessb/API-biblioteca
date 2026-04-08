'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('emprestimos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        allowNull: false,
      },
      livro_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        allowNull: false,
      },
      data_prevista_devolucao: {
        type: Sequelize.DATE,
        allowNull: false,
      }, 
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('emprestimos');
  }
};
