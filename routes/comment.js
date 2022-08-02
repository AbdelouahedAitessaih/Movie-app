const {Router} = require('express');
const {addComment} = require('../controllers');
const {auth} = require('../middlewares');

const router = Router();

router.post('/comments/:movieId', auth, addComment)

module.exports = router;