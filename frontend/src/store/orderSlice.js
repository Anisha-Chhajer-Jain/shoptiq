import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    { 
      id: 'ORD-99021', 
      date: 'Oct 24, 2026', 
      total: 12500, 
      status: 'Delivered', 
      items: 3, 
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
      cartItems: [
        { id: 101, name: 'Premium Runners', price: 8500, qty: 1, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
        { id: 102, name: 'Tech Socks', price: 2000, qty: 2, img: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200' }
      ],
      shippingDetails: { name: 'John Doe', address: '123 Main St', city: 'Mumbai', state: 'MH', zipCode: '400001' }
    },
    { 
      id: 'ORD-88712', 
      date: 'Oct 12, 2026', 
      total: 4500, 
      status: 'Processing', 
      items: 1, 
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200',
      cartItems: [
        { id: 103, name: 'Smart Watch', price: 4500, qty: 1, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' }
      ],
      shippingDetails: { name: 'John Doe', address: '456 Park Ave', city: 'Delhi', state: 'DL', zipCode: '110001' }
    },
    { 
      id: 'ORD-77621', 
      date: 'Sep 28, 2026', 
      total: 28400, 
      status: 'Shipped', 
      items: 5, 
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200',
      cartItems: [
        { id: 104, name: 'Pro Headphones', price: 28400, qty: 1, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' }
      ],
      shippingDetails: { name: 'John Doe', address: '789 Link Rd', city: 'Bangalore', state: 'KA', zipCode: '560001' }
    }
  ],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // Add to the top
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
