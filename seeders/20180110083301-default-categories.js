'use strict';

const moment = require('moment');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('category', [{
            name: 'Bath & Body',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            isParent: 1
        }, {
            name: 'Fragrance',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            isParent: 1
        }, {
            name: 'Hands & Nails',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            isParent: 1
        }, {
            name: 'Makeup',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            isParent: 1
        }, {
            name: 'Sports',
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            isParent: 1
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('category', null, {});
    }
};
