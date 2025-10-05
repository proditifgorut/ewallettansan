import { useState, useEffect } from 'react';
import { forexData } from '../../data/mockData';
import { motion } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';
import { getForexData } from '../../services/investmentAPI';
import Skeleton from '../common/Skeleton';

type Forex = typeof forexData[0];

const ForexTab = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('IDR');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [forexRates, setForexRates] = useState<Forex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getForexData() as Forex[];
        setForexRates(result);
      } catch (error) {
        console.error("Failed to fetch forex data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const formatCurrency = (value: number, currency: string) => {
    const options: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: currency,
    };
    if (currency !== 'JPY') {
        options.minimumFractionDigits = 2;
        options.maximumFractionDigits = 2;
    } else {
        options.minimumFractionDigits = 0;
        options.maximumFractionDigits = 0;
    }
    return new Intl.NumberFormat(currency === 'IDR' ? 'id-ID' : 'en-US', options).format(value);
  }

  const handleConvert = () => {
    const fromRate = fromCurrency === 'IDR' ? 1 : forexRates.find(c => c.id === fromCurrency)?.rate || 0;
    const toRate = toCurrency === 'IDR' ? 1 : forexRates.find(c => c.id === toCurrency)?.rate || 0;
    
    if(fromRate === 0 || toRate === 0) return;

    const amountInIDR = parseFloat(amount) * fromRate;
    const finalAmount = amountInIDR / toRate;
    setConvertedAmount(formatCurrency(finalAmount, toCurrency));
  };
  
  const allCurrencies = ['IDR', ...forexRates.map(c => c.id)];

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-gray-800/50">
        <h3 className="font-semibold text-white mb-2">Kurs Valuta Asing (terhadap IDR)</h3>
        <div className="space-y-2">
            {forexRates.map(currency => (
                <div key={currency.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">{currency.name} ({currency.id})</span>
                    <span className="font-mono text-white">{formatCurrency(currency.rate, 'IDR')}</span>
                </div>
            ))}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-gray-800/50 space-y-4">
        <h3 className="font-semibold text-white">Konversi Cepat</h3>
        <div className="flex items-center gap-2">
            <div className="flex-1">
                <label htmlFor="from" className="text-xs text-gray-400">Dari</label>
                <select id="from" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} className="w-full p-2 bg-gray-700 rounded mt-1">
                    {allCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="pt-5">
                <ArrowRightLeft size={20} className="text-brand-gold"/>
            </div>
            <div className="flex-1">
                <label htmlFor="to" className="text-xs text-gray-400">Ke</label>
                <select id="to" value={toCurrency} onChange={e => setToCurrency(e.target.value)} className="w-full p-2 bg-gray-700 rounded mt-1">
                    {allCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
        </div>
        <div>
            <label htmlFor="amount" className="text-xs text-gray-400">Jumlah</label>
            <input 
                type="number" 
                id="amount" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded mt-1 font-mono" 
            />
        </div>
        <motion.button 
            onClick={handleConvert}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-brand-gold text-brand-dark-blue rounded-lg font-semibold"
        >
            Konversi
        </motion.button>
        {convertedAmount && (
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-2"
            >
                <p className="text-gray-400">Hasil Konversi:</p>
                <p className="text-2xl font-bold text-white font-mono">{convertedAmount}</p>
            </motion.div>
        )}
      </div>

       <div className="p-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/30">
        <h3 className="font-semibold text-brand-gold mb-2">AI Insight</h3>
        <p className="text-sm text-gray-300">Nilai USD naik 0.5% dalam 24 jam terakhir. Pertimbangkan untuk menyimpan sebagian saldo dalam USD untuk potensi keuntungan.</p>
      </div>
    </div>
  );
};

export default ForexTab;
