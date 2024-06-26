'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Services', [
      {
        nameService: 'Haircut & Styling',
        price: 50000,
        duration: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameService: 'Facial Treatments',
        price: 125000,
        duration: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameService: 'Manicure & Pedicure',
        price: 250000,
        duration: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Services', null, {});
  }
};
