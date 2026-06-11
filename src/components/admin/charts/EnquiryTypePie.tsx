'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import type { Enquiry } from '@/lib/types';

interface EnquiryTypePieProps {
  enquiries: Enquiry[];
}

const COLORS = ['#00897B', '#2563EB', '#D97706', '#9333EA', '#14B8A6'];

export function EnquiryTypePie({ enquiries }: EnquiryTypePieProps) {
  const typeCount = enquiries.reduce((acc, enq) => {
    acc[enq.enquiry_type] = (acc[enq.enquiry_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(typeCount)
    .map(([name, value]) => ({
      name: name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 h-[400px]">
      <h3 className="font-display text-lg font-bold text-primary mb-2">Enquiries by Type</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-textMid text-sm">
          No data available
        </div>
      )}
    </div>
  );
}
