'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cartItems', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cartId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'cart',
                    key: 'id'
                }
            },
            productId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'product',
                    key: 'id'
                }
            },
            quantity: {
                type: Sequelize.FLOAT
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
        return queryInterface.dropTable('cartItems');
    }
};
