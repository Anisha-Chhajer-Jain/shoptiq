import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  localProducts: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addLocalProduct: (state, action) => {
      state.localProducts.unshift(action.payload);
    },
    setLocalProducts: (state, action) => {
      state.localProducts = action.payload;
    },
  },
});

export const { addLocalProduct, setLocalProducts } = productSlice.actions;
export default productSlice.reducer;
