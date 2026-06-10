import { FranchiseForm } from '@/components/franchise/FranchiseForm';
import { ProcessSteps } from '@/components/franchise/ProcessSteps';
import { FAQ } from '@/components/franchise/FAQ';
import { FileDown, MapPin, TrendingUp, Handshake, Box, Star, GraduationCap, Building2, UserCircle2, Truck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PCD Pharma Franchise | Sanitatepharma',
  description: 'Partner with Sanitatepharma. Start your PCD Pharma Franchise business with monopoly rights, high margins, and extensive marketing support.',
};

const BENEFITS = [
  { icon: <MapPin className="w-6 h-6" />, title: 'Exclusive Territory', desc: '100% monopoly rights in your designated district.' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'High Margins', desc: 'Competitive pricing ensuring excellent ROI and profitability.' },
  { icon: <Star className="w-6 h-6" />, title: 'Marketing Support', desc: 'Free visual aids, LBLs, MR bags, and promotional gifts.' },
  { icon: <Truck className="w-6 h-6" />, title: 'Timely Supply', desc: 'Ready stock availability and dispatch within 24 hours.' },
  { icon: <Building2 className="w-6 h-6" />, title: 'Established Brand', desc: 'Leverage our 15+ years of market presence and trust.' },
  { icon: <GraduationCap className="w-6 h-6" />, title: 'Training & Onboarding', desc: 'Comprehensive product training for your sales team.' },
];

const SEGMENTS = [
  'General Medicine', 'Cardiac & Diabetic', 'Gynecology', 
  'Pediatrics', 'Dermatology', 'Neuropsychiatry'
];

export default function FranchisePage() {
  return (
    <main className="flex flex-col w-full overflow-hidden bg-offWhite pt-24">
      
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-20 bg-gradient-to-br from-navy via-primary to-teal overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="text-left">
              <span className="inline-block text-tealLight text-xs font-semibold uppercase tracking-[0.2em] mb-6 bg-tealLight/10 px-4 py-2 rounded-full border border-tealLight/20">
                PCD Pharma Franchise
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white mb-6 leading-[1.1]">
                Partner With Sanitatepharma — Grow Your Business
              </h1>
              <p className="text-white/80 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
                Join India's fastest-growing pharmaceutical franchise network. Secure monopoly rights in your district and build a highly profitable business with our WHO-GMP certified product range.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#apply" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-offWhite transition-colors duration-300">
                  <Handshake className="w-4 h-4" />
                  Apply Now
                </a>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-white/10 transition-colors duration-300">
                  <FileDown className="w-4 h-4" />
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Right: Quick Form or Illustration */}
            <div className="hidden lg:flex justify-end">
              <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-[32px] border border-white/20 p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">High ROI</h3>
                    <p className="text-white/70 text-sm">Low investment required</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    '500+ High-Quality Products',
                    '100% Monopoly Rights',
                    'Same-Day Dispatch',
                    'Free Promotional Input'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90">
                      <div className="w-2 h-2 rounded-full bg-tealLight" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY SANITATEPHARMA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              Why Choose Our Franchise?
            </h2>
            <p className="text-textMid max-w-2xl mx-auto">
              We provide an ecosystem of support designed to ensure our franchise partners succeed and dominate their local markets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="bg-offWhite p-8 rounded-[24px] border border-gray-100 hover:border-teal/30 hover:shadow-card transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-teal mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-primary mb-3">{benefit.title}</h3>
                <p className="text-textMid leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-tealPale border-y border-teal/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-textMid max-w-2xl mx-auto">
              Starting your own PCD Pharma Franchise is simple and straightforward.
            </p>
          </div>
          
          <ProcessSteps />
        </div>
      </section>

      {/* ── SEGMENTS & REQUIREMENTS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Requirements */}
            <div>
              <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                Prerequisites
              </span>
              <h2 className="font-display text-3xl font-bold text-primary mb-8">
                What You Need To Start
              </h2>
              
              <div className="bg-offWhite rounded-[24px] border border-gray-100 p-8 mb-8">
                <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                  <Box className="w-5 h-5 text-teal" /> Investment Requirements
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-textMid font-medium">Initial Working Capital</span>
                    <span className="font-bold text-primary">₹2L - ₹5L</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-textMid font-medium">Storage Space</span>
                    <span className="font-bold text-primary">Min. 100 sq.ft</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-textMid font-medium">Drug License (DL)</span>
                    <span className="font-bold text-primary">Required (20B & 21B)</span>
                  </div>
                </div>
              </div>

              <div className="bg-offWhite rounded-[24px] border border-gray-100 p-8">
                <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                  <UserCircle2 className="w-5 h-5 text-teal" /> Who Can Apply?
                </h3>
                <ul className="space-y-3">
                  {['Medical Representatives with 3+ years experience', 'Wholesalers and Distributors', 'Pharmacists with entrepreneurial spirit', 'Individuals with strong doctor networks'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-textMid font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Segments */}
            <div>
              <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                Product Range
              </span>
              <h2 className="font-display text-3xl font-bold text-primary mb-8">
                Targeted Franchise Segments
              </h2>
              <p className="text-textMid leading-relaxed mb-8">
                You can choose to take a franchise for our entire product range or specialize in specific high-growth therapeutic segments based on your local market demand.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {SEGMENTS.map((segment) => (
                  <div key={segment} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-teal transition-colors flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tealPale flex items-center justify-center text-teal font-bold shrink-0">
                      +
                    </div>
                    <span className="font-bold text-primary">{segment}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM & FAQ ── */}
      <section className="py-24 bg-offWhite" id="apply">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Form */}
            <div className="lg:col-span-7">
              <FranchiseForm />
            </div>

            {/* Right: FAQ */}
            <div className="lg:col-span-5">
              <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                Knowledge Base
              </span>
              <h2 className="font-display text-3xl font-bold text-primary mb-8">
                Frequently Asked Questions
              </h2>
              <FAQ />
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
