const Negotiation = require('../models/Negotiation');
const Message = require('../models/Message');

// @desc    Get all negotiations for a seller
// @route   GET /api/negotiation/seller
// @access  Private/Seller
const getSellerNegotiations = async (req, res, next) => {
  try {
    const negotiations = await Negotiation.find({ seller: req.user._id })
      .populate('productId', 'name image price')
      .populate('buyer', 'name email')
      .sort({ lastMessageAt: -1 });
    res.json(negotiations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all negotiations for a buyer
// @route   GET /api/negotiation/buyer
// @access  Private
const getBuyerNegotiations = async (req, res, next) => {
  try {
    const negotiations = await Negotiation.find({ buyer: req.user._id })
      .populate('productId', 'name image price')
      .populate('seller', 'name email')
      .sort({ lastMessageAt: -1 });
    res.json(negotiations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get messages for a specific negotiation
// @route   GET /api/negotiation/:productId/messages
// @access  Private
const getNegotiationMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      productId: req.params.productId,
      buyerId: req.user._id,
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    Update negotiation status (accept/decline)
// @route   PUT /api/negotiation/:id/status
// @access  Private/Seller
const updateNegotiationStatus = async (req, res, next) => {
  try {
    const { status, agreedPrice } = req.body;
    const negotiation = await Negotiation.findByIdAndUpdate(
      req.params.id,
      { $set: { status, agreedPrice, lastMessageAt: new Date() } },
      { new: true }
    );
    if (!negotiation) {
      res.status(404);
      return next(new Error('Negotiation not found'));
    }
    res.json(negotiation);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellerNegotiations,
  getBuyerNegotiations,
  getNegotiationMessages,
  updateNegotiationStatus,
};
