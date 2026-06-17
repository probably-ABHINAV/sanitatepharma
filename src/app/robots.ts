import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Define your website's main URL (fallback to localhost for development)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanitatepharma.com';

  return {
    rules: [
      {
        // General rules for standard search engines (Google, Bing, etc.)
        userAgent: '*',
        allow: '/', // Allow crawling the whole site by default
        disallow: ['/admin', '/api/'], // But block the admin panel and background API routes
      },
      {
        // Explicitly welcome popular AI bots to read your site for their answers
        userAgent: ['GPTBot', 'Google-Extended', 'PerplexityBot', 'ClaudeBot'],
        allow: '/',
      },
    ],
    // Tell crawlers exactly where to find your map of pages
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
