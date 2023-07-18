const router = require('express').Router();
const payForChannel = require('../controllers/payment.controller');
const isAuth = require('../middlewares/isAuth');

router.post('/payment/:channel_id', isAuth, payForChannel);

module.exports = router;