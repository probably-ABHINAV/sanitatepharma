'use client';

import { useState, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Send, Loader2, UploadCloud, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createClient } from '@/lib/supabase/client';

interface ApplicationModalProps {
  roleTitle: string;
  department: string;
  trigger: React.ReactNode;
}

export function ApplicationModal({ roleTitle, department, trigger }: ApplicationModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Basic validation
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      let resumeUrl = null;

      // Upload resume if selected
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${department.toLowerCase()}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, file);

        if (uploadError) {
          toast.error("Failed to upload resume. Please try again.");
          setIsSubmitting(false);
          return;
        }
        resumeUrl = filePath;
      }

      // Submit Enquiry
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('city'), // storing city in company field
        enquiry_type: 'career',
        subject: `Job Application: ${roleTitle}`,
        message: formData.get('message') || `Application for ${roleTitle}`,
        metadata: {
          role: roleTitle,
          department,
          experience: formData.get('experience'),
          resume_path: resumeUrl
        }
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      
      if (result.success) {
        toast.success("Application received! We'll be in touch within 5 business days.");
        setOpen(false);
        setFile(null);
      } else {
        toast.error(result.error || "Failed to submit application");
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
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-card shadow-2xl z-50 p-6 md:p-8 outline-none animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <Dialog.Title className="font-display font-bold text-2xl text-primary mb-2">
            Apply for Position
          </Dialog.Title>
          <Dialog.Description className="text-textMid text-sm mb-6">
            You are applying for <span className="font-bold text-primary">{roleTitle}</span>
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Pre-filled readonly role */}
            <div>
              <label className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Position</label>
              <input type="text" readOnly value={roleTitle} className="w-full px-4 py-2.5 rounded-lg border border-gray-100 bg-offWhite text-textMid font-medium outline-none cursor-not-allowed text-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Full Name *</label>
                <input required type="text" id="name" name="name" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Email Address *</label>
                <input required type="email" id="email" name="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Phone Number *</label>
                <input required type="tel" id="phone" name="phone" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label htmlFor="city" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">City *</label>
                <input required type="text" id="city" name="city" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm" placeholder="Mumbai" />
              </div>
            </div>

            <div>
              <label htmlFor="experience" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Total Experience (Years) *</label>
              <select required id="experience" name="experience" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-primary bg-white text-sm">
                <option value="">Select experience</option>
                <option value="fresher">Fresher</option>
                <option value="1-3">1 - 3 Years</option>
                <option value="3-5">3 - 5 Years</option>
                <option value="5-10">5 - 10 Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Resume (PDF/DOC, Max 5MB) *</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                  file ? 'border-teal bg-tealPale' : 'border-gray-200 hover:border-teal/50 hover:bg-offWhite'
                }`}
              >
                <input 
                  required 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                {file ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileText className="w-6 h-6 text-teal" />
                    <span className="text-sm font-semibold text-primary">{file.name}</span>
                    <span className="text-xs text-textMid">Click to change file</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <UploadCloud className="w-6 h-6 text-gray-400" />
                    <span className="text-sm font-medium text-textMid">Click to upload your resume</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-textMid mb-1.5 uppercase tracking-wider">Cover Note (Optional)</label>
              <textarea 
                id="message" 
                name="message" 
                maxLength={200}
                rows={2}
                placeholder="Briefly tell us why you're a great fit..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm resize-none"
              />
              <p className="text-[10px] text-gray-400 text-right mt-1">Max 200 characters</p>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
              <Dialog.Close asChild>
                <button type="button" className="px-5 py-2.5 text-sm font-semibold text-textMid hover:text-primary transition-colors">
                  Cancel
                </button>
              </Dialog.Close>
              <button 
                type="submit" 
                disabled={isSubmitting || !file}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal text-white font-bold uppercase tracking-wider text-sm rounded-btn hover:bg-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Submit Application
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
