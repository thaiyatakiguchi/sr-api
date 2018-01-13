'use strict';

const httpStatus = require('http-status');
const Model = require('../models');
const { concatAgeRange, signToken } = require('../utilities');
const { fbLogin, fbGraph } = require('../services/auth');

const login = async (req, res, next) => {
    try {
        let fbGraphApiUrl = `/me?fields=${process.env.FB_LOGIN_FIELDS}`;
        let fbAccessToken = await fbLogin({
            code: req.body.code,
            client_id: process.env.FB_ID,
            client_secret: process.env.FB_SECRET,
            redirect_uri: req.body.redirectUri
        });
        let profile = await fbGraph(fbAccessToken, fbGraphApiUrl);
        let user = await Model.user.findOne({ where: { email: profile.email } });
        if (!user) {
            user = await Model.user.create({
                name: profile.name,
                email: profile.email,
                imageUrl: profile.picture.data.url,
                gender: profile.gender,
                ageRange: concatAgeRange(profile.age_range)
            });
        }
        let accessToken = await signToken(user);
        res.status(httpStatus.CREATED).json({ accessToken: accessToken, tokenType: 'bearer' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login
};
