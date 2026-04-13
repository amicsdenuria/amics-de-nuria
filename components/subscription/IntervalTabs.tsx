import { Button } from '../ui/button';
import Link from 'next/link';

interface IntervalTabsProps {
  interval: 'year' | 'month';
}

const IntervalTabs = ({ interval }: IntervalTabsProps) => {
  return (
    <div className="w-full flex items-center justify-center gap-4 py-8">
      <div className="bg-muted p-3 rounded-lg flex gap-x-3">
        <Button
          asChild
          variant={interval === 'month' ? 'default' : 'ghost'}
        >
          <Link href="/subscription">Mensual</Link>
        </Button>
        <Button
          asChild
          variant={interval === 'year' ? 'default' : 'ghost'}
        >
          <Link href="/subscription?interval=year">Anual</Link>
        </Button>
      </div>
    </div>
  );
};
export default IntervalTabs;
