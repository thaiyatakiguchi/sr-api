'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        fbId: DataTypes.STRING,
        fbToken: DataTypes.TEXT,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        gender: DataTypes.ENUM('male', 'female', 'other'),
        ageRange: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
        isDeleted: DataTypes.BOOLEAN,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    });
    User.associate = (models) => {
        User.belongsTo(models.activity, { foreignKey: 'userId' });
        User.belongsTo(models.activity, { foreignKey: 'friendId' });
    };
    return User;
};
