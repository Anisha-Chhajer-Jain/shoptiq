import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    { id: 'ORD-99021', date: 'Oct 24, 2024', total: 12500, status: 'Delivered', items: 3, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
    { id: 'ORD-88712', date: 'Oct 12, 2024', total: 4500, status: 'Processing', items: 1, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' },
    { id: 'ORD-77621', date: 'Sep 28, 2024', total: 28400, status: 'Shipped', items: 5, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' }
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
