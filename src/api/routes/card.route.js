const router = require('express').Router();
const { addCard, deleteCard, updateCardBalance } = require('../controllers/card.controller');
const isAuth = require('../middlewares/isAuth');

router.post('/card', isAuth, addCard);
router.put('/card', isAuth, updateCardBalance);
router.delete('/card', isAuth, deleteCard);


module.exports = router;