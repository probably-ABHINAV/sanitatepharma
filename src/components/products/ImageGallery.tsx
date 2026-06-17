'use client';

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-offWhite rounded-[24px] border border-gray-100 flex flex-col items-center justify-center text-gray-300 p-8 text-center">
        <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
        <span className="text-xs font-bold uppercase tracking-widest text-textMid">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-square bg-white rounded-[24px] border border-teal/10 shadow-sm overflow-hidden flex items-center justify-center p-8 group relative">
        <Image 
          src={images[activeIdx]} 
          alt={`${alt} - view ${activeIdx + 1}`} 
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out p-8"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-20 h-20 shrink-0 bg-white rounded-xl border p-2 flex items-center justify-center overflow-hidden transition-all duration-200 ${
                activeIdx === idx 
                  ? 'border-teal ring-1 ring-teal shadow-sm' 
                  : 'border-gray-100 hover:border-teal/50 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-full h-full relative">
                <Image 
                  src={img} 
                  alt={`Thumbnail ${idx + 1} for ${alt}`} 
                  fill
                  sizes="80px"
                  className="object-contain mix-blend-multiply p-1"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
