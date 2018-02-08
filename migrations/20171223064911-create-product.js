'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            asin: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.TEXT
            },
            description: {
                type: Sequelize.TEXT
            },
            imageUrl: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.FLOAT,
                defaultValue: 0.00
            },
            brandId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'brand',
                    key: 'id'
                }
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: 0
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
        return queryInterface.dropTable('product');
    }
};
