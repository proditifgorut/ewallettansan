import { Bell, Send, Scan, BarChartBig, FileText } from 'lucide-react';
import ChartDashboard from '../components/ChartDashboard';
import { useAIInsight } from '../hooks/useAIInsight';
import { weeklyChartData } from '../data/mockData';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const totalWeekData = weeklyChartData.reduce(
    (acc, day) => {
      acc.income += day.income;
      acc.expense += day.expense;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const { insight, recommendation } = useAIInsight(totalWeekData);

  const quickActions = [
    { icon: Send, label: 'Kirim', path: '/transactions' },
    { icon: Scan, label: 'Bayar', path: '/transactions' },
    { icon: BarChartBig, label: 'Investasi', path: '/investments' },
    { icon: FileText, label: 'Laporan', path: '/reports' }, // Assuming a /reports route will exist
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-8"
    >
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Selamat datang kembali,</p>
          <h1 className="text-2xl font-bold text-white">Pemilik UMKM</h1>
        </div>
        <button className="relative p-2 rounded-full bg-gray-800/50 hover:bg-gray-700">
          <Bell size={22} />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-brand-dark-blue"></span>
        </button>
      </header>

      {/* Balance Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg">
        <p className="text-sm text-gray-400">Total Saldo</p>
        <p className="text-4xl font-bold text-white mt-1">Rp 12.345.678</p>
        <p className="text-sm text-green-400 mt-2">+ Rp 250.000 hari ini</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 text-center">
        {quickActions.map((action) => (
           <motion.button
            key={action.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center justify-center gap-2 w-full group focus:outline-none"
          >
            <div className="p-4 rounded-full bg-gray-800/60 text-brand-gold border-2 border-transparent group-hover:border-gray-300 group-focus:border-gray-300 transition-colors duration-300">
              <action.icon size={24} />
            </div>
            <span className="text-xs font-medium text-gray-300">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Chart */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-2">Ringkasan Mingguan</h2>
        <div className="p-4 rounded-2xl bg-gray-800/50">
          <ChartDashboard />
        </div>
      </div>

      {/* AI Insight */}
      <div className="p-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/30">
        <h3 className="font-semibold text-brand-gold mb-2">AI Insight</h3>
        <p className="text-sm text-gray-300">{insight}</p>
        {recommendation && <p className="text-sm text-gray-300 mt-2">{recommendation}</p>}
      </div>
    </motion.div>
  );
};

export default Home;
