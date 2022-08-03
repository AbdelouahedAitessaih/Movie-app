/**
 * Account verification controller
 * @module controllers/auth/verify
 */

const jwt = require('jsonwebtoken');
const {readFileSync} = require('fs');
const createError = require('http-errors');
const {dbCon} = require('../../configuration');

const secret = readFileSync('./private.key');

/**
 * Verify user account
 * @function verify
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
const verify = (req, res, next) => {

    const token = req.query['token'];

    try{
        const decoded = jwt.verify(token, secret);

        dbCon('users', async (db) => {
            const modified = await db.updateOne({email: decoded['email']}, {'$set': {verified: true}});

            if(modified.modifiedCount === 0) {
                return next(createError(404))
            }

            res.json({
                message:'Your account has been verified !'
            })
        });

    }catch (e) {
        next(createError(400))
    }

}

module.exports = {
    verify
};