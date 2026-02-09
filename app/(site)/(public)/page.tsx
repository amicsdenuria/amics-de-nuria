import Hero from '@/components/Hero';
import PageContainer from '@/components/ui/page-container';
import { AlertTriangleIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <PageContainer className="py-4 flex-1 flex">
        <div className="flex-1 flex gap-4 justify-center items-center my-4 bg-gray-500 text-amber-200 rounded-md">
          <AlertTriangleIcon />
          <span className="text-xl font-semibold">En construcció</span>
        </div>
      </PageContainer>
    </main>
  );
}
