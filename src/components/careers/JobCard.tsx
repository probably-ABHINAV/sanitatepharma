'use client';

import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { ApplicationModal } from '@/components/careers/ApplicationModal';

interface JobCardProps {
  title: string;
  location: string;
  department: string;
  type: string;
}

export function JobCard({ title, location, department, type }: JobCardProps) {
  return (
    <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-gray-100 shadow-sm hover:border-teal/30 hover:shadow-card transition-all group flex flex-col h-full">
      
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="px-3 py-1 bg-tealPale text-teal text-xs font-bold uppercase tracking-wider rounded-full">
          {department}
        </span>
        <span className="px-3 py-1 bg-offWhite text-textMid text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {type}
        </span>
      </div>

      <h3 className="font-display font-bold text-xl text-primary mb-4 group-hover:text-teal transition-colors">
        {title}
      </h3>

      <div className="flex items-center gap-2 text-textMid text-sm font-medium mb-8">
        <MapPin className="w-4 h-4 text-gray-400" />
        {location}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <ApplicationModal 
          roleTitle={title}
          department={department}
          trigger={
            <button className="w-full flex items-center justify-between px-6 py-3 bg-offWhite hover:bg-teal group-hover:text-white text-primary font-bold uppercase tracking-wider text-xs rounded-xl transition-colors duration-300">
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          }
        />
      </div>

    </div>
  );
}
