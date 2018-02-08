'use strict';

const express = require('express');
const router = new express.Router();
const { getCart, addToCart, addToFriendCart } = require('../controllers/cart');

router.route('/')
    .get(getCart)
    .post(addToCart);

router.route('/friend')
    .post(addToFriendCart);

module.exports = router;
