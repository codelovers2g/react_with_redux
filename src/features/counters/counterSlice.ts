import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CounterState, CountersSliceState } from './types';

const initialState: CountersSliceState = {
  items: [
    { id: '1', value: 0, label: 'Primary Engine', createdAt: Date.now() },
  ],
};

const createCounter = (existingCount: number): CounterState => ({
  id: crypto.randomUUID(),
  value: 0,
  label: `Counter ${existingCount + 1}`,
  createdAt: Date.now(),
});

// createSlice leverages Immer internally, allowing us to write "mutating" logic that is safely handled as immutable updates.
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addCounter: (state) => {
      state.items.push(createCounter(state.items.length));
    },
    // RTK: PayloadAction<T> provides compile-time type safety for data sent via dispatch, ensuring robust state transitions.
    removeCounter: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increment: (state, action: PayloadAction<string>) => {
      const counter = state.items.find((item) => item.id === action.payload);
      if (counter) counter.value += 1;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const counter = state.items.find((item) => item.id === action.payload);
      if (counter) counter.value -= 1;
    },
    resetCounter: (state, action: PayloadAction<string>) => {
      const counter = state.items.find((item) => item.id === action.payload);
      if (counter) counter.value = 0;
    },
    incrementAll: (state) => {
      state.items.forEach((item) => {
        item.value += 1;
      });
    },
    resetAll: (state) => {
      state.items.forEach((item) => {
        item.value = 0;
      });
    },
    removeAll: (state) => {
      state.items = [];
    },
  },
});

export const {
  addCounter,
  removeCounter,
  increment,
  decrement,
  resetCounter,
  incrementAll,
  resetAll,
  removeAll,
} = counterSlice.actions;

export default counterSlice.reducer;
