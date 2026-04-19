import { POI } from './interfaces/route';

export const pois: POI[] = [
  {
    id: 'poi-1',
    name: 'Moreneta de Montserrat',
    location: 'Montserrat',
    img: '/moreneta-montserrat.webp',
    text: [
      "La Moreneta és una talla romànica del segle XII coneguda pel seu color fosc característic. Està situada al cambril de la Basílica i sosté el nen Jesús i una esfera que simbolitza l'univers.",
      'Com a patrona de Catalunya, la imatge és un símbol espiritual i identitari de primer ordre. Milers de persones pugen cada any al massís per venerar-la en un acte de devoció i tradició arrelada.',
      'La seva llegenda explica que va ser trobada en una cova per uns pastors, i la seva impossibilitat de ser traslladada va determinar la ubicació del santuari que avui rep milions de visitants.',
    ],
  },
  {
    id: 'poi-2',
    name: 'Monestir de Montserrat',
    location: 'Montserrat',
    img: '/monestir-montserrat.webp',
    text: [
      'El Monestir de Montserrat és una abadia benedictina situada en un entorn geològic espectacular. Des de la seva fundació al segle XI, ha estat el cor espiritual i cultural de tot el territori català.',
      "L'arquitectura actual barreja estils que van des del gòtic fins al modernisme. Va ser reconstruït després de les guerres napoleòniques, convertint-se en un centre d'art i cultura d'abast internacional.",
      "Dins del recinte destaca l'Escolania de Montserrat, un dels cors de nens més antics d'Europa. Les seves veus ressonen diàriament a la basílica, mantenint viva una tradició musical de segles d'antiguitat.",
      'A més de la vida monàstica, el monestir ofereix un museu amb obres de grans mestres com Caravaggio o Picasso. És un punt de partida ideal per explorar els camins i ermites que envolten la muntanya màgica.',
    ],
  },
];
