/**
 * Validators handlers
 * @module validators
 * @requires module:validators/userValidator
 */

const {schema, logSchema} = require('./userValidator');

module.exports = {
    userValidator : schema,
    loginValidator : logSchema
}