'use strict';

const moment = require('moment');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('activityType', [{
            name: 'View',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }, {
            name: 'Add To Cart',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }, {
            name: 'Buy',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }, {
            name: 'Social Share',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }, {
            name: 'Ask',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }, {
            name: 'Suggest',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }, {
            name: 'Request',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }, {
            name: 'Add to friend cart',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }, {
            name: 'Buy for friend',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('activityType', null, {});
    }
};
