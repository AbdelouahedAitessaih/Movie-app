const {Router} = require('express');
const {login, signUp} =require('../controllers');

const router = Router();

router
    .post('/login', login)
    .post('/signup', signUp)

module.exports = router;
