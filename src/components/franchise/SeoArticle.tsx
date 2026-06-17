import Link from 'next/link';

export function SeoArticle() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-teal">
        <p className="lead text-xl text-textMid mb-8">
          Welcome to Sanitatepharma, your trusted partner for launching a successful <strong>PCD pharma franchise</strong> in India. If you are looking to enter the pharmaceutical sector or expand your existing distribution network, we offer an incredible opportunity to grow with a modern, high-quality manufacturing company. Below, we answer the most common questions our prospective franchise partners ask.
        </p>

        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          What is the minimum investment for a PCD pharma franchise?
        </h2>
        <p>
          One of the first questions distributors ask is regarding the capital needed to start. At Sanitatepharma, our minimum franchise investment is currently <strong>[NEED: investment amount]</strong>. 
        </p>
        <p>
          We believe in making the pharmaceutical business accessible while ensuring our partners have the working capital necessary to maintain stock and serve their local doctors efficiently. This investment covers your initial product inventory, promotional materials, and the administrative setup required to get your business off the ground.
        </p>
        <p>
          By maintaining a reasonable investment threshold, we empower entrepreneurs to start their journey without overwhelming financial pressure. We provide complete transparency on cost structures, ensuring you know exactly where every rupee goes. If you are ready to learn more about our company\'s mission and stability, you can read more <Link href="/about" className="text-teal font-semibold hover:underline">about us</Link>.
        </p>

        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          Do you offer exclusive territory rights?
        </h2>
        <p>
          Territory monopoly is a critical factor for success in the PCD pharma franchise model. At Sanitatepharma, our policy on territory exclusivity is: <strong>[NEED: territory exclusivity]</strong>.
        </p>
        <p>
          Having exclusive rights means that you do not have to compete with other distributors selling the exact same brand in your designated area. This allows you to build strong, long-lasting relationships with doctors, hospitals, and pharmacies, knowing that your hard work translates directly into your own business growth. We map out territories meticulously to ensure every franchise partner has a viable, highly profitable market size to operate within.
        </p>

        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          Which product categories are available for franchise?
        </h2>
        <p>
          A strong product portfolio is the backbone of any successful pharma franchise. We manufacture a wide range of high-quality, rigorous-tested medications. The specific product categories actually available for our franchise partners include: <strong>[NEED: product categories]</strong>.
        </p>
        <p>
          From general medicines to specialized therapeutic segments, our catalog is designed to meet the diverse demands of the Indian healthcare market. Every product undergoes strict quality control checks, ensuring high efficacy and safety. By partnering with us, you gain access to a reliable supply chain that ensures you never face stock-outs. To see a broader view of what we manufacture, you can explore our complete <Link href="/products" className="text-teal font-semibold hover:underline">product catalog</Link>.
        </p>

        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          Is prior pharma experience required to start?
        </h2>
        <p>
          Starting a pharmaceutical business can seem daunting, and many wonder if they need a medical or pharmaceutical background to succeed. For our PCD pharma franchise, our requirement regarding prior pharma experience is: <strong>[NEED: is prior experience required]</strong>.
        </p>
        <p>
          We value entrepreneurial spirit, dedication, and a strong local network. While having experience as a Medical Representative (MR) or pharmaceutical distributor is certainly beneficial, we provide comprehensive training and onboarding. Our team equips you with detailed product knowledge, marketing strategies, and promotional materials (like visual aids and MR bags) so you can confidently pitch to healthcare professionals in your area.
        </p>

        <h2 className="text-3xl font-display font-bold text-primary mt-12 mb-6">
          How can I contact you to apply for a franchise?
        </h2>
        <p>
          Taking the first step toward your own PCD pharma franchise is simple. We have a dedicated team ready to guide you through the onboarding process, answer any additional questions, and help you finalize your territory and product selection.
        </p>
        <p>
          The official phone number for all franchise enquiries is: <strong>[NEED: phone number]</strong>. 
        </p>
        <p>
          You can call us directly during business hours to speak with our franchise coordinators. Alternatively, you can fill out the application form at the bottom of this page, or visit our <Link href="/contact" className="text-teal font-semibold hover:underline">contact page</Link> for more ways to reach us. We look forward to partnering with you and spreading wellness together!
        </p>
      </div>
    </section>
  );
}
