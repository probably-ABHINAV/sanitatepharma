import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { CatalogDocument } from '@/components/pdf/CatalogDocument';
import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch active products with their categories
    const { data: productsData, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('status', 'active')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching products for PDF:', error);
      return NextResponse.json({ error: 'Failed to fetch catalog data' }, { status: 500 });
    }

    const products = (productsData || []) as Product[];

    // Render the PDF to a Node.js stream
    const stream = await renderToStream(<CatalogDocument products={products} />);

    // Create a standard Web stream from the Node.js stream to pass to NextResponse
    const webStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
    });

    return new NextResponse(webStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="sanitatepharma-catalog.pdf"',
      },
    });
  } catch (err) {
    console.error('PDF Generation Error:', err);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
