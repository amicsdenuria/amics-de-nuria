'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ProductWithRecurringPrices } from '@/lib/stripe.types';
import SubscriptionGrid from '@/components/subscription/SubscriptionGrid';
import { useState } from 'react';

interface ProductPricesProps {
  productsMonth: ProductWithRecurringPrices[];
  productsYear: ProductWithRecurringPrices[];
}

const ProductPrices = ({ productsMonth, productsYear }: ProductPricesProps) => {
  const [currentInterval, setCurrentInterval] = useState<'month' | 'year'>(
    'month',
  );

  const handleIntervalChange = (interval: string) => {
    setCurrentInterval(interval as 'month' | 'year');
  };

  return (
    <Tabs
      value={currentInterval}
      onValueChange={handleIntervalChange}
      className="space-y-8 py-8"
    >
      <TabsList className="mx-auto">
        <TabsTrigger value="month">Mensual</TabsTrigger>
        <TabsTrigger value="year">Anual</TabsTrigger>
      </TabsList>

      <TabsContent value="month">
        <SubscriptionGrid
          interval="month"
          products={productsMonth}
        />
      </TabsContent>

      <TabsContent value="year">
        <SubscriptionGrid
          interval="year"
          products={productsYear}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProductPrices;
