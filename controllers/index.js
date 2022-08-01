const {login} = require('./auth/login');
const {signUp} = require('./auth/signup');
const {getMovies, getMovie} = require('./movie/movieController');

module.exports = {
    login,
    signUp,
    getMovies,
    getMovie
}