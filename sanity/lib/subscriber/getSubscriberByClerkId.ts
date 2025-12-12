import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

interface GetSubscriberByClerkIdParams {
  clerkId: string;
}

export const getSubscriberByClerkId = async ({
  clerkId,
}: GetSubscriberByClerkIdParams) => {
  const getSubscriberByClerkIdQuery = defineQuery(
    `*[_type == 'subscriber' && clerkId == $clerkId][0]`
  );

  const subscriber = await sanityFetch({
    query: getSubscriberByClerkIdQuery,
    params: { clerkId },
  });

  return subscriber.data;
};
