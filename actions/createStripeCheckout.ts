'use server';

import { baseUrl } from '@/lib/baseUrl';
import stripe from '@/lib/stripe';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

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

    const session = await stripe.checkout.sessions.create({
      locale: 'es',
      mode: 'subscription',
      success_url: `${baseUrl}/subscription/confirmation`,
      cancel_url: `${baseUrl}/subscription`,
      customer_email: email,
      metadata: {
        clerkId: user.id,
      },
      line_items: [
        {
          quantity: 1,
          price: priceId,
        },
      ],
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error in createStripeSubscriptionCheckout:', error);
    redirect('/subscription/error');
  }
};
