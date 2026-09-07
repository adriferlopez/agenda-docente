// Sabers bàsics (continguts) de l'Educació Infantil, Comunitat Valenciana —
// generat a partir del DECRET 100/2022, de 29 de juliol, del Consell, pel
// qual s'estableix l'ordenació i el currículum d'Educació Infantil (DOGV
// núm. 9384, 10/08/2022), Annex II. Font: dogv.gva.es.
//
// Aquesta és la versió en valencià (el decret es publica
// íntegrament en els dos idiomes). Vegeu curriculum/index.ts per veure com
// se selecciona en funció de l'idioma configurat (mateix criteri que
// sabersVAL_ES.ts / sabersVAL_VAL.ts per a Primària).
import type { SaberAreaGeneric } from './curriculum/types';

export const INFANTIL_VALENCIA_CICLES = ['0-3', '3-6'] as const;

export const SABERS_AREAS_INFANTIL_VALENCIA_VAL = [
  "Creixement en Harmonia",
  "Descobriment i Exploració de l'Entorn",
  "Comunicació i Representació de la Realitat",
];

export const SABERS_INFANTIL_VALENCIA_VAL: Record<string, SaberAreaGeneric> = {
  "Creixement en Harmonia": {
    name: "Creixement en Harmonia",
    courseKeys: [...INFANTIL_VALENCIA_CICLES],
    courseLabels: {},
    blocs: {
      "A. Construcció de la identitat i l'autonomia en relació amb si mateix": {
        '0-3': [
          "Parts del cos: característiques individuals i percepció dels canvis físics.",
          "Joc exploratori, sensorial, simbòlic i motor.",
          "El moviment lliure en les diverses situacions de la vida quotidiana.",
          "Control dinàmic: desplaçaments en l'espai i coordinació visomotriu a través del contacte amb objectes i materials.",
          "Iniciació en el control estàtic: respiració, relaxació, tonicitat i autocontrol.",
          "Accions relacionades amb les necessitats bàsiques quotidianes d'alimentació, descans i higiene personal en espais no habituals.",
          "Estratègies per a identificar i evitar situacions de risc i perill.",
          "Identificació i adequació d'estats emocionals a les diverses situacions: temps d'espera, xicotetes frustracions associades a la satisfacció de necessitats bàsiques i cures.",
          "Satisfacció pels progressos assolits que generen de seguretat i confiança.",
          "Accions bàsiques en la resolució de tasques senzilles i reptes amb demanda d'ajuda.",
          "Xicotetes responsabilitats en jocs, situacions i activitats.",
        ],
        '3-6': [
          "Imatge global i segmentària del cos: característiques individuals i percepció dels canvis físics.",
          "Autoimatge positiva i ajustada davant dels altres. Identificació i respecte a les diferències.",
          "Joc exploratori, sensorial, simbòlic, motor i de regles.",
          "El moviment com a font d'aprenentatge i desenvolupament.",
          "Control dinàmic: coordinació general, equilibri, coordinació visomotriu. Desplaçaments en diferents espais.",
          "Control estàtic: respiració, tonicitat, relaxació i autocontrol.",
          "Estratègies per a desenvolupar la seguretat en si mateix, el reconeixement de les seues necessitats, possibilitats i limitacions.",
          "Estratègies per a manifestar i regular les necessitats bàsiques en relació amb el benestar personal.",
          "Participació en els hàbits i les pràctiques sostenibles i responsables relacionades amb l'alimentació, la higiene, el descans, l'autocura i la cura de l'entorn",
          "Actituds de prudència davant de situacions de risc o perill.",
          "Estratègies per a compartir pensaments i planificar accions que ajuden a resoldre un problema o una tasca de manera creativa en situacions de la vida quotidiana.",
          "Seguretat i confiança en les pròpies possibilitats d'aprenentatge i satisfacció pels progressos aconseguits.",
          "Compromís en jocs, situacions i activitats.",
        ],
      },
      "B. Construcció de la identitat i l'autonomia en relació amb els altres": {
        '0-3': [
          "La transició del grup familiar al grup social de l'escola.",
          "Interés a conéixer altres persones.",
          "Vinculació afectiva amb les persones de referència.",
          "Les primeres organitzacions socials i grups de pertinença: la família, la casa i l'escola.",
          "Estratègies per a proposar, comunicar experiències i participar activament en situacions de la vida quotidiana i gestionar possibles conflictes.",
        ],
        '3-6': [
          "La transició del grup familiar al grup social de l'escola.",
          "L'amistat com a element de protecció, de prevenció de la violència i de desenvolupament de la cultura de la pau.",
          "Fórmules de cortesia i interacció social positiva.",
          "Sentit de pertinença al grup i relacions amb les persones del seu entorn.",
          "Les primeres organitzacions socials: la família, la casa, l'escola i altres grups socials. Característiques, funcions i relacions.",
          "Estratègies per a la resolució pacífica i dialogada de conflictes sorgits en les interaccions amb els altres.",
          "Pautes bàsiques de convivència que incloguen el respecte a les diferències i la igualtat de gènere.",
          "Estratègies per a proposar, comunicar i participar activament en la presa de decisions de situacions de la vida quotidiana.",
        ],
      },
    },
  },

  "Descobriment i Exploració de l'Entorn": {
    name: "Descobriment i Exploració de l'Entorn",
    courseKeys: [...INFANTIL_VALENCIA_CICLES],
    courseLabels: {},
    blocs: {
      "A. Observació i experimentació de l'entorn immediat físic i natural": {
        '0-3': [
          "Exploració sensorial.",
          "Interés i curiositat durant l'exploració.",
          "Característiques elementals dels objectes i materials amb els quals es relacionen.",
          "Iniciació a l'establiment de relacions d'ordre, correspondència, classificació i comparació.",
          "Sensacions dels elements que formen part del seu entorn pròxim a través de les possibilitats perceptives.",
          "Nocions espacials bàsiques en relació amb el propi cos i amb els objectes que l'envolten.",
          "Quantificadors bàsics contextualitzats.",
          "Necessitats dels éssers vius.",
          "Processos i canvis perceptibles en allò que ens envolta.",
          "Elements naturals, observació i experimentació.",
        ],
        '3-6': [
          "Sensacions, el sentit socioemocional dels descobriments mitjançant l'experiència en el món que els envolta.",
          "Interés, curiositat i actitud de respecte durant l'exploració.",
          "Qualitats o atributs dels objectes, des de la integració sensorial del món.",
          "Relacions d'ordre, classificació, agrupació, comparació i correspondència.",
          "Característiques, propietats i comportaments d'objectes i materials.",
          "Exploració de la capacitat, el pes, la grandària, el volum, les mescles i els transvasaments.",
          "Els objectes, les eines i la relació que tenen amb l'ésser humà en diversos contextos experimentals pròxims a la xiqueta o el xiquet.",
          "Nocions espacials bàsiques en relació amb el propi cos, els objectes i les accions, tant en repòs com en moviment.",
          "Quantificadors bàsics contextualitzats: funcionalitat dels números en la vida quotidiana, situacions de mesura. El temps i l'organització d'aquest.",
          "Les necessitats dels éssers vius i les diferències amb els objectes inerts des de les experiències més pròximes a la infància.",
          "Els canvis en els éssers vius, objectes, material si elements de l'entorn pròxim: creixement, transformacions, processos i reaccions elementals i perceptibles.",
          "Elements naturals. Les relacions bàsiques entre els éssers humans, els animals i les plantes. Repercussió en la vida quotidiana.",
        ],
      },
      "B. Curiositat, iniciació al pensament científic i al raonament lògic des de la creativitat": {
        '0-3': [
          "Interacció amb els altres i amb l'entorn. Connexions entre el que es coneix i el que és nou.",
          "Observació i experimentació sobre l'entorn pròxim. La intencionalitat.",
          "Iniciació a la planificació i la presa de decisions.",
          "Iniciació al sentit espacial i numèric.",
          "Observació i curiositat davant d'allò que ens envolta.",
        ],
        '3-6': [
          "Les relacions entre el que es coneix i el que és nou.",
          "La interacció en l'entorn social, físic i natural.",
          "Estratègies d'investigació elementals: observació, experimentació, formulació i comprovació d'hipòtesi.",
          "Iniciativa en la planificació seguint procediments científics en l'entorn pròxim.",
          "Processos i eines per a proposar, anticipar i comunicar solucions a problemes senzills del seu entorn des del descobriment, la creativitat i la imaginació.",
          "Autoavaluació i coavaluació dels plantejaments i dels resultats trobats.",
          "Satisfacció pròpia i compartida en els processos i els descobriments.",
          "Sentit numèric, sentit de la mesura i sentit espacial.",
        ],
      },
      "C. Valoració, respecte, cura i acció sobre l'entorn": {
        '0-3': [
          "Els elements i els fenòmens naturals del seu entorn.",
          "Efecte de les accions pròpies en el medi físic i natural.",
          "Les cures de l'entorn i dels éssers vius.",
        ],
        '3-6': [
          "Repercussió dels elements i fenòmens naturals en la vida de les persones en el seu entorn pròxim.",
          "La influència de les accions de les persones en el medi físic i natural. Exemples senzills sobre efectes del canvi climàtic.",
          "La indagació sobre l'entorn: observació, curiositat i descobriment.",
          "Introducció bàsica a les energies en general i ales energies netes i naturals, així com al concepte de sostenibilitat des d'actituds respectuoses en el seu entorn pròxim.",
          "Les accions de l'ésser humà i la repercussió que tenen en el medi.",
          "Cura i respecte cap als éssers vius i els entorns que habiten.",
        ],
      },
    },
  },

  "Comunicació i Representació de la Realitat": {
    name: "Comunicació i Representació de la Realitat",
    courseKeys: [...INFANTIL_VALENCIA_CICLES],
    courseLabels: {},
    blocs: {
      "A. Descobriment dels llenguatges": {
        '0-3': [
          "Els objectes d'ús compartit com a mediadors simbòlics en els primers contextos d'interacció.",
          "Possibilitats sonores i expressives de la veu, del cos, dels objectes i dels instruments.",
          "La imatge i el so en l'entorn físic.",
          "L'escolta com a descobriment i gaudi de l'entorn.",
          "Cançons i altres manifestacions musicals. Cançons de bressol, non-non i jocs de falda. Sensacions que les acompanyen, reconeixement, evocació i reproducció.",
          "Exploració i expressió a través del gest i del moviment lliure. Els desplaçaments per l'espai.",
          "Materials, colors, textures, tècniques i procediments plàstics.",
          "El joc simbòlic com a mitjà d'expressió.",
          "Desig de comunicar-se i interés a participar en diferents propostes artístiques.",
          "Aproximació als codis de representació gràfica (dibuix, imatges, símbols, etc.) en diversos suports. Primeres representacions indeterminades.",
        ],
        '3-6': [
          "Qualitats expressives i creatives dels diferents materials i objectes quotidians: naturals, artificials i de rebuig.",
          "Possibilitats creatives i comunicatives d'aplicacions i eines digitals.",
          "La imatge i el so en l'entorn físic i virtual.",
          "Aproximació al llenguatge sonor i a les possibilitats expressives i creatives de la veu, el cos, els objectes quotidians de l'entorn i els instruments.",
          "Identificació i discriminació visual i auditiva.",
          "Cançons i altres manifestacions musicals i artístiques. Sentiments, emocions i accions que suggereixen.",
          "Cura de la veu. Relaxació i intensitat vocal.",
          "El gest, el moviment, la mímica, la dansa i el teatre. Interés i participació.",
          "Materials específics i inespecífics, eines, tècniques i elements en les representacions plàstiques.",
          "Jocs d'expressió corporal i dramàtica.",
          "Intenció expressiva i el desig de comunicar-se a partir de les produccions artístiques.",
          "Aproximació als codis de representació gràfica: dibuix, imatges, símbols, signes i nombres en diferents suports. Usos socials de la comunicació.",
        ],
      },
      "B. Possibilitats comunicatives i expressives del llenguatge verbal": {
        '0-3': [
          "Escolta activa i comprensió de paraules i missatges orals senzills en les dues llengües oficials.",
          "Sons, expressió sonora i articulació de les paraules. Jocs d'imitació, lingüístics i de percepció auditiva.",
          "Interés per participar en interaccions orals i situacions habituals de comunicació des de la realitat lingüística.",
          "El llenguatge oral en situacions quotidianes: expressió de necessitats, emocions i vivències, primeres converses amb sons, vocalitzacions i jocs d'interacció.",
          "Estratègies que faciliten els intercanvis: contacte visual amb l'interlocutor, escolta atenta i espera per a intervindre en situacions quotidianes que afavorisquen el respecte i la igualtat.",
          "Interés i atenció per a escoltar textos llegits per altres persones.",
          "Observació i manipulació de textos i imatges en diversos formats: llibres, revistes, cartells, etiquetes.",
          "Repertori lingüístic individual. Lèxic de les llengües oficials relacionat amb situacions quotidianes.",
        ],
        '3-6': [
          "Comprensió de missatges orals en les dues llengües oficials.",
          "Articulació de paraules i estructures senzilles. Jocs d'imitació lingüístics, de percepció auditiva i consciència fonològica.",
          "Interés per participar en interaccions orals i diferents situacions de comunicació.",
          "Expressió de missatges que responguen a les seues necessitats i interessos i sobre situacions diferents: quotidianes, viscudes o imaginades.",
          "Estratègies i convencions socials de l'intercanvi lingüístic en situacions comunicatives que potencien el respecte i la igualtat: atenció, escolta activa, torns de diàleg i alternança.",
          "Usos socials de la lectura i l'escriptura. Models lectors de referència.",
          "Textos orals formals i informals en les dues llengües oficials amb suports d'altres llenguatges.",
          "Repertori lingüístic: situacions i funcions comunicatives i representatives. Converses col·lectives, lèxic en les llengües oficials i discurs.",
          "Aproximació a la llengua estrangera. Elements per a una comunicació funcional bàsica.",
          "Relats orals en llengua estrangera.",
        ],
      },
      "C. Patrimoni i cultura": {
        '0-3': [
          "Celebracions, costums i tradicions etnoculturals presents en l'entorn.",
          "Els espais lletrats i culturals com a font de gaudi.",
          "Participació i interés en els diversos gèneres literaris infantils de la nostra cultura popular: contes, relats, endevinalles, teatre, travallengües, poesia, faules, rondalles, llegendes, cançons de bressol... sense estereotips sexistes, com a font de plaer i aprenentatge.",
          "Convivència amb la diversitat lingüística i cultural de l'aula i de l'entorn.",
        ],
        '3-6': [
          "Les manifestacions artístiques musicals, plàstiques, visuals, audiovisuals i gastronòmiques del seu entorn com a part del patrimoni.",
          "Celebracions, costums i jocs tradicionals de la cultura pròpia de la Comunitat. Estima per les senyes d'identitat etnoculturals presents en el seu entorn.",
          "Els espais lletrats i culturals, com a fonts d'informació i gaudi.",
          "Característiques i possibilitats representatives de diversos gèneres literaris infantils de diferents cultures (contes, relats, endevinalles, teatre, travallengües, poesia, faules, rondalles, llegendes, cançons de bressol...).",
          "Actitud positiva cap a la diversitat lingüística i cultural de l'entorn social i escolar.",
          "Interés per l'ús del valencià en qualsevol situació, especialment quan no és la llengua habitual.",
          "Curiositat i interés pels aspectes diferencials de les llengües estrangeres, en comparació de les llengües oficials.",
        ],
      },
    },
  },

};
