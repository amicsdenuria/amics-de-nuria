'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarX2Icon, RotateCcwIcon, SearchXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import type { ActivityDisplayStatus } from '@/domain/activity/activity.types';
import { agendaContent } from '@/content/agenda/agendaPage';
import { ActivityCard } from './ActivityCard';
import {
  activitySearchText, normalizeActivitySearch, parseActivityPeriod, toActivityCardData,
  type ActivityBrowserItem, type ActivityPeriod,
} from './activityBrowserModel';

const statusLabels: Record<ActivityDisplayStatus, string> = {
  scheduled: 'Agendada', full: 'Completa', cancelled: 'Cancel·lada', finished: 'Finalitzada',
};
const batchSize = 12;

export function ActivityBrowser({ items, nowISO, initialPeriod }: {
  items: ActivityBrowserItem[]; nowISO: string; initialPeriod: ActivityPeriod;
}) {
  const [query, setQuery] = useState('');
  const [typeId, setTypeId] = useState('');
  const [status, setStatus] = useState('');
  const [period, setPeriod] = useState(initialPeriod);
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const searchInput = useRef<HTMLInputElement>(null);
  const resultsGrid = useRef<HTMLDivElement>(null);
  const firstAddedIndex = useRef<number | null>(null);
  const now = useMemo(() => new Date(nowISO), [nowISO]);
  const prepared = useMemo(() => items.map((item) => ({
    item, searchText: activitySearchText(item), activity: toActivityCardData(item),
  })), [items]);
  const types = useMemo(() => Array.from(new Map(items.map((item) => [item.type.id, item.type])).values())
    .toSorted((first, second) => first.name.localeCompare(second.name, 'ca') || first.id.localeCompare(second.id)), [items]);
  const normalizedQuery = normalizeActivitySearch(query);
  const results = prepared.filter(({ item, searchText }) =>
    (!normalizedQuery || searchText.includes(normalizedQuery)) &&
    (!typeId || item.type.id === typeId) && (!status || item.displayStatus === status) &&
    (period === 'all' || item.period === period));
  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleResults.length < results.length;
  const hasFilters = query !== '' || typeId !== '' || status !== '' || period !== 'all';
  const isEmpty = items.length === 0;
  const { empty } = agendaContent.home;
  const resetVisibleCount = () => {
    firstAddedIndex.current = null;
    setVisibleCount(batchSize);
  };
  const clear = () => {
    setQuery(''); setTypeId(''); setStatus(''); setPeriod('all');
    resetVisibleCount();
    searchInput.current?.focus();
  };
  const showMore = () => {
    firstAddedIndex.current = visibleResults.length;
    setVisibleCount((count) => Math.min(count + batchSize, results.length));
  };
  useEffect(() => {
    if (firstAddedIndex.current === null) return;
    resultsGrid.current?.querySelectorAll<HTMLAnchorElement>('a[href^="/agenda/activity/"]')[firstAddedIndex.current]?.focus();
    firstAddedIndex.current = null;
  }, [visibleCount]);

  return (
    <div className="flex flex-col gap-8">
      <form role="search" aria-label="Cerca i filtres d’activitats" onSubmit={(event) => event.preventDefault()}
        className="rounded-xl border bg-secondary/20 p-5 md:p-6">
        <FieldGroup className="grid gap-5 md:grid-cols-3">
          <Field className="md:col-span-3">
            <FieldLabel htmlFor="activity-search">Cerca activitats</FieldLabel>
            <Input ref={searchInput} id="activity-search" type="search" value={query}
              placeholder="Nom, lloc, organització…" aria-controls="activity-results" autoComplete="off"
              onChange={(event) => { setQuery(event.target.value); resetVisibleCount(); }} />
          </Field>
          <Field>
            <FieldLabel htmlFor="activity-type">Tipus d’activitat</FieldLabel>
            <NativeSelect id="activity-type" value={typeId} aria-controls="activity-results"
              onChange={(event) => { setTypeId(event.target.value); resetVisibleCount(); }} className="w-full">
              <NativeSelectOption value="">Tots els tipus</NativeSelectOption>
              {types.map((type) => <NativeSelectOption key={type.id} value={type.id}>{type.name}</NativeSelectOption>)}
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel htmlFor="activity-status">Estat</FieldLabel>
            <NativeSelect id="activity-status" value={status} aria-controls="activity-results"
              onChange={(event) => { setStatus(event.target.value); resetVisibleCount(); }} className="w-full">
              <NativeSelectOption value="">Tots els estats</NativeSelectOption>
              {Object.entries(statusLabels).map(([value, label]) =>
                <NativeSelectOption key={value} value={value}>{label}</NativeSelectOption>)}
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel htmlFor="activity-period">Període</FieldLabel>
            <NativeSelect id="activity-period" value={period} aria-controls="activity-results"
              onChange={(event) => { setPeriod(parseActivityPeriod(event.target.value)); resetVisibleCount(); }} className="w-full">
              <NativeSelectOption value="all">Tots els períodes</NativeSelectOption>
              <NativeSelectOption value="upcoming">Properes i d’avui</NativeSelectOption>
              <NativeSelectOption value="archived">Arxivades</NativeSelectOption>
            </NativeSelect>
          </Field>
        </FieldGroup>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? 'activitat' : 'activitats'} de {items.length}
          </p>
          <Button type="button" variant="outline" disabled={!hasFilters} onClick={clear}>
            <RotateCcwIcon aria-hidden="true" data-icon="inline-start" />Neteja els filtres
          </Button>
        </div>
      </form>
      <div id="activity-results">
        {results.length > 0 ? (
          <div className="flex flex-col gap-6">
            <div ref={resultsGrid} className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleResults.map(({ activity }) => <ActivityCard key={activity.id} activity={activity} now={now}
                href={`/agenda/activity/${activity.slug}`} prefetch={false} />)}
            </div>
            {results.length > batchSize && (
              <div className="flex flex-col items-center gap-3">
                <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-muted-foreground">
                  Mostrant {visibleResults.length} de {results.length} activitats
                </p>
                {hasMore && <Button type="button" variant="outline" aria-controls="activity-results" onClick={showMore}>
                  Veure&apos;n més
                </Button>}
              </div>
            )}
          </div>
        ) : (
          <Empty className="border py-16" role="status">
            <EmptyHeader>
              <EmptyMedia variant="icon">{isEmpty ? <CalendarX2Icon aria-hidden="true" /> : <SearchXIcon aria-hidden="true" />}</EmptyMedia>
              <EmptyTitle>{isEmpty ? empty.title : 'No hem trobat cap activitat'}</EmptyTitle>
              <EmptyDescription>{isEmpty ? empty.description : 'Prova una altra cerca o neteja els filtres per veure totes les activitats.'}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </div>
  );
}
