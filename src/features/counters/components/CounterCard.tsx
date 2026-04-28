import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { 
  increment, 
  decrement, 
  resetCounter, 
  removeCounter 
} from '../counterSlice';
import type { CounterState } from '../types';
import { Card } from '../../../components/ui/Card';
import { Plus, Minus, RotateCcw, Trash2 } from 'lucide-react';

interface CounterCardProps {
  counter: CounterState;
}

export const CounterCard: React.FC<CounterCardProps> = ({ counter }) => {
  // Using custom hooks like useAppDispatch avoids the need to manually supply the store's Dispatch type everywhere.
  const dispatch = useAppDispatch();

  return (
    <Card className="counter-card">
      <div className="counter-header">
        <span className="counter-label">{counter.label}</span>
        <button 
          className="btn-icon btn-danger-outline"
          onClick={() => dispatch(removeCounter(counter.id))}
          title="Remove Counter"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="counter-display">
        <span className="counter-value">{counter.value}</span>
      </div>

      <div className="counter-controls">
        <button 
          className="btn btn-outline"
          onClick={() => dispatch(decrement(counter.id))}
        >
          <Minus size={16} />
        </button>
        <button 
          className="btn btn-outline"
          onClick={() => dispatch(resetCounter(counter.id))}
          title="Reset"
        >
          <RotateCcw size={16} />
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => dispatch(increment(counter.id))}
        >
          <Plus size={16} />
        </button>
      </div>
    </Card>
  );
};
