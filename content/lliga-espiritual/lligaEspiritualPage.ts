import {
  InstagramIcon,
  LucideIcon,
  MapPinIcon,
  YoutubeIcon,
} from 'lucide-react';
import {
  NestedTextBlock,
  PrimaryPageHeroContent,
  PrimaryPageNavItem,
  TextBlock,
} from '../interfaces/primary-page-interfaces';

export interface SocialLink {
  label: string;
  href: string;
  subtitle?: string;
  icon?: LucideIcon;
}

interface LligaEspiritualContent {
  nav: PrimaryPageNavItem[];
  home: {
    hero: PrimaryPageHeroContent;
    intro: TextBlock;
    subscribe: TextBlock;
    manifesto: {
      title: string;
      intro: string;
      blocks: Array<TextBlock & NestedTextBlock>;
    };
    // TODO
    // Missió i valors (unificar contingut actual)
    // Dr. Ramon Bassols
    // La Confraria de la Mare de Déu
    // Origens d'Amics de Núria (historia va fora i s'afegeix el contingut d'aquesta secció)
    // Carta del president
    rrss: {
      title: string;
      subtitle: string;
      own: SocialLink[];
      others: SocialLink[];
    };
  };
}

const lligaEspiritualCTAs: PrimaryPageNavItem[] = [
  { label: 'Missió, història i valors', href: '/lliga-espiritual#manifesto' },
  { label: 'Segueix-nos', href: '/lliga-espiritual#rrss' },
];

export const lligaEspiritualContent: LligaEspiritualContent = {
  nav: lligaEspiritualCTAs,
  home: {
    hero: {
      pretitle: 'Coneix-nos',
      title: 'Lliga Espiritual',
      subtitle:
        'Espiritualitat, natura i identitat per mantenir viva la història, la fe i el vincle amb Núria i amb el país.',
      description: '',
      ctas: lligaEspiritualCTAs,
      img: {
        src: '/hero-santuari-nuria.webp',
        alt: 'Santuari de Núria',
        className: 'object-center',
      },
    },

    intro: {
      title: 'Qui som',
      body: 'Amics de Núria - Lliga espiritual de la Mare de Déu de Núria volem preservar el llegat de la nostra història i la flama de la fe per cultivar, amb estima i compromís, el sentiment cristià i el vincle profund que ens uneix a la Vall de Núria i a Catalunya.',
    },

    subscribe: {
      title: 'Col·labora amb nosaltres',
      body: 'Som una associació sense ànim de lucre. Pots fer-te soci o subscriptor per ajudar a preservar Núria, donar suport a les activitats i mantenir viva la seva tradició.',
    },

    manifesto: {
      title: 'Missió, història i valors',
      intro:
        'Som una agrupació amb història i propòsit, guiada per una missió clara i uns valors que donen sentit a tot el que fem.',
      blocks: [
        {
          title: 'Missió',
          body: "Mantenir viva la flama del Santuari de Núria com a referent espiritual, cultural i natural de Catalunya. L'entitat vetlla per projectar els valors de pau i acollida que han definit i defineixen el Santuari, i es mantingui com un espai de recolliment i pregària, tot promovent un esperit de germanor entre els devots i pelegrins que busquen un lloc de trobada cristiana en el cor dels Pirineus.",
        },
        {
          title: 'Història',
          body: "L'associació és considerada l'hereva actual de l'antiga confraria de la Mare de Déu de Núria, que datava del 1599 i està íntimament lligada a la devoció popular i al desig de preservar la identitat espiritual de la Vall.",
          // TODO: Break in lines
          items: [
            {
              title: '1936',
              body: "Per evitar que la Mare de Déu fos destruïda, el capellà del Santuari la va treure de la vall fins a retornar a Núria l'any 1941. Aquest retorn va ser viscut amb gran intensitat pels devots i va marcar el ressorgiment de les visites al santuari.",
            },
            {
              title: 'Anys 40',
              body: "Després de la Guerra Civil, Núria es va convertir en un refugi espiritual i de lleure per a moltes famílies, principalment de Barcelona i Sabadell. El Dr. Ramon Bassols, que freqüentava la vall des dels anys 40, va començar a teixir una xarxa informal que compartien l'amor per la muntanya i la fe.",
            },
            {
              title: 'Anys 50',
              body: "L'embrió de l'entitat s'origina a mitjan anys cinquanta, quan un grup de famílies que coincidien durant les seves estades al santuari van començar a organitzar-se.",
            },
            {
              title: '1958',
              body: 'Aquest grup es va agrupar formalment entorn de la parròquia de Núria a Barcelona.',
            },
            {
              title: '1959',
              body: 'Davant el creixement del grup, es va constituir oficialment com a Lliga Espiritual de la Mare de Déu de Núria, amb la seu al mateix Santuari i una secretaria a Barcelona per coordinar els socis de la capital.',
            },
          ],
        },
        {
          title: 'Valors',
          // TODO: break in lines
          body: '',
          items: [
            {
              title: 'Espiritualitat i fe',
              body: 'Fomentar el Santuari com un espai viu de trobada on la transcendència es fa present a través del silenci i la pregària. Més enllà de la devoció ritual, es busca promoure una espiritualitat que brolli del contacte amb la Mare de Déu de Núria i la natura, convertint cada visita en una experiència de transformació interior i de connexió profunda amb el sentit de la vida enmig de la creació.',
            },
            {
              title: 'Identitat i tradició',
              body: 'Vetllar perquè aquest patrimoni comú segueixi sent un pulmó espiritual i de llibertat per al país, lligam estret entre la terra i la seva gent per tal que el país mantingui vius els seus espais més emblemàtics. Un santuari natural on la terra parla de la nostra història: una  part fonamental de la nostra identitat i de la nostra cultura com a país.',
            },
            {
              title: 'Natura i país',
              body: "Un santuari natural on la terra parla de la nostra història. Promoure la consciència profunda de respecte pel medi ambient, entenent que el paisatge pirinenc és un component essencial de la personalitat de Catalunya. D'aquesta manera, l'associació vetlla perquè aquest patrimoni comú segueixi sent un pulmó espiritual i de llibertat per al país, lligam estret entre la terra i la seva gent per tal que el país mantingui vius els seus espais més emblemàtics.",
            },
            {
              title: 'Acollida i germanor',
              body: "Impulsar un esperit de comunitat obert i fraternal entre devots, pelegrins i visitants: el Santuari com un lloc de trobada humana i cristiana, on cadascú pugui sentir-se acollit, escoltat i part d’una tradició compartida. Un espai de pau on les diferències s'esborren per donar pas a l'abraçada, la paraula i el camí de germanor.",
            },
          ],
        },
      ],
    },

    rrss: {
      title: 'Xarxes Socials',
      subtitle:
        "Comparteix la passió per Núria: segueix-nos per viure activitats, pelegrinatges i altres iniciatives que organitzem des de l'associació.",
      own: [
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/amicsdenuria',
          subtitle: '@amicsdenuria',
          icon: InstagramIcon,
        },
        {
          label: 'Wikiloc',
          href: 'https://loc.wiki/u/15686852',
          subtitle: 'Amics de Núria',
          icon: MapPinIcon,
        },
        {
          label: 'Youtube',
          href: 'https://www.youtube.com/@AmicsdeN%C3%BAria',
          subtitle: '@AmicsdeNúria',
          icon: YoutubeIcon,
        },
      ],
      others: [
        {
          label: "Bisbat d'Urgell",
          href: 'https://bisbaturgell.org/ca/',
          subtitle: "Església d'Urgell",
        },
      ],
    },
  },
};
