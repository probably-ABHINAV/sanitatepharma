import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products — Sanitatepharma',
  description:
    'Browse the complete catalogue of Sanitatepharma pharmaceutical products across therapeutic categories.',
};

export default function ProductsPage() {
  return (
    <div className="pt-20">
      <section className="bg-tealPale py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Products
          </h1>
          <p className="text-textMid text-lg max-w-2xl">
            Explore our comprehensive range of pharmaceutical products designed to improve lives.
          </p>
        </div>
      </section>
    </div>
  );
}
