const Negotiation = require('../models/Negotiation');
const Message = require('../models/Message');

// @desc    Get all negotiations for a seller
// @route   GET /api/negotiation/seller
// @access  Private/Seller
const getSellerNegotiations = async (req, res, next) => {
  try {
    const negotiations = await Negotiation.find({ seller: req.user._id })
      .populate('buyer', 'name email')
      .populate('productId', 'name price image')
      .sort('-lastMessageAt');
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
      .populate('seller', 'name email')
      .populate('productId', 'name price image')
      .sort('-lastMessageAt');
    res.json(negotiations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get chat messages for a specific negotiation
// @route   GET /api/negotiation/:productId/messages?buyerId=xxx
// @access  Private
const getNegotiationMessages = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { buyerId } = req.query;
    const userId = req.user._id;

    const query = { productId };
    if (buyerId) {
      query.buyerId = buyerId;
    } else {
      query.buyerId = userId;
    }

    const messages = await Message.find(query).sort('createdAt').limit(200);
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
    const negotiation = await Negotiation.findById(req.params.id);

    if (!negotiation) {
      res.status(404);
      throw new Error('Negotiation not found');
    }

    negotiation.status = status;
    if (agreedPrice) negotiation.agreedPrice = agreedPrice;
    negotiation.lastMessageAt = new Date();

    const updated = await negotiation.save();
    res.json(updated);
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
