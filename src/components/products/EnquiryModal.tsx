'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Send, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface EnquiryModalProps {
  productName: string;
  trigger: React.ReactNode;
}

export function EnquiryModal({ productName, trigger }: EnquiryModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        enquiry_type: 'product',
        subject: `Product Enquiry: ${productName}`,
        message: formData.get('message'),
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      
      if (result.success) {
        toast.success("Enquiry sent successfully. We'll contact you soon.");
        setOpen(false);
      } else {
        toast.error(result.error || "Failed to send enquiry");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-card shadow-2xl z-50 p-6 md:p-8 outline-none animate-in fade-in zoom-in-95 duration-300">
          <Dialog.Title className="font-display font-bold text-2xl text-primary mb-2">
            Enquire About Product
          </Dialog.Title>
          <Dialog.Description className="text-textMid text-sm mb-6">
            Please fill out the form below to learn more about <span className="font-bold text-primary">{productName}</span>.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Name *</label>
                <input required type="text" id="name" name="name" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Email *</label>
                <input required type="email" id="email" name="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Phone *</label>
                <input required type="tel" id="phone" name="phone" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label htmlFor="company" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Company / State</label>
                <input type="text" id="company" name="company" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm" placeholder="Pharmacy Name, State" />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Message</label>
              <textarea 
                required 
                id="message" 
                name="message" 
                rows={4}
                defaultValue={`I'd like to enquire about ${productName}. Please share details regarding pricing and availability.`}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm resize-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
              <Dialog.Close asChild>
                <button type="button" className="px-5 py-2.5 text-sm font-semibold text-textMid hover:text-primary transition-colors">
                  Cancel
                </button>
              </Dialog.Close>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Send Enquiry
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-primary hover:bg-gray-100 transition-colors outline-none">
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
