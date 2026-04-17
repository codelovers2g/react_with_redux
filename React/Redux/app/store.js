/**
 * Latest Version Used: Redux Toolkit 2.11.2, React 19.2.5
 * File Purpose: Root Store Configuration using Modern RTK 2.0 Patterns
 */

import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../features/products/productsApi';
import { cartSlice } from '../features/cart/cartSlice';

// RTK 2.0: combineSlices allows for dynamic injection and better modularity
// It automatically handles combining the reducers and the namespacing
const rootReducer = combineSlices(
  productsApi,
  cartSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    }).concat(productsApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
