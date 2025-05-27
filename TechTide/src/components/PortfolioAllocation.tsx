import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AllocationData } from '../types';

type PortfolioAllocationProps = {
  data: AllocationData[];
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const PortfolioAllocation = ({ data }: PortfolioAllocationProps) => {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, 'Allocation']}
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              borderColor: '#374151',
              borderRadius: '0.375rem',
              color: '#f9fafb'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioAllocation;
