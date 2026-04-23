import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { 
  addCounter, 
  resetAll, 
  incrementAll, 
  removeAll 
} from '../counterSlice';
import { Plus, RotateCcw, TrendingUp, XCircle } from 'lucide-react';

export const GlobalControls: React.FC = () => {
  // useAppDispatch is a custom hook providing a pre-typed dispatch function, ensuring type safety without manual casting.
  const dispatch = useAppDispatch();

  return (
    <div className="global-controls">
      <div className="control-group">
        <button 
          className="btn btn-primary"
          onClick={() => dispatch(addCounter())}
        >
          <Plus size={18} />
          New Counter
        </button>
        <button 
          className="btn btn-outline"
          onClick={() => dispatch(incrementAll())}
        >
          <TrendingUp size={18} />
          Increment All
        </button>
      </div>

      <div className="control-group">
        <button 
          className="btn btn-outline"
          onClick={() => dispatch(resetAll())}
        >
          <RotateCcw size={18} />
          Reset All
        </button>
        <button 
          className="btn btn-danger-outline"
          onClick={() => dispatch(removeAll())}
        >
          <XCircle size={18} />
          Clear Workspace
        </button>
      </div>
    </div>
  );
};
