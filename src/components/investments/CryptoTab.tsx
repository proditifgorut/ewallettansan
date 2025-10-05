import { useState, useEffect } from 'react';
import { cryptoData } from '../../data/mockData';
import { motion } from 'framer-motion';
import MiniChart from './MiniChart';
import { ShieldCheck } from 'lucide-react';
import Modal from '../common/Modal';
import AssetDetailModal from './modals/AssetDetailModal';
import { getCryptoData } from '../../services/investmentAPI';
import Skeleton from '../common/Skeleton';

type Crypto = typeof cryptoData[0];

const CryptoTab = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCryptoData() as Crypto[];
        setCryptos(result);
      } catch (error) {
        console.error("Failed to fetch crypto data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (value: number | string) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <div className="space-y-3">
          <Skeleton className="h-[76px] w-full" />
          <Skeleton className="h-[76px] w-full" />
          <Skeleton className="h-[76px] w-full" />
          <Skeleton className="h-[76px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-gray-800/50">
          <h3 className="font-semibold text-white mb-2">Aset Kripto Populer</h3>
          <p className="text-xs text-gray-400">Data API Coingecko (simulasi). Klik untuk detail.</p>
        </div>

        <div className="space-y-3">
          {cryptos.map((crypto, index) => (
            <motion.div
              key={crypto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/70"
              onClick={() => setSelectedCrypto(crypto)}
            >
              <img src={crypto.logo} alt={crypto.name} className="w-10 h-10 rounded-full mr-4" />
              <div className="flex-1">
                <p className="font-semibold text-white">{crypto.id}</p>
                <p className="text-xs text-gray-400">{crypto.name}</p>
              </div>
              <div className="w-20 h-10 mx-4">
                <MiniChart data={crypto.chartData} color={crypto.change >= 0 ? '#22C55E' : '#EF4444'} />
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">{formatCurrency(crypto.price)}</p>
                <p className={`text-sm font-medium ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-brand-gold/10 border border-brand-gold/30 mt-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-brand-gold mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-brand-gold">AI Risk Assistant</h4>
              <p className="text-sm text-gray-300">Berdasarkan profil risiko Anda, kami menyarankan alokasi tidak lebih dari 15% dari total portofolio Anda ke aset kripto.</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-800/50 mt-4">
          <h4 className="font-semibold text-white">Auto Invest (DCA)</h4>
          <p className="text-sm text-gray-300 mt-1">Atur investasi rutin (harian/mingguan/bulanan) untuk membangun aset Anda secara konsisten. <button className="text-brand-gold font-semibold">Atur Sekarang</button></p>
        </div>
      </div>
      <Modal isOpen={!!selectedCrypto} onClose={() => setSelectedCrypto(null)} title={selectedCrypto?.name || 'Detail Aset'}>
          {selectedCrypto && (
              <AssetDetailModal
                  asset={selectedCrypto}
                  onClose={() => setSelectedCrypto(null)}
                  currency="USD"
              />
          )}
      </Modal>
    </>
  );
};

export default CryptoTab;
