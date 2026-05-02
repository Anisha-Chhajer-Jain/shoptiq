// require('dotenv').config();
// const path = require('path');
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const { errorHandler, notFound } = require('./middleware/errorMiddleware');
// const Message = require('./models/Message');
// const Product = require('./models/Product');
// const Negotiation = require('./models/Negotiation');
// const { startNegotiationTimeoutHandler } = require('./utils/negotiationTimeoutHandler');

// // Route imports
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const negotiationRoutes = require('./routes/negotiationRoutes');

// // Connect Database
// connectDB();

// const app = express();
// const server = http.createServer(app);
// const PORT = process.env.PORT || 5000;

// // Socket.io Setup
// const io = new Server(server, {
//   cors: {
//     origin: [
//       'http://localhost:5173',
//       'http://localhost:5174',
//       'http://localhost:3000',
//       'http://127.0.0.1:5173',
//       'http://127.0.0.1:3000',
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true,
//   },
//   transports: ['websocket', 'polling'],
// });

// // ── Socket.io Real-Time Logic ──
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Join a negotiation room
//   socket.on('join_negotiation', (data) => {
//     const productId = typeof data === 'string' ? data : data.productId;
//     const buyerId = typeof data === 'object' ? data.buyerId : null;

//     if (productId) {
//       const room = buyerId ? `${productId}_${buyerId}` : productId;
//       socket.join(room);
//       console.log(`User ${socket.id} joined room: ${room}`);
//     }
//   });

//   // Handle sending messages
//   socket.on('send_message', async (data) => {
//     try {
//       if (!data || !data.productId || !data.senderId) {
//         console.log('Invalid message data received:', data);
//         return;
//       }

//       let targetBuyerId = data.senderRole === 'buyer' ? data.senderId : data.buyerId;

//       if (!targetBuyerId && data.senderRole === 'seller') {
//         const latestNeg = await Negotiation.findOne({
//           productId: data.productId,
//           seller: data.senderId,
//         }).sort('-lastMessageAt');
//         if (latestNeg) targetBuyerId = latestNeg.buyer;
//       }

//       if (!targetBuyerId) {
//         console.log('Missing targetBuyerId for message:', data);
//         return;
//       }

//       const newMessage = await Message.create({
//         productId: data.productId,
//         buyerId: targetBuyerId,
//         sender: data.senderId,
//         text: data.text,
//         type: data.type || 'text',
//         offerPrice: data.offerPrice,
//         quantity: data.quantity || 1,
//       });

//       const product = await Product.findById(data.productId).select('user');

//       if (product) {
//         const existingNegotiation = await Negotiation.findOne({
//           productId: data.productId,
//           buyer: targetBuyerId,
//           seller: product.user,
//         });

//         let newStatus = existingNegotiation ? existingNegotiation.status : 'PENDING';

//         if (data.type === 'offer') {
//           newStatus = data.senderRole === 'buyer' ? 'COUNTERED' : 'OFFER_SENT';
//         } else if (data.type === 'text') {
//           if (existingNegotiation && (existingNegotiation.status === 'NEW' || existingNegotiation.status === 'DECLINED')) {
//             newStatus = 'PENDING';
//           }
//         }

//         const update = {
//           status: newStatus,
//           lastMessage: data.text,
//           lastMessageAt: newMessage.createdAt,
//           quantity: data.quantity || (existingNegotiation ? existingNegotiation.quantity : 1),
//         };

//         if (typeof data.offerPrice === 'number') {
//           update.lastOfferPrice = data.offerPrice;
//         }

//         await Negotiation.findOneAndUpdate(
//           {
//             productId: data.productId,
//             buyer: targetBuyerId,
//             seller: product.user,
//           },
//           { $set: update },
//           { upsert: true, new: true, setDefaultsOnInsert: true }
//         );
//       }

//       // Emit to specific buyer-product room
//       if (targetBuyerId) {
//         const specificRoom = `${data.productId}_${targetBuyerId}`;
//         socket.to(specificRoom).emit('receive_message', {
//           id: newMessage._id,
//           text: data.text,
//           sender: data.senderId,
//           buyerId: targetBuyerId,
//           type: data.type || 'text',
//           offerPrice: data.offerPrice,
//           time: newMessage.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         });
//       }

//       // Also emit to general product room (for seller dashboard alerts)
//       socket.to(data.productId).emit('receive_message', {
//         id: newMessage._id,
//         productId: data.productId,
//         text: data.text,
//         sender: data.senderId,
//         senderRole: data.senderRole,
//         buyerId: targetBuyerId,
//         type: data.type || 'text',
//         offerPrice: data.offerPrice,
//         time: newMessage.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       });
//     } catch (err) {
//       console.error('Socket send_message error:', err);
//     }
//   });

