import Link from 'next/link';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  const isRx = product.prescription_type === 'rx';

  return (
    <div className="group bg-white rounded-card border border-gray-100 overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
      {/* Rx/OTC Badge */}
      <div className={`absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border ${
        isRx 
          ? 'bg-red-50 text-red-600 border-red-100' 
          : 'bg-green-50 text-green-600 border-green-100'
      }`}>
        {isRx ? 'Rx' : 'OTC'}
      </div>

      {/* Image Container */}
      <div className="h-[140px] sm:h-[200px] w-full bg-white border-b border-gray-50 flex items-center justify-center p-3 sm:p-6 relative overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="flex flex-col items-center text-gray-300 group-hover:scale-105 transition-transform duration-500">
            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-6 flex flex-col flex-1">
        {/* Category Pill */}
        {product.category?.name && (
          <span className="hidden sm:inline-block w-fit px-2.5 py-1 bg-tealPale text-teal text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
            {product.category.name}
          </span>
        )}
        
        <h3 className="font-display text-sm sm:text-[15px] font-bold text-primary mb-1 sm:mb-2 group-hover:text-teal transition-colors leading-tight">
          {product.name}
        </h3>
        
        {product.composition && (
          <p className="hidden sm:block text-textMid text-xs italic mb-4 line-clamp-2 leading-relaxed">
            {product.composition}
          </p>
        )}
        
        <div className="mt-auto pt-2 sm:pt-4 flex items-center justify-between border-t border-gray-50">
          <span className="text-[10px] sm:text-xs font-medium text-gray-500 truncate max-w-[60px] sm:max-w-none">
            {product.pack_size || 'Std'}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-teal text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:text-primary transition-colors whitespace-nowrap py-1"
          >
            Details
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
