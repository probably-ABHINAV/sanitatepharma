import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Sanitatepharma',
  description:
    'Get in touch with Sanitatepharma. Reach us for product enquiries, franchise opportunities, or general information.',
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="bg-tealPale py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Contact Us
          </h1>
          <p className="text-textMid text-lg max-w-2xl">
            We&apos;d love to hear from you. Reach out for enquiries, partnerships, or any information.
          </p>
        </div>
      </section>
    </div>
  );
}
