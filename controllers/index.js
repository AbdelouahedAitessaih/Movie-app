const {login} = require('./auth/login');
const {signUp} = require('./auth/signup');
const {verify} = require('./auth/verify');
const {getMovies, getMovie} = require('./movie/movieController');
const {addComment} = require('./comment/commentController');

module.exports = {
    login,
    signUp,
    verify,
    getMovies,
    getMovie,
    addComment
}