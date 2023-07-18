const { register, login, registerPage, loginPage, logout } = require('../controllers/auth.controller');
const isAuth = require('../middlewares/isAuth');
const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuth, logout);

router.get('/register', registerPage);
router.get('/login', loginPage);

module.exports = router;