import { ImageIcon, MapIcon, VideoIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ImgsCarousel from '../../../components/ImgsCarousel';
import RouteMap from '../../../components/Map';

interface StageMediaProps {
  videoUrl: string;
  mapUrl: string;
  imgs: string[];
}

const StageMedia = ({ videoUrl, mapUrl, imgs }: StageMediaProps) => {
  return (
    <Tabs defaultValue="map">
      <div>
        <TabsList>
          <TabsTrigger value="map">
            <MapIcon />
            Mapa
          </TabsTrigger>
          <TabsTrigger value="video">
            <VideoIcon />
            Vídeo
          </TabsTrigger>
          <TabsTrigger value="imgs">
            <ImageIcon />
            Imatges
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="map">
        <div className="mt-4">
          <RouteMap src={mapUrl} />
        </div>
      </TabsContent>

      <TabsContent value="video">
        <div className="overflow-hidden rounded-xl border bg-black">
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

      <TabsContent value="imgs">
        <ImgsCarousel imgs={imgs} />
      </TabsContent>
    </Tabs>
  );
};

export default StageMedia;
