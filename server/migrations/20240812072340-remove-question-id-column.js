'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Questions', 'questionId');
      console.log('Column questionId removed successfully.');
    } catch (error) {
      console.error('Error removing column questionId:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Questions', 'questionId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
      console.log('Column questionId added successfully.');
    } catch (error) {
      console.error('Error adding column questionId:', error);
    }
  }
};