//   // Handle price updates
//   socket.on('price_update', async (data) => {
//     try {
//       if (!data || !data.productId) return;
//       const room = data.buyerId ? `${data.productId}_${data.buyerId}` : data.productId;
//       socket.to(room).emit('price_update', {
//         agreedPrice: data.agreedPrice,
//         quantity: data.quantity,
//       });
//     } catch (err) {
//       console.error('Socket price_update error:', err);
//     }
//   });

//   // Handle deal status updates (accept/decline)
//   socket.on('deal_update', async (data) => {
//     try {
//       if (!data || !data.productId) return;

//       let targetBuyerId = data.senderRole === 'buyer' ? data.senderId : data.buyerId;

//       if (!targetBuyerId && data.senderRole === 'seller') {
//         const latestNeg = await Negotiation.findOne({
//           productId: data.productId,
//           seller: data.senderId,
//         }).sort('-lastMessageAt');
//         if (latestNeg) targetBuyerId = latestNeg.buyer;
//       }

//       if (targetBuyerId) {
//         const product = await Product.findById(data.productId).select('user');
//         if (product) {
//           await Negotiation.findOneAndUpdate(
//             {
//               productId: data.productId,
//               buyer: targetBuyerId,
//               seller: product.user,
//             },
//             {
//               $set: {
//                 status: data.status,
//                 agreedPrice: data.price || 0,
//                 quantity: data.quantity || 1,
//                 lastMessage: `Deal status updated to ${data.status}`,
//                 lastMessageAt: new Date(),
//               },
//             },
//             { upsert: true, new: true, setDefaultsOnInsert: true }
//           );

//           const updatePayload = {
//             status: data.status,
//             price: data.price,
//             sender: data.sender,
//             buyerId: targetBuyerId,
//           };

//           const specificRoom = `${data.productId}_${targetBuyerId}`;
//           socket.to(specificRoom).emit('deal_update', updatePayload);
//           socket.to(data.productId).emit('deal_update', updatePayload);
//         }
//       }
//     } catch (err) {
//       console.error('Socket deal_update error:', err);
//     }
//   });

//   // Urgent buzz notification
//   socket.on('urgent_buzz', async (data) => {
//     try {
//       if (!data || !data.productId) return;

//       const product = await Product.findById(data.productId).select('user');
//       if (product) {
//         await Negotiation.findOneAndUpdate(
//           { productId: data.productId, buyer: data.buyerId, seller: product.user },
//           { $set: { lastBuzzAt: new Date() } },
//           { upsert: true }
//         );
//       }

//       const payload = {
//         buyerName: data.buyerName || 'Buyer',
//         productName: data.productName || 'Product',
//         buyerId: data.buyerId,
//         timestamp: new Date().toISOString(),
//       };

//       if (data.buyerId) {
//         socket.to(`${data.productId}_${data.buyerId}`).emit('urgent_buzz', payload);
//       }
//       socket.to(data.productId).emit('urgent_buzz', payload);
//     } catch (err) {
//       console.error('Socket urgent_buzz error:', err);
//     }
//   });

//   // Voice/Video Call Signaling
//   socket.on('request_call_permission', (data) => {
//     socket.to(data.room).emit('incoming_call_request', data);
//   });

//   socket.on('respond_call_permission', (data) => {
//     socket.to(data.room).emit('call_permission_response', data);
//   });

//   socket.on('call_user', (data) => {
//     socket.to(data.room).emit('incoming_call', {
//       from: data.from,
//       name: data.name,
//       signalData: data.signalData,
//     });
//   });

//   socket.on('answer_call', (data) => {
//     socket.to(data.room).emit('call_accepted', data.signalData);
//   });

//   socket.on('ice_candidate', (data) => {
//     socket.to(data.room).emit('ice_candidate', data.candidate);
//   });

//   socket.on('end_call', (data) => {
//     socket.to(data.room).emit('call_ended');
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // Make io accessible to route handlers
// app.set('io', io);

// // Start background handlers
// startNegotiationTimeoutHandler(io);

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/negotiation', negotiationRoutes);

// // Keep-Alive ping route
// app.get('/api/ping', (req, res) => {
//   res.status(200).send('pong');
// });

// // Static Assets in Production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/dist')));

//   app.get('/{*path}', (req, res) =>
//     res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('Shoptiq Backend API is running!');
//   });
// }

// // Error Middleware
// app.use(notFound);
// app.use(errorHandler);

