import { SantuariInfoItem } from '@/data/santuari/interfaces';

interface SantuariInfoCardProps {
  item: SantuariInfoItem;
}

const SantuariInfoCard = ({ item }: SantuariInfoCardProps) => {
  return (
    <div className="rounded-lg border border-border/50 bg-card/50 p-6 transition-colors hover:bg-card">
      <h4 className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
        {item.label}
      </h4>
      <p className="text-base font-light leading-relaxed text-muted-foreground">
        {item.value}
      </p>
    </div>
  );
};

export default SantuariInfoCard;
