import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import { adminClient } from '../client';
import { BadRequest, Conflict } from '@/lib/appErrors';

interface CreateSubscriptionParams {
  subscriberId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  stripeProductId: string;
  stripeProductName: string;
  unitAmount: number;
  recurringInterval: string;
  createdAt: number;
  currentPeriodEnd: number;
  canceledAt: number | null;
  status: string;
}

type AllowedInterval = 'month' | 'year';

export const createSubscription = async ({
  subscriberId,
  stripeSubscriptionId,
  stripeCustomerId,
  stripePriceId,
  stripeProductId,
  stripeProductName,
  unitAmount,
  recurringInterval,
  createdAt,
  currentPeriodEnd,
  canceledAt,
  status,
}: CreateSubscriptionParams) => {
  const acceptedIntervals = ['month', 'year'];
  if (!acceptedIntervals.includes(recurringInterval)) {
    throw new BadRequest(
      `${recurringInterval} is not a valid recurring interval`
    );
  }
  const interval = recurringInterval as AllowedInterval;

  const subscriberActiveSubscriptionQuery = defineQuery(
    `*[_type == 'subscription' && subscriber._ref == $subscriberId && status == 'active'][0]`
  );
  const subscriberHasActiveSubscription = await sanityFetch({
    query: subscriberActiveSubscriptionQuery,
    params: { subscriberId },
  });

  if (subscriberHasActiveSubscription.data) {
    throw new Conflict(
      `Subscriber with id ${subscriberId} already has an active subscription`
    );
  }

  const formattedUnitAmount = unitAmount / 100;
  const formattedCurrentPeriodEnd = new Date(
    currentPeriodEnd * 1000
  ).toISOString();
  const formattedCanceledAt = canceledAt
    ? new Date(canceledAt * 1000).toISOString()
    : null;
  const formattedCreatedAt = createdAt
    ? new Date(createdAt * 1000).toISOString()
    : new Date().toISOString();

  const doc = {
    _type: 'subscription',
    subscriber: { _ref: subscriberId, _type: 'reference' },
    stripeSubscriptionId,
    stripeCustomerId,
    stripePriceId,
    stripeProductId,
    productName: stripeProductName,
    unit_amount: formattedUnitAmount,
    priceInterval: interval,
    status,
    current_period_end: formattedCurrentPeriodEnd,
    canceled_at: formattedCanceledAt,
    createdAt: formattedCreatedAt,
  };

  const newSubscription = await adminClient.create(doc);

  return newSubscription;
};
