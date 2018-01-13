'use strict';

const rp = require('request-promise');

const fbAccessTokenUrl = `https://graph.facebook.com/${process.env.FB_VERSION}/oauth/access_token`;
const fbGraphApiUrl = `https://graph.facebook.com/${process.env.FB_VERSION}`;

const fbLogin = async (qs) => {
    try {
        let { access_token } = await rp({ url: fbAccessTokenUrl, qs: qs, json: true });
        return access_token;
    } catch (err) {
        throw err.error.error.message;
    }
};

const fbGraph = async (accessToken, path) => {
    try {
        return await rp({ url: fbGraphApiUrl + path, qs: { access_token: accessToken }, json: true });
    } catch (err) {
        throw err.error.error.message;
    }
};

module.exports = {
    fbLogin,
    fbGraph
};
