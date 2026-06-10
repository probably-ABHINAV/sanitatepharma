'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { TeamMember } from '@/lib/types';

// Inline SVG since lucide-react removed brand icons
const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export function LeadershipCard({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center overflow-hidden h-[340px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bio Overlay */}
      <AnimatePresence>
        {isHovered && member.bio && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 bg-primary/95 backdrop-blur-sm z-20 p-8 flex flex-col items-center justify-center text-center rounded-[24px]"
          >
            <h3 className="font-display font-bold text-lg text-white mb-1">{member.name}</h3>
            <p className="text-tealLight text-xs uppercase tracking-widest font-semibold mb-4">{member.designation}</p>
            <div className="w-8 h-1 bg-teal mb-6 rounded-full" />
            <p className="text-white/80 text-sm leading-relaxed overflow-y-auto custom-scrollbar pr-2 max-h-[140px]">
              {member.bio}
            </p>
            {member.linkedin_url && (
              <a 
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 bg-white/10 hover:bg-teal w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative w-32 h-32 mb-6 z-10 shrink-0">
        <div className="absolute inset-0 rounded-full border-2 border-teal scale-105 opacity-50 group-hover:scale-110 transition-transform duration-500" />
        <div className="w-full h-full rounded-full border-4 border-white shadow-md overflow-hidden bg-offWhite flex items-center justify-center relative z-10">
          {member.image_url ? (
            <img 
              src={member.image_url} 
              alt={member.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <User className="w-12 h-12 text-gray-300" />
          )}
        </div>
      </div>
      
      <div className="relative z-10 mt-auto flex flex-col justify-end">
        <h3 className="font-display font-bold text-xl text-primary mb-1">{member.name}</h3>
        <p className="text-teal text-xs uppercase tracking-widest font-semibold mb-4">{member.designation}</p>
        
        {member.linkedin_url && !isHovered && (
          <div className="w-8 h-8 rounded-full bg-offWhite flex items-center justify-center text-textMid mx-auto">
            <LinkedinIcon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tealPale rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
