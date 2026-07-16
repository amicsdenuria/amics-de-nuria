'use client';

import { Lock, LockOpen, X } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface RouteMapProps {
  src: string;
}

const RouteMap = ({ src }: RouteMapProps) => {
  const [mapType, setMapType] = useState<'M' | 'T'>('M');
  const [showElevationProfile, setshowElevationProfile] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const url = useMemo(() => {
    const mapUrl = new URL(src);
    mapUrl.searchParams.set('maptype', mapType);
    mapUrl.searchParams.set('elevation', showElevationProfile ? 'on' : 'off');
    return mapUrl.toString();
  }, [src, mapType, showElevationProfile]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setInteractive(false);
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (
        interactive &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setInteractive(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [interactive]);

  return (
    <div className="space-y-4 relative">
      <div className="flex w-full gap-x-4 h-15 absolute right-0 top-0 bg-white px-4 border rounded-t-lg z-20">
        <div className="right-4 top-3 flex gap-x-8 items-center">
          <ToggleGroup
            type="single"
            variant="outline"
            value={mapType}
            onValueChange={(v) => {
              if (v === 'M' || v === 'T') setMapType(v);
            }}
          >
            <ToggleGroupItem
              value="M"
              className={cn(
                'font-semibold',
                mapType !== 'M' && 'text-muted-foreground/80',
              )}
            >
              Plànol
            </ToggleGroupItem>
            <ToggleGroupItem
              value="T"
              className={cn(
                'font-semibold',
                mapType !== 'T' && 'text-muted-foreground/80',
              )}
            >
              Terreny
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="flex items-center space-x-2">
            <Switch
              id="profileElevation"
              checked={showElevationProfile}
              onCheckedChange={setshowElevationProfile}
            />
            <Label
              htmlFor="profileElevation"
              className="w-max"
            >
              Mostra Perfil
            </Label>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative lg:aspect-video h-[600px] lg:h-auto rounded-sm overflow-hidden border"
      >
        {!interactive && (
          <button
            type="button"
            onClick={() => setInteractive(true)}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[1px]"
          >
            <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium shadow-md">
              <Lock className="h-4 w-4" />
              Fes clic per interactuar amb el mapa
            </div>
          </button>
        )}

        {interactive && (
          <Button
            type="button"
            onClick={() => setInteractive(false)}
            className="absolute right-3 top-3 z-30 inline-flex items-center gap-2"
          >
            <LockOpen className="h-4 w-4" />
            Bloqueja el mapa
            <X className="h-4 w-4" />
          </Button>
        )}

        <iframe
          src={url}
          scrolling="no"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de la ruta"
          className={cn(
            'h-full w-full transition-opacity',
            interactive ? 'pointer-events-auto' : 'pointer-events-none',
          )}
        />
      </div>
    </div>
  );
};

export default RouteMap;
