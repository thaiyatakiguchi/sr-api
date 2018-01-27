'use strict';

const express = require('express');
const router = new express.Router();
const { create, update, getById, getAll, getProduct } = require('../controllers/category');

router.route('/')
    .get(getAll)
    .post(create);

router.route('/:id')
    .get(getById)
    .put(update);

router.route('/:id/product')
    .get(getProduct);

module.exports = router;
