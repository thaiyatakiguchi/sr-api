'use strict';

module.exports = (sequelize, DataTypes) => {
    const ActivityType = sequelize.define('activityType', {
        name: DataTypes.STRING
    });
    ActivityType.associate = (models) => {
        ActivityType.belongsTo(models.activity, { foreignKey: 'activityTypeId' });
    };
    return ActivityType;
};
