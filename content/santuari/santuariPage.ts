import { SantuariContent } from './interfaces';
import { santuariSubpages } from './santuariSubpages';

const santuariNavItems = [
  { label: 'La Vall de Núria', href: '/santuari/vall-de-nuria' },
  { label: 'La Basílica', href: '/santuari/basilica' },
  { label: 'La Mare de Déu', href: '/santuari/mare-de-deu' },
  {
    label: "La Creu, l'Olla i la Campana",
    href: '/santuari/creu-olla-campana',
  },
  { label: "L'Ermita de Sant Gil", href: '/santuari/sant-gil' },
  { label: 'El Via Crucis', href: '/santuari/via-crucis' },
  { label: 'La Llar Amadeu', href: '/santuari/llar-amadeu' },
  { label: 'Com arribar-hi', href: '/santuari/com-arribar' },
];

export const santuariContent: SantuariContent = {
  nav: santuariNavItems,

  home: {
    hero: {
      pretitle: 'Benvinguts',
      title: 'El Santuari',
      subtitle: 'Un refugi de pau i espiritualitat a dos mil metres d’altitud.',
      description:
        'La majestuositat dels Pirineus abraça segles d’història, fe, tradició i natura viva. La vall ha estat camí i refugi: un lloc d’acollida on la devoció i la muntanya es troben.',
      ctas: [santuariNavItems[0], santuariNavItems[1], santuariNavItems[2]],
      img: {
        src: '/hero-santuari-nuria.webp',
        alt: 'Santuari de Núria',
        className: 'object-center',
      },
    },

    intro: {
      title: 'Història, acollida i camí',
      body: 'Diu la tradició que cap a l’any 700 sant Gil va viure a la vall, meditant i elaborant icones, i que va haver d’amagar la imatge de la Mare de Déu, una creu, una olla i una campana. Segles més tard (1072–1079), el pelegrí Amadeu i els pastors de la contrada en van impulsar la recerca fins a la troballa a la roca blanca. Des del segle XII, l’hospital i la capella van convertir Núria en un lloc de pas i refugi; i el cremallera (inaugurat el 1931) va posar fi a l’aïllament de la vall.',
    },

    cards: {
      title: 'Descobreix el Santuari',
      items: [
        {
          title: 'La Vall de Núria',
          description: santuariSubpages.vallDeNuria.intro,
          href: '/santuari/vall-de-nuria',
        },
        {
          title: 'La Basílica',
          description: santuariSubpages.basilica.intro,
          href: '/santuari/basilica',
        },
        {
          title: 'La Mare de Déu de Núria',
          description: santuariSubpages.mareDeDeu.intro,
          href: '/santuari/mare-de-deu',
        },
        {
          title: 'La Creu, l’Olla i la Campana',
          description: santuariSubpages.creuOllaCampana.intro,
          href: '/santuari/creu-olla-campana',
        },
        {
          title: 'L’Ermita de Sant Gil',
          description: santuariSubpages.santGil.intro,
          href: '/santuari/sant-gil',
        },
        {
          title: 'El Via Crucis',
          description: santuariSubpages.viaCrucis.intro,
          href: '/santuari/via-crucis',
        },
        {
          title: 'La Llar Amadeu',
          description: santuariSubpages.llarAmadeu.intro,
          href: '/santuari/llar-amadeu',
        },
        {
          title: 'Com arribar-hi',
          description: santuariSubpages.comArribar.intro,
          href: '/santuari/com-arribar',
        },
      ],
    },

    pilgrimages: {
      title: 'Arribar caminant',
      intro:
        'La vall es pot assolir a peu per rutes emblemàtiques: el Camí Vell de Queralbs (GR11), l’accés panoràmic de Fontalba o la travessa exigent des de Planoles.',
      cta: {
        label: 'Veure pelegrinatges',
        href: '/pelegrinatges',
      },
    },
  },

  pages: santuariSubpages,
};
