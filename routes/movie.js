/**
 * Movie routes
 * @module routes/movie
 * @requires module:controllers
 * @requires module:middlewares
 */

const {Router} = require('express');
const {getMovies, getMovie} = require('../controllers');
const {auth} = require('../middlewares');

/**
 * @type {Object}
 * @namespace movieRouter
 */
const router = Router();

router
    /**
     * @function get
     * @param {string} /movies
     * @param {Callback} getMovies {@link module:controllers/movie/movieController~getMovies}
     */
    .get('/movies', getMovies)
    /**
     * @function get
     * @param {string} /movies/:id
     * @param {Callback} auth {@link module:middlewares/auth~auth}
     * @param {Callback} getMovie {@link module:controllers/movie/movieController~getMovie}
     */
    .get('/movies/:id', auth, getMovie);

module.exports = router;