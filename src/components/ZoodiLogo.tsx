import React from 'react';

interface ZoodiLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  subtitle?: string;
  showSubtitle?: boolean;
}

export const ZoodiLogo: React.FC<ZoodiLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  subtitle = 'COLLECTION',
  showSubtitle = true,
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  }[size];

  // SVG representation of the ZOODI Geometric Z mark
  const ZMark = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconDimensions} shrink-0`}
    >
      {/* Top small accent dots */}
      <circle cx="26" cy="14" r="6.5" fill="#00B4B6" />
      <circle cx="16" cy="20" r="3.5" fill="#FFB703" />
      <circle cx="22" cy="23" r="3.5" fill="#FF5D38" />
      <circle cx="80" cy="11" r="8" fill="#1E2D4A" />
      <circle cx="74" cy="6" r="2.5" fill="#1E2D4A" />

      {/* Top horizontal rounded bar / pill */}
      <rect x="31" y="9" width="38" height="15" rx="7.5" fill="#FFB703" />

      {/* Top right circular badge */}
      <circle cx="73" cy="23" r="14.5" fill="#FFB703" />

      {/* Main thick diagonal teal bar of Z */}
      <path
        d="M55 9H74V22L36 68H18V55L55 9Z"
        fill="#00B4B6"
      />
      <circle cx="28" cy="55" r="7" fill="#00B4B6" />
      <circle cx="64" cy="22" r="7" fill="#00B4B6" />

      {/* Left pink block */}
      <path
        d="M18 31H38V49C38 49 24 50 18 43V31Z"
        fill="#E8317A"
      />

      {/* Bottom left orange rounded quarter */}
      <path
        d="M18 64C18 56 25 53 38 53V65C38 65 38 73 30 73H27C22 73 18 69 18 64Z"
        fill="#FF7A30"
      />

      {/* Bottom center navy rounded petal */}
      <path
        d="M43 56C51 56 55 62 55 73H41V58C41 57 42 56 43 56Z"
        fill="#1E2D4A"
      />

      {/* Bottom right magenta / pink petal */}
      <path
        d="M57 56H78C78 68 67 73 57 73V56Z"
        fill="#E8317A"
      />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{ZMark}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {ZMark}
      <div className="flex flex-col justify-center">
        {/* ZOODI Wordmark with distinct letter colors */}
        <div className="flex items-center font-display font-extrabold tracking-tight leading-none text-xl sm:text-2xl">
          <span style={{ color: '#00B4B6' }}>Z</span>
          <span style={{ color: '#FFB703' }}>O</span>
          <span style={{ color: '#FF7A30' }}>O</span>
          <span style={{ color: '#E8317A' }}>D</span>
          <span style={{ color: variant === 'white' ? '#FFFFFF' : '#1E2D4A' }}>I</span>
        </div>
        {/* Subtitle */}
        {showSubtitle && (
          <div className="flex items-center justify-between text-[7px] sm:text-[8px] font-bold tracking-[0.22em] mt-0.5 uppercase">
            <span className="w-1.5 h-0.5 rounded-full" style={{ backgroundColor: '#00B4B6' }} />
            <span
              className={`px-1 ${
                variant === 'white' ? 'text-slate-300' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {subtitle}
            </span>
            <span className="w-1.5 h-0.5 rounded-full" style={{ backgroundColor: '#E8317A' }} />
          </div>
        )}
      </div>
    </div>
  );
};
