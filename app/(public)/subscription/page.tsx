import { fetchProductsWithRecurringPrices } from '@/actions/fetchProductsWithRecurringPrices';
import IntervalTabs from '@/components/subscription/IntervalTabs';
import SubscriptionGrid from '@/components/subscription/SubscriptionGrid';
import PageContainer from '@/components/ui/page-container';

interface SubscriptionsPageProps {
  searchParams: Promise<{ interval?: 'year' }>;
}

const SubscriptionsPage = async ({ searchParams }: SubscriptionsPageProps) => {
  const { interval } = await searchParams;

  const productsWithRecurringPrices = await fetchProductsWithRecurringPrices({
    interval: interval === 'year' ? 'year' : 'month',
  });

  if (!productsWithRecurringPrices) {
    return <div>No s&apos;han trobat subscripcions disponibles</div>;
  }

  return (
    <main className="flex-1">
      <PageContainer className="py-4">
        <IntervalTabs />
        <SubscriptionGrid
          products={productsWithRecurringPrices}
          interval={interval ?? 'month'}
        />
      </PageContainer>
    </main>
  );
};
export default SubscriptionsPage;
