'use strict';

const express = require('express');
const router = new express.Router();
const auth = require('../controllers/auth');

router.route('/facebook')
    .post(auth.login);

module.exports = router;
