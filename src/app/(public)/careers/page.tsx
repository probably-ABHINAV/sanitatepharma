import { OpenPositions } from '@/components/careers/OpenPositions';
import { Rocket, GraduationCap, MapPin, Heart, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Sanitatepharma',
  description: 'Join Sanitatepharma and build the future of Indian Pharma. Discover open positions, our culture, and why 5,000+ professionals choose to work with us.',
};

const BENEFITS = [
  { icon: <Rocket className="w-6 h-6" />, title: 'Fast-Track Growth', desc: 'Merit-based promotions and clear career pathways to help you achieve your professional goals faster.' },
  { icon: <GraduationCap className="w-6 h-6" />, title: 'Learning & Development', desc: 'Continuous upskilling through regular workshops, certifications, and industry seminars.' },
  { icon: <MapPin className="w-6 h-6" />, title: 'Nationwide Presence', desc: 'Opportunities to work across 25+ states in India, experiencing diverse markets and cultures.' },
  { icon: <Heart className="w-6 h-6" />, title: 'Mission-Driven', desc: 'Every day you work towards our core mission: delivering affordable, high-quality medicine to save lives.' },
];

export default function CareersPage() {
  return (
    <main className="flex flex-col w-full overflow-hidden bg-offWhite pt-24">
      
      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 bg-gradient-to-br from-navy via-primary to-teal overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-10" />
        
        <div className="max-w-[1000px] mx-auto px-4 text-center relative z-10">
          <span className="inline-block text-tealLight text-xs font-semibold uppercase tracking-[0.2em] mb-6 bg-tealLight/10 px-4 py-2 rounded-full border border-tealLight/20">
            Join Our Team
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white mb-6 leading-[1.1]">
            Build the Future of Indian Pharma
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 5,000+ passionate professionals dedicated to our mission of researching, manufacturing, and delivering high-quality medicine to every corner of the country.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#roles" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-offWhite transition-colors duration-300 shadow-xl">
              <Users className="w-4 h-4" />
              See Open Positions
            </a>
            <a href="#culture" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-white/10 transition-colors duration-300">
              Explore Our Culture
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN US ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              Employee Benefits
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              Why Join Sanitatepharma?
            </h2>
            <p className="text-textMid max-w-2xl mx-auto">
              We believe that our people are our greatest asset. We provide an environment that fosters innovation, rewards hard work, and supports your well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="bg-offWhite p-8 rounded-[24px] border border-gray-100 hover:border-teal/30 hover:shadow-card transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-teal mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-primary mb-3">{benefit.title}</h3>
                <p className="text-textMid leading-relaxed text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFE AT SANITATEPHARMA ── */}
      <section className="py-24 bg-tealPale border-y border-teal/10" id="culture">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-6">
              Life at Sanitatepharma
            </h2>
            <p className="text-textMid max-w-3xl mx-auto leading-relaxed text-lg">
              Our culture is rooted in collaboration, respect, and a shared passion for healthcare excellence. From our state-of-the-art manufacturing floors to our dynamic corporate offices, we celebrate diversity and encourage every employee to bring their authentic selves to work. We regularly host team-building retreats, town halls, and wellness programs to ensure our workforce remains inspired and energized.
            </p>
          </div>

          {/* Masonry Grid (CSS columns approach or complex grid) */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team meeting" className="w-full rounded-[24px] shadow-sm break-inside-avoid" />
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" alt="Laboratory work" className="w-full rounded-[24px] shadow-sm break-inside-avoid" />
            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" alt="Corporate office presentation" className="w-full rounded-[24px] shadow-sm break-inside-avoid" />
            <img src="https://images.unsplash.com/photo-1574051833503-490334cd9928?auto=format&fit=crop&q=80&w=800" alt="Annual retreat" className="w-full rounded-[24px] shadow-sm break-inside-avoid" />
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" alt="Developers at work" className="w-full rounded-[24px] shadow-sm break-inside-avoid" />
            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" alt="Scientists collaborating" className="w-full rounded-[24px] shadow-sm break-inside-avoid" />
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              Current Openings
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              Find Your Next Role
            </h2>
            <p className="text-textMid max-w-2xl mx-auto">
              Ready to make an impact? Browse our open positions and find the perfect fit for your skills and career aspirations.
            </p>
          </div>

          <OpenPositions />
          
        </div>
      </section>

    </main>
  );
}
