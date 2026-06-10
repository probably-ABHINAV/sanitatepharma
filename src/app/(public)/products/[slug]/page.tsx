import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ImageGallery } from '@/components/products/ImageGallery';
import { ProductTabs } from '@/components/products/ProductTabs';
import { EnquiryModal } from '@/components/products/EnquiryModal';
import { ProductCard } from '@/components/products/ProductCard';
import { ChevronRight, FileDown, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';
import type { Product } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!product) {
    return { title: 'Product Not Found | Sanitatepharma' };
  }

  return {
    title: `${product.name} | Sanitatepharma`,
    description: `${product.composition || ''} - ${product.indications || ''}`.slice(0, 160),
    openGraph: {
      images: product.images && product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export async function generateStaticParams() {
  // Can't use createClient with cookies here during build, need an admin client or anonymous client
  // But for simple static params, we can just use standard fetch or a server-only client without cookies.
  // We'll skip pre-rendering if NEXT_PUBLIC_SUPABASE_URL isn't fully ready at build time,
  // or we can safely return empty array and let Next.js dynamically generate on first request.
  
  // Here we'll return an empty array to allow dynamic generation on first request
  // This is safer for Supabase SSR setups
  return [];
}

export default async function ProductDetailPage(props: PageProps) {
  const resolvedParams = await props.params;
  const supabase = await createClient();

  // 1. Fetch Product
  const { data: productData } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!productData) {
    notFound();
  }

  const product = productData as Product;
  const isRx = product.prescription_type === 'rx';

  // 2. Fetch Related Products
  let relatedProducts: Product[] = [];
  if (product.category_id) {
    const { data: relatedData } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('category_id', product.category_id)
      .neq('id', product.id)
      .eq('status', 'active')
      .limit(4);
      
    if (relatedData) {
      relatedProducts = relatedData as Product[];
    }
  }

  return (
    <div className="min-h-screen bg-offWhite pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-textMid uppercase tracking-wider mb-8 overflow-x-auto whitespace-nowrap custom-scrollbar pb-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              <Link href={`/products?category=${product.category.slug}`} className="hover:text-primary transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-teal">{product.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-[32px] p-6 lg:p-12 shadow-sm border border-gray-100 mb-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Image Gallery (40% -> col-span-5) */}
            <div className="lg:col-span-5">
              <ImageGallery images={product.images || []} alt={product.name} />
            </div>

            {/* Right: Product Info (60% -> col-span-7) */}
            <div className="lg:col-span-7">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  isRx ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
                }`}>
                  {isRx ? 'Prescription (Rx)' : 'Over-The-Counter (OTC)'}
                </span>
                {product.category && (
                  <span className="px-3 py-1 bg-tealPale text-teal text-xs font-bold uppercase tracking-wider rounded-full">
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* Title & Composition */}
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
                {product.name}
              </h1>
              
              {product.composition && (
                <p className="text-teal font-bold text-lg mb-6 leading-relaxed">
                  {product.composition}
                </p>
              )}

              {/* Meta details */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {product.pack_size && (
                  <div className="bg-offWhite p-4 rounded-xl border border-gray-100">
                    <span className="block text-[10px] font-bold text-textMid uppercase tracking-wider mb-1">Pack Size</span>
                    <span className="font-semibold text-primary">{product.pack_size}</span>
                  </div>
                )}
                {product.dosage && (
                  <div className="bg-offWhite p-4 rounded-xl border border-gray-100">
                    <span className="block text-[10px] font-bold text-textMid uppercase tracking-wider mb-1">Dosage Form</span>
                    <span className="font-semibold text-primary">{product.dosage}</span>
                  </div>
                )}
              </div>

              {/* Short Description (Using indications snippet if no explicit desc) */}
              <p className="text-textMid leading-relaxed mb-10 border-b border-gray-100 pb-10">
                {product.indications ? product.indications.split('\n')[0] : 'High-quality pharmaceutical formulation by Sanitatepharma.'}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <EnquiryModal 
                  productName={product.name}
                  trigger={
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-primary transition-colors duration-300 shadow-card">
                      <MessageSquare className="w-4 h-4" />
                      Enquire About This Product
                    </button>
                  }
                />
                
                {product.brochure_url && (
                  <a 
                    href={product.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border-2 border-teal text-teal font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-tealPale transition-colors duration-300"
                  >
                    <FileDown className="w-4 h-4" />
                    Download Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Detail Tabs */}
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-primary mb-8 border-l-4 border-teal pl-4">
              You may also be interested in
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
