import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counters';

// configureStore automatically sets up Redux DevTools and middleware like Redux Thunk by default.
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
