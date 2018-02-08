'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        asin: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        imageUrl: DataTypes.STRING,
        price: DataTypes.FLOAT,
        brandId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'brand',
                key: 'id'
            }
        },
        isDeleted: DataTypes.BOOLEAN
    });
    Product.associate = (models) => {
        Product.belongsTo(models.brand, { foreignKey: 'brandId' });
        Product.belongsTo(models.activity, { foreignKey: 'productId' });
        Product.belongsToMany(models.cart, { through: 'cartItems', foreignKey: 'productId', otherKey: 'cartId' });
        Product.belongsToMany(models.category, { through: 'productCategories', foreignKey: 'productId', otherKey: 'categoryId' });
    };
    return Product;
};
