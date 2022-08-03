/**
 * User validator
 * @module validators/userValidator
 */

const Joi = require('@hapi/joi');

/**
 * Verifies user object schema
 * @type {Object}
 * @const
 */
const schema = Joi.object({
   name: Joi.string().required().min(3),
   email: Joi.string().email().required(),
   password: Joi.string().pattern(
       new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
   )
       .message(
           'Your password must be a least 8 characters and contain at least ' +
           'one uppercase letter, one lowercase letter, one number and one ' +
           'special character'
       )
       .required()
   // username: Joi.string().alphanum().required().min(3).max(10)
});

/**
 * Verifies login object schema
 * @type {Object}
 * @const
 */
const logSchema = Joi.object({
   email: Joi.string().required(),
   password: Joi.string().required()
});

module.exports = {
    schema,
    logSchema
};