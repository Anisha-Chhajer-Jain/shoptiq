const Product = require('../models/Product');

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller
const createProduct = async (req, res, next) => {
  try {
    const { name, price, stock, category, description } = req.body;
    
    const product = new Product({
      name,
      price,
      stock,
      category,
      description,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct, getProducts };
