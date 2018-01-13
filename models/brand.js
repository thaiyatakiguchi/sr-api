'use strict';

module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('brand', {
        name: DataTypes.STRING
    });
    Brand.associate = (models) => {
        Brand.hasMany(models.product, { foreignKey: 'brandId' });
    };
    return Brand;
};
