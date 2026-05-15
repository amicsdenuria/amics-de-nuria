import {
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

interface RutesItinerarisContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    intro: TextBlock;
    // TODO: link a route i link a activity
    currentRoute: {
      title: string;
      description: string;
      subscriptionCTA: PrimaryPageNavItem;
    };
    sortidesEsperit: {
      title: string;
      description: string;
      sortidesEsperitCTA: PrimaryPageNavItem;
    };
    routes: {
      title: string;
      description: string;
    };
    // TODO: sortides amb l'esperit section links to agenda activity
  };
}

const rutesItinerarisCTAs: PrimaryPageNavItem[] = [
  { label: "Pelegrinatge d'enguany", href: '/rutes-itineraris#current-route' },
  {
    label: "Sortides amb l'Esperit",
    href: '/rutes-itineraris#sortides-esperit',
  },
  { label: 'Pelegrinatges espirituals', href: '/rutes-itineraris#routes' },
];

export const rutesItinerarisContent: RutesItinerarisContent = {
  nav: rutesItinerarisCTAs,

  home: {
    hero: {
      pretitle: 'Mou-te',
      title: 'Rutes i itineraris',
      subtitle: 'Camina amb el cor',
      description:
        'Espais on la bellesa natural esdevé lloc de silenci, pregària i trobada interior, i on el paisatge ajuda a obrir la mirada i a escoltar amb més profunditat la grandesa de la creació.',
      ctas: rutesItinerarisCTAs,
      img: {
        src: '/hero-muntanya-nuria.webp',
        alt: 'Muntanyes de la vall de Núria',
        className: 'object-top',
      },
    },

    intro: {
      title: 'Camins que uneixen fe, natura i país',
      body: 'Corriols amagats, senders antics, camins rurals i vies de pelegrinatge que connecten pobles, ermites, santuaris i monestirs, testimonis vius d’una espiritualitat en mig de muntanyes, colls, valls i camps, que arrelada al territori explica la manera com les comunitats han habitat el país, han treballat la terra i han expressat la seva fe.',
    },

    currentRoute: {
      title: "Pelegrinatge d'enguany",
      description:
        "Pelegrinatge d'uns 170 km que cada agost fem plegats. Et convidem a formar part durant uns 10 dies d’aquesta experiència compartida i oberta a tothom que vulgui viure amb fe i comunitat el camí.",
      subscriptionCTA: {
        label: 'Inscriu-te',
        href: '/rutes-itineraris/apuntat',
      },
    },

    // TODO: Sortides esperit
    sortidesEsperit: {
      title: "Sortides amb l'Esperit",
      description:
        "Si sents la crida, et convidem a compartir plegats les sortides d'un dia que organitzem alguns caps de setmana. Caminem a la llum de l'Evangeli, convertint el sender en un espai de pregària, silenci i paraula compartida.",
      sortidesEsperitCTA: {
        // label: 'Veure actitvat' // activitat concreta
        label: 'Veure activitats', // agenda amb filtre sortides-esperit
        href: '/rutes-itineraris', // /agenda?tag=sortides-esperit
      },
    },

    routes: {
      title: 'Pelegrinatges espirituals',
      description:
        "Itineraris en diverses etapes per arribar a Núria, d'una manera diferent: pregària i silenci, paisatge i territori, memòria i identitat, des de diferents punts del país.",
    },
  },
};
