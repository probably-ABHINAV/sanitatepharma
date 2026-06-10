import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Franchise Opportunities — Sanitatepharma',
  description:
    'Partner with Sanitatepharma through our PCD Pharma Franchise program. Low investment, high returns, and comprehensive support.',
};

export default function FranchisePage() {
  return (
    <div className="pt-20">
      <section className="bg-tealPale py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Franchise Opportunities
          </h1>
          <p className="text-textMid text-lg max-w-2xl">
            Join India&apos;s fastest-growing pharmaceutical network. Start your own business with our PCD Pharma Franchise model.
          </p>
        </div>
      </section>
    </div>
  );
}
