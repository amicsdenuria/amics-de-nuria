import PageContainer from '@/components/ui/page-container';
import ProductPrices from '@/components/subscription/ProductPrices';
import SubscriptionDetails from '@/components/subscription/SubscriptionDetails';
import { currentUser } from '@clerk/nextjs/server';
import { fetchAllProductsWithRecurringPrices } from '@/actions/fetchAllProductsWithRecurringPrices';
import { getIsEnrolled } from '@/sanity/lib/subscriber/getIsEnrolled';

const SubscriptionsPage = async () => {
  const user = await currentUser();

  const { month: productsMonth, year: productsYear } =
    await fetchAllProductsWithRecurringPrices();
  const isEnrolled = await getIsEnrolled({ clerkId: user?.id });

  if (!productsMonth || !productsYear) {
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
          <ProductPrices
            productsMonth={productsMonth}
            productsYear={productsYear}
          />
        )}
      </PageContainer>
    </main>
  );
};
export default SubscriptionsPage;
