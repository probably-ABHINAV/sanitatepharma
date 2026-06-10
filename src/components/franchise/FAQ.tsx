'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'What is the minimum investment required to start a franchise?',
    answer: 'The initial investment varies depending on the territory and the product segments you wish to carry. Generally, an initial working capital of ₹2 to ₹5 Lakhs is recommended to ensure a smooth launch and steady inventory.'
  },
  {
    question: 'Do you provide exclusive monopoly rights?',
    answer: 'Yes, we operate strictly on a monopoly basis. Once a territory is assigned to you, no other Sanitatepharma franchisee or distributor will be appointed in that specific area, ensuring your business growth is protected.'
  },
  {
    question: 'What kind of marketing support will I receive?',
    answer: 'We provide comprehensive promotional support including visual aids, MR bags, catch covers, reminder cards, product glossaries, pens, keychains, and regular marketing training to help you effectively pitch to doctors.'
  },
  {
    question: 'Are there any specific qualifications required?',
    answer: 'While a background in pharmacy (B.Pharm/D.Pharm) or prior experience as a Medical Representative is highly advantageous, entrepreneurial individuals with a strong distribution network and necessary drug licenses can also apply.'
  },
  {
    question: 'How fast is the product delivery after placing an order?',
    answer: 'We maintain a robust supply chain network. Typically, orders are dispatched within 24-48 hours of payment confirmation, ensuring you never face stock-outs in your territory.'
  }
];

export function FAQ() {
  return (
    <Accordion.Root type="single" collapsible className="w-full space-y-4">
      {FAQS.map((faq, i) => (
        <Accordion.Item 
          key={i} 
          value={`item-${i}`}
          className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-teal focus-within:border-transparent transition-all"
        >
          <Accordion.Header className="flex">
            <Accordion.Trigger className="flex flex-1 items-center justify-between p-6 font-display font-bold text-left text-primary hover:text-teal transition-colors group">
              {faq.question}
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-teal group-data-[state=open]:rotate-180 transition-transform duration-300" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-textMid bg-offWhite data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="p-6 pt-0 leading-relaxed">
              {faq.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
