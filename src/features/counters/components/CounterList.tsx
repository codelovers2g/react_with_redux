import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectAllCounters } from '../counterSelectors';
import { CounterCard } from './CounterCard';

export const CounterList: React.FC = () => {
  const counters = useAppSelector(selectAllCounters);

  if (counters.length === 0) {
    return (
      <div className="empty-state">
        <p>No active counters. Initialize a new engine to begin monitoring.</p>
      </div>
    );
  }

  return (
    <div className="counter-grid">
      {counters.map((counter) => (
        <CounterCard key={counter.id} counter={counter} />
      ))}
    </div>
  );
};
