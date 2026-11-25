import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { santuariCamerasPath, type SantuariCamera } from '@/content/santuari/santuariCameras';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import CameraSnapshot from './CameraSnapshot';

export default function CameraGrid({ cameras }: { cameras: readonly SantuariCamera[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cameras.map((camera) => {
        const labelId = `camera-${camera.slug}`;

        return (
          <li key={camera.slug}>
            <Link
              href={`${santuariCamerasPath}/${camera.slug}`}
              aria-labelledby={labelId}
              className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow group-hover:shadow-md">
                <CardContent className="px-0">
                  <CameraSnapshot
                    src={camera.imageUrl}
                    alt={camera.imageAlt}
                    position={camera.imagePosition}
                  />
                </CardContent>
                <CardHeader className="px-5 py-4">
                  <CardTitle id={labelId}>{camera.title}</CardTitle>
                  <CardDescription>{camera.sourceName}</CardDescription>
                  <CardAction>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-4 text-muted-foreground motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                    />
                  </CardAction>
                </CardHeader>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
