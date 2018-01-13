'use strict';

const httpStatus = require('http-status');
const Model = require('../models');
const { verifyToken } = require('../utilities');

const authHandler = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: `Authorization is needed to get requested response` });
        }
        let userInfo = await verifyToken(req.headers.authorization.split(' ')[1]);
        if (!userInfo) {
            return res.status(httpStatus.FORBIDDEN).json({ message: `Incorrect access_token` });
        }
        req.user = userInfo;
        next();
    } catch (err) {
        return res.status(httpStatus.FORBIDDEN).json({ message: err });
    }
};

const activityLogger = async (req, res, next) => {
    try {
        // switch (req.body.activityTypeId) {
        //     case 1: // view [GET]
        //         await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.path.split('/')[2] });
        //         break;
        //     case 2: // add to cart [POST]
        //         await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.path.split('/')[2] });
        //         break;
        //     case 3: // buy [POST]
        //         await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.path.split('/')[2] });
        //         break;
        //     case 4: // social sharing [POST]
        //         await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.path.split('/')[2] });
        //         break;
        //     case 5: // ask [POST]
        //         await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.path.split('/')[2], friendId: req.body.friendId });
        //         break;
        //     case 6: // suggest [POST]
        //         await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.path.split('/')[2], friendId: req.body.friendId });
        //         break;
        //     case 7: // request [POST]
        //         await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.path.split('/')[2], friendId: req.body.friendId });
        //         break;
        //     case 8: // add to friend cart [POST]
        //         await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.path.split('/')[2], friendId: req.body.friendId });
        //         break;
        //     case 9: // buy for friend [POST]
        //         await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.path.split('/')[2], friendId: req.body.friendId });
        //         break;
        //     default: // view [GET]
        //         if (req.query.activityTypeId) {
        //             await Model.activity.create({ userId: req.user.id, activityTypeId: parseInt(req.query.activityTypeId, 10), productId: req.path.split('/')[2] });
        //         }
        //         break;
        // }
        next();
    } catch (err) {
        next(err);
    }
};

const errorLog = (req, res, next) => {
    return next(new Error('Something went wrong.'));
};

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.statusCode || httpStatus.BAD_GATEWAY).json({
        message: err.message
    });
};

module.exports = {
    authHandler,
    activityLogger,
    errorLog,
    errorHandler
};
