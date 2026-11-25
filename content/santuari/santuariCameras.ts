export interface SantuariCamera {
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: string;
  sourceName: string;
  sourceUrl: string;
  viewer?: { url: string; type: 'panorama' | '3cat' };
}

export const santuariCamerasPath = '/santuari/cameres';

const mirador = {
  imageUrl: 'https://backend.roundshot.com/cams/c03c006da9c89d5229ae59aa000304b7/oneeighth',
  sourceName: 'FGC / Roundshot',
  sourceUrl: 'https://fgc.roundshot.com/mirador-de-la-canal/',
};

const cremallera = {
  imageUrl: 'https://backend.roundshot.com/cams/28b392c33af5d0d62e6d9e5bab39f766/oneeighth',
  sourceName: 'FGC / Roundshot',
  sourceUrl: 'https://fgc.roundshot.com/cremallera-tunel/',
};

const pistesImage = 'https://media.turismefgc.cat/valldenuria/nuriapistes.jpg';
const santuariImage = 'https://media.turismefgc.cat/valldenuria/nuriabarques.jpg';

export const santuariCameras: readonly SantuariCamera[] = [
  {
    ...mirador,
    slug: 'mirador-de-la-canal',
    title: 'Mirador de la Canal',
    imageAlt: 'El santuari i la vall vistos des del Mirador de la Canal',
    viewer: { url: mirador.sourceUrl, type: 'panorama' },
  },
  {
    ...cremallera,
    slug: 'cremallera-tunel',
    title: 'Túnel del Cremallera',
    imageAlt: 'Vista panoràmica de l’estany des del túnel del Cremallera',
    viewer: { url: cremallera.sourceUrl, type: 'panorama' },
  },
  {
    slug: 'vall-de-nuria',
    title: 'Vall de Núria',
    imageUrl: 'https://api.pirineu365.cat/webcam/24',
    imageAlt: 'El santuari i les muntanyes que l’envolten',
    sourceName: '3Cat',
    sourceUrl: 'https://www.3cat.cat/3catinfo/el-temps/camera/vall-nuria/12/',
    viewer: {
      url: 'https://www.3cat.cat/3catinfo/el-temps/vall-de-nuria-2000/camera/embed/12/',
      type: '3cat',
    },
  },
  {
    slug: 'pistes',
    title: 'Pistes',
    imageUrl: pistesImage,
    imageAlt: 'Les pistes i les vies del Cremallera al costat del santuari',
    sourceName: 'FGC',
    sourceUrl: pistesImage,
  },
  {
    slug: 'santuari-des-del-llac',
    title: 'Santuari des del llac',
    imageUrl: santuariImage,
    imageAlt: 'El Santuari de Núria vist des de l’altra banda del llac',
    sourceName: 'FGC',
    sourceUrl: santuariImage,
  },
  // The two directional views use the same frames as their parent panoramas.
  {
    ...cremallera,
    slug: 'estany-de-nuria',
    title: 'Estany de Núria',
    imageAlt: 'L’estany de Núria i les vies del Cremallera que el voregen',
    imagePosition: '90% center',
  },
  {
    ...mirador,
    slug: 'finestrelles',
    title: 'Finestrelles',
    imageAlt: 'El vessant de Finestrelles des del Mirador de la Canal',
    imagePosition: '0% center',
  },
];
