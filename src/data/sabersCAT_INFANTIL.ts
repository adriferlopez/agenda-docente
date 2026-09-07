// Sabers de l'Educació Infantil de Catalunya, generats a partir del DECRET
// 21/2023, de 7 de febrer, d'ordenació dels ensenyaments de l'educació
// infantil (DOGC, Annex 2), la font pròpia de la Generalitat de Catalunya
// —substitueix la font estatal (Real Decreto 95/2022) que es feia servir
// abans per a Catalunya (aquesta darrera es manté a sabersINFANTIL_RD95.ts
// per a comunitats sense decret propi carregat, com la Comunitat Valenciana).
//
// Diferències estructurals rellevants respecte al Real Decreto 95/2022:
// - El currículum s'organitza en 4 "eixos de desenvolupament i aprenentatge"
//   (no 3 àrees com l'estatal).
// - Els sabers SÍ es diferencien per cicle (primer cicle 0-3 / segon cicle
//   3-6), igual que a la font estatal — per això es manté el mateix
//   courseKeys/courseLabels. Alguns blocs de sabers només tenen contingut a
//   segon cicle (p.ex. "Aproximació al llenguatge escrit" o "Relació amb les
//   tecnologies digitals" de l'Eix 2): es representen amb un array buit a
//   '0-3'.
import type { SaberAreaGeneric } from './curriculum/types';

export const INFANTIL_CICLES = ['0-3', '3-6'] as const;
export type InfantilCicle = typeof INFANTIL_CICLES[number];

export const INFANTIL_CICLE_LABELS: Record<string, string> = {
  '0-3': 'Primer cicle (0-3 anys)',
  '3-6': 'Segon cicle (3-6 anys)',
};

export const SABERS_AREAS_INFANTIL = [
  'Eix 1. Un infant que creix amb autonomia i confiança',
  'Eix 2. Un infant que es comunica amb diferents llenguatges',
  'Eix 3. Un infant que descobreix l’entorn amb curiositat',
  'Eix 4. Un infant que forma part de la diversitat del món',
];

