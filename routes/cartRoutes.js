const express = require('express');
const { addToCart, updateCart, removeCartItem, getCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

router.use(authMiddleware);
router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCart);
router.delete('/:id', removeCartItem);

module.exports = router;

