const router = require('express').Router();
const { getChannels, createChannel, deleteChannel, getOneChannel } = require('../controllers/channel.controller');
const isActive = require('../middlewares/isActive');
const isAuth = require('../middlewares/isAuth');

router.get('/channel', isAuth, getChannels);
router.get('/channel/:channel_id', isAuth, isActive, getOneChannel);
router.post('/channel', isAuth, createChannel);
router.delete('/channel/:channel_id', isAuth, deleteChannel);

module.exports = router;