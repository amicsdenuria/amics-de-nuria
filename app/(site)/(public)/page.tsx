import Hero from '@/components/Hero';
import PageContainer from '@/components/ui/page-container';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <PageContainer className="py-4 flex-1 flex">
        <div className="flex-1 flex flex-col gap-4 justify-center items-center my-4 bg-gray-500 text-amber-200 rounded-md relative">
          <span className="text-xl font-semibold inset-x-0 inset-y-0 bg-stone-800 dark:bg-neutral-700 shadow-xl w-fit h-fit py-3 px-4 rounded-sm -translate-x-4 -translate-y-3 -rotate-6 absolute">
            Pròximament...
          </span>
          <span className="text-8xl">👷🏻‍♂️</span>
          <span className="text-lg font-mono">En construcció</span>
        </div>
      </PageContainer>
    </main>
  );
}
