import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface TransactionModalProps {
  assetName: string;
  assetPrice: number;
  action: 'Beli' | 'Jual';
  onClose: () => void;
  currency: 'IDR' | 'USD';
}

const TransactionModal = ({ assetName, assetPrice, action, onClose, currency }: TransactionModalProps) => {
  const [amount, setAmount] = useState('');
  const [isGrams, setIsGrams] = useState(assetName.toLowerCase() === 'emas');

  const formatCurrency = (value: number) => new Intl.NumberFormat(currency === 'IDR' ? 'id-ID' : 'en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(value);

  const calculatedValue = isGrams ? parseFloat(amount) * assetPrice : parseFloat(amount) / assetPrice;

  const handleTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }
    toast.success(`Successfully ${action.toLowerCase()} ${assetName}!`);
    onClose();
  };

  return (
    <div className="space-y-4 text-white">
      <p className="text-sm text-gray-400">
        Harga {assetName} saat ini: <span className="font-semibold text-brand-gold">{formatCurrency(assetPrice)}</span>
        {assetName.toLowerCase() === 'emas' && ' /gram'}
      </p>
      
      <div className="relative">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full p-3 pr-20 bg-gray-700 rounded-lg font-mono text-xl focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
          {isGrams ? 'GRAM' : currency}
        </span>
      </div>

      {assetName.toLowerCase() === 'emas' && (
        <div className="flex justify-center">
            <button onClick={() => setIsGrams(!isGrams)} className="text-xs text-brand-gold hover:underline">
                Switch to {isGrams ? currency : 'Grams'}
            </button>
        </div>
      )}

      {amount && parseFloat(amount) > 0 && (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="text-center text-gray-300"
        >
          <p>Estimasi {isGrams ? 'biaya' : 'jumlah'}:</p>
          <p className="text-2xl font-bold text-white">
            {isGrams ? formatCurrency(calculatedValue) : `${calculatedValue.toFixed(6)}`}
          </p>
        </motion.div>
      )}

      <motion.button
        onClick={handleTransaction}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-lg font-semibold ${action === 'Beli' ? 'bg-green-500' : 'bg-red-500'}`}
      >
        Konfirmasi {action}
      </motion.button>
    </div>
  );
};

export default TransactionModal;
