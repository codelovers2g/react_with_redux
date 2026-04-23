import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`ui-card ${className}`}>
      {title && <div className="ui-card-header">{title}</div>}
      <div className="ui-card-body">{children}</div>
    </div>
  );
};
