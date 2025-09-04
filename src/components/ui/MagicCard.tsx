import React, { memo } from 'react';
import { ParticleCard } from './MagicBento';

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  particleCount?: number;
  disableStars?: boolean;
  disableAnimations?: boolean;
}

const MagicCard: React.FC<MagicCardProps> = memo(({
  children,
  className = "",
  glowColor = "0, 200, 255", // updated cyan blue color
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  particleCount = 8,
  disableStars = false,
  disableAnimations = false,
}) => {
  // If stars are disabled, just return children with className
  if (disableStars) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
  
  return (
    <ParticleCard
      className={`${className} card--border-glow`}
      glowColor={glowColor}
      enableTilt={enableTilt}
      enableMagnetism={enableMagnetism}
      clickEffect={clickEffect}
      particleCount={particleCount}
      disableAnimations={disableAnimations}
    >
      {children}
    </ParticleCard>
  );
};

});

export default MagicCard;
