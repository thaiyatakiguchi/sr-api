'use strict';

module.exports = {
    apps: [{
        name: 'sr-api',
        script: 'app.js',
        out_file: '/var/log/sr-api/out.log',
        error_file: '/var/log/sr-api/err.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }],

    deploy: {
        dev: {
            user: 'root',
            key: '~/.ssh/manna_rsa',
            host: '128.199.251.234',
            ref: 'origin/develop',
            repo: 'git@github.com:thestrayed/sr-api.git',
            path: '/app',
            'post-deploy': 'npm i --production && node_modules/.bin/sequelize db:migrate && pm2 reload ecosystem.config.js'
        }
    }
};
