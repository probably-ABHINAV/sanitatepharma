import { Timeline } from '@/components/manufacturing/Timeline';
import { ManufacturingForm } from '@/components/manufacturing/ManufacturingForm';
import { AnimatedCounter } from '@/components/about/AnimatedCounter';
import { FileDown, MessageSquare, ShieldCheck, CheckCircle2, Factory, Package, Syringe, TestTube, Truck } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contract Manufacturing | Sanitatepharma',
  description: 'Sanitatepharma offers WHO-GMP certified third-party contract manufacturing services for tablets, capsules, liquids, and injectables.',
};

const CAPABILITIES = [
  { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Tablet & Capsule Mfg', desc: 'High-speed rotary presses and fully automated capsule filling lines.' },
  { icon: <TestTube className="w-6 h-6" />, title: 'Liquid Formulations', desc: 'Sterile automated filling and sealing for syrups, suspensions, and drops.' },
  { icon: <Syringe className="w-6 h-6" />, title: 'Injectable Manufacturing', desc: 'Class 100 aseptic filling zones for liquid and dry powder injectables.' },
  { icon: <Package className="w-6 h-6" />, title: 'Topicals', desc: 'Advanced homogenizers for creams, ointments, and gels.' },
  { icon: <Factory className="w-6 h-6" />, title: 'Custom Packaging', desc: 'Alu-Alu, blister, strip packaging, and automated cartoners.' },
  { icon: <Truck className="w-6 h-6" />, title: 'API Sourcing', desc: 'Reliable global procurement of high-quality active pharmaceutical ingredients.' },
];

export default function ContractManufacturingPage() {
  const contractFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What formulations do you manufacture?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We manufacture tablets, capsules, liquid syrups, dry syrups, ointments, creams, gels, injectables, and nutraceutical products."
        }
      },
      {
        "@type": "Question",
        "name": "Is your manufacturing facility WHO-GMP certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our state-of-the-art manufacturing facilities are fully WHO-GMP certified, ISO 9001:2015 compliant, and DCGI approved."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum batch size for contract manufacturing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The minimum batch size depends on the formulation and packaging type. Generally, it starts from 50,000 tablets/capsules or 5,000 bottles for liquids. Please contact us for product-specific details."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Start Contract Manufacturing with Sanitatepharma",
    "description": "Step-by-step guide to begin pharma contract manufacturing with Sanitatepharma",
    "totalTime": "PT4W",
    "step": [
      { "@type": "HowToStep", "name": "Submit Requirement", "text": "Share your product requirements, formulation details and target quantities via enquiry form.", "position": 1 },
      { "@type": "HowToStep", "name": "Formulation Study", "text": "Our R&D team conducts feasibility study and proposes formulation within 2–4 weeks.", "position": 2 },
      { "@type": "HowToStep", "name": "Trial Batch", "text": "Pilot batch produced and shared for approval with full COA documentation.", "position": 3 },
      { "@type": "HowToStep", "name": "Commercial Production", "text": "Full-scale production begins after approval, with quality release and dispatch.", "position": 4 }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.sanitatepharma.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contract Manufacturing",
        "item": "https://www.sanitatepharma.com/contract-manufacturing"
      }
    ]
  };

  return (
    <main className="flex flex-col w-full overflow-hidden bg-offWhite pt-24">
      <JsonLd data={contractFAQSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center">
          <span className="inline-block text-tealLight text-xs font-semibold uppercase tracking-[0.2em] mb-6 border border-tealLight/30 px-4 py-2 rounded-full">
            B2B Manufacturing Partner
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white mb-6 leading-[1.1] max-w-4xl mx-auto">
            Your Trusted Contract Manufacturing Partner
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            GMP-certified · Custom formulations · Scalable capacity
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#enquire" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-tealLight transition-colors duration-300">
              <MessageSquare className="w-4 h-4" />
              Discuss Requirements
            </a>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-white/10 transition-colors duration-300">
              <FileDown className="w-4 h-4" />
              Download Capability Brochure
            </button>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ROW ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-70">
            {['WHO-GMP', 'ISO 9001:2015', 'DCGI Approved', 'FSSAI Certified', 'GLP Compliant', 'cGMP Standard'].map((cert) => (
              <div key={cert} className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal" />
                <span className="font-bold text-primary text-sm uppercase tracking-wider">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-24 bg-offWhite">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              Our Expertise
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              Comprehensive Manufacturing Capabilities
            </h2>
            <p className="text-textMid max-w-2xl mx-auto">
              We offer end-to-end contract manufacturing solutions across a wide range of therapeutic segments and dosage forms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm hover:border-teal/30 transition-colors group">
                <div className="w-12 h-12 bg-offWhite rounded-xl border border-gray-100 flex items-center justify-center text-primary mb-6 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                  {cap.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-primary mb-3">{cap.title}</h3>
                <p className="text-textMid leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANUFACTURING STATS ── */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x-0 lg:divide-x divide-white/10">
            {/* For AnimatedCounter on dark bg, we override colors via tailwind utilities applied to the children inside if possible. 
                Since AnimatedCounter hardcodes 'text-primary' and 'text-textMid', we'll wrap it in a div that resets colors or just manually recreate simple numbers here to ensure visibility on dark bg.
                Actually, AnimatedCounter doesn't let us pass classes. We can use standard numbers for static display, or recreate the logic. Let's use simple numbers. */}
            <div className="text-center">
              <p className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-2">3</p>
              <p className="text-tealLight text-xs font-semibold uppercase tracking-widest">Manufacturing Plants</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-2">500M+</p>
              <p className="text-tealLight text-xs font-semibold uppercase tracking-widest">Tablets / Year</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-2">50+</p>
              <p className="text-tealLight text-xs font-semibold uppercase tracking-widest">Production Lines</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-2">100%</p>
              <p className="text-tealLight text-xs font-semibold uppercase tracking-widest">In-house QC</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
              How We Work
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
              Seamless Process Timeline
            </h2>
            <p className="text-textMid max-w-2xl mx-auto">
              From initial concept to final dispatch, our structured methodology ensures transparency, quality, and on-time delivery.
            </p>
          </div>

          <Timeline />
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section className="py-24 bg-offWhite border-t border-gray-100" id="enquire">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <ManufacturingForm />
        </div>
      </section>

    </main>
  );
}
