export const dynamic = 'force-dynamic';

import { AppError, BadRequest, InternalError } from '@/lib/appErrors';
import { NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe';
import { adminClient } from '@/sanity/lib/client';
import { cancelSubscription } from '@/sanity/lib/subscription/cancelSubscription';
import { clerkClient } from '@clerk/nextjs/server';
import createSubscriberIfNotExist from '@/sanity/lib/subscriber/createSubscriberIfNotExist';
import { createSubscription } from '@/sanity/lib/subscription/createSubscription';
import { headers } from 'next/headers';
import { patchSubscription } from '@/sanity/lib/subscription/patchSubscription';
import { revalidateTag } from 'next/cache';
import stripe from '@/lib/stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET');
}

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' };

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get('stripe-signature');

    if (!signature) {
      throw new BadRequest('No signature found');
    }

    const event: Stripe.Event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const mode = session.mode;

        const clerkId = session.metadata?.clerkId;

        if (!clerkId) {
          throw new BadRequest('Missing clerkId in Metadata');
        }

        if (mode === 'payment') {
          // TODO: handle donations
          console.log('TODO: Handle payments');
          return new NextResponse('TODO: Handle payments', {
            status: 200,
            headers: NO_STORE_HEADERS,
          });
        } else if (mode !== 'subscription') {
          console.log(`Ignored ${mode} event`);
          return new NextResponse(`Ignored ${mode} event`, {
            status: 200,
            headers: NO_STORE_HEADERS,
          });
        }

        // mode: 'subscription'
        const { users } = await clerkClient();
        const clerkUser = await users.getUser(clerkId);
        const email = clerkUser?.emailAddresses[0]?.emailAddress ?? '';
        const firstName = clerkUser?.firstName ?? '';
        const lastName = clerkUser?.lastName ?? '';
        const createdClerkAt = clerkUser?.createdAt;

        if (!clerkUser || !email || !createdClerkAt) {
          throw new BadRequest('Missing user details');
        }

        const subscriber = await createSubscriberIfNotExist({
          clerkId,
          email,
          firstName,
          lastName,
          createdAt: createdClerkAt,
        });
        if (!subscriber) {
          throw new InternalError('Subscriber was not created in Sanity');
        }

        const stripeSubscriptionId = session.subscription;
        const stripeCustomerId = session.customer;

        if (
          typeof stripeSubscriptionId !== 'string' ||
          typeof stripeCustomerId !== 'string'
        ) {
          throw new BadRequest(
            `Missing stripe session details or invalid formats: 
            \nstipreSubscriptionId: ${stripeSubscriptionId}; 
            \nstripeCustomerId: ${stripeCustomerId};`,
          );
        }

        const stripeSubscription =
          await stripe.subscriptions.retrieve(stripeSubscriptionId);
        const status = stripeSubscription.status;
        const createdAt = stripeSubscription.created;
        const currentPeriodEnd =
          stripeSubscription.items.data[0]?.current_period_end;
        const canceledAt = stripeSubscription.cancel_at;

        const allowedIntervals = ['year', 'month'];

        const subscriptionPrice = stripeSubscription.items.data[0].price;
        const stripePriceId = subscriptionPrice?.id;
        const unitAmount = subscriptionPrice?.unit_amount;
        const priceInterval = subscriptionPrice?.recurring?.interval;

        if (
          typeof stripePriceId !== 'string' ||
          typeof unitAmount !== 'number' ||
          !allowedIntervals.includes(priceInterval ?? '')
        ) {
          throw new BadRequest(
            `Missing stripe price details: 
            \nstripePriceId: ${stripePriceId}; 
            \nunitAmount: ${unitAmount}; 
            \npriceInterval: ${priceInterval}`,
          );
        }
        const recurringInterval =
          priceInterval as (typeof allowedIntervals)[number];

        const stripeProductId = subscriptionPrice.product;
        if (typeof stripeProductId !== 'string') {
          throw new BadRequest(
            `Missing stripe productId or invalid format: 
            \nstripeProductId: ${stripeProductId}`,
          );
        }

        const product = await stripe.products.retrieve(stripeProductId);
        const stripeProductName = product?.name;

        if (
          typeof status !== 'string' ||
          typeof createdAt !== 'number' ||
          typeof currentPeriodEnd !== 'number'
        ) {
          throw new BadRequest(
            `Missing stripe subscription details: 
            \nstatus: ${status}; 
            \ncreatedAt: ${createdAt}; 
            \ncurrentPeriodEnd: ${currentPeriodEnd}`,
          );
        }
        if (typeof stripeProductName !== 'string') {
          throw new BadRequest(
            `Missing stripe product name: 
            \nstripeProductName: ${stripeProductName}`,
          );
        }

        const subscription = await createSubscription({
          subscriberId: subscriber._id,
          stripeSubscriptionId,
          stripeCustomerId,
          stripePriceId,
          stripeProductId,
          stripeProductName,
          unitAmount,
          recurringInterval,
          createdAt: createdAt,
          currentPeriodEnd,
          canceledAt,
          status,
        });
        if (!subscription) {
          throw new InternalError('Subscription was not created in Sanity');
        }

        const updatedSubscriber = await adminClient
          .patch(subscriber._id, {
            set: {
              stripeCustomerId,
              currentSubscription: {
                _type: 'subscription',
                _ref: subscription._id,
              },
            },
          })
          .commit();
        if (!updatedSubscriber) {
          throw new InternalError(
            'Subscriber was not updated correctly in Sanity',
          );
        }

        // Revalidate the enrolled status cache
        revalidateTag('enrolled-status', { expire: 0 });

        const message = `Subscriber & Subscription created successfully: \n${subscriber} \n${subscription}`;
        console.log(message);
        return new NextResponse(message, {
          status: 200,
          headers: NO_STORE_HEADERS,
        });
      }

      case 'customer.subscription.deleted': {
        const subscriptionObj = event.data.object;

        const stripeSubscriptionId = subscriptionObj.id;

        const canceledAtSeconds =
          typeof subscriptionObj.canceled_at === 'number'
            ? subscriptionObj.canceled_at
            : typeof subscriptionObj.ended_at === 'number'
              ? subscriptionObj.ended_at
              : Math.floor(Date.now() / 1000);

        await cancelSubscription({
          subscriptionId: stripeSubscriptionId,
          canceledAt: canceledAtSeconds,
        });

        // Revalidate the enrolled status cache
        revalidateTag('enrolled-status', { expire: 0 });

        const message = `Subscription ${stripeSubscriptionId} marked canceled in Sanity`;
        console.log(message);
        return new NextResponse(message, {
          status: 200,
          headers: NO_STORE_HEADERS,
        });
      }

      case 'customer.subscription.updated': {
        const subscriptionObj = event.data.object;
        const subscriptionId = subscriptionObj.id;

        const subscriptionPrice = subscriptionObj.items.data[0].price;
        const product = await stripe.products.retrieve(
          subscriptionPrice.product as string,
        );

        await patchSubscription({
          stripeSubscriptionId: subscriptionId,
          stripePriceId: subscriptionPrice.id,
          stripeProductId: subscriptionPrice.product as string,
          stripeProductName: product.name ?? 'Desconegut',
          unitAmount: subscriptionPrice.unit_amount,
          recurringInterval: subscriptionPrice.recurring?.interval,
          currentPeriodEnd: subscriptionObj.items.data[0].current_period_end,
        });

        // Revalidate the enrolled status cache
        revalidateTag('enrolled-status', { expire: 0 });

        const message = `Subscription ${subscriptionId} updated correctly in Sanity`;
        return new NextResponse(message, {
          status: 200,
          headers: NO_STORE_HEADERS,
        });
      }

      default:
        return new NextResponse(`Event ${event.type} ignored`, {
          status: 200,
          headers: NO_STORE_HEADERS,
        });
    }
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
};
