import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectDashboardSummary } from '../counterSelectors';
import { Card } from '../../../components/ui/Card';
import { Activity, Hash, ArrowUp, ArrowDown, Percent } from 'lucide-react';

export const DashboardSummary: React.FC = () => {
  const { total, count, max, min, avg } = useAppSelector(selectDashboardSummary);

  const metrics = [
    { label: 'Global Total', value: total, icon: Activity, color: 'var(--accent-primary)' },
    { label: 'Active Counters', value: count, icon: Hash, color: 'var(--text-secondary)' },
    { label: 'Peak Value', value: max, icon: ArrowUp, color: 'var(--success)' },
    { label: 'Floor Value', value: min, icon: ArrowDown, color: 'var(--danger)' },
    { label: 'Mean Distribution', value: avg, icon: Percent, color: 'var(--text-primary)' },
  ];

  return (
    <div className="dashboard-summary-grid">
      {metrics.map((metric) => (
        <Card key={metric.label} className="metric-card">
          <div className="metric-content">
            <div className="metric-info">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
            </div>
            <div className="metric-icon-wrapper" style={{ color: metric.color }}>
              <metric.icon size={20} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
