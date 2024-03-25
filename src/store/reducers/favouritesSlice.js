import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favouritesProducts: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    deleteFavouritesItem: (state, action) => {
      state.favouritesProducts = state.favouritesProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },

    addFavouritesItem: (state, action) => {
      if (!state.favouritesProducts) {
        state.favouritesProducts = [];
      }
      const productExist = state.favouritesProducts.find(
        (product) => product.id === action.payload.id
      );
      if (!productExist) {
        state.favouritesProducts.push(action.payload);
      }
    },
  },
});

export const { deleteFavouritesItem, addFavouritesItem } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
