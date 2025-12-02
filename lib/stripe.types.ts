import Stripe from 'stripe';

export interface ProductWithRecurringPrices {
  product: Product;
  price: Stripe.Price;
}

export interface Product {
  id: string;
  name: string;
  label: string;
}

export interface Price {
  id: string;
  product: string;
  recurring: Recurring | null;
  type: string;
  unit_amount: number;
}

interface Recurring {
  interval: string;
}
