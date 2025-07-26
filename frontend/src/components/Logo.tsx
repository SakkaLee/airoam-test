import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle with Gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      
      {/* Outer Ring */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      
      {/* Inner Hexagon */}
      <polygon
        points="32,8 44,16 44,32 32,40 20,32 20,16"
        fill="url(#innerGradient)"
        stroke="url(#logoGradient)"
        strokeWidth="1.5"
      />
      
      {/* AI Brain Circuit Pattern */}
      <g stroke="#60A5FA" strokeWidth="1" fill="none" opacity="0.8">
        {/* Circuit Lines */}
        <path d="M26 20 L38 20" />
        <path d="M26 28 L38 28" />
        <path d="M26 36 L38 36" />
        <path d="M32 16 L32 44" />
        
        {/* Circuit Nodes */}
        <circle cx="26" cy="20" r="1.5" fill="#60A5FA" />
        <circle cx="38" cy="20" r="1.5" fill="#60A5FA" />
        <circle cx="26" cy="28" r="1.5" fill="#60A5FA" />
        <circle cx="38" cy="28" r="1.5" fill="#60A5FA" />
        <circle cx="26" cy="36" r="1.5" fill="#60A5FA" />
        <circle cx="38" cy="36" r="1.5" fill="#60A5FA" />
        <circle cx="32" cy="16" r="1.5" fill="#60A5FA" />
        <circle cx="32" cy="44" r="1.5" fill="#60A5FA" />
      </g>
      
      {/* Central AI Symbol */}
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        AI
      </text>
      
      {/* Animated Dots */}
      <circle
        cx="32"
        cy="32"
        r="2"
        fill="#10B981"
        className="animate-ping"
        style={{ animationDelay: '0s' }}
      />
      <circle
        cx="32"
        cy="32"
        r="1"
        fill="#10B981"
        className="animate-ping"
        style={{ animationDelay: '0.5s' }}
      />
    </svg>
  );
};

export default Logo; 