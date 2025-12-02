import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import { adminClient } from '../client';
import { Subscriber } from '@/sanity.types';

interface CreateSubscriberIfNotExistParams {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: number;
}

const createSubscriberIfNotExist = async ({
  clerkId,
  email,
  firstName,
  lastName,
  createdAt,
}: CreateSubscriberIfNotExistParams) => {
  const existingSubscriberQuery = defineQuery(
    `*[_type == 'subscriber' && clerkId == $clerkId][0]`
  );

  const subscriber = await sanityFetch({
    query: existingSubscriberQuery,
    params: { clerkId },
  });

  if (subscriber.data) {
    console.log('Subscriber already exists', subscriber.data);
    return subscriber.data;
  }

  const newSubscriberDisplayName =
    firstName || lastName
      ? `${firstName ?? ''} ${lastName ?? ''}`.trim()
      : email;

  const newSubscriber = (await adminClient.create({
    _type: 'subscriber',
    displayName: newSubscriberDisplayName,
    email,
    clerkId,
    createdStripeAt: new Date(createdAt).toISOString(),
    createdSubscriberAt: new Date().toISOString(),
  })) as Subscriber;

  console.log('New Subscriber created', newSubscriber);

  return newSubscriber;
};
export default createSubscriberIfNotExist;
