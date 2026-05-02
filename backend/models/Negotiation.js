const mongoose = require('mongoose');

const negotiationSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['NEW', 'PENDING', 'COUNTERED', 'OFFER_SENT', 'ACCEPTED', 'DECLINED', 'EXPIRED'],
      default: 'NEW',
    },
    lastOfferPrice: { type: Number },
    agreedPrice: { type: Number },
    quantity: { type: Number, default: 1 },
    lastMessage: { type: String },
    lastMessageAt: { type: Date, default: Date.now },
    lastBuzzAt: { type: Date },
  },
  { timestamps: true }
);

negotiationSchema.index({ productId: 1, buyer: 1, seller: 1 }, { unique: true });

module.exports = mongoose.model('Negotiation', negotiationSchema);
