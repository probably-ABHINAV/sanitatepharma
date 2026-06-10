'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function ManufacturingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const payload = {
        name: formData.get('contactPerson'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        enquiry_type: 'contract_manufacturing',
        subject: 'Contract Manufacturing Enquiry',
        message: formData.get('requirements'),
        metadata: {
          product_type: formData.get('productType'),
          monthly_volume: formData.get('volume')
        }
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      
      if (result.success) {
        toast.success("Enquiry received! Our B2B team will contact you shortly.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || "Failed to submit enquiry.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-teal" />
      
      <h2 className="font-display text-3xl font-bold text-primary mb-2">Request a Quote</h2>
      <p className="text-textMid mb-8">Discuss your manufacturing requirements with our experts.</p>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Company Name *</label>
            <input required type="text" id="company" name="company" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" placeholder="Acme Pharmaceuticals" />
          </div>
          <div>
            <label htmlFor="contactPerson" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Contact Person *</label>
            <input required type="text" id="contactPerson" name="contactPerson" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" placeholder="John Doe" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Email Address *</label>
            <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" placeholder="john@example.com" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Phone Number *</label>
            <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" placeholder="+91 98765 43210" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="productType" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Product Type</label>
            <select id="productType" name="productType" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-primary bg-white">
              <option value="">Select Formulation Type</option>
              <option value="tablets">Tablets</option>
              <option value="capsules">Capsules</option>
              <option value="liquids">Oral Liquids / Syrups</option>
              <option value="injectables">Injectables</option>
              <option value="topicals">Ointments / Creams</option>
              <option value="multiple">Multiple Types</option>
            </select>
          </div>
          <div>
            <label htmlFor="volume" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Monthly Volume Required</label>
            <select id="volume" name="volume" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-primary bg-white">
              <option value="">Select Expected Volume</option>
              <option value="small">Small Scale (&lt; 1 Lakh units)</option>
              <option value="medium">Medium Scale (1-5 Lakh units)</option>
              <option value="large">Large Scale (5-20 Lakh units)</option>
              <option value="enterprise">Enterprise (&gt; 20 Lakh units)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="requirements" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Requirements / Challenges *</label>
          <textarea 
            required
            id="requirements" 
            name="requirements" 
            rows={4}
            placeholder="Please detail your formulation needs, required certifications, or any current manufacturing challenges..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all resize-none"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-teal transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Submit Requirements
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
