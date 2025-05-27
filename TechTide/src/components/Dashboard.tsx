import EarningsSurprises from './EarningsSurprises';
import PortfolioAllocation from './PortfolioAllocation';
// import other components and types

// Assuming you have your data as follows:
import { Data, EarningsData } from '../types';

type DashboardProps = {
  data: Data;
};

const Dashboard = ({ data }: DashboardProps) => {
  // Add fill to earnings data based on surprise sign
  const earningsWithFill = data.earnings.map((item) => ({
    ...item,
    fill: item.surprise >= 0 ? '#10B981' : '#EF4444',
  }));

  return (
    <div>
      {/* Other dashboard components */}
      <EarningsSurprises data={earningsWithFill} />
      <PortfolioAllocation data={data.portfolioAllocation} />
      {/* Other dashboard components */}
    </div>
  );
};

export default Dashboard;
