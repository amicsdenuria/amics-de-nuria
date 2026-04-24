import { ImageIcon, MapIcon, VideoIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ImgsCarousel from '../../../components/ImgsCarousel';
import RouteMap from '../../../components/Map';

interface StageMediaProps {
  videoUrl: string | undefined;
  mapUrl: string;
  imgs: { url: string; alt: string }[] | undefined;
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
          {videoUrl && (
            <TabsTrigger value="video">
              <VideoIcon />
              Vídeo
            </TabsTrigger>
          )}
          {imgs && (
            <TabsTrigger value="imgs">
              <ImageIcon />
              Imatges
            </TabsTrigger>
          )}
        </TabsList>
      </div>
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
    </Tabs>
  );
};

export default StageMedia;
