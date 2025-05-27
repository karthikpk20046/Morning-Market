import { useState, useEffect } from 'react';
import './index.css';
import Dashboard from './components/Dashboard';
import { mockData } from './data/mockData';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return <Dashboard data={mockData} />;
}

const LoadingScreen = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const tips = [
    'Analyzing market data from Asian exchanges...',
    'Calculating risk exposure across portfolio segments...',
    'Identifying overnight earnings surprises...',
    'Preparing sentiment analysis for market regions...',
    'Generating natural language summary of key insights...',
  ];

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 2000);

    return () => {
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative size-full">
        <div className="absolute inset-0 bg-[#0a0e17] flex size-full flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="relative flex items-center justify-center w-14 h-14 bg-[#131a2c] border border-[#2a3349] rounded-full">
            <div className="absolute h-14 w-14 rounded-full animate-spin bg-gradient-to-b from-blue-400 to-transparent"></div>
            <div className="absolute flex items-center justify-center bg-[#131a2c] rounded-full h-[52px] w-[52px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13.125C3 12.5037 3.50368 12 4.125 12H6.375C6.99632 12 7.5 12.5037 7.5 13.125V19.875C7.5 20.4963 6.99632 21 6.375 21H4.125C3.50368 21 3 20.4963 3 19.875V13.125Z" fill="#3B82F6"/>
                <path d="M9.75 8.625C9.75 8.00368 10.2537 7.5 10.875 7.5H13.125C13.7463 7.5 14.25 8.00368 14.25 8.625V19.875C14.25 20.4963 13.7463 21 13.125 21H10.875C10.2537 21 9.75 20.4963 9.75 19.875V8.625Z" fill="#3B82F6"/>
                <path d="M16.5 4.125C16.5 3.50368 17.0037 3 17.625 3H19.875C20.4963 3 21 3.50368 21 4.125V19.875C21 20.4963 20.4963 21 19.875 21H17.625C17.0037 21 16.5 20.4963 16.5 19.875V4.125Z" fill="#3B82F6"/>
              </svg>
            </div>
          </div>

          <div className="text-white font-semibold text-xl mt-2">FinanceGPT</div>
          <div className="text-[#8b95a5] font-medium">Preparing your morning brief...</div>

          <div className="relative h-[50px] pt-4 mt-2 w-[320px] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-4 z-10 bg-gradient-to-t from-transparent to-[#0a0e17]" />
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${currentTipIndex * 30}px)` }}
            >
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className={`h-6 mb-4 flex items-center justify-center text-[#6b7280] text-sm leading-[1.2] transition-opacity duration-500 ${
                    index === currentTipIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {tip}
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-4 z-10 bg-gradient-to-b from-transparent to-[#0a0e17]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
