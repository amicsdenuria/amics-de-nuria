import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { SantuariSectionCard } from '@/data/santuari/interfaces';

interface SectionCardProps {
  card: SantuariSectionCard;
}
const SectionCard = ({ card }: SectionCardProps) => {
  return (
    <Link
      href={card.href}
      className="group block h-full"
    >
      <Card className="h-full border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-xl font-medium tracking-tight text-foreground">
            {card.title}
            <ArrowRightIcon className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base font-light leading-relaxed text-muted-foreground">
            {card.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SectionCard;
