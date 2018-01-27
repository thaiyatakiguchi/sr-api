'use strict';

const moment = require('moment');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('user', [{
            fbId: '10214388001310761',
            fbToken: 'EAACkDLlUr2kBAKExPiuyhNzQyitQaxkmW47AmrrWZBa6zMDgV84mZA1Y4ICqDRjXd1TroIE2h931dPIXNldr04UN8ON9mjt8O4YLIqLyK67GvKxNMZAMoGSTT4J35f2lLR6VJi5nVWygz8OwhNQB6DWD6WkKaXET3Eki0f68MXlj5VLoLGToJdxB8BUPLQZD',
            name: 'Srettha Terananont',
            email: 'strayedpeople@gmail.com',
            imageUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/15966118_10211128107775460_23387941090311074_n.jpg?oh=4ca3528905e8f54f7b1a1d449edbf2c4&oe=5A961CC6',
            gender: 'male',
            ageRange: '21',
            isAdmin: true,
            isDeleted: false,
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('user', null, {});
    }
};
