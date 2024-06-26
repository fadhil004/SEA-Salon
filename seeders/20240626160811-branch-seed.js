'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert branch data
    await queryInterface.bulkInsert('Branches', [
      {
        name: 'SEA SALON Pekanbaru',
        location: 'Pekanbaru',
        openingTime: '2023-01-01 09:00:00',
        closingTime: '2023-01-01 21:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Get branch id for 'SEA SALON Pekanbaru'
    const branchId = await queryInterface.rawSelect('Branches', {
      where: { name: 'SEA SALON Pekanbaru' }
    }, ['id']);

    // Insert branch-service associations for 'SEA SALON Pekanbaru'
    await queryInterface.bulkInsert('BranchServices', [
      {
        branchId: branchId,
        serviceId: 1, // Haircut & Styling
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        branchId: branchId,
        serviceId: 2, // Facial Treatments
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        branchId: branchId,
        serviceId: 3, // Manicure & Pedicure
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete branch-service associations for 'SEA SALON Pekanbaru'
    await queryInterface.bulkDelete('BranchServices', null, {});

    // Delete branch 'SEA SALON Pekanbaru'
    await queryInterface.bulkDelete('Branches', null, {});
  }
};
