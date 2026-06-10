import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Sanitatepharma',
  description:
    'Learn about Sanitatepharma\'s mission, vision, values, and the leadership team driving India\'s healthcare revolution.',
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="bg-tealPale py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            About Sanitatepharma
          </h1>
          <p className="text-textMid text-lg max-w-2xl">
            Building India&apos;s healthcare future through innovation, quality, and accessibility.
          </p>
        </div>
      </section>
    </div>
  );
}
