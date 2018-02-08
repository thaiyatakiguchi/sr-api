'use strict';

module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
        isCheckedout: DataTypes.BOOLEAN,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    });
    Cart.associate = (models) => {
        Cart.belongsTo(models.user, { foreignKey: 'userId' });
        Cart.belongsToMany(models.product, { through: 'cartItems', foreignKey: 'cartId', otherKey: 'productId' });
    };
    return Cart;
};
