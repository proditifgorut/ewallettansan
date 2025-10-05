import { useState, useEffect } from 'react';
import { stockData } from '../../data/mockData';
import { motion } from 'framer-motion';
import MiniChart from './MiniChart';
import Modal from '../common/Modal';
import AssetDetailModal from './modals/AssetDetailModal';
import { getStockData } from '../../services/investmentAPI';
import Skeleton from '../common/Skeleton';

type Stock = typeof stockData[0];

const StocksTab = () => {
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await getStockData() as Stock[];
          setStocks(result);
        } catch (error) {
          console.error("Failed to fetch stock data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    const formatCurrency = (value: number | string) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(value));

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
            <h3 className="font-semibold text-white mb-2">Watchlist Saham</h3>
            <p className="text-xs text-gray-400">Data API IDX (simulasi). Klik untuk detail.</p>
          </div>
          
          <div className="space-y-3">
            {stocks.map((stock, index) => (
              <motion.div
                key={stock.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/70"
                onClick={() => setSelectedStock(stock)}
              >
                <img src={stock.logo} alt={stock.name} className="w-10 h-10 rounded-full mr-4 bg-white" />
                <div className="flex-1">
                  <p className="font-semibold text-white">{stock.id}</p>
                  <p className="text-xs text-gray-400 truncate w-32">{stock.name}</p>
                </div>
                <div className="w-20 h-10 mx-4">
                  <MiniChart data={stock.chartData} color={stock.change >= 0 ? '#22C55E' : '#EF4444'} />
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{formatCurrency(stock.price)}</p>
                  <p className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-gray-400 pt-4">
            <span className="font-semibold text-brand-gold">Edukasi Singkat:</span> Investasi saham di UMKM membantu diversifikasi aset dan potensi pertumbuhan modal jangka panjang.
          </p>
        </div>
        <Modal isOpen={!!selectedStock} onClose={() => setSelectedStock(null)} title={selectedStock?.name || 'Detail Saham'}>
            {selectedStock && (
                <AssetDetailModal
                    asset={selectedStock}
                    onClose={() => setSelectedStock(null)}
                    currency="IDR"
                />
            )}
        </Modal>
      </>
    );
};

export default StocksTab;
