'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('services', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('services', 'image', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    // Reverter as mudanças
  }
};