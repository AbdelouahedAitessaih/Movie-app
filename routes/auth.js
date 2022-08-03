/**
 * Authentication routes
 * @module routes/auth
 * @requires module:controllers
 */

const {Router} = require('express');
const {login, signUp, verify} =require('../controllers');

/**
 * @type {Object}
 * @namespace authRouter
 */
const router = Router();

router
    /**
     * @function post
     * @param {string} /login
     * @param {Callback} login {@link module:controllers/auth/login~login}
     */
    .post('/login', login)
    /**
     * @function post
     * @param {string} /signup
     * @param {Callback} signUp {@link module:controllers/auth/signup~signUp}
     */
    .post('/signup', signUp)
    /**
     * @function get
     * @param {string} /verify
     * @param {Callback} verify {@link module:controllers/auth/verify~verify}
     */
    .get('/verify', verify);

module.exports = router;
