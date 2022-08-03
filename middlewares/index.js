/**
 * Middlewares handlers
 * @module middlewares
 * @requires module:middlewares/auth
 * @requires module:configuration
 */

const express = require('express');

const morgan = require('morgan');

const {logger} = require('../configuration');


module.exports = {
    middleware: (app) => {
        /**
         * @function use
         * @param {function} morgan
         */
        app.use(morgan('combined', {stream: logger.stream}));

        /**
         * @function use
         * @param {function} express
         */
        app.use(express.json());
    },
    auth: require('./auth')
}