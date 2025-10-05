import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoldTab from '../components/investments/GoldTab';
import StocksTab from '../components/investments/StocksTab';
import CryptoTab from '../components/investments/CryptoTab';
import ForexTab from '../components/investments/ForexTab';
import { ExternalLink } from 'lucide-react';

type InvestmentTab = 'gold' | 'stocks' | 'crypto' | 'forex';

const tabs: { id: InvestmentTab; label: string }[] = [
  { id: 'gold', label: 'Emas' },
  { id: 'stocks', label: 'Saham' },
  { id: 'crypto', label: 'Kripto' },
  { id: 'forex', label: 'Valas' },
];

const Investments = () => {
  const [activeTab, setActiveTab] = useState<InvestmentTab>('gold');

  const renderContent = () => {
    switch (activeTab) {
      case 'gold':
        return <GoldTab />;
      case 'stocks':
        return <StocksTab />;
      case 'crypto':
        return <CryptoTab />;
      case 'forex':
        return <ForexTab />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-white min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6">Investasi</h1>
      
      <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 py-2 text-sm font-semibold text-center rounded-md transition-colors duration-300
              ${activeTab === tab.id 
                ? 'bg-brand-gold text-brand-dark-blue' 
                : 'text-gray-300 hover:bg-gray-700/50'
              }`
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      <motion.a
        href="https://www.google.com/finance/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 flex items-center justify-center gap-2 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 transition-colors"
      >
        <span className="font-semibold text-gray-300 text-sm">Jelajahi lebih lanjut di</span>
        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png" alt="Google" className="h-5" />
        <span className="font-bold text-white text-lg">Finance</span>
        <ExternalLink size={16} className="text-gray-400 ml-1" />
      </motion.a>
    </motion.div>
  );
};

export default Investments;
