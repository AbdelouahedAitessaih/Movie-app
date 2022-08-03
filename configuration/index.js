/**
 * Configuration handlers
 * @module configuration
 * @requires module:configuration/db
 * @requires module:configuration/email
 * @requires module:configuration/logger
 */
module.exports = {
    logger : require('./logger'),
    dbCon: require('./db'),
    email: require('./email')
}