import { Route } from './interfaces/route';

export const routes: Route[] = [
  {
    id: 'route-a',
    origin: 'Montserrat',
    destiny: 'Núria',
    alternativeRoutePoints: ['Berguedà'],
    routeDesc: [
      'Aquesta ruta uneix Montserrat amb Núria travessant el Berguedà, oferint un recorregut equilibrat entre exigència física i bellesa natural. Al llarg del camí, s’alternen senders boscosos amb trams més oberts que permeten gaudir de vistes panoràmiques dels Prepirineus. És una opció ideal per a qui busca una experiència completa sense massa complicacions tècniques. El desnivell és progressiu, cosa que la fa accessible per a senderistes amb certa experiència. A més, passa per petits nuclis rurals on és possible fer pauses i recuperar forces.',
      'La ruta consta de 8 etapes. S’inicia a Montserrat, comarca del Bages i consta de tres etapes inicials: 1a. Montserrat – Castellgalí – Manresa  |  2a. Manresa – Navarcles – Sallent  |  3a. Sallent – Balsareny – Puig-reig. A partir de la 4a etapa (encara dins la comarca del Bages) aquesta ruta atravessa la comarca del Berguedà per arribar finalment al punt final. El santuari de Núria',
    ],
    routeMapUrl:
      'https://ca.wikiloc.com/wikiloc/embedv2.do?id=198826999&elevation=on&images=off&maptype=M',
    stages: ['stage-a', 'stage-b', 'stage-c'],
    notes: [
      'Alguns trams poden resultar relliscosos després de pluges, especialment a les zones boscoses entre Manresa i Navarcles.',
      'Hi ha punts amb poca cobertura mòbil, es recomana portar el track descarregat prèviament.',
      'Diversos nuclis permeten reomplir aigua, però cal planificar bé els trams més llargs sense serveis.',
    ],
  },
  {
    id: 'route-b',
    origin: 'Montserrat',
    destiny: 'Núria',
    alternativeRoutePoints: ['Lluçanès', 'Campdevànol'],
    routeDesc: [
      'Aquesta variant de la ruta cap a Núria passa pel Lluçanès i Campdevànol, oferint un recorregut més llarg però molt variat en paisatges. Es caracteritza per travessar zones de mitja muntanya amb abundant vegetació i camins tradicionals ben marcats. A mesura que s’avança, l’entorn esdevé més alpí, anticipant l’arribada a la vall de Núria. És una opció perfecta per a qui gaudeix de rutes més llargues i amb canvis progressius en el terreny. L’arribada final resulta especialment gratificant després de superar els últims desnivells.',
    ],
    routeMapUrl:
      'https://ca.wikiloc.com/wikiloc/embedv2.do?id=198826999&elevation=on&images=off&maptype=M',
    stages: ['stage-a', 'stage-b', 'stage-c', 'stage-d'],
    notes: [
      'El pas pel Lluçanès pot ser calorós a l’estiu, ja que hi ha trams amb poca ombra.',
      'Algunes cruïlles no estan ben senyalitzades, és important seguir el GPS amb atenció.',
      'A Campdevànol hi ha opcions d’allotjament i restauració abans d’afrontar el tram final cap a Núria.',
    ],
  },
  {
    id: 'route-c',
    origin: 'Montserrat',
    destiny: 'Núria',
    alternativeRoutePoints: ['Lluçanès', 'Planoles'],
    routeDesc: [
      'Aquesta alternativa per Planoles comparteix l’inici amb altres variants, però es diferencia en la seva aproximació final cap a Núria. El recorregut combina pistes forestals amb senders més estrets que travessen paisatges tranquils i poc transitats. És una ruta especialment atractiva per a qui busca una major sensació d’aïllament i contacte amb la natura. El pas per Planoles permet una parada estratègica abans del tram final d’ascens. En conjunt, ofereix una experiència més íntima sense renunciar a l’espectacularitat del destí.',
    ],
    routeMapUrl:
      'https://ca.wikiloc.com/wikiloc/embedv2.do?id=198826999&elevation=on&images=off&maptype=M',
    stages: ['stage-a', 'stage-b', 'stage-c', 'stage-d'],
    notes: [
      'Ruta amb menor afluència de gent, ideal per a qui busca tranquil·litat però amb menys serveis disponibles.',
      'El tram final des de Planoles presenta un desnivell exigent, cal reservar forces.',
      'Alguns camins poden estar en mal estat després de temporals, especialment pistes forestals.',
    ],
  },
];
