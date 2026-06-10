'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for full loop
  className?: string;
  itemClassName?: string;
}

export function Marquee({ 
  items, 
  speed = 40,
  className = '',
  itemClassName = ''
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 2);
    }
  }, [items]);

  const style = shouldReduceMotion 
    ? {} 
    : {
        '--marquee-duration': `${speed}s`,
        animation: 'marquee var(--marquee-duration) linear infinite',
      } as React.CSSProperties;

  // Duplicate items for seamless looping
  const displayItems = [...items, ...items];

  return (
    <div className={`overflow-hidden flex items-center group relative ${className}`}>
      
      {/* Adding a global style block just for this specific animation since standard tailwind doesn't have an infinite seamless marquee natively configured without tailwind.config.js modifications */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />

      <div 
        ref={containerRef}
        className="flex shrink-0 w-max group-hover:[animation-play-state:paused]"
        style={style}
      >
        {displayItems.map((item, index) => (
          <div key={index} className={`shrink-0 ${itemClassName}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
