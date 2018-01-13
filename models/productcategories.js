'use strict';

module.exports = (sequelize, DataTypes) => {
    const productCategories = sequelize.define('productCategories', {
        productId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER
    });
    return productCategories;
};
