// Pelegrinatges/ // info, ruta d'enguany, altres rutes...
//   Rutes/
//     R1a
//       E1
//       E2
//       E3
//       ...
//     R1b
//       E1
//       E2
//       E3
//       ...
//     R2
//       E1
//       E2
//       E3
//       ...
//     ...

export interface Route {
  id: string;
  origin: string;
  destiny: string;
  alternativeRoutePoints?: string[]; // si es ruta variant ex: (variant 1 o pel Berguedà)
  currentRouteDesc?: string; // info i detalls de la ruta contextualitzats en la ruta concreta que farà AdN.
  routeDesc: string[]; // indicar si aquesta ruta té variants o altra info genèrica de la ruta.
  routeMap?: string;
  accommodation?: RouteAccommodationPoint[];
  logistics?: string;
}

export interface RouteAccommodationPoint {
  date: string;
  location: string;
  place: string;
}

export interface Stage {
  id: string;
  origin: string;
  destiny: string;
}

// const currentRoute: Route = {
//   id: 'abc',
//   origin: 'Montserrat',
//   destiny: 'Núria',
//   currentRouteDesc:
//     'Enguany, amb la celebració dels 25 anys del Pelegrinatge, encetarem la variant que passa pel Lluçanès, concretament per la Riera de Merlès, per seguir cap a Campdevànol, Planoles i, finalment, accedir a Núria.',
//   routeDesc: [
//     'El pelegrinatge de Montserrat a Núria per etapes és el trajecte que organitza anualment Amics de Núria. Aquest està estructurat en vuit etapes que transiten d’església a església, tot enfilant o vorejant esglésies, ermites o capelles que va descobrint al llarg del camí.',
//     "La variant 1b comparteix les tres primeres etapes de la ruta original, que transcorren per la comarca del Bages. A partir d'aquest punt, continua pel Lluçanès, diferenciant-se de la variant 1a, que ho fa pel Berguedà. Més endavant, ambdues variants es retroben de nou al Ripollès, des d'on s'afronta el tram final fins al Santuari de Núria, seguint en aquest cas l'itinerari propi de la variant 1b.",
//   ],
// };
