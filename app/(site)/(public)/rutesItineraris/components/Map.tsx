'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useMemo, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface RouteMapProps {
  src: string;
}

const RouteMap = ({ src }: RouteMapProps) => {
  const [mapType, setMapType] = useState<'M' | 'T'>('M');
  const [showElevationProfile, setshowElevationProfile] = useState(true);

  const url = useMemo(() => {
    const mapUrl = new URL(src);
    mapUrl.searchParams.set('maptype', mapType);
    mapUrl.searchParams.set('elevation', showElevationProfile ? 'on' : 'off');
    return mapUrl.toString();
  }, [src, mapType, showElevationProfile]);

  return (
    <div className="space-y-4 relative">
      <div className="flex gap-x-4 h-15 justify-end absolute right-0 top-0 bg-linear-to-r from-white via-white to-neutral-200 px-4 border rounded-tr-lg">
        <div className="right-4 top-3 flex gap-x-4">
          <ToggleGroup
            type="single"
            variant={'outline'}
            value={mapType}
            onValueChange={(v) => setMapType(v as 'M' | 'T')}
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

      <div className="lg:aspect-video h-[600px] lg:h-auto rounded-sm overflow-hidden">
        <iframe
          src={url}
          scrolling="no"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de la ruta"
        />
      </div>
    </div>
  );
};

export default RouteMap;
