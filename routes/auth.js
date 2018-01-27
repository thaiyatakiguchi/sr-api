'use strict';

const express = require('express');
const router = new express.Router();
const { login } = require('../controllers/auth');

router.route('/facebook')
    .post(login);

module.exports = router;
