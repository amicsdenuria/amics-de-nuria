import { DomainStage } from '@/domain/stage/stage.types';

const stageRegions = [
  {
    slug: 'el-bages',
    name: 'El Bages',
    img: {
      url: '/bages.webp',
      alt: 'El Bages',
    },
  },
  {
    slug: 'el-bergueda',
    name: 'El Berguedà',
    img: {
      url: '/bergueda.webp',
      alt: 'El Berguedà',
    },
  },
];

const stagePois = [
  {
    slug: 'moreneta-de-montserrat',
    name: 'La Moreneta',
    img: {
      url: '/moreneta-montserrat.webp',
      alt: 'Moreneta de Montserrat',
    },
  },
  {
    slug: 'monestir-de-montserrat',
    name: 'Monestir de Montserrat',
    img: {
      url: '/monestir-montserrat.webp',
      alt: 'Monestir de Montserrat',
    },
  },
];

const stageImgs = [
  {
    url: '/hero-vall-nuria.webp',
    alt: 'Santuari de Núria',
  },
];

export const stagesMock: DomainStage[] = [
  {
    id: 'montserrat-torello-manresa',
    slug: 'montserrat-torello-manresa',
    origin: 'Montserrat',
    destiny: 'Manresa',
    wayPoints: ['Torelló'],
    stageDesc:
      'Aquesta etapa inicial transcorre per terreny variat, combinant trams de pista ampla amb senders més estrets que s’endinsen en zones boscoses. El recorregut és progressiu i permet agafar ritme sense grans dificultats tècniques, tot gaudint de paisatges oberts i vistes puntuals de l’entorn. És una etapa ideal per començar la ruta amb bones sensacions i preparar-se per als trams següents.',
    stageMapUrl:
      'https://ca.wikiloc.com/wikiloc/embedv2.do?id=198826999&elevation=on&images=off&maptype=M',
    videoUrl: 'https://placeholdervideo.dev/1920x1080',
    regions: [stageRegions[0]],
    pois: [stagePois[0]],
    trailLocations: [
      'Basílica de la Mare de Déu de Montserrat',
      'Monestir de Santa Cecilia',
      'Ermita de Sant Jaume Castellbell',
      'Església de Sant Miquel de Castellgalí',
      'Castellgalí',
      'Riera de Cornet',
      'Mas Oller',
      'Raval dels Corrons',
      'Torre Santa Caterina',
      'Manresa',
    ],
    allocations: [
      'Alberg de Montserrat',
      'Santuari de Cova de Manresa',
      'Rectoria de Sallent',
    ],
    imgs: [stageImgs[0], stageImgs[0], stageImgs[0]],
    technicalDetails: {
      distance: 24800,
      duration: 450,
      initialHeight: 720,
      finalHeight: 243,
      minHeight: 177,
      maxHeight: 801,
      cumulativeAscent: 693,
      cumulativeDescent: 1197,
    },
    notes: [
      'Alguns trams poden resultar relliscosos després de pluges, especialment a les zones boscoses entre Manresa i Navarcles.',
      'Hi ha punts amb poca cobertura mòbil, es recomana portar el track descarregat prèviament.',
      'Diversos nuclis permeten reomplir aigua, però cal planificar bé els trams més llargs sense serveis.',
    ],
  },
  {
    id: 'manresa-sallent',
    slug: 'manresa-sallent',
    origin: 'Manresa',
    destiny: 'Sallent',
    stageDesc:
      'Aquesta etapa inicial transcorre per terreny variat, combinant trams de pista ampla amb senders més estrets que s’endinsen en zones boscoses. El recorregut és progressiu i permet agafar ritme sense grans dificultats tècniques, tot gaudint de paisatges oberts i vistes puntuals de l’entorn. És una etapa ideal per començar la ruta amb bones sensacions i preparar-se per als trams següents.',
    stageMapUrl:
      'https://ca.wikiloc.com/wikiloc/embedv2.do?id=198826999&elevation=on&images=off&maptype=M',
    videoUrl: 'https://placeholdervideo.dev/1920x1080',
    regions: [stageRegions[0]],
    pois: [stagePois[1]],
    trailLocations: [
      'Manresa',
      'Santa Maria de Viladordis',
      'Els tres salts del Llobregat',
      'Sant Benet de Bages',
      'Navarcles',
      'El Pont de Cabrianes',
      'Sèquia de Manresa',
      'Mas les Coves',
      'Aqüeducte del Vilar',
      'Sallent',
    ],
    allocations: ['Hostal Sant Martí', 'Hostal Sant Cristòfol'],
    imgs: [stageImgs[0], stageImgs[0], stageImgs[0]],
    technicalDetails: {
      distance: 23600,
      duration: 405,
      initialHeight: 243,
      finalHeight: 279,
      minHeight: 208,
      maxHeight: 310,
      cumulativeAscent: 356,
      cumulativeDescent: 313,
    },
  },
  {
    id: 'sallent-santa-maria-dolo',
    slug: 'sallent-santa-maria-dolo',
    origin: 'Sallent',
    destiny: 'Santa Maria d’Oló',
    stageDesc:
      'Aquesta segona etapa presenta un perfil més exigent, amb un augment progressiu del desnivell i trams on el camí esdevé més irregular. El recorregut alterna zones ombrívoles amb espais oberts, oferint una gran varietat de paisatges i una experiència més intensa a nivell físic.',
    stageMapUrl:
      'https://ca.wikiloc.com/wikiloc/embedv2.do?id=198826999&elevation=on&images=off&maptype=M',
    videoUrl: 'https://placeholdervideo.dev/1920x1080',
    regions: [stageRegions[0], stageRegions[1]],
    pois: [stagePois[0]],
    trailLocations: [
      'Sallent',
      'la Sèquia de Manresa',
      'Aqüeducte de Conangle',
      'Horts del rector',
      'Capella i Font de Sant Roc',
      'Balsareny',
      'Resclosa dels Manresans',
      'Església de Sant Esteve de Balsareny',
      'L’Ametlla de Merola',
      'Cal Marçal',
      'Església de la Mare de Déu de l’Assumpta de Cal Marçal',
      'Cal Pons',
      'Església de Sant Josep de Cal Pons',
      'Puig-reig',
    ],
    allocations: ['Refugi de Puigcercós', 'Hotel La Sèquia Molinar'],
    imgs: [stageImgs[0], stageImgs[0], stageImgs[0]],
    technicalDetails: {
      distance: 23000,
      duration: 405,
      initialHeight: 279,
      finalHeight: 454,
      minHeight: 270,
      maxHeight: 457,
      cumulativeAscent: 443,
      cumulativeDescent: 270,
    },
  },
  {
    id: 'santa-maria-dolo-olost',
    slug: 'santa-maria-dolo-olost',
    origin: 'Santa Maria d’Oló',
    destiny: 'Olost',
    stageDesc:
      'Aquesta segona etapa presenta un perfil més exigent, amb un augment progressiu del desnivell i trams on el camí esdevé més irregular. El recorregut alterna zones ombrívoles amb espais oberts, oferint una gran varietat de paisatges i una experiència més intensa a nivell físic.',
    stageMapUrl:
      'https://ca.wikiloc.com/wikiloc/embedv2.do?id=198826999&elevation=on&images=off&maptype=M',
    videoUrl: 'https://placeholdervideo.dev/1920x1080',
    regions: [stageRegions[0], stageRegions[1]],
    pois: [stagePois[0], stagePois[1]],
    trailLocations: [
      'Església de Sant Martí de Puig-reig',
      'Riu Llobregat',
      'Autovia Eix del Llobregat',
      'Camí de Cal Pallot',
      'Cal Pallot',
      'Ermita de Sant Andreu de Cal Pallot',
      'Necròpolis i tines de Cal Pallot',
      'Riera de Merlès',
      'La Molina',
      'Castell de Pinós',
      'Gorg Nou',
      'Gorg Blau',
      'Cal Paleta',
      'La Torre de Merlès',
      'Molí del Mas',
      'El Mas',
      'Cal Ferrer',
      'Resclosa del Molí del Mas',
      'Cal Fuster',
      'Pont de Sant Martí de Santa Maria de Merlès',
      'Castell de Merlès',
      'Església de Sant Martí de Merlès',
      'Església de Santa Maria de Merlès',
    ],
    allocations: ['Alberg de la Xanascat'],
    imgs: [stageImgs[0], stageImgs[0], stageImgs[0]],
    technicalDetails: {
      distance: 18000,
      duration: 315,
      initialHeight: 454,
      finalHeight: 532,
      minHeight: 380,
      maxHeight: 532,
      cumulativeAscent: 310,
      cumulativeDescent: 235,
    },
  },
];
