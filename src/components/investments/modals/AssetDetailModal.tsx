import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import TransactionModal from './TransactionModal';
import Modal from '../../common/Modal';

type Asset = {
    id: string;
    name: string;
    price: string | number;
    change: number;
    chartData: { price: number }[];
    logo: string;
};

interface AssetDetailModalProps {
  asset: Asset;
  onClose: () => void;
  currency: 'IDR' | 'USD';
}

const AssetDetailModal = ({ asset, onClose, currency }: AssetDetailModalProps) => {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeAction, setTradeAction] = useState<'Beli' | 'Jual'>('Beli');

  const formatCurrency = (value: number) => new Intl.NumberFormat(currency === 'IDR' ? 'id-ID' : 'en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(value);
  
  const openTradeModal = (action: 'Beli' | 'Jual') => {
    setTradeAction(action);
    setIsTradeModalOpen(true);
  };

  return (
    <>
    <div className="space-y-4 text-white">
      <div className="flex items-center gap-4">
        <img src={asset.logo} alt={asset.name} className="w-12 h-12 rounded-full bg-white" />
        <div>
          <p className="text-2xl font-bold">{formatCurrency(Number(asset.price))}</p>
          <p className={`text-sm font-medium ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}% (24h)
          </p>
        </div>
      </div>

      <div className="h-56 w-full -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={asset.chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorAsset" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={asset.change >= 0 ? '#22C55E' : '#EF4444'} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={asset.change >= 0 ? '#22C55E' : '#EF4444'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
              formatter={(value: number) => [formatCurrency(value), 'Harga']}
              labelFormatter={() => ''}
            />
            <Area type="monotone" dataKey="price" stroke={asset.change >= 0 ? '#22C55E' : '#EF4444'} fill="url(#colorAsset)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.button 
          onClick={() => openTradeModal('Beli')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-green-500 rounded-lg font-semibold"
        >
          Beli
        </motion.button>
        <motion.button 
          onClick={() => openTradeModal('Jual')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-red-500 rounded-lg font-semibold"
        >
          Jual
        </motion.button>
      </div>
    </div>
    <Modal isOpen={isTradeModalOpen} onClose={() => setIsTradeModalOpen(false)} title={`${tradeAction} ${asset.id}`}>
        <TransactionModal
            assetName={asset.id}
            assetPrice={Number(asset.price)}
            action={tradeAction}
            onClose={() => {
                setIsTradeModalOpen(false);
                onClose(); // Close parent modal as well
            }}
            currency={currency}
        />
    </Modal>
    </>
  );
};

export default AssetDetailModal;
