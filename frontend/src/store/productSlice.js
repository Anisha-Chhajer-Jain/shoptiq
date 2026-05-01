import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  localProducts: JSON.parse(localStorage.getItem('shoptiq_local_products')) || [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addLocalProduct: (state, action) => {
      state.localProducts.unshift(action.payload);
      localStorage.setItem('shoptiq_local_products', JSON.stringify(state.localProducts));
    },
    setLocalProducts: (state, action) => {
      state.localProducts = action.payload;
      localStorage.setItem('shoptiq_local_products', JSON.stringify(state.localProducts));
    },
  },
});

export const { addLocalProduct, setLocalProducts } = productSlice.actions;
export default productSlice.reducer;
