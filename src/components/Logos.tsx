import React from 'react';

/**
 * Hindusthan Educational and Charitable Trust - HITECH Logo
 */
export const HitechTrustLogo: React.FC<{ className?: string }> = ({ className = "h-14 sm:h-16" }) => {
  return (
    <div className="flex items-center justify-center select-none bg-white rounded p-0.5 border border-gray-200 shadow-md">
      <img
        src="https://res.cloudinary.com/zby2cx5x/image/upload/v1786169601/hitech_fpdf8f.png"
        alt="Hindusthan Trust HITECH Logo"
        referrerPolicy="no-referrer"
        className={`object-contain ${className}`}
      />
    </div>
  );
};

/**
 * Nexora Emblem Badge
 */
export const NexoraBadgeLogo: React.FC<{ className?: string }> = ({ className = "h-14 sm:h-16" }) => {
  return (
    <div className="flex items-center justify-center select-none bg-black rounded border border-cyan-500/50 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.35)]">
      <img
        src="https://res.cloudinary.com/zby2cx5x/image/upload/v1786169595/nexora_yyhcom.jpg"
        alt="Nexora Emblem Logo"
        referrerPolicy="no-referrer"
        className={`object-contain ${className}`}
      />
    </div>
  );
};


