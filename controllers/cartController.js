const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  const cart = await CartItem.find({ userId: req.user._id }).populate('productId');
  res.json(cart);
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Invalid product ID' });

  const item = new CartItem({ userId: req.user._id, productId, quantity });
  await item.save();
  res.status(201).json(item);
};

exports.updateCart = async (req, res) => {
  const { quantity } = req.body;
  const item = await CartItem.findOne({ _id: req.params.id, userId: req.user._id });
  if (!item) return res.status(404).json({ message: 'Item not found' });

  item.quantity = quantity;
  await item.save();
  res.json(item);
};

exports.removeCartItem = async (req, res) => {
  const item = await CartItem.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json({ message: 'Removed' });
};
