import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarIcon,
  ChurchIcon,
  RouteIcon,
  UsersIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import Hero from '@/components/Hero';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';
import { cn } from '@/lib/utils';
import { site } from '@/config/site.config';

const sections = [
  {
    title: 'El Santuari',
    description:
      'Un lloc de fe, silenci i acollida. Descobreix la història i els espais de contemplació.',
    href: '/santuari',
    icon: ChurchIcon,
    gridClass: 'md:col-span-1', // 1/3
  },
  {
    title: 'Pelegrinatges',
    description:
      'Rutes, itineraris i variants de camí per arribar al Santuari fent pelegrinatge. Prepara la teva visita espiritual amb tota la informació necessària.',
    href: '/pelegrinatges',
    icon: RouteIcon,
    gridClass: 'md:col-span-2', // 2/3
  },
  {
    title: 'Agenda',
    description:
      "Celebracions, actes litúrgics, trobades comunitàries i esdeveniments especials al llarg de l'any. Consulta el calendari i no et perdis cap activitat.",
    href: '/',
    icon: CalendarIcon,
    gridClass: 'md:col-span-3', // 3/3 (full width)
  },
  {
    title: 'Comunitat',
    description:
      "Coneix la comunitat que acull els visitants i pelegrins. Una tradició d'hospitalitat i espiritualitat que perdura al llarg dels segles.",
    href: '/',
    icon: UsersIcon,
    gridClass: 'md:col-span-2', // 2/3
  },
  {
    title: 'Publicacions',
    description: 'Llibres, materials de pregària i recursos espirituals.',
    href: '/',
    icon: BookOpenIcon,
    gridClass: 'md:col-span-1', // 1/3
  },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero
        title={site.hero.title}
        description={site.hero.description}
      />
      <PageContainer className="py-4 flex-1 flex">
        {/* <div className="flex-1 flex flex-col gap-4 justify-center items-center my-4 bg-gray-500 text-amber-200 rounded-md relative">
          <span className="text-xl font-semibold inset-x-0 inset-y-0 bg-stone-800 dark:bg-neutral-700 shadow-xl w-fit h-fit py-3 px-4 rounded-sm -translate-x-4 -translate-y-3 -rotate-6 absolute">
            Pròximament...
          </span>
          <span className="text-8xl">👷🏻‍♂️</span>
          <span className="text-lg font-mono">En construcció</span>
        </div> */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={`${section.title}-${section.href}`}
                  href={section.href}
                  className={cn('group block col-span-1', section.gridClass)}
                >
                  <Card className="relative z-0 h-full min-h-[180px] overflow-hidden border-border/50 bg-card/50 p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg">
                    <CardContent className="flex h-full flex-col justify-between p-0">
                      <div>
                        <div className="absolute top-0 left-0 -translate-5 -z-10 mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/50 transition-colors group-hover:bg-primary/10">
                          <Icon className="h-12 w-12 text-primary/40 transition-colors group-hover:text-primary/70" />
                        </div>
                        <h2 className="mt-6 mb-2 text-xl md:text-2xl font-medium tracking-tight text-foreground">
                          {section.title}
                        </h2>
                        <p className="font-light leading-relaxed text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary/70 transition-colors group-hover:text-primary">
                        <span>Descobreix</span>
                        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
