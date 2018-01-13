'use strict';

const express = require('express');
const router = new express.Router();
const category = require('../controllers/category');

router.route('/')
    .get(category.getAll)
    .post(category.create);

router.route('/:id')
    .get(category.getById)
    .put(category.update);

router.route('/:id/product')
    .get(category.getProduct);

module.exports = router;
