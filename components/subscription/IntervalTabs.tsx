import Link from 'next/link';
import { Button } from '../ui/button';

const IntervalTabs = () => {
  return (
    <div className="w-full flex items-center justify-center gap-4 py-8">
      <Button asChild>
        <Link href="/subscription">Mensual</Link>
      </Button>
      <Button asChild>
        <Link href="/subscription?interval=year">Anual</Link>
      </Button>
    </div>
  );
};
export default IntervalTabs;
