'use strict';

module.exports = (sequelize, DataTypes) => {
    const cartItems = sequelize.define('cartItems', {
        cartId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'cart',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'product',
                key: 'id'
            }
        },
        quantity: DataTypes.FLOAT
    });
    return cartItems;
};
