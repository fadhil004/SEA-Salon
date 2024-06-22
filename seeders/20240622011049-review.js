'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        name: 'John Doe',
        rating: 5,
        comment: 'Amazing haircut! The stylist really understood what I wanted.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        rating: 4,
        comment: 'Loved the ambiance and the staff were very friendly.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emily Johnson',
        rating: 3,
        comment: 'Decent service, but the waiting time was a bit long.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Michael Brown',
        rating: 3,
        comment: 'The haircut was okay, but not exactly what I asked for.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sarah Davis',
        rating: 4,
        comment: 'Good service, but a bit pricey for the quality received.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
