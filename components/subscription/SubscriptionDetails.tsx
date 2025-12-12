import { getActiveSubscriptionByClerkId } from '@/sanity/lib/subscription/getActiveSubscriptionByClerkId';
import { notFound } from 'next/navigation';
import { Button } from '../ui/button';
import { createCustomerPortal } from '@/actions/createCustomerPortal';
import Link from 'next/link';

interface SubscriptionDetailsProps {
  clerkId: string | undefined;
  userEmail: string | undefined;
}

const SubscriptionDetails = async ({
  clerkId,
  userEmail,
}: SubscriptionDetailsProps) => {
  if (!clerkId || !userEmail) {
    notFound();
  }
  const subscription = await getActiveSubscriptionByClerkId({ clerkId });
  if (!subscription || !subscription.stripeCustomerId) {
    notFound();
  }

  const { url } = await createCustomerPortal({
    customerId: subscription.stripeCustomerId,
  });

  const formattedSubscription = {
    productName: subscription.productName ?? 'Subscripció',
    priceInterval:
      subscription.priceInterval === 'month'
        ? 'Mensual'
        : subscription.priceInterval === 'year'
        ? 'Anual'
        : 'Desconegut',
    currentPeriodEnd: subscription.current_period_end
      ? new Date(subscription.current_period_end).toLocaleDateString('ca-ES', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : 'Data desconeguda',
  };

  return (
    <div className="bg-amber-200">
      <div>{formattedSubscription.productName}</div>
      <div>{formattedSubscription.priceInterval}</div>
      <div>
        <div>Es renova automàticament el:</div>
        <div>{formattedSubscription.currentPeriodEnd}</div>
      </div>

      <Button asChild>
        <Link
          href={url}
          target="_blank"
        >
          Modifica la teva subscripció
        </Link>
      </Button>
      <pre>{JSON.stringify(subscription, null, 2)}</pre>
    </div>
  );
};
export default SubscriptionDetails;
