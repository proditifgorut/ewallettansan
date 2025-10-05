import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateTransactions, Transaction } from '../data/mockData';
import TransactionItem from '../components/transactions/TransactionItem';
import { Search } from 'lucide-react';

type FilterType = 'all' | Transaction['type'];

const filterTabs: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'income', label: 'Pemasukan' },
  { id: 'expense', label: 'Pengeluaran' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'investment', label: 'Investasi' },
];

const Transactions = () => {
  const [transactions] = useState<Transaction[]>(() => generateTransactions(50));
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'all') {
      return transactions;
    }
    return transactions.filter((t) => t.type === activeFilter);
  }, [transactions, activeFilter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-white"
    >
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transaksi</h1>
        <button className="p-2 rounded-full hover:bg-gray-700">
          <Search size={22} />
        </button>
      </header>

      <div className="flex space-x-2 bg-gray-800/50 p-1 rounded-lg mb-6 overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`${
              activeFilter === tab.id ? '' : 'hover:bg-white/5'
            } relative flex-shrink-0 px-3 py-2 text-sm font-semibold text-center rounded-md transition-colors`}
          >
            {activeFilter === tab.id && (
              <motion.div
                layoutId="filter-bubble"
                className="absolute inset-0 bg-brand-gold/80"
                style={{ borderRadius: 6 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <TransactionItem transaction={transaction} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Transactions;
