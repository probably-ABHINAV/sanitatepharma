import Link from 'next/link';

export function SeoArticle() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-teal">
        <p className="lead text-xl text-textMid mb-8">
          Welcome to Sanitatepharma, India&apos;s premier destination for high-quality <strong>third party pharma contract manufacturing</strong>. Whether you are a marketing company looking to outsource production or an established brand scaling up, we offer seamless end-to-end manufacturing solutions. Below, we answer the most common questions our B2B partners ask.
        </p>

        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          What is the minimum order quantity (MOQ) for manufacturing?
        </h2>
        <p>
          We understand that different partners have different scale requirements. Whether you are launching a pilot batch or ordering commercial-scale production, our state-of-the-art facilities are designed for flexibility. Currently, our exact minimum order quantity (MOQ) is <strong>[NEED: exact MOQ]</strong>. 
        </p>
        <p>
          This ensures that we can maintain our rigorous quality standards while keeping production cost-effective for you. By keeping MOQs reasonable, we support both emerging startups and large pharmaceutical companies in managing their inventory efficiently without overcapitalizing.
        </p>

        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          What product forms do you manufacture?
        </h2>
        <p>
          Sanitatepharma is equipped with versatile, high-capacity production lines. We manufacture <strong>virtually all product forms</strong>, including high-quality Tablets, Capsules, Syrups, Injectables, Ointments, Creams, and Nutraceuticals.
        </p>
        <p>
          Our diverse manufacturing capabilities allow our partners to consolidate their supply chain by relying on a single, trusted manufacturer for their entire product portfolio. Every single batch goes through our strict in-house quality control labs to guarantee efficacy and safety. To see a detailed breakdown of our capabilities, you can browse our full <Link href="/products" className="text-teal font-semibold hover:underline">product catalog</Link>.
        </p>

        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          What is the average lead time for an order?
        </h2>
        <p>
          Time to market is crucial in the pharmaceutical industry. We pride ourselves on a highly optimized supply chain and robust production scheduling. Our average lead time for completing a contract manufacturing order is <strong>30-45 days</strong>.
        </p>
        <p>
          This timeline covers everything from the procurement of premium Active Pharmaceutical Ingredients (APIs) to the final dispatch of the finished, packaged goods. We maintain complete transparency throughout the production cycle so you always know the exact status of your inventory.
        </p>



        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          Do you offer packaging design services?
        </h2>
        <p>
          Yes, we provide comprehensive, end-to-end packaging design services. We understand that in the modern pharmaceutical market, attractive and compliant packaging is just as important as the formulation itself.
        </p>
        <p>
          Our expert design team will work with you to create customized cartons, foils, labels, and blister packs that make your brand stand out while fully complying with all regulatory labeling requirements. We handle the design, printing, and final packing so you receive market-ready products.
        </p>

        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          How can I contact you for contract manufacturing enquiries?
        </h2>
        <p>
          We make partnering with us as simple and transparent as possible. Our dedicated B2B coordination team is ready to discuss your specific formulations, batch sizes, and timelines.
        </p>
        <p>
          The official phone number for contract manufacturing enquiries is: <strong>[NEED: phone number]</strong>.
        </p>
        <p>
          You can reach out to us during business hours to speak directly with an expert. Alternatively, you can use the enquiry form at the bottom of this page or visit our <Link href="/contact" className="text-teal font-semibold hover:underline">contact page</Link>. Let Sanitatepharma be the reliable manufacturing engine behind your brand&apos;s success!
        </p>
      </div>
    </section>
  );
}
