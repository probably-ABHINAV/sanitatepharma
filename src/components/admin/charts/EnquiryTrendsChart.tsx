'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Enquiry } from '@/lib/types';

interface EnquiryTrendsChartProps {
  enquiries: Enquiry[];
}

export function EnquiryTrendsChart({ enquiries }: EnquiryTrendsChartProps) {
  // Aggregate enquiries by date for the last 14 days
  const dataMap = new Map<string, number>();
  
  // Initialize last 14 days
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dataMap.set(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 0);
  }

  enquiries.forEach((enq) => {
    const dateStr = new Date(enq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (dataMap.has(dateStr)) {
      dataMap.set(dateStr, dataMap.get(dateStr)! + 1);
    }
  });

  const data = Array.from(dataMap.entries()).map(([date, count]) => ({
    date,
    Enquiries: count,
  }));

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 h-[400px]">
      <h3 className="font-display text-lg font-bold text-primary mb-6">Enquiry Trends (14 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 25, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
            allowDecimals={false}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="Enquiries" 
            stroke="#00897B" 
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
            activeDot={{ r: 6, fill: '#00897B', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
