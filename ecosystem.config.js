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
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/development',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
        },
        production: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};
