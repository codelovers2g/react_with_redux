/**
 * Latest Version Used: Redux Toolkit 2.11.2, React 19.2.5
 * File Purpose: Shopping Cart Logic using Modern RTK 2.0 Slices & Selectors
 */

import { createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
  status: 'idle',
  error: null,
});

// RTK 2.0 createSlice.selectors & Selector Memoization
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price } = action.payload;
      const existing = state.entities[id];
      if (existing) {
        existing.quantity += 1;
      } else {
        cartAdapter.addOne(state, { ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: cartAdapter.removeOne,
    updateQuantity: cartAdapter.updateOne,
    clearCart: cartAdapter.removeAll,
  },
  // RTK 2.0: Define selectors directly inside the slice!
  // This encapsulates state structure and improves modularity.
  selectors: {
    selectCartItems: (state) => Object.values(state.entities),
    selectCartTotal: createSelector(
      (state) => Object.values(state.entities),
      (items) => items.reduce((total, item) => total + item.price * item.quantity, 0),
      {
        // RTK 2.0: New memoization options
        memoizeOptions: {
          resultEqualityCheck: (a, b) => a === b,
        },
        devModeChecks: { identityFunctionCheck: 'warn' }
      }
    ),
    selectItemCount: (state) => Object.values(state.entities).length,
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const { selectCartItems, selectCartTotal, selectItemCount } = cartSlice.selectors;

export default cartSlice.reducer;
