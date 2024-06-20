'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = hashPassword('Admin123');

    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      fullname: 'Thomas N',
      email: 'thomas.n@compfest.id',
      phone: '08123456789',
      role: 'admin',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
