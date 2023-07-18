const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');

router.post('paymet/:channel_id', isAuth, payForChannel);

module.exports = router;