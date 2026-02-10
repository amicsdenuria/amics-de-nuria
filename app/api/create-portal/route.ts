export const dynamic = 'force-dynamic';

import { AppError, NotAuthenticated, NotFound } from '@/lib/appErrors';

import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getActiveSubscriptionByClerkId } from '@/sanity/lib/subscription/getActiveSubscriptionByClerkId';
import stripe from '@/lib/stripe';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' };

export async function POST() {
  try {
    const user = await currentUser();
    if (!user) {
      throw new NotAuthenticated();
    }

    const subscription = await getActiveSubscriptionByClerkId({
      clerkId: user.id,
    });
    if (!subscription || !subscription.stripeCustomerId) {
      throw new NotFound('Subscription not found');
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      locale: 'es',
    });

    return NextResponse.json(
      { url: session.url },
      { status: 200, headers: NO_STORE_HEADERS },
    );
  } catch (error) {
    if (error instanceof AppError) {
      console.error(`${error.statusCode}: ${error.message}`);
      return new NextResponse(error.message, {
        status: error.statusCode,
        headers: NO_STORE_HEADERS,
      });
    } else if (error instanceof Error) {
      console.error(`500: ${error.message}`);
      return new NextResponse(error.message, {
        status: 500,
        headers: NO_STORE_HEADERS,
      });
    }
    console.error(`500: Internal Unknown error; \n${error}`);
    return new NextResponse('Unknown Error', {
      status: 500,
      headers: NO_STORE_HEADERS,
    });
  }
}
