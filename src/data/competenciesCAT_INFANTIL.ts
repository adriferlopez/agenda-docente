// Competències específiques (CE) i criteris d'avaluació de l'Educació
// Infantil de Catalunya, generats a partir del DECRET 21/2023, de 7 de
// febrer, d'ordenació dels ensenyaments de l'educació infantil (DOGC, Annex
// 2) — substitueix la font estatal (Real Decreto 95/2022) que es feia
// servir abans per a Catalunya (es manté a competenciesINFANTIL_RD95.ts per
// a comunitats sense decret propi carregat, com la Comunitat Valenciana).
//
// Diferències estructurals rellevants respecte al Real Decreto 95/2022:
// - Només 11 CE (no 12), repartides en 4 eixos (no 3 àrees): Eix 1 en té 4,
//   Eix 2 en té 2, Eix 3 en té 3, Eix 4 en té 2.
// - Les CE són comunes als dos cicles (no hi ha una CE diferent per cicle).
// - Els criteris d'avaluació són "de final d'etapa": una única llista per
//   CE, no diferenciada per cicle (per això `criteris` és aquí un array pla
//   en lloc de Record<cicle, string[]>; el tipus `CompetenciaEspecifica`
//   admet ambdues formes). El propi decret aclareix que aquests criteris
//   "també poden orientar les decisions que es prenen al primer cicle",
//   ja que els elements curriculars hi tenen caràcter merament orientatiu.
// - "title" i "description" són idèntics perquè el decret només dona un
//   únic enunciat per CE (mateix criteri que a la resta de fitxers CAT
//   quan la font no distingeix versió curta/llarga).
import type { AreaCompetencies } from './curriculum/types';

