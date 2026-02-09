'use server';

import Stripe from 'stripe';
import { baseUrl } from '@/lib/baseUrl';
import { currentUser } from '@clerk/nextjs/server';
import { getActiveSubscriptionByClerkId } from '@/sanity/lib/subscription/getActiveSubscriptionByClerkId';
import { getSubscriberByClerkId } from '@/sanity/lib/subscriber/getSubscriberByClerkId';
import stripe from '@/lib/stripe';

interface CreateStripeSubscriptionCheckoutParams {
  priceId: string;
}

export const createStripeSubscriptionCheckout = async ({
  priceId,
}: CreateStripeSubscriptionCheckoutParams) => {
  try {
    const user = await currentUser();
    const emailAddresses = user?.emailAddresses ?? [];
    const email = emailAddresses[0]?.emailAddress ?? '';
    if (!user || !emailAddresses || !email)
      throw new Error('User details not found');

    const currentSubscriber = await getSubscriberByClerkId({
      clerkId: user.id,
    });

    const activeSubscription = await getActiveSubscriptionByClerkId({
      clerkId: user.id,
    });
    if (activeSubscription) {
      return { url: '/subscription' };
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      locale: 'es',
      mode: 'subscription',
      success_url: `${baseUrl}/subscription/confirmation`,
      cancel_url: `${baseUrl}/subscription`,
      ...(currentSubscriber?.stripeCustomerId
        ? { customer: currentSubscriber.stripeCustomerId }
        : { customer_email: email }),
      metadata: {
        clerkId: user.id,
      },
      line_items: [
        {
          quantity: 1,
          price: priceId,
        },
      ],
    };

    const session = await stripe.checkout.sessions.create(sessionParams);
    if (!session.url) throw new Error('Unable to create session');

    return { url: session.url };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'Error in createStripeSubscriptionCheckout:',
        error.message,
      );
    } else {
      console.error('Error in createStripeSubscriptionCheckout:', error);
    }

    return { url: '/subscription/error' };
  }
};
