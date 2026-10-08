import type { Metadata } from 'next';
import Link from 'next/link';
import { connection } from 'next/server';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/ui/page-container';
import { getActivities, getAgendaNow } from '@/domain/activity/activity.service';
import { ActivityBrowser } from '../components/ActivityBrowser';
import { parseActivityPeriod, toActivityBrowserItems } from '../components/activityBrowserModel';

export const metadata: Metadata = {
  title: 'Totes les activitats | Amics de Núria',
  description: 'Troba les activitats dels Amics de Núria. Cerca per nom o lloc i filtra per tipus, estat i període.',
};

export default async function ActivitiesPage({ searchParams }: {
  searchParams: Promise<{ period?: string | string[] }>;
}) {
  await connection();
  const now = getAgendaNow();
  const [activities, params] = await Promise.all([getActivities(), searchParams]);
  const period = parseActivityPeriod(params.period);
  return (
    <PageContainer className="py-10 md:py-16">
      <Button asChild variant="link" className="mb-6 px-0">
        <Link href="/agenda"><ArrowLeftIcon aria-hidden="true" data-icon="inline-start" />Torna a l’agenda</Link>
      </Button>
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Agenda</p>
        <h1 className="font-serif text-4xl text-primary md:text-5xl">Totes les activitats</h1>
        <p className="max-w-2xl text-muted-foreground">Troba la teva propera trobada o recupera les activitats que ja hem compartit.</p>
      </div>
      <ActivityBrowser key={period} items={toActivityBrowserItems(activities, now)} nowISO={now.toISOString()} initialPeriod={period} />
    </PageContainer>
  );
}
