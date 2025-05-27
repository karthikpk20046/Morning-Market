import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StockData } from '../types';

type StockPerformanceProps = {
  data: StockData[];
};

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

const StockPerformance = ({ data }: StockPerformanceProps) => {
  if (data.length === 0) return null;

  // Get keys excluding 'date' for dynamic lines
  const stockKeys = Object.keys(data[0]).filter((key) => key !== 'date');

  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
          />
          <YAxis
            stroke="#6B7280"
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#374151',
              borderRadius: '0.375rem',
              color: '#f9fafb',
            }}
            itemStyle={{ color: '#f9fafb' }}
            labelStyle={{ color: '#f9fafb' }}
          />
          <Legend />
          {stockKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockPerformance;
