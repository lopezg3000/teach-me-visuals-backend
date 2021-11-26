'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('user',
      [
        {
          username: 'lopezg@test.com',
          password: '1234',
          firstName: 'edmond',
          lastName: 'dantes',
          address: '5217 Baker Dr.',
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'lopez@test.com',
          password: '1234',
          firstName: 'edmond',
          lastName: 'dantes',
          address: '5217 Baker Dr.',
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
