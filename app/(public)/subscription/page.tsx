import { fetchProductsWithRecurringPrices } from '@/actions/fetchProductsWithRecurringPrices';
import IntervalTabs from '@/components/subscription/IntervalTabs';
import SubscriptionDetails from '@/components/subscription/SubscriptionDetails';
import SubscriptionGrid from '@/components/subscription/SubscriptionGrid';
import PageContainer from '@/components/ui/page-container';
import { getIsEnrolled } from '@/sanity/lib/subscriber/getIsEnrolled';
import { currentUser } from '@clerk/nextjs/server';

interface SubscriptionsPageProps {
  searchParams: Promise<{ interval?: 'year' }>;
}

export const dynamic = 'force-dynamic';

const SubscriptionsPage = async ({ searchParams }: SubscriptionsPageProps) => {
  const { interval } = await searchParams;
  const user = await currentUser();

  const productsWithRecurringPrices = await fetchProductsWithRecurringPrices({
    interval: interval === 'year' ? 'year' : 'month',
  });
  const isEnrolled = await getIsEnrolled({ clerkId: user?.id });

  if (!productsWithRecurringPrices) {
    return <div>No s&apos;han trobat subscripcions disponibles</div>;
  }

  return (
    <main className="flex-1">
      <PageContainer className="py-4">
        {isEnrolled ? (
          <SubscriptionDetails
            clerkId={user?.id}
            userEmail={user?.primaryEmailAddress?.emailAddress}
          />
        ) : (
          <>
            <IntervalTabs />
            <SubscriptionGrid
              products={productsWithRecurringPrices}
              interval={interval ?? 'month'}
            />
          </>
        )}
      </PageContainer>
    </main>
  );
};
export default SubscriptionsPage;
