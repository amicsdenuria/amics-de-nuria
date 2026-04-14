import { Route } from './interfaces/route';

export const routes: Route[] = [
  {
    id: 'a',
    origin: 'Montserrat',
    destiny: 'Núria',
    alternativeRoutePoints: ['Berguedà'],
    routeDesc: [
      'Aquesta ruta uneix Montserrat amb Núria travessant el Berguedà, oferint un recorregut equilibrat entre exigència física i bellesa natural. Al llarg del camí, s’alternen senders boscosos amb trams més oberts que permeten gaudir de vistes panoràmiques dels Prepirineus. És una opció ideal per a qui busca una experiència completa sense massa complicacions tècniques. El desnivell és progressiu, cosa que la fa accessible per a senderistes amb certa experiència. A més, passa per petits nuclis rurals on és possible fer pauses i recuperar forces.',
      'La ruta consta de 8 etapes. S’inicia a Montserrat, comarca del Bages i consta de tres etapes inicials: 1a. Montserrat – Castellgalí – Manresa  |  2a. Manresa – Navarcles – Sallent  |  3a. Sallent – Balsareny – Puig-reig. A partir de la 4a etapa (encara dins la comarca del Bages) aquesta ruta atravessa la comarca del Berguedà per arribar finalment al punt final. El santuari de Núria',
    ],
    routeMap:
      'https://www.google.com/maps/d/embed?mid=1DVKg3IuZ1WP-XVVZQyjnHh1vBecWmI0&hl=ca&ehbc=2E312F',
    accommodation: [
      {
        date: '1 Agost',
        location: 'Montserrat',
        place: 'Alberg de Montserrat',
      },
      {
        date: '2 Agost',
        location: 'Manresa',
        place: 'Santuari de Cova de Manresa',
      },
      {
        date: '3 Agost',
        location: 'Sallent',
        place: 'Rectoria de Sallent',
      },
      {
        date: '4 Agost',
        location: 'Puig-reig',
        place: 'Hostal Sant Martí',
      },
      {
        date: '5 Agost',
        location: 'Santa Maria de Merlès',
        place: 'Hostal Sant Cristòfol',
      },
      {
        date: '6 Agost',
        location: 'Puigcercós',
        place: 'Refugi de Puigcercós',
      },
      {
        date: '7 Agost',
        location: 'Campdevànol',
        place: 'Hotel La Sèquia Molinar',
      },
      {
        date: '8 Agost',
        location: 'Planoles',
        place: 'Alberg de la Xanascat',
      },
    ],
    logistics:
      "El pelegrinatge compta amb el suport d'una autocaravana per garantir l'avituallament i alguns àpats, així com per atendre les necessitats que puguin sorgir.",
  },
  {
    id: 'b',
    origin: 'Montserrat',
    destiny: 'Núria',
    alternativeRoutePoints: ['Lluçanès', 'Campdevànol'],
    routeDesc: [
      'Aquesta variant de la ruta cap a Núria passa pel Lluçanès i Campdevànol, oferint un recorregut més llarg però molt variat en paisatges. Es caracteritza per travessar zones de mitja muntanya amb abundant vegetació i camins tradicionals ben marcats. A mesura que s’avança, l’entorn esdevé més alpí, anticipant l’arribada a la vall de Núria. És una opció perfecta per a qui gaudeix de rutes més llargues i amb canvis progressius en el terreny. L’arribada final resulta especialment gratificant després de superar els últims desnivells.',
    ],
  },
  {
    id: 'c',
    origin: 'Montserrat',
    destiny: 'Núria',
    alternativeRoutePoints: ['Lluçanès', 'Planoles'],
    routeDesc: [
      'Aquesta alternativa per Planoles comparteix l’inici amb altres variants, però es diferencia en la seva aproximació final cap a Núria. El recorregut combina pistes forestals amb senders més estrets que travessen paisatges tranquils i poc transitats. És una ruta especialment atractiva per a qui busca una major sensació d’aïllament i contacte amb la natura. El pas per Planoles permet una parada estratègica abans del tram final d’ascens. En conjunt, ofereix una experiència més íntima sense renunciar a l’espectacularitat del destí.',
    ],
  },
];
