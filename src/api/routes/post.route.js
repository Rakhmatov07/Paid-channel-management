const router = require('express').Router();
const { createPost, updatePost, getPosts, deletePost } = require('../controllers/post.controller');
const isActive = require('../middlewares/isActive');
const isAuth = require('../middlewares/isAuth');
const isOwner = require('../middlewares/isOwner');


router.post('/post/:channel_id', isAuth, isOwner, createPost);
router.put('/post/:channel_id/:post_id', isAuth, isOwner, updatePost);
router.get('/post/:channel_id', isAuth, isActive, getPosts);
router.delete('/post/:channel_id/:post_id', isAuth, isOwner, deletePost);

module.exports = router;