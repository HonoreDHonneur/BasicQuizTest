'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.addColumn('Questions', 'type', {
        type: Sequelize.STRING,
        allowNull: false,
      });
      await queryInterface.addColumn('Questions', 'difficulty', {
        type: Sequelize.STRING,
        allowNull: false,
      });
      await queryInterface.addColumn('Questions', 'category', {
        type: Sequelize.STRING,
        allowNull: false,
      });
      await queryInterface.addColumn('Questions', 'question', {
        type: Sequelize.STRING,
        allowNull: false,
      });
      await queryInterface.addColumn('Questions','correct_answer', {
        type: Sequelize.STRING,
        allowNull: false,
      });
      await queryInterface.addColumn('Questions','incorrect_answers', {
        type: Sequelize.JSON, // Store the array of incorrect answers as JSON
        allowNull: false,
      });
      console.log('Migration up executed successfully.');
    
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Questions', 'type');
      await queryInterface.removeColumn('Questions', 'difficulty');
      await queryInterface.removeColumn('Questions', 'category');
      await queryInterface.removeColumn('Questions', 'question');
      await queryInterface.removeColumn('Questions', 'correct_answer');
      await queryInterface.removeColumn('Questions', 'incorrect_answers');
      console.log('Migration down executed successfully.');
    } catch (error) {
      console.error('Error executing migration down:', error);
      throw error; // Rethrow to ensure migration stops if there is an error
    }
  }
};
