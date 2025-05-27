import { Data } from '../types';

export const mockData: Data = {
  allocation: {
    current: 22,
    previous: 18
  },
  risk: "Moderate",
  marketStatus: "Active",
  sentiment: {
    overall: "neutral",
    tilt: "cautionary",
    reason: "rising yields"
  },
  portfolioAllocation: [
    { name: "Asia Tech", value: 22 },
    { name: "US Tech", value: 35 },
    { name: "EU Financials", value: 15 },
    { name: "Healthcare", value: 18 },
    { name: "Others", value: 10 }
  ],
  stockPerformance: [
    { date: "May 1", TSMC: 100, Samsung: 100, Tencent: 100 },
    { date: "May 2", TSMC: 102, Samsung: 99, Tencent: 101 },
    { date: "May 3", TSMC: 103, Samsung: 97, Tencent: 103 },
    { date: "May 4", TSMC: 105, Samsung: 96, Tencent: 102 },
    { date: "May 5", TSMC: 107, Samsung: 95, Tencent: 104 },
    { date: "May 6", TSMC: 106, Samsung: 97, Tencent: 105 },
    { date: "May 7", TSMC: 108, Samsung: 96, Tencent: 107 }
  ],
  earnings: [
    { company: "TSMC", surprise: 4, expected: 2.45, actual: 2.55 },
    { company: "Samsung", surprise: -2, expected: 1.85, actual: 1.81 },
    { company: "Alibaba", surprise: 1.5, expected: 2.10, actual: 2.13 },
    { company: "Tencent", surprise: 0.5, expected: 1.20, actual: 1.21 },
    { company: "Sony", surprise: -1, expected: 1.65, actual: 1.63 }
  ]
};
