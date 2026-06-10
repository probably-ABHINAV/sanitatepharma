'use client';

import { useState } from 'react';
import { JobCard } from '@/components/careers/JobCard';

const JOBS = [
  { id: 1, title: 'Area Sales Manager', location: 'Patna', department: 'Sales', type: 'Full-time' },
  { id: 2, title: 'Production Chemist', location: 'Haridwar', department: 'Manufacturing', type: 'Full-time' },
  { id: 3, title: 'QA Officer', location: 'Haridwar', department: 'Manufacturing', type: 'Full-time' },
  { id: 4, title: 'Business Development Manager', location: 'Delhi', department: 'Sales', type: 'Full-time' },
  { id: 5, title: 'Regulatory Affairs Executive', location: 'Delhi', department: 'R&D', type: 'Full-time' },
  { id: 6, title: 'Digital Marketing Executive', location: 'Delhi', department: 'Marketing', type: 'Full-time' },
  { id: 7, title: 'Full Stack Developer', location: 'Remote', department: 'IT', type: 'Full-time' },
  { id: 8, title: 'Finance Executive', location: 'Delhi', department: 'Finance', type: 'Full-time' },
];

const CATEGORIES = ['All', 'Sales', 'Manufacturing', 'R&D', 'Finance', 'IT', 'Marketing'];

export function OpenPositions() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredJobs = activeCategory === 'All' 
    ? JOBS 
    : JOBS.filter(job => job.department === activeCategory);

  return (
    <div id="roles" className="scroll-mt-32">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-textMid border border-gray-100 hover:border-teal/30 hover:text-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
              <JobCard {...job} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[32px] border border-gray-100">
          <p className="text-textMid text-lg font-medium">No open positions currently available in {activeCategory}.</p>
        </div>
      )}
    </div>
  );
}
