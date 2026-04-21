import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Link from 'next/link';

interface ActivityCardProps {
  activity: {
    title: string;
    description: string;
  };
  href: string;
}
const ActivityCard = ({ activity, href }: ActivityCardProps) => {
  const { title, description } = activity;
  return (
    <Link
      href={href}
      className="group"
    >
      <Card className="min-h-48 bg-card/60 transition-all hover:bg-card hover:shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ActivityCard;
