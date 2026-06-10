'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, CheckCircle2, FileText } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import { useState } from 'react';

export function EnquiryDrawer({ 
  open, 
  onOpenChange, 
  enquiry 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  enquiry: any;
}) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  if (!enquiry) return null;

  const markAsReplied = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status: 'replied' })
        .eq('id', enquiry.id);

      if (error) throw error;
      toast.success('Marked as replied');
      onOpenChange(false);
      window.location.reload();
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" />
        <Dialog.Content className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col focus:outline-none animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
            <div>
              <Dialog.Title className="font-display text-xl font-bold text-primary">
                Enquiry Details
              </Dialog.Title>
              <p className="text-sm text-textMid mt-1">
                Submitted {new Date(enquiry.created_at).toLocaleString()}
              </p>
            </div>
            <Dialog.Close asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-textMid uppercase tracking-wider">Status</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                enquiry.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
              }`}>
                {enquiry.status.toUpperCase()}
              </span>
            </div>

            {/* Sender Info */}
            <div>
              <h3 className="text-xs font-semibold text-textMid uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Sender Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-textMid mb-1">Name</p>
                  <p className="font-medium text-primary">{enquiry.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-textMid mb-1">Email</p>
                    <a href={`mailto:${enquiry.email}`} className="font-medium text-teal hover:underline">{enquiry.email}</a>
                  </div>
                  <div>
                    <p className="text-sm text-textMid mb-1">Phone</p>
                    <a href={`tel:${enquiry.phone}`} className="font-medium text-teal hover:underline">{enquiry.phone || 'N/A'}</a>
                  </div>
                </div>
                {enquiry.company && (
                  <div>
                    <p className="text-sm text-textMid mb-1">Company</p>
                    <p className="font-medium text-primary">{enquiry.company}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Enquiry Details */}
            <div>
              <h3 className="text-xs font-semibold text-textMid uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Enquiry Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-textMid mb-1">Type</p>
                  <p className="font-medium text-primary capitalize">{enquiry.enquiry_type.replace('_', ' ')}</p>
                </div>
                {enquiry.subject && (
                  <div>
                    <p className="text-sm text-textMid mb-1">Subject</p>
                    <p className="font-medium text-primary">{enquiry.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-textMid mb-1">Message</p>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 whitespace-pre-wrap text-sm text-primary leading-relaxed">
                    {enquiry.message}
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            {enquiry.resume_path && (
              <div>
                <h3 className="text-xs font-semibold text-textMid uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Attachments</h3>
                <a 
                  href={enquiry.resume_path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-teal hover:bg-tealPale transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center group-hover:bg-white transition-colors">
                    <FileText className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">View Resume</p>
                    <p className="text-xs text-textMid">Opens in new tab</p>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-5 py-2.5 rounded-lg font-semibold text-textDark bg-gray-50 hover:bg-gray-100 transition-colors">
                Close
              </button>
            </Dialog.Close>
            {enquiry.status === 'new' && (
              <button 
                onClick={markAsReplied}
                disabled={loading}
                className="px-5 py-2.5 rounded-lg font-semibold text-white bg-teal hover:bg-tealLight transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {loading ? 'Updating...' : 'Mark as Replied'}
              </button>
            )}
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
