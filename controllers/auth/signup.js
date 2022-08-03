/**
 * SignUp controller
 * @module controllers/auth/signup
 */

const {User} = require('../../models');
const createError = require('http-errors');
const {email} = require('../../configuration');
const jwt = require('jsonwebtoken');
const {readFileSync} = require('fs');

const secret = readFileSync('./private.key');

/**
 * Create new user account
 * @function signUp
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
const signUp = (req, res, next) => {
    //Validation
    const validation = User.validate(req.body);
    if(validation.error) {
        const error = new Error(validation.error.message);
        error.statusCode = 400;
        return next(error);
    }

    //Check existance
    const user = new User(req.body);
    user.checkExistance()
        .then(result => {

            if(result.check) {
                const error = new Error(result.message);
                error.statusCode = 409; // Conflict
                return next(error)
            }

            user.save((err) => {
                if(err) {
                    return next(createError(500));
                }

                const token = jwt.sign({email: user.userData['email']}, secret, {
                    expiresIn: '1h'
                });
                email(user.userData['email'], user.userData['name'], token);

                res.status(201).json({
                    message: 'User has been successfully created !'
                })
            })
        })
        .catch(err => next(createError(500)));
}

module.exports = {
    signUp
}