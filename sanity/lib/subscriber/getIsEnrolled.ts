import { defineQuery } from 'next-sanity';
import { getSubscriberByClerkId } from './getSubscriberByClerkId';
import { sanityFetch } from '../live';

interface GetIsEnrolledParams {
  clerkId: string | undefined;
}

export const getIsEnrolled = async ({ clerkId }: GetIsEnrolledParams) => {
  if (!clerkId) {
    return false;
  }

  const subscriber = await getSubscriberByClerkId({ clerkId });
  console.log(JSON.stringify(subscriber, null, 2));

  if (!subscriber) {
    return false;
  }

  const getIsEnrolledQuery = defineQuery(
    `*[_type == 'subscription' && subscriber._ref == $subscriberId && status == 'active'][0]`,
  );

  const subscription = await sanityFetch({
    query: getIsEnrolledQuery,
    params: { subscriberId: subscriber._id },
  });

  if (!subscription.data) {
    return false;
  }

  return true;
};
