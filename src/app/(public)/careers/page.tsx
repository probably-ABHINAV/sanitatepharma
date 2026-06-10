import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers — Sanitatepharma',
  description:
    'Join the Sanitatepharma team. Explore career opportunities in pharmaceutical research, manufacturing, marketing, and more.',
};

export default function CareersPage() {
  return (
    <div className="pt-20">
      <section className="bg-tealPale py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Careers
          </h1>
          <p className="text-textMid text-lg max-w-2xl">
            Be part of a team that&apos;s transforming India&apos;s healthcare landscape. Discover opportunities that match your ambition.
          </p>
        </div>
      </section>
    </div>
  );
}
