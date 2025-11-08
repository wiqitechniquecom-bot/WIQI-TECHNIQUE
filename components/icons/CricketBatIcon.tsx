
import React from 'react';

const CricketBatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    transform="rotate(-45)"
  >
    <path d="M15.5 12.5l-4 4-1.5-1.5 4-4 1.5 1.5zM12 10.5l-2.5 2.5-1.5-1.5 2.5-2.5 1.5 1.5zM6 21c-1.1 0-2-.9-2-2v-2.5c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5V19c0 1.1-.9 2-2 2z" />
    <path d="M19.34 7.66c.39.39.39 1.02 0 1.41l-8.49 8.49c-.39.39-1.02.39-1.41 0l-1.41-1.41c-.39-.39-.39-1.02 0-1.41L16.5 6.24c.78-.78 2.05-.78 2.83.02z" />
  </svg>
);

export default CricketBatIcon;
