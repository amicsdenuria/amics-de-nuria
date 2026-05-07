// import { Region } from './interfaces/region';

import { DomainRegion } from '@/domain/region/region.types';

export const regionsMock: DomainRegion[] = [
  {
    id: 'region-1',
    slug: 'el-bages',
    name: 'El Bages',
    province: 'Barcelona',
    image: {
      url: '/bages.webp',
      alt: 'El Bages',
    },
    text: [
      "El Bages se situa com el veritable centre geogràfic de Catalunya, configurant-se com una gran conca d'erosió que s'estén entre els relleus de la Depressió Central. Aquesta comarca és un testimoni viu d'un passat remot, ja que fa milions d'anys estava coberta per un mar interior que va deixar una empremta geològica única, avui reconeguda pel Geoparc de la Catalunya Central. El paisatge és una alternança equilibrada de planes agrícoles on domina la vinya —protegida per la Denominació d'Origen Pla de Bages— i formacions rocoses singulars. El clima, marcadament mediterrani continental, regala estius calorosos i hiverns frescos que defineixen el caràcter resilient i obert de la seva gent i de la seva capital, Manresa, un nus de comunicacions històric.",
      "L'espiritualitat i el patrimoni monumental són eixos vertebradors de la comarca, amb la silueta de Montserrat com a guardià omnipresent des de l'horitzó. El Bages no només acull el monestir més emblemàtic de Catalunya, sinó que també és terra de castells fronterers i monestirs romànics d'una bellesa serena, com el de Sant Benet de Bages, que fusiona l'art medieval amb la innovació cultural. Manresa, amb la seva imponent basílica de la Seu i el llegat d'Ignasi de Loiola, simbolitza la transició cap a una ciutat moderna que ha sabut conservar el seu nucli històric i el seu passat industrial vinculat al tèxtil i al riu Llobregat, oferint una riquesa arquitectònica que va des del gòtic fins al modernisme més elegant.",
      "Econòmicament i socialment, el Bages ha estat un motor industrial clau gràcies a la mineria de potassa i a les colònies tèxtils que es van assentar a les lleres del Llobregat i el Cardener. Aquest passat industrial conviu avui amb una aposta decidida pel turisme de proximitat, la gastronomia autòctona i la preservació del medi ambient. Els seus municipis, des de la monumentalitat de Cardona amb el seu castell i la muntanya de sal, fins a pobles amb encant com Mura o Talamanca, ofereixen una varietat d'experiències que conviden a descobrir la Catalunya més autèntica, on la tradició de les festes populars, com la Fira de l'Aixecada de Manresa o els Reis de l'Agulla, mantenen viva la flama cultural de la regió.",
    ],
  },
  {
    id: 'region-2',
    slug: 'el-bergueda',
    name: 'El Berguedà',
    province: 'Barcelona',
    image: {
      url: '/bergueda.webp',
      alt: 'El Bergueda',
    },
    text: [
      "El Berguedà és una comarca de contrastos extrems on la transició entre la plana central i les primeres estribacions dels Pirineus crea una diversitat de paisatges gairebé inigualable. Al sud, la comarca comença amb camps de cereals i turons suaus, però a mesura que es puja cap al nord, el relleu s'escarpa de manera espectacular fins a culminar en cims icònics com el Pedraforca, la muntanya més emblemàtica de Catalunya per la seva forma de forca. Aquesta dualitat geogràfica defineix la vida al Berguedà, on el curs alt del riu Llobregat ha esculpit valls profundes i ha donat vida a una natura exuberant de boscos de pi, roure i fagedes que canvien de color amb cada estació, oferint un espectacle visual constant per als amants de la muntanya.",
      "La història del Berguedà està profundament lligada a la industrialització i a l'explotació del carbó i el tèxtil durant els segles XIX i XX. Les colònies industrials que ressegueixen el Llobregat, com Cal Rosal o la Colònia Vidal, són avui museus a l'aire lliure que expliquen un estil de vida passat on el treball i la comunitat estaven íntimament units. Més al nord, la mineria de l'Alt Berguedà va transformar valls senceres i va deixar un llegat de patrimoni miner que encara es pot visitar a Cercs. Aquesta etapa de creixement va forjar un caràcter berguedà fort i orgullós, que ha sabut transformar les antigues infraestructures en recursos turístics que posen en valor la memòria històrica de la classe obrera catalana.",
      "Culturalment, el Berguedà és mundialment conegut per la Patum de Berga, una celebració declarada Patrimoni de la Humanitat per la UNESCO que uneix foc, música i figures gegantines en un ritual que transcendeix el temps. Berga, la capital, és el centre neuràlgic on es barregen el bullici comercial i la tranquil·litat de les muntanyes properes. Però la comarca és molt més que la seva capital; pobles com Castellar de n'Hug, on neix el Llobregat en unes fonts naturals espectaculars, o Bagà, amb la seva plaça porxada medieval, mantenen intacta una arquitectura de pedra que sembla aturada en el temps, convidant al visitant a una desconnexió total i al gaudi del silenci alpí.",
      "Finalment, el Berguedà s'ha convertit en un refugi per al turisme actiu i el respecte per la biodiversitat, sent la porta d'entrada al Parc Natural del Cadí-Moixeró. És un paradís per al senderisme, l'escalada i l'esquí de fons, així com un referent gastronòmic gràcies als seus productes locals com els bolets, els pèsols negres i la vedella de muntanya. La comarca ha sabut equilibrar la modernitat amb la conservació de les seves tradicions més arrelades, des del culte a la terra fins a la innovació en energies sostenibles, posicionant-se com un territori viu que mira al futur sense oblidar les arrels pirinenques que li donen la seva personalitat única i indomable.",
    ],
  },
];
