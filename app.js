/**
 * Express app
 * @module app
 * @requires module:configuration
 * @requires module:middlewares
 * @requires module:routes
 */

const express = require("express");

const {logger} = require('./configuration');

const createError = require('http-errors');

const {middleware} = require("./middlewares");

const routes = require('./routes');

/**
 * @type {Object}
 * @namespace app
 * @const
 */
const app = express();

/**
 * @function
 * @param {string} unhandledRejection - Unhandled Rejection
 * @param {Callback} callback function
 */
process.on('unhandledRejection', (reason) => {
   logger.error(reason);
   process.exit(1);
});

/**
 * Executes middlewares
 * @function middleware {@link module:middlewares}
 * @param {Object} app - Express app
 */
middleware(app);

/**
 * Executes routes
 * @function routes {@link module:routes}
 * @param {Object} app - Express app
 */
routes(app);

/**
 * @function use
 * @param {Callback} notFoundRoutesHandler - not found routes handler
 */
app.use(
    /**
     * returns a user friendly error
     * @function notFoundRoutesHandler
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @param {Callback} next - callback
     */
    (req, res, next) => {
   const error = createError(404);
   next(error);
});

/**
 * @function use
 * @param {Callback} errorHandler - global error handler
 */
app.use(
    /**
     * returns a user friendly error
     * @function errorHandler
     * @param {Object} err - error object
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @param {Callback} next - callback
     */
    (err, req, res, next) => {
   logger.error(err.message);
   res.statusCode = err.statusCode || 500;
   res.json({
      message: err.message
   });
});

module.exports = app;
