import { CalendarDaysIcon, MapPinIcon, SchoolIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TypoH2, TypoP } from '@/components/ui/typo/typoComponents';

import { Route } from '@/data/interfaces/route';
import RouteMap from './Map';

interface RouteContentProps {
  route: Route;
}

const RouteContent = ({ route }: RouteContentProps) => {
  const description = route.routeDesc;
  const accommodations =
    route.accommodation &&
    route.accommodation.length > 0 &&
    route.accommodation;
  const logistics = route.logistics;

  return (
    <>
      <div className="flex flex-col lg:grid grid-cols-12 gap-12">
        {/* DESCRIPCIO */}
        <div className="col-span-7">
          {description.map((p, i) => (
            <TypoP key={i}>{p}</TypoP>
          ))}
        </div>
        {/* TECHNICAL DATA */}
        <div className="col-span-5">
          {route.routeMap && <RouteMap src={route.routeMap} />}
        </div>
      </div>

      <div className="flex flex-col gap-y-12">
        {/* ALLOTJAMENTS */}
        {accommodations && (
          <div>
            <TypoH2 className="mb-4">Allotjament</TypoH2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accommodations.map((acc) => (
                <Card key={acc.date}>
                  <CardContent className="space-y-1">
                    <span className="flex items-center gap-x-2">
                      <CalendarDaysIcon strokeWidth={'1px'} />
                      <p className="font-bold">{acc.date}</p>
                    </span>
                    <span className="flex items-center gap-x-2">
                      <MapPinIcon strokeWidth={'1px'} />
                      <p>{acc.location}</p>
                    </span>
                    <span className="flex items-center gap-x-2">
                      <SchoolIcon strokeWidth={'1px'} />
                      <p>{acc.place}</p>
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* INTENDENCIA */}
        {logistics && (
          <div>
            <TypoH2>Intendència</TypoH2>
            <TypoP>{logistics}</TypoP>
          </div>
        )}
      </div>
    </>
  );
};

export default RouteContent;
