'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { FileText, Stethoscope, Clock, Thermometer } from 'lucide-react';
import type { Product } from '@/lib/types';

export function ProductTabs({ product }: { product: Product }) {
  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: <FileText className="w-4 h-4" />,
      content: product.composition ? (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-primary">Composition Details</h3>
          <p className="text-textMid leading-relaxed">{product.composition}</p>
        </div>
      ) : (
        <p className="text-textMid italic">No composition details available.</p>
      )
    },
    { 
      id: 'indications', 
      label: 'Indications', 
      icon: <Stethoscope className="w-4 h-4" />,
      content: product.indications ? (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-primary">Therapeutic Indications</h3>
          <p className="text-textMid leading-relaxed whitespace-pre-wrap">{product.indications}</p>
        </div>
      ) : (
        <p className="text-textMid italic">No indications provided.</p>
      )
    },
    { 
      id: 'dosage', 
      label: 'Dosage & Admin', 
      icon: <Clock className="w-4 h-4" />,
      content: product.dosage ? (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-primary">Dosage and Administration</h3>
          <p className="text-textMid leading-relaxed whitespace-pre-wrap">{product.dosage}</p>
        </div>
      ) : (
        <p className="text-textMid italic">No dosage instructions provided.</p>
      )
    },
    { 
      id: 'storage', 
      label: 'Storage', 
      icon: <Thermometer className="w-4 h-4" />,
      content: product.storage ? (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-primary">Storage Requirements</h3>
          <p className="text-textMid leading-relaxed">{product.storage}</p>
        </div>
      ) : (
        <p className="text-textMid italic">Standard room temperature storage unless otherwise specified.</p>
      )
    },
  ];

  return (
    <Tabs.Root defaultValue="overview" className="w-full mt-16 pt-16 border-t border-gray-100">
      <Tabs.List className="flex overflow-x-auto border-b border-gray-100 no-scrollbar mb-8">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className="flex items-center gap-2 px-6 py-4 text-sm font-semibold text-textMid border-b-2 border-transparent hover:text-primary hover:border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal data-[state=active]:text-teal data-[state=active]:border-teal whitespace-nowrap transition-colors"
          >
            {tab.icon}
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      
      {tabs.map((tab) => (
        <Tabs.Content
          key={tab.id}
          value={tab.id}
          className="outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-8 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="bg-white p-8 rounded-card border border-gray-100 shadow-sm">
            {tab.content}
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
