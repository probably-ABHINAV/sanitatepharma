'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SEGMENTS = [
  'General Medicine',
  'Cardiac & Diabetic',
  'Gynecology',
  'Pediatrics',
  'Dermatology',
  'Neuropsychiatry'
];

export function FranchiseForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const handleSegmentToggle = (segment: string) => {
    setSelectedSegments(prev => 
      prev.includes(segment) 
        ? prev.filter(s => s !== segment)
        : [...prev, segment]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('city'), // Storing City/State in company field for enquiries
        enquiry_type: 'franchise',
        subject: 'New Franchise Application',
        message: formData.get('message'),
        metadata: {
          budget: formData.get('budget'),
          segments: selectedSegments,
          occupation: formData.get('occupation')
        }
      };

      // Since we updated validations.ts to use Zod v4 and standard fields, 
      // the api route should handle this payload nicely.
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      
      if (result.success) {
        toast.success("Applied! We'll contact you within 24 hours.");
        (e.target as HTMLFormElement).reset();
        setSelectedSegments([]);
      } else {
        toast.error(result.error || "Failed to submit application.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal to-primary" />
      
      <h2 className="font-display text-3xl font-bold text-primary mb-2">Franchise Application</h2>
      <p className="text-textMid mb-8">Take the first step towards a profitable partnership.</p>

      <div className="space-y-6">
        {/* Personal Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Full Name *</label>
            <input required type="text" id="name" name="name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Email Address *</label>
            <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" placeholder="john@example.com" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Phone Number *</label>
            <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" placeholder="+91 98765 43210" />
          </div>
          <div>
            <label htmlFor="city" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">City & State *</label>
            <input required type="text" id="city" name="city" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" placeholder="Mumbai, Maharashtra" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="occupation" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Current Occupation *</label>
            <select required id="occupation" name="occupation" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-primary bg-white">
              <option value="">Select your background</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="distributor">Wholesaler / Distributor</option>
              <option value="medical_rep">Medical Representative</option>
              <option value="entrepreneur">Entrepreneur / Investor</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Investment Budget *</label>
            <select required id="budget" name="budget" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-primary bg-white">
              <option value="">Select budget range</option>
              <option value="<2L">Under ₹2 Lakhs</option>
              <option value="2-5L">₹2 Lakhs - ₹5 Lakhs</option>
              <option value="5-10L">₹5 Lakhs - ₹10 Lakhs</option>
              <option value=">10L">Above ₹10 Lakhs</option>
            </select>
          </div>
        </div>

        {/* Segments */}
        <div>
          <label className="block text-xs font-semibold text-textMid mb-3 uppercase tracking-wider">Segments of Interest</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SEGMENTS.map(segment => (
              <label key={segment} className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-colors text-sm font-semibold text-center ${
                selectedSegments.includes(segment) 
                  ? 'border-teal bg-tealPale text-teal' 
                  : 'border-gray-200 text-textMid hover:border-teal/50'
              }`}>
                <input 
                  type="checkbox" 
                  className="sr-only"
                  checked={selectedSegments.includes(segment)}
                  onChange={() => handleSegmentToggle(segment)}
                />
                {segment}
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Additional Information</label>
          <textarea 
            id="message" 
            name="message" 
            rows={3}
            placeholder="Tell us about your target territory and business goals..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-primary transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Submit Application
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-textMid mt-4">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </div>
    </form>
  );
}
