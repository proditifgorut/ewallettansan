import { useMemo } from 'react';

interface FinancialData {
  income: number;
  expense: number;
}

export const useAIInsight = (data: FinancialData) => {
  const insight = useMemo(() => {
    if (!data || data.expense === 0) {
      return "Start transacting to get your first AI insight!";
    }
    const { income, expense } = data;
    const growth = ((income - expense) / expense) * 100;
    
    if (growth > 10) {
      return `Excellent! Your income grew by ${growth.toFixed(1)}% this period.`;
    } else if (growth > 0) {
      return `Good progress. Your income is ${growth.toFixed(1)}% higher than expenses.`;
    } else {
      return `Heads up! Expenses are ${Math.abs(growth.toFixed(1))}% higher than income.`;
    }
  }, [data]);

  const recommendation = useMemo(() => {
    if (!data || data.income === 0) return null;
    if (data.income > data.expense * 1.2) {
        return "Recommendation: Allocate 5% of your balance to Gold Savings."
    }
    return null;
  }, [data]);

  return { insight, recommendation };
};
