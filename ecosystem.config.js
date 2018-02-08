'use strict';

module.exports = {
    apps: [{
        name: 'sr-api',
        script: 'app.js',
        out_file: '/var/log/sr-api/out.log',
        error_file: '/var/log/sr-api/err.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        env_staging: {
            NODE_ENV: 'staging',
            DB_USERNAME: 'sr',
            DB_PASSWORD: '02icY3LSUi3QHilf',
            DB_NAME: 'sr',
            DB_HOSTNAME: 'localhost',
            PORT: '3001',
            FB_VERSION: 'v2.11',
            FB_ID: '180374555897705',
            FB_SECRET: '2aa6845b51e982f7f07ee8f61c60e45e',
            FB_LOGIN_FIELDS: 'id,name,email,age_range,gender,picture.type(large)',
            JWT_SECRET: 'socialRecommender'
        }
    }]
};
