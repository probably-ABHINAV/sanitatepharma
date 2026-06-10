import { createClient } from '@/lib/supabase/server';
import { AnimatedCounter } from '@/components/about/AnimatedCounter';
import { LeadershipCard } from '@/components/about/LeadershipCard';
import { ScrollFade } from '@/components/about/ScrollFade';
import { ShieldCheck, Heart, Users, Target, Lightbulb, CheckCircle2, Award } from 'lucide-react';
import type { TeamMember } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Sanitatepharma',
  description: 'Learn about Sanitatepharma\'s mission to deliver quality medicine, our leadership team, and our commitment to accessible healthcare.',
};

export default async function AboutPage() {
  const supabase = await createClient();

  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_leadership', true)
    .order('sort_order');

  const leaders = (teamMembers || []) as TeamMember[];

  return (
    <main className="flex flex-col w-full overflow-hidden bg-offWhite pt-24">
      
      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-teal/20 to-transparent opacity-50" />
        <div className="max-w-[1000px] mx-auto px-4 text-center relative z-10">
          <ScrollFade>
            <span className="inline-block text-tealLight text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              Our Story
            </span>
          </ScrollFade>
          <ScrollFade delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white mb-8 leading-[1.1]">
              Years of Healing,<br />Growing, Delivering
            </h1>
          </ScrollFade>
          <ScrollFade delay={0.2}>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              At Sanitatepharma, we believe that health is a fundamental right. For over 15 years, we have been dedicated to researching, developing, and manufacturing high-quality pharmaceuticals that improve and save lives across India.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-24 bg-white" id="who-we-are">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Image */}
            <ScrollFade direction="left">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-[32px] overflow-hidden border border-gray-100 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent z-10 mix-blend-multiply" />
                <img 
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=90&w=1600" 
                  alt="Modern pharmaceutical facility" 
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollFade>
            
            {/* Right Content */}
            <ScrollFade direction="right">
              <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                Who We Are
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-6">
                A Legacy of Trust and Excellence
              </h2>
              <div className="space-y-4 text-textMid leading-relaxed mb-8">
                <p>
                  Sanitate Pharma is a rapidly growing pharmaceutical company committed to delivering high-quality, affordable, and innovative healthcare solutions. We focus on improving patient outcomes through scientifically backed medicines, ethical business practices, and strong healthcare partnerships.
                </p>
                <p>
                  With a vision to make quality healthcare accessible to every individual, Sanitate Pharma works closely with healthcare professionals, distributors, and institutions to provide reliable pharmaceutical products across multiple therapeutic segments.
                </p>
                <p>
                  Our commitment to quality, integrity, and patient well-being drives every aspect of our business, from product development and manufacturing to distribution and customer support.
                </p>
              </div>

              {/* Value Pills */}
              <div className="flex flex-wrap gap-3">
                {['Innovation Driven', 'Patient Centric', 'Quality Assured'].map((value) => (
                  <span key={value} className="px-4 py-2 bg-tealPale text-teal text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {value}
                  </span>
                ))}
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="py-24 bg-offWhite" id="vision-mission">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollFade delay={0.1}>
              <div className="bg-primary rounded-[32px] p-10 sm:p-14 h-full flex flex-col items-start justify-center relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <Target className="w-12 h-12 text-tealLight mb-8" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">Our Vision</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  To become a trusted pharmaceutical brand recognized for quality, innovation, and commitment to improving healthcare outcomes across India.
                </p>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.2}>
              <div className="bg-teal rounded-[32px] p-10 sm:p-14 h-full flex flex-col items-start justify-center relative overflow-hidden shadow-xl">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                <Lightbulb className="w-12 h-12 text-white mb-8" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">Our Mission</h2>
                <ul className="text-white/90 text-lg leading-relaxed space-y-2 list-disc pl-5">
                  <li>To provide safe, effective, and affordable medicines.</li>
                  <li>To build long-term relationships with healthcare professionals and patients.</li>
                  <li>To uphold the highest standards of quality and regulatory compliance.</li>
                  <li>To continuously expand our product portfolio to meet evolving healthcare needs.</li>
                  <li>To contribute towards a healthier society through ethical pharmaceutical practices.</li>
                </ul>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ── KEY NUMBERS ── */}
      <section className="py-20 bg-tealPale border-y border-teal/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 divide-x-0 lg:divide-x divide-teal/20">
            <AnimatedCounter value={500} suffix="+" label="Products" />
            <AnimatedCounter value={15} suffix="+" label="Years of Excellence" />
            <AnimatedCounter value={50000} suffix="+" label="Stockists" />
            <AnimatedCounter value={25} suffix="+" label="States Covered" />
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP TEAM ── */}
      <section className="py-24 bg-white" id="leadership">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-16">
            <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              The People Behind The Mission
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-textMid max-w-2xl mx-auto">
              Guided by experience and driven by passion, our leadership team ensures that Sanitatepharma stays true to its core values while navigating the future of healthcare.
            </p>
          </ScrollFade>

          {leaders.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((leader, i) => (
                <ScrollFade key={leader.id} delay={i * 0.1}>
                  <LeadershipCard member={leader} />
                </ScrollFade>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-offWhite rounded-[24px] border border-gray-100">
               <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
               <p className="text-textMid font-semibold">Leadership team profiles are being updated.</p>
             </div>
          )}
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="py-24 bg-offWhite" id="values">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Core Values
            </h2>
          </ScrollFade>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, title: 'Quality', desc: 'We maintain stringent quality standards at every stage of our operations.' },
              { icon: <CheckCircle2 className="w-8 h-8" />, title: 'Integrity', desc: 'We conduct business with transparency, honesty, and ethical responsibility.' },
              { icon: <Lightbulb className="w-8 h-8" />, title: 'Innovation', desc: 'We embrace continuous improvement and scientific advancement.' },
              { icon: <Heart className="w-8 h-8" />, title: 'Patient First', desc: 'Every decision we make is centered around improving patient health and well-being.' },
              { icon: <Users className="w-8 h-8" />, title: 'Commitment', desc: 'We strive for excellence in products, services, and customer satisfaction.' },
            ].map((val, i) => (
              <ScrollFade key={val.title} delay={i * 0.1}>
                <div className="bg-white p-10 rounded-[24px] shadow-sm border border-gray-100 text-center h-full">
                  <div className="w-16 h-16 bg-tealPale text-teal rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {val.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl text-primary mb-4">{val.title}</h3>
                  <p className="text-textMid leading-relaxed">{val.desc}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANUFACTURING ── */}
      <section className="py-24 bg-white" id="manufacturing">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <ScrollFade direction="left">
              <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                Excellence in Production
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-6">
                State-of-the-art Manufacturing
              </h2>
              <p className="text-textMid leading-relaxed mb-8">
                Our WHO-GMP compliant facilities are equipped with the latest technology to produce high-volume, high-quality pharmaceuticals across various dosage forms.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'WHO-GMP & ISO 9001:2015 Certified Facilities',
                  'Advanced QA/QC Laboratories with modern instruments',
                  'Stringent environmental & safety controls',
                  'High production capacity for tablets, capsules, syrups, and injectables'
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <span className="text-primary font-medium text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollFade>

            {/* Right Image */}
            <ScrollFade direction="right">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=90&w=600" alt="Lab equipment" className="w-full h-48 object-cover rounded-[20px]" />
                <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=90&w=600" alt="Scientists in lab" className="w-full h-48 object-cover rounded-[20px] mt-8" />
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ── AWARDS & RECOGNITION ── */}
      <section className="py-24 bg-primary overflow-hidden" id="awards">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <ScrollFade>
             <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">
               Awards & Recognition
             </h2>
          </ScrollFade>
        </div>

        {/* Horizontal Scroll / CSS Marquee */}
        <div className="relative w-full flex overflow-x-hidden group">
          <div className="flex animate-marquee-fast gap-6 whitespace-nowrap px-4 group-hover:[animation-play-state:paused]"
               style={{ '--animate-marquee': 'marquee 30s linear infinite' } as React.CSSProperties}>
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex gap-6 shrink-0">
                {[
                  { year: '2023', title: 'Best Emerging Pharma Company' },
                  { year: '2022', title: 'Excellence in Quality Control' },
                  { year: '2021', title: 'Outstanding Contribution to Healthcare' },
                  { year: '2020', title: 'Fastest Growing PCD Franchise' },
                  { year: '2019', title: 'National Healthcare Leadership Award' },
                ].map((award) => (
                  <div key={award.year} className="w-72 bg-white/5 border border-white/10 rounded-[20px] p-8 flex flex-col justify-center items-start shrink-0 hover:bg-white/10 transition-colors">
                    <Award className="w-8 h-8 text-tealLight mb-4" />
                    <span className="text-tealLight font-bold font-display text-2xl mb-2">{award.year}</span>
                    <p className="text-white/90 font-medium whitespace-normal leading-snug">{award.title}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
