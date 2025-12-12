import { BadRequest, NotFound } from '@/lib/appErrors';
import { adminClient } from '../client';
import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

interface PatchSubscriptionParams {
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeProductId: string;
  stripeProductName: string;
  unitAmount: number | null;
  recurringInterval: string | undefined;
  currentPeriodEnd: number;
}

type AllowedInterval = 'month' | 'year';

export const patchSubscription = async ({
  stripeSubscriptionId,
  stripePriceId,
  stripeProductId,
  stripeProductName,
  unitAmount,
  recurringInterval,
  currentPeriodEnd,
}: PatchSubscriptionParams) => {
  const acceptedIntervals = ['month', 'year'];
  if (!recurringInterval || !acceptedIntervals.includes(recurringInterval)) {
    throw new BadRequest(
      `${recurringInterval} is not a valid recurring interval`
    );
  }
  if (!unitAmount) {
    throw new BadRequest('Invalid unitAmount');
  }
  const interval = recurringInterval as AllowedInterval;

  const formattedUnitAmount = unitAmount / 100;
  const formattedCurrentPeriodEnd = new Date(
    currentPeriodEnd * 1000
  ).toISOString();

  const updatingParams = {
    stripePriceId,
    stripeProductId,
    productName: stripeProductName,
    unit_amount: formattedUnitAmount,
    priceInterval: interval,
    current_period_end: formattedCurrentPeriodEnd,
  };

  const getCurrentSubscriptionByStripeSubscriptionIdQuery = defineQuery(
    `*[_type == 'subscription' && stripeSubscriptionId == $stripeSubscriptionId][0]`
  );

  const currentSubscription = await sanityFetch({
    query: getCurrentSubscriptionByStripeSubscriptionIdQuery,
    params: { stripeSubscriptionId },
  });

  if (!currentSubscription.data) {
    throw new NotFound(
      `Subscription with stripeSubscriptionId: ${stripeSubscriptionId} not found`
    );
  }

  const updatedSubscription = await adminClient
    .patch(currentSubscription.data._id)
    .set(updatingParams)
    .commit();

  return updatedSubscription;
};
