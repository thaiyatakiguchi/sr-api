'use strict';

const path = require('path');
const uuidv1 = require('uuid/v1');
const multer = require('multer');
const express = require('express');
const router = new express.Router();
const { create, update, getById, getAll, importProduct, addToCart, buyProduct, shareProduct, askFriend, suggestFriend, requstFriend } = require('../controllers/product');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'files'));
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.split('.');
        cb(null, `${uuidv1()}.${ext[ext.length - 1]}`);
    }
});

router.route('/')
    .get(getAll)
    .post(create);

router.route('/import')
    .post(multer({ storage: storage }).single('file'), importProduct);

router.route('/:id')
    .get(getById)
    .put(update);

router.route('/:id/cart')
    .post(addToCart);

router.route('/:id/order')
    .post(buyProduct);

router.route('/:id/share')
    .post(shareProduct);

router.route('/:id/ask')
    .post(askFriend);

router.route('/:id/suggest')
    .post(suggestFriend);

router.route('/:id/request')
    .post(requstFriend);

module.exports = router;
