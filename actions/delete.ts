import { adminClient } from '@/sanity/lib/client';

export const deleteasdf = async () => {
  const subscriberId = 'SoyCAbrF4SPOxAFbjtjN0R';
  const subscriptionId = 'SoyCAbrF4SPOxAFbjtjNAv';
  await adminClient
    .transaction()
    .patch(subscriberId, { unset: ['currentSubscription'] })
    .patch(subscriptionId, { unset: ['subscriber'] })
    .commit();
};
