'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('subCategories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            parentId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'category',
                    key: 'id'
                }
            },
            childId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'category',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('subCategories');
    }
};
