'use client';

import { ImageIcon, MapIcon, VideoIcon } from 'lucide-react';

import ImgsCarousel from '../../../components/ImgsCarousel';
import RouteMap from '../../../components/Map';
import { TabsContent } from '@/components/ui/tabs';
import { TabsManager } from './TabsManager';

interface StageMediaProps {
  videoUrl: string | undefined;
  mapUrl: string;
  imgs: { url: string; alt: string }[] | undefined;
}

const StageMedia = ({ videoUrl, mapUrl, imgs }: StageMediaProps) => {
  const tabs = [
    {
      value: 'map',
      label: 'Mapa',
      icon: <MapIcon />,
    },
    ...(videoUrl
      ? [
          {
            value: 'video',
            label: 'Vídeo',
            icon: <VideoIcon />,
          },
        ]
      : []),
    ...(imgs
      ? [
          {
            value: 'imgs',
            label: 'Imatges',
            icon: <ImageIcon />,
          },
        ]
      : []),
  ];

  return (
    <TabsManager
      paramName="mediaTab"
      defaultValue="map"
      sectionId="media-section"
      tabs={tabs}
    >
      <TabsContent value="map">
        <div className="mt-4">
          <RouteMap src={mapUrl} />
        </div>
      </TabsContent>

      {videoUrl && (
        <TabsContent value="video">
          <div className="overflow-hidden w-7xl my-8 mx-auto rounded-xl border bg-black">
            <video
              className="block aspect-video w-full"
              controls
              preload="metadata"
              playsInline
            >
              <source
                src={videoUrl}
                type="video/mp4"
              />
              El teu navegador no suporta la reproducció de vídeo.
            </video>
          </div>
        </TabsContent>
      )}

      {imgs && (
        <TabsContent value="imgs">
          <ImgsCarousel imgs={imgs} />
        </TabsContent>
      )}
    </TabsManager>
  );
};

export default StageMedia;
