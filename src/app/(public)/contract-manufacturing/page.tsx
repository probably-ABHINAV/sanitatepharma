import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contract Manufacturing — Sanitatepharma',
  description:
    'Leverage Sanitatepharma\'s state-of-the-art manufacturing facilities for third-party pharma manufacturing with WHO-GMP certified plants.',
};

export default function ContractManufacturingPage() {
  return (
    <div className="pt-20">
      <section className="bg-tealPale py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Contract Manufacturing
          </h1>
          <p className="text-textMid text-lg max-w-2xl">
            World-class third-party manufacturing services with WHO-GMP certified facilities and end-to-end quality assurance.
          </p>
        </div>
      </section>
    </div>
  );
}
