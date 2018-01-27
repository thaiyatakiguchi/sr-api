'use strict';

module.exports = {
    apps: [{
        name: 'sr-api',
        script: 'app.js',
        out_file: '/var/log/sr-api/out.log',
        error_file: '/var/log/sr-api/err.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }]
};