export const COMPETENCIES_CATALUNYA_INFANTIL: Record<string, AreaCompetencies> = {
  'Eix 1. Un infant que creix amb autonomia i confiança': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Progressar en el coneixement i el domini del cos, en el moviment i la coordinació, adonant-se de les pròpies possibilitats, per anar desenvolupant autonomia personal i una autoimatge ajustada i positiva.',
        description:
          'Progressar en el coneixement i el domini del cos, en el moviment i la coordinació, adonant-se de les pròpies possibilitats, per anar desenvolupant autonomia personal i una autoimatge ajustada i positiva.',
        criteris: [
          'Avançar en el moviment, el domini i el coneixement del propi cos, ajustant les accions i les reaccions a cada situació i desenvolupant la coordinació, l’equilibri i la precisió.',
          'Participar en diferents contextos de joc adequant les possibilitats motrius, superant reptes motrius i adequant el to muscular.',
          'Mostrar progressivament sentiments de seguretat personal en situacions quotidianes, confiant en les pròpies possibilitats i manifestant iniciativa.',
          'Actuar cada vegada de manera més autònoma en situacions quotidianes, desenvolupant hàbits d’higiene, alimentació i cura personal.',
          'Adquirir habilitats manipulatives en situacions quotidianes, mostrant una coordinació progressiva.',
        ],
      },
      {
        id: 'CE2',
        title:
          'Viure les emocions, expressant i reconeixent sentiments i necessitats, per anar creixent en benestar emocional i seguretat afectiva.',
        description:
          'Viure les emocions, expressant i reconeixent sentiments i necessitats, per anar creixent en benestar emocional i seguretat afectiva.',
        criteris: [
          'Expressar progressivament les necessitats i els desitjos derivats de les pròpies emocions adquirint confiança i seguretat afectiva i emocional.',
          'Demanar, acceptar i oferir ajuda, establint relacions afectives positives, de manera lliure, segura i respectuosa en moments de vida quotidiana.',
        ],
      },
      {
        id: 'CE3',
        title:
          'Adonar-se de la influència de l’espai i el temps en les situacions de vida quotidiana a partir de les experiències viscudes, per créixer amb seguretat i entendre el món.',
        description:
          'Adonar-se de la influència de l’espai i el temps en les situacions de vida quotidiana a partir de les experiències viscudes, per créixer amb seguretat i entendre el món.',
        criteris: [
          'Utilitzar les nocions temporals i espacials bàsiques a partir de les pròpies vivències.',
          'Desenvolupar aspectes de raonament espacial a través de jocs d’exploració i situacions de vida quotidiana.',
          'Avançar en la gestió del propi temps, anticipant i planificant l’acció per fer una tasca.',
        ],
      },
      {
        id: 'CE4',
        title:
          'Progressar en l’adquisició de normes i hàbits saludables i ecosocialment responsables, guanyant confiança en les pròpies possibilitats i capacitats per construir la pròpia identitat.',
        description:
          'Progressar en l’adquisició de normes i hàbits saludables i ecosocialment responsables, guanyant confiança en les pròpies possibilitats i capacitats per construir la pròpia identitat.',
        criteris: [
          'Incorporar estratègies i hàbits saludables relacionats amb la cura personal i la cura de l’entorn, mostrant progressivament iniciativa i confiança.',
          'Mostrar interès en diferents situacions, perseverant i demanant o acceptant ajuda, si és necessari.',
          'Comprendre la necessitat d’acords i normes, ajustant la seva actuació als diferents contextos de joc.',
        ],
      },
    ],
  },

  'Eix 2. Un infant que es comunica amb diferents llenguatges': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Interpretar, comprendre i expressar missatges, emprant recursos i coneixements basats en la pròpia experiència, per avançar en la comunicació i la construcció de nous aprenentatges.',
        description:
          'Interpretar, comprendre i expressar missatges, emprant recursos i coneixements basats en la pròpia experiència, per avançar en la comunicació i la construcció de nous aprenentatges.',
        criteris: [
          'Interpretar de forma eficaç els missatges i les intencions comunicatives dels altres, identificant el sentit global de l’acte comunicatiu.',
          'Participar en situacions comunicatives de manera activa, espontània i respectuosa, ajustant el repertori comunicatiu a les propostes, als interlocutors i al context.',
          'Fer un ús funcional de la llengua oral augmentant el repertori lingüístic i expressant idees, desitjos, sentiments i emocions.',
          'Emprar la llengua oral com a forma per construir el propi pensament i regular l’acció en les interaccions amb els altres, elaborant progressivament un discurs més organitzat i coherent en diferents contextos.',
        ],
      },
      {
        id: 'CE2',
        title:
          'Expressar-se de manera entenedora, personal i creativa mitjançant diferents llenguatges, explorant-ne les possibilitats i gaudint-ne, per respondre a diferents contextos comunicatius.',
        description:
          'Expressar-se de manera entenedora, personal i creativa mitjançant diferents llenguatges, explorant-ne les possibilitats i gaudint-ne, per respondre a diferents contextos comunicatius.',
        criteris: [
          'Manifestar habilitats per comunicar-se i interactuar a través de diferents llenguatges, ajustant l’expressió al context verbal, matemàtic, corporal, plàstic, musical i digital.',
          'Evocar i expressar espontàniament idees, sentiments, emocions i vivències mitjançant diferents llenguatges i formats.',
          'Utilitzar la intuïció, la improvisació, la fantasia i la creativitat tant en l’observació i l’escolta com en els processos creatius artístics a través dels diferents llenguatges.',
          'Mostrar interès per la descoberta progressiva de la relació entre el text oral i l’escrit, en contextos funcionals, participant en situacions significatives d’aproximació al llenguatge escrit.',
          'Gaudir i participar en propostes de literatura infantil, explorant, descobrint i apreciant la bellesa del llenguatge literari.',
          'Interpretar i crear manifestacions artístiques individuals i col·lectives, utilitzant i explorant diferents instruments, recursos o tècniques, mostrant una actitud curiosa i respectuosa.',
          'Explorar les possibilitats sonores, simbòliques, cinètiques, visuals i plàstiques a través dels elements de l’entorn.',
        ],
      },
    ],
  },

  'Eix 3. Un infant que descobreix l’entorn amb curiositat': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Observar i reconèixer característiques de materials i elements i establir relacions entre ells, mitjançant l’experimentació i la manipulació sensorial, per avançar cap a estructures de pensament cada vegada més complexes desenvolupant habilitats de raonament matemàtic.',
        description:
          'Observar i reconèixer característiques de materials i elements i establir relacions entre ells, mitjançant l’experimentació i la manipulació sensorial, per avançar cap a estructures de pensament cada vegada més complexes desenvolupant habilitats de raonament matemàtic.',
        criteris: [
          'Utilitzar estratègies i formes pròpies de raonar per resoldre un repte i explicar el procés emprat.',
          'Establir relacions entre elements, diferenciant-ne qualitats o atributs, captant patrons i sabent-ho comunicar.',
          'Construir la noció de quantitat a partir de situacions contextualitzades i significatives.',
          'Reconèixer nombres en situacions quotidianes, adonant-se que poden tenir diferents usos: quantitat, identificació, ordre i situació.',
          'Desenvolupar de manera progressiva estratègies de càlcul i mesura en situacions significatives, utilitzant diferents elements i eines.',
        ],
      },
      {
        id: 'CE2',
        title:
          'Desenvolupar, de manera progressiva, diferents formes de raonament i procediments del pensament científic, a través de l’observació i la manipulació, per iniciar-se en la interpretació de l’entorn i respondre de manera creativa als diferents reptes i situacions.',
        description:
          'Desenvolupar, de manera progressiva, diferents formes de raonament i procediments del pensament científic, a través de l’observació i la manipulació, per iniciar-se en la interpretació de l’entorn i respondre de manera creativa als diferents reptes i situacions.',
        criteris: [
          'Mostrar autonomia en la gestió de reptes i situacions cada cop més complexes, cooperant amb els altres.',
          'Utilitzar diferents estratègies per a la presa de decisions amb progressiva autonomia, trobant solucions creatives en resposta a diferents reptes.',
          'Plantejar i verificar hipòtesis a partir de la manipulació i l’experimentació sobre diferents elements i materials per tal d’entendre els seus comportaments.',
          'Participar en reptes col·laboratius en petit grup, compartint idees pròpies i escoltant les dels altres des d’una actitud de respecte.',
        ],
      },
      {
        id: 'CE3',
        title:
          'Explorar i reconèixer elements i fenòmens del món natural, establint relacions entre la pròpia acció i les conseqüències que se’n deriven, per iniciar hàbits de sostenibilitat i conservació de l’entorn.',
        description:
          'Explorar i reconèixer elements i fenòmens del món natural, establint relacions entre la pròpia acció i les conseqüències que se’n deriven, per iniciar hàbits de sostenibilitat i conservació de l’entorn.',
        criteris: [
          'Establir relacions entre els fenòmens del medi natural i la seva incidència en la vida quotidiana a partir del coneixement i l’observació del medi natural.',
          'Incorporar progressivament els aspectes bàsics de les funcions vitals dels éssers vius: nutrició, relació (en un medi concret) i reproducció, distingint-los dels objectes inerts.',
          'Conèixer i cuidar amb una actitud de respecte el medi natural, identificant l’impacte de les accions humanes en la conservació i la preservació de l’entorn.',
          'Establir relacions entre el medi natural i social a partir del coneixement i l’observació dels fenòmens naturals.',
        ],
      },
    ],
  },

  'Eix 4. Un infant que forma part de la diversitat del món': {
    competencies: [
      {
        id: 'CE1',
        title:
          'Avançar en la relació amb els altres en condicions d’igualtat, creant lligams, per construir la pròpia identitat basada en els valors democràtics i de respecte als drets humans.',
        description:
          'Avançar en la relació amb els altres en condicions d’igualtat, creant lligams, per construir la pròpia identitat basada en els valors democràtics i de respecte als drets humans.',
        criteris: [
          'Establir relacions i vincles saludables amb els altres que respectin la convivència, la diversitat i la igualtat de gènere.',
          'Iniciar-se en la resolució de conflictes, proposant alternatives i gaudint dels beneficis d’arribar a acords, amb l’ajuda de l’acompanyament de l’adult.',
          'Reproduir conductes, accions o rols lliures d’estereotips de gènere, a través del joc simbòlic en interacció amb els iguals.',
          'Participar en propostes de grup acceptant les dinàmiques i el funcionament acordat.',
        ],
      },
      {
        id: 'CE2',
        title:
          'Apreciar progressivament l’entorn social i cultural proper i la seva diversitat, mostrant interès i respecte per conviure.',
        description:
          'Apreciar progressivament l’entorn social i cultural proper i la seva diversitat, mostrant interès i respecte per conviure.',
        criteris: [
          'Reconèixer la diversitat del seu entorn proper, iniciant-se en el respecte a les diferències individuals.',
          'Conèixer les propostes i situacions relacionades amb costums i tradicions ètniques i culturals diverses presents al seu entorn, i participar-hi, mostrant interès i respecte.',
          'Relacionar-se de forma natural i respectuosa manifestant interès per les persones de l’entorn proper i per la seva llengua.',
          'Participar en situacions d’ús de diferents llengües, mostrant curiositat i respecte per la diversitat de perfils lingüístics.',
          'Reconèixer models positius en l’entorn proper que fomentin la igualtat de gènere i les conductes no sexistes.',
        ],
      },
    ],
  },
};