// // Use server.listen instead of app.listen for Socket.io
// server.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// }).on('error', (err) => {
//   if (err.code === 'EADDRINUSE') {
//     console.error(`Port ${PORT} is already in use. Kill the process and restart.`);
//     process.exit(1);
//   } else {
//     throw err;
//   }
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.log(`Unhandled Rejection: ${err.message}`);
// });
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const Message = require('./models/Message');
const Product = require('./models/Product');
const Negotiation = require('./models/Negotiation');

const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const negotiationRoutes = require('./routes/negotiationRoutes');

// Connect DB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json());

// ── Auth Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/negotiation', negotiationRoutes);

/* =========================================================
   🔹 MESSAGE APIs
========================================================= */

// Send Message
app.post('/api/messages', async (req, res) => {
  try {
    const {
      productId,
      senderId,
      senderRole,
      text,
      type,
      offerPrice,
      quantity,
      buyerId,
    } = req.body;

    if (!productId || !senderId) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    let targetBuyerId = senderRole === 'buyer' ? senderId : buyerId;

    // fallback for seller
    if (!targetBuyerId && senderRole === 'seller') {
      const latestNeg = await Negotiation.findOne({
        productId,
        seller: senderId,
      }).sort('-lastMessageAt');

      if (latestNeg) targetBuyerId = latestNeg.buyer;
    }

    if (!targetBuyerId) {
      return res.status(400).json({ message: 'Buyer not found' });
    }

    const newMessage = await Message.create({
      productId,
      buyerId: targetBuyerId,
      sender: senderId,
      text,
      type: type || 'text',
      offerPrice,
      quantity: quantity || 1,
    });

    const product = await Product.findById(productId).select('user');

    if (product) {
      const existingNegotiation = await Negotiation.findOne({
        productId,
        buyer: targetBuyerId,
        seller: product.user,
      });

      let newStatus = existingNegotiation
        ? existingNegotiation.status
        : 'PENDING';

      if (type === 'offer') {
        newStatus =
          senderRole === 'buyer' ? 'COUNTERED' : 'OFFER_SENT';
      } else if (type === 'text') {
        if (
          existingNegotiation &&
          ['NEW', 'DECLINED'].includes(existingNegotiation.status)
        ) {
          newStatus = 'PENDING';
        }
      }

      const update = {
        status: newStatus,
        lastMessage: text,
        lastMessageAt: newMessage.createdAt,
        quantity:
          quantity ||
          (existingNegotiation ? existingNegotiation.quantity : 1),
      };

      if (typeof offerPrice === 'number') {
        update.lastOfferPrice = offerPrice;
      }

      await Negotiation.findOneAndUpdate(
        {
          productId,
          buyer: targetBuyerId,
          seller: product.user,
        },
        { $set: update },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get Messages (Polling alternative)
app.get('/api/messages/:productId/:buyerId', async (req, res) => {
  try {
    const { productId, buyerId } = req.params;

    const messages = await Message.find({
      productId,
      buyerId,
    }).sort('createdAt');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================================================
   🔹 NEGOTIATION APIs
========================================================= */

// Price Update
app.put('/api/negotiation/price', async (req, res) => {
  try {
    const { productId, buyerId, agreedPrice, quantity } = req.body;

    const updated = await Negotiation.findOneAndUpdate(
      { productId, buyer: buyerId },
      { agreedPrice, quantity },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deal Update (Accept / Decline)
app.put('/api/negotiation/deal', async (req, res) => {
  try {
    const { productId, buyerId, status, price, quantity } = req.body;

    const product = await Product.findById(productId).select('user');

    const updated = await Negotiation.findOneAndUpdate(
      {
        productId,
        buyer: buyerId,
        seller: product.user,
      },
      {
        status,
        agreedPrice: price || 0,
        quantity: quantity || 1,
        lastMessage: `Deal status updated to ${status}`,
        lastMessageAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Urgent Buzz
app.post('/api/negotiation/buzz', async (req, res) => {
  try {
    const { productId, buyerId } = req.body;

    const product = await Product.findById(productId).select('user');

    await Negotiation.findOneAndUpdate(
      { productId, buyer: buyerId, seller: product.user },
      { lastBuzzAt: new Date() },
      { upsert: true }
    );

    res.json({ message: 'Buzz sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================================================
   🔹 HEALTH + STATIC
========================================================= */

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('/{*path}', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API Running...');
  });
}

/* =========================================================
   🔹 ERROR HANDLING
========================================================= */

app.use(notFound);
app.use(errorHandler);

/* =========================================================
   🔹 SERVER START
========================================================= */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});