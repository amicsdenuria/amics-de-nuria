import { Button } from '@/components/ui/button';
import { santuariCameras, santuariCamerasPath } from '@/content/santuari/santuariCameras';
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CameraSnapshot from '../../components/CameraSnapshot';

interface CameraPageProps {
  params: Promise<{ camera: string }>;
}

function findCamera(slug: string) {
  const camera = santuariCameras.find((entry) => entry.slug === slug);
  if (!camera) notFound();
  return camera;
}

export async function generateMetadata({ params }: CameraPageProps): Promise<Metadata> {
  const camera = findCamera((await params).camera);
  return {
    title: `${camera.title} · Càmeres de la Vall de Núria`,
    description: camera.imageAlt,
  };
}

export default async function CameraPage({ params }: CameraPageProps) {
  const camera = findCamera((await params).camera);
  const { viewer } = camera;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12 md:gap-8 md:py-16">
      <Button asChild variant="ghost" className="-ms-3 self-start">
        <Link href={santuariCamerasPath}>
          <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" />
          Totes les càmeres
        </Link>
      </Button>
      <h1 className="text-4xl font-light tracking-tight md:text-5xl">{camera.title}</h1>
      <figure className="flex flex-col gap-4">
        {viewer?.type === '3cat' ? (
          <div className="@container mx-auto w-full max-w-[600px] overflow-hidden rounded-xl border bg-muted">
            {/* The height includes the 16:9 photo and the widget's weather information. */}
            <iframe
              src={viewer.url}
              title={`Càmera de ${camera.title}`}
              allowFullScreen
              className="block w-full border-0"
              style={{ height: 'calc(232px + 56.25cqw)' }}
            />
          </div>
        ) : viewer ? (
          <iframe
            src={viewer.url}
            title={`Càmera de ${camera.title}`}
            allowFullScreen
            className="block h-[28rem] w-full rounded-xl border bg-muted sm:h-[36rem]"
          />
        ) : (
          <CameraSnapshot
            key={camera.slug}
            src={camera.imageUrl}
            alt={camera.imageAlt}
            position={camera.imagePosition}
            fit={camera.imagePosition ? 'cover' : 'contain'}
            className="rounded-xl border"
          />
        )}
        <figcaption className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">Imatges de {camera.sourceName}</span>
          <Button asChild variant="outline">
            <a href={camera.sourceUrl} target="_blank" rel="noopener noreferrer">
              Obre la font original
              <ExternalLinkIcon aria-hidden="true" data-icon="inline-end" />
            </a>
          </Button>
        </figcaption>
      </figure>
    </main>
  );
}
