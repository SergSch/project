import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsInCart: [],
  totalSum: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      const productIndex = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      );
      state.productsInCart.splice(productIndex, 1);
    },
    decreaseProduct: (state, action) => {
      const productIndex = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      );
      const productExist = state.productsInCart.find(
        (product) => product.id === action.payload.id
      );
      productExist.quantity > 1
        ? (productExist.quantity -= 1)
        : state.productsInCart.splice(productIndex, 1);
    },
    addProduct: (state, action) => {
      const productExist = state.productsInCart.find(
        (product) => product.id === action.payload.id
      );
      productExist
        ? (productExist.quantity += 1)
        : state.productsInCart.push({ ...action.payload, quantity: 1 });
    },
    clearCart: (state) => {
      state.productsInCart = [];
    },
    countTotalSum: (state) => {
      const total = state.productsInCart.reduce((accum, currentValue) => {
        const isProductOfDay = currentValue.id === 14;
        let currentPrice = currentValue.discont_price
          ? currentValue.discont_price
          : currentValue.price;
        if (isProductOfDay) {
          currentPrice = currentValue.price / 2;
        }
        return currentPrice * currentValue.quantity + accum;
      }, 0);
      state.totalSum = total;
    },
  },
});

export const {
  deleteProduct,
  decreaseProduct,
  addProduct,
  clearCart,
  countTotalSum,
} = cartSlice.actions;
export default cartSlice.reducer;
