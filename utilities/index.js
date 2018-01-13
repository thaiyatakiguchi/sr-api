'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const readline = require('readline');
const { promisify } = require('util');

const promiseSignJWT = promisify(jwt.sign);
const promiseVerifyJWT = promisify(jwt.verify);

const concatAgeRange = (ageRange) => {
    if (ageRange.max) {
        return `${ageRange.min}-${ageRange.max}`;
    }
    return `${ageRange.min}`;
};

const signToken = async (user) => {
    try {
        return await promiseSignJWT({ user: user, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 150) }, process.env.JWT_SECRET);
    } catch (err) {
        throw err;
    }
};

const verifyToken = async (token) => {
    try {
        let decodedToken = await promiseVerifyJWT(token, process.env.JWT_SECRET);
        return decodedToken.user;
    } catch (err) {
        throw err;
    }
};

const readImportedFile = (path) => {
    return new Promise((resolve) => {
        let data = [];
        const rl = readline.createInterface({
            input: fs.createReadStream(path)
        });
        rl.on('line', (line) => {
            data.push(JSON.parse(line));
        }).on('close', () => {
            resolve(data);
        });
    });
};

module.exports = {
    concatAgeRange,
    signToken,
    verifyToken,
    readImportedFile
};
