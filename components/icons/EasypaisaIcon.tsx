import React from 'react';

const EasypaisaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 40"
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="26"
  >
    <rect width="100" height="40" rx="5" fill="#00A950" />
    <text
      x="50"
      y="25"
      fontFamily="Arial, sans-serif"
      fontSize="16"
      fill="white"
      textAnchor="middle"
      fontWeight="bold"
    >
      easypaisa
    </text>
  </svg>
);

export default EasypaisaIcon;
