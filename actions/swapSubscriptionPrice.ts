'use server';

import stripe from '@/lib/stripe';

export const swapSubscriptionPrice = async (
  subscriptionId: string,
  newPriceId: string,
) => {
  try {
    // 1) get subscription and subscription item id
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const item = subscription.items.data[0];
    if (!item) throw new Error('No subscription item found');

    // 2) validate new price interval
    const newPrice = await stripe.prices.retrieve(newPriceId);
    if (!newPrice) throw new Error('New price not found');
    if (
      !newPrice.recurring ||
      (newPrice.recurring.interval !== 'month' &&
        newPrice.recurring.interval !== 'year')
    ) {
      throw new Error('Price must be monthly of yearly');
    }

    // 3) replace price of subscription_item
    await stripe.subscriptionItems.update(item.id, {
      price: newPriceId,
    });

    // 4) retrieve updated subscription
    const updated = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product'],
    });

    return updated;
  } catch (error) {
    console.error('Error swapping subscription price:', error);
    throw new Error('Error swapping subscription price');
  }
};
