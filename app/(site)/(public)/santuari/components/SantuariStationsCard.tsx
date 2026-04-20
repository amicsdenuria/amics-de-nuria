import { OrderedCardItem } from '@/content/interfaces/primary-page-interfaces';

interface SantuariStationsCardProps {
  station: OrderedCardItem;
}
const SantuariStationsCard = ({ station }: SantuariStationsCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-md">
      <div className="flex items-start gap-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-medium text-primary">
          {station.number}
        </span>
        <div className="flex-1">
          <h3 className="mb-3 text-lg font-medium tracking-tight text-foreground">
            {station.title}
          </h3>
          <p className="text-base font-light italic leading-relaxed text-muted-foreground">
            {station.body}
          </p>
        </div>
      </div>
    </article>
  );
};

export default SantuariStationsCard;
