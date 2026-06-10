'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, GraduationCap, Users } from 'lucide-react';

const roles = [
  { title: 'Area Sales Manager', department: 'Sales & Marketing', location: 'Multiple Locations' },
  { title: 'Quality Control Executive', department: 'QA/QC', location: 'Panchkula, Haryana' },
  { title: 'Production Manager', department: 'Manufacturing', location: 'Panchkula, Haryana' },
];

export function CareersTeaser() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* 135deg Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-teal/80" />
      
      {/* Decorative grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <span className="text-tealLight text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                Join Our Team
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Build a Rewarding Career at Sanitatepharma
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                We are always looking for passionate individuals driven by excellence. Discover opportunities to grow, innovate, and make an impact in the healthcare sector.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { icon: <GraduationCap className="w-5 h-5" />, text: 'Continuous Learning & Growth' },
                  { icon: <Users className="w-5 h-5" />, text: 'Collaborative Work Environment' },
                  { icon: <Briefcase className="w-5 h-5" />, text: 'Competitive Compensation' },
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/90 font-medium">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      {perk.icon}
                    </div>
                    {perk.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Job Roles */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-4"
            >
              {roles.map((role, i) => (
                <Link
                  key={role.title}
                  href={`/careers#${role.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-tealLight transition-colors">
                        {role.title}
                      </h3>
                      <div className="flex items-center gap-3 text-white/60 text-xs font-semibold uppercase tracking-wider">
                        <span>{role.department}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{role.location}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-teal group-hover:border-teal transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </Link>
              ))}

              <div className="pt-4 text-right">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 text-tealLight font-semibold uppercase tracking-wider text-sm hover:text-white transition-colors duration-300"
                >
                  See All Openings
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
