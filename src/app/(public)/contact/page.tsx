import { ContactForm } from '@/components/contact/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Sanitatepharma',
  description: 'Reach out to Sanitatepharma for general enquiries, franchise opportunities, contract manufacturing, or product information.',
};

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full overflow-hidden bg-offWhite pt-24">
      
      {/* ── HERO ── */}
      <section className="relative min-h-[40vh] flex items-center justify-center py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-teal/20 to-transparent opacity-50" />
        <div className="max-w-[1000px] mx-auto px-4 text-center relative z-10">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white mb-6 leading-[1.1]">
            Let's Talk
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            We are always open to hearing from customers, prospective distributors, manufacturing partners, and job seekers.
          </p>
        </div>
      </section>

      {/* ── MAIN 2-COLUMN LAYOUT ── */}
      <section className="py-24 bg-offWhite -mt-10 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left — Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right — Contact Info */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
              <div className="bg-white rounded-[24px] p-8 shadow-sm border-2 border-teal/10 hover:border-teal/30 transition-colors">
                <h3 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-tealPale text-teal flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </span>
                  Email Us
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-textMid mb-1">General Enquiries</p>
                    <a href="mailto:info@sanitatepharma.com" className="block text-primary hover:text-teal font-medium transition-colors text-base">
                      info@sanitatepharma.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-textMid mb-1">Sales & Franchise</p>
                    <a href="mailto:sales@sanitatepharma.com" className="block text-primary hover:text-teal font-medium transition-colors text-base">
                      sales@sanitatepharma.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-textMid mb-1">Support & Contact</p>
                    <a href="mailto:contact@sanitatepharma.com" className="block text-primary hover:text-teal font-medium transition-colors text-base">
                      contact@sanitatepharma.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-sm border-2 border-teal/10 hover:border-teal/30 transition-colors">
                <h3 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-tealPale text-teal flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </span>
                  Call Us
                </h3>
                <div className="space-y-2">
                  <a href="tel:+918377072807" className="block text-textMid hover:text-teal font-medium transition-colors text-lg">
                    +91 83770 72807
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-sm border-2 border-teal/10 hover:border-teal/30 transition-colors">
                <h3 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-tealPale text-teal flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </span>
                  Headquarters
                </h3>
                <p className="text-textMid font-medium leading-relaxed mb-6">
                  713, Devika Tower<br />
                  Chander Nagar<br />
                  Ghaziabad, Uttar Pradesh – 201011<br />
                  India
                </p>
                <div className="pt-6 border-t border-gray-100 flex items-start gap-4">
                  <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-primary font-bold text-sm mb-1">Office Hours</p>
                    <p className="text-textMid text-sm">Mon–Sat: 9:00 AM – 6:00 PM</p>
                    <p className="text-red-500 text-sm font-semibold mt-1">Sunday Closed</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.me/918377072807" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#25D366] text-white font-bold uppercase tracking-wider text-sm rounded-[24px] hover:bg-[#128C7E] transition-colors duration-300 shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="bg-white py-12 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-primary mb-8">Visit Our Office</h2>
          <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-card border border-gray-100 mb-8">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14018.665675402167!2d77.26577884177579!3d28.549724125740442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e4b48b6c0b%3A0xcb066d713c7dbed9!2sOkhla%20Industrial%20Estate%2C%20New%20Delhi%2C%20Delhi%20110020!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Sanitatepharma Office Location"
            />
          </div>
          <a 
            href="https://maps.google.com/?q=Okhla+Industrial+Estate+New+Delhi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal font-bold uppercase tracking-wider text-sm hover:text-primary transition-colors"
          >
            Get Directions <MapPin className="w-4 h-4" />
          </a>
        </div>
      </section>

    </main>
  );
}
