const router = require('express').Router();
const isActive = require('../middlewares/isActive');
const isAuth = require('../middlewares/isAuth');


router.post('/post/:channel_id', isAuth, isOwner, createPost);
router.put('/post/:channel_id/:post_id', isAuth, isOwner, updatePost);
router.get('/post/:channel_id', isAuth, isActive, getPosts);
router.delete('/post/:channel_id/:post_id', isAuth, isOwner, deletePost);

module.exports = router;