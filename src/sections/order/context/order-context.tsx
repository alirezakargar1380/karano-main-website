'use client';

import { useContext, createContext } from 'react';

import { OrderContextProps } from 'src/types/order';

// ----------------------------------------------------------------------

export const OrderContext = createContext({} as OrderContextProps);

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) throw new Error('useOrderContext must be use inside OrderProvider');

  return context;
};