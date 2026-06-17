'use client';

const items = [
  "High-Quality Formulations",
  "Trusted by Doctors",
  "Nationwide Delivery",
  "50,000+ Stockists",
  "50 Products",
];

export function TrustMarquee() {
  return (
    <div className="w-full bg-primary py-4 overflow-hidden flex items-center border-y border-white/10 group">
      <div 
        className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]"
        style={{ '--animate-marquee': 'marquee 40s linear infinite' } as React.CSSProperties}
      >
        {/* Render multiple times to ensure seamless loop */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            {items.map((item, index) => (
              <div key={`${i}-${index}`} className="flex items-center shrink-0">
                <span className="text-white font-display font-bold text-sm tracking-widest uppercase px-8">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-tealLight shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
