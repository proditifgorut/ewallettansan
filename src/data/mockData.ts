import { faker } from '@faker-js/faker';

// --- TRANSACTIONS ---
export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer' | 'investment';
  description: string;
  amount: number;
  date: Date;
}

export const generateTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    transactions.push({
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(['income', 'expense', 'transfer', 'investment']),
      description: faker.finance.transactionDescription(),
      amount: parseFloat(faker.finance.amount(5, 500)),
      date: faker.date.recent({ days: 30 }),
    });
  }
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// --- DASHBOARD CHART ---
export const weeklyChartData = [
  { name: 'Mon', income: faker.number.int({ min: 1000, max: 5000 }), expense: faker.number.int({ min: 500, max: 3000 }) },
  { name: 'Tue', income: faker.number.int({ min: 1500, max: 6000 }), expense: faker.number.int({ min: 800, max: 4000 }) },
  { name: 'Wed', income: faker.number.int({ min: 2000, max: 7000 }), expense: faker.number.int({ min: 1000, max: 5000 }) },
  { name: 'Thu', income: faker.number.int({ min: 1800, max: 6500 }), expense: faker.number.int({ min: 1200, max: 4500 }) },
  { name: 'Fri', income: faker.number.int({ min: 2500, max: 8000 }), expense: faker.number.int({ min: 1500, max: 5500 }) },
  { name: 'Sat', income: faker.number.int({ min: 3000, max: 9000 }), expense: faker.number.int({ min: 2000, max: 6000 }) },
  { name: 'Sun', income: faker.number.int({ min: 2800, max: 8500 }), expense: faker.number.int({ min: 1800, max: 5800 }) },
];

// --- INVESTMENTS ---

// Gold
export const goldPriceData = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  price: faker.number.int({ min: 950000, max: 1050000 }),
}));

// Stocks
const generateStockChartData = () => Array.from({ length: 10 }, () => ({ price: faker.number.int({ min: 100, max: 200 }) }));

export const stockData = [
  {
    id: 'BBRI',
    name: 'Bank Rakyat Indonesia',
    price: faker.finance.amount(4500, 4800, 0),
    change: faker.number.float({ min: -2.5, max: 2.5, precision: 2 }),
    chartData: generateStockChartData(),
    logo: 'https://logo.clearbit.com/bri.co.id'
  },
  {
    id: 'TLKM',
    name: 'Telkom Indonesia',
    price: faker.finance.amount(3800, 4100, 0),
    change: faker.number.float({ min: -2.5, max: 2.5, precision: 2 }),
    chartData: generateStockChartData(),
    logo: 'https://logo.clearbit.com/telkom.co.id'
  },
  {
    id: 'UNVR',
    name: 'Unilever Indonesia',
    price: faker.finance.amount(4000, 4300, 0),
    change: faker.number.float({ min: -2.5, max: 2.5, precision: 2 }),
    chartData: generateStockChartData(),
    logo: 'https://logo.clearbit.com/unilever.co.id'
  },
   {
    id: 'BBCA',
    name: 'Bank Central Asia',
    price: faker.finance.amount(9000, 9500, 0),
    change: faker.number.float({ min: -2.5, max: 2.5, precision: 2 }),
    chartData: generateStockChartData(),
    logo: 'https://logo.clearbit.com/bca.co.id'
  },
];

// Crypto
export const cryptoData = [
  { id: 'BTC', name: 'Bitcoin', price: faker.finance.amount(60000, 65000, 2), change: faker.number.float({ min: -5, max: 5, precision: 2 }), chartData: generateStockChartData(), logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
  { id: 'ETH', name: 'Ethereum', price: faker.finance.amount(3000, 3200, 2), change: faker.number.float({ min: -5, max: 5, precision: 2 }), chartData: generateStockChartData(), logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
  { id: 'SOL', name: 'Solana', price: faker.finance.amount(150, 170, 2), change: faker.number.float({ min: -5, max: 5, precision: 2 }), chartData: generateStockChartData(), logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png' },
  { id: 'BNB', name: 'BNB', price: faker.finance.amount(580, 610, 2), change: faker.number.float({ min: -5, max: 5, precision: 2 }), chartData: generateStockChartData(), logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' },
];

// Forex
export const forexData = [
    { id: 'USD', name: 'US Dollar', rate: 16250.50 },
    { id: 'EUR', name: 'Euro', rate: 17650.20 },
    { id: 'SGD', name: 'Singapore Dollar', rate: 12010.80 },
    { id: 'JPY', name: 'Japanese Yen', rate: 103.45 },
];
