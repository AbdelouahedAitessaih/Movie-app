/**
 * Login controller
 * @module controllers/auth/login
 */

const {User} = require('../../models');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {readFileSync} = require('fs');

/**
 * Get token to connect by providing valid email and password
 * @function login
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
const login = (req, res, next) => {

    User.login(req.body)
        .then(result => {

            if(result instanceof Error) {
                return next(result);
            }

            const {_id, name, email} = result;

            const secret = readFileSync('./private.key');
            const token = jwt.sign({_id, name, email}, secret, { expiresIn: '1h' });

            res.json({token});

        })
        .catch(err => {
            next(createError(500));
        });

};

module.exports = {
    login
}