const {logger} = require('../../configuration');

module.exports.getLogin = (req, res, next) => {
    logger.info('hello');
    res.json({
        message: "Welcome to login page"
    });
}