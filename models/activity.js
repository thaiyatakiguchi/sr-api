'use strict';

module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('activity', {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        activityTypeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'activityType',
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
        friendId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    });
    return Activity;
};
