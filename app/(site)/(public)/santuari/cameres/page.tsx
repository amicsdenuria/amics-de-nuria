import { Button } from '@/components/ui/button';
import { TypoPVar } from '@/components/ui/typo/typoComponents';
import { santuariCameras } from '@/content/santuari/santuariCameras';
import { ArrowLeftIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CameraGrid from '../components/CameraGrid';

export const metadata: Metadata = {
  title: 'Càmeres en directe de la Vall de Núria',
  description: 'Consulta les darreres imatges de les càmeres del Santuari i de la Vall de Núria.',
};

export default function CamerasPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-10 md:py-16">
      <Button asChild variant="ghost" className="-ms-3 self-start">
        <Link href="/santuari">
          <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" />
          Santuari
        </Link>
      </Button>
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-light tracking-tight md:text-5xl">
          Càmeres de la Vall de Núria
        </h1>
        <TypoPVar>
          La galeria mostra set vistes de cinc càmeres. Recarrega la pàgina per
          consultar les darreres captures disponibles.
        </TypoPVar>
        <TypoPVar>
          L’Estany de Núria és un retall de la panoràmica del Túnel del
          Cremallera. Finestrelles és un retall de la panoràmica del Mirador de
          la Canal. Les dues panoràmiques solen renovar-se cada 10 minuts.
        </TypoPVar>
        <TypoPVar>
          FGC publica les fotos de Pistes i del Santuari des del llac. El visor
          de 3Cat indica de quan és la foto de Vall de Núria.
        </TypoPVar>
      </header>
      <CameraGrid cameras={santuariCameras} />
    </main>
  );
}
