const express = require('express');
const router = express.Router();
const {
  getSellerNegotiations,
  getBuyerNegotiations,
  getNegotiationMessages,
  updateNegotiationStatus,
} = require('../controllers/negotiationController');
const { protect, seller } = require('../middleware/authMiddleware');

router.get('/seller', protect, seller, getSellerNegotiations);
router.get('/buyer', protect, getBuyerNegotiations);
router.get('/:productId/messages', protect, getNegotiationMessages);
router.put('/:id/status', protect, seller, updateNegotiationStatus);

module.exports = router;
