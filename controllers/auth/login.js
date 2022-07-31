const {infoLogger} = require('../../configuration');

module.exports.getLogin = (req, res, next) => {
    infoLogger.info('hello');
    res.json({
        message: "Welcome to login page"
    });
}