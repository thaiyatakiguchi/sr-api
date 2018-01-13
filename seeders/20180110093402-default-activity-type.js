'use strict';

const moment = require('moment');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('activityType', [{
            name: 'View',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }, {
            name: 'Add To Cart',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }, {
            name: 'Buy',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }, {
            name: 'Social Share',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }, {
            name: 'Ask',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }, {
            name: 'Suggest',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }, {
            name: 'Request',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }, {
            name: 'Add to friend cart',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }, {
            name: 'Buy for friend',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('activityType', null, {});
    }
};
