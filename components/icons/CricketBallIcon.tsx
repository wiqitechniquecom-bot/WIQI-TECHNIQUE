
import React from 'react';

const CricketBallIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <path d="M12 4c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1zm-2.29 2.29c-.39.39-.39 1.02 0 1.41l5.29 5.29c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L11.12 7.7c-.39-.38-1.03-.38-1.41.01z" />
  </svg>
);

export default CricketBallIcon;
