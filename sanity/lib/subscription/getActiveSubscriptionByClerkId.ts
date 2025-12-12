import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

interface GetActiveSubscriptionByClerkIdParams {
  clerkId: string;
}

export const getActiveSubscriptionByClerkId = async ({
  clerkId,
}: GetActiveSubscriptionByClerkIdParams) => {
  const getSubscriptionQuery = defineQuery(
    `*[_type == 'subscription' && subscriber->clerkId == $clerkId && status == 'active'][0]`
  );

  const subscription = await sanityFetch({
    query: getSubscriptionQuery,
    params: { clerkId },
  });

  return subscription.data;
};
