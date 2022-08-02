const {Router} = require('express');
const {login, signUp, verify} =require('../controllers');

const router = Router();

router
    .post('/login', login)
    .post('/signup', signUp)
    .get('/verify', verify)

module.exports = router;
