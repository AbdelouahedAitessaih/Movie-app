const {schema, logSchema} = require('./userValidator');

module.exports = {
    userValidator : schema,
    loginValidator : logSchema
}