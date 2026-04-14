interface RouteMapProps {
  src: string;
}

const RouteMap = ({ src }: RouteMapProps) => {
  return (
    <div className="relative w-full aspect-video">
      <iframe
        src={src}
        className="absolute inset-0 h-full w-full border-primary border-8 rounded-sm shadow-lg"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default RouteMap;
