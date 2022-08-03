/**
 * Authentication middleware
 * @module middlewares/auth
 */

const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {readFileSync} = require('fs');

/**
 * @function auth
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
module.exports = (req, res, next) => {
  if(!req.get('Authorization')) {
       return next(createError(401));
  }

  const token = req.get('Authorization').split(' ')[1];
  const secret = readFileSync('./private.key');

  try {
      const decode = jwt.verify(token, secret);
      req.user = {_id: decode._id, name: decode.name, email: decode.email};
      next();
  }catch (err) {
      next(createError(401));
  }
}