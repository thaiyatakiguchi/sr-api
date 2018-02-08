'use strict';

const http = require('http');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const { authHandler, activityLogger, errorLog, errorHandler } = require('./middlewares');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', require('./routes/auth'));

app.use(authHandler);

app.use('/user', require('./routes/user'));

app.use(activityLogger);

app.use('/brand', require('./routes/brand'));
app.use('/cart', require('./routes/cart'));
app.use('/category', require('./routes/category'));
app.use('/product', require('./routes/product'));

app.use(errorLog);
app.use(errorHandler);

const server = http.createServer(app);

// increase server timeout
server.setTimeout(300000);

server.listen(app.get('port'), () => {
    console.log(`listening on *:${app.get('port')}`);
});

module.exports = server;
