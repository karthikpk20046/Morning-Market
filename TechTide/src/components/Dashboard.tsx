import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Activity, BarChart3, Briefcase, Globe, Info, Mic, PieChart, RefreshCw, CircleStop } from 'lucide-react';
import PortfolioAllocation from './PortfolioAllocation';
import StockPerformance from './StockPerformance';
import EarningsSurprises from './EarningsSurprises';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { Data } from '../types';

type DashboardProps = {
  data: Data;
};

const Dashboard = ({ data }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [response, setResponse] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const { speak, speaking, cancel } = useSpeechSynthesis();
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  const refreshData = () => {
    setLastRefreshed(new Date());
  };

  useEffect(() => {
    if (text && !isListening) {
      processQuery(text);
    }
  }, [text, isListening]);

  const processQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let responseText = '';

    if (lowerQuery.includes('risk exposure') && lowerQuery.includes('asia') && lowerQuery.includes('tech')) {
      responseText = `Today, your Asia tech allocation is ${data.allocation.current}% of AUM, up from ${data.allocation.previous}% yesterday. ${data.earnings[0].company} beat estimates by ${data.earnings[0].surprise}%, ${data.earnings[1].company} missed by ${Math.abs(data.earnings[1].surprise)}%. Regional sentiment is ${data.sentiment.overall} with a ${data.sentiment.tilt} tilt due to ${data.sentiment.reason}.`;
    } else if (lowerQuery.includes('earnings') && lowerQuery.includes('surprises')) {
      responseText = `Notable earnings surprises: ${data.earnings.map(e => `${e.company} ${e.surprise >= 0 ? 'beat' : 'missed'} by ${Math.abs(e.surprise)}%`).join(', ')}.`;
    } else if (lowerQuery.includes('sentiment') || lowerQuery.includes('outlook')) {
      responseText = `Regional sentiment is ${data.sentiment.overall} with a ${data.sentiment.tilt} tilt due to ${data.sentiment.reason}.`;
    } else {
      responseText = "I'm sorry, I don't understand that query. Try asking about risk exposure in Asia tech stocks, earnings surprises, or market sentiment.";
    }

    setResponse(responseText);
    speak({ text: responseText });
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-100 font-['Manrope',sans-serif]">
      <header className="border-b border-[#1f2937] bg-[#0d121e] px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-blue-500" size={24} />
            <h1 className="text-xl font-bold">FinanceGPT</h1>
          </div>
          <div className="text-sm text-gray-400">
            Last updated: {format(lastRefreshed, "MMMM d, yyyy 'at' h:mm a")}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#131a2c] border border-[#1f2937] rounded-lg p-6"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Morning Market Brief</h2>
                <p className="text-gray-400 mb-4">
                  {format(new Date(), "EEEE, MMMM d, yyyy")}
                </p>
                <div className="mb-6 p-4 bg-[#0d121e] rounded-lg">
                  <h3 className="font-semibold mb-2 text-blue-400">Today's Summary</h3>
                  <p className="text-gray-300">
                    Your Asia tech allocation is <span className="text-blue-400 font-semibold">{data.allocation.current}%</span> of AUM, 
                    up from {data.allocation.previous}% yesterday. Regional sentiment is {data.sentiment.overall} 
                    with a {data.sentiment.tilt} tilt due to {data.sentiment.reason}.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="bg-[#0d121e] rounded-lg p-4 mb-3 flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-blue-400">Voice Assistant</h3>
                    <button 
                      onClick={refreshData} 
                      className="text-gray-400 hover:text-gray-200"
                      title="Refresh data"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-400 mb-2">Ask a question:</p>
                    <div className="flex gap-2">
                      {!isListening ? (
                        <button
                          onClick={startListening}
                          disabled={!hasRecognitionSupport}
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                          <Mic size={16} /> Start Speaking
                        </button>
                      ) : (
                        <button
                          onClick={stopListening}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                          <CircleStop size={16} /> Stop Recording
                        </button>
                      )}
                      
                      {speaking && (
                        <button 
                          onClick={cancel}
                          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                          Stop Speaking
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="min-h-[80px] bg-[#191f32] p-3 rounded-md text-sm">
                    {isListening && <div className="text-blue-400">Listening...</div>}
                    {text && !isListening && <div><span className="text-gray-400">You said:</span> {text}</div>}
                    {response && <div className="mt-2"><span className="text-gray-400">Response:</span> {response}</div>}
                  </div>
                </div>
                
                <div className="flex gap-3 text-sm">
                  <div className="bg-[#0d121e] rounded-lg p-3 flex-1 text-center">
                    <p className="text-gray-400 mb-1">Risk Level</p>
                    <p className={`font-bold ${data.risk === 'Moderate' ? 'text-yellow-500' : data.risk === 'High' ? 'text-red-500' : 'text-green-500'}`}>
                      {data.risk}
                    </p>
                  </div>
                  <div className="bg-[#0d121e] rounded-lg p-3 flex-1 text-center">
                    <p className="text-gray-400 mb-1">Market Status</p>
                    <p className="font-bold text-blue-400">
                      {data.marketStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-8">
          <div className="flex border-b border-[#1f2937] mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="flex items-center gap-2">
                <Briefcase size={16} /> Portfolio Overview
              </span>
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'performance' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('performance')}
            >
              <span className="flex items-center gap-2">
                <Activity size={16} /> Performance
              </span>
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'global' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('global')}
            >
              <span className="flex items-center gap-2">
                <Globe size={16} /> Global Markets
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#131a2c] border border-[#1f2937] rounded-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Portfolio Allocation</h3>
                <button className="text-gray-400 hover:text-gray-200">
                  <Info size={16} />
                </button>
              </div>
              <PortfolioAllocation data={data.portfolioAllocation} />
              <div className="mt-4 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Asia Tech</span>
                  <span className="font-medium text-blue-400">{data.allocation.current}%</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Change from yesterday</span>
                  <span className="font-medium text-green-400">+{(data.allocation.current - data.allocation.previous).toFixed(1)}%</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#131a2c] border border-[#1f2937] rounded-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Stock Performance (Last 7 Days)</h3>
                <button className="text-gray-400 hover:text-gray-200">
                  <Info size={16} />
                </button>
              </div>
              <StockPerformance data={data.stockPerformance} />
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#131a2c] border border-[#1f2937] rounded-lg p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Earnings Surprises</h3>
            <button className="text-gray-400 hover:text-gray-200">
              <Info size={16} />
            </button>
          </div>
          <EarningsSurprises data={data.earnings} />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
