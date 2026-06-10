'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { enquirySchema, type EnquirySchemaType } from '@/lib/validations';
import { ZodError } from 'zod';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof EnquirySchemaType, string>>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');
    setValidationErrors({});
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const payload = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        company: formData.get('company') as string,
        enquiry_type: formData.get('enquiry_type') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
      };

      // Zod Client-Side Validation
      const result = enquirySchema.safeParse(payload);
      if (!result.success) {
        const errors: Partial<Record<keyof EnquirySchemaType, string>> = {};
        result.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as keyof EnquirySchemaType] = issue.message;
          }
        });
        setValidationErrors(errors);
        setIsSubmitting(false);
        return;
      }

      // Submit
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setErrorMessage(data.error || "Failed to submit message.");
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage("An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-card border border-gray-100 relative overflow-hidden">
      
      {/* Status Banners */}
      {status === 'success' && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in-95">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <p className="font-medium text-sm">Message sent! We typically respond within 24 hours.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3 animate-in fade-in zoom-in-95">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm mb-1">Failed to send message</p>
            <p className="text-sm opacity-90">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Full Name *</label>
            <input 
              required 
              type="text" 
              id="name" 
              name="name" 
              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 outline-none transition-all ${validationErrors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50' : 'border-gray-200 focus:border-teal focus:ring-teal'}`} 
              placeholder="John Doe" 
            />
            {validationErrors.name && <p className="text-red-500 text-xs mt-1.5">{validationErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Email Address *</label>
            <input 
              required 
              type="email" 
              id="email" 
              name="email" 
              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 outline-none transition-all ${validationErrors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50' : 'border-gray-200 focus:border-teal focus:ring-teal'}`} 
              placeholder="john@example.com" 
            />
            {validationErrors.email && <p className="text-red-500 text-xs mt-1.5">{validationErrors.email}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 outline-none transition-all ${validationErrors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50' : 'border-gray-200 focus:border-teal focus:ring-teal'}`} 
              placeholder="+91 98765 43210" 
            />
            {validationErrors.phone && <p className="text-red-500 text-xs mt-1.5">{validationErrors.phone}</p>}
          </div>
          <div>
            <label htmlFor="company" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Company / City</label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 outline-none transition-all ${validationErrors.company ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50' : 'border-gray-200 focus:border-teal focus:ring-teal'}`} 
              placeholder="Acme Pharmacy, Delhi" 
            />
            {validationErrors.company && <p className="text-red-500 text-xs mt-1.5">{validationErrors.company}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="enquiry_type" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Enquiry Type *</label>
            <select 
              required 
              id="enquiry_type" 
              name="enquiry_type" 
              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 outline-none transition-all bg-white text-primary ${validationErrors.enquiry_type ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50' : 'border-gray-200 focus:border-teal focus:ring-teal'}`}
            >
              <option value="">Select an option</option>
              <option value="general">General Enquiry</option>
              <option value="product">Product Information</option>
              <option value="franchise">PCD Franchise</option>
              <option value="contract_manufacturing">Contract Manufacturing</option>
              <option value="career">Career / HR</option>
              <option value="media">Media / Press</option>
            </select>
            {validationErrors.enquiry_type && <p className="text-red-500 text-xs mt-1.5">{validationErrors.enquiry_type}</p>}
          </div>
          <div>
            <label htmlFor="subject" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Subject *</label>
            <input 
              required 
              type="text" 
              id="subject" 
              name="subject" 
              className={`w-full px-4 py-3 rounded-xl border focus:ring-1 outline-none transition-all ${validationErrors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50' : 'border-gray-200 focus:border-teal focus:ring-teal'}`} 
              placeholder="How can we help?" 
            />
            {validationErrors.subject && <p className="text-red-500 text-xs mt-1.5">{validationErrors.subject}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Message *</label>
          <textarea 
            required
            id="message" 
            name="message" 
            rows={5}
            placeholder="Please provide details about your enquiry..."
            className={`w-full px-4 py-3 rounded-xl border focus:ring-1 outline-none transition-all resize-none ${validationErrors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50' : 'border-gray-200 focus:border-teal focus:ring-teal'}`}
          />
          {validationErrors.message && <p className="text-red-500 text-xs mt-1.5">{validationErrors.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-primary transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
