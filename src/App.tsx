import React from 'react';
import { DashboardSummary, CounterList, GlobalControls } from './features/counters';
import { Layout } from 'lucide-react';

const App: React.FC = () => {
  return (
    <main className="dashboard-container">
      <header className="app-header">
        <div className="brand">
          <Layout className="brand-icon" size={24} />
          <h1>Counter Engine</h1>
        </div>
        <div className="status">
          <span className="status-indicator"></span>
          Live State Active
        </div>
      </header>

      <DashboardSummary />
      
      <section className="workspace">
        <GlobalControls />
        <CounterList />
      </section>
    </main>
  );
};

export default App;
