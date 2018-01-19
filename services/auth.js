'use strict';

const rp = require('request-promise');

const fbGraphApiUrl = `https://graph.facebook.com/${process.env.FB_VERSION}`;

const fbGraph = async (accessToken, path) => {
    try {
        return await rp({ url: fbGraphApiUrl + path, qs: { access_token: accessToken }, json: true });
    } catch (err) {
        throw err.error.error.message;
    }
};

module.exports = {
    fbGraph
};
