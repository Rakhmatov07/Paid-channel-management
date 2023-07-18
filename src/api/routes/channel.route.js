const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');

router.get('/channel', isAuth, getChannels);
router.post('/channel', isAuth, createChannel);
router.put('/channel', isAuth, updateChannel);
router.delete('/channel', isAuth, deleteChannel);

module.exports = router;