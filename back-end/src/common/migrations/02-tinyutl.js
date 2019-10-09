'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('tinyurl_tinyurl', {
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        auth: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'common_auth',
            key: 'username',
          },
        },
        originalUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
        },
      }, { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