export const SABERS_CATALUNYA_INFANTIL: Record<string, SaberAreaGeneric> = {
  'Eix 1. Un infant que creix amb autonomia i confiança': {
    name: 'Eix 1. Un infant que creix amb autonomia i confiança',
    courseKeys: [...INFANTIL_CICLES],
    courseLabels: INFANTIL_CICLE_LABELS,
    blocs: {
      'Cos, moviment i autonomia': {
        '0-3': [
          'Descobriment i reconeixement de la pròpia imatge i la de les persones de l’entorn.',
          'Curiositat i interès en l’exploració sensoriomotriu i en les habilitats manipulatives necessàries.',
          'Descobriment d’objectes de manera activa i autònoma.',
          'Adquisició d’una progressiva autonomia en situacions quotidianes.',
          'Desenvolupament progressiu d’estratègies per identificar i evitar situacions de risc o perill.',
          'Gaudi i benestar en el moviment lliure i el joc autònom.',
        ],
        '3-6': [
          'Acceptació del propi cos i dels cossos dels altres.',
          'Respecte pel propi cos i pels cossos dels altres.',
          'Construcció progressiva d’una autoimatge positiva i una imatge positiva dels altres.',
          'Exploració i reconeixement del propi cos a través dels sentits.',
          'Adaptació del propi moviment en relació amb els altres, amb els objectes i amb les situacions espaciotemporals.',
          'Exploració i coneixement global i segmentari del cos, de les característiques individuals i dels canvis físics.',
          'Domini progressiu de les habilitats motrius bàsiques: saltar, girar, respirar, manipular objectes, desplaçar-se, enfilar-se i fer equilibris.',
          'Control i consciència corporal.',
          'Domini actiu del to muscular i la postura, i adaptació a les característiques dels objectes, accions i situacions.',
          'Ordenació progressiva de la lateralitat.',
          'Experimentació manipulativa i domini progressiu de la psicomotricitat fina amb diferents objectes i eines, i inici del desenvolupament grafomotor.',
          'Experimentació i inici progressiu de la definició de la lateralitat dominant.',
          'Iniciativa i curiositat per adquirir noves habilitats motrius a través del joc i el moviment lliure.',
          'Vivència del joc autònom i el moviment lliure com a font de benestar, aprenentatge i relació.',
          'Desenvolupament i autoregulació progressiva d’hàbits d’autonomia.',
          'Iniciativa i esforç per trobar solucions a diferents situacions.',
          'Adaptació de forma autònoma a l’entorn relacionant-se amb els altres.',
          'Implicació progressiva en la cura d’un mateix i dels altres.',
        ],
      },
      'Desenvolupament de l’afectivitat': {
        '0-3': [
          'Vivència i expressió d’emocions, sentiments i sensacions.',
          'Disposició per establir relacions afectives positives amb els altres infants i amb les persones adultes amb qui comparteix situacions i activitats quotidianament.',
          'Vivència i expressió de les pròpies necessitats, preferències i interessos.',
          'Col·laboració i ajuda mútua en diferents contextos i moments de la vida quotidiana.',
        ],
        '3-6': [
          'Vivència i expressió d’emocions, sentiments i sensacions.',
          'Vivència i expressió de les pròpies necessitats, preferències i interessos.',
          'Col·laboració i ajuda mútua en diferents contextos i moments de la vida quotidiana.',
          'Sentiment de pertinença al grup en projectes compartits.',
          'Desenvolupament d’estratègies de seguretat afectiva i emocional.',
          'Expressió i desenvolupament de relacions afectives i comunicatives, sabent demanar i acceptar ajuda quan es necessiti.',
        ],
      },
      'Orientació en l’espai i organització en el temps. Gestió dels canvis': {
        '0-3': [
          'Orientació autònoma en els espais habituals i quotidians i iniciació en l’ús de termes relatius a l’espai (aquí, allà, dins, fora, etc.).',
          'Orientació en les seqüències temporals en què s’organitza la vida diària.',
          'Iniciació en l’ús de termes relatius a l’organització del temps (ara, després, avui, demà, etc.).',
        ],
        '3-6': [
          'Utilització de nocions temporals i espacials bàsiques en relació amb el cos, els objectes i altres persones en les pròpies vivències.',
          'Identificació d’alguns canvis i permanències en la vida quotidiana i en l’entorn proper i predicció de la seva continuïtat.',
          'Comprensió progressiva de la idea del pas del temps, els dies, les setmanes, els mesos, les estacions, les festes populars, etc.',
          'Reconeixement de seqüències i ordenació temporal de fets i activitats de la vida quotidiana. Identificació de sèries, repeticions i patrons.',
          'Organització i representació espacial partint de les pròpies vivències, utilitzant diferents llenguatges.',
          'Reconeixement d’imatges simètriques en el propi cos i la natura.',
          'Reconeixement d’un mateix element des de diferents punts de vista i de mides diferents.',
          'Interpretació de representacions de trajectes coneguts.',
          'Ús de mapes senzills i/o seguiment d’indicacions verbals en situacions de joc i entorns propers.',
        ],
      },
      'Hàbits de vida saludable per a l’autocura i la cura de l’entorn': {
        '0-3': [
          'Identificació i manifestació de les pròpies necessitats fisiològiques.',
          'Participació en les accions quotidianes d’alimentació, higiene personal i descans.',
          'Participació en hàbits sostenibles relacionats amb el benestar corporal, la higiene i la salut.',
        ],
        '3-6': [
          'Identificació, manifestació i regulació de les pròpies necessitats fisiològiques.',
          'Reconeixement de situacions perilloses i prevenció d’accidents i prudència davant d’algunes situacions de risc o perill.',
          'Incorporació progressiva d’hàbits i actituds de superació, perseverança, atenció i iniciativa.',
          'Incorporació progressiva d’hàbits sostenibles i ecosocialment responsables relacionats amb la salut, el benestar personal i l’entorn en què habiten.',
        ],
      },
    },
  },

  'Eix 2. Un infant que es comunica amb diferents llenguatges': {
    name: 'Eix 2. Un infant que es comunica amb diferents llenguatges',
    courseKeys: [...INFANTIL_CICLES],
    courseLabels: INFANTIL_CICLE_LABELS,
    blocs: {
      'Intenció i elements de la interacció comunicativa': {
        '0-3': [
          'Desig de comunicar-se com a base de l’intercanvi comunicatiu.',
          'Utilització de les possibilitats motrius del cos amb intencionalitat comunicativa i expressiva.',
          'Manifestació d’actituds comunicatives significatives: atenció conjunta, mirada referencial i escolta atenta.',
        ],
        '3-6': [
          'Adquisició progressiva de nou repertori comunicatiu. Elements de comunicació no verbal.',
          'Utilització de frases cada vegada més complexes.',
          'Manifestació d’empatia i assertivitat en moments de relació i comunicació amb la resta d’infants i amb les persones adultes de referència.',
          'Utilització de normes socials d’intercanvi lingüístic en situacions comunicatives que potenciïn el respecte i la igualtat: atenció, escolta activa, torns de diàleg i alternança.',
        ],
      },
      'Comunicació oral. Expressió, comprensió i diàleg': {
        '0-3': [
          'Comprensió de les intencions i dels missatges amb una escolta activa, reconeixent els diferents senyals comunicatius: gest, entonació…',
          'Iniciació en la descoberta i l’ús de la llengua oral com a oportunitat d’expressió i representació.',
          'Expressió de necessitats, sentiments i idees mitjançant la llengua oral.',
          'Utilització de frases senzilles en situacions properes: primeres converses amb sons, vocalitzacions i jocs d’interacció.',
          'Ampliació progressiva del repertori lingüístic.',
          'Interès, gaudi i participació en intercanvis lúdics amb la llengua oral.',
        ],
        '3-6': [
          'Ús progressiu de la llengua oral en situacions quotidianes per evocar i relatar fets, per expressar i comunicar idees, desigs i sentiments, com a forma d’estructurar el propi pensament.',
          'Ús progressiu de la llengua oral en situacions quotidianes per regular la pròpia acció.',
          'Utilització d’estratègies de comprensió amb imitació de models i amb un ús de la llengua oral cada vegada més acurat en pronunciació, estructura gramatical, lèxic, entonació, to de veu, etc.',
          'Participació en converses per compartir descobertes, hipòtesis, desitjos, sentiments i emocions.',
          'Contrast de les pròpies idees amb les dels altres i incorporació de les seves aportacions.',
          'Ús de la llengua oral per mostrar acords i desacords i resoldre conflictes.',
          'Participació i escolta activa en situacions habituals de comunicació: converses, contextos de joc i diferents situacions de la vida quotidiana.',
          'Discriminació auditiva i adquisició progressiva de consciència fonològica en contextos de joc i de vida quotidiana.',
          'Ús d’un llenguatge respectuós amb les diferències i identificació progressiva, amb acompanyament adult, d’estereotips lingüístics.',
        ],
      },
      'Aproximació al llenguatge escrit': {
        '0-3': [],
        '3-6': [
          'Descoberta de l’ús social de la lectura i l’escriptura, de la seva funcionalitat i significativitat en situacions comunicatives reals.',
          'Habilitats interpretatives en la lectura d’imatges i descodificació de signes visuals cada vegada més complexos.',
          'Ús significatiu d’estratègies per aproximar-se a la lectura: formulació d’hipòtesis; identificació de paraules i lletres significatives i usuals; utilització del context i del format de l’escrit, i ús de les il·lustracions, gràfics i altres imatges que acompanyen els textos.',
          'Iniciativa i interès per expressar-se per mitjà de l’escriptura en contextos significatius i amb aproximació progressiva a l’escriptura convencional.',
          'Discriminació auditiva i adquisició progressiva de consciència fonològica en propostes significatives i contextos de joc.',
          'Iniciació al desenvolupament del traç i de la grafia des del moviment lliure en situacions significatives i funcionals.',
          'Iniciació al contacte amb textos escrits en diferents suports.',
          'Desenvolupament de situacions de lectura a través de models lectors de referència o de situacions individuals o de grup.',
        ],
      },
      'Literatura infantil': {
        '0-3': [
          'Interès progressiu pels textos literaris infantils orals i escrits. Gaudi d’aquests textos.',
          'Creació de vincles afectius i lúdics amb les persones que comparteixen els relats i amb els textos literaris.',
          'Ampliació progressiva del repertori de cançons de bressol, moixaines i jocs de falda, contes...',
          'Inici en la lectura d’imatges significatives i la descodificació de signes visuals més usuals en l’entorn proper.',
        ],
        '3-6': [
          'Vivència de la literatura com un espai d’experiència amb sentit per si mateix.',
          'Gaudi de la literatura com a pràctica compartida.',
          'Enfortiment de vincles afectius i lúdics amb les persones que comparteixen els relats i amb els textos literaris.',
          'Interès per les converses i diàlegs sobre textos literaris que eduquin la sensibilitat i el respecte i nodreixin la imaginació i la curiositat.',
          'Escolta activa, comprensió i reproducció de les diferents manifestacions de la literatura popular (narracions, poesia, endevinalles) com a font de plaer.',
          'Descoberta de les biblioteques com a espais de gaudi i aprenentatge.',
        ],
      },
      'Llenguatge matemàtic': {
        '0-3': [
          'Iniciació a la comprensió i expressió de l’ús del llenguatge matemàtic en situacions quotidianes en què s’indiquin relacions de quantitat, mesura i/o situació en l’espai: molt/poc, llarg/curt i prop/lluny.',
        ],
        '3-6': [
          'Reconeixement i ús de llenguatge matemàtic, nombres, símbols i codis que poden ser llegits pels altres i que tenen significats compartits per la societat en contextos reals i situacions progressivament més complexes.',
          'Elaboració i comunicació d’idees matemàtiques i raonament emprant llenguatge matemàtic.',
          'Reconeixement de nombres i de la quantitat que representen, així com de la seva utilitat (quantitat, identificació, ordre, situació...) en contextos propers i de vida quotidiana.',
        ],
      },
      'Llenguatge i expressió musical': {
        '0-3': [
          'Iniciació en la descoberta i l’ús del llenguatge musical com a oportunitat d’expressió i representació.',
          'Reconeixement i reproducció de cançons, cantarelles, poemes, jocs de falda i ritmes coneguts.',
          'Descoberta de les possibilitats sonores i expressives de la veu, del cos, dels objectes i dels instruments.',
          'Desenvolupament de l’escolta com a font de descobriment i gaudi.',
        ],
        '3-6': [
          'Progressió en el domini i l’ús de la veu, a partir de jocs i cançons.',
          'Curiositat, interès i gaudi davant les creacions musicals en diferents formats.',
          'Escolta activa de creacions musicals per a la discriminació, identificació i captació de la pulsació i ritmes, estructures, qualitats dels sons, melodies i harmonies.',
          'Interpretació de cançons i danses tradicionals catalanes i d’arreu del món.',
          'Adquisició d’actituds i habilitats necessàries per escoltar, observar, interpretar i crear.',
          'Desenvolupament de l’escolta com a font de descobriment i gaudi.',
        ],
      },
      'Llenguatge i expressió plàstica': {
        '0-3': [
          'Iniciació en la descoberta i l’ús del llenguatge plàstic com a oportunitat d’expressió i representació.',
          'Percepció sensorial dels elements de l’entorn immediat.',
          'Curiositat i interès per l’exploració d’alguns materials i de tècniques plàstiques.',
        ],
        '3-6': [
          'Curiositat i interès per les creacions plàstiques. Respecte per les creacions plàstiques dels altres.',
          'Ús del llenguatge plàstic com a font de gaudi, de creació i d’aprenentatge.',
          'Experimentació amb diferents eines, materials i tècniques plàstiques: dibuix, pintura, collage, modelatge, estampació...',
          'Descoberta d’habilitats i destreses manuals: retallar, esquinçar, arrugar, plegar…',
          'Descoberta progressiva de l’alfabet visual: color, textura, volum, punt, línia, taca, enquadrament, punts de vista, llum…',
          'Descoberta d’artistes i manifestacions plàstiques de l’entorn cultural i artístic.',
        ],
      },
      'Llenguatge i expressió corporal': {
        '0-3': [
          'Iniciació en la descoberta i l’ús del llenguatge corporal com a oportunitat d’expressió i representació.',
          'Expressió i exploració lliure del gest i el moviment en l’espai.',
          'Participació en jocs i danses senzilles reproduint alguns moviments i gestos.',
        ],
        '3-6': [
          'Experimentació de les possibilitats expressives i comunicatives del propi cos en propostes individuals i grupals.',
          'Participació i gaudi en jocs d’expressió corporal i dramàtica.',
          'Ús de recursos expressius del propi cos en la comunicació oral.',
          'Participació i interès per espectacles de les arts escèniques que despertin la sensibilitat i la creativitat.',
        ],
      },
      'Relació amb les tecnologies digitals': {
        '0-3': [],
        '3-6': [
          'Ús saludable d’aplicacions i eines audiovisuals i digitals amb diferents finalitats: creació, comunicació, aprenentatge i gaudi.',
          'Lectura i interpretació d’imatges i d’informació rebuda a través de mitjans digitals.',
        ],
      },
    },
  },

  'Eix 3. Un infant que descobreix l’entorn amb curiositat': {
    name: 'Eix 3. Un infant que descobreix l’entorn amb curiositat',
    courseKeys: [...INFANTIL_CICLES],
    courseLabels: INFANTIL_CICLE_LABELS,
    blocs: {
      'Diàleg corporal amb l’entorn. Exploració d’objectes i materials': {
        '0-3': [
          'Observació de qualitats perceptibles i exploració dels elements de l’entorn.',
          'Diferenciació d’algunes qualitats sensorials fruit de l’observació i l’exploració dels objectes, materials i elements de l’entorn natural i de la comparació dels seus atributs i propietats.',
          'Reconeixement progressiu de les primeres nocions quantitatives (molt, poc, bastant…) en situacions quotidianes.',
          'Iniciació en la classificació i el repartiment d’objectes.',
        ],
        '3-6': [
          'Observació, exploració i identificació d’elements de l’entorn: objectes, materials, animals, plantes, paisatges, etc., amb actitud de respecte.',
          'Comparació, correspondència, ordenació i classificació de les qualitats o atributs dels elements de l’entorn. Relacions qualitatives i quantitatives. Reconeixement de patrons, anticipacions i verbalització de regularitats en situacions de la vida quotidiana.',
          'Reconeixement de situacions en les quals és necessari mesurar.',
          'Estimacions i prediccions amb unitats no convencionals, de manera contextualitzada i funcional.',
          'Descoberta de situacions en què es fa necessari mesurar.',
          'Utilització progressiva d’estratègies de mesura de longitud, capacitat, massa, temps i temperatura.',
          'Construcció de la noció de quantitat. Quantificadors bàsics contextualitzats.',
          'Utilització de material per representar la noció de quantitat.',
          'Reconeixement de situacions en les quals és necessari comptar. Funcionalitat dels nombres en la vida quotidiana.',
          'Utilització progressiva d’estratègies per comptar, inclòs el comptatge a cop d’ull.',
          'Aplicació d’estratègies de càlcul per afegir, treure, repartir i agrupar.',
          'Reconeixement de la modificació de les quantitats i estimacions de resultats en el càlcul.',
          'Identificació de figures geomètriques que formen part d’elements de l’entorn.',
          'Representació gràfica i comunicació dels processos que s’han seguit en l’experimentació i la interpretació de resultats.',
        ],
      },
      'Experimentació en l’entorn. Curiositat, pensament científic, raonament lògic i creativitat': {
        '0-3': [
          'Exploració i indagació de l’entorn físic i social amb curiositat i interès.',
          'Inici en la relació i connexió entre el fet conegut i el que és nou, entre experiències prèvies i noves.',
          'Desenvolupament d’habilitats com l’observació, la comprovació i l’assaig-error en els contextos de joc i la vida quotidiana.',
        ],
        '3-6': [
          'Observació, exploració i experimentació, amb tots els sentits, del moviment, de la força i de l’equilibri.',
          'Desenvolupament d’estratègies de construcció de nous coneixements: relacions i connexions entre el fet conegut i el que és nou i entre experiències prèvies i noves.',
          'Aproximació al mètode científic: formulació de preguntes, indagació, contrast, posicionament i aplicació a nous contextos per tornar a formular noves preguntes.',
          'Desenvolupament d’estratègies per proposar solucions: creativitat, diàleg i descobriment.',
          'Avenç en les estratègies de planificació i organització de la pròpia acció, mitjançant el diàleg, la cooperació i el consens amb els altres.',
          'Inici en la verbalització dels processos i dels resultats. Comunicació de l’experiència realitzada i valoració de les aportacions dels altres.',
        ],
      },
      'Indagació en el medi natural. Cura, valoració i respecte': {
        '0-3': [
          'Observació i exploració de l’entorn planificant i ordenant la pròpia acció.',
          'Descoberta dels efectes de les pròpies accions en el medi natural.',
          'Manipulació i experimentació d’elements de l’entorn natural amb cura i respecte.',
        ],
        '3-6': [
          'Experimentació amb elements naturals (aigua, terra i aire). Descobriment de característiques i comportaments (pes, capacitat, volum…).',
          'Ús d’instruments d’observació tant analògics com digitals: lupes, balances i sensors per a la recollida i l’anàlisi posterior de dades.',
          'Constatació dels efectes de les pròpies accions en elements del medi natural.',
          'Identificació i repercussió dels fenòmens naturals en la vida quotidiana.',
          'Coneixement progressiu del model d’ésser viu. Funcions vitals que realitzen els éssers vius: nutrició, relació i reproducció.',
          'Distinció dels éssers vius enfront dels objectes inerts.',
          'Introducció progressiva del concepte de sostenibilitat.',
          'Respecte pels éssers vius i els recursos naturals.',
        ],
      },
    },
  },

  'Eix 4. Un infant que forma part de la diversitat del món': {
    name: 'Eix 4. Un infant que forma part de la diversitat del món',
    courseKeys: [...INFANTIL_CICLES],
    courseLabels: INFANTIL_CICLE_LABELS,
    blocs: {
      'La vida amb els altres': {
        '0-3': [
          'Identificació dels primers vincles afectius i interès cap als altres infants i adults de referència.',
          'Transició progressiva del grup familiar al grup social.',
          'Disposició per establir relacions afectuoses i respectuoses.',
          'Reconeixement dels infants de l’escola com a grups socials de pertinença.',
          'Adquisició progressiva d’habilitats socials que facilitin la integració en els diferents grups en els quals participa.',
          'Desenvolupament i incorporació progressiva d’estratègies per a la gestió de conflictes.',
          'Iniciació progressiva de responsabilitats en activitats i jocs.',
        ],
        '3-6': [
          'Observació i identificació de l’entorn social: l’escola, el carrer, el barri, el poble o la ciutat.',
          'Reconeixement de la família com a nucli central de convivència i dels diferents models familiars presents a la societat.',
          'Reconeixement de pertinença a diferents grups socials. Característiques i funcions dels grups socials.',
          'Identificació i rebuig d’estereotips de gènere en el joc i l’entorn proper amb l’ajuda de l’adult.',
          'Incorporació d’habilitats socials i pautes bàsiques de convivència, que incloguin el respecte a la igualtat de gènere.',
          'Comunicació de necessitats, sentiments i emocions.',
          'Sensibilitat i percepció de les necessitats i els desitjos dels altres amb una progressiva actitud d’ajuda i de col·laboració.',
          'Comprensió i acceptació de normes compartides en alguns jocs.',
          'Desenvolupament d’actituds d’empatia respecte als altres i envers la diversitat.',
          'Disposició al diàleg i flexibilització d’actituds personals, amb acompanyament de l’adult.',
          'Assertivitat i acords en la resolució de conflictes.',
          'Iniciació a la comprensió i la valoració de la diferència i la diversitat per a l’enriquiment col·lectiu i del grup.',
          'Observació, imitació i representació de persones, personatges, objectes, animals i situacions en el joc simbòlic. Identificació i rebuig d’estereotips i prejudicis.',
        ],
      },
      'Interacció social i cultural en l’entorn': {
        '0-3': [
          'Participació activa en celebracions i tradicions culturals presents al seu entorn.',
          'Exploració progressiva de l’entorn social i cultural amb interès i curiositat.',
          'Comprensió progressiva dels costums i estils de vida referits a la pròpia cultura.',
          'Reconeixement d’elements i característiques de l’entorn sociocultural habitual (festes, tradicions, històries…).',
          'Vivència de models positius de referència.',
        ],
        '3-6': [
          'Reconeixement d’altres grups socials propers.',
          'Coneixement de les celebracions, els costums i les tradicions etnicoculturals presents al seu entorn.',
          'Participació en festes, tradicions, històries o llegendes de l’entorn proper i de Catalunya, i identificació d’alguns dels seus trets o característiques.',
          'Coneixement de la realitat lingüística de l’aula i de l’entorn proper.',
          'Observació de la diversitat de costums, maneres d’interpretar la realitat, procedències, llengües familiars, entre un mateix i els companys i companyes de classe, i acceptació d’aquesta realitat com una manera d’aprendre.',
          'Ús d’estratègies per comprendre els altres quan s’expressen oralment, adoptant una actitud positiva i de respecte envers les llengües.',
          'Interès i participació en situacions d’ús de diferents llengües.',
          'Reconeixement de models positius de referència.',
        ],
      },
    },
  },
};
