import { SantuariContent } from './interfaces';
import { santuariSubpages } from './santuariSubpages';

const santuariNavItems = [
  { label: 'La Vall de Núria', href: '/santuari/vall-de-nuria' },
  { label: 'Basílica', href: '/santuari/basilica' },
  { label: 'La Mare de Déu', href: '/santuari/mare-de-deu' },
  {
    label: 'Creu, Olla i Campana',
    href: '/santuari/creu-olla-campana',
  },
  { label: 'Sant Gil', href: '/santuari/sant-gil' },
  { label: 'Via Crucis', href: '/santuari/via-crucis' },
  { label: 'Llar Amadeu', href: '/santuari/llar-amadeu' },
  { label: 'Com arribar', href: '/santuari/com-arribar' },
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
          description:
            'Refugi de pau i espiritualitat a dos mil metres d’altitud, amb segles d’història, fe, tradició i natura viva.',
          href: '/santuari/vall-de-nuria',
        },
        {
          title: 'La Basílica',
          description:
            'Espai de recolliment i de pregària, centre d’acollida i devoció a la Mare de Déu de Núria.',
          href: '/santuari/basilica',
        },
        {
          title: 'La Mare de Déu de Núria',
          description:
            'Cor espiritual del Santuari: tradició, veneració al cambril i aplec del 8 de setembre.',
          href: '/santuari/mare-de-deu',
        },
        {
          title: 'La Creu, l’Olla i la Campana',
          description:
            'Símbols de la identitat de Núria: oració, hospitalitat i acollida, amb tradicions vinculades a la vall.',
          href: '/santuari/creu-olla-campana',
        },
        {
          title: 'L’Ermita de Sant Gil',
          description:
            'Un dels racons més autèntics i carregats de memòria de la vall; diada de l’1 de setembre.',
          href: '/santuari/sant-gil',
        },
        {
          title: 'El Via Crucis',
          description:
            'Recorregut a l’aire lliure d’un quilòmetre i mig, amb quinze estacions incloent la Resurrecció.',
          href: '/santuari/via-crucis',
        },
        {
          title: 'La Llar Amadeu',
          description:
            'Centre pastoral i d’acollida per a grups, amb accés directe a la basílica i capacitat per a unes 12 persones.',
          href: '/santuari/llar-amadeu',
        },
        {
          title: 'Com arribar-hi',
          description:
            'Accés en cremallera o a peu (Queralbs, Fontalba o Planoles). Informació pràctica i accessibilitat.',
          href: '/santuari/com-arribar',
        },
      ],
    },

    pilgrimages: {
      title: 'Arribar caminant',
      intro:
        'La vall es pot assolir a peu per rutes emblemàtiques: el Camí Vell de Queralbs (GR11), l’accés panoràmic de Fontalba o la travessa exigent des de Planoles.',
      cta: {
        label: 'Veure com arribar-hi',
        href: '/santuari/com-arribar',
      },
    },
  },

  pages: santuariSubpages,
};
