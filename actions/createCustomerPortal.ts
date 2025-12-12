import stripe from '@/lib/stripe';

interface CreateCustomerPortalParams {
  customerId: string;
}

export const createCustomerPortal = async ({
  customerId,
}: CreateCustomerPortalParams) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    locale: 'es',
  });

  return { url: session.url };
};
