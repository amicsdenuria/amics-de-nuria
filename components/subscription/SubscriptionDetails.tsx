import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import PortalButton from './PortalButton';
import { getActiveSubscriptionByClerkId } from '@/sanity/lib/subscription/getActiveSubscriptionByClerkId';
import { notFound } from 'next/navigation';

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
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {formattedSubscription.productName}
        </CardTitle>
        <CardAction className="text-2xl">
          {subscription.unit_amount?.toFixed(2)}€
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h2 className="text-muted-foreground">Tipus de pagament</h2>
          <p className="text-xl font-semibold">
            {formattedSubscription.priceInterval}
          </p>
        </div>
        <div>
          <h2 className="text-muted-foreground">
            Es renova automàticament el:
          </h2>
          <p className="text-xl font-semibold">
            {formattedSubscription.currentPeriodEnd}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <PortalButton />
      </CardFooter>
    </Card>
  );
};
export default SubscriptionDetails;
