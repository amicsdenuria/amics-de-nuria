interface Payment {
  title: string;
  label: string;
  yearlyPrice: number;
  monthlyPrice: number;
  yearlyPriceId: string;
  monthlyPriceId: string;
}

export const payments: Payment[] = [
  {
    title: 'Essència de Núria',
    label: 'Cordial',
    yearlyPrice: 3000,
    monthlyPrice: 300,
    yearlyPriceId: 'price_1SYtgPGnKrrjhuuIDmL3j1hr',
    monthlyPriceId: 'price_1SYtikGnKrrjhuuI4758RjpY',
  },
  {
    title: 'Arrel de Núria',
    label: 'Compromès',
    yearlyPrice: 6000,
    monthlyPrice: 600,
    yearlyPriceId: 'price_1SYtiMGnKrrjhuuIv2pJMfwj',
    monthlyPriceId: 'price_1SYthbGnKrrjhuuInMAsrYm6',
  },
  {
    title: 'Llegat de Núria',
    label: 'Generós',
    yearlyPrice: 12000,
    monthlyPrice: 1200,
    yearlyPriceId: 'price_1SYtj4GnKrrjhuuIubGNpuYz',
    monthlyPriceId: 'price_1SYtikGnKrrjhuuI4758RjpY',
  },
];
