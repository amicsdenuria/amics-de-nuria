'use server';

import { ProductWithRecurringPrices } from '@/lib/stripe.types';
import stripe from '@/lib/stripe';

export const fetchAllProductsWithRecurringPrices = async (): Promise<{
  month: ProductWithRecurringPrices[];
  year: ProductWithRecurringPrices[];
}> => {
  try {
    const products = (await stripe.products.list({ active: true })).data.sort(
      (a, b) => a.created - b.created,
    );
    if (!products) return { month: [], year: [] };

    const prices = await stripe.prices.list({
      active: true,
      type: 'recurring',
    });
    if (!prices) return { month: [], year: [] };

    const recurringPrices = prices.data;

    const buildProductList = (
      interval: 'month' | 'year',
    ): ProductWithRecurringPrices[] => {
      const recurringPricesInInterval = recurringPrices.filter(
        (p) => p.recurring?.interval === interval,
      );

      const productIdsWithRecurring = new Set(
        recurringPricesInInterval.map((p) => p.product),
      );

      return products
        .filter((product) => productIdsWithRecurring.has(product.id))
        .map((product) => {
          const productRecurringPriceInInterval =
            recurringPricesInInterval.find(
              (price) => price.product === product.id,
            );

          return {
            product: {
              id: product.id,
              name: product.name,
              label: product.metadata.label,
            },
            price: productRecurringPriceInInterval!,
          };
        });
    };

    return {
      month: buildProductList('month'),
      year: buildProductList('year'),
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unknown error at fetchAllProductsWithRecurringPrices';
    throw new Error(`fetchAllProductsWithRecurringPrices: ${message}`);
  }
};
