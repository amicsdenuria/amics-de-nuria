'use client';

import { ProductWithRecurringPrices } from '@/lib/stripe.types';
import SubscriptionCard from './SubscriptionCard';
import { useTransition } from 'react';
import { createStripeSubscriptionCheckout } from '@/actions/createStripeCheckout';
import { useRouter } from 'next/navigation';

interface SubscriptionGridProps {
  products: ProductWithRecurringPrices[];
  interval: 'year' | 'month';
}

const SubscriptionGrid = ({ products, interval }: SubscriptionGridProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubscription = async (priceId: string) => {
    startTransition(async () => {
      const { url } = await createStripeSubscriptionCheckout({ priceId });
      if (!url) {
        router.push('/subscription/error');
        return;
      }

      router.push(url);
    });
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {products.map(({ product, price }) => (
        <SubscriptionCard
          key={product.id}
          title={product.name}
          label={product.label}
          interval={interval}
          price={price.unit_amount!}
          priceId={price.id}
          disabled={isPending}
          onSubscribe={handleSubscription}
        />
      ))}
    </section>
  );
};
export default SubscriptionGrid;
