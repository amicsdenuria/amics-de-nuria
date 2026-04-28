import { SantuariContent } from './interfaces';
import { santuariSubpages } from './santuariSubpages';

export const santuariContent: SantuariContent = {
  nav: [
    { label: 'Basílica', href: '/santuari/basilica' },
    { label: 'La Mare de Déu', href: '/santuari/mare-de-deu' },
    { label: 'Sant Gil', href: '/santuari/sant-gil' },
    { label: 'Via Crucis', href: '/santuari/via-crucis' },
    { label: 'Llar Amadeu', href: '/santuari/llar-amadeu' },
    { label: 'Com arribar', href: '/santuari/com-arribar' },
  ],

  home: {
    hero: {
      pretitle: 'Benvinguts',
      title: 'El Santuari',
      subtitle:
        'Un lloc de fe, silenci i acollida per a pelegrins i visitants.',
      description:
        'El Santuari és un espai de trobada espiritual, memòria i devoció. Aquí conflueixen la tradició, el paisatge i el camí de qui hi arriba cercant recolliment.',
      ctas: [
        { label: 'Rutes i itineraris', href: '/pelegrinatges' },
        { label: 'Com arribar', href: '/santuari/com-arribar' },
        { label: 'Veure el Via Crucis', href: '/santuari/via-crucis' },
      ],
      img: {
        src: '/hero-santuari-nuria.webp',
        alt: 'Santuari de Núria',
        className: 'object-center',
      },
    },

    intro: {
      title: 'Un lloc de trobada i contemplació',
      body: 'Visitar el Santuari és una experiència de calma. Et convidem a recórrer-lo amb temps, respectant el silenci i deixant espai per a la contemplació i la pregària personal.',
    },

    cards: {
      title: 'Descobreix el Santuari',
      items: [
        {
          title: 'La Basílica',
          description:
            'La basílica situada als Pirineus, coneguda pel seu entorn natural i la devoció a la Mare de Déu de Núria.',
          href: '/santuari/basilica',
        },
        {
          title: 'La Mare de Déu',
          description:
            'La devoció mariana és el cor espiritual del Santuari i la seva expressió més antiga i profunda.',
          href: '/santuari/mare-de-deu',
        },
        {
          title: 'Sant Gil',
          description:
            'Figura de referència en la memòria devocional i en la tradició local vinculada al lloc.',
          href: '/santuari/sant-gil',
        },
        {
          title: 'Via Crucis',
          description:
            'Un recorregut de pregària i contemplació que acompanya la visita al Santuari.',
          href: '/santuari/via-crucis',
        },
        {
          title: 'Llar Amadeu',
          description:
            'Un espai d’acollida, acompanyament i vida comunitària dins l’entorn del Santuari.',
          href: '/santuari/llar-amadeu',
        },
        {
          title: 'Com arribar',
          description:
            'Tota la informació pràctica per accedir al Santuari de manera senzilla i segura.',
          href: '/santuari/com-arribar',
        },
      ],
    },

    pilgrimages: {
      title: 'Pelegrinatges',
      intro:
        'Descobreix les rutes i itineraris, les variants de camí i tota la informació pràctica per preparar la visita.',
      cta: {
        label: 'Veure rutes i itineraris',
        href: '/pelegrinatges',
      },
    },
  },

  pages: santuariSubpages,
};
