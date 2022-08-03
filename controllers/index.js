/**
 * Controllers handlers
 * @module controllers
 * @requires module:controllers/auth/login
 * @requires module:controllers/auth/signup
 * @requires module:controllers/auth/verify
 * @requires module:controllers/movie/movieController
 * @requires module:controllers/comment/commentController
 */

const {login} = require('./auth/login');
const {signUp} = require('./auth/signup');
const {verify} = require('./auth/verify');
const {getMovies, getMovie} = require('./movie/movieController');
const {getComments, addComment, updateComment, deleteComment} = require('./comment/commentController');

module.exports = {
    login,
    signUp,
    verify,
    getMovies,
    getMovie,
    getComments,
    addComment,
    updateComment,
    deleteComment
}