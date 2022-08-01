const {Router} = require('express');
const {getMovies, getMovie} = require('../controllers');

const router = Router();

router.get('/movies', getMovies)
      .get('/movies/:id', getMovie);

module.exports = router;