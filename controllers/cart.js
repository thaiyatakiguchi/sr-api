'use strict';

const httpStatus = require('http-status');
const Model = require('../models');

const addToCart = async (req, res, next) => {
    try {
        let cart;
        if (!req.body.cartId) {
            cart = await Model.cart.create({ userId: req.user.id });
        } else {
            cart = await Model.cart.findOne({
                attributes: ['id'],
                where: {
                    isCheckedout: false,
                    cartid: req.body.cartId
                }
            });
            if (!cart) {
                cart = await Model.cart.create({ userId: req.user.id });
            }
        }
        await Model.cartItems.create({ cartId: cart.id, productId: req.body.productId, quantity: req.body.quantity });
        res.status(httpStatus.OK).json({ message: `Successfully added product to cart` });
    } catch (err) {
        next(err);
    }
};

const getCart = async (req, res, next) => {
    try {
        let cart = await Model.cart.findOne({
            where: {
                userId: req.user.id,
                isCheckedout: false
            },
            include: [
                {
                    as: 'products',
                    model: Model.product,
                    attributes: ['asin', 'title', 'description', 'imageUrl', 'price'],
                    through: { attributes: [] }
                }
            ],
            attributes: ['isCheckedOut']
        });
        res.status(httpStatus.OK).json({ message: `Successfully retrived user's cart`, cart: cart });
    } catch (err) {
        next(err);
    }
};

const addToFriendCart = async (req, res, next) => {
    try {
        let friends = req.body.friendsFbId;
        friends.forEach(async (friend) => {
            let f = await Model.user.findOne({
                attributes: ['id'],
                where: {
                    fbId: friend
                }
            });
            if (!f) {
                return res.status(httpStatus.NOT_FOUND).json({ message: `friend not found` });
            }
            let friendCart = await Model.cart.findOne({
                attributes: ['id'],
                where: {
                    userId: f.id,
                    isCheckedout: false
                }
            });
            if (!friendCart) {
                friendCart = await Model.cart.create({ userId: f.id });
            }
            await Promise.all([
                Model.cartItems.create({ cartId: friendCart.id, productId: req.body.productId, quantity: req.body.quantity }),
                Model.activity.create({ userId: req.user.id, activityTypeId: 8, productId: req.body.productId, friendId: f.id })
            ]);
            await Model.cartItems.create({ cartId: friendCart.id, productId: req.body.productId, quantity: req.body.quantity });
        });
        res.status(httpStatus.OK).json({ message: `Successfully added product/products to friend's cart` });
    } catch (err) {
        next(err);
    }
};

const checkout = async (req, res, next) => {
    try {
        let cart = await Model.cart.findOne({
            attributes: ['id'],
            where: {
                userId: req.body.userId,
                isCheckedout: false
            },
            include: [{
                model: Model.cartItems
            }]
        });
        if (!cart) {
            return res.status(httpStatus.NOT_FOUND).json({ message: `cart not found` });
        }
        await cart.update({ isCheckedout: true });
        res.status(httpStatus.OK).json({ cart: cart });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addToCart,
    getCart,
    addToFriendCart,
    checkout
};
