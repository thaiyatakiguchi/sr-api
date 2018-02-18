'use strict';

const httpStatus = require('http-status');
const Model = require('../models');
const { signToken } = require('../utilities');
const { fbGraph } = require('../services/auth');

const login = async (req, res, next) => {
    try {
        let user = await Model.user.findOne({
            attributes: ['id', 'fbId', 'fbToken', 'name', 'email', 'imageUrl', 'gender', 'ageRange'],
            where: { fbId: req.body.fbId }
        });
        if (!user) {
            user = await Model.user.create({
                fbId: req.body.fbId,
                fbToken: req.body.fbToken,
                name: req.body.name,
                email: req.body.email,
                imageUrl: req.body.url,
                gender: req.body.gender,
                ageRange: req.body.age_range
            });
        } else {
            user = await user.update({
                fbToken: req.body.fbToken
            });
        }
        let accessToken = await signToken(user);
        res.status(httpStatus.CREATED).json({ accessToken: accessToken, tokenType: 'bearer' });
    } catch (err) {
        next(err);
    }
};

const getFriend = async (req, res, next) => {
    try {
        let user = await Model.user.findOne({
            attributes: ['id', 'fbId', 'fbToken', 'name', 'email', 'imageUrl', 'gender', 'ageRange'],
            where: { id: req.user.id }
        });
        let getFriendUrl = `/${user.fbId}/friends`;
        let friends = await fbGraph(user.fbToken, getFriendUrl);
        res.status(httpStatus.OK).json({ message: `Successfully retrieved user's friends from facebook`, friends: friends.data });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login,
    getFriend
};
