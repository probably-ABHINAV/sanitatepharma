import { ClipboardEdit, MessagesSquare, FileSignature, Rocket } from 'lucide-react';

export function ProcessSteps() {
  const steps = [
    {
      id: 1,
      title: 'Submit Enquiry',
      desc: 'Fill out our franchise application form with your details.',
      icon: <ClipboardEdit className="w-6 h-6" />
    },
    {
      id: 2,
      title: 'Discussion',
      desc: 'Our team will contact you to discuss mutually beneficial terms.',
      icon: <MessagesSquare className="w-6 h-6" />
    },
    {
      id: 3,
      title: 'Agreement & Territory',
      desc: 'Sign the PCD monopoly agreement for your exclusive territory.',
      icon: <FileSignature className="w-6 h-6" />
    },
    {
      id: 4,
      title: 'Launch & Support',
      desc: 'Receive promotional material, training, and start your operations.',
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  return (
    <div className="relative">
      {/* Connecting line for desktop */}
      <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-teal/30 z-0" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full bg-white border-4 border-offWhite shadow-sm flex items-center justify-center text-teal mb-6 group-hover:scale-110 group-hover:border-teal/20 transition-all duration-300 relative">
              {step.icon}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center border-2 border-white shadow-sm">
                {step.id}
              </div>
            </div>
            <h3 className="font-display font-bold text-lg text-primary mb-3">
              {step.title}
            </h3>
            <p className="text-textMid text-sm leading-relaxed max-w-[240px]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
