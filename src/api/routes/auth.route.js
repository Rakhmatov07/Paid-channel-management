const { register, login, registerPage, loginPage, logout } = require('../controllers/auth.controller');
const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.get('/register', registerPage);
router.get('/login', loginPage);

module.exports = router;