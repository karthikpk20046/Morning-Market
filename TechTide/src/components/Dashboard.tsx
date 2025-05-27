import React from 'react';
import EarningsSurprises from './EarningsSurprises';
import PortfolioAllocation from './PortfolioAllocation';
import StockPerformance from './StockPerformance';
import { Data } from '../types';

const mockData: Data = {
  allocation: {
    current: 85,
    previous: 80,
  },
  risk: 'Moderate',
  marketStatus: 'Open',
  sentiment: {
    overall: 'Positive',
    tilt: 'Bullish',
    reason: 'Strong earnings reports',
  },
  portfolioAllocation: [
    { name: 'Technology', value: 40 },
    { name: 'Healthcare', value: 20 },
    { name: 'Finance', value: 15 },
    { name: 'Energy', value: 10 },
    { name: 'Utilities', value: 10 },
    { name: 'Real Estate', value: 5 },
  ],
  stockPerformance: [
    { date: '2023-01-01', TSMC: 100, Samsung: 80, Tencent: 120 },
    { date: '2023-02-01', TSMC: 110, Samsung: 85, Tencent: 115 },
    { date: '2023-03-01', TSMC: 105, Samsung: 90, Tencent: 130 },
    { date: '2023-04-01', TSMC: 115, Samsung: 92, Tencent: 128 },
  ],
  earnings: [
    { company: 'Apple', surprise: 5.2, expected: 1.5, actual: 1.6 },
    { company: 'Microsoft', surprise: -2.4, expected: 2.0, actual: 1.95 },
    { company: 'Google', surprise: 3.1, expected: 3.5, actual: 3.6 },
  ],
};

const Dashboard = () => {
  // Add fill color to earnings data based on surprise value
  const earningsWithFill = mockData.earnings.map(item => ({
    ...item,
    fill: item.surprise >= 0 ? '#10B981' : '#EF4444',
  }));

  return (
    <div className="p-4 space-y-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Investment Dashboard</h1>

      <div className="bg-gray-800 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Earnings Surprises</h2>
        <EarningsSurprises data={earningsWithFill} />
      </div>

      <div className="bg-gray-800 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Portfolio Allocation</h2>
        <PortfolioAllocation data={mockData.portfolioAllocation} />
      </div>

      <div className="bg-gray-800 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Stock Performance</h2>
        <StockPerformance data={mockData.stockPerformance} />
      </div>
    </div>
  );
};

export default Dashboard;
