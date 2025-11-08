
import React from 'react';

const CoinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5a.75.75 0 001.5 0v-1.5h1.5a.75.75 0 000-1.5h-1.5v-1.5h1.5a.75.75 0 000-1.5h-1.5V9h1.5a.75.75 0 000-1.5h-1.5V6z" clipRule="evenodd" />
  </svg>
);

export default CoinIcon;
