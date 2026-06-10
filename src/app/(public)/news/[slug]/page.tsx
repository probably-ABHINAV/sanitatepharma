import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ChevronRight, Calendar, User } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!article) {
    return { title: 'Article Not Found | Sanitatepharma' };
  }

  return {
    title: `${article.title} | Sanitatepharma News`,
    description: article.excerpt || article.title,
    openGraph: {
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

export default async function NewsArticlePage(props: PageProps) {
  const resolvedParams = await props.params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `https://www.sanitatepharma.com/news/${article.slug}#article`,
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image_url,
    "author": {
      "@type": "Organization",
      "@id": "https://www.sanitatepharma.com/#organization"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sanitatepharma",
      "logo": { "@type": "ImageObject", "url": "https://www.sanitatepharma.com/logo.png" }
    },
    "datePublished": article.published_at,
    "dateModified": article.updated_at || article.published_at,
    "mainEntityOfPage": `https://www.sanitatepharma.com/news/${article.slug}`
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
        "name": "News",
        "item": "https://www.sanitatepharma.com/news"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://www.sanitatepharma.com/news/${article.slug}`
      }
    ]
  };

  return (
    <main className="min-h-screen bg-offWhite pt-32 pb-24">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-textMid uppercase tracking-wider mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <Link href="/news" className="hover:text-primary transition-colors">News</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-teal truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 text-sm text-textMid mb-4">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
              <Calendar className="w-4 h-4 text-teal" />
              {new Date(article.published_at).toLocaleDateString('en-IN', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
            {article.author_name && (
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                <User className="w-4 h-4 text-teal" />
                {article.author_name}
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
            {article.title}
          </h1>
        </div>

        {/* Featured Image */}
        {article.image_url && (
          <div className="rounded-[24px] overflow-hidden mb-12 shadow-sm border border-gray-100 bg-white">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-sm border border-gray-100 prose prose-teal max-w-none prose-headings:font-display prose-headings:text-primary prose-p:text-textMid prose-p:leading-relaxed">
          {article.content.split('\n').map((paragraph: string, index: number) => (
             paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>

      </div>
    </main>
  );
}
