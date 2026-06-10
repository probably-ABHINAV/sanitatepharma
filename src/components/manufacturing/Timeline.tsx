import { MessageSquareText, FlaskConical, FileCheck2, CheckSquare, Factory, PackageCheck } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Requirement Discussion',
    time: '1–3 days',
    desc: 'Detailed discussion on active ingredients, formulation type, batch size, and packaging needs.',
    icon: <MessageSquareText className="w-5 h-5" />
  },
  {
    id: 2,
    title: 'Formulation Study',
    time: '2–4 weeks',
    desc: 'Our R&D team conducts feasibility studies and formulation development.',
    icon: <FlaskConical className="w-5 h-5" />
  },
  {
    id: 3,
    title: 'Regulatory Support',
    time: 'As needed',
    desc: 'Assistance with required documentation and DCGI approvals.',
    icon: <FileCheck2 className="w-5 h-5" />
  },
  {
    id: 4,
    title: 'Trial Batch & Approval',
    time: '1–2 weeks',
    desc: 'Manufacturing of a trial batch for stability testing and client approval.',
    icon: <CheckSquare className="w-5 h-5" />
  },
  {
    id: 5,
    title: 'Commercial Production',
    time: 'Timeline varies',
    desc: 'Full-scale manufacturing in our WHO-GMP certified facilities.',
    icon: <Factory className="w-5 h-5" />
  },
  {
    id: 6,
    title: 'QC Release & Dispatch',
    time: '3–5 days',
    desc: 'Rigorous quality control testing before final dispatch to your warehouse.',
    icon: <PackageCheck className="w-5 h-5" />
  }
];

export function Timeline() {
  return (
    <div className="relative py-12">
      {/* Desktop Horizontal Connecting Line */}
      <div className="hidden lg:block absolute top-[120px] left-[5%] right-[5%] h-1 bg-teal/20" />
      
      {/* Mobile Vertical Connecting Line */}
      <div className="lg:hidden absolute top-12 bottom-12 left-12 w-1 bg-teal/20" />

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10 px-4 sm:px-8 lg:px-0">
        {STEPS.map((step, i) => (
          <div key={step.id} className="relative flex lg:flex-col items-start lg:items-center gap-6 lg:gap-0">
            
            {/* Step Node */}
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white border-4 border-offWhite shadow-sm flex items-center justify-center text-teal lg:mb-6 z-10 relative">
              {step.icon}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {step.id}
              </div>
            </div>

            {/* Step Content */}
            <div className="lg:text-center mt-1 lg:mt-0 pt-2 lg:pt-0">
              <h3 className="font-display font-bold text-base text-primary mb-1">
                {step.title}
              </h3>
              <p className="text-teal text-xs font-bold uppercase tracking-wider mb-2">
                {step.time}
              </p>
              <p className="text-textMid text-xs leading-relaxed max-w-[240px] lg:mx-auto">
                {step.desc}
              </p>
            </div>

            {/* Alternating Zigzag lines (Desktop only visual flair) */}
            <div className={`hidden lg:block absolute top-20 left-1/2 w-px h-12 bg-teal/20 -z-10 ${i % 2 === 0 ? 'translate-y-8' : '-translate-y-[120px]'}`} />

          </div>
        ))}
      </div>
    </div>
  );
}
