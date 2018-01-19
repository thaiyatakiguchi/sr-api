'use strict';

const express = require('express');
const router = new express.Router();
const { getFriend } = require('../controllers/auth');

router.route('/friends')
    .get(getFriend);

module.exports = router;
