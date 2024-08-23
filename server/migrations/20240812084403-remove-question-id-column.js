'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Questions', 'questionName');
      await queryInterface.removeColumn('Questions', 'questionCategory');
      console.log('Column questionId removed successfully.');
    } catch (error) {
      console.error('Error removing column questionId:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Questions', 'questionName', {
        type: Sequelize.STRING,
        allowNull: false,
      });
      await queryInterface.addColumn('Questions', 'questionCategory', {
        type: Sequelize.STRING,
        allowNull: false,
      });
      console.log('Column questionId added successfully.');
    } catch (error) {
      console.error('Error adding column questionId:', error);
    }
  }
};
