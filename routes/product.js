'use strict';

const path = require('path');
const uuidv1 = require('uuid/v1');
const multer = require('multer');
const express = require('express');
const router = new express.Router();
const product = require('../controllers/product');
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
    .get(product.getAll)
    .post(product.create);

router.route('/import')
    .post(multer({ storage: storage }).single('file'), product.importProduct);

router.route('/:id')
    .get(product.getById)
    .put(product.update);

router.route('/:id/cart')
    .post(product.addToCart);

router.route('/:id/order')
    .post(product.buyProduct);

router.route('/:id/share')
    .post(product.shareProduct);

router.route('/:id/ask')
    .post(product.askFriend);

router.route('/:id/suggest')
    .post(product.suggestFriend);

router.route('/:id/request')
    .post(product.requstFriend);

module.exports = router;
