import { SantuariContent } from './interfaces';

export const santuariContent: SantuariContent = {
  nav: [
    { label: 'Santuari', href: '/santuari' },
    { label: 'La Mare de Déu', href: '/santuari/mare-de-deu' },
    { label: 'Llar Amadeu', href: '/santuari/llar-amadeu' },
    { label: 'Sant Gil', href: '/santuari/sant-gil' },
    { label: 'Via Crucis', href: '/santuari/via-crucis' },
    { label: 'Com arribar', href: '/santuari/com-arribar' },
  ],

  home: {
    hero: {
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
    },

    intro: {
      title: 'Un lloc de trobada i contemplació',
      body: 'Visitar el Santuari és una experiència de calma. Et convidem a recórrer-lo amb temps, respectant el silenci i deixant espai per a la contemplació i la pregària personal.',
    },

    cards: [
      {
        title: 'La Mare de Déu',
        description:
          'La devoció mariana és el cor espiritual del Santuari i la seva expressió més antiga i profunda.',
        href: '/santuari/mare-de-deu',
      },
      {
        title: 'Llar Amadeu',
        description:
          'Un espai d’acollida, acompanyament i vida comunitària dins l’entorn del Santuari.',
        href: '/santuari/llar-amadeu',
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
        title: 'Com arribar',
        description:
          'Tota la informació pràctica per accedir al Santuari de manera senzilla i segura.',
        href: '/santuari/com-arribar',
      },
    ],

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

  pages: {
    mareDeDeu: {
      title: 'La Mare de Déu',
      intro:
        'La devoció a la Mare de Déu és el cor espiritual del Santuari. A través d’ella, generacions de fidels han trobat consol, esperança i acompanyament.',
      blocks: [
        {
          title: 'Qui és la Mare de Déu',
          body: 'Figura central de la devoció del Santuari, símbol de protecció, tendresa i proximitat per als fidels i pelegrins.',
        },
        {
          title: 'Història i tradició',
          body: 'La veneració a la Mare de Déu s’ha transmès de generació en generació com una part essencial de la identitat del lloc.',
        },
        {
          title: 'Celebracions',
          body: 'Al llarg de l’any, la comunitat es reuneix en moments de pregària, festa i memòria compartida al voltant de la seva figura.',
        },
        {
          title: 'L’espai de veneració',
          body: 'La imatge, l’altar i l’entorn conviden al silenci, la contemplació i la pregària personal.',
        },
        {
          title: 'Text de contemplació',
          body: 'Acosta-t’hi amb calma. La devoció a la Mare de Déu es viu en el gest senzill, la mirada serena i la pregària compartida.',
        },
      ],
    },

    llarAmadeu: {
      title: 'La Llar Amadeu',
      intro:
        'La Llar Amadeu forma part de l’entorn del Santuari com un lloc d’acollida, acompanyament i vida comunitària.',
      blocks: [
        {
          title: 'Què és',
          body: 'Un espai pensat per servir i acollir a qui s’acosta al Santuari.',
        },
        {
          title: 'Funció',
          body: 'Pot actuar com a lloc de trobada, suport, convivència o servei segons les necessitats del projecte.',
        },
        {
          title: 'Relació amb el Santuari',
          body: 'La Llar Amadeu complementa l’experiència espiritual i humana del Santuari, oferint un entorn de proximitat.',
        },
        {
          title: 'Text final',
          body: 'És un lloc on l’atenció a les persones i l’esperit d’acollida tenen un paper protagonista.',
        },
      ],
    },

    santGil: {
      title: 'Sant Gil',
      intro:
        'Sant Gil és una figura molt present en la memòria devocional del Santuari i en la tradició local.',
      blocks: [
        {
          title: 'Qui va ser',
          body: 'Una figura vinculada a la fe, la humilitat i la vida senzilla.',
        },
        {
          title: 'Importància al Santuari',
          body: 'El seu record forma part de la identitat espiritual del lloc.',
        },
        {
          title: 'Tradició i celebració',
          body: 'La seva presència es manté viva a través de la devoció i dels actes comunitaris.',
        },
        {
          title: 'Text final',
          body: 'La figura de Sant Gil recorda la importància de la senzillesa, la entrega i el camí compartit.',
        },
      ],
    },

    viaCrucis: {
      title: 'Via Crucis',
      intro:
        'El Via Crucis convida a recórrer el camí de la pregària i la contemplació dins l’entorn del Santuari.',
      blocks: [
        {
          title: 'Què és',
          body: 'Un recorregut de pregària que acompanya el record de la Passió de Crist.',
        },
        {
          title: 'Com es recorre',
          body: 'S’avança estació per estació, aturant-se a cada moment per a la meditació.',
        },
        {
          title: 'Recomanació general',
          body: 'Cada estació proposa aturar-se, mirar i pregar amb serenor.',
        },
      ],
      stations: [
        {
          number: 1,
          title: 'Primera estació',
          meditation:
            'Jesús és condemnat a mort. Un moment per contemplar la injustícia i la entrega.',
        },
        {
          number: 2,
          title: 'Segona estació',
          meditation:
            'Jesús carrega amb la creu. Un pas d’acceptació, silenci i fidelitat.',
        },
        {
          number: 3,
          title: 'Tercera estació',
          meditation:
            'Jesús cau per primera vegada. Una crida a reconèixer la fragilitat humana.',
        },
        {
          number: 4,
          title: 'Quarta estació',
          meditation:
            'Jesús es troba amb la seva Mare. Una trobada de dolor, amor i companyia.',
        },
        {
          number: 5,
          title: 'Cinquena estació',
          meditation:
            'Simó de Cirene ajuda a portar la creu. Un gest de solidaritat i servei.',
        },
        {
          number: 6,
          title: 'Sisena estació',
          meditation:
            'Verònica eixuga el rostre de Jesús. Un signe de compassió i tendresa.',
        },
        {
          number: 7,
          title: 'Setena estació',
          meditation:
            'Jesús cau per segona vegada. Una invitació a aixecar-se amb esperança.',
        },
        {
          number: 8,
          title: 'Vuitena estació',
          meditation:
            'Jesús consola les dones de Jerusalem. Paraules de veritat i de vida.',
        },
        {
          number: 9,
          title: 'Novena estació',
          meditation:
            'Jesús cau per tercera vegada. La perseverança enmig del cansament.',
        },
        {
          number: 10,
          title: 'Desena estació',
          meditation:
            'Jesús és despullat de les seves vestidures. La humilitat portada fins a l’extrem.',
        },
        {
          number: 11,
          title: 'Onzena estació',
          meditation: 'Jesús és clavat a la creu. L’amor lliurat completament.',
        },
        {
          number: 12,
          title: 'Dotzena estació',
          meditation: 'Jesús mor a la creu. Silenci, dolor i esperança.',
        },
        {
          number: 13,
          title: 'Tretzena estació',
          meditation:
            'Jesús és baixat de la creu. La compassió sosté el cos del Senyor.',
        },
        {
          number: 14,
          title: 'Catorzena estació',
          meditation:
            'Jesús és posat al sepulcre. Un final aparent que s’obre a l’esperança.',
        },
      ],
      recommendations:
        'Porta calçat còmode, camina amb calma i mantén una actitud de respecte i silenci durant tot el recorregut.',
      closing: 'Cada estació proposa aturar-se, mirar i pregar amb serenor.',
    },

    comArribar: {
      title: 'Com arribar',
      intro:
        'Aquí trobaràs la informació necessària per accedir al Santuari de manera senzilla i segura.',
      blocks: [
        {
          title: 'Ubicació',
          body: 'Indica on es troba el Santuari i com situar-lo al mapa.',
        },
        {
          title: 'En cotxe',
          body: 'Explica els accessos principals, la senyalització i l’aparcament disponible.',
        },
        {
          title: 'A peu',
          body: 'Descriu els camins d’accés per a pelegrins i visitants.',
        },
        {
          title: 'Accessibilitat',
          body: 'Informació sobre rutes adaptades, punts d’accés i recomanacions per a la visita.',
        },
        {
          title: 'Mapa',
          body: 'Bloc visual amb mapa integrat per orientar l’arribada al recinte.',
        },
      ],
      practical: [
        {
          label: 'Adreça',
          value: 'Afegeix aquí l’adreça exacta del Santuari.',
        },
        {
          label: 'Aparcament',
          value: 'Afegeix informació sobre zones d’estacionament.',
        },
        {
          label: 'Accés a peu',
          value: 'Afegeix rutes d’arribada a peu o des del poble.',
        },
        {
          label: 'Contacte',
          value: 'Afegeix telèfon, correu o enllaç d’atenció.',
        },
      ],
      closing:
        'El camí forma part de l’experiència: arribar al Santuari també és entrar en un espai de calma.',
    },
  },
};
