import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { ProductsPreview } from '@/components/sections/ProductsPreview';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Sanitatepharma — India\'s Leading Pharmaceutical Company',
  description:
    'Sanitatepharma is committed to making quality healthcare accessible and affordable. Explore our wide range of pharmaceutical products, franchise opportunities, and contract manufacturing services.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ProductsPreview />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
