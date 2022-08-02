const {Router} = require('express');
const {getMovies, getMovie} = require('../controllers');
const {auth} = require('../middlewares');

const router = Router();

router.get('/movies', auth, getMovies)
      .get('/movies/:id', getMovie);

module.exports = router;