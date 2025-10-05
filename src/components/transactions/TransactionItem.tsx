import { Transaction } from '../../data/mockData';
import { ArrowUpRight, ArrowDownLeft, ArrowRightLeft, PiggyBank } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { type, description, amount, date } = transaction;

  const getIcon = () => {
    switch (type) {
      case 'income':
        return <ArrowUpRight className="text-green-400" size={20} />;
      case 'expense':
        return <ArrowDownLeft className="text-red-400" size={20} />;
      case 'transfer':
        return <ArrowRightLeft className="text-blue-400" size={20} />;
      case 'investment':
        return <PiggyBank className="text-yellow-400" size={20} />;
      default:
        return null;
    }
  };

  const formatCurrency = (value: number) => {
    const sign = type === 'income' ? '+' : '-';
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
    return `${sign} ${formatted}`;
  };

  const amountColor = type === 'income' ? 'text-green-400' : 'text-white';

  return (
    <div className="flex items-center p-3 bg-gray-800/50 rounded-lg">
      <div className="p-3 bg-gray-700/60 rounded-full mr-4">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-white truncate w-40">{description}</p>
        <p className="text-xs text-gray-400">{new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      </div>
      <div className="text-right">
        <p className={`font-semibold font-mono ${amountColor}`}>
          {formatCurrency(amount)}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
