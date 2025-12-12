import { adminClient } from '@/sanity/lib/client';

export const deleteasdf = async () => {
  const subscriberId = 'xVnPuN5l3oZUVWqyslPF6I';
  const subscriptionId = 'bsdaB5yTTfnN2hUF2KQ6SJ';
  await adminClient
    .transaction()
    .patch(subscriberId, { unset: ['currentSubscription'] })
    .patch(subscriptionId, { unset: ['subscriber'] })
    .delete(subscriberId)
    .delete(subscriptionId)
    .commit();
};
