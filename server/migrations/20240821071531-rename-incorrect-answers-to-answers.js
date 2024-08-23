"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "Questions",
      "incorrect_answers",
      "answers"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "Questions",
      "answers",
      "incorrect_answers"
    );
  },
};
