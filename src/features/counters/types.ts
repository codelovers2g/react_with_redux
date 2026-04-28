export interface CounterState {
  id: string;
  value: number;
  label: string;
  createdAt: number;
}

export interface CountersSliceState {
  items: CounterState[];
}
