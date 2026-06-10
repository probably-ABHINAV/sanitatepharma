export function AppLogo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className || "w-8 h-8"}
    >
      <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" className="text-teal" />
      <rect x="6.5" y="8" width="2.5" height="8" rx="1.25" fill="currentColor" className="text-tealLight" />
      <rect x="10.75" y="8" width="2.5" height="8" rx="1.25" fill="currentColor" className="text-tealLight" />
      <rect x="15" y="8" width="2.5" height="8" rx="1.25" fill="currentColor" className="text-tealLight" />
    </svg>
  );
}
