import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const selectCounterState = (state: RootState) => state.counter;

//createSelector creates memoized selectors, preventing expensive re-calculations if the state hasn't changed.
export const selectAllCounters = createSelector(
  [selectCounterState],
  (counter) => counter.items
);

export const selectCountersCount = createSelector(
  [selectAllCounters],
  (items) => items.length
);

export const selectGlobalTotal = createSelector(
  [selectAllCounters],
  (items) => items.reduce((acc, curr) => acc + curr.value, 0)
);

export const selectMaxCounterValue = createSelector(
  [selectAllCounters],
  (items) => {
    if (items.length === 0) return 0;
    return Math.max(...items.map((item) => item.value));
  }
);

export const selectMinCounterValue = createSelector(
  [selectAllCounters],
  (items) => {
    if (items.length === 0) return 0;
    return Math.min(...items.map((item) => item.value));
  }
);

export const selectAverageCounterValue = createSelector(
  [selectGlobalTotal, selectCountersCount],
  (total, count) => {
    if (count === 0) return 0;
    return parseFloat((total / count).toFixed(2));
  }
);

export const selectDashboardSummary = createSelector(
  [
    selectGlobalTotal,
    selectCountersCount,
    selectMaxCounterValue,
    selectMinCounterValue,
    selectAverageCounterValue,
  ],
  (total, count, max, min, avg) => ({
    total,
    count,
    max,
    min,
    avg,
  })
);
