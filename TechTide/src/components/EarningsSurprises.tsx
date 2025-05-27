import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { EarningsData } from '../types';

type EarningsSurprisesProps = {
  data: (EarningsData & { fill: string })[];
};

const EarningsSurprises = ({ data }: EarningsSurprisesProps) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis
            dataKey="company"
            stroke="#6B7280"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis
            stroke="#6B7280"
            tick={{ fill: '#9CA3AF' }}
            label={{
              value: 'Surprise (%)',
              angle: -90,
              position: 'insideLeft',
              fill: '#9CA3AF',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Earnings Surprise']}
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#374151',
              borderRadius: '0.375rem',
              color: '#f9fafb'
            }}
          />
          <Legend />
          <ReferenceLine y={0} stroke="#6B7280" />
          <Bar
            dataKey="surprise"
            name="Earnings Surprise"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsSurprises;
