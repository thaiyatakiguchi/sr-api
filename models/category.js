'use strict';

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        name: DataTypes.STRING,
        isParent: DataTypes.BOOLEAN
    });
    Category.associate = (models) => {
        Category.belongsToMany(models.category, { as: 'subcategories', through: 'subCategories', foreignKey: 'parentId', otherKey: 'childId' });
        Category.belongsToMany(models.category, { as: 'parentCategory', through: 'subCategories', foreignKey: 'childId', otherKey: 'parentId' });
        Category.belongsToMany(models.product, { through: 'productCategories', foreignKey: 'categoryId', otherKey: 'productId' });
    };
    return Category;
};
