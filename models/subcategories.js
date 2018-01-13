'use strict';
module.exports = (sequelize, DataTypes) => {
    const subCategories = sequelize.define('subCategories', {
        parentId: DataTypes.INTEGER,
        childId: DataTypes.INTEGER
    });
    return subCategories;
};
