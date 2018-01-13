'use strict';

const express = require('express');
const router = new express.Router();
const brand = require('../controllers/brand');

router.route('/')
    .get(brand.getAll)
    .post(brand.create);

router.route('/:id')
    .get(brand.getById)
    .put(brand.update);

router.route('/:id/product')
    .get(brand.getProduct);

module.exports = router;
