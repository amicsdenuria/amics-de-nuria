'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/ui/page-container';

export default function ContentReadError({ reset }: { reset: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <PageContainer className="py-16 text-center">
      <div role="alert">
        <h2 className="mb-4 font-serif text-3xl">No hem pogut carregar la informació</h2>
        <p className="mb-6 text-muted-foreground">Torna-ho a provar d’aquí a un moment.</p>
        <Button disabled={pending} onClick={() => startTransition(() => {
          router.refresh();
          reset();
        })}>{pending ? 'Carregant…' : 'Torna-ho a provar'}</Button>
      </div>
    </PageContainer>
  );
}
