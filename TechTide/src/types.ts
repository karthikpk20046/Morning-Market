export interface AllocationData {
  name: string;
  value: number;
}

export interface StockData {
  date: string;
  [key: string]: string | number;
}

export interface EarningsData {
  company: string;
  surprise: number;
  expected: number;
  actual: number;
}

export interface Data {
  allocation: {
    current: number;
    previous: number;
  };
  risk: string;
  marketStatus: string;
  sentiment: {
    overall: string;
    tilt: string;
    reason: string;
  };
  portfolioAllocation: AllocationData[];
  stockPerformance: StockData[];
  earnings: EarningsData[];
}
