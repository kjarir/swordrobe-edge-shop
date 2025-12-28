import { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'AED' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInAED: number) => number;
  formatPrice: (priceInAED: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rate: 1 AED = 0.27 USD (approximate)
const AED_TO_USD = 0.27;

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('AED');

  const convertPrice = (priceInAED: number): number => {
    if (currency === 'USD') {
      return priceInAED * AED_TO_USD;
    }
    return priceInAED;
  };

  const formatPrice = (priceInAED: number): string => {
    const price = convertPrice(priceInAED);
    const currencyCode = currency;
    
    if (currencyCode === 'AED') {
      return new Intl.NumberFormat('en-AE', {
        style: 'currency',
        currency: 'AED',
        maximumFractionDigits: 0,
      }).format(price);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(price);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

