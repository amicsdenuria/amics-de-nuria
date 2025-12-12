import { adminClient } from '@/sanity/lib/client';

export const deleteasdf = async () => {
  const subscriberId = 'xVnPuN5l3oZUVWqyslRU0A';
  const subscriptionId = 'Zuxbdi1Wl3DApzNzfEJvmJ';
  await adminClient
    .transaction()
    .patch(subscriberId, { unset: ['currentSubscription'] })
    .patch(subscriptionId, { unset: ['subscriber'] })
    .delete(subscriberId)
    .delete(subscriptionId)
    .commit();
};
