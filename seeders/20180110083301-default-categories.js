'use strict';

const moment = require('moment');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('category', [{
            name: 'Bath & Body',
            createdAt: moment().format(),
            updatedAt: moment().format(),
            isParent: 1
        }, {
            name: 'Fragrance',
            createdAt: moment().format(),
            updatedAt: moment().format(),
            isParent: 1
        }, {
            name: 'Hands & Nails',
            createdAt: moment().format(),
            updatedAt: moment().format(),
            isParent: 1
        }, {
            name: 'Makeup',
            createdAt: moment().format(),
            updatedAt: moment().format(),
            isParent: 1
        }, {
            name: 'Sports',
            createdAt: moment().format(),
            updatedAt: moment().format(),
            isParent: 1
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('category', null, {});
    }
};
