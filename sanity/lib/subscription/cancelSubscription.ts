import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import { adminClient } from '../client';
import { BadRequest, InternalError, NotFound } from '@/lib/appErrors';

interface CancelSubscriptionParams {
  subscriptionId: string;
  canceledAt: number;
}

export const cancelSubscription = async ({
  subscriptionId,
  canceledAt,
}: CancelSubscriptionParams) => {
  if (!subscriptionId || typeof subscriptionId !== 'string') {
    throw new BadRequest('Invalid or missing subscriptionId');
  }
  if (typeof canceledAt !== 'number' || Number.isNaN(canceledAt)) {
    throw new BadRequest(
      'Invalid or missing canceledAt (expected seconds number)'
    );
  }

  const getCurrentSubscriptionQuery = defineQuery(
    `*[_type == 'subscription' && stripeSubscriptionId == $subscriptionId][0]`
  );

  const currentSubscription = await sanityFetch({
    query: getCurrentSubscriptionQuery,
    params: { subscriptionId },
  });

  if (!currentSubscription.data || !currentSubscription.data._id) {
    throw new NotFound(
      `Subscription with stripeSubscriptionId ${subscriptionId} not found`
    );
  }

  const isoCanceledAt = new Date(canceledAt * 1000).toISOString();

  const canceledSubscription = await adminClient
    .patch(currentSubscription.data._id)
    .set({
      status: 'canceled',
      canceled_at: isoCanceledAt,
    })
    .commit();

  if (!canceledSubscription) {
    throw new InternalError('Failed to commit canceled subscription to Sanity');
  }

  return canceledSubscription;
};
