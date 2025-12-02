import { Button } from '../ui/button';

interface SubscriptionCardProps {
  title: string;
  label?: string;
  price: number;
  interval?: 'month' | 'year';
  priceId: string;
  disabled: boolean;
  onSubscribe: (priceId: string) => void;
}

const SubscriptionCard = ({
  title,
  label,
  price,
  interval = 'month',
  priceId,
  disabled,
  onSubscribe,
}: SubscriptionCardProps) => {
  return (
    <div className="bg-secondary p-4 rounded-md shadow-md flex flex-col space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-secondary text-sm bg-chart-2/40 px-2 py-1 rounded-full">
          {label}
        </span>
      </div>
      <div className="flex flex-col space-y-8">
        <div>
          <div className="text-muted-foreground">
            {interval === 'year' ? (
              <span className="text-4xl text-primary font-bold">
                {(price / 100 / 12).toFixed(2)} €
              </span>
            ) : (
              <span className="text-4xl text-primary font-bold">
                {(price / 100).toFixed(2)} €
              </span>
            )}
            /mes
          </div>
          {interval === 'year' && (
            <div className="text-muted-foreground">
              <span className="text-lg font-semibold">
                {(price / 100).toFixed(2)}€
              </span>{' '}
              facturats anualment
            </div>
          )}
        </div>
        <Button
          disabled={disabled}
          onClick={() => onSubscribe(priceId)}
        >
          Subscriu-te
        </Button>
      </div>
    </div>
  );
};
export default SubscriptionCard;
