import {
  goldPriceData,
  stockData,
  cryptoData,
  forexData
} from '../data/mockData';

// Simulate API latency
const API_LATENCY = 800; // ms

export const getGoldData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        priceData: goldPriceData,
        currentPrice: goldPriceData[goldPriceData.length - 1].price,
        change: 0.12,
      });
    }, API_LATENCY);
  });
};

export const getStockData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stockData);
    }, API_LATENCY);
  });
};

export const getCryptoData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, API_LATENCY);
  });
};

export const getForexData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(forexData);
    }, API_LATENCY);
  });
};
