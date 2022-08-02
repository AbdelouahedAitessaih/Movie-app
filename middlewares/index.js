const express = require('express');

const morgan = require('morgan');

const {logger} = require('../configuration');


module.exports = {
    middleware: (app) => {
        app.use(morgan('combined', {stream: logger.stream}));

        app.use(express.json());
    },
    auth: require('./auth')
}