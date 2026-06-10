'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ value, label, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 2500, // 2.5s duration
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      motionValue.set(value);
      setHasAnimated(true);
    }
  }, [inView, motionValue, value, hasAnimated]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl lg:text-5xl font-extrabold text-primary mb-2">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </p>
      <p className="text-textMid text-xs font-semibold uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}
