import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const bankAccount = {
  holder: '',
  iban: '',
};

export function DonationTransferDetails({ heading: Heading = 'h3' }: { heading?: 'h3' | 'h4' }) {
  const hasBankAccount = Boolean(bankAccount.holder && bankAccount.iban);

  return (
    <Card className="w-full min-w-0 text-left">
      <CardHeader>
        <CardTitle>
          <Heading>Dades de la transferència</Heading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-4">
          {hasBankAccount && (
            <div>
              <dt className="text-sm text-muted-foreground">Titular del compte</dt>
              <dd className="mt-1">{bankAccount.holder}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-muted-foreground">IBAN</dt>
            <dd className="mt-1 wrap-anywhere font-mono text-lg leading-relaxed select-all">
              {hasBankAccount ? bankAccount.iban : 'ES00 XXXX XXXX XXXX XXXX XXXX'}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Concepte</dt>
            <dd className="mt-1">Donatiu</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
