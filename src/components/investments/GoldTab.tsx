import { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import Modal from '../common/Modal';
import TransactionModal from './modals/TransactionModal';
import { getGoldData } from '../../services/investmentAPI';
import Skeleton from '../common/Skeleton';

interface GoldData {
  priceData: { name: string; price: number }[];
  currentPrice: number;
  change: number;
}

const GoldTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'Beli' | 'Jual'>('Beli');
  const [data, setData] = useState<GoldData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getGoldData() as GoldData;
        setData(result);
      } catch (error) {
        console.error("Failed to fetch gold data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  
  const openModal = (action: 'Beli' | 'Jual') => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[116px] w-full" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-gray-400">Gagal memuat data emas.</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gray-800/50">
          <p className="text-sm text-gray-400">Harga Emas Saat Ini / gr</p>
          <p className="text-3xl font-bold text-white mt-1">{formatCurrency(data.currentPrice)}</p>
          <p className="text-sm text-green-400">+{data.change}% hari ini</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.priceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E8B23A" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#E8B23A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value as number)/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                formatter={(value: number) => [formatCurrency(value), 'Harga']}
              />
              <Area type="monotone" dataKey="price" stroke="#E8B23A" fill="url(#colorGold)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <p className="text-xs text-center text-gray-400">Beli emas digital mulai dari Rp10.000</p>

        <div className="grid grid-cols-2 gap-4">
          <motion.button 
            onClick={() => openModal('Beli')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-green-500 rounded-lg font-semibold"
          >
            Beli
          </motion.button>
          <motion.button 
            onClick={() => openModal('Jual')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-red-500 rounded-lg font-semibold"
          >
            Jual
          </motion.button>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalAction} Emas`}>
        <TransactionModal 
          assetName="Emas"
          assetPrice={data.currentPrice}
          action={modalAction}
          onClose={() => setIsModalOpen(false)}
          currency="IDR"
        />
      </Modal>
    </>
  );
};

export default GoldTab;
