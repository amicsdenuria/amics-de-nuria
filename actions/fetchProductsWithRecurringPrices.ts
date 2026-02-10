'use server';

import { ProductWithRecurringPrices } from '@/lib/stripe.types';
import stripe from '@/lib/stripe';

interface FetchProductsWithRecurringPrices {
  interval: 'month' | 'year';
}

export const fetchProductsWithRecurringPrices = async ({
  interval,
}: FetchProductsWithRecurringPrices): Promise<ProductWithRecurringPrices[]> => {
  try {
    const products = (await stripe.products.list({ active: true })).data.sort(
      (a, b) => a.created - b.created,
    );
    if (!products) return [];

    const prices = await stripe.prices.list({
      active: true,
      type: 'recurring',
    });
    if (!prices) return [];

    const recurringPricesInInterval = prices.data.filter(
      (p) => p.recurring?.interval === interval,
    );

    const productIdsWithRecurring = new Set(
      recurringPricesInInterval.map((p) => p.product),
    );

    const result: ProductWithRecurringPrices[] = products
      .filter((product) => productIdsWithRecurring.has(product.id))
      .map((product) => {
        const productRecurringPriceInInterval = recurringPricesInInterval.find(
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

    return result;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unknown error at fetchProductsWithRecurringPrices';
    throw new Error(`fetchProductsWithRecurringPrices: ${message}`);
  }
};
