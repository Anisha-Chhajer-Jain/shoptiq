const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ['text', 'offer', 'system'], default: 'text' },
    offerPrice: { type: Number },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

messageSchema.index({ productId: 1, buyerId: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
