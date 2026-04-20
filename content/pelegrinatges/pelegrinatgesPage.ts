import {
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

interface PelegrinatgesContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    intro: TextBlock;
    currentRoute: {
      title: string;
      description: string;
      subscriptionCTA: PrimaryPageNavItem;
    };
    routes: {
      title: string;
      description: string;
    };
  };
}

const pelegrinatgesCTAs: PrimaryPageNavItem[] = [
  { label: "Ruta d'enguany", href: '/pelegrinatges#current-route' },
  { label: 'Altres rutes', href: '/pelegrinatges#routes' },
];

export const pelegrinatgesContent: PelegrinatgesContent = {
  nav: pelegrinatgesCTAs,

  home: {
    hero: {
      pretitle: 'Mou-te',
      title: "Pelegrinatges d'Amics de Núria",
      subtitle: 'Vine a caminar amb nosaltres cap a Núria.',
      description:
        'El pelegrinatge de Montserrat a Núria per etapes és el trajecte que organitza anualment Amics de Núria.',
      ctas: pelegrinatgesCTAs,
      img: {
        src: '/hero-muntanya-nuria.webp',
        alt: 'Muntanyes de la vall de Núria',
        className: 'object-top',
      },
    },

    intro: {
      title: 'Una ruta que uneix fe i natura',
      body: 'Aquí hi trobaràs una selecció acurada de rutes per descobrir i viure al teu ritme, així com l’oportunitat de compartir el camí amb nosaltres durant el pelegrinatge anual d’Amics de Núria, cada mes d’agost. Tant si prefereixes la quietud d’una experiència personal com la riquesa de caminar en comunitat, aquest espai t’obre les portes a un viatge ple de sentit, natura, tradició i fe',
    },

    currentRoute: {
      title: "La ruta d'enguany",
      description:
        'Aquesta és la ruta que recorrerem plegats en el pelegrinatge d’enguany. T’hi convidem a formar part d’aquesta experiència compartida, oberta a tothom qui vulgui sumar-s’hi i viure el camí amb nosaltres...',
      subscriptionCTA: {
        label: "Apunta't a la ruta",
        href: '/pelegrinatges/apuntat',
      },
    },

    routes: {
      title: 'Altres rutes',
      description:
        '…o deixa’t portar pel teu propi ritme i segons les teves preferències. Propostes pensades per gaudir del camí amb llibertat, connectant amb la natura i l’essència del pelegrinatge.',
    },
  },
};
