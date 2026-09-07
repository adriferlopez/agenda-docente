// Generat automàticament a partir dels PDF de Competències Específiques
// i Criteris d'Avaluació de Catalunya (Educació Primària).
import type { AreaCompetencies } from './curriculum/types';

export const COMPETENCIES_CATALUNYA_PRIMARIA: Record<string, AreaCompetencies> = {
  "Coneixement del Medi Natural, Social i Cultural": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Seleccionar i utilitzar dispositius i recursos digitals de forma responsable i eficient",
      "description": "Seleccionar i utilitzar dispositius i recursos digitals de forma responsable i eficient per tal de buscar informació, comunicar-se i treballar col·laborativament i en xarxa i per crear continguts segons les necessitats digitals del context.",
      "criteris": {
        "1-2": [
          "1.1 Fer ús, de forma responsable i guiada, de diferents fonts digitals per a la cerca d’informació, tant en grup com individualment.",
          "1.2 Utilitzar dispositius i recursos digitals per comunicar-se amb els altres i com a suport per donar a conèixer els propis aprenentatges.",
          "1.3 Crear, de manera guiada, continguts digitals senzills per construir el coneixement segons la necessitat del context."
        ],
        "3-4": [
          "1.1 Fer ús, de forma responsable, de diferents fonts digitals per a la cerca d’informació, tant en grup com individualment.",
          "1.2 Utilitzar dispositius i recursos digitals per comunicar-se amb els altres i per donar a conèixer els propis aprenentatges.",
          "1.3 Crear continguts digitals senzills per construir el coneixement segons la necessitat del context."
        ],
        "5-6": [
          "1.1 Fer ús de diferents fonts digitals, tant en grup com individualment, per identificar i seleccionar la informació adient, verificant la fiabilitat de la font en funció de l’autoria i de la data d’actualització.",
          "1.2 Utilitzar dispositius i recursos digitals de forma responsable i eficient, per contrastar, organitzar i comunicar la informació i per donar a conèixer els propis aprenentatges.",
          "1.3 Crear continguts digitals per construir el coneixement seleccionant i utilitzant dispositius i recursos digitals, segons la necessitat del context.",
          "1.4 Participar en la realització de tasques col·laboratives fent ús de recursos digitals en entorns de treball col·laboratiu dins i fora del centre."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Plantejar-se preguntes sobre el món, aplicant les diferents formes de raonament i mètodes del pensament científic",
      "description": "Plantejar-se preguntes sobre el món, aplicant les diferents formes de raonament i mètodes del pensament científic, per interpretar, respondre i predir els fets i fenòmens del medi natural, social i cultural i per prendre decisions creatives i decidir actuacions ètiques i socialment sostenibles.",
      "criteris": {
        "1-2": [
          "2.1 Demostrar curiositat, formulant-se preguntes i realitzant prediccions possibles per conèixer objectes, fets i fenòmens.",
          "2.2 Buscar informació de fonts digitals i analògiques, segures i fiables, seleccionades de manera pautada per utilitzar-la en investigacions relacionades amb el coneixement del medi.",
          "2.3 Planificar experiments amb ajuda, usant tècniques d’indagació, i fer servir instruments simples de forma segura per registrar les observacions i les dades per respondre la pregunta plantejada.",
          "2.4 Comparar i relacionar les informacions i els resultats obtinguts amb les prediccions realitzades per formular possibles respostes a les qüestions plantejades.",
          "2.5 Comunicar el resultat de les investigacions realitzades de manera oral, corporal i gràfica explicant el procés seguit amb ajuda d’un guió."
        ],
        "3-4": [
          "2.1 Demostrar curiositat, formulant-se preguntes investigables i fer prediccions raonades per conèixer objectes, fets i fenòmens.",
          "2.2 Buscar i seleccionar de forma autònoma informació de diferents fonts digitals i analògiques segures i fiables per emprar-la en les investigacions relacionades amb el coneixement del medi.",
          "2.3 Dissenyar i realitzar experiments senzills, utilitzant diferents tècniques d’indagació, emprant de forma segura instruments i dispositius analògics i digitals, per realitzar observacions, fent mesuraments precisos i registres per respondre la pregunta plantejada.",
          "2.4 Comparar i interpretar la informació, les dades obtingudes en la investigació i les prediccions realitzades per proposar respostes possibles a les qüestions plantejades.",
          "2.5 Presentar els resultats de les investigacions, utilitzar diferents tipus de formats, fent ús, també, de dispositius i recursos digitals i amb un llenguatge acurat per explicar els resultats i el procés de les investigacions realitzades."
        ],
        "5-6": [
          "2.1 Demostrar i mantenir la curiositat, formulant-se preguntes investigables i fer prediccions raonades sobre temes d’actualitat relacionats amb el medi.",
          "2.2 Buscar, seleccionar i contrastar informació, de fonts digitals i analògiques segures i fiables per usar-la en investigacions relacionades amb el coneixement del medi.",
          "2.3 Dissenyar i realitzar experiments fent ús de la indagació, seleccionant els instruments i dispositius analògics i digitals necessaris per fer observacions, prendre mesures precises i decidint el tipus de registre a utilitzar per respondre la pregunta plantejada.",
          "2.4 Analitzar i interpretar la informació, les dades obtingudes en la investigació i les prediccions realitzades per valorar la coherència de possibles solucions a les qüestions plantejades.",
          "2.5 Adaptar el missatge i el format a l’audiència a què va dirigit, fent ús, també, de dispositius i recursos digitals fent servir un llenguatge acurat i precís per justificar els resultats aconseguits i el procés de les investigacions realitzades."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Resoldre problemes i reptes generant cooperativament un producte creatiu i innovador a partir de projectes interdisciplinaris, utilitzant diferents formes de raonament, com el pensament de disseny i el pensament computacional",
      "description": "Resoldre problemes i reptes generant cooperativament un producte creatiu i innovador a partir de projectes interdisciplinaris, utilitzant diferents formes de raonament, com el pensament de disseny i el pensament computacional, per respondre a necessitats concretes.",
      "criteris": {
        "1-2": [
          "3.1 Reconèixer necessitats o identificar reptes concrets de l’entorn proper i participar en projectes interdisciplinaris cooperatius, de manera guiada, per a la creació de prototips que els resolguin.",
          "3.2 Aportar idees que puguin donar resposta a un problema o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional, compartint-les a través de descripcions orals, representacions i models i establir cooperativament criteris per avaluar el projecte i la gestió del treball conjunt.",
          "3.3 Construir un producte final senzill que solucioni un repte o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional i provant, en equip, els diferents prototips fent ús de forma segura de les eines i els materials adequats.",
          "3.4 Mostrar, de forma oral o gràfica, el producte final explicant el procés seguit, amb ajuda d’un guió."
        ],
        "3-4": [
          "3.1 Identificar i analitzar necessitats o reptes de l’entorn proper i establir objectius senzills per a la creació de prototips o solucions digitals que els resolguin.",
          "3.2 Proposar possibles solucions que puguin donar resposta a un problema o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional, compartint-les a través de descripcions orals, representacions i models i establir cooperativament criteris per avaluar el projecte i la gestió del treball conjunt.",
          "3.3 Elaborar un producte final senzill que solucioni un repte o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional, i provant, en equip, els diferents prototips o solucions digitals fent ús de forma segura dels dispositius, les eines i els materials adequats.",
          "3.4 Presentar els resultats obtinguts explicant el procés seguit i justificant per què el prototip o solució digital compleix amb els requisits del projecte."
        ],
        "5-6": [
          "3.1 Avaluar les necessitats de l’entorn i establir objectius concrets per a la creació de prototips o solucions digitals que les resolguin.",
          "3.2 Dissenyar possibles solucions a problemes plantejats d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional, mitjançant estratègies bàsiques de gestió de projectes cooperatius, tenint en compte els recursos necessaris, les fases d’execució i establint criteris concrets per avaluar la seva viabilitat.",
          "3.3 Elaborar i desenvolupar un producte final que solucioni un repte o necessitat d’acord amb diferents formes de raonament, com el pensament de disseny o el pensament computacional, i provant, en equip, els diferents prototips o solucions digitals fent ús de forma segura i responsable dels dispositius, eines, tècniques i materials adequats.",
          "3.4 Comunicar els resultats obtinguts i el procés seguit adaptant el missatge i el format a l’audiència, justificant per què el prototip o solució digital compleix amb els requisits del projecte i suggerir possibles reptes per futurs projectes."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Conèixer i prendre consciència del propi cos, de les emocions i sentiments propis i aliens, a partir de l’adquisició d’hàbits fonamentats en coneixements científics",
      "description": "Conèixer i prendre consciència del propi cos, de les emocions i sentiments propis i aliens, a partir de l’adquisició d’hàbits fonamentats en coneixements científics, per aconseguir el benestar físic i emocional i afavorir la convivència.",
      "criteris": {
        "1-2": [
          "4.1 Reconèixer i adoptar hàbits de vida saludable seguint pautes donades sobre higiene, alimentació variada i equilibrada, exercici físic i descans.",
          "4.2 Prendre decisions personals sobre alimentació, higiene i salut a partir de coneixements i criteris científics bàsics, per a la prevenció i guariment de malalties pròpies i usuals.",
          "4.3 Diferenciar accions que afavoreixin el benestar i equilibri emocional i social, reconeixent les emocions pròpies i alienes per generar relacions de respecte."
        ],
        "3-4": [
          "4.1 Adoptar de forma autònoma hàbits de vida saludable valorant la importància de la higiene, l’alimentació variada i equilibrada, l’exercici físic i el descans.",
          "4.2 Prendre decisions personals i col·lectives sobre alimentació, higiene i salut a partir de coneixements i criteris científics, per a la prevenció i guariment de malalties en el context proper.",
          "4.3 Mostrar actituds que fomenten el benestar i equilibri emocional i social, identificar les emocions pròpies i alienes, mostrant empatia i establint relacions afectives i saludables."
        ],
        "5-6": [
          "4.1 Analitzar i fer propostes de millora justificades dels hàbits personals i col·lectius de vida saludables valorant la importància d’una alimentació variada i equilibrada, l’exercici físic, el descans i la higiene.",
          "4.2 Prendre decisions personals i col·lectives sobre alimentació, higiene i salut relacionant diferents coneixements i criteris científics, per a la prevenció i guariment de malalties en l’àmbit global.",
          "4.3 Promoure actituds que fomenten el benestar i equilibri emocional i social, validant les emocions que activen relacions afectives saludables i resoldre amb criteri situacions diverses també relacionades amb l’ús de la tecnologia i la gestió del temps lliure."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Analitzar les característiques de diferents elements o sistemes del medi natural, social i cultural, identificant la seva organització i propietats, establint relacions entre aquests",
      "description": "Analitzar les característiques de diferents elements o sistemes del medi natural, social i cultural, identificant la seva organització i propietats, establint relacions entre aquests, per tal de reconèixer el valor del patrimoni cultural i natural i emprendre accions per a un ús responsable, la seva conservació i la millora.",
      "criteris": {
        "1-2": [
          "5.1 Reconèixer les característiques, propietats i l’organització dels elements del medi natural, social i cultural a través de metodologies d’indagació i utilitzant les eines i processos adequats de manera pautada.",
          "5.2 Reconèixer connexions directes entre diferents elements del medi natural, social i cultural.",
          "5.3 Mostrar actituds de respecte cap al patrimoni natural i cultural reconeixent-lo com un bé comú."
        ],
        "3-4": [
          "5.1 Identificar les característiques, propietats i l’organització dels elements del medi natural, social i cultural a través de metodologies d’indagació i utilitzant les eines i processos adequats.",
          "5.2 Reconèixer connexions entre diferents elements del medi natural social i cultural, comprenent les relacions que s'estableixen i fent prediccions dels possibles efectes.",
          "5.3 Valorar i protegir el patrimoni natural i cultural considerant-lo com un bé comú, adoptant conductes respectuoses per al seu gaudiment i proposant accions per a la seva conservació i millora."
        ],
        "5-6": [
          "5.1 Identificar i analitzar les característiques, propietats i l’organització dels elements del medi natural, social i cultural a través de metodologies d’indagació i utilitzant les eines i processos adequats.",
          "5.2 Establir connexions entre diferents elements del medi natural social i cultural, analitzant les relacions que s’hi estableixen i fer prediccions dels possibles efectes.",
          "5.3 Valorar i proposar accions de conservació, protecció i millora del patrimoni natural i cultural, a través de compromisos i conductes a favor de la sostenibilitat."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Analitzar críticament les causes i conseqüències de la intervenció humana en l’entorn integrant els vessants social, econòmic, cultural, tecnològic i ambiental definits en els objectius de desenvolupament sostenible",
      "description": "Analitzar críticament les causes i conseqüències de la intervenció humana en l’entorn integrant els vessants social, econòmic, cultural, tecnològic i ambiental definits en els objectius de desenvolupament sostenible, per tal de promoure la capacitat d’afrontar els problemes, aportar solucions i actuar de manera individual i col·laborativa en la seva resolució, posant en pràctica hàbits de vida i de consum responsable i sostenible.",
      "criteris": {
        "1-2": [
          "6.1 Identificar la relació de l’ésser humà amb el món que l’envolta en l’ús i aprofitament dels elements i recursos de l’entorn.",
          "6.2 Participar en activitats que permeten avançar cap als objectius de desenvolupament sostenible de manera conscient i contextualitzada.",
          "6.3 Mostrar comportaments i actituds de vida sostenible, conseqüents amb el respecte, la cura i la protecció del planeta."
        ],
        "3-4": [
          "6.1 Identificar i analitzar la intervenció humana en el món, en problemes ecosocials, proposant solucions possibles a escala local.",
          "6.2 Escollir i realitzar accions cooperatives que facilitin afrontar els reptes i desafiaments proposats en els objectius de desenvolupament sostenible de manera crítica i contextualitzada.",
          "6.3 Adquirir hàbits de vida sostenible i conseqüents amb el respecte, la cura i la protecció de les persones i del planeta."
        ],
        "5-6": [
          "6.1 Analitzar la intervenció humana en el món i aportar opinions fonamentades per fer front a problemes ecosocials i involucrar-se en la seva resolució.",
          "6.2 Dissenyar propostes o activitats, cooperativament, per avançar cap a la consecució dels objectius de desenvolupament sostenible de manera crítica i contextualitzada.",
          "6.3 Participar en la construcció de models de convivència sostenibles en el temps basats en la cooperació, la cura i protecció de l’entorn i el respecte a les persones i al planeta."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Observar, detectar, comprendre i interpretar canvis i continuïtats del medi natural, social i cultural, analitzant relacions de causalitat, simultaneïtat i successió",
      "description": "Observar, detectar, comprendre i interpretar canvis i continuïtats del medi natural, social i cultural, analitzant relacions de causalitat, simultaneïtat i successió, per explicar i valorar les relacions entre diferents elements i esdeveniments que permeten entendre el present i imaginar futurs possibles.",
      "criteris": {
        "1-2": [
          "7.1 Detectar i contextualitzar temporalment esdeveniments propis i propers emprant nocions de mesura i successió bàsiques.",
          "7.2 Observar i detectar canvis i continuïtats del medi en l’entorn proper en el pas del temps.",
          "7.3 Mostrar curiositat per la vida quotidiana de les persones al llarg del temps."
        ],
        "3-4": [
          "7.1 Identificar i contextualitzar temporalment, esdeveniments de l’entorn proper per poder interpretar el present com a producte del passat i comprendre la incidència de les decisions actuals en el futur.",
          "7.2 Interpretar canvis i continuïtats del medi establint relacions de causalitat en diferents moments històrics.",
          "7.3 Conèixer els trets de les diferents societats al llarg del temps i el paper que les persones han desenvolupat en la història."
        ],
        "5-6": [
          "7.1 Relacionar i contextualitzar temporalment, esdeveniments rellevants per poder interpretar els canvis en el present com a producte del passat i comprendre la incidència de les decisions actuals en el futur.",
          "7.2 Analitzar els canvis i les continuïtats a partir de les relacions de causalitat, simultaneïtat i successió de diferents moments històrics, culturals, socials i en el medi natural on les societats es desenvolupen.",
          "7.3 Relacionar les diferents èpoques de la història i identificar les accions i fets humans més destacats valorant els canvis que han provocat."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Reconèixer, valorar i defensar la diversitat i la igualtat de gènere reflexionant sobre qüestions ètiques i mostrant empatia i respecte",
      "description": "Reconèixer, valorar i defensar la diversitat i la igualtat de gènere reflexionant sobre qüestions ètiques i mostrant empatia i respecte, per tal de construir una societat diversa i equitativa i contribuir al benestar individual i col·lectiu i a la consecució dels valors dels drets humans.",
      "criteris": {
        "1-2": [
          "8.1 Mostrar actituds que fomenten l’equitat, la igualtat de gènere i les conductes no sexistes reconeixent models positius en l’entorn pròxim.",
          "8.2 Promoure actituds d’equitat, igualtat de gènere i conductes no sexistes, detectant i contrastant diferents models en l’entorn pròxim.",
          "8.3 Reconèixer les manifestacions i la diversitat cultural des d’una perspectiva de gènere."
        ],
        "3-4": [
          "8.1 Promoure actituds d’equitat, igualtat de gènere i conductes no sexistes, analitzant i contrastant diferents models en la nostra societat.",
          "8.2 Contribuir al benestar individual i col·lectiu de la societat, amb accions que fomenten l’equitat, la igualtat de gènere i les conductes no sexistes, reconeixent models positius al llarg de la història.",
          "8.3 Valorar les manifestacions i la diversitat cultural i relacionar-les amb qui les ha creat des d’una perspectiva de gènere."
        ],
        "5-6": [
          "8.1 Posicionar-se críticament a favor actituds d’equitat, igualtat de gènere i conductes no sexistes, analitzant i contrastant diferents models en la nostra societat.",
          "8.2 Actuar per la igualtat efectiva de les persones i desmuntar estereotips i rols en tots els àmbits.",
          "8.3 Valorar les manifestacions culturals i relacionar-les amb qui les ha creat i la seva època, per interpretar les diverses cosmovisions i la seva finalitat."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Participar en la vida social de manera eficaç i constructiva respectant i aprofundint en el desenvolupament dels drets humans i dels infants i de les minories",
      "description": "Participar en la vida social de manera eficaç i constructiva respectant i aprofundint en el desenvolupament dels drets humans i dels infants i de les minories, per tal d’aconseguir una ciutadania activa, responsable i implicada.",
      "criteris": {
        "1-2": [
          "9.1 Participar en l’entorn social i en la comunitat escolar, de manera assertiva i constructiva, amb responsabilitat i utilitzant un llenguatge inclusiu i no violent.",
          "9.2 Respectar les persones, valorant la seva diversitat i riquesa, i apreciant-la com a font d’aprenentatge.",
          "9.3 Conèixer i interioritzar normes bàsiques de circulació, com a vianants i usuaris dels mitjans de locomoció implicats en el desenvolupament sostenible de la mobilitat de les persones."
        ],
        "3-4": [
          "9.1 Participar en la comunitat escolar i la vida social realitzant activitats, assumint responsabilitats i establint acords de forma dialogada i democràtica, emprant un llenguatge inclusiu i no violent.",
          "9.2 Contribuir al benestar individual i col·lectiu de la societat, analitzant la importància demogràfica, cultural i econòmica de les migracions en l'actualitat, valorant la diversitat i mostrant empatia i respecte per les cultures.",
          "9.3 Prendre decisions responsables com a vianants i usuaris dels mitjans de locomoció, de la importància de la mobilitat sostenible de les persones, coneixent les normes i els senyals de trànsit fent-ne un bon ús."
        ],
        "5-6": [
          "9.1 Participar activament en la comunitat escolar, la vida social i l’entorn assumint responsabilitats, establint acords i presentant propostes de millora de la vida al centre, des de l’exercici dels principis democràtics, que emanen dels drets humans i dels infants i de les minories.",
          "9.2 Contribuir al benestar individual i col·lectiu i a l’assoliment dels valors de la integració europea a través del coneixement dels processos geogràfics, històrics i culturals que han conformat la societat actual, valorant la diversitat cultural i mostrant empatia i respecte per les minories.",
          "9.3 Contribuir activament a la mobilitat segura pròpia i de les altres persones durant els desplaçaments i valorant-ne els riscos."
        ]
      }
    },
    {
      "id": "CE10",
      "title": "Valorar el funcionament de les administracions públiques, a partir dels principis i els valors que es desprenen de l’ordenament jurídic que regula la nostra convivència",
      "description": "Valorar el funcionament de les administracions públiques, a partir dels principis i els valors que es desprenen de l’ordenament jurídic que regula la nostra convivència, per protegir els drets civils i polítics i generar interaccions respectuoses i equitatives promovent la resolució pacífica i dialogada dels conflictes.",
      "criteris": {
        "1-2": [
          "10.1 Identificar institucions properes, assenyalant i valorant les funcions desenvolupades que promouen una bona convivència.",
          "10.2 Conèixer els propis drets i deures per promoure la cohesió social i els valors de la cultura de la pau."
        ],
        "3-4": [
          "10.1 Conèixer els òrgans de govern de diferents institucions municipals i valorar els seus mecanismes de funcionament per a la participació ciutadana i democràtica.",
          "10.2 Actuar en defensa dels drets i deures propis i dels altres per promoure la cohesió social i els valors de la cultura de la pau."
        ],
        "5-6": [
          "10.1 Identificar i analitzar el funcionament dels òrgans de govern de les comunitats autònomes, de l’Estat espanyol i de la Unió Europea, valorant les seves accions en la gestió dels serveis públics per a la ciutadania.",
          "10.2 Actuar per protegir els drets i deures propis i dels altres, reconèixer conductes no favorables i reaccionar en conseqüència per promoure la cohesió social i els valors de cultura de la pau."
        ]
      }
    }
  ]
},
  "Aranès i literatura a l'Aran": {
    "competencies": [
      {
        "id": "CE1",
        "title": "Prendre consciència de la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural",
        "description": "Prendre consciència de la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics i culturals i valorar aquesta diversitat com a font de riquesa cultural.",
        "criteris": {
          "1-2": [
            "1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció d’algunes expressions d’ús quotidià.",
            "1.2 Detectar i rebutjar, de manera acompanyada i en contextos senzills i propers, alguns prejudicis i estereotips lingüístics, de gènere i culturals molt freqüents.",
            "1.3 Descriure i valorar la pluralitat lingüística de l’entorn com a font de riquesa cultural, a partir de l’observació i la identificació de la realitat pròxima."
          ],
          "3-4": [
            "1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció i interpretació d’algunes expressions d’ús quotidià.",
            "1.2 Detectar i rebutjar, amb autonomia creixent i en contextos senzills i propers, prejudicis i estereotips lingüístics, de gènere i culturals freqüents.",
            "1.3 Descriure i valorar la pluralitat lingüística del món com a font de riquesa cultural, a partir de l’observació i comprensió de la realitat de l’entorn."
          ],
          "5-6": [
            "1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció i interpretació de les característiques fonamentals de les del seu entorn geogràfic, així com alguns trets dels dialectes i llengües familiars de l’alumnat.",
            "1.2 Detectar i rebutjar, amb autonomia creixent i en contextos diversos, prejudicis i estereotips lingüístics, de gènere i culturals freqüents.",
            "1.3 Descriure, analitzar i valorar la pluralitat lingüística del món com a font de riquesa cultural, a partir de l’observació i comprensió de la realitat global."
          ]
        }
      },
      {
        "id": "CE2",
        "title": "Comprendre i interpretar textos orals i multimodals",
        "description": "Comprendre i interpretar textos orals i multimodals, i identificar el sentit general i la informació més rellevant, valorant, de manera progressivament autònoma, aspectes formals i de contingut bàsics per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.",
        "criteris": {
          "1-2": [
            "2.1 Extreure informació rellevant de produccions orals i multimodals relacionats amb situacions d’aprenentatge i la vida quotidiana de l’aula.",
            "2.2 Reconèixer, de forma acompanyada, el tema, idees principals i missatges explícits de textos orals i multimodals. Iniciar-se, també de forma acompanyada, en la valoració del contingut i de la forma (elements no verbals)."
          ],
          "3-4": [
            "2.1 Comprendre i extreure informació rellevant de produccions orals i multimodals relacionades amb situacions d’aprenentatge i la vida quotidiana de l’aula.",
            "2.2 Reconèixer en produccions orals i multimodals idees principals i secundàries, els missatges explícits i els implícits més senzills. Progressar, de manera acompanyada, en la valoració crítica del contingut i de la forma (elements no verbals)."
          ],
          "5-6": [
            "2.1 Extreure i interpretar informació rellevant de produccions orals i multimodals formals provinents de diferents mitjans i situacions.",
            "2.2 Reconèixer en produccions orals i multimodals formals les idees principals i les secundàries, els missatges explícits i implícits, valorar-ne el contingut i la forma (elements no verbals)."
          ]
        }
      },
      {
        "id": "CE3",
        "title": "Produir textos orals i multimodals amb coherència",
        "description": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments, emocions i conceptes, construir coneixement i establir vincles personals.",
        "criteris": {
          "1-2": [
            "3.1 Produir textos orals i multimodals coherents a partir d’una situació comunicativa propera (vivències, fets i aprenentatges), amb planificació acompanyada, adaptant el to de veu i el gest a la situació, i utilitzant recursos no verbals elementals i elements de suport.",
            "3.2 Participar en interaccions orals espontànies i en les situacions comunicatives habituals del context escolar respectant les normes d’interacció oral, mostrant interès i respecte quan parlen els altres i iniciant-se en l’ús d’estratègies d’escolta activa."
          ],
          "3-4": [
            "3.1 Produir textos orals i multimodals coherents a partir d’una situació comunicativa coneguda, amb planificació acompanyada, ajustant el discurs i adaptant el to de veu i el gest a la situació, i usant recursos no verbals i elements de suport.",
            "3.2 Participar en interaccions orals espontànies i reglades, aportant idees i respectant les dels altres, així com les normes bàsiques de la cortesia lingüística i aplicant estratègies d’escolta activa."
          ],
          "5-6": [
            "3.1 Produir textos orals i multimodals de manera autònoma, coherent i fluida, amb preparació prèvia, en contextos formals senzills amb adequació de l’entonació, el to de veu i el gest a la situació i un ús correcte de recursos verbals i no verbals amb suports audiovisuals.",
            "3.2 Participar en interaccions orals espontànies i reglades, i respectar les normes de la cortesia lingüística, integrant en el propi discurs les opinions i punts de vista dels altres participants, i utilitzant el registre adequat i aplicant estratègies d’escolta activa i de gestió conversacional."
          ]
        }
      },
      {
        "id": "CE4",
        "title": "Comprendre i interpretar textos escrits i multimodals",
        "description": "Comprendre i interpretar textos escrits i multimodals, reconeixent el sentit global, les idees principals i la informació implícita i explícita, i realitzant, de manera progressivament autònoma, reflexions elementals sobre aspectes formals i de contingut, per construir coneixement, i respondre a necessitats i interessos comunicatius diversos.",
        "criteris": {
          "1-2": [
            "4.1 Llegir textos propers, de la vida quotidiana, dels mitjans de comunicació i textos escolars, de forma silenciosa i en veu alta, amb fluïdesa suficient (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).",
            "4.2 Comprendre textos escrits i multimodals propers, adequats al desenvolupament cognitiu, amb l’ajuda d’elements gràfics i paratextuals bàsics, a través de la identificació del sentit global i informació rellevant i emprant, de forma guiada, estratègies bàsiques de comprensió. .",
            "4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals senzills."
          ],
          "3-4": [
            "4.1 Llegir textos progressivament complexos relacionats amb la vida quotidiana, els mitjans de comunicació i textos escolars, de fets i esdeveniments d’interès general, de manera silenciosa i en veu alta, amb fluïdesa (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).",
            "4.2 Comprendre textos escrits i multimodals progressivament complexos, a través de la identificació del sentit global i la informació rellevant, amb l’ajuda d’elements gràfics, textuals i paratextuals, i distingir idees principals i secundàries i també estratègies bàsiques de comprensió de forma progressivament autònoma.",
            "4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals, iniciant-se en l’avaluació de la seva fiabilitat."
          ],
          "5-6": [
            "4.1 Llegir tot tipus de textos de manera silenciosa i en veu alta amb bona fluïdesa (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).",
            "4.2 Comprendre textos escrits i multimodals progressivament complexos, a través de la identificació del sentit global i la informació rellevant, amb l’ajuda d’elements gràfics, textuals i paratextuals, utilitzant l’estructura i el format de cada gènere textual, i també estratègies bàsiques de comprensió, més enllà de la interpretació literal.",
            "4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals, avaluant la seva qualitat, la fiabilitat i la seva idoneïtat en funció del propòsit de lectura."
          ]
        }
      },
      {
        "id": "CE5",
        "title": "Produir textos escrits i multimodals",
        "description": "Produir textos escrits i multimodals, amb adequació, coherència i cohesió, i aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.",
        "criteris": {
          "1-2": [
            "5.1 Redactar textos escrits i multimodals propers i viscuts, des de les diferents etapes del procés evolutiu de l’escriptura, de manera acompanyada, per a un destinatari i amb una intenció concreta, amb adequació, coherència, cohesió i correcció adaptades al moment evolutiu (ortografia natural o de base).",
            "5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos amb acompanyament, de manera individual o grupal"
          ],
          "3-4": [
            "5.1 Redactar textos escrits i multimodals, propers, viscuts i escolars, de manera progressivament autònoma, a través de la selecció del model discursiu que millor respongui a la situació comunicativa, amb adequació, coherència i cohesió, iniciant-se en l’ús de les normes gramaticals i ortogràfiques més senzilles.",
            "5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos de manera progressivament autònoma, amb ús de bastides, si escau, de manera individual o grupal."
          ],
          "5-6": [
            "5.1 Redactar textos escrits i multimodals, de tipus divers, amb suports puntuals, a través de la selecció del model discursiu que millor respongui a cada situació comunicativa, progressant en l’ús de les normes gramaticals i ortogràfiques bàsiques, amb adequació, coherència, cohesió i correcció lingüística.",
            "5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos, de forma autònoma, amb ús de bastides, si escau, de manera individual o grupal."
          ]
        }
      },
      {
        "id": "CE6",
        "title": "Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera 6. progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació, i de adoptant un punt de vista personal i respectuós amb la propietat intel·lectual,",
        "description": "Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera 6. progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació, i de adoptant un punt de vista personal i respectuós amb la propietat intel·lectual, per transformar aquesta informació en en coneixement i comunicar-la de manera creativa. desinformació, comunicar-la, propietat",
        "criteris": {
          "1-2": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes propers i d’interès personal, de forma guiada, a la xarxa i a les biblioteques.",
            "6.2 Comunicar els resultats d’un procés d’investigació, individual o grupal, realitzat de forma acompanyada, sobre temes propers i d’interès personal. .",
            "6.3 Adoptar hàbits d’ús segur i saludable de les tecnologies digitals de forma guiada en relació amb l’accés a la informació i a la comunicació en l’entorn immediat."
          ],
          "3-4": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques.",
            "6.2 Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d’un procés d’investigació, individual o grupal, realitzat de forma acompanyada, sobre temes d’interès personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
            "6.3 Adoptar hàbits d’ús segur, sostenible i saludable de les tecnologies digitals, amb acompanyament, en relació amb l’accés, la fiabilitat i verificació de les fonts d’informació i la comunicació al seu entorn immediat i a la xarxa."
          ],
          "5-6": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant-ne críticament el resultat.",
            "6.2. Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d’un procés d’investigació senzill, individual o grupal, sobre temes d’interès personal, ecològic i social que incloguin els objectius de desenvolupament sostenible.",
            "6.3 Adoptar hàbits d’ús crític, segur, sostenible i saludable de les tecnologies digitals, de forma progressivament autònoma, en relació amb la fiabilitat i la verificació de les fonts, la credibilitat de la informació i la comunicació a l’entorn immediat i a la xarxa."
          ]
        }
      },
      {
        "id": "CE7",
        "title": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement",
        "description": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres, i compartir experiències de lectura, per construir la pròpia identitat lectora i gaudir de la dimensió social de la lectura.",
        "criteris": {
          "1-2": [
            "7.1 Llegir de manera autònoma textos de diferents autors i autores que s’adeqüin als seus gustos i interessos, seleccionats de manera acompanyada, des de les diferents etapes del procés evolutiu de la lectura.",
            "7.2 Compartir lectures, per mitjà de recomanacions, presentacions i a partir d’interaccions orals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos i iniciar-se en una comunitat lectora."
          ],
          "3-4": [
            "7.2 Llegir de manera autònoma o acompanyada textos de diversos autors i autores que s’adeqüin als seus gustos i interessos i seleccionats amb autonomia creixent, avançant en la construcció de la seva identitat lectora.",
            "7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma argumentada i sentir-se membre d’una comunitat lectora."
          ],
          "5-6": [
            "7.1 Llegir de manera autònoma textos de diversos autors i autores que s’adeqüin als seus gustos i interessos, seleccionats amb criteri propi, progressant en la construcció de la seva identitat lectora.",
            "7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, per mitjans analògics i digitals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma crítica i sentir-se membre d’una comunitat lectora."
          ]
        }
      },
      {
        "id": "CE8",
        "title": "Llegir, interpretar i analitzar, de manera progressivament autònoma, obres o fragments literaris adequats, establint relacions entre ells i identificant el gènere literari i les seves convencions fonamentals,",
        "description": "Llegir, interpretar i analitzar, de manera progressivament autònoma, obres o fragments literaris adequats, establint relacions entre ells i identificant el gènere literari i les seves convencions fonamentals, per reconèixer la literatura com a manifestació artística i font de plaer, coneixement i inspiració per a la creació de textos d’intenció literària.",
        "criteris": {
          "1-2": [
            "8.1 Escoltar i llegir textos orals i escrits de la literatura infantil, d’autors i autores reconeguts, descobrint de manera acompanyada els elements essencials de l’obra i establint relacions elementals entre els textos i amb altres manifestacions artístiques i culturals.",
            "8.2 Produir textos individuals o col·lectius amb intenció literària, segons les diferents etapes del procés evolutiu de l’escriptura, de manera acompanyada, en diferents suports, i complementant-los amb altres llenguatges artístics."
          ],
          "3-4": [
            "8.1 Escoltar i llegir textos orals i escrits de la literatura infantil, d’autors i autores reconeguts, relacionant-los en funció de temes i aspectes elementals del gènere literari, i interpretant-los i relacionant-los amb altres manifestacions artístiques i culturals de manera acompanyada.",
            "8.2 Produir textos individuals o col·lectius amb intenció literària, de manera acompanyada, emprant algun recurs literari i recreant de manera personal els models donats, en diferents suports, i complementant-los amb altres llenguatges artístics."
          ],
          "5-6": [
            "8.1 Escoltar i llegir de manera acompanyada textos literaris adequats a la seva edat, d’autors i autores reconeguts, relacionant-los en funció dels temes i aspectes elementals del gènere literari, i interpretant-los, valorant-los i relacionant-los amb altres manifestacions artístiques i culturals de manera progressivament autònoma.",
            "8.2 Produir, de manera progressivament autònoma, textos individuals o col·lectius amb intenció literària, emprant diversitat de recursos literaris de manera original, en diferents suports, i complementant-los amb altres llenguatges artístics."
          ]
        }
      },
      {
        "id": "CE9",
        "title": "Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals",
        "description": "Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals, a partir de processos de comprensió i producció de textos orals, escrits, utilitzant la terminologia elemental adequada, per iniciar-se en el desenvolupament de la consciència lingüística i millorar les destreses en la posada en pràctica d'aquests processos.",
        "criteris": {
          "1-2": [
            "9.1 Formular conclusions elementals sobre la construcció de paraules, frases i textos utilitzant l’ordre adequat i la concordança dels mots en una frase a partir de l’experimentació amb les paraules.",
            "9.2 Revisar i millorar les diferents produccions, escrites, orals i multimodals, de manera acompanyada i usant la terminologia lingüística bàsica adequada."
          ],
          "3-4": [
            "9.1 Formular conclusions elementals sobre el funcionament de la llengua fent especial atenció a la concordança, a partir de l’experimentació amb les paraules, els enunciats i els textos, en un procés acompanyat de producció i comprensió de textos en contextos significatius.",
            "9.2 Revisar i millorar els textos propis i aliens i esmenar alguns problemes de comprensió i producció, de manera acompanyada, a partir de la reflexió metalingüística i usant la terminologia bàsica adequada."
          ],
          "5-6": [
            "9.1 Formular generalitzacions sobre aspectes bàsics del funcionament de la llengua de manera acompanyada, formulant hipòtesis i buscant exemples similars i contraris, a partir de l’experimentació amb les paraules, els enunciats i els textos, en un procés acompanyat de producció o comprensió de textos en contextos significatius.",
            "9.2 Revisar i millorar els textos propis i aliens i esmenar alguns problemes de comprensió i producció, de manera progressivament autònoma, a partir de la reflexió metalingüística i usant la terminologia bàsica adequada."
          ]
        }
      },
      {
        "id": "CE10",
        "title": "Utilitzar un llenguatge no discriminatori i desterrar els abusos de poder a través de la paraula",
        "description": "Utilitzar un llenguatge no discriminatori i desterrar els abusos de poder a través de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge, i posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives.",
        "criteris": {
          "1-2": [
            "10.1 Rebutjar els usos lingüístics discriminatoris identificats a partir de la reflexió grupal acompanyada sobre els aspectes elementals, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies elementals per a l’escolta activa i el consens, iniciant-se en la gestió dialogada de conflictes."
          ],
          "3-4": [
            "10.1 Rebutjar els usos lingüístics discriminatoris i identificar els abusos de poder a través de la paraula mitjançant la reflexió grupal acompanyada sobre els aspectes bàsics, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la comunicació assertiva i el consens, progressant en la gestió dialogada de conflictes."
          ],
          "5-6": [
            "10.1 Rebutjar els usos lingüístics discriminatoris i els abusos de poder a través de la paraula identificats mitjançant la reflexió grupal acompanyada sobre diferents aspectes, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la deliberació argumentada i la gestió dialogada de conflictes, proposant solucions creatives."
          ]
        }
      }
    ]
  },
  "Llengua Castellana i Literatura": {
    "competencies": [
      {
        "id": "CE1",
        "title": "Prendre consciència de la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural",
        "description": "Prendre consciència de la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics i culturals i valorar aquesta diversitat com a font de riquesa cultural.",
        "criteris": {
          "1-2": [
            "1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció d’algunes expressions d’ús quotidià.",
            "1.2 Detectar i rebutjar, de manera acompanyada i en contextos senzills i propers, alguns prejudicis i estereotips lingüístics, de gènere i culturals molt freqüents.",
            "1.3 Descriure i valorar la pluralitat lingüística de l’entorn com a font de riquesa cultural, a partir de l’observació i la identificació de la realitat pròxima."
          ],
          "3-4": [
            "1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció i interpretació d’algunes expressions d’ús quotidià.",
            "1.2 Detectar i rebutjar, amb autonomia creixent i en contextos senzills i propers, prejudicis i estereotips lingüístics, de gènere i culturals freqüents.",
            "1.3 Descriure i valorar la pluralitat lingüística del món com a font de riquesa cultural, a partir de l’observació i comprensió de la realitat de l’entorn."
          ],
          "5-6": [
            "1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció i interpretació de les característiques fonamentals de les del seu entorn geogràfic, així com alguns trets dels dialectes i llengües familiars de l’alumnat.",
            "1.2 Detectar i rebutjar, amb autonomia creixent i en contextos diversos, prejudicis i estereotips lingüístics, de gènere i culturals freqüents.",
            "1.3 Descriure, analitzar i valorar la pluralitat lingüística del món com a font de riquesa cultural, a partir de l’observació i comprensió de la realitat global."
          ]
        }
      },
      {
        "id": "CE2",
        "title": "Comprendre i interpretar textos orals i multimodals",
        "description": "Comprendre i interpretar textos orals i multimodals, i identificar el sentit general i la informació més rellevant, valorant, de manera progressivament autònoma, aspectes formals i de contingut bàsics per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.",
        "criteris": {
          "1-2": [
            "2.1 Extreure informació rellevant de produccions orals i multimodals relacionats amb situacions d’aprenentatge i la vida quotidiana de l’aula.",
            "2.2 Reconèixer, de forma acompanyada, el tema, idees principals i missatges explícits de textos orals i multimodals. Iniciar-se, també de forma acompanyada, en la valoració del contingut i de la forma (elements no verbals)."
          ],
          "3-4": [
            "2.1 Comprendre i extreure informació rellevant de produccions orals i multimodals relacionades amb situacions d’aprenentatge i la vida quotidiana de l’aula.",
            "2.2 Reconèixer en produccions orals i multimodals idees principals i secundàries, els missatges explícits i els implícits més senzills. Progressar, de manera acompanyada, en la valoració crítica del contingut i de la forma (elements no verbals)."
          ],
          "5-6": [
            "2.1 Extreure i interpretar informació rellevant de produccions orals i multimodals formals provinents de diferents mitjans i situacions.",
            "2.2 Reconèixer en produccions orals i multimodals formals les idees principals i les secundàries, els missatges explícits i implícits, valorar-ne el contingut i la forma (elements no verbals)."
          ]
        }
      },
      {
        "id": "CE3",
        "title": "Produir textos orals i multimodals amb coherència",
        "description": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments, emocions i conceptes, construir coneixement i establir vincles personals.",
        "criteris": {
          "1-2": [
            "3.1 Produir textos orals i multimodals coherents a partir d’una situació comunicativa propera (vivències, fets i aprenentatges), amb planificació acompanyada, adaptant el to de veu i el gest a la situació, i utilitzant recursos no verbals elementals i elements de suport.",
            "3.2 Participar en interaccions orals espontànies i en les situacions comunicatives habituals del context escolar respectant les normes d’interacció oral, mostrant interès i respecte quan parlen els altres i iniciant-se en l’ús d’estratègies d’escolta activa."
          ],
          "3-4": [
            "3.1 Produir textos orals i multimodals coherents a partir d’una situació comunicativa coneguda, amb planificació acompanyada, ajustant el discurs i adaptant el to de veu i el gest a la situació, i usant recursos no verbals i elements de suport.",
            "3.2 Participar en interaccions orals espontànies i reglades, aportant idees i respectant les dels altres, així com les normes bàsiques de la cortesia lingüística i aplicant estratègies d’escolta activa."
          ],
          "5-6": [
            "3.1 Produir textos orals i multimodals de manera autònoma, coherent i fluida, amb preparació prèvia, en contextos formals senzills amb adequació de l’entonació, el to de veu i el gest a la situació i un ús correcte de recursos verbals i no verbals amb suports audiovisuals.",
            "3.2 Participar en interaccions orals espontànies i reglades, i respectar les normes de la cortesia lingüística, integrant en el propi discurs les opinions i punts de vista dels altres participants, i utilitzant el registre adequat i aplicant estratègies d’escolta activa i de gestió conversacional."
          ]
        }
      },
      {
        "id": "CE4",
        "title": "Comprendre i interpretar textos escrits i multimodals",
        "description": "Comprendre i interpretar textos escrits i multimodals, reconeixent el sentit global, les idees principals i la informació implícita i explícita, i realitzant, de manera progressivament autònoma, reflexions elementals sobre aspectes formals i de contingut, per construir coneixement, i respondre a necessitats i interessos comunicatius diversos.",
        "criteris": {
          "1-2": [
            "4.1 Llegir textos propers, de la vida quotidiana, dels mitjans de comunicació i textos escolars, de forma silenciosa i en veu alta, amb fluïdesa suficient (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).",
            "4.2 Comprendre textos escrits i multimodals propers, adequats al desenvolupament cognitiu, amb l’ajuda d’elements gràfics i paratextuals bàsics, a través de la identificació del sentit global i informació rellevant i emprant, de forma guiada, estratègies bàsiques de comprensió. .",
            "4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals senzills."
          ],
          "3-4": [
            "4.1 Llegir textos progressivament complexos relacionats amb la vida quotidiana, els mitjans de comunicació i textos escolars, de fets i esdeveniments d’interès general, de manera silenciosa i en veu alta, amb fluïdesa (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).",
            "4.2 Comprendre textos escrits i multimodals progressivament complexos, a través de la identificació del sentit global i la informació rellevant, amb l’ajuda d’elements gràfics, textuals i paratextuals, i distingir idees principals i secundàries i també estratègies bàsiques de comprensió de forma progressivament autònoma.",
            "4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals, iniciant-se en l’avaluació de la seva fiabilitat."
          ],
          "5-6": [
            "4.1 Llegir tot tipus de textos de manera silenciosa i en veu alta amb bona fluïdesa (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).",
            "4.2 Comprendre textos escrits i multimodals progressivament complexos, a través de la identificació del sentit global i la informació rellevant, amb l’ajuda d’elements gràfics, textuals i paratextuals, utilitzant l’estructura i el format de cada gènere textual, i també estratègies bàsiques de comprensió, més enllà de la interpretació literal.",
            "4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals, avaluant la seva qualitat, la fiabilitat i la seva idoneïtat en funció del propòsit de lectura."
          ]
        }
      },
      {
        "id": "CE5",
        "title": "Produir textos escrits i multimodals",
        "description": "Produir textos escrits i multimodals, amb adequació, coherència i cohesió, i aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.",
        "criteris": {
          "1-2": [
            "5.1 Redactar textos escrits i multimodals propers i viscuts, des de les diferents etapes del procés evolutiu de l’escriptura, de manera acompanyada, per a un destinatari i amb una intenció concreta, amb adequació, coherència, cohesió i correcció adaptades al moment evolutiu (ortografia natural o de base).",
            "5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos amb acompanyament, de manera individual o grupal"
          ],
          "3-4": [
            "5.1 Redactar textos escrits i multimodals, propers, viscuts i escolars, de manera progressivament autònoma, a través de la selecció del model discursiu que millor respongui a la situació comunicativa, amb adequació, coherència i cohesió, iniciant-se en l’ús de les normes gramaticals i ortogràfiques més senzilles.",
            "5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos de manera progressivament autònoma, amb ús de bastides, si escau, de manera individual o grupal."
          ],
          "5-6": [
            "5.1 Redactar textos escrits i multimodals, de tipus divers, amb suports puntuals, a través de la selecció del model discursiu que millor respongui a cada situació comunicativa, progressant en l’ús de les normes gramaticals i ortogràfiques bàsiques, amb adequació, coherència, cohesió i correcció lingüística.",
            "5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos, de forma autònoma, amb ús de bastides, si escau, de manera individual o grupal."
          ]
        }
      },
      {
        "id": "CE6",
        "title": "Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera 6. progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació, i de adoptant un punt de vista personal i respectuós amb la propietat intel·lectual,",
        "description": "Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera 6. progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació, i de adoptant un punt de vista personal i respectuós amb la propietat intel·lectual, per transformar aquesta informació en en coneixement i comunicar-la de manera creativa. desinformació, comunicar-la, propietat",
        "criteris": {
          "1-2": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes propers i d’interès personal, de forma guiada, a la xarxa i a les biblioteques.",
            "6.2 Comunicar els resultats d’un procés d’investigació, individual o grupal, realitzat de forma acompanyada, sobre temes propers i d’interès personal. .",
            "6.3 Adoptar hàbits d’ús segur i saludable de les tecnologies digitals de forma guiada en relació amb l’accés a la informació i a la comunicació en l’entorn immediat."
          ],
          "3-4": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques.",
            "6.2 Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d’un procés d’investigació, individual o grupal, realitzat de forma acompanyada, sobre temes d’interès personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
            "6.3 Adoptar hàbits d’ús segur, sostenible i saludable de les tecnologies digitals, amb acompanyament, en relació amb l’accés, la fiabilitat i verificació de les fonts d’informació i la comunicació al seu entorn immediat i a la xarxa."
          ],
          "5-6": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant-ne críticament el resultat.",
            "6.2. Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d’un procés d’investigació senzill, individual o grupal, sobre temes d’interès personal, ecològic i social que incloguin els objectius de desenvolupament sostenible.",
            "6.3 Adoptar hàbits d’ús crític, segur, sostenible i saludable de les tecnologies digitals, de forma progressivament autònoma, en relació amb la fiabilitat i la verificació de les fonts, la credibilitat de la informació i la comunicació a l’entorn immediat i a la xarxa."
          ]
        }
      },
      {
        "id": "CE7",
        "title": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement",
        "description": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres, i compartir experiències de lectura, per construir la pròpia identitat lectora i gaudir de la dimensió social de la lectura.",
        "criteris": {
          "1-2": [
            "7.1 Llegir de manera autònoma textos de diferents autors i autores que s’adeqüin als seus gustos i interessos, seleccionats de manera acompanyada, des de les diferents etapes del procés evolutiu de la lectura.",
            "7.2 Compartir lectures, per mitjà de recomanacions, presentacions i a partir d’interaccions orals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos i iniciar-se en una comunitat lectora."
          ],
          "3-4": [
            "7.2 Llegir de manera autònoma o acompanyada textos de diversos autors i autores que s’adeqüin als seus gustos i interessos i seleccionats amb autonomia creixent, avançant en la construcció de la seva identitat lectora.",
            "7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma argumentada i sentir-se membre d’una comunitat lectora."
          ],
          "5-6": [
            "7.1 Llegir de manera autònoma textos de diversos autors i autores que s’adeqüin als seus gustos i interessos, seleccionats amb criteri propi, progressant en la construcció de la seva identitat lectora.",
            "7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, per mitjans analògics i digitals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma crítica i sentir-se membre d’una comunitat lectora."
          ]
        }
      },
      {
        "id": "CE8",
        "title": "Llegir, interpretar i analitzar, de manera progressivament autònoma, obres o fragments literaris adequats, establint relacions entre ells i identificant el gènere literari i les seves convencions fonamentals,",
        "description": "Llegir, interpretar i analitzar, de manera progressivament autònoma, obres o fragments literaris adequats, establint relacions entre ells i identificant el gènere literari i les seves convencions fonamentals, per reconèixer la literatura com a manifestació artística i font de plaer, coneixement i inspiració per a la creació de textos d’intenció literària.",
        "criteris": {
          "1-2": [
            "8.1 Escoltar i llegir textos orals i escrits de la literatura infantil, d’autors i autores reconeguts, descobrint de manera acompanyada els elements essencials de l’obra i establint relacions elementals entre els textos i amb altres manifestacions artístiques i culturals.",
            "8.2 Produir textos individuals o col·lectius amb intenció literària, segons les diferents etapes del procés evolutiu de l’escriptura, de manera acompanyada, en diferents suports, i complementant-los amb altres llenguatges artístics."
          ],
          "3-4": [
            "8.1 Escoltar i llegir textos orals i escrits de la literatura infantil, d’autors i autores reconeguts, relacionant-los en funció de temes i aspectes elementals del gènere literari, i interpretant-los i relacionant-los amb altres manifestacions artístiques i culturals de manera acompanyada.",
            "8.2 Produir textos individuals o col·lectius amb intenció literària, de manera acompanyada, emprant algun recurs literari i recreant de manera personal els models donats, en diferents suports, i complementant-los amb altres llenguatges artístics."
          ],
          "5-6": [
            "8.1 Escoltar i llegir de manera acompanyada textos literaris adequats a la seva edat, d’autors i autores reconeguts, relacionant-los en funció dels temes i aspectes elementals del gènere literari, i interpretant-los, valorant-los i relacionant-los amb altres manifestacions artístiques i culturals de manera progressivament autònoma.",
            "8.2 Produir, de manera progressivament autònoma, textos individuals o col·lectius amb intenció literària, emprant diversitat de recursos literaris de manera original, en diferents suports, i complementant-los amb altres llenguatges artístics."
          ]
        }
      },
      {
        "id": "CE9",
        "title": "Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals",
        "description": "Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals, a partir de processos de comprensió i producció de textos orals, escrits, utilitzant la terminologia elemental adequada, per iniciar-se en el desenvolupament de la consciència lingüística i millorar les destreses en la posada en pràctica d'aquests processos.",
        "criteris": {
          "1-2": [
            "9.1 Formular conclusions elementals sobre la construcció de paraules, frases i textos utilitzant l’ordre adequat i la concordança dels mots en una frase a partir de l’experimentació amb les paraules.",
            "9.2 Revisar i millorar les diferents produccions, escrites, orals i multimodals, de manera acompanyada i usant la terminologia lingüística bàsica adequada."
          ],
          "3-4": [
            "9.1 Formular conclusions elementals sobre el funcionament de la llengua fent especial atenció a la concordança, a partir de l’experimentació amb les paraules, els enunciats i els textos, en un procés acompanyat de producció i comprensió de textos en contextos significatius.",
            "9.2 Revisar i millorar els textos propis i aliens i esmenar alguns problemes de comprensió i producció, de manera acompanyada, a partir de la reflexió metalingüística i usant la terminologia bàsica adequada."
          ],
          "5-6": [
            "9.1 Formular generalitzacions sobre aspectes bàsics del funcionament de la llengua de manera acompanyada, formulant hipòtesis i buscant exemples similars i contraris, a partir de l’experimentació amb les paraules, els enunciats i els textos, en un procés acompanyat de producció o comprensió de textos en contextos significatius.",
            "9.2 Revisar i millorar els textos propis i aliens i esmenar alguns problemes de comprensió i producció, de manera progressivament autònoma, a partir de la reflexió metalingüística i usant la terminologia bàsica adequada."
          ]
        }
      },
      {
        "id": "CE10",
        "title": "Utilitzar un llenguatge no discriminatori i desterrar els abusos de poder a través de la paraula",
        "description": "Utilitzar un llenguatge no discriminatori i desterrar els abusos de poder a través de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge, i posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives.",
        "criteris": {
          "1-2": [
            "10.1 Rebutjar els usos lingüístics discriminatoris identificats a partir de la reflexió grupal acompanyada sobre els aspectes elementals, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies elementals per a l’escolta activa i el consens, iniciant-se en la gestió dialogada de conflictes."
          ],
          "3-4": [
            "10.1 Rebutjar els usos lingüístics discriminatoris i identificar els abusos de poder a través de la paraula mitjançant la reflexió grupal acompanyada sobre els aspectes bàsics, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la comunicació assertiva i el consens, progressant en la gestió dialogada de conflictes."
          ],
          "5-6": [
            "10.1 Rebutjar els usos lingüístics discriminatoris i els abusos de poder a través de la paraula identificats mitjançant la reflexió grupal acompanyada sobre diferents aspectes, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la deliberació argumentada i la gestió dialogada de conflictes, proposant solucions creatives."
          ]
        }
      }
    ]
  },
  "Llengua Catalana i Literatura": {
    "competencies": [
      {
        "id": "CE1",
        "title": "Prendre consciència de la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural",
        "description": "Prendre consciència de la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics i culturals i valorar aquesta diversitat com a font de riquesa cultural.",
        "criteris": {
          "1-2": [
            "1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció d’algunes expressions d’ús quotidià.",
            "1.2 Detectar i rebutjar, de manera acompanyada i en contextos senzills i propers, alguns prejudicis i estereotips lingüístics, de gènere i culturals molt freqüents.",
            "1.3 Descriure i valorar la pluralitat lingüística de l’entorn com a font de riquesa cultural, a partir de l’observació i la identificació de la realitat pròxima."
          ],
          "3-4": [
            "1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció i interpretació d’algunes expressions d’ús quotidià.",
            "1.2 Detectar i rebutjar, amb autonomia creixent i en contextos senzills i propers, prejudicis i estereotips lingüístics, de gènere i culturals freqüents.",
            "1.3 Descriure i valorar la pluralitat lingüística del món com a font de riquesa cultural, a partir de l’observació i comprensió de la realitat de l’entorn."
          ],
          "5-6": [
            "1.1 Identificar les diferents llengües de l’entorn, inclosa la llengua de signes, i les seves variants dialectals, a través de la descripció i interpretació de les característiques fonamentals de les del seu entorn geogràfic, així com alguns trets dels dialectes i llengües familiars de l’alumnat.",
            "1.2 Detectar i rebutjar, amb autonomia creixent i en contextos diversos, prejudicis i estereotips lingüístics, de gènere i culturals freqüents.",
            "1.3 Descriure, analitzar i valorar la pluralitat lingüística del món com a font de riquesa cultural, a partir de l’observació i comprensió de la realitat global."
          ]
        }
      },
      {
        "id": "CE2",
        "title": "Comprendre i interpretar textos orals i multimodals",
        "description": "Comprendre i interpretar textos orals i multimodals, i identificar el sentit general i la informació més rellevant, valorant, de manera progressivament autònoma, aspectes formals i de contingut bàsics per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.",
        "criteris": {
          "1-2": [
            "2.1 Extreure informació rellevant de produccions orals i multimodals relacionats amb situacions d’aprenentatge i la vida quotidiana de l’aula.",
            "2.2 Reconèixer, de forma acompanyada, el tema, idees principals i missatges explícits de textos orals i multimodals. Iniciar-se, també de forma acompanyada, en la valoració del contingut i de la forma (elements no verbals)."
          ],
          "3-4": [
            "2.1 Comprendre i extreure informació rellevant de produccions orals i multimodals relacionades amb situacions d’aprenentatge i la vida quotidiana de l’aula.",
            "2.2 Reconèixer en produccions orals i multimodals idees principals i secundàries, els missatges explícits i els implícits més senzills. Progressar, de manera acompanyada, en la valoració crítica del contingut i de la forma (elements no verbals)."
          ],
          "5-6": [
            "2.1 Extreure i interpretar informació rellevant de produccions orals i multimodals formals provinents de diferents mitjans i situacions.",
            "2.2 Reconèixer en produccions orals i multimodals formals les idees principals i les secundàries, els missatges explícits i implícits, valorar-ne el contingut i la forma (elements no verbals)."
          ]
        }
      },
      {
        "id": "CE3",
        "title": "Produir textos orals i multimodals amb coherència",
        "description": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments, emocions i conceptes, construir coneixement i establir vincles personals.",
        "criteris": {
          "1-2": [
            "3.1 Produir textos orals i multimodals coherents a partir d’una situació comunicativa propera (vivències, fets i aprenentatges), amb planificació acompanyada, adaptant el to de veu i el gest a la situació, i utilitzant recursos no verbals elementals i elements de suport.",
            "3.2 Participar en interaccions orals espontànies i en les situacions comunicatives habituals del context escolar respectant les normes d’interacció oral, mostrant interès i respecte quan parlen els altres i iniciant-se en l’ús d’estratègies d’escolta activa."
          ],
          "3-4": [
            "3.1 Produir textos orals i multimodals coherents a partir d’una situació comunicativa coneguda, amb planificació acompanyada, ajustant el discurs i adaptant el to de veu i el gest a la situació, i usant recursos no verbals i elements de suport.",
            "3.2 Participar en interaccions orals espontànies i reglades, aportant idees i respectant les dels altres, així com les normes bàsiques de la cortesia lingüística i aplicant estratègies d’escolta activa."
          ],
          "5-6": [
            "3.1 Produir textos orals i multimodals de manera autònoma, coherent i fluida, amb preparació prèvia, en contextos formals senzills amb adequació de l’entonació, el to de veu i el gest a la situació i un ús correcte de recursos verbals i no verbals amb suports audiovisuals.",
            "3.2 Participar en interaccions orals espontànies i reglades, i respectar les normes de la cortesia lingüística, integrant en el propi discurs les opinions i punts de vista dels altres participants, i utilitzant el registre adequat i aplicant estratègies d’escolta activa i de gestió conversacional."
          ]
        }
      },
      {
        "id": "CE4",
        "title": "Comprendre i interpretar textos escrits i multimodals",
        "description": "Comprendre i interpretar textos escrits i multimodals, reconeixent el sentit global, les idees principals i la informació implícita i explícita, i realitzant, de manera progressivament autònoma, reflexions elementals sobre aspectes formals i de contingut, per construir coneixement, i respondre a necessitats i interessos comunicatius diversos.",
        "criteris": {
          "1-2": [
            "4.1 Llegir textos propers, de la vida quotidiana, dels mitjans de comunicació i textos escolars, de forma silenciosa i en veu alta, amb fluïdesa suficient (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).",
            "4.2 Comprendre textos escrits i multimodals propers, adequats al desenvolupament cognitiu, amb l’ajuda d’elements gràfics i paratextuals bàsics, a través de la identificació del sentit global i informació rellevant i emprant, de forma guiada, estratègies bàsiques de comprensió. .",
            "4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals senzills."
          ],
          "3-4": [
            "4.1 Llegir textos progressivament complexos relacionats amb la vida quotidiana, els mitjans de comunicació i textos escolars, de fets i esdeveniments d’interès general, de manera silenciosa i en veu alta, amb fluïdesa (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).",
            "4.2 Comprendre textos escrits i multimodals progressivament complexos, a través de la identificació del sentit global i la informació rellevant, amb l’ajuda d’elements gràfics, textuals i paratextuals, i distingir idees principals i secundàries i també estratègies bàsiques de comprensió de forma progressivament autònoma.",
            "4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals, iniciant-se en l’avaluació de la seva fiabilitat."
          ],
          "5-6": [
            "4.1 Llegir tot tipus de textos de manera silenciosa i en veu alta amb bona fluïdesa (velocitat, precisió en el reconeixement de les paraules, ritme, fraseig i entonació).",
            "4.2 Comprendre textos escrits i multimodals progressivament complexos, a través de la identificació del sentit global i la informació rellevant, amb l’ajuda d’elements gràfics, textuals i paratextuals, utilitzant l’estructura i el format de cada gènere textual, i també estratègies bàsiques de comprensió, més enllà de la interpretació literal.",
            "4.3 Valorar, de manera acompanyada, el contingut i aspectes formals i paratextuals en textos escrits i multimodals, avaluant la seva qualitat, la fiabilitat i la seva idoneïtat en funció del propòsit de lectura."
          ]
        }
      },
      {
        "id": "CE5",
        "title": "Produir textos escrits i multimodals",
        "description": "Produir textos escrits i multimodals, amb adequació, coherència i cohesió, i aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.",
        "criteris": {
          "1-2": [
            "5.1 Redactar textos escrits i multimodals propers i viscuts, des de les diferents etapes del procés evolutiu de l’escriptura, de manera acompanyada, per a un destinatari i amb una intenció concreta, amb adequació, coherència, cohesió i correcció adaptades al moment evolutiu (ortografia natural o de base).",
            "5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos amb acompanyament, de manera individual o grupal"
          ],
          "3-4": [
            "5.1 Redactar textos escrits i multimodals, propers, viscuts i escolars, de manera progressivament autònoma, a través de la selecció del model discursiu que millor respongui a la situació comunicativa, amb adequació, coherència i cohesió, iniciant-se en l’ús de les normes gramaticals i ortogràfiques més senzilles.",
            "5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos de manera progressivament autònoma, amb ús de bastides, si escau, de manera individual o grupal."
          ],
          "5-6": [
            "5.1 Redactar textos escrits i multimodals, de tipus divers, amb suports puntuals, a través de la selecció del model discursiu que millor respongui a cada situació comunicativa, progressant en l’ús de les normes gramaticals i ortogràfiques bàsiques, amb adequació, coherència, cohesió i correcció lingüística.",
            "5.2 Aplicar estratègies de planificació, redacció, revisió i edició de textos, de forma autònoma, amb ús de bastides, si escau, de manera individual o grupal."
          ]
        }
      },
      {
        "id": "CE6",
        "title": "Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera 6. progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació, i de adoptant un punt de vista personal i respectuós amb la propietat intel·lectual,",
        "description": "Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera 6. progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació, i de adoptant un punt de vista personal i respectuós amb la propietat intel·lectual, per transformar aquesta informació en en coneixement i comunicar-la de manera creativa. desinformació, comunicar-la, propietat",
        "criteris": {
          "1-2": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes propers i d’interès personal, de forma guiada, a la xarxa i a les biblioteques.",
            "6.2 Comunicar els resultats d’un procés d’investigació, individual o grupal, realitzat de forma acompanyada, sobre temes propers i d’interès personal. .",
            "6.3 Adoptar hàbits d’ús segur i saludable de les tecnologies digitals de forma guiada en relació amb l’accés a la informació i a la comunicació en l’entorn immediat."
          ],
          "3-4": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques.",
            "6.2 Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d’un procés d’investigació, individual o grupal, realitzat de forma acompanyada, sobre temes d’interès personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
            "6.3 Adoptar hàbits d’ús segur, sostenible i saludable de les tecnologies digitals, amb acompanyament, en relació amb l’accés, la fiabilitat i verificació de les fonts d’informació i la comunicació al seu entorn immediat i a la xarxa."
          ],
          "5-6": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant-ne críticament el resultat.",
            "6.2. Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d’un procés d’investigació senzill, individual o grupal, sobre temes d’interès personal, ecològic i social que incloguin els objectius de desenvolupament sostenible.",
            "6.3 Adoptar hàbits d’ús crític, segur, sostenible i saludable de les tecnologies digitals, de forma progressivament autònoma, en relació amb la fiabilitat i la verificació de les fonts, la credibilitat de la informació i la comunicació a l’entorn immediat i a la xarxa."
          ]
        }
      },
      {
        "id": "CE7",
        "title": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement",
        "description": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres, i compartir experiències de lectura, per construir la pròpia identitat lectora i gaudir de la dimensió social de la lectura.",
        "criteris": {
          "1-2": [
            "7.1 Llegir de manera autònoma textos de diferents autors i autores que s’adeqüin als seus gustos i interessos, seleccionats de manera acompanyada, des de les diferents etapes del procés evolutiu de la lectura.",
            "7.2 Compartir lectures, per mitjà de recomanacions, presentacions i a partir d’interaccions orals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos i iniciar-se en una comunitat lectora."
          ],
          "3-4": [
            "7.2 Llegir de manera autònoma o acompanyada textos de diversos autors i autores que s’adeqüin als seus gustos i interessos i seleccionats amb autonomia creixent, avançant en la construcció de la seva identitat lectora.",
            "7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma argumentada i sentir-se membre d’una comunitat lectora."
          ],
          "5-6": [
            "7.1 Llegir de manera autònoma textos de diversos autors i autores que s’adeqüin als seus gustos i interessos, seleccionats amb criteri propi, progressant en la construcció de la seva identitat lectora.",
            "7.2 Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, per mitjans analògics i digitals, mitjançant la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma crítica i sentir-se membre d’una comunitat lectora."
          ]
        }
      },
      {
        "id": "CE8",
        "title": "Llegir, interpretar i analitzar, de manera progressivament autònoma, obres o fragments literaris adequats, establint relacions entre ells i identificant el gènere literari i les seves convencions fonamentals,",
        "description": "Llegir, interpretar i analitzar, de manera progressivament autònoma, obres o fragments literaris adequats, establint relacions entre ells i identificant el gènere literari i les seves convencions fonamentals, per reconèixer la literatura com a manifestació artística i font de plaer, coneixement i inspiració per a la creació de textos d’intenció literària.",
        "criteris": {
          "1-2": [
            "8.1 Escoltar i llegir textos orals i escrits de la literatura infantil, d’autors i autores reconeguts, descobrint de manera acompanyada els elements essencials de l’obra i establint relacions elementals entre els textos i amb altres manifestacions artístiques i culturals.",
            "8.2 Produir textos individuals o col·lectius amb intenció literària, segons les diferents etapes del procés evolutiu de l’escriptura, de manera acompanyada, en diferents suports, i complementant-los amb altres llenguatges artístics."
          ],
          "3-4": [
            "8.1 Escoltar i llegir textos orals i escrits de la literatura infantil, d’autors i autores reconeguts, relacionant-los en funció de temes i aspectes elementals del gènere literari, i interpretant-los i relacionant-los amb altres manifestacions artístiques i culturals de manera acompanyada.",
            "8.2 Produir textos individuals o col·lectius amb intenció literària, de manera acompanyada, emprant algun recurs literari i recreant de manera personal els models donats, en diferents suports, i complementant-los amb altres llenguatges artístics."
          ],
          "5-6": [
            "8.1 Escoltar i llegir de manera acompanyada textos literaris adequats a la seva edat, d’autors i autores reconeguts, relacionant-los en funció dels temes i aspectes elementals del gènere literari, i interpretant-los, valorant-los i relacionant-los amb altres manifestacions artístiques i culturals de manera progressivament autònoma.",
            "8.2 Produir, de manera progressivament autònoma, textos individuals o col·lectius amb intenció literària, emprant diversitat de recursos literaris de manera original, en diferents suports, i complementant-los amb altres llenguatges artístics."
          ]
        }
      },
      {
        "id": "CE9",
        "title": "Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals",
        "description": "Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals, a partir de processos de comprensió i producció de textos orals, escrits, utilitzant la terminologia elemental adequada, per iniciar-se en el desenvolupament de la consciència lingüística i millorar les destreses en la posada en pràctica d'aquests processos.",
        "criteris": {
          "1-2": [
            "9.1 Formular conclusions elementals sobre la construcció de paraules, frases i textos utilitzant l’ordre adequat i la concordança dels mots en una frase a partir de l’experimentació amb les paraules.",
            "9.2 Revisar i millorar les diferents produccions, escrites, orals i multimodals, de manera acompanyada i usant la terminologia lingüística bàsica adequada."
          ],
          "3-4": [
            "9.1 Formular conclusions elementals sobre el funcionament de la llengua fent especial atenció a la concordança, a partir de l’experimentació amb les paraules, els enunciats i els textos, en un procés acompanyat de producció i comprensió de textos en contextos significatius.",
            "9.2 Revisar i millorar els textos propis i aliens i esmenar alguns problemes de comprensió i producció, de manera acompanyada, a partir de la reflexió metalingüística i usant la terminologia bàsica adequada."
          ],
          "5-6": [
            "9.1 Formular generalitzacions sobre aspectes bàsics del funcionament de la llengua de manera acompanyada, formulant hipòtesis i buscant exemples similars i contraris, a partir de l’experimentació amb les paraules, els enunciats i els textos, en un procés acompanyat de producció o comprensió de textos en contextos significatius.",
            "9.2 Revisar i millorar els textos propis i aliens i esmenar alguns problemes de comprensió i producció, de manera progressivament autònoma, a partir de la reflexió metalingüística i usant la terminologia bàsica adequada."
          ]
        }
      },
      {
        "id": "CE10",
        "title": "Utilitzar un llenguatge no discriminatori i desterrar els abusos de poder a través de la paraula",
        "description": "Utilitzar un llenguatge no discriminatori i desterrar els abusos de poder a través de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge, i posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives.",
        "criteris": {
          "1-2": [
            "10.1 Rebutjar els usos lingüístics discriminatoris identificats a partir de la reflexió grupal acompanyada sobre els aspectes elementals, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies elementals per a l’escolta activa i el consens, iniciant-se en la gestió dialogada de conflictes."
          ],
          "3-4": [
            "10.1 Rebutjar els usos lingüístics discriminatoris i identificar els abusos de poder a través de la paraula mitjançant la reflexió grupal acompanyada sobre els aspectes bàsics, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la comunicació assertiva i el consens, progressant en la gestió dialogada de conflictes."
          ],
          "5-6": [
            "10.1 Rebutjar els usos lingüístics discriminatoris i els abusos de poder a través de la paraula identificats mitjançant la reflexió grupal acompanyada sobre diferents aspectes, verbals i no verbals, que regeixen la comunicació, tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la deliberació argumentada i la gestió dialogada de conflictes, proposant solucions creatives."
          ]
        }
      }
    ]
  },
  "Educació en Valors Cívics i Ètics": {
    "competencies": [
      {
        "id": "CE1",
        "title": "Identificar aspectes vinculats a la pròpia identitat i a les qüestions ètiques relatives a un mateix",
        "description": "Identificar aspectes vinculats a la pròpia identitat i a les qüestions ètiques relatives a un mateix, en el seu entorn proper, buscant la informació a l’abast i interpretant-la de forma reflexiva i crítica per promoure l’autoconeixement i el desenvolupament de l’autonomia moral.",
        "criteris": [
          "1.1 Reconèixer les pròpies capacitats físiques, sensorials i cognitives tenint en compte els punts forts i febles de la pròpia identitat promovent l’autoconeixement.",
          "1.2 Identificar trets personals que facilitin el procés de construcció de la pròpia identitat amb responsabilitat i autonomia.",
          "1.3 Interpretar críticament la informació de l’entorn afavorint la construcció de la pròpia identitat.",
          "1.4 Mostrar conductes que evidenciïn autonomia moral en un context social amb gran diversitat d’interessos.",
          "1.5 Mostrar una actitud responsable, respectuosa i assertiva amb relació a problemàtiques diverses i riscos derivats de l’ús acrític i de l’abús de les xarxes socials, com a factors de prevenció de situacions de ciberassetjament entre iguals i en el context educatiu."
        ]
      },
      {
        "id": "CE2",
        "title": "Actuar i interactuar atenent a normes i valors cívics i ètics",
        "description": "Actuar i interactuar atenent a normes i valors cívics i ètics, reflexionant sobre la seva importància per a la vida individual i col·lectiva, per aplicar-los de manera efectiva i argumentada en diferents contextos i amb la finalitat de promoure una convivència pacífica, respectuosa, democràtica i justa.",
        "criteris": [
          "2.1 Investigar sobre la naturalesa social i política de l’ésser humà en el marc d’una convivència democràtica.",
          "2.2 Interactuar amb els altres adoptant conductes cíviques i democràtiques en un marc de respecte, empatia i consideració adequada de les relacions afectives que s’estableixin.",
          "2.3 Manifestar actituds alineades amb valors com la justícia, la pau i el rebuig a la violència, la solidaritat i el respecte per les minories i les diferents identitats humanes i personals en el seu entorn.",
          "2.4 Analitzar el paper de les institucions públiques, dels organismes internacionals i les organitzacions no governamentals en la promoció de la pau, la solidaritat i la cooperació entre nacions a través del diàleg argumentatiu.",
          "2.5 Reflexionar sobre la defensa d’una efectiva igualtat de gènere i sobre el problema de la violència contra les dones i la conducta sexista, a través de l’anàlisi de les mesures de prevenció de la desigualtat, la violència i la discriminació per raó de gènere i orientació sexual."
        ]
      },
      {
        "id": "CE3",
        "title": "Interpretar les relacions sistèmiques entre l’individu",
        "description": "Interpretar les relacions sistèmiques entre l’individu, la societat i la natura, així com la importància de l’acció local i les seves conseqüències en l’entorn proper, per desenvolupar un paper actiu i conseqüent amb el respecte, la cura i la protecció de les persones i del planeta.",
        "criteris": [
          "3.1 Identificar propostes per afavorir l’aturada del canvi climàtic a partir de l’anàlisi de les problemàtiques en el context local i argumentant el deure ètic de protegir i tenir cura de la natura.",
          "3.2 Realitzar accions que afavoreixen l’assoliment dels objectius de desenvolupament sostenible a través d’acords i actuacions individuals i col·lectives.",
          "3.3 Desenvolupar actituds i valors de compromís basats en el respecte, cura i protecció de les persones, dels animals i del planeta, a través d’accions individuals, en l’àmbit local, vinculades al consum responsable i de productes de proximitat, l’ús sostenible de l’aigua, de l’energia, de la mobilitat, la gestió dels residus i el respecte per la diversitat ètnica i cultural."
        ]
      },
      {
        "id": "CE4",
        "title": "Desenvolupar l’autoestima i l’estima de l’entorn",
        "description": "Desenvolupar l’autoestima i l’estima de l’entorn, a partir de la identificació, expressió i gestió de les emocions i sentiments propis i reconeixent i valorant els dels altres, amb la finalitat d’assolir una actitud empàtica i respectuosa envers un mateix, els altres i la natura.",
        "criteris": [
          "4.1 Expressar de manera respectuosa les pròpies emocions manifestant una ajustada autoestima en activitats creatives individuals i de grup.",
          "4.2 Regular adequadament les pròpies emocions a partir de la identificació d’aquestes i les dels altres, en activitats de reflexió tant individuals com col·lectives.",
          "4.3 Manifestar una actitud empàtica i respectuosa envers un mateix, els altres i la natura, en activitats realitzades en l’entorn escolar.",
          "4.4 Identificar i prendre consciència de fets i accions dirigides a membres de la comunitat educativa que, si persisteixen en el temps, poden derivar en relacions abusives, situacions d’assetjament i maltractament entre iguals en el context educatiu i, en aquest cas, prendre-hi partit des d’un posicionament proactiu com a factor de prevenció."
        ]
      }
    ]
  },
  "Educació Física": {
    "competencies": [
      {
        "id": "CE1",
        "title": "Resoldre situacions motrius diverses de forma eficaç i creativa",
        "description": "Resoldre situacions motrius diverses de forma eficaç i creativa, articulant capacitats i habilitats motrius per a donar resposta a projectes i pràctiques d’activitats físiques de la vida quotidiana.",
        "criteris": {
          "1-2": [
            "1.1 Experimentar diferents maneres de donar resposta a projectes i pràctiques d’activitats físiques variades individuals i col·lectives, valorant-ne la consecució.",
            "1.2 Adoptar decisions eficaces en la pràctica d’activitats físiques individuals i de col·laboració amb l’ús d’estratègies conegudes.",
            "1.3 Emprar capacitats i habilitats motrius pròpies per resoldre situacions motrius millorant progressivament el control corporal."
          ],
          "3-4": [
            "1.1 Desenvolupar projectes i pràctiques d’activitats físiques variades individuals i col·lectives, establint reptes possibles d’aconseguir, planificant les accions i valorant-ne la consecució tot identificant en què es pot millorar.",
            "1.2 Adoptar decisions eficaces en la pràctica d’activitats físiques individuals, de cooperació, de col·laboració, d’oposició i de col·laboració-oposició amb l’ús d’estratègies conegudes i modificades.",
            "1.3. Emprar capacitats i habilitats motrius pròpies i apreses de manera eficaç per resoldre situacions motrius millorant progressivament el control i el domini corporal."
          ],
          "5-6": [
            "1.1 Desenvolupar projectes i pràctiques d’activitats físiques variades individuals i col·lectives, establint reptes possibles d’aconseguir, planificant les accions tot introduint canvis durant el procés per assolir-los, si cal.",
            "1.2. Prendre decisions eficaces en la pràctica d’activitats físiques individuals, de cooperació, de col·laboració, d’oposició i de col·laboració-oposició amb l’ús d’estratègies conegudes, modificades i inèdites.",
            "1.3 Emprar capacitats i habilitats motrius pròpies i apreses de manera eficaç i creativa per resoldre situacions motrius millorant progressivament el control i la coordinació corporal."
          ]
        }
      },
      {
        "id": "CE2",
        "title": "Desenvolupar un estil de vida actiu i saludable",
        "description": "Desenvolupar un estil de vida actiu i saludable, incorporant la pràctica habitual d’activitats físiques i altres comportaments beneficiosos per a la salut durant la vida quotidiana per a adquirir d’hàbits que contribueixin al benestar físic, mental i social.",
        "criteris": {
          "1-2": [
            "2.1 Identificar la pràctica habitual d’activitats físiques en la vida quotidiana, la higiene personal, l’educació postural, l’alimentació saludable, la hidratació i el descans com a comportaments beneficiosos per a la salut.",
            "2.2. Evitar conductes de risc, reconeixent els possibles riscos que poden existir en la pràctica d’activitats físiques a l’escola i a la vida quotidiana."
          ],
          "3-4": [
            "2.1 Incorporar la pràctica habitual d’activitats físiques en la vida quotidiana, la higiene personal, l’educació postural, l’alimentació saludable, la hidratació i el descans com a comportaments beneficiosos per a la salut valorant-ne la contribució al benestar físic, mental i social.",
            "2.2. Evitar conductes de risc, anticipant els possibles riscos que poden existir en la pràctica d’activitats físiques a l’escola i a la vida quotidiana, aplicant protocols d’actuació bàsics en cas d’accidents o lesions."
          ],
          "5-6": [
            "2.1 Integrar la pràctica habitual d’activitats físiques en la vida quotidiana, la higiene personal, l’educació postural, l’alimentació saludable, la hidratació i el descans com a comportaments beneficiosos per a la salut, justificant-ne la contribució al benestar físic, mental i social i els perjudicis de no fer-ho.",
            "2.2. Adoptar mesures de seguretat i de prevenció d’accidents com a resultat de la presa de consciència dels possibles riscos que poden existir en la pràctica d’activitats físiques a l’escola i a la vida quotidiana, aplicant protocols d’actuació i tècniques bàsiques de primers auxilis en cas d’accidents o lesions."
          ]
        }
      },
      {
        "id": "CE3",
        "title": "Prendre part en activitats motrius individuals i col·lectives",
        "description": "Prendre part en activitats motrius individuals i col·lectives, de joc i d’expressió i comunicació corporal per a integrar-les en el repertori motriu i afavorir les relacions interpersonals.",
        "criteris": {
          "1-2": [
            "3.1 Participar activament en els jocs i en activitats col·lectives senzilles d’expressió i comunicació corporal pròpies de l’entorn proper gaudint de la seva pràctica, tot afavorint la seva pervivència.",
            "3.2 Practicar jocs i activitats individuals i col·lectives d’expressió i comunicació corporal tot defugint d’assignar-les a un tipus determinat de persones segons el seu gènere.",
            "3.3. Comunicar vivències, emocions i idees a través de manifestacions expressives senzilles utilitzant els recursos expressius del propi cos."
          ],
          "3-4": [
            "3.1 Participar activament en els jocs i en activitats col·lectives elaborades d’expressió i comunicació corporal pròpies de l’entorn proper i d’altres llocs del món gaudint de la seva pràctica tot afavorint les relacions interpersonals.",
            "3.2 Practicar jocs i activitats individuals i col·lectives d’expressió i comunicació corporal tot defugint d’assignar-les a un tipus determinat de persones segons el seu gènere identificant i rebutjant comportaments discriminatoris.",
            "3.3. Comunicar vivències, emocions i idees a través de manifestacions expressives elaborades utilitzant els recursos expressius del propi cos."
          ],
          "5-6": [
            "3.1 Participar activament en els jocs i en activitats col·lectives elaborades d’expressió i comunicació corporal pròpies de l’entorn proper i d’altres llocs del món gaudint de la seva pràctica, tot afavorint la seva difusió.",
            "3.2. Practicar jocs i activitats individuals i col·lectives d’expressió i comunicació corporal tot defugint d’assignar-les a un tipus determinat de persones segons el seu gènere identificant i rebutjant comportaments discriminatoris i estereotips de gènere, sensibilitzant per evitar-ne la reproducció.",
            "3.3 Comunicar vivències, emocions i idees a través de manifestacions expressives elaborades de manera creativa utilitzant els recursos expressius del propi cos."
          ]
        }
      },
      {
        "id": "CE4",
        "title": "Valorar l’entorn com a espai de pràctica d’activitats físiques i d’ocupació del temps de lleure",
        "description": "Valorar l’entorn com a espai de pràctica d’activitats físiques i d’ocupació del temps de lleure, utilitzant-lo de manera respectuosa i responsable per a participar de la seva conservació i millora.",
        "criteris": {
          "1-2": [
            "4.1 Practicar algun tipus d’activitat física vinculada al barri, al poble o a la ciutat o al medi natural com una forma d’enriquir les tipologies d’activitats físiques que es donen en contextos de pràctica motriu a l’escola i d’ocupar el temps de lleure.",
            "4.2. Valorar l’entorn com a espai de pràctica d’activitats físiques saludables i satisfactòries en el temps de lleure fent-ne un ús respectuós."
          ],
          "3-4": [
            "4.1 Practicar activitats físiques variades vinculades al barri, al poble o a la ciutat o al medi natural com una forma d’enriquir les tipologies d’activitats físiques que es donen en contextos de pràctica motriu a l’escola i d’ocupar el temps de lleure.",
            "4.2. Valorar l’entorn com a espai de pràctica d’activitats físiques saludables i satisfactòries en el temps de lleure, contribuint a la seva conservació utilitzant els espais, els materials i les instal·lacions de manera respectuosa i responsable"
          ],
          "5-6": [
            "4.1 Practicar activitats físiques variades vinculades al barri, al poble o a la ciutat o al medi natural com una forma d’enriquir les tipologies d’activitats físiques que es donen en contextos de pràctica motriu a l’escola i d’ocupar el temps de lleure identificant les possibilitats que ofereixen els diferents entorns.",
            "4.2. Valorar l’entorn com a espai de pràctica d’activitats físiques saludables i satisfactòries en el temps de lleure, contribuint a la seva conservació utilitzant els espais, els materials i les instal·lacions de manera respectuosa i responsable i de les mesures que cal prendre per minimitzar-ne les afectacions."
          ]
        }
      },
      {
        "id": "CE5",
        "title": "Mostrar comportaments i actituds empàtiques i inclusives en la pràctica d’activitats físiques",
        "description": "Mostrar comportaments i actituds empàtiques i inclusives en la pràctica d’activitats físiques, emprant habilitats socials i processos d’autoregulació per a fomentar la convivència.",
        "criteris": {
          "1-2": [
            "5.1 Participar en activitats físiques percebent les emocions i els sentiments propis i de les altres persones, controlant les emocions pròpies negatives que hi puguin aparèixer fomentant la convivència.",
            "5.2 Respectar les normes de funcionament de la classe, les regles de les activitats practicades, els espais i els materials emprats en els contextos de pràctica motriu a l’escola.",
            "5.3. Reconèixer que en la pràctica d’activitats físiques tothom és diferent.",
            "5.4. Desenvolupar habilitats socials a través de la participació en contextos de pràctica motriu a l’escola, iniciant-se en la resolució de conflictes.",
            "5.5. Mostrar una actitud de rebuig vers actuacions contràries a la convivència en la pràctica d’activitats físiques."
          ],
          "3-4": [
            "5.1 Participar en activitats físiques reconeixent les emocions i els sentiments propis i de les altres persones, autoregulant el propi comportament i les emocions negatives que hi puguin aparèixer fomentant la convivència.",
            "5.2. Respectar les normes consensuades de funcionament de la classe, les regles de les activitats practicades, els espais i els materials emprats en els contextos de pràctica motriu a l’escola",
            "5.3 Valorar les diferències individuals de tothom en la pràctica d’activitats físiques com un enriquiment personal i col·lectiu.",
            "5.4 Desenvolupar habilitats socials a través de la participació en contextos de pràctica motriu a l’escola, utilitzant estratègies de resolució de conflictes.",
            "5.5. Rebutjar qualsevol tipus d’actuacions contràries a la convivència en la pràctica d’activitats físiques."
          ],
          "5-6": [
            "5.1. Comprendre les conductes, les emocions i els sentiments propis i de les altres persones, autoregulant el propi comportament i les emocions negatives que hi puguin aparèixer, expressant-les de forma assertiva fomentant la convivència.",
            "5.2 Respectar les normes consensuades de funcionament de la classe, les regles de les activitats practicades, contribuint a la seva creació, modificació i millora, els espais i els materials emprats en els contextos de pràctica motriu a l’escola.",
            "5.3. Valorar les diferències individuals de tothom en la pràctica d’activitats físiques com un enriquiment personal i col·lectiu mostrant una actitud crítica amb els estereotips dels models corporals en els mitjans de comunicació i la publicitat.",
            "5.4 Mostrar habilitats socials en la resolució de conflictes de manera assertiva i respecte per la diversitat de tot tipus en contextos de pràctica motriu a l’escola i en la societat.",
            "5.5. Rebutjar críticament qualsevol tipus d’actuacions contràries a la convivència en la pràctica d’activitats físiques i a la societat."
          ]
        }
      }
    ]
  },
  "Llengua Estrangera": {
    "competencies": [
      {
        "id": "CE1",
        "title": "Comprendre la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe",
        "description": "Comprendre la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe, pluricultural i intercultural per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics, i valorar aquesta diversitat com a font de riquesa cultural.",
        "criteris": {
          "1-2": [
            "1.1 Participar amb respecte en la comunicació intercultural, identificant i analitzant, de forma guiada, les discriminacions, els prejudicis i els estereotips més comuns, en situacions quotidianes i habituals.",
            "1.2. Reconèixer i valorar la diversitat lingüística i cultural relacionada amb la llengua estrangera, identificant els seus elements culturals i lingüístics elementals."
          ],
          "3-4": [
            "1.1 Participar amb respecte en situacions interculturals, identificant i comparant semblances i diferències elementals entre llengües i cultures, i mostrant rebuig davant discriminacions, prejudicis i estereotips de qualsevol tipus en contextos comunicatius quotidians i habituals.",
            "1.2 Reconèixer, comprendre i valorar la diversitat lingüística i cultural pròpia de països on es parla la llengua estrangera com a font d’enriquiment personal, identificant elements culturals i lingüístics elementals que fomentin la cultura de la pau.",
            "1.3. Seleccionar i aplicar, de forma guiada, estratègies bàsiques per a la comprensió dels aspectes més rellevants de la diversitat lingüística i cultural."
          ],
          "5-6": [
            "1.1 Participar amb estima i respecte en situacions interculturals, construint vincles entre les diferents llengües i cultures, i mostrant rebuig davant discriminacions, prejudicis i estereotips de qualsevol tipus contextos comunicatius quotidians habituals.",
            "1.2 Reconèixer, comprendre i valorar la diversitat lingüística i cultural pròpia de països on es parla la llengua estrangera com font d’enriquiment personal, identificant elements culturals i lingüístics bàsics que fomentin sostenibilitat i la cultura de la pau.",
            "1.3. Seleccionar i aplicar, de forma guiada, estratègies bàsiques per a la comprensió de la diversitat lingüística i cultural."
          ]
        }
      },
      {
        "id": "CE2",
        "title": "Comprendre i interpretar textos orals i multimodals breus i senzills",
        "description": "Comprendre i interpretar textos orals i multimodals breus i senzills, en la llengua estàndard, i identificar el sentit general i la informació més rellevant, valorant, de manera progressivament autònoma, aspectes formals de contingut bàsics, per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.",
        "criteris": {
          "1-2": [
            "2.1 Reconèixer i comprendre paraules i expressions habituals en textos orals i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i pròxims a la pròpia experiència, expressats de forma entenedora, clara, senzilla i directa, en llengua estàndard i en diferents suports.",
            "2.2 Seleccionar i aplicar de forma guiada estratègies elementals per captar la idea global i identificar elements específics amb ajuda d’elements lingüístics i no lingüístics del context, en situacions comunicatives quotidianes i de rellevància per a l’alumnat."
          ],
          "3-4": [
            "2.1 Reconèixer i comprendre paraules, frases i el sentit global de textos orals i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i pròxims a la pròpia experiència, així com de textos de ficció adequats al nivell de desenvolupament de l’alumnat, expressats de forma entenedora, clara i en llengua estàndard a través de diferents suports.",
            "2.2 Seleccionar i aplicar de forma guiada estratègies adequades en situacions comunicatives quotidianes i de rellevància per a l’alumnat per captar el sentit global i processar informacions explícites en textos breus i senzills sobre temes familiars."
          ],
          "5-6": [
            "2.1 Reconèixer i interpretar el sentit global, així com paraules frases específiques de textos orals i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i àmbits pròxims a la pròpia experiència, així com de textos literaris adequats al nivell de desenvolupament de l’alumnat, expressats de forma entenedora, clara i en llengua estàndard a través de diferents suports.",
            "2.2 Seleccionar i aplicar de forma guiada estratègies i coneixements adequats en situacions comunicatives quotidianes i de rellevància per a l’alumnat per captar el sentit global i processar informacions explícites en textos diversos."
          ]
        }
      },
      {
        "id": "CE3",
        "title": "Produir textos orals i multimodals amb coherència",
        "description": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments i conceptes, construir coneixement i establir vincles personals.",
        "criteris": {
          "1-2": [
            "3.1 Expressar oralment frases curtes amb informació bàsica sobre assumptes quotidians i de rellevància per a l’alumnat, utilitzant de forma guiada recursos verbals i no verbals, a partir de models i estructures prèviament presentats i parant atenció al ritme, l’accentuació i l’entonació.",
            "3.2 Seleccionar i aplicar de forma guiada estratègies bàsiques per produir missatges breus i senzills adequats a les intencions comunicatives utilitzant, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment.",
            "3.3 Participar, de forma guiada, en situacions interactives elementals sobre temes quotidians, preparats prèviament, a través de diversos suports, com ara la repetició, el ritme pausat o el llenguatge no verbal, i mostrant empatia.",
            "3.4. Seleccionar i utilitzar, de forma guiada i en entorns propers, estratègies elementals per saludar, acomiadar-se i presentar-se, expressar missatges senzills i breus, i formular i contestar preguntes bàsiques per a la comunicació."
          ],
          "3-4": [
            "3.1 Expressar oralment frases curtes amb informació bàsica sobre assumptes quotidians i de rellevància per a l’alumnat, utilitzant de forma guiada recursos verbals i no verbals, parant atenció al ritme, l’accentuació i l’entonació.",
            "3.2 Seleccionar i aplicar de forma guiada estratègies per produir missatges breus i senzills adequats a les intencions comunicatives utilitzant, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment.",
            "3.3 Participar en situacions interactives d’intercanvis d’informació breus i senzills sobre temes quotidians, de rellevància personal i pròxims a la seva experiència, preparats prèviament, a través de diversos suports, com ara la repetició, el ritme pausat o el llenguatge no verbal, i mostrant empatia i respecte per la cortesia lingüística i l’etiqueta digital.",
            "3.4. Seleccionar i utilitzar, de forma guiada i en situacions quotidianes, estratègies elementals per saludar, acomiadar-se i presentar-se, expressar missatges breus i formular i contestar preguntes senzilles."
          ],
          "5-6": [
            "3.1 Expressar oralment textos breus i senzills, prèviament preparats, sobre assumptes quotidians i de rellevància per a l’alumnat, utilitzant de forma guiada recursos verbals i no verbals, i usant formes i estructures bàsiques i d’ús freqüent.",
            "3.2 Seleccionar i aplicar de forma guiada coneixements i estratègies per preparar i produir textos adequats a les intencions comunicatives, les característiques contextuals i la tipologia textual, usant, amb ajuda, recursos físics o digitals en funció de la tasca i les necessitats de cada moment.",
            "3.3 Participar en situacions interactives d’intercanvis d’informació breus i senzills sobre temes quotidians, de rellevància personal i pròxims a la pròpia experiència, a través de diversos suports, com ara la repetició, el ritme pausat o el llenguatge no verbal, i mostrant empatia i respecte per la cortesia lingüística i l’etiqueta digital, així com per les diferents necessitats, idees i motivacions dels interlocutors.",
            "3.4. Seleccionar i utilitzar, de forma guiada i en situacions quotidianes, estratègies elementals per saludar, acomiadar-se i presentar-se, formular i contestar preguntes senzilles, expressar missatges, i iniciar i acabar la comunicació."
          ]
        }
      },
      {
        "id": "CE4",
        "title": "Comprendre i interpretar textos escrits i multimodals",
        "description": "Comprendre i interpretar textos escrits i multimodals, reconeixent el sentit global, les idees principals i la informació implícita i explícita, i realitzant, de manera progressivament autònoma, reflexions elementals sobre aspectes formals i de contingut, per adquirir i construir coneixement, i respondre a necessitats i interessos comunicatius diversos.",
        "criteris": {
          "1-2": [
            "4.1 Reconèixer i comprendre paraules i expressions habituals en textos escrits i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i pròxims a la pròpia experiència, expressats de forma entenedora, clara, senzilla i directa, i en llengua estàndard.",
            "4.2 Seleccionar i aplicar, de forma guiada, estratègies elementals en situacions comunicatives quotidianes i de rellevància per a l’alumnat que permetin captar la idea global i identificar elements específics amb ajuda d’elements lingüístics i no lingüístics."
          ],
          "3-4": [
            "4.1 Reconèixer i comprendre el sentit global, així com paraules i frases prèviament indicades en textos escrits i multimodals breus i senzills sobre temes freqüents i quotidians de rellevància personal i pròxims a la seva experiència, així com de textos de ficció adequats al nivell de desenvolupament de l’alumnat, expressats de forma entenedora, clara i en llengua estàndard a través de diferents suports.",
            "4.2 Seleccionar i aplicar, de forma guiada, estratègies adequades en situacions comunicatives quotidianes i de rellevància per a l’alumnat que permetin captar el sentit global i processar informacions explícites en textos breus i senzills sobre temes familiars."
          ],
          "5-6": [
            "4.1 Reconèixer i comprendre sentit global, així com paraules frases específiques de textos escrits i multimodals breus i senzills sobre temes freqüents quotidians de rellevància personal i àmbits pròxims a la seva experiència, així com de textos literaris adequats al nivell de desenvolupament de l’alumnat, expressats de forma entenedora, clara i en llengua estàndard través de diferents suports.",
            "4.2 Seleccionar i aplicar, de forma guiada, estratègies i coneixements adequats en situacions comunicatives quotidianes i de rellevància per l’alumnat que permetin captar sentit global i processar informacions explícites en textos diversos."
          ]
        }
      },
      {
        "id": "CE5",
        "title": "Produir textos escrits i multimodals amb adequació",
        "description": "Produir textos escrits i multimodals amb adequació, coherència i cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma, i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.",
        "criteris": {
          "1-2": [
            "5.1 Escriure paraules, expressions conegudes i frases, sobre assumptes quotidians i de rellevància personal per a l’alumnat, a partir de models, i amb una finalitat específica, a través d’eines analògiques i digitals, utilitzant estructures i lèxic elemental.",
            "5.2. Seleccionar i aplicar de forma guiada estratègies bàsiques per produir missatges breus i senzills adequats a les intencions comunicatives utilitzant, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment."
          ],
          "3-4": [
            "5.1 Redactar textos breus i senzills, sobre assumptes quotidians i de rellevància personal per a l’alumnat, amb adequació a la situació comunicativa proposada, a partir de models, i a través d’eines analògiques i digitals, utilitzant estructures i lèxic elemental.",
            "5.2. Seleccionar i aplicar de forma guiada estratègies per produir missatges breus i senzills adequats a les intencions comunicatives utilitzant, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment."
          ],
          "5-6": [
            "5.1 Organitzar i redactar textos breus i senzills, sobre assumptes quotidians i freqüents, de rellevància personal per a l’alumnat i pròxims a la seva experiència, prèviament preparats, amb adequació a la situació comunicativa proposada, a través d’eines analògiques i digitals, i usant estructures i lèxic bàsic d’ús comú.",
            "5.2. Seleccionar i aplicar de forma guiada coneixements i estratègies per preparar i produir textos adequats a les intencions comunicatives, les característiques contextuals i la tipologia textual, usant amb ajuda recursos físics o digitals en funció de la tasca i les necessitats de cada moment."
          ]
        }
      },
      {
        "id": "CE6",
        "title": "Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació i adoptant un punt de vista personal i respectuós amb la propietat intel·lectual,",
        "description": "Cercar, seleccionar i contrastar informació procedent de diverses fonts, de forma planificada i de manera progressivament autònoma, avaluant la seva fiabilitat, reconeixent alguns riscos de manipulació i desinformació i adoptant un punt de vista personal i respectuós amb la propietat intel·lectual, per transformar-la en coneixement i comunicar-la de manera creativa.",
        "criteris": {
          "1-2": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes propers i d’interès personal, de forma guiada, a la xarxa i a les biblioteques.",
            "6.2 Comunicar els resultats d’un procés d’investigació, individual o grupal, realitzat de forma acompanyada, sobre temes propers i d’interès personal.",
            "6.3. Adoptar hàbits d’ús segur i saludable de les tecnologies digitals de forma guiada en relació amb l’accés a la informació i a la comunicació en l’entorn immediat."
          ],
          "3-4": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques.",
            "6.2 Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d’un procés d’investigació, individual o grupal, realitzat de forma acompanyada, sobre temes d’interès personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
            "6.3. Adoptar hàbits d’ús segur, sostenible i saludable de les tecnologies digitals, amb acompanyament, en relació amb l’accés, la fiabilitat i verificació de les fonts d’informació i la comunicació al seu entorn immediat i a la xarxa."
          ],
          "5-6": [
            "6.1 Aplicar estratègies de cerca d’informació (localització, selecció i contrast) en diferents fonts, incloses les digitals, sobre temes d’interès personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant-ne críticament el resultat.",
            "6.2 Comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d’un procés d’investigació senzill, individual o grupal, sobre temes d’interès personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
            "6.3. Adoptar hàbits d’ús crític, segur, sostenible i saludable de les tecnologies digitals, de forma progressivament autònoma, en relació amb la fiabilitat i la verificació de les fonts, la credibilitat de la informació i la comunicació a l’entorn immediat i a la xarxa."
          ]
        }
      },
      {
        "id": "CE7",
        "title": "Seleccionar i llegir de manera autònoma obres diverses",
        "description": "Seleccionar i llegir de manera autònoma obres diverses atenent els propis gustos i interessos, compartint experiències de lectura, per iniciar la construcció de la identitat lectora, fomentar el gust per la lectura com a de plaer i gaudir de la seva dimensió social.",
        "criteris": {
          "1-2": [
            "7.1 Llegir de manera autònoma textos de diferents autors i autores que s’adeqüin als propis gustos i interessos, seleccionats de manera acompanyada, des de les diferents etapes del procés evolutiu de la lectura.",
            "7.2. Compartir lectures, per mitjà de recomanacions, presentacions i a partir d’interaccions orals, en el marc de la biblioteca d’aula i de centre, per expressar gustos i interessos i iniciar- se en una comunitat lectora"
          ],
          "3-4": [
            "7.1 Llegir de manera autònoma o acompanyada textos de diversos autors i autores que s’adeqüin als propis gustos i interessos i seleccionats amb autonomia creixent, avançant en la construcció de la identitat lectora.",
            "7.2. Compartir lectures per mitjà de recomanacions, presentacions i a partir d’interaccions orals, en el marc de la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma argumentada i que permetin sentir-se membre d’una comunitat lectora."
          ],
          "5-6": [
            "7.1 Llegir de manera autònoma textos de diversos autors i autores que s’adeqüin als propis gustos interessos, seleccionats amb criteri propi, progressant en construcció de la identitat lectora.",
            "7.2. Compartir lectures per mitjà recomanacions, presentacions partir d’interaccions orals, per mitjans analògics i digitals, en marc de la biblioteca d’aula i de centre, per expressar gustos i interessos, valorar les obres de forma crítica i que permetin sentir-se membre d’una comunitat lectora."
          ]
        }
      },
      {
        "id": "CE8",
        "title": "Mediar entre diferents llengües en situacions predictibles",
        "description": "Mediar entre diferents llengües en situacions predictibles, utilitzant estratègies i coneixements per processar transmetre informació bàsica i senzilla, per tal de facilitar la comunicació.",
        "criteris": {
          "1-2": [
            "8.1. Interpretar i explicar informació bàsica de conceptes, comunicacions i textos breus i senzills, de manera guiada, en situacions de comunicació de diversitat lingüística, social i cultural, mostrant empatia i interès per entendre’s en un entorn immediat."
          ],
          "3-4": [
            "8.1 Interpretar i explicar textos, conceptes i comunicacions breus i senzills, de manera guiada, en situacions de comunicació de diversitat lingüística, social i cultural, mostrant empatia i interès per entendre’s en el seu entorn més proper.",
            "8.2. Seleccionar i aplicar, de forma guiada, estratègies elementals que ajudin a crear ponts i que facilitin la comprensió i producció d’informació, així com la comunicació fluida, fent servir, amb ajuda, recursos i suports físics o digitals en funció de les necessitats de cada moment."
          ],
          "5-6": [
            "8.1 Inferir i comunicar textos, conceptes i comunicacions breus senzills, de manera guiada, en situacions de comunicació amb diversitat lingüística i cultural, mostrant respecte i empatia per les persones interlocutores, les llengües emprades i interès per participar en la solució de malentesos en l’entorn proper.",
            "8.2 Seleccionar i aplicar, de forma guiada, estratègies bàsiques que ajudin a crear ponts i facilitin la comprensió i producció d’informació i la comunicació fluida, adequats a les intencions comunicatives, les característiques contextuals tipologia textual, fent servir, amb ajuda, recursos i suports físics digitals en funció de les necessitats de cada moment."
          ]
        }
      },
      {
        "id": "CE9",
        "title": "Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals i",
        "description": "Reflexionar de forma guiada sobre el llenguatge i reconèixer i usar els repertoris lingüístics personals i a partir de processos de comprensió i producció de textos orals, escrits i multimodals, utilitzant la terminologia elemental adequada, per iniciar-se en el desenvolupament de la consciència lingüística i millorar les destreses en la posada en pràctica d'aquests processos.",
        "criteris": {
          "1-2": [
            "9.1 Comparar i contrastar similituds i diferències evidents entre llengües, reflexionant, de manera guiada, sobre aspectes elementals del seu funcionament.",
            "9.2 Identificar i aplicar, de forma guiada, els coneixements i estratègies que formen el propi repertori lingüístic, per millorar la capacitat de comunicar i d’aprendre la llengua estrangera, amb suport d’altres participants i de suports analògics i digitals.",
            "9.3. Identificar i explicar, de manera guiada, progressos i dificultats elementals d’aprenentatge de la llengua estrangera."
          ],
          "3-4": [
            "9.1 Comparar i contrastar les similituds i diferències entre llengües, reflexionant, de manera guiada, sobre aspectes bàsics del seu funcionament.",
            "9.2 Utilitzar i diferenciar, de forma guiada, els coneixements i estratègies que formen el propi repertori lingüístic, per millorar la capacitat de comunicar i d’aprendre la llengua estrangera, amb suport d’altres participants i de suports analògics i digitals.",
            "9.3. Identificar i explicar, de manera guiada, progressos i dificultats elementals d’aprenentatge de la llengua estrangera, reconeixent els aspectes que ajuden a millorar i participant en activitats d’autoavaluació i coavaluació."
          ],
          "5-6": [
            "9.1 Comparar i contrastar les similituds i diferències entre llengües, reflexionant, de manera progressivament autònoma, sobre aspectes bàsics del seu funcionament.",
            "9.2 Utilitzar i diferenciar de forma progressivament autònoma els coneixements i estratègies que formen el propi repertori lingüístic, per millorar la capacitat de comunicar i d’aprendre la llengua estrangera, amb suport d’altres participants i de suports analògics digitals.",
            "9.3 Identificar, registrar i utilitzar, de manera guiada, els progressos dificultats d’aprenentatge de la llengua estrangera, reconeixent aspectes que ajuden a millorar realitzant activitats d’autoavaluació i coavaluació."
          ]
        }
      },
      {
        "id": "CE10",
        "title": "Posar al servei de la convivència democràtica",
        "description": "Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets totes les persones les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant abusos de poder a través de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge.",
        "criteris": {
          "1-2": [
            "10.1 Rebutjar els usos lingüístics discriminatoris identificats a partir de la reflexió grupal acompanyada sobre els aspectes elementals, verbals i no verbals, que regeixen la comunicació, i tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies elementals per a l’escolta activa i el consens, iniciant-se en la gestió dialogada de conflictes."
          ],
          "3-4": [
            "10.1 Rebutjar els usos lingüístics discriminatoris i identificar els abusos de poder a través de la paraula, mitjançant la reflexió grupal acompanyada sobre els aspectes bàsics, verbals i no verbals, que regeixen la comunicació, i tenint en compte la perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la comunicació assertiva i el consens, progressant en la gestió dialogada de conflictes."
          ],
          "5-6": [
            "10.1 Rebutjar els usos lingüístics discriminatoris i els abusos de poder a través de la paraula identificats mitjançant la reflexió grupal acompanyada sobre diferents aspectes, verbals i no verbals, que regeixen la comunicació, i tenint en compte perspectiva de gènere.",
            "10.2 Utilitzar, amb l’acompanyament i planificació necessaris, estratègies bàsiques per a la deliberació argumentada i la gestió dialogada de conflictes, proposant solucions creatives."
          ]
        }
      }
    ]
  },
  "Matemàtiques": {
    "competencies": [
      {
        "id": "CE1",
        "title": "Traduir problemes i interpretar situacions quotidianes fent-ne una representació matemàtica personal a través de conceptes",
        "description": "Traduir problemes i interpretar situacions quotidianes fent-ne una representació matemàtica personal a través de conceptes, eines i estratègies per analitzar-ne els elements més rellevants.",
        "criteris": {
          "1-2": [
            "1.1 Iniciar-se en la interpretació de la informació d’un problema i d’una situació de la vida quotidiana responent a les preguntes plantejades o fent noves preguntes.",
            "1.2 Proposar representacions matemàtiques, amb recursos manipulatius, gràfics i digitals, orientades a la resolució de problemes i de situacions de la vida quotidiana."
          ],
          "3-4": [
            "1.1 Interpretar la informació d’un problema i d’una situació de la vida quotidiana responent a les preguntes plantejades o fent noves preguntes.",
            "1.2 Proposar representacions matemàtiques, amb recursos manipulatius, gràfics i digitals, que ajudin en la resolució de problemes i de situacions de la vida quotidiana."
          ],
          "5-6": [
            "1.1 Interpretar i reformular de forma verbal i gràfica, problemes i situacions de la vida quotidiana, responent a les preguntes plantejades o fent noves preguntes.",
            "1.2 Elaborar representacions matemàtiques eficaces, amb recursos manipulatius, gràfics i digitals, que portin a la resolució de problemes i de situacions de la vida quotidiana"
          ]
        }
      },
      {
        "id": "CE2",
        "title": "Resoldre problemes, aplicant diferents tècniques, estratègies i formes de raonament,",
        "description": "Resoldre problemes, aplicant diferents tècniques, estratègies i formes de raonament, per explorar i compartir diferents maneres de procedir, obtenir solucions i assegurar la seva validesa des d’un punt de vista formal i en relació amb el context plantejat i generar noves preguntes i reptes.",
        "criteris": {
          "1-2": [
            "2.1 Emprar estratègies i formes pròpies de raonar per resoldre un problema i explicar-ne el procés.",
            "2.2 Explorar, compartir i resoldre un mateix problema a partir de diferents propostes, parlant-ne sense biaix de gènere.",
            "2.3. Comprovar que les solucions obtingudes es corresponen amb la pregunta formulada relacionant les solucions amb la pregunta."
          ],
          "3-4": [
            "2.1 Emprar estratègies i formes de raonament diverses per resoldre un problema i explicar-ne el procés.",
            "2.2 Explorar, compartir i resoldre un mateix problema a partir de diferents propostes, parlant-ne sense biaix de gènere.",
            "2.3. Demostrar la correcció matemàtica de les solucions d’un problema i la seva coherència en el context plantejat."
          ],
          "5-6": [
            "2.1 Seleccionar entre diferents estratègies per resoldre un problema i compartint i justificant l’estratègia seleccionada.",
            "2.2 Compartir i obtenir possibles solucions d’un problema seleccionant d’entre diverses opcions compartides i justificant l’escollida sense biaix de gènere.",
            "2.3 Argumentar la correcció matemàtica de les solucions d’un problema i la seva coherència en el context plantejat generant, si escau, noves preguntes i reptes."
          ]
        }
      },
      {
        "id": "CE3",
        "title": "Explorar, formular i comprovar conjectures senzilles, reconeixent el valor del raonament espacial, raonament lògic i incorporar l’argumentació",
        "description": "Explorar, formular i comprovar conjectures senzilles, reconeixent el valor del raonament espacial, raonament lògic i incorporar l’argumentació per integrar i generar nou coneixement matemàtic.",
        "criteris": {
          "1-2": [
            "3.1 Iniciar-se en la realització de conjectures matemàtiques investigant patrons i propietats, fent deduccions i comprovant- les .",
            "3.2 Proposar exemples de problemes i situacions i explicant com es poden resoldre matemàticament.",
            "3.3 Incorporar la utilització de la visualització i del raonament geomètric com a forma de raonament per entendre i gestionar la informació referida a l’espai."
          ],
          "3-4": [
            "3.1 Formular conjectures matemàtiques senzilles i investigant patrons, propietats i relacions, així com fent deduccions i comprovant-les.",
            "3.2 Proposar exemples de problemes i situacions, explicant com es poden resoldre raonant i argumentant en les situacions en què calgui aplicar-ho.",
            "3.3 Incorporar la utilització de la visualització i del raonament geomètric com a forma de raonament per entendre i gestionar la informació referida a l’espai."
          ],
          "5-6": [
            "3.1 Analitzar conjectures matemàtiques senzilles investigant patrons, propietats i relacions, així com fent deduccions i comprovant-les.",
            "3.2 Crear exemples de problemes i situacions justificant que es poden resoldre oferint els propis raonaments i arguments.",
            "3.3 Incorporar la utilització de la visualització i del raonament geomètric com a forma de raonament per entendre i gestionar la informació referida a l’espai."
          ]
        }
      },
      {
        "id": "CE4",
        "title": "Utilitzar el pensament computacional descomponent en parts més petites",
        "description": "Utilitzar el pensament computacional descomponent en parts més petites, reconeixent patrons i dissenyant algorismes per solucionar problemes i situacions de la vida quotidiana.",
        "criteris": {
          "1-2": [
            "4.1 Descriure rutines i activitats senzilles que es realitzin pas a pas, en situacions de l’aula i de la vida quotidiana.",
            "4.2 Descompondre un problema o situació de la vida quotidiana en tasques concretes, abordant-les d’una en una per poder trobar la solució global.",
            "4.3 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
            "4.4. Explicar instruccions pas a pas per resoldre un problema i d’altres de similars provant i duent a terme possibles solucions amb dispositius digitals i sense."
          ],
          "3-4": [
            "4.1 Descriure rutines i activitats senzilles que es realitzin pas a pas, en situacions de l’aula i de la vida quotidiana.",
            "4.2 Descompondre un problema o situació de la vida quotidiana en tasques concretes, abordant-les d’una en una per poder trobar la solució global.",
            "4.3 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
            "4.4. Definir instruccions pas a pas per resoldre un problema i d’altres de similars provant i duent a terme possibles solucions amb dispositius digitals i sense."
          ],
          "5-6": [
            "4.1 Descompondre un problema o situació de la vida quotidiana en tasques, abordant-les d’una en una per poder trobar la solució global, entre d’altres, amb dispositius digitals.",
            "4.2 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
            "4.3 Trobar els principis que generen els patrons d’un problema, descartant les dades irrellevants tot identificant les parts més importants.",
            "4.4. Definir instruccions pas a pas per resoldre un problema i d’altres de similars provant i duent a terme possibles solucions amb dispositius digitals."
          ]
        }
      },
      {
        "id": "CE5",
        "title": "Utilitzar connexions entre diferents idees matemàtiques",
        "description": "Utilitzar connexions entre diferents idees matemàtiques, així com identificar les matemàtiques implicades en altres àrees o amb la vida quotidiana, interrelacionant conceptes i procediments per interpretar situacions i contextos diversos.",
        "criteris": {
          "1-2": [
            "5.1 Reconèixer connexions entre els diferents elements matemàtics relacionant i ampliar coneixements en un context matemàtic.",
            "5.2. Reconèixer les matemàtiques presents en la vida quotidiana i en altres àrees en situacions en què se’n pugui fer ús."
          ],
          "3-4": [
            "5.1 Realitzar connexions entre els diferents elements matemàtics valorant-ne la utilitat per raonar i fixar coneixements en un context matemàtic.",
            "5.2. Interpretar situacions en contextos diversos reconeixent les connexions entre les matemàtiques i la vida quotidiana en situacions en què se’n pugui fer ús."
          ],
          "5-6": [
            "5.1 Connectar diferents elements de les matemàtiques valorant-ne la utilitat per relacionar i ampliar coneixements en un context matemàtic.",
            "5.2. Utilitzar les connexions entre les matemàtiques i altres àrees i també entre les matemàtiques i situacions de contextos no matemàtics en què se’n pugui fer ús, desenvolupant la capacitat crítica, creativa i innovadora",
            "5.2. Utilitzar les connexions entre les matemàtiques i altres àrees i també entre les matemàtiques i situacions de contextos no matemàtics en què se’n pugui fer ús, desenvolupant la capacitat crítica, creativa i innovadora."
          ]
        }
      },
      {
        "id": "CE6",
        "title": "Comunicar i representar, de forma individual i col·lectiva conceptes, procediments i resultats matemàtics utilitzant el llenguatge oral, escrit, gràfic, multimodal, en diferents formats i la terminologia matemàtica adequada,",
        "description": "Comunicar i representar, de forma individual i col·lectiva conceptes, procediments i resultats matemàtics utilitzant el llenguatge oral, escrit, gràfic, multimodal, en diferents formats i la terminologia matemàtica adequada, per donar significat i permanència a les idees matemàtiques.",
        "criteris": {
          "1-2": [
            "6.1 Seleccionar el llenguatge matemàtic bàsic present en la vida quotidiana donant-li significat.",
            "6.2. Explicar idees i processos matemàtics utilitzats en la resolució d’un problema o justificant la solució obtinguda de forma verbal, amb l’ajuda del gest o de la representació gràfica."
          ],
          "3-4": [
            "6.1 Reconèixer i usar llenguatge matemàtic present en el seu entorn donant-li significat.",
            "6.2. Explicar idees i processos matemàtics utilitzats en la resolució d’un problema o justificant la solució obtinguda de forma verbal, amb l’ajuda del gest, la representació gràfica i també la representació digital."
          ],
          "5-6": [
            "6.2 Interpretar i usar llenguatge matemàtic adequat donant-li significat.",
            "6.2 Representar conceptes, procediments i resultats matemàtics utilitzant diferents eines i formes de representació, inclosa la digital, per visualitzar idees i estructurar processos matemàtics.",
            "6.3. Explicar idees i processos matemàtics utilitzats en la resolució d’un problema o argumentant la solució obtinguda de forma verbal, amb l’ajuda del gest, la representació gràfica i també la representació digital."
          ]
        }
      },
      {
        "id": "CE7",
        "title": "Desenvolupar destreses personals que ajudin a identificar i gestionar emocions",
        "description": "Desenvolupar destreses personals que ajudin a identificar i gestionar emocions, aprenent de l'error i afrontant les situacions d'incertesa com una oportunitat, per perseverar i gaudir del procés d’aprendre matemàtiques.",
        "criteris": {
          "1-2": [
            "7.1 Reconèixer les pròpies emocions en abordar nous reptes matemàtics, sent proactiu en la cerca de possibles solucions, demanant ajuda només després d’un primer intent.",
            "7.2. Expressar actituds positives davant de nous reptes matemàtics, com ara la predisposició i la receptivitat, entenent l’error com una oportunitat d’aprenentatge."
          ],
          "3-4": [
            "7.1 Identificar les pròpies emocions en abordar nous reptes matemàtics, sent proactiu en la cerca de possibles solucions, demanant ajuda, si cal, formulant clarament la pregunta.",
            "7.2. Mostrar actituds positives davant de nous reptes matemàtics, com ara l’esforç i la flexibilitat, entenent l’error com una oportunitat d’aprenentatge."
          ],
          "5-6": [
            "7.1 Regular les pròpies emocions i desenvolupar l’autoconfiança per abordar nous reptes matemàtics, identificant les pròpies fortaleses i superant les debilitats.",
            "7.2. Mantenir actituds positives davant de nous reptes matemàtics, com ara la perseverança i la flexibilitat, entenent l’error com una oportunitat d’aprenentatge."
          ]
        }
      },
      {
        "id": "CE8",
        "title": "Desenvolupar destreses socials",
        "description": "Desenvolupar destreses socials, participant activament en els equips de treball i reconeixent la diversitat i el valor de les aportacions dels altres, per compartir i construir coneixement matemàtic de manera col·lectiva.",
        "criteris": {
          "1-2": [
            "8.1. Participar en el treball en equip, tant en entorn presencial com virtual, escoltant les altres persones reconeixent les seves aportacions, en situacions en què es comparteixi i construeixi coneixement matemàtic de manera conjunta."
          ],
          "3-4": [
            "8.1 Col·laborar en el treball en equip, tant en entorn presencial com virtual, assumint-ne responsabilitats per construir coneixement matemàtic.",
            "8.2. Implicar-se amb el grup, amb empatia i respecte, compartint les pròpies opinions, maneres de fer, estratègies i pensaments tot escoltant i reconeixent les aportacions de les altres persones per enriquir l’aprenentatge propi i col·lectiu."
          ],
          "5-6": [
            "8.1 Col·laborar i aportar estratègies i raonaments matemàtics en el treball en equip, tant en entorn presencial com virtual, construint coneixement matemàtic de manera conjunta.",
            "8.2. Equilibrar les necessitats personals amb les del grup, des de l’empatia i el respecte, reconeixent la diversitat i el valor de les aportacions de les altres persones per generar nou aprenentatge matemàtic, tant individual com col·lectiu."
          ]
        }
      }
    ]
  }
};

export const COMPETENCIES_CATALUNYA_SECUNDARIA: Record<string, AreaCompetencies> = {
  "Educació en Valors Cívics i Ètics": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Indagar i analitzar aspectes vinculats a la construcció de la pròpia identitat i a les qüestions ètiques relatives al projecte vital, en un context social, analitzant de forma reflexiva i crítica la informació obtinguda",
      "description": "Indagar i analitzar aspectes vinculats a la construcció de la pròpia identitat i a les qüestions ètiques relatives al projecte vital, en un context social, analitzant de forma reflexiva i crítica la informació obtinguda, per promoure l'autoconeixement i la resolució de dilemes morals de forma autònoma i raonada.",
      "criteris": {
        "4t": [
          "1.1 Implicar-se en el procés d'autoconeixement i creixement personal mostrant-se actiu i proactiu davant les propostes educatives d'aula, de centre i de la comunitat.",
          "1.2 Construir un autoconcepte ajustat manifestant idees i propòsits personals realistes en el seu context educatiu i social.",
          "1.3 Analitzar de forma crítica i raonada la informació obtinguda per mitjà de diverses fonts aplicant criteris ètics de forma autònoma.",
          "1.4 Resoldre dilemes morals i altres situacions relatives al projecte vital amb responsabilitat i autonomia moral a través de la indagació.",
          "1.5 Avaluar de forma proactiva els riscos derivats de l'ús acrític i de l'abús de les xarxes socials com a factor de prevenció de situacions de ciberassetjament en diferents contextos."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Integrar de forma crítica normes i valors cívics i ètics i actuar i interactuar, a partir del reconeixement de la seva importància en la regulació de la vida individual i comunitària",
      "description": "Integrar de forma crítica normes i valors cívics i ètics i actuar i interactuar, a partir del reconeixement de la seva importància en la regulació de la vida individual i comunitària, per aplicar-los de forma efectiva i justificada en diferents contextos i per promoure una convivència pacífica, respectuosa, democràtica i compromesa amb el bé comú i una societat inclusiva.",
      "criteris": {
        "4t": [
          "2.1 Manifestar actituds que promouen una convivència pacífica, respectuosa, democràtica i compromesa amb el bé comú i una societat inclusiva.",
          "2.2 Manifestar actituds de ciutadania activa i democràtica a partir del coneixement del moviment associatiu i la participació respectuosa i constructiva en activitats de grup.",
          "2.3 Aplicar principis ètics en la presa de decisions col·lectives, en la planificació d'accions coordinades i en la resolució de problemes.",
          "2.4 Mostrar un compromís actiu amb el bé comú a través del diàleg raonat sobre qüestions ètiques d'actualitat.",
          "2.5 Reflexionar sobre el problema de la violència contra les dones i actuar a favor de la defensa d'una efectiva igualtat de gènere, a través de l'anàlisi de les mesures de prevenció de la desigualtat i la discriminació per raó de gènere.",
          "2.6 Analitzar críticament el paper de les institucions públiques, dels organismes internacionals i les organitzacions no governamentals en la promoció de la pau, dels drets humans, del respecte per la diversitat, de la solidaritat i de la cooperació entre nacions, a través del diàleg argumentatiu i raonat."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Integrar i avaluar les relacions sistèmiques entre l'individu, la societat i la natura i l'ecodependència de les activitats humanes, mitjançant la identificació i l'anàlisi de problemes ecosocials de rellevància",
      "description": "Integrar i avaluar les relacions sistèmiques entre l'individu, la societat i la natura i l'ecodependència de les activitats humanes, mitjançant la identificació i l'anàlisi de problemes ecosocials de rellevància, per desenvolupar hàbits i actituds èticament compromeses amb l'assoliment d'un estil de vida sostenible.",
      "criteris": {
        "4t": [
          "3.1 Avaluar la interconnexió i l'ecodependència de les activitats humanes adoptant compromisos i participant en la societat amb accions locals de millora, sostenibles, en relació amb els problemes ecosocials de més rellevància.",
          "3.2 Realitzar i promoure accions que afavoreixen l'assoliment dels objectius de desenvolupament sostenible a través d'acords i actuacions individuals i col·lectives de forma activa i compromesa.",
          "3.3 Desenvolupar actituds i valors de compromís basats en el respecte, cura i protecció de les persones, dels animals i del planeta, a través d'accions individuals i col·lectives, a escala local i global, vinculades al consum responsable i de productes de proximitat, a la mobilitat sostenible, a la preservació del patrimoni natural i al respecte per la diversitat etnicocultural."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Desenvolupar i mostrar una adequada estima de si mateix i de l'entorn, reconeixent i valorant les emocions i els sentiments propis i aliens",
      "description": "Desenvolupar i mostrar una adequada estima de si mateix i de l'entorn, reconeixent i valorant les emocions i els sentiments propis i aliens, per a l'assoliment d'una actitud empàtica, respectuosa i acurada envers un mateix, els altres i la natura.",
      "criteris": {
        "4t": [
          "4.1 Expressar de manera respectuosa i assertiva les pròpies emocions manifestant una ajustada autoestima en diferents contextos educatius i socials.",
          "4.2 Regular adequadament les pròpies emocions a partir de la identificació d'aquestes i de les dels altres, en situacions de participació tant individuals com col·lectives.",
          "4.3 Manifestar una actitud empàtica i respectuosa envers un mateix, els altres i la natura, en activitats realitzades en l'entorn escolar i comunitari.",
          "4.4 Avaluar situacions de conflicte i prendre-hi partit des d'un posicionament proactiu com a factor de prevenció de relacions abusives, de situacions d'assetjament i de maltractament entre iguals en el context educatiu."
        ]
      }
    }
  ]
},
  "Educació Física": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Adquirir un estil de vida actiu i saludable incorporant la pràctica d'activitats físiques i d'hàbits beneficiosos",
      "description": "Adquirir un estil de vida actiu i saludable incorporant la pràctica d'activitats físiques i d'hàbits beneficiosos per a la contribució del benestar físic, mental i social.",
      "criteris": {
        "1r-2n-3r": [
          "1.1 Executar activitats i exercicis orientats a l'adquisició d'un estil de vida actiu i saludable.",
          "1.2 Identificar els elements d'un pla de treball de la condició física a través de la pràctica motriu.",
          "1.3 Incorporar hàbits saludables (alimentació i hidratació, descans, educació postural, relaxació i higiene) valorant la millora integral.",
          "1.4 Aplicar els protocols d'actuació de prevenció i intervenció en accidents i tècniques de primers auxilis.",
          "1.5 Utilitzar recursos i aplicacions digitals per a la pràctica d'activitat física i l'adquisició d'hàbits saludables."
        ],
        "4t": [
          "1.1 Planificar la pràctica d'activitat física orientada a un estil de vida actiu i saludable.",
          "1.2 Dissenyar un pla de treball de la condició física en relació amb la salut d'acord amb les necessitats individuals.",
          "1.3 Aplicar hàbits saludables (alimentació i hidratació, descans, educació postural, relaxació i higiene) valorant la millora integral de la salut.",
          "1.4 Aplicar els protocols d'actuació de prevenció i intervenció en accidents i tècniques de primers auxilis.",
          "1.5 Utilitzar recursos i aplicacions digitals per a la pràctica d'activitat física i l'adquisició d'hàbits saludables."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Aplicar la tècnica, la tàctica i l'estratègia vinculades amb els jocs i els esports per a la resolució de situacions motrius",
      "description": "Aplicar la tècnica, la tàctica i l'estratègia vinculades amb els jocs i els esports per a la resolució de situacions motrius.",
      "criteris": {
        "1r-2n-3r": [
          "2.1 Executar habilitats motrius específiques i tècniques en reptes, formes jugades i joc reduït.",
          "2.2 Resoldre situacions motrius variades en activitats lúdiques, jocs modificats i esports aplicant habilitats tècniques, tàctiques i estratègiques."
        ],
        "4t": [
          "2.1 Executar habilitats motrius específiques i tècniques en reptes, formes jugades i joc real.",
          "2.2 Resoldre situacions motrius variades de jocs o esports aplicant habilitats tècniques, tàctiques i estratègiques.",
          "2.3 Organitzar esdeveniments o competicions esportives gestionant tots els aspectes essencials per a un funcionament adequat."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Utilitzar els recursos expressius com a mitjà de relació, comunicació i integració social",
      "description": "Utilitzar els recursos expressius com a mitjà de relació, comunicació i integració social per a l'autoconeixement.",
      "criteris": {
        "1r-2n-3r": [
          "3.1 Expressar emocions, sentiments i missatges mitjançant diferents tècniques d'expressió corporal.",
          "3.2 Representar composicions individuals o col·lectives amb i sense base musical utilitzant el cos com a eina d'expressió i comunicació.",
          "3.3 Prendre part en danses i jocs populars i tradicionals de diferents territoris valorant la seva influència cultural i social."
        ],
        "4t": [
          "3.1 Escenificar produccions artístico-expressives utilitzant diferents tècniques d'expressió corporal.",
          "3.2 Crear composicions individuals o col·lectives amb i sense base musical.",
          "3.3 Elaborar composicions artístiques integrant tècniques de circ."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Planificar activitats físiques a l'entorn, de manera sostenible i segura",
      "description": "Planificar activitats físiques a l'entorn, de manera sostenible i segura, per a l'ocupació i gaudi del temps de lleure.",
      "criteris": {
        "1r-2n-3r": [
          "4.1 Realitzar activitat física en el medi natural i urbà minimitzant l'empremta ecològica.",
          "4.2 Aplicar les normes de seguretat, l'equipament, eines i tècniques adequades de les activitats físiques en el medi natural i urbà.",
          "4.3 Utilitzar les possibilitats que ofereix l'entorn per a la pràctica activitat física i l'ocupació del temps de lleure de forma activa."
        ],
        "4t": [
          "4.1 Realitzar activitat física en el medi natural i urbà desenvolupant actuacions per a la seva conservació.",
          "4.2 Organitzar activitats fisicoesportives en el medi natural i urbà aplicant normes de seguretat i utilitzant l'equipament, eines i tècniques adequades.",
          "4.3 Gestionar la pròpia activitat física aprofitant les possibilitats del medi natural i urbà."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Adquirir actituds, valors i habilitats socials en la pràctica d'activitat física i esportiva",
      "description": "Adquirir actituds, valors i habilitats socials en la pràctica d'activitat física i esportiva per a la millora de la convivència i la cohesió social.",
      "criteris": {
        "1r-2n-3r": [
          "5.1 Aplicar els valors positius de l'esport en les activitats físiques i esportives valorant el joc per davant del resultat.",
          "5.2 Identificar emocions en la pràctica d'activitat física i esportiva.",
          "5.3 Mostrar actituds de respecte i escolta envers els altres independentment del seu nivell d'habilitat.",
          "5.4 Identificar estereotips i actuacions discriminatòries en situacions de pràctica esportiva."
        ],
        "4t": [
          "5.1 Aplicar els valors positius de l'esport en les activitats físiques i esportives valorant el joc per davant del resultat.",
          "5.2 Aplicar estratègies per a l'autoregulació emocional durant la pràctica d'activitat física i esportiva.",
          "5.3 Utilitzar habilitats socials en la resolució de conflictes fomentant la convivència i la cohesió social.",
          "5.4 Mostrar una actitud crítica davant dels estereotips i les actuacions discriminatòries de la societat en l'àmbit de l'activitat física i l'esport."
        ]
      }
    }
  ]
},
  "Matemàtiques": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Interpretar, modelitzar i resoldre situacions de la vida quotidiana, pròpies de les matemàtiques i d'altres àmbits del coneixement aplicant diferents estratègies i formes de raonament",
      "description": "Interpretar, modelitzar i resoldre situacions de la vida quotidiana, pròpies de les matemàtiques i d'altres àmbits del coneixement aplicant diferents estratègies i formes de raonament per explorar procediments i obtenir solucions.",
      "criteris": {
        "1r-2n-3r": [
          "1.1 Interpretar problemes matemàtics organitzant-ne la informació donada i comprenent les preguntes formulades.",
          "1.2 Elaborar representacions matemàtiques eficaces, amb recursos manipulables, gràfics i digitals, que condueixin a la comprensió i resolució de problemes i situacions de la vida quotidiana.",
          "1.3 Analitzar i seleccionar eines i estratègies elaborades valorant-ne i contrastant-ne l'eficàcia i idoneïtat de manera raonada en la resolució de problemes.",
          "1.4 Obtenir solucions matemàtiques d'un problema mobilitzant els coneixements necessaris i discriminant l'existència o no d'una o més solucions d'un problema."
        ],
        "4t": [
          "1.1 Interpretar problemes matemàtics organitzant-ne la informació donada i comprenent les preguntes formulades.",
          "1.2 Elaborar representacions matemàtiques eficaces, amb recursos manipulables, gràfics i digitals, que condueixin a la comprensió i resolució de problemes i situacions de la vida quotidiana.",
          "1.3 Analitzar i seleccionar eines i estratègies elaborades valorant-ne i contrastant-ne l'eficàcia i idoneïtat de manera raonada en la resolució de problemes.",
          "1.4 Obtenir solucions matemàtiques d'un problema mobilitzant els coneixements necessaris i discriminant l'existència o no d'una o més solucions d'un problema."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Argumentar la idoneïtat de les solucions d'un problema, avaluant les respostes obtingudes a través del raonament i la lògica matemàtica",
      "description": "Argumentar la idoneïtat de les solucions d'un problema, avaluant les respostes obtingudes a través del raonament i la lògica matemàtica, per verificar la seva validesa i generar noves preguntes i reptes.",
      "criteris": {
        "1r-2n-3r": [
          "2.1 Construir i expressar amb coherència idees i raonaments que permetin justificar la validesa de les solucions, processos i conclusions des de diferents perspectives (de gènere, de sostenibilitat, de consum responsable...).",
          "2.2 Generar preguntes a partir d'arguments matemàtics que permetin plantejar nous reptes relacionats amb el problema resolt."
        ],
        "4t": [
          "2.1 Construir i expressar amb coherència idees i raonaments que permetin justificar la validesa de les solucions, processos i conclusions des de diferents perspectives (de gènere, de sostenibilitat, de consum responsable...).",
          "2.2 Generar preguntes a partir d'arguments matemàtics que permetin plantejar nous reptes relacionats amb el problema resolt."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Formular conjectures senzilles o problemes, utilitzant el raonament i l'argumentació, la creativitat i les eines tecnològiques",
      "description": "Formular conjectures senzilles o problemes, utilitzant el raonament i l'argumentació, la creativitat i les eines tecnològiques, per integrar i generar nou coneixement matemàtic.",
      "criteris": {
        "1r-2n-3r": [
          "3.1 Plantejar preguntes en contextos diversos que es puguin respondre a través del coneixement matemàtic.",
          "3.2 Fer conjectures matemàtiques senzilles de manera autònoma i raonada en un context en què l'alumne/a tingui llibertat creativa fent ús, si cal, d'eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.)."
        ],
        "4t": [
          "3.1 Plantejar preguntes en contextos diversos que es puguin respondre a través del coneixement matemàtic.",
          "3.2 Fer conjectures matemàtiques senzilles de manera autònoma i raonada en un context en què l'alumne/a tingui llibertat creativa fent ús, si cal, d'eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.).",
          "3.3 Proposar problemes de manera autònoma, creativa i raonada en un context."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Utilitzar el pensament computacional, organitzant dades, descomponent en parts, reconeixement de patrons, interpretant, modificant, generalitzant i creant algoritmes",
      "description": "Utilitzar el pensament computacional, organitzant dades, descomponent en parts, reconeixement de patrons, interpretant, modificant, generalitzant i creant algoritmes per modelitzar situacions i resoldre de problemes de forma eficient.",
      "criteris": {
        "1r-2n-3r": [
          "4.1 Descompondre un problema o situació de la vida quotidiana en diferents parts, abordant-les d'una en una per poder trobar la solució global amb dispositius digitals.",
          "4.2 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
          "4.3 Trobar els principis que generen els patrons d'un problema descartant les dades irrellevants tot identificant les parts més importants.",
          "4.4 Generar instruccions pas a pas per resoldre un problema i d'altres similars provant i duent a terme possibles solucions amb dispositius digitals."
        ],
        "4t": [
          "4.1 Descompondre un problema o situació de la vida quotidiana en diferents parts, abordant-les d'una en una per poder trobar la solució global amb dispositius digitals.",
          "4.2 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
          "4.3 Trobar els principis que generen els patrons d'un problema descartant les dades irrellevants tot identificant les parts més importants.",
          "4.4 Generar instruccions pas a pas per resoldre un problema i d'altres similars provant i duent a terme possibles solucions amb dispositius digitals."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Connectar diferents elements matemàtics relacionant conceptes, procediments, arguments i models",
      "description": "Connectar diferents elements matemàtics relacionant conceptes, procediments, arguments i models per desenvolupar una visió de les matemàtiques com un tot integrat.",
      "criteris": {
        "1r-2n-3r": [
          "5.1 Identificar i usar les connexions entre diferents representacions d'un mateix concepte matemàtic quan s'extreu informació d'una d'aquestes per aplicar-la a l'altra.",
          "5.2 Reconèixer i relacionar connexions entre diferents conceptes i coneixements matemàtics a través de situacions de la vida quotidiana per treure'n conclusions i tenir una visió integrada de les matemàtiques."
        ],
        "4t": [
          "5.1 Identificar i usar les connexions entre diferents representacions d'un mateix concepte matemàtic quan s'extreu informació d'una d'aquestes per aplicar-la a l'altra.",
          "5.2 Reconèixer i relacionar connexions entre diferents conceptes i coneixements matemàtics a través de situacions de la vida quotidiana per treure'n conclusions i tenir una visió integrada de les matemàtiques."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Vincular i contextualitzar les matemàtiques amb altres àrees de coneixement, interrelacionant conceptes i procediments",
      "description": "Vincular i contextualitzar les matemàtiques amb altres àrees de coneixement, interrelacionant conceptes i procediments, per resoldre problemes i desenvolupar la capacitat crítica, creativa i innovadora en situacions diverses.",
      "criteris": {
        "1r-2n-3r": [
          "6.1 Reconèixer i utilitzar les matemàtiques presents en la vida quotidiana usant els processos inherents a la investigació científica i matemàtica: inferir, mesurar, comunicar, classificar, predir…, en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.2 Reconèixer i utilitzar les connexions entre les matemàtiques i altres matèries, en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.3 Identificar i valorar l'aportació actual i històrica de les matemàtiques al progrés de la humanitat, també des d'una perspectiva de gènere, davant dels reptes que planteja la societat actual.",
          "6.4 Desenvolupar l'esperit crític i el potencial creatiu de la matemàtica argumentant propostes innovadores en contextos científics, tecnològics, socials, artístics i culturals."
        ],
        "4t": [
          "6.1 Reconèixer i utilitzar les matemàtiques presents en la vida quotidiana usant els processos inherents a la investigació científica i matemàtica: inferir, mesurar, comunicar, classificar, predir…, en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.2 Reconèixer i utilitzar les connexions entre les matemàtiques i altres matèries, en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.3 Identificar i valorar l'aportació actual i històrica de les matemàtiques al progrés de la humanitat, també des d'una perspectiva de gènere, davant dels reptes que planteja la societat actual.",
          "6.4 Desenvolupar l'esperit crític i el potencial creatiu de la matemàtica argumentant propostes innovadores en contextos científics, tecnològics, socials, artístics i culturals."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Comunicar i representar, de forma individual i col·lectiva, conceptes, procediments i resultats matemàtics usant el llenguatge oral, escrit, gràfic, multimodal i la terminologia matemàtica apropiada",
      "description": "Comunicar i representar, de forma individual i col·lectiva, conceptes, procediments i resultats matemàtics usant el llenguatge oral, escrit, gràfic, multimodal i la terminologia matemàtica apropiada, per donar significat i permanència a les idees matemàtiques.",
      "criteris": {
        "1r-2n-3r": [
          "7.1 Comunicar informació de manera organitzada, utilitzant el llenguatge matemàtic adequat, oralment i per escrit, per a descriure, explicar justificar raonaments, procediments i conclusions.",
          "7.2 Representar conceptes, procediments i resultats matemàtics amb claredat, utilitzant diferents eines i formes d'expressió, com per exemple a través del dibuix, la fotografia, els vídeos, les obres visuals i musicals, per visualitzar idees i estructurar processos matemàtics.",
          "7.3 Dialogar entre iguals i debatre idees matemàtiques per descriure, explicar i justificar raonaments, processos i conclusions."
        ],
        "4t": [
          "7.1 Comunicar informació de manera organitzada, utilitzant el llenguatge matemàtic adequat, oralment i per escrit, per a descriure, explicar justificar raonaments, procediments i conclusions.",
          "7.2 Representar conceptes, procediments i resultats matemàtics amb claredat, utilitzant diferents eines i formes d'expressió, com per exemple a través del dibuix, la fotografia, els vídeos, les obres visuals i musicals, per visualitzar idees i estructurar processos matemàtics.",
          "7.3 Dialogar entre iguals i debatre idees matemàtiques per descriure, explicar i justificar raonaments, processos i conclusions."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Desenvolupar destreses personals, com l'autorregulació, que ajudin a identificar i gestionar emocions, aprenent de l'error i afrontant les situacions d'incertesa com una oportunitat",
      "description": "Desenvolupar destreses personals, com l'autorregulació, que ajudin a identificar i gestionar emocions, aprenent de l'error i afrontant les situacions d'incertesa com una oportunitat, per perseverar i gaudir del procés d'aprendre matemàtiques.",
      "criteris": {
        "1r-2n-3r": [
          "8.1 Gestionar les pròpies emocions i desenvolupar l'autoconfiança per encarar nous reptes matemàtics perseverant en la seva resolució en qualsevol situació d'aprenentatge proposada.",
          "8.2 Tenir consciència que s'està aprenent i de com s'està aprenent en qualsevol situació d'aprenentatge proposada.",
          "8.3 Identificar els errors propis i expressar de manera raonada quin és el motiu que els provoquen (conceptuals, de procediment, d'estratègia...), en la resolució de reptes o problemes, perseverant en la seva resolució.",
          "8.4 Participar de la pròpia avaluació gestionant estratègies que ajudin a superar les dificultats, en la revisió de les produccions realitzades.",
          "8.5 Apreciar el potencial creatiu de la matemàtica així com la seva capacitat de generar harmonia i bellesa, en les creacions i produccions realitzades."
        ],
        "4t": [
          "8.1 Gestionar les pròpies emocions i desenvolupar l'autoconfiança per encarar nous reptes matemàtics perseverant en la seva resolució en qualsevol situació d'aprenentatge proposada.",
          "8.2 Tenir consciència que s'està aprenent i de com s'està aprenent en qualsevol situació d'aprenentatge proposada.",
          "8.3 Identificar els errors propis i expressar de manera raonada quin és el motiu que els provoquen (conceptuals, de procediment, d'estratègia...), en la resolució de reptes o problemes, perseverant en la seva resolució.",
          "8.4 Participar de la pròpia avaluació gestionant estratègies que ajudin a superar les dificultats, en la revisió de les produccions realitzades.",
          "8.5 Apreciar el potencial creatiu de la matemàtica així com la seva capacitat de generar harmonia i bellesa, en les creacions i produccions realitzades."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Desenvolupar destreses socials, com la cooperació, participant activament en equips de treball inclusius reconeixent la diversitat i el valor de les aportacions dels altres",
      "description": "Desenvolupar destreses socials, com la cooperació, participant activament en equips de treball inclusius reconeixent la diversitat i el valor de les aportacions dels altres, per compartir i construir coneixement matemàtic de manera col·lectiva.",
      "criteris": {
        "1r-2n-3r": [
          "9.1 Cooperar en el treball en equip tant en entorns presencials com virtuals, escoltant els altres i valorant les seves aportacions, respectant la perspectiva de gènere, en situacions en què es comparteixi i construeixi coneixement de manera conjunta.",
          "9.2 Col·laborar activament amb els altres, arribant a acords i complint-los, per assolir els objectius del grup relatius a la construcció del coneixement matemàtic, valorant l'èxit col·lectiu com una estratègia de millora personal.",
          "9.3 Equilibrar les necessitats personals amb les del grup, des de l'empatia i el respecte, reconeixent la diversitat i el valor de les aportacions dels altres per generar nou aprenentatge matemàtic, tant individual com col·lectiu.",
          "9.4 Ajudar a identificar errors i dificultats d'aprenentatge de les companyes i companys fent aportacions constructives i concretes que puguin ajudar a superar-los i a millorar."
        ],
        "4t": [
          "9.1 Cooperar en el treball en equip tant en entorns presencials com virtuals, escoltant els altres i valorant les seves aportacions, respectant la perspectiva de gènere, en situacions en què es comparteixi i construeixi coneixement de manera conjunta.",
          "9.2 Col·laborar activament amb els altres, arribant a acords i complint-los, per assolir els objectius del grup relatius a la construcció del coneixement matemàtic, valorant l'èxit col·lectiu com una estratègia de millora personal.",
          "9.3 Equilibrar les necessitats personals amb les del grup, des de l'empatia i el respecte, reconeixent la diversitat i el valor de les aportacions dels altres per generar nou aprenentatge matemàtic, tant individual com col·lectiu.",
          "9.4 Ajudar a identificar errors i dificultats d'aprenentatge de les companyes i companys fent aportacions constructives i concretes que puguin ajudar a superar-los i a millorar."
        ]
      }
    }
  ]
},
  "Llengua Estrangera": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Descriure i valorar la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe, pluricultural i intercultural",
      "description": "Descriure i valorar la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe, pluricultural i intercultural, per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics i valorar aquesta diversitat com a font de riquesa cultural.",
      "criteris": {
        "1r-2n": [
          "1.1 Acceptar i adequar-se a la diversitat lingüística, cultural i artística pròpia de països on es parla la llengua estrangera com a font d'enriquiment personal, mostrant interès per compartir elements culturals i lingüístics que fomentin la sostenibilitat i la democràcia.",
          "1.2 Participar de manera empàtica i respectuosa en situacions interculturals, construint vincles entre les diferents llengües i cultures, rebutjant qualsevol tipus de discriminació, prejudici i estereotip en contextos comunicatius quotidians.",
          "1.3 Aplicar, de forma guiada, estratègies per explicar i apreciar la diversitat lingüística, cultural i artística."
        ],
        "3r-4t": [
          "1.1 Valorar críticament la diversitat lingüística, cultural i artística pròpia de països on es parla la llengua estrangera, en relació amb els drets humans, i adequar-se a aquesta diversitat, tot afavorint el desenvolupament d'una cultura compartida i una ciutadania compromesa amb la sostenibilitat i els valors democràtics.",
          "1.2 Participar de manera adequada, empàtica i respectuosa en situacions interculturals, construint vincles entre les diferents llengües i cultures, rebutjant qualsevol tipus de discriminació, prejudici i estereotip en contextos comunicatius quotidians, i proposant vies de solució a aquells factors socioculturals que dificulten la comunicació.",
          "1.3 Aplicar estratègies per defensar i apreciar la diversitat lingüística, cultural i artística."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Comprendre i interpretar textos orals i multimodals, en la llengua estàndard, recollint el sentit general i la informació més rellevant, la seva forma i el seu contingut",
      "description": "Comprendre i interpretar textos orals i multimodals, en la llengua estàndard, recollint el sentit general i la informació més rellevant, la seva forma i el seu contingut, per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.",
      "criteris": {
        "1r-2n": [
          "2.1 Interpretar i analitzar el sentit global i la informació específica i explícita de textos orals i multimodals breus i senzills sobre temes freqüents i quotidians, de rellevància personal i pròxims a la seva experiència, propis dels àmbits de les relacions interpersonals, de l'aprenentatge, dels mitjans de comunicació i de la ficció, expressats de forma clara i en la llengua estàndard a través de diversos suports.",
          "2.2 Seleccionar, organitzar i aplicar de manera guiada les estratègies i els coneixements més adequats en situacions comunicatives quotidianes per comprendre el sentit general, la informació essencial i els detalls més rellevants dels textos; interpretar elements no verbals, i cercar i seleccionar informació."
        ],
        "3r-4t": [
          "2.1 Extreure i analitzar el sentit global i les idees principals, i seleccionar informació pertinent de textos orals i multimodals sobre temes quotidians, de rellevància personal o d'interès públic propers a la seva experiència expressats de manera clara i en la llengua estàndard a través de diversos suports.",
          "2.2 Interpretar i valorar el contingut i els trets discursius de textos progressivament més complexos propis dels àmbits de les relacions interpersonals, dels mitjans de comunicació social i de l'aprenentatge, i també de textos literaris adequats al nivell de maduresa de l'alumnat.",
          "2.3 Seleccionar, organitzar i aplicar les estratègies i els coneixements més adequats en cada situació comunicativa per comprendre el sentit general, la informació essencial i els detalls més rellevants dels textos; inferir significats i interpretar elements no verbals, i cercar, seleccionar i gestionar informació veraç."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals variades, amb autonomia",
      "description": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments i conceptes, construir coneixement i establir vincles personals.",
      "criteris": {
        "1r-2n": [
          "3.1 Expressar oralment textos breus, senzills, estructurats, comprensibles i adequats a la situació comunicativa sobre temes quotidians i freqüents, de rellevància per a l'alumnat, per tal de descriure, narrar i informar sobre temes concrets, en diferents suports, utilitzant de forma guiada recursos verbals i no verbals, així com estratègies de planificació i control de la producció.",
          "3.2 Aplicar de forma guiada coneixements i estratègies per planificar, produir i revisar textos comprensibles, coherents i adequats a les intencions comunicatives, les característiques contextuals i la tipologia textual, amb ajuda dels recursos físics o digitals més adequats en funció de la tasca i les necessitats de cada moment, tenint en compte el destinatari del text.",
          "3.3 Participar en situacions interactives breus i senzilles sobre temes quotidians, de rellevància personal i pròxims a la seva experiència, a través de diversos suports, utilitzant recursos com ara la repetició, el ritme pausat o el llenguatge no verbal, i mostrant empatia i respecte per la cortesia lingüística i l'etiqueta digital, així com per les diferents necessitats, idees, inquietuds, iniciatives i motivacions dels interlocutors.",
          "3.4 Utilitzar, de forma guiada i en entorns propers, estratègies adequades per iniciar, mantenir i acabar la comunicació, prendre i cedir la paraula, sol·licitar i formular aclariments i explicacions."
        ],
        "3r-4t": [
          "3.1 Expressar oralment textos senzills, estructurats, comprensibles, coherents i adequats a la situació comunicativa sobre temes quotidians, de rellevància personal o d'interès públic proper a la seva experiència, per tal de descriure, narrar, argumentar i informar, en diferents suports, utilitzant recursos verbals i no verbals, així com estratègies de planificació, control, compensació i cooperació.",
          "3.2 Aplicar coneixements i estratègies per planificar, produir, revisar i cooperar en l'elaboració de textos coherents, cohesionats i adequats a les intencions comunicatives, les característiques contextuals, els aspectes socioculturals i la tipologia textual, usant els recursos físics o digitals més adequats en funció de la tasca i de les necessitats de l'audiència o el destinatari del text.",
          "3.3 Participar i col·laborar activament, a través de diversos suports, en situacions interactives sobre temes quotidians, de rellevància personal o d'interès públic propers a la seva experiència, mostrant iniciativa, empatia i respecte per la cortesia lingüística i l'etiqueta digital, així com per les diferents necessitats, idees, inquietuds, iniciatives i motivacions dels interlocutors.",
          "3.4 Utilitzar estratègies adequades per iniciar, mantenir i acabar la comunicació, prendre i cedir la paraula, sol·licitar i formular aclariments i explicacions, reformular, comparar i contrastar, resumir, col·laborar, debatre, resoldre problemes i gestionar situacions compromeses."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Comprendre, interpretar i analitzar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals, reconeixent el sentit global, les idees principals i secundàries, identificant la intenció de l'emissor, reflexionant sobre el contingut i la forma i avaluant-ne la qualitat i fiabilitat",
      "description": "Comprendre, interpretar i analitzar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals, reconeixent el sentit global, les idees principals i secundàries, identificant la intenció de l'emissor, reflexionant sobre el contingut i la forma i avaluant-ne la qualitat i fiabilitat, per tal de construir coneixement i donar resposta a necessitats i interessos comunicatius diversos.",
      "criteris": {
        "1r-2n": [
          "4.1 Comprendre i interpretar el sentit global, l'estructura, la informació més rellevant i la intenció de l'emissor de textos escrits i multimodals senzills de diferents àmbits que responguin a diferents propòsits de lectura, realitzant-ne les inferències necessàries.",
          "4.2 Valorar el contingut i la forma de textos escrits i multimodals senzills avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "3r-4t": [
          "4.1 Comprendre i interpretar el sentit global, l'estructura, la informació més rellevant i la intenció de l'emissor de textos escrits i multimodals de certa complexitat, que responguin a diferents propòsits de lectura, realitzant-ne les inferències necessàries.",
          "4.2 Valorar críticament el contingut i la forma de textos escrits i multimodals de certa complexitat avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Produir textos escrits i multimodals amb adequació, coherència i cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma",
      "description": "Produir textos escrits i multimodals amb adequació, coherència i cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma, i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.",
      "criteris": {
        "1r-2n": [
          "5.1 Organitzar i redactar textos breus i comprensibles, amb claredat, coherència, cohesió i adequació a la situació comunicativa proposada, seguint pautes establertes, a través d'eines analògiques i digitals, sobre assumptes quotidians i freqüents, de rellevància per a l'alumnat i pròxims a la seva experiència.",
          "5.2 Aplicar de forma guiada coneixements i estratègies per planificar, produir i revisar textos comprensibles, coherents i adequats a les intencions comunicatives, les característiques contextuals i la tipologia textual, usant, de manera progressivament autònoma, els recursos físics o digitals més adequats en funció de la tasca i les necessitats de cada moment, tenint en compte la persona a qui va dirigit el text."
        ],
        "3r-4t": [
          "5.1 Redactar i difondre textos d'extensió mitjana amb acceptable claredat, coherència, cohesió, correcció i adequació a la situació comunicativa proposada, a la tipologia textual i a les eines analògiques i digitals utilitzades, sobre assumptes quotidians, de rellevància personal o d'interès públic pròxims a la seva experiència, respectant la propietat intel·lectual i evitant el plagi.",
          "5.2 Aplicar coneixements i estratègies per a planificar, produir, revisar i cooperar en l'elaboració de textos coherents, cohesionats i adequats a les intencions comunicatives, les característiques contextuals, els aspectes socioculturals i la tipologia textual, usant els recursos físics o digitals més adequats en funció de la tasca i de les necessitats de l'audiència o del lector potencial a qui s'adreça el text."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Cercar, seleccionar i contrastar informació procedent de diverses fonts de manera progressivament autònoma, avaluant-ne la fiabilitat i pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació i integrar-la i transformar-la en coneixement",
      "description": "Cercar, seleccionar i contrastar informació procedent de diverses fonts de manera progressivament autònoma, avaluant-ne la fiabilitat i pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació i integrar-la i transformar-la en coneixement, per comunicar-la, adoptant un punt de vista crític, personal i respectuós amb la propietat intel·lectual.",
      "criteris": {
        "1r-2n": [
          "6.1 Aplicar estratègies de cerca d'informació (localització, selecció i contrast), en diferents fonts, incloses les digitals, calibrant-ne la fiabilitat i pertinència en funció dels objectius de lectura, sobre temes d'interès acadèmic, personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant críticament el resultat de la cerca.",
          "6.2 Elaborar treballs d'investigació i comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d'un procés d'investigació individual o grupal, organitzant la informació, integrant-la en esquemes propis i reelaborant-la, i adoptant un punt de vista crític i respectuós amb els principis de propietat intel·lectual, sobre temes d'interès acadèmic, personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ],
        "3r-4t": [
          "6.1 Aplicar estratègies de cerca d'informació (localització, selecció i contrast), en diferents fonts, incloses les digitals, calibrant-ne la fiabilitat i pertinència en funció dels objectius de lectura, sobre temes d'interès acadèmic, personal, ecològic i social, de forma autònoma, a la xarxa i a la biblioteca, valorant críticament el resultat de la cerca.",
          "6.2 Elaborar treballs d'investigació i comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d'un procés d'investigació, individual o grupal, organitzant la informació, integrant-la en esquemes propis i reelaborant-la, i adoptant un punt de vista crític i respectuós amb els principis de propietat intel·lectual, sobre temes d'interès acadèmic, personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a la diversitat, complexitat i qualitat de les obres",
      "description": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a la diversitat, complexitat i qualitat de les obres, i compartir experiències de lectura per construir la pròpia identitat lectora i gaudir-ne de la dimensió social de la lectura.",
      "criteris": {
        "1r-2n": [
          "7.1 Triar i llegir textos i obres prèviament seleccionats a partir dels propis gustos, interessos i necessitats que permetin crear el propi itinerari lector.",
          "7.2 Compartir l'experiència de lectura en suports diversos, tot relacionant el sentit de l'obra amb la pròpia experiència biogràfica i lectora."
        ],
        "3r-4t": [
          "7.1 Llegir de manera autònoma textos i obres seleccionats en funció dels propis gustos, interessos i necessitats, i deixar constància del progrés del propi itinerari lector i cultural explicant els criteris de selecció de les lectures, les formes d'accés a la cultura literària i l'experiència de lectura.",
          "7.2 Compartir l'experiència de lectura en suports diversos, tot relacionant el sentit de l'obra amb la pròpia experiència biogràfica, lectora i cultural."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Mediar entre diferents llengües, fent servir estratègies i coneixements senzills orientats a explicar conceptes o simplificar missatges",
      "description": "Mediar entre diferents llengües, fent servir estratègies i coneixements senzills orientats a explicar conceptes o simplificar missatges, transmetre informació de manera eficaç, clara i responsable.",
      "criteris": {
        "1r-2n": [
          "8.1 Inferir i explicar textos, conceptes i comunicacions breus i senzilles en situacions de diversitat lingüística, social i cultural, mostrant respecte i empatia per les i els interlocutors i per les llengües emprades, i interès per participar en la solució de problemes d'intercomprensió i d'entesa en l'entorn proper.",
          "8.2 Aplicar, de forma guiada, estratègies que ajudin a crear ponts i facilitin la comprensió i producció d'informació i la comunicació, adequades a les intencions comunicatives, utilitzant recursos i suports físics o digitals en funció de les necessitats de cada moment."
        ],
        "3r-4t": [
          "8.1 Inferir i explicar textos, conceptes i comunicacions breus i senzilles en situacions de diversitat lingüística, social i cultural, mostrant respecte i empatia per les i els interlocutors i per les llengües emprades, i participant en la solució de problemes d'intercomprensió i d'entesa en l'entorn.",
          "8.2 Aplicar estratègies que ajudin a crear ponts, facilitin la comunicació i serveixin per explicar i simplificar textos, conceptes i missatges, i que siguin adequades a les intencions comunicatives, les característiques contextuals i la tipologia textual, usant recursos i suports físics o digitals en funció de les necessitats de cada moment."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Ampliar i usar els repertoris lingüístics personals entre diferents llengües, reflexionant de manera crítica sobre el seu funcionament i prenent consciència de les estratègies i coneixements propis",
      "description": "Ampliar i usar els repertoris lingüístics personals entre diferents llengües, reflexionant de manera crítica sobre el seu funcionament i prenent consciència de les estratègies i coneixements propis, per millorar la resposta a necessitats comunicatives concretes.",
      "criteris": {
        "1r-2n": [
          "9.1 Comparar i contrastar les similituds i diferències entre diferents llengües reflexionant de manera progressivament autònoma sobre el seu funcionament.",
          "9.2 Utilitzar i diferenciar els coneixements i estratègies de millora de la pròpia capacitat de comunicar i d'aprendre la llengua estrangera, amb suport d'altres participants i de suports analògics i digitals.",
          "9.3 Identificar i registrar, seguint models, els progressos i dificultats d'aprenentatge de la llengua estrangera, seleccionant de forma guiada les estratègies més eficaces per superar aquestes dificultats i progressar en el seu aprenentatge, realitzant activitats d'autoavaluació i coavaluació, fent-los explícits i compartint-los."
        ],
        "3r-4t": [
          "9.1 Comparar i argumentar les similituds i diferències entre diferents llengües reflexionant de manera progressivament autònoma sobre el seu funcionament.",
          "9.2 Utilitzar de forma creativa estratègies i coneixements de millora de la pròpia capacitat de comunicar i d'aprendre la llengua estrangera, amb suport d'altres participants i de suports analògics i digitals.",
          "9.3 Registrar i reflexionar sobre els progressos i dificultats d'aprenentatge de la llengua estrangera, seleccionant les estratègies més eficaces per superar aquestes dificultats i consolidar el seu aprenentatge, realitzant activitats de planificació del propi aprenentatge, autoavaluació i coavaluació, fent-los explícits i compartint-los."
        ]
      }
    },
    {
      "id": "CE10",
      "title": "Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant els abusos de poder a través de la paraula",
      "description": "Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant els abusos de poder a través de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge.",
      "criteris": {
        "1r-2n": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder a través de la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals que regeixen la comunicació entre les persones.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i la cerca de consensos tant en l'àmbit personal com educatiu i social."
        ],
        "3r-4t": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder a través de la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals de la comunicació.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i la cerca de consensos, tant en l'àmbit personal com educatiu i social."
        ]
      }
    }
  ]
},
  "Aranès i literatura a l'Aran": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Descriure i valorar la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural",
      "description": "Descriure i valorar la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural, per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics, i valorar aquesta diversitat com a font de riquesa cultural.",
      "criteris": {
        "1r-2n": [
          "1.1 Reconèixer la llengua catalana i la llengua castellana i llurs varietats dialectals, així com la resta de llengües de l'Estat espanyol i les llengües d'origen de l'alumnat, identificant-ne algunes nocions bàsiques i contrastant alguns dels seus trets en manifestacions orals, escrites i multimodals.",
          "1.2 Identificar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, a partir de l'observació de la diversitat lingüística de l'entorn."
        ],
        "3r-4t": [
          "1.1 Reconèixer i valorar la llengua catalana i la llengua castellana i llurs varietats dialectals, diferenciant-ne els trets sociolectals i de registre, a partir de l'explicació del seu origen o el seu desenvolupament històric i sociolingüístic, i contrastant aspectes lingüístics i discursius en manifestacions orals, escrites i multimodals.",
          "1.2 Identificar i qüestionar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, a partir de la indagació i la reflexió sobre els drets lingüístics individuals i col·lectius, així com la reflexió sobre fenòmens de contacte entre llengües."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Comprendre i interpretar textos orals i multimodals recollint el sentit general i la informació més rellevant, la seva forma i el seu contingut",
      "description": "Comprendre i interpretar textos orals i multimodals recollint el sentit general i la informació més rellevant, la seva forma i el seu contingut, per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.",
      "criteris": {
        "1r-2n": [
          "2.1 Comprendre el sentit global, l'estructura, la informació més rellevant en funció de les necessitats comunicatives i la intenció de l'emissor, de textos orals i multimodals senzills de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals senzills, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "3r-4t": [
          "2.1 Comprendre el sentit global, l'estructura, la informació més rellevant en funció de les necessitats comunicatives i la intenció de l'emissor, de textos orals i multimodals de certa complexitat de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals de certa complexitat, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius i participar en interaccions orals variades, amb autonomia",
      "description": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments i conceptes, construir coneixement i establir vincles personals.",
      "criteris": {
        "1r-2n": [
          "3.1 Realitzar narracions i exposicions orals senzilles amb diferents graus de planificació sobre temes d'interès personal, social i educatiu ajustant-se a les convencions pròpies dels diversos gèneres discursius, amb fluïdesa, coherència i el registre adequat, en diferents suports i utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals informals, en el treball en equip i en situacions orals formals de caràcter dialogat, amb actituds d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ],
        "3r-4t": [
          "3.1 Realitzar exposicions i argumentacions orals d'una certa extensió i complexitat amb diferents graus de planificació sobre temes d'interès personal, social, educatiu i professional ajustant-se a les convencions pròpies dels diversos gèneres discursius, amb fluïdesa, coherència i el registre adequat en diferents suports, utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals informals, en el treball en equip i en situacions orals formals de caràcter dialogat, amb actituds d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Comprendre, interpretar i analitzar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals reconeixent el sentit global i les idees principals i secundàries, identificant-ne la intenció de l'emissor, reflexionant-ne sobre el contingut i la forma i avaluar-ne la qualitat i fiabilitat",
      "description": "Comprendre, interpretar i analitzar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals reconeixent el sentit global i les idees principals i secundàries, identificant-ne la intenció de l'emissor, reflexionant-ne sobre el contingut i la forma i avaluar-ne la qualitat i fiabilitat, per tal de construir coneixement i donar resposta a necessitats i interessos comunicatius diversos.",
      "criteris": {
        "1r-2n": [
          "4.1 Comprendre i interpretar el sentit global, l'estructura, la informació més rellevant i la intenció de l'emissor de textos escrits i multimodals senzills de diferents àmbits que responguin a diferents propòsits de lectura, realitzant-ne les inferències necessàries.",
          "4.2 Valorar el contingut i la forma de textos escrits i multimodals senzills avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "3r-4t": [
          "4.1 Comprendre i interpretar el sentit global, l'estructura, la informació més rellevant i la intenció de l'emissor de textos escrits i multimodals de certa complexitat, que responguin a diferents propòsits de lectura, realitzant-ne les inferències necessàries.",
          "4.2 Valorar críticament el contingut i la forma de textos escrits i multimodals de certa complexitat avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Produir textos escrits i multimodals amb adequació, coherència, cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma",
      "description": "Produir textos escrits i multimodals amb adequació, coherència, cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.",
      "criteris": {
        "1r-2n": [
          "5.1 Planificar la redacció de textos escrits i multimodals senzills, atesa la situació comunicativa, destinatari, propòsit i canal; redactar esborranys i revisar-los amb l'ajuda del diàleg entre iguals i instruments de consulta, i presentar un text final coherent, cohesionat i amb el registre adequat.",
          "5.2 Incorporar procediments bàsics per enriquir els textos, tenint en compte aspectes discursius, lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical."
        ],
        "3r-4t": [
          "5.1 Planificar la redacció d'escrits i multimodals, de certa extensió i complexitat, atesa la situació comunicativa, destinatari, propòsit i canal; redactar esborranys i revisar-los amb l'ajuda del diàleg entre iguals i instruments de consulta, i presentar un text final coherent, cohesionat i amb el registre adequat.",
          "5.2 Incorporar procediments per enriquir els textos tenint en compte aspectes discursius, lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Cercar, seleccionar i contrastar informació procedent de diferents fonts de manera progressivament autònoma, avaluant-ne la fiabilitat i pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació",
      "description": "Cercar, seleccionar i contrastar informació procedent de diferents fonts de manera progressivament autònoma, avaluant-ne la fiabilitat i pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació, i integrar-la i transformar-la en coneixement, per comunicar-la, adoptant un punt de vista crític, personal i respectuós amb la propietat intel·lectual.",
      "criteris": {
        "1r-2n": [
          "6.1 Aplicar estratègies de cerca d'informació (localització, selecció i contrast), en diferents fonts, incloses les digitals, calibrant-ne la fiabilitat i pertinència en funció dels objectius de lectura, sobre temes d'interès acadèmic, personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant críticament el resultat de la cerca.",
          "6.2 Elaborar treballs d'investigació i comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d'un procés d'investigació individual o grupal, organitzant la informació, integrant-la en esquemes propis i reelaborant-la, i adoptant un punt de vista crític i respectuós amb els principis de propietat intel·lectual, sobre temes d'interès acadèmic, personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ],
        "3r-4t": [
          "6.1 Aplicar estratègies de cerca d'informació (localització, selecció i contrast), en diferents fonts, incloses les digitals, calibrant-ne la fiabilitat i pertinència en funció dels objectius de lectura, sobre temes d'interès acadèmic, personal, ecològic i social, de forma autònoma, a la xarxa i a les biblioteques, valorant críticament el resultat de la cerca.",
          "6.2 Elaborar treballs d'investigació i comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d'un procés d'investigació, individual o grupal, organitzant la informació, integrant-la en esquemes propis i reelaborant-la, i adoptant un punt de vista crític i respectuós amb els principis de propietat intel·lectual, sobre temes d'interès acadèmic, personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres",
      "description": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres, i compartir experiències de lectura, per construir la pròpia identitat lectora i gaudir de la dimensió social de la lectura.",
      "criteris": {
        "1r-2n": [
          "7.1 Triar i llegir textos i obres prèviament seleccionats a partir dels propis gustos, interessos i necessitats que permetin crear el propi itinerari lector.",
          "7.2 Compartir l'experiència de lectura en suports diversos, tot relacionant el sentit de l'obra amb la pròpia experiència biogràfica i lectora."
        ],
        "3r-4t": [
          "7.1 Llegir de manera autònoma textos i obres seleccionats en funció dels propis gustos, interessos i necessitats, i deixar constància del progrés del propi itinerari lector i cultural explicant els criteris de selecció de les lectures, les formes d'accés a la cultura literària i l'experiència de lectura.",
          "7.2 Compartir l'experiència de lectura en suports diversos, tot relacionant el sentit de l'obra amb la pròpia experiència biogràfica, lectora i cultural."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Llegir, interpretar i valorar obres o fragments literaris del patrimoni propi i universal, utilitzant un metallenguatge específic i mobilitzant l'experiència biogràfica i els coneixements literaris i culturals, per establir vincles entre textos diversos que permetin conformar un mapa cultural",
      "description": "Llegir, interpretar i valorar obres o fragments literaris del patrimoni propi i universal, utilitzant un metallenguatge específic i mobilitzant l'experiència biogràfica i els coneixements literaris i culturals, per establir vincles entre textos diversos que permetin conformar un mapa cultural, eixamplar les possibilitats de gaudir de la literatura i crear textos d'intenció literària.",
      "criteris": {
        "1r-2n": [
          "8.1 Explicar i argumentar, amb l'ajuda de pautes i models, la interpretació de les obres llegides a partir de l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra, atesa la configuració dels gèneres i subgèneres literaris.",
          "8.2 Establir, de manera guiada, vincles argumentats entre els textos llegits i altres textos escrits, orals o multimodals i altres manifestacions artístiques en funció de temes, tòpics, estructures, llenguatge i valors ètics i estètics, mostrant la implicació i la resposta personal del lector en la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en diferents suports i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en els quals s'emprin les convencions formals dels diversos gèneres i estils literaris."
        ],
        "3r-4t": [
          "8.1 Explicar i argumentar la interpretació de les obres llegides a partir de l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra, i de les relacions externes del text amb el seu context sociohistòric, atesa la configuració i evolució dels gèneres i subgèneres literaris.",
          "8.2 Establir, de manera progressivament autònoma, vincles argumentats entre els textos llegits i altres textos escrits, orals o multimodals i altres manifestacions artístiques en funció de temes, tòpics, estructures, llenguatge i valors ètics i estètics, mostrant la implicació i la resposta personal del lector en la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en diferents suports i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en els quals s'utilitzin les convencions formals dels diversos gèneres i estils literaris."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Mobilitzar el coneixement sobre l'estructura de la llengua i els seus usos i reflexionar de manera progressivament autònoma sobre les eleccions lingüístiques i discursives, amb la terminologia adequada",
      "description": "Mobilitzar el coneixement sobre l'estructura de la llengua i els seus usos i reflexionar de manera progressivament autònoma sobre les eleccions lingüístiques i discursives, amb la terminologia adequada, per desenvolupar la consciència lingüística, augmentar el repertori comunicatiu i millorar les destreses tant de producció oral i escrita com de recepció crítica.",
      "criteris": {
        "1r-2n": [
          "9.1 Revisar els propis textos de manera guiada i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística i amb un metallenguatge específic, i identificar i esmenar alguns problemes de comprensió i producció de textos utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i un metallenguatge específic.",
          "9.3 Formular generalitzacions sobre aspectes bàsics del funcionament de la llengua a partir de l'experimentació, comparació i transformació d'enunciats, així com de la formulació d'hipòtesis i la cerca d'exemples, utilitzant un metallenguatge específic i consultant de manera guiada diccionaris, manuals i gramàtiques."
        ],
        "3r-4t": [
          "9.1 Revisar els textos propis de manera progressivament autònoma i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística amb el metallenguatge específic, i identificar i esmenar alguns problemes de comprensió i producció de textos utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i el metallenguatge específic.",
          "9.3 Formular generalitzacions sobre alguns aspectes del funcionament de la llengua a partir de l'experimentació, comparació i transformació d'enunciats, així com de la formulació d'hipòtesis i la cerca d'exemples, utilitzant el metallenguatge específic i consultant de manera progressivament autònoma diccionaris, manuals i gramàtiques."
        ]
      }
    },
    {
      "id": "CE10",
      "title": "Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant els abusos de poder a través de la paraula",
      "description": "Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant els abusos de poder a través de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge.",
      "criteris": {
        "1r-2n": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder a través de la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals que regeixen la comunicació entre les persones.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i la cerca de consensos tant en l'àmbit personal com educatiu i social."
        ],
        "3r-4t": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder a través de la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals de la comunicació.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i la cerca de consensos tant en l'àmbit personal com educatiu i social."
        ]
      }
    }
  ]
},
  "Llengua Castellana i Literatura": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Descriure i valorar la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural",
      "description": "Descriure i valorar la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural, per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics, i valorar aquesta diversitat com a font de riquesa cultural.",
      "criteris": {
        "1r-2n": [
          "1.1 Reconèixer la llengua catalana i la llengua castellana i llurs varietats dialectals, així com la resta de llengües de l'Estat espanyol i les llengües d'origen de l'alumnat, identificant-ne algunes nocions bàsiques i contrastant alguns dels seus trets en manifestacions orals, escrites i multimodals.",
          "1.2 Identificar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, a partir de l'observació de la diversitat lingüística de l'entorn."
        ],
        "3r-4t": [
          "1.1 Reconèixer i valorar la llengua catalana i la llengua castellana i llurs varietats dialectals, diferenciant-ne els trets sociolectals i de registre, a partir de l'explicació del seu origen o el seu desenvolupament històric i sociolingüístic, i contrastant aspectes lingüístics i discursius en manifestacions orals, escrites i multimodals.",
          "1.2 Identificar i qüestionar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, a partir de la indagació i la reflexió sobre els drets lingüístics individuals i col·lectius, així com la reflexió sobre fenòmens de contacte entre llengües."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Comprendre i interpretar textos orals i multimodals recollint el sentit general i la informació més rellevant, la seva forma i el seu contingut",
      "description": "Comprendre i interpretar textos orals i multimodals recollint el sentit general i la informació més rellevant, la seva forma i el seu contingut, per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.",
      "criteris": {
        "1r-2n": [
          "2.1 Comprendre el sentit global, l'estructura, la informació més rellevant en funció de les necessitats comunicatives i la intenció de l'emissor, de textos orals i multimodals senzills de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals senzills, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "3r-4t": [
          "2.1 Comprendre el sentit global, l'estructura, la informació més rellevant en funció de les necessitats comunicatives i la intenció de l'emissor, de textos orals i multimodals de certa complexitat de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals de certa complexitat, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius i participar en interaccions orals variades, amb autonomia",
      "description": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments i conceptes, construir coneixement i establir vincles personals.",
      "criteris": {
        "1r-2n": [
          "3.1 Realitzar narracions i exposicions orals senzilles amb diferents graus de planificació sobre temes d'interès personal, social i educatiu ajustant-se a les convencions pròpies dels diversos gèneres discursius, amb fluïdesa, coherència i el registre adequat, en diferents suports i utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals informals, en el treball en equip i en situacions orals formals de caràcter dialogat, amb actituds d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ],
        "3r-4t": [
          "3.1 Realitzar exposicions i argumentacions orals d'una certa extensió i complexitat amb diferents graus de planificació sobre temes d'interès personal, social, educatiu i professional ajustant-se a les convencions pròpies dels diversos gèneres discursius, amb fluïdesa, coherència i el registre adequat en diferents suports, utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals informals, en el treball en equip i en situacions orals formals de caràcter dialogat, amb actituds d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Comprendre, interpretar i analitzar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals reconeixent el sentit global i les idees principals i secundàries, identificant-ne la intenció de l'emissor, reflexionant-ne sobre el contingut i la forma i avaluar-ne la qualitat i fiabilitat",
      "description": "Comprendre, interpretar i analitzar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals reconeixent el sentit global i les idees principals i secundàries, identificant-ne la intenció de l'emissor, reflexionant-ne sobre el contingut i la forma i avaluar-ne la qualitat i fiabilitat, per tal de construir coneixement i donar resposta a necessitats i interessos comunicatius diversos.",
      "criteris": {
        "1r-2n": [
          "4.1 Comprendre i interpretar el sentit global, l'estructura, la informació més rellevant i la intenció de l'emissor de textos escrits i multimodals senzills de diferents àmbits que responguin a diferents propòsits de lectura, realitzant-ne les inferències necessàries.",
          "4.2 Valorar el contingut i la forma de textos escrits i multimodals senzills avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "3r-4t": [
          "4.1 Comprendre i interpretar el sentit global, l'estructura, la informació més rellevant i la intenció de l'emissor de textos escrits i multimodals de certa complexitat, que responguin a diferents propòsits de lectura, realitzant-ne les inferències necessàries.",
          "4.2 Valorar críticament el contingut i la forma de textos escrits i multimodals de certa complexitat avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Produir textos escrits i multimodals amb adequació, coherència, cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma",
      "description": "Produir textos escrits i multimodals amb adequació, coherència, cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.",
      "criteris": {
        "1r-2n": [
          "5.1 Planificar la redacció de textos escrits i multimodals senzills, atesa la situació comunicativa, destinatari, propòsit i canal; redactar esborranys i revisar-los amb l'ajuda del diàleg entre iguals i instruments de consulta, i presentar un text final coherent, cohesionat i amb el registre adequat.",
          "5.2 Incorporar procediments bàsics per enriquir els textos, tenint en compte aspectes discursius, lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical."
        ],
        "3r-4t": [
          "5.1 Planificar la redacció d'escrits i multimodals, de certa extensió i complexitat, atesa la situació comunicativa, destinatari, propòsit i canal; redactar esborranys i revisar-los amb l'ajuda del diàleg entre iguals i instruments de consulta, i presentar un text final coherent, cohesionat i amb el registre adequat.",
          "5.2 Incorporar procediments per enriquir els textos tenint en compte aspectes discursius, lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Cercar, seleccionar i contrastar informació procedent de diferents fonts de manera progressivament autònoma, avaluant-ne la fiabilitat i pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació",
      "description": "Cercar, seleccionar i contrastar informació procedent de diferents fonts de manera progressivament autònoma, avaluant-ne la fiabilitat i pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació, i integrar-la i transformar-la en coneixement, per comunicar-la, adoptant un punt de vista crític, personal i respectuós amb la propietat intel·lectual.",
      "criteris": {
        "1r-2n": [
          "6.1 Aplicar estratègies de cerca d'informació (localització, selecció i contrast), en diferents fonts, incloses les digitals, calibrant-ne la fiabilitat i pertinència en funció dels objectius de lectura, sobre temes d'interès acadèmic, personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant críticament el resultat de la cerca.",
          "6.2 Elaborar treballs d'investigació i comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d'un procés d'investigació individual o grupal, organitzant la informació, integrant-la en esquemes propis i reelaborant-la, i adoptant un punt de vista crític i respectuós amb els principis de propietat intel·lectual, sobre temes d'interès acadèmic, personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ],
        "3r-4t": [
          "6.1 Aplicar estratègies de cerca d'informació (localització, selecció i contrast), en diferents fonts, incloses les digitals, calibrant-ne la fiabilitat i pertinència en funció dels objectius de lectura, sobre temes d'interès acadèmic, personal, ecològic i social, de forma autònoma, a la xarxa i a les biblioteques, valorant críticament el resultat de la cerca.",
          "6.2 Elaborar treballs d'investigació i comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d'un procés d'investigació, individual o grupal, organitzant la informació, integrant-la en esquemes propis i reelaborant-la, i adoptant un punt de vista crític i respectuós amb els principis de propietat intel·lectual, sobre temes d'interès acadèmic, personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres",
      "description": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres, i compartir experiències de lectura, per construir la pròpia identitat lectora i gaudir de la dimensió social de la lectura.",
      "criteris": {
        "1r-2n": [
          "7.1 Triar i llegir textos i obres prèviament seleccionats a partir dels propis gustos, interessos i necessitats que permetin crear el propi itinerari lector.",
          "7.2 Compartir l'experiència de lectura en suports diversos, tot relacionant el sentit de l'obra amb la pròpia experiència biogràfica i lectora."
        ],
        "3r-4t": [
          "7.1 Llegir de manera autònoma textos i obres seleccionats en funció dels propis gustos, interessos i necessitats, i deixar constància del progrés del propi itinerari lector i cultural explicant els criteris de selecció de les lectures, les formes d'accés a la cultura literària i l'experiència de lectura.",
          "7.2 Compartir l'experiència de lectura en suports diversos, tot relacionant el sentit de l'obra amb la pròpia experiència biogràfica, lectora i cultural."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Llegir, interpretar i valorar obres o fragments literaris del patrimoni propi i universal, utilitzant un metallenguatge específic i mobilitzant l'experiència biogràfica i els coneixements literaris i culturals, per establir vincles entre textos diversos que permetin conformar un mapa cultural",
      "description": "Llegir, interpretar i valorar obres o fragments literaris del patrimoni propi i universal, utilitzant un metallenguatge específic i mobilitzant l'experiència biogràfica i els coneixements literaris i culturals, per establir vincles entre textos diversos que permetin conformar un mapa cultural, eixamplar les possibilitats de gaudir de la literatura i crear textos d'intenció literària.",
      "criteris": {
        "1r-2n": [
          "8.1 Explicar i argumentar, amb l'ajuda de pautes i models, la interpretació de les obres llegides a partir de l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra, atesa la configuració dels gèneres i subgèneres literaris.",
          "8.2 Establir, de manera guiada, vincles argumentats entre els textos llegits i altres textos escrits, orals o multimodals i altres manifestacions artístiques en funció de temes, tòpics, estructures, llenguatge i valors ètics i estètics, mostrant la implicació i la resposta personal del lector en la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en diferents suports i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en els quals s'emprin les convencions formals dels diversos gèneres i estils literaris."
        ],
        "3r-4t": [
          "8.1 Explicar i argumentar la interpretació de les obres llegides a partir de l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra, i de les relacions externes del text amb el seu context sociohistòric, atesa la configuració i evolució dels gèneres i subgèneres literaris.",
          "8.2 Establir, de manera progressivament autònoma, vincles argumentats entre els textos llegits i altres textos escrits, orals o multimodals i altres manifestacions artístiques en funció de temes, tòpics, estructures, llenguatge i valors ètics i estètics, mostrant la implicació i la resposta personal del lector en la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en diferents suports i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en els quals s'utilitzin les convencions formals dels diversos gèneres i estils literaris."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Mobilitzar el coneixement sobre l'estructura de la llengua i els seus usos i reflexionar de manera progressivament autònoma sobre les eleccions lingüístiques i discursives, amb la terminologia adequada",
      "description": "Mobilitzar el coneixement sobre l'estructura de la llengua i els seus usos i reflexionar de manera progressivament autònoma sobre les eleccions lingüístiques i discursives, amb la terminologia adequada, per desenvolupar la consciència lingüística, augmentar el repertori comunicatiu i millorar les destreses tant de producció oral i escrita com de recepció crítica.",
      "criteris": {
        "1r-2n": [
          "9.1 Revisar els propis textos de manera guiada i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística i amb un metallenguatge específic, i identificar i esmenar alguns problemes de comprensió i producció de textos utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i un metallenguatge específic.",
          "9.3 Formular generalitzacions sobre aspectes bàsics del funcionament de la llengua a partir de l'experimentació, comparació i transformació d'enunciats, així com de la formulació d'hipòtesis i la cerca d'exemples, utilitzant un metallenguatge específic i consultant de manera guiada diccionaris, manuals i gramàtiques."
        ],
        "3r-4t": [
          "9.1 Revisar els textos propis de manera progressivament autònoma i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística amb el metallenguatge específic, i identificar i esmenar alguns problemes de comprensió i producció de textos utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i el metallenguatge específic.",
          "9.3 Formular generalitzacions sobre alguns aspectes del funcionament de la llengua a partir de l'experimentació, comparació i transformació d'enunciats, així com de la formulació d'hipòtesis i la cerca d'exemples, utilitzant el metallenguatge específic i consultant de manera progressivament autònoma diccionaris, manuals i gramàtiques."
        ]
      }
    },
    {
      "id": "CE10",
      "title": "Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant els abusos de poder a través de la paraula",
      "description": "Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant els abusos de poder a través de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge.",
      "criteris": {
        "1r-2n": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder a través de la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals que regeixen la comunicació entre les persones.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i la cerca de consensos tant en l'àmbit personal com educatiu i social."
        ],
        "3r-4t": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder a través de la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals de la comunicació.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i la cerca de consensos tant en l'àmbit personal com educatiu i social."
        ]
      }
    }
  ]
},
  "Llengua Catalana i Literatura": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Descriure i valorar la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural",
      "description": "Descriure i valorar la diversitat lingüística i cultural a partir del reconeixement de les llengües de l'alumnat i la realitat plurilingüe i pluricultural, per afavorir la transferència lingüística, identificar i rebutjar estereotips i prejudicis lingüístics, i valorar aquesta diversitat com a font de riquesa cultural.",
      "criteris": {
        "1r-2n": [
          "1.1 Reconèixer la llengua catalana i la llengua castellana i llurs varietats dialectals, així com la resta de llengües de l'Estat espanyol i les llengües d'origen de l'alumnat, identificant-ne algunes nocions bàsiques i contrastant alguns dels seus trets en manifestacions orals, escrites i multimodals.",
          "1.2 Identificar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, a partir de l'observació de la diversitat lingüística de l'entorn."
        ],
        "3r-4t": [
          "1.1 Reconèixer i valorar la llengua catalana i la llengua castellana i llurs varietats dialectals, diferenciant-ne els trets sociolectals i de registre, a partir de l'explicació del seu origen o el seu desenvolupament històric i sociolingüístic, i contrastant aspectes lingüístics i discursius en manifestacions orals, escrites i multimodals.",
          "1.2 Identificar i qüestionar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, a partir de la indagació i la reflexió sobre els drets lingüístics individuals i col·lectius, així com la reflexió sobre fenòmens de contacte entre llengües."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Comprendre i interpretar textos orals i multimodals recollint el sentit general i la informació més rellevant, la seva forma i el seu contingut",
      "description": "Comprendre i interpretar textos orals i multimodals recollint el sentit general i la informació més rellevant, la seva forma i el seu contingut, per construir coneixement, formar-se opinió i eixamplar les possibilitats de gaudi i lleure.",
      "criteris": {
        "1r-2n": [
          "2.1 Comprendre el sentit global, l'estructura, la informació més rellevant en funció de les necessitats comunicatives i la intenció de l'emissor, de textos orals i multimodals senzills de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals senzills, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "3r-4t": [
          "2.1 Comprendre el sentit global, l'estructura, la informació més rellevant en funció de les necessitats comunicatives i la intenció de l'emissor, de textos orals i multimodals de certa complexitat de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals de certa complexitat, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius i participar en interaccions orals variades, amb autonomia",
      "description": "Produir textos orals i multimodals amb coherència, claredat i registre adequats, atenent les convencions pròpies dels diferents gèneres discursius i participar en interaccions orals variades, amb autonomia, per expressar idees, sentiments i conceptes, construir coneixement i establir vincles personals.",
      "criteris": {
        "1r-2n": [
          "3.1 Realitzar narracions i exposicions orals senzilles amb diferents graus de planificació sobre temes d'interès personal, social i educatiu ajustant-se a les convencions pròpies dels diversos gèneres discursius, amb fluïdesa, coherència i el registre adequat, en diferents suports i utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals informals, en el treball en equip i en situacions orals formals de caràcter dialogat, amb actituds d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ],
        "3r-4t": [
          "3.1 Realitzar exposicions i argumentacions orals d'una certa extensió i complexitat amb diferents graus de planificació sobre temes d'interès personal, social, educatiu i professional ajustant-se a les convencions pròpies dels diversos gèneres discursius, amb fluïdesa, coherència i el registre adequat en diferents suports, utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals informals, en el treball en equip i en situacions orals formals de caràcter dialogat, amb actituds d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Comprendre, interpretar i analitzar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals reconeixent el sentit global i les idees principals i secundàries, identificant-ne la intenció de l'emissor, reflexionant-ne sobre el contingut i la forma i avaluar-ne la qualitat i fiabilitat",
      "description": "Comprendre, interpretar i analitzar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals reconeixent el sentit global i les idees principals i secundàries, identificant-ne la intenció de l'emissor, reflexionant-ne sobre el contingut i la forma i avaluar-ne la qualitat i fiabilitat, per tal de construir coneixement i donar resposta a necessitats i interessos comunicatius diversos.",
      "criteris": {
        "1r-2n": [
          "4.1 Comprendre i interpretar el sentit global, l'estructura, la informació més rellevant i la intenció de l'emissor de textos escrits i multimodals senzills de diferents àmbits que responguin a diferents propòsits de lectura, realitzant-ne les inferències necessàries.",
          "4.2 Valorar el contingut i la forma de textos escrits i multimodals senzills avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "3r-4t": [
          "4.1 Comprendre i interpretar el sentit global, l'estructura, la informació més rellevant i la intenció de l'emissor de textos escrits i multimodals de certa complexitat, que responguin a diferents propòsits de lectura, realitzant-ne les inferències necessàries.",
          "4.2 Valorar críticament el contingut i la forma de textos escrits i multimodals de certa complexitat avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Produir textos escrits i multimodals amb adequació, coherència, cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma",
      "description": "Produir textos escrits i multimodals amb adequació, coherència, cohesió, aplicant estratègies elementals de planificació, redacció, revisió, correcció i edició, amb regulació dels iguals i autoregulació progressivament autònoma i atenent les convencions pròpies del gènere discursiu triat, per construir coneixement i donar resposta de manera informada, eficaç i creativa a demandes comunicatives concretes.",
      "criteris": {
        "1r-2n": [
          "5.1 Planificar la redacció de textos escrits i multimodals senzills, atesa la situació comunicativa, destinatari, propòsit i canal; redactar esborranys i revisar-los amb l'ajuda del diàleg entre iguals i instruments de consulta, i presentar un text final coherent, cohesionat i amb el registre adequat.",
          "5.2 Incorporar procediments bàsics per enriquir els textos, tenint en compte aspectes discursius, lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical."
        ],
        "3r-4t": [
          "5.1 Planificar la redacció d'escrits i multimodals, de certa extensió i complexitat, atesa la situació comunicativa, destinatari, propòsit i canal; redactar esborranys i revisar-los amb l'ajuda del diàleg entre iguals i instruments de consulta, i presentar un text final coherent, cohesionat i amb el registre adequat.",
          "5.2 Incorporar procediments per enriquir els textos tenint en compte aspectes discursius, lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Cercar, seleccionar i contrastar informació procedent de diferents fonts de manera progressivament autònoma, avaluant-ne la fiabilitat i pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació",
      "description": "Cercar, seleccionar i contrastar informació procedent de diferents fonts de manera progressivament autònoma, avaluant-ne la fiabilitat i pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació, i integrar-la i transformar-la en coneixement, per comunicar-la, adoptant un punt de vista crític, personal i respectuós amb la propietat intel·lectual.",
      "criteris": {
        "1r-2n": [
          "6.1 Aplicar estratègies de cerca d'informació (localització, selecció i contrast), en diferents fonts, incloses les digitals, calibrant-ne la fiabilitat i pertinència en funció dels objectius de lectura, sobre temes d'interès acadèmic, personal, ecològic i social, de forma progressivament autònoma, a la xarxa i a les biblioteques, valorant críticament el resultat de la cerca.",
          "6.2 Elaborar treballs d'investigació i comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d'un procés d'investigació individual o grupal, organitzant la informació, integrant-la en esquemes propis i reelaborant-la, i adoptant un punt de vista crític i respectuós amb els principis de propietat intel·lectual, sobre temes d'interès acadèmic, personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ],
        "3r-4t": [
          "6.1 Aplicar estratègies de cerca d'informació (localització, selecció i contrast), en diferents fonts, incloses les digitals, calibrant-ne la fiabilitat i pertinència en funció dels objectius de lectura, sobre temes d'interès acadèmic, personal, ecològic i social, de forma autònoma, a la xarxa i a les biblioteques, valorant críticament el resultat de la cerca.",
          "6.2 Elaborar treballs d'investigació i comunicar de forma creativa i respectant els drets de la propietat intel·lectual, els resultats d'un procés d'investigació, individual o grupal, organitzant la informació, integrant-la en esquemes propis i reelaborant-la, i adoptant un punt de vista crític i respectuós amb els principis de propietat intel·lectual, sobre temes d'interès acadèmic, personal, ecològic i social, que incloguin els objectius de desenvolupament sostenible.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres",
      "description": "Seleccionar i llegir de manera autònoma obres diverses com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament pel que fa a diversitat, complexitat i qualitat de les obres, i compartir experiències de lectura, per construir la pròpia identitat lectora i gaudir de la dimensió social de la lectura.",
      "criteris": {
        "1r-2n": [
          "7.1 Triar i llegir textos i obres prèviament seleccionats a partir dels propis gustos, interessos i necessitats que permetin crear el propi itinerari lector.",
          "7.2 Compartir l'experiència de lectura en suports diversos, tot relacionant el sentit de l'obra amb la pròpia experiència biogràfica i lectora."
        ],
        "3r-4t": [
          "7.1 Llegir de manera autònoma textos i obres seleccionats en funció dels propis gustos, interessos i necessitats, i deixar constància del progrés del propi itinerari lector i cultural explicant els criteris de selecció de les lectures, les formes d'accés a la cultura literària i l'experiència de lectura.",
          "7.2 Compartir l'experiència de lectura en suports diversos, tot relacionant el sentit de l'obra amb la pròpia experiència biogràfica, lectora i cultural."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Llegir, interpretar i valorar obres o fragments literaris del patrimoni propi i universal, utilitzant un metallenguatge específic i mobilitzant l'experiència biogràfica i els coneixements literaris i culturals, per establir vincles entre textos diversos que permetin conformar un mapa cultural",
      "description": "Llegir, interpretar i valorar obres o fragments literaris del patrimoni propi i universal, utilitzant un metallenguatge específic i mobilitzant l'experiència biogràfica i els coneixements literaris i culturals, per establir vincles entre textos diversos que permetin conformar un mapa cultural, eixamplar les possibilitats de gaudir de la literatura i crear textos d'intenció literària.",
      "criteris": {
        "1r-2n": [
          "8.1 Explicar i argumentar, amb l'ajuda de pautes i models, la interpretació de les obres llegides a partir de l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra, atesa la configuració dels gèneres i subgèneres literaris.",
          "8.2 Establir, de manera guiada, vincles argumentats entre els textos llegits i altres textos escrits, orals o multimodals i altres manifestacions artístiques en funció de temes, tòpics, estructures, llenguatge i valors ètics i estètics, mostrant la implicació i la resposta personal del lector en la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en diferents suports i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en els quals s'emprin les convencions formals dels diversos gèneres i estils literaris."
        ],
        "3r-4t": [
          "8.1 Explicar i argumentar la interpretació de les obres llegides a partir de l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra, i de les relacions externes del text amb el seu context sociohistòric, atesa la configuració i evolució dels gèneres i subgèneres literaris.",
          "8.2 Establir, de manera progressivament autònoma, vincles argumentats entre els textos llegits i altres textos escrits, orals o multimodals i altres manifestacions artístiques en funció de temes, tòpics, estructures, llenguatge i valors ètics i estètics, mostrant la implicació i la resposta personal del lector en la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en diferents suports i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en els quals s'utilitzin les convencions formals dels diversos gèneres i estils literaris."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Mobilitzar el coneixement sobre l'estructura de la llengua i els seus usos i reflexionar de manera progressivament autònoma sobre les eleccions lingüístiques i discursives, amb la terminologia adequada",
      "description": "Mobilitzar el coneixement sobre l'estructura de la llengua i els seus usos i reflexionar de manera progressivament autònoma sobre les eleccions lingüístiques i discursives, amb la terminologia adequada, per desenvolupar la consciència lingüística, augmentar el repertori comunicatiu i millorar les destreses tant de producció oral i escrita com de recepció crítica.",
      "criteris": {
        "1r-2n": [
          "9.1 Revisar els propis textos de manera guiada i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística i amb un metallenguatge específic, i identificar i esmenar alguns problemes de comprensió i producció de textos utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i un metallenguatge específic.",
          "9.3 Formular generalitzacions sobre aspectes bàsics del funcionament de la llengua a partir de l'experimentació, comparació i transformació d'enunciats, així com de la formulació d'hipòtesis i la cerca d'exemples, utilitzant un metallenguatge específic i consultant de manera guiada diccionaris, manuals i gramàtiques."
        ],
        "3r-4t": [
          "9.1 Revisar els textos propis de manera progressivament autònoma i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística amb el metallenguatge específic, i identificar i esmenar alguns problemes de comprensió i producció de textos utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i el metallenguatge específic.",
          "9.3 Formular generalitzacions sobre alguns aspectes del funcionament de la llengua a partir de l'experimentació, comparació i transformació d'enunciats, així com de la formulació d'hipòtesis i la cerca d'exemples, utilitzant el metallenguatge específic i consultant de manera progressivament autònoma diccionaris, manuals i gramàtiques."
        ]
      }
    },
    {
      "id": "CE10",
      "title": "Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant els abusos de poder a través de la paraula",
      "description": "Posar al servei de la convivència democràtica, la resolució dialogada dels conflictes i la igualtat de drets de totes les persones, les pròpies pràctiques comunicatives, utilitzant un llenguatge no discriminatori i desterrant els abusos de poder a través de la paraula, per afavorir un ús eficaç, ètic i democràtic del llenguatge.",
      "criteris": {
        "1r-2n": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder a través de la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals que regeixen la comunicació entre les persones.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i la cerca de consensos tant en l'àmbit personal com educatiu i social."
        ],
        "3r-4t": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder a través de la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals de la comunicació.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i la cerca de consensos tant en l'àmbit personal com educatiu i social."
        ]
      }
    }
  ]
},
  "Biologia i Geologia": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Interpretar fenòmens de la naturalesa, predint i argumentant el seu comportament a partir de models, lleis i teories propis de la biologia i la geologia",
      "description": "Interpretar fenòmens de la naturalesa, predint i argumentant el seu comportament a partir de models, lleis i teories propis de la biologia i la geologia per apropiar-se de conceptes i processos propis de la ciència.",
      "criteris": {
        "1r-2n-3r": [
          "1.1 Analitzar conceptes, fenòmens i processos relacionats amb els sabers de la biologia i la geologia, interpretant informació en diferents formats (models, gràfics, taules, diagrames, fórmules, esquemes, símbols, pàgines web…), mantenint una actitud crítica i obtenint conclusions fonamentades en raons científiques.",
          "1.2 Interpretar i predir el comportament de fenòmens quotidians rellevants, relacionant-los amb models, lleis i teories adequades de la biologia i la geologia.",
          "1.3 Identificar els conceptes relacionats amb situacions problemàtiques reals de caràcter científic i proporcionar possibles solucions."
        ],
        "4t": [
          "1.1 Analitzar conceptes, fenòmens i processos relacionats amb els sabers de la biologia i la geologia, interpretant informació en diferents formats (models, gràfics, taules, diagrames, fórmules, esquemes, símbols, pàgines web…), mantenint una actitud crítica i obtenint conclusions fonamentades en raons científiques i defensant amb criteri opinions pròpies fonamentades.",
          "1.2 Interpretar i predir el comportament de fenòmens quotidians, argumentant-ho amb rigor sobre la base de models, lleis i teories adequades de la biologia i la geologia.",
          "1.3 Identificar els conceptes relacionats amb situacions problemàtiques reals de caràcter científic, proporcionar possibles solucions i argumentar sobre la seva validesa."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Identificar, seleccionar, organitzar i avaluar críticament dades i informació, contrastant-ne la fiabilitat per resoldre preguntes relacionades amb la biologia i la geologia i descartar solucions pseudocientífiques",
      "description": "Identificar, seleccionar, organitzar i avaluar críticament dades i informació, contrastant-ne la fiabilitat per resoldre preguntes relacionades amb la biologia i la geologia i descartar solucions pseudocientífiques.",
      "criteris": {
        "1r-2n-3r": [
          "2.1 Resoldre qüestions relacionades amb els sabers de la matèria de Biologia i Geologia localitzant, seleccionant fonts fiables i organitzant informació mitjançant l'ús i citació correctes de diferents fonts.",
          "2.2 Reconèixer la informació amb base científica distingint-la de pseudociències, rumors, teories conspiratòries, falses notícies i creences, etc., i mantenint una actitud escèptica davant d'aquests."
        ],
        "4t": [
          "2.1 Resoldre qüestions i aprofundir en aspectes relacionats amb els sabers de la matèria de Biologia i Geologia localitzant, seleccionant, organitzant i analitzant críticament la informació de diferents fonts, citant-les correctament amb respecte per la propietat intel·lectual.",
          "2.2 Contrastar la fiabilitat de la informació sobre temes relacionats amb els sabers de la matèria de Biologia i Geologia, utilitzant fonts fiables (tenint en compte si s'identifica l'autor o responsable, si hi ha una institució al darrere, quina és la finalitat o intenció de publicar aquella informació, si es pot verificar amb altres fonts, si hi ha bibliografia, etc.) adoptant una actitud crítica i escèptica vers informacions no fonamentades en la ciència, com pseudociències, teories conspiratòries, creences, falses notícies, mentides, etc."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Dissenyar, desenvolupar i comunicar el plantejament i les conclusions de recerques dins de l'àmbit escolar, incloent la formulació de preguntes i d'hipòtesis i la seva contrastació experimental",
      "description": "Dissenyar, desenvolupar i comunicar el plantejament i les conclusions de recerques dins de l'àmbit escolar, incloent la formulació de preguntes i d'hipòtesis i la seva contrastació experimental, seguint els passos de les metodologies pròpies de la ciència, com l'experimentació i la cerca d'evidències, cooperant quan calgui, per indagar en aspectes relacionats amb la biologia i la geologia.",
      "criteris": {
        "1r-2n-3r": [
          "3.1 Plantejar preguntes sobre fenòmens quotidians i formular hipòtesis que puguin ser respostes o contrastades en el context escolar a través de l'experimentació, la presa de dades i l'anàlisi de fenòmens biològics i geològics.",
          "3.2 Dissenyar, fent servir metodologies pròpies de la ciència, procediments de recerca que impliquin l'ús de la deducció, el treball experimental i el raonament logicomatemàtic.",
          "3.3 Portar a terme dissenys experimentals fent servir els instruments, eines o tècniques adequades amb correcció i interpretar-ne els resultats utilitzant, quan sigui necessari, eines matemàtiques i tecnològiques.",
          "3.4 Cooperar en un projecte científic assumint responsablement una funció concreta, utilitzant espais virtuals quan sigui necessari, respectant la diversitat i afavorint la inclusió.",
          "3.5 Presentar els resultats i les conclusions obtingudes mitjançant l'experimentació i observació de camp utilitzant el format adequat (taules, gràfics, informes, etc.) i, quan sigui necessari, eines digitals.",
          "3.6 Valorar la contribució de la ciència a la societat i la tasca de les persones que s'hi han dedicat, reflexionant sobre els biaixos de gènere en les ciències i la tecnologia, i entenent la recerca com una tasca col·lectiva i interdisciplinària en constant evolució, influïda pel context polític i els recursos econòmics."
        ],
        "4t": [
          "3.1 Plantejar preguntes sobre fenòmens quotidians i formular hipòtesis que puguin ser respostes o contrastades en el context escolar a través de l'experimentació, la presa de dades i l'anàlisi de fenòmens biològics i geològics, diferenciant-les d'aquelles qüestions pseudocientífiques que no admeten comprovació experimental.",
          "3.2 Dissenyar, fent servir metodologies pròpies de la ciència, procediments de recerca que impliquin l'ús de la deducció, el treball experimental i el raonament logicomatemàtic.",
          "3.3 Portar a terme l'experimentació plantejada fent servir els instruments, eines o tècniques adequades amb correcció i interpretar-ne els resultats quan sigui necessari amb eines matemàtiques i tecnològiques per obtenir conclusions raonades i fonamentades o valorar la impossibilitat de fer-ho.",
          "3.4 Establir col·laboracions quan sigui necessari en les diferents fases del projecte científic per treballar amb més eficiència, valorant la importància de la cooperació en la investigació, respectant la diversitat i afavorint la inclusió.",
          "3.5 Presentar de manera clara i rigorosa els resultats i les conclusions obtingudes mitjançant l'experimentació, argumentant la connexió entre uns i altres, i l'observació de camp, utilitzant el format adequat (taules, gràfics, informes, etc.) i eines digitals.",
          "3.6 Valorar la contribució de la ciència a la societat i la tasca de les persones que s'hi han dedicat, argumentant sobre els biaixos de gènere en les ciències i la tecnologia i entenent la recerca com una tasca col·lectiva i interdisciplinària en constant evolució, influïda pel context polític i els recursos econòmics."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Fer servir diverses formes de raonament, com el pensament hipoteticodeductiu i el pensament computacional, per resoldre problemes o donar explicació a fenòmens naturals i processos de la vida quotidiana relacionats amb la biologia i la geologia",
      "description": "Fer servir diverses formes de raonament, com el pensament hipoteticodeductiu i el pensament computacional, per resoldre problemes o donar explicació a fenòmens naturals i processos de la vida quotidiana relacionats amb la biologia i la geologia, mitjançant l'anàlisi crítica de les respostes i solucions i reformulant el procediment, si fos necessari.",
      "criteris": {
        "1r-2n-3r": [
          "4.1 Resoldre problemes o donar explicació a processos biològics o geològics utilitzant coneixements, dades i informació aportades, el raonament lògic, el pensament computacional o recursos digitals.",
          "4.2 Analitzar críticament la solució a un problema sobre fenòmens biològics i geològics."
        ],
        "4t": [
          "4.1 Resoldre problemes o donar explicació a processos biològics o geològics utilitzant coneixements, dades i informació aportades, el raonament lògic, el pensament computacional o recursos digitals.",
          "4.2 Analitzar críticament la solució a un problema o fenòmens biològics i geològics i canviar els procediments usats o revisar les conclusions si aquesta solució no fos viable o davant de noves dades aportades amb posterioritat."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Analitzar els efectes de determinades accions sobre el medi ambient i la salut, basant-se en els fonaments de les ciències biològiques i geològiques, per fer propostes d'acció i decidir de manera informada sobre problemàtiques actuals",
      "description": "Analitzar els efectes de determinades accions sobre el medi ambient i la salut, basant-se en els fonaments de les ciències biològiques i geològiques, per fer propostes d'acció i per decidir de manera informada sobre problemàtiques actuals i adoptar hàbits que minimitzin els impactes mediambientals, que siguin compatibles amb un desenvolupament sostenible i que permetin mantenir i millorar la salut individual i col·lectiva.",
      "criteris": {
        "1r-2n-3r": [
          "5.1 Justificar amb fonaments científics la importància de la preservació de la biodiversitat, la conservació de l'entorn, la protecció dels éssers vius de l'entorn, el desenvolupament sostenible i la qualitat de vida.",
          "5.2 Justificar la necessitat de tenir hàbits sostenibles analitzant d'una manera crítica les activitats pròpies i alienes i basant-se en els raonaments propis, coneixements adquirits i informació disponible.",
          "5.3 Justificar la necessitat de tenir hàbits saludables, analitzant les accions pròpies i alienes (alimentació, higiene, postura corporal, activitat física, desplaçaments, relacions interpersonals, descans, exposició a les pantalles, maneig de l'estrès, seguretat en les pràctiques sexuals, consum de substàncies... ), amb actitud crítica i basant-se en fonaments de la fisiologia.",
          "5.4 Identificar algunes situacions en què els coneixements derivats de la biologia i la geologia poden contribuir a millorar la sostenibilitat ambiental i la salut individual i col·lectiva.",
          "5.5 Emprendre, de manera guiada i amb la metodologia adequada, projectes científics relacionats amb la millora de la societat i que afavoreixin el creixement entre iguals com a base d'una comunitat científica escolar crítica i ètica.",
          "5.6 Justificar la necessitat de la seguretat i la sostenibilitat en la mobilitat de les persones i preveure les conseqüències del comportament viari tant per a la pròpia persona com per a altres, des de la perspectiva de la salut i el medi ambient."
        ],
        "4t": [
          "5.1 Justificar amb fonaments científics la importància de la preservació de la biodiversitat, la conservació de l'entorn, la protecció dels éssers vius de l'entorn, el desenvolupament sostenible i la qualitat de vida i identificar els possibles riscos naturals potenciats per determinades accions humanes sobre una zona geogràfica, tenint en compte les seves característiques litològiques, el relleu i la vegetació.",
          "5.2 Argumentar sobre la necessitat de tenir hàbits sostenibles, analitzant les accions pròpies i alienes (hàbits de consum, generació residus, transport...), amb actitud crítica i basant-se en fonaments del funcionament dels sistemes naturals.",
          "5.3 Argumentar sobre la necessitat de tenir hàbits saludables, analitzant les accions pròpies i alienes (alimentació, higiene, postura corporal, activitat física, desplaçaments, relacions interpersonals, descans, exposició a les pantalles, maneig de l'estrès, seguretat en les pràctiques sexuals, consum de substàncies... ), amb actitud crítica i basant-se en fonaments de la fisiologia.",
          "5.4 Argumentar, justificant les raons aportades, sobre com els coneixements derivats de la biologia i la geologia poden contribuir a millorar la sostenibilitat ambiental i la salut individual i col·lectiva.",
          "5.5 Emprendre, de forma autònoma amb la metodologia adequada, projectes científics relacionats amb la millora de la societat i que afavoreixin el creixement entre iguals com a base d'una comunitat científica escolar crítica i ètica.",
          "5.6 Adoptar actituds compromeses i actives davant de pràctiques, comportaments i hàbits per a una mobilitat segura i sostenible que suposen un risc per a la nostra salut, contrastant informacions fiables, objectives i amb una base científica vàlida."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Analitzar els elements del paisatge, utilitzant de forma integrada els coneixements procedents de la biologia, la geologia i les ciències ambientals per explicar-ne l'origen i la possible evolució",
      "description": "Analitzar els elements del paisatge, utilitzant de forma integrada els coneixements procedents de la biologia, la geologia i les ciències ambientals per explicar-ne l'origen i la possible evolució, així com les característiques de la comunitat d'organismes, la dinàmica del relleu i els possibles riscos naturals.",
      "criteris": {
        "1r-2n-3r": [
          "6.1 Identificar els diferents elements del paisatge i justificar el seu grau de desenvolupament.",
          "6.2 Reconèixer la transformació dels paisatges associada als canvis geològics, biològics i ambientals que experimenten.",
          "6.3 Relacionar les activitats humanes amb els impactes que reben els paisatges."
        ],
        "4t": [
          "6.1 Justificar les relacions i la influència mútua que mantenen els diferents elements del paisatge.",
          "6.2 Relacionar el grau de desenvolupament integral d'un paisatge amb els esdeveniments biològics, geològics i ambientals esdevinguts.",
          "6.3 Identificar i analitzar críticament les activitats humanes que impacten en el paisatge i fer propostes plausibles de reversió.",
          "6.4 Identificar els principals riscos geològics derivats de causes naturals o antròpiques i proposar mesures de prevenció i correcció.",
          "6.5 Deduir i explicar la història d'un paisatge concret identificar-ne els elements més rellevants, utilitzant el raonament, els coneixements sobre la successió i els principis geològics bàsics (horitzontalitat, superposició, actualisme, neocatastrofisme...)."
        ]
      }
    }
  ]
},
  "Física i Química": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Interpretar fenòmens de la naturalesa, predient i argumentant-ne el comportament a partir de models, lleis i teories propis de la física i química",
      "description": "Interpretar fenòmens de la naturalesa, predient i argumentant-ne el comportament a partir de models, lleis i teories propis de la física i química per apropiar-se de conceptes i processos propis de la ciència.",
      "criteris": {
        "1r-2n-3r": [
          "1.1 Analitzar conceptes, fenòmens i processos relacionats amb els sabers de la física i la química interpretant informació en diferents formats (models, gràfics, taules, diagrames, fórmules, esquemes, símbols, pàgines web…), mantenint una actitud crítica i obtenint conclusions fonamentades en raons científiques.",
          "1.2 Interpretar i predir el comportament de fenòmens quotidians rellevants, relacionant-lo amb models, lleis i teories adequades de la física i la química.",
          "1.3 Identificar els conceptes relacionats amb situacions problemàtiques reals de caràcter científic i proporcionar possibles solucions."
        ],
        "4t": [
          "1.1 Analitzar conceptes, fenòmens i processos relacionats amb els sabers de la física i la química interpretant informació en diferents formats (models, gràfics, taules, diagrames, fórmules, esquemes, símbols, pàgines web…), mantenint una actitud crítica i obtenint conclusions fonamentades en raons científiques i defensant amb criteri opinions pròpies fonamentades.",
          "1.2 Interpretar i predir el comportament de fenòmens quotidians, argumentant-lo amb rigor d'acord amb models, lleis i teories adequades de la física i la química.",
          "1.3 Identificar els conceptes relacionats amb situacions problemàtiques reals de caràcter científic, proporcionar possibles solucions i argumentar-ne la validesa."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Dissenyar, desenvolupar i comunicar el plantejament i les conclusions de recerques incloent la formulació de preguntes i d'hipòtesis i la seva contrastació experimental",
      "description": "Dissenyar, desenvolupar i comunicar el plantejament i les conclusions de recerques incloent la formulació de preguntes i d'hipòtesis i la seva contrastació experimental, dins de l'àmbit escolar, seguint els passos de les metodologies pròpies de la ciència, com l'experimentació i la cerca d'evidències, i del pensament computacional cooperant, quan calgui, per indagar en aspectes relacionats amb la física i la química.",
      "criteris": {
        "1r-2n-3r": [
          "2.1 Plantejar preguntes sobre fenòmens quotidians i formular hipòtesis que puguin ser respostes o contrastades en el context escolar a través de l'experimentació, la presa de dades i l'anàlisi de fenòmens físics i químics.",
          "2.2 Dissenyar, fent servir metodologies pròpies de la ciència, procediments de recerca que impliquin l'ús de la deducció, el treball experimental i el raonament logicomatemàtic.",
          "2.3 Portar a terme dissenys experimentals fent servir els instruments, les eines o les tècniques adequades amb correcció i interpretar-ne els resultats utilitzant, quan sigui necessari, eines matemàtiques i tecnològiques.",
          "2.4 Cooperar en un projecte científic assumint responsablement una funció concreta, utilitzant espais virtuals quan sigui necessari, respectant la diversitat i afavorint la inclusió.",
          "2.5 Presentar els resultats i les conclusions obtingudes mitjançant l'experimentació i l'observació de camp utilitzant el format adequat (taules, gràfics, informes, etc.) i, quan sigui necessari, eines digitals.",
          "2.6 Valorar la contribució de la ciència a la societat i la tasca de les persones que s'hi han dedicat, reflexionant sobre els biaixos de gènere en les ciències i la tecnologia, i entenent la recerca com una tasca col·lectiva i interdisciplinària en constant evolució, influïda pel context polític i els recursos econòmics."
        ],
        "4t": [
          "2.1 Plantejar preguntes sobre fenòmens quotidians i formular hipòtesis que puguin ser respostes o contrastades en el context escolar a través de l'experimentació, la presa de dades i l'anàlisi de fenòmens físics i químics, diferenciant-les d'aquelles qüestions pseudocientífiques que no admeten comprovació experimental.",
          "2.2 Dissenyar, fent servir metodologies pròpies de la ciència, procediments de recerca que impliquin l'ús de la deducció, el treball experimental i el raonament logicomatemàtic.",
          "2.3 Portar a terme l'experimentació plantejada fent servir els instruments, les eines o les tècniques adequades amb correcció i interpretar-ne els resultats, quan sigui necessari, amb eines matemàtiques i tecnològiques per obtenir conclusions raonades i fonamentades o valorar la impossibilitat de fer-ho.",
          "2.4 Establir col·laboracions quan sigui necessari en les diferents fases del projecte científic per treballar amb més eficiència, valorant la importància de la cooperació en la investigació, respectant la diversitat i afavorint la inclusió.",
          "2.5 Presentar de manera clara i rigorosa els resultats i les conclusions obtingudes mitjançant l'experimentació, argumentant la connexió entre uns i altres, i l'observació de camp utilitzant el format adequat (taules, gràfics, informes, etc.) i eines digitals.",
          "2.6 Valorar la contribució de la ciència a la societat i la tasca de les persones que s'hi han dedicat, argumentant sobre els biaixos de gènere en les ciències i la tecnologia i entenent la recerca com una tasca col·lectiva i interdisciplinària en constant evolució, influïda pel context polític i els recursos econòmics."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Generar, interpretar i validar dades i informació en diferents formats i fonts, fent servir de manera adient el llenguatge científic específic de la física i la química, i usar de manera responsable i segura el material de laboratori",
      "description": "Generar, interpretar i validar dades i informació en diferents formats i fonts, fent servir de manera adient el llenguatge científic específic de la física i la química, i usar de manera responsable i segura el material de laboratori, per valorar el llenguatge científic com a eina universal de comunicació i intercanvi de coneixement.",
      "criteris": {
        "1r-2n-3r": [
          "3.1 Generar i usar dades de fonts i formats diversos (textos, taules, gràfiques, diagrames, etc.) per interpretar, validar i comunicar informació relativa a un procés físic o químic concret, mitjançant la selecció crítica d'allò més rellevant per a la resolució del problema.",
          "3.2 Utilitzar adequadament les regles bàsiques de la física i la química, incloent-hi l'ús d'unitats de mesura, les eines matemàtiques i la formulació i nomenclatura IUPAC, com a elements bàsics del llenguatge científic i d'una comunicació efectiva per a l'intercanvi de coneixement entre la comunitat científica.",
          "3.3 Utilitzar de manera pràctica i responsable les normes d'ús dels espais específics de ciència, com el laboratori de física i química, com a mitjà per preservar la salut pròpia i col·lectiva, la conservació sostenible del medi ambient i el respecte per les instal·lacions."
        ],
        "4t": [
          "3.1 Generar i usar dades de fonts i formats diversos (textos, taules, gràfiques, diagrames, etc.) per interpretar, validar i comunicar informació relativa a un procés físic o químic concret, mitjançant la selecció crítica d'allò més rellevant per a la resolució del problema.",
          "3.2 Utilitzar adequadament les regles bàsiques de la física i la química, incloent-hi l'ús adequat de diversos sistemes d'unitats de mesura, les eines matemàtiques necessàries i la formulació i nomenclatura IUPAC, com a elements bàsics del llenguatge científic i d'una comunicació efectiva per a l'intercanvi de coneixement entre la comunitat científica.",
          "3.3 Utilitzar de manera pràctica, responsable i rigorosa les normes d'ús dels espais específics de ciència, com el laboratori de física i química, com a mitjà per assegurar la salut pròpia i col·lectiva, la conservació sostenible del medi ambient i el respecte per les instal·lacions."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Utilitzar de forma crítica i eficient plataformes tecnològiques i recursos variats per a la cerca d'informació, la creació de materials i la comunicació fonamentada en coneixements de la física i la química",
      "description": "Utilitzar de forma crítica i eficient plataformes tecnològiques i recursos variats, tant per al treball individual com en equip, per a la cerca d'informació, la creació de materials i la comunicació fonamentada en coneixements de la física i la química, entorn de fenòmens i qüestions ecosocialment rellevants.",
      "criteris": {
        "1r-2n-3r": [
          "4.1 Utilitzar de forma crítica, creativa i eficient entorns digitals i diferents recursos en formats diversos per defensar el punt de vista propi sobre fenòmens i qüestions ecosocialment rellevants.",
          "4.2 Justificar el punt de vista propi sobre qüestions ecosocialment rellevants, utilitzant tant el treball individual com en equip, respectant les aportacions de tothom i promovent la inclusió de gènere i social.",
          "4.3 Cercar i analitzar informació amb mitjans convencionals i digitals i crear continguts relacionats amb la física i la química, seleccionant amb criteri les fonts més fiables i organitzant informació mitjançant l'ús i la citació correctes de diferents fonts."
        ],
        "4t": [
          "4.1 Utilitzar de forma crítica, creativa i eficient entorns digitals i diferents recursos en formats diversos per defensar el punt de vista propi sobre fenòmens i qüestions ecosocialment rellevants.",
          "4.2 Justificar el punt de vista propi sobre qüestions ecosocialment rellevants, utilitzant tant el treball individual com en equip, respectant les aportacions de tothom i promovent la inclusió de gènere i social.",
          "4.3 Cercar i analitzar informació amb mitjans convencionals i digitals i crear continguts relacionats amb la física i la química, seleccionant amb criteri les fonts més fiables i organitzant informació mitjançant l'ús i la citació correctes de les fonts, amb respecte per la propietat intel·lectual."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Analitzar els efectes de determinades accions sobre el medi ambient i la salut, basant-se en els fonaments de les ciències físiques i químiques, per fer propostes d'acció",
      "description": "Analitzar els efectes de determinades accions sobre el medi ambient i la salut, basant-se en els fonaments de les ciències físiques i químiques, per fer propostes d'acció per decidir de manera informada en problemàtiques actuals i adoptar hàbits que minimitzin els impactes mediambientals, que siguin compatibles amb un desenvolupament sostenible i que permetin mantenir i millorar la salut individual i col·lectiva.",
      "criteris": {
        "1r-2n-3r": [
          "5.1 Justificar amb fonaments científics la importància de la preservació dels sistemes fisicoquímics de l'entorn (qualitat de l'aire, de l'aigua, del sòl).",
          "5.2 Justificar la necessitat de tenir hàbits sostenibles, analitzant d'una manera crítica les activitats pròpies i alienes i basant-se en els raonaments propis, els coneixements adquirits i la informació disponible.",
          "5.3 Identificar algunes situacions en què els coneixements derivats de la física i la química poden contribuir a millorar la sostenibilitat ambiental i la salut individual i col·lectiva.",
          "5.4 Emprendre, de manera guiada i amb la metodologia adequada, projectes científics relacionats amb la millora de la societat i que afavoreixin el creixement entre iguals com a base d'una comunitat científica escolar crítica i ètica."
        ],
        "4t": [
          "5.1 Justificar amb fonaments científics la importància de la qualitat de l'aire, de l'equilibri en la seva composició en els diversos nivells atmosfèrics, dels corrents d'aigua i del sòl lliure de contaminants i el desenvolupament sostenible i identificar els possibles riscos naturals potenciats per determinades accions humanes sobre els sistemes físic-químics de l'entorn.",
          "5.2 Argumentar sobre la necessitat de tenir hàbits sostenibles, analitzant les accions pròpies i alienes (hàbits de consum, generació de residus, transport, etc.), amb actitud crítica i basant-se en fonaments del funcionament dels sistemes naturals.",
          "5.3 Argumentar, justificant les raons aportades, sobre com els coneixements derivats de la Física i la Química poden contribuir a millorar la sostenibilitat ambiental i la salut individual i col·lectiva.",
          "5.4 Emprendre, de forma autònoma amb la metodologia adequada, projectes científics relacionats amb la millora de la societat i que afavoreixin el creixement entre iguals com a base d'una comunitat científica escolar crítica i ètica."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Interpretar i valorar la ciència com una construcció col·lectiva en continu canvi i evolució, que requereix la interacció amb la resta de la societat",
      "description": "Interpretar i valorar la ciència com una construcció col·lectiva en continu canvi i evolució, que requereix la interacció amb la resta de la societat per generar millores que repercuteixin en l'avenç tecnològic, econòmic, ambiental i social.",
      "criteris": {
        "1r-2n-3r": [
          "6.1 Interpretar la ciència com un procés en construcció, a través de l'anàlisi amb perspectiva històrica dels avenços científics dels homes i dones que hi van participar, i valorar les repercussions mútues de la ciència actual amb la tecnologia, la societat i el medi ambient.",
          "6.2 Raonar la capacitat de la ciència per proposar, mitjançant la implicació ciutadana, solucions sostenibles per a les necessitats tecnològiques, ambientals, econòmiques i socials, detectades en l'entorn, sense biaixos de gènere."
        ],
        "4t": [
          "6.1 Interpretar la ciència com un procés en construcció, tant a través de l'anàlisi amb perspectiva històrica dels avenços científics dels homes i dones que hi van participar, com de les línies de recerca actuals, i valorar les repercussions mútues i les implicacions socials, econòmiques i mediambientals de la ciència actual en la societat.",
          "6.2 Argumentar la capacitat de la ciència per proposar, mitjançant la implicació ciutadana, solucions sostenibles per a les necessitats tecnològiques, ambientals, econòmiques i socials, detectades en l'entorn, sense biaixos de gènere."
        ]
      }
    }
  ]
},
  "Ciències Socials: Geografia i Història": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Cercar i tractar informació que permeti interpretar el present i el passat, aplicant els procediments de la recerca històrica i geogràfica a partir de l'anàlisi crítica de dades procedents de fonts analògiques i digitals",
      "description": "Cercar i tractar informació que permeti interpretar el present i el passat, aplicant els procediments de la recerca històrica i geogràfica a partir de l'anàlisi crítica de dades procedents de fonts analògiques i digitals, per transformar-ho en coneixement i comunicar-ho a través de diferents formats.",
      "criteris": {
        "1r-2n": [
          "1.1 Desenvolupar estratègies de cerca, tractament i organització de la informació per a la resolució de demandes relacionades amb fets i processos rellevants del present i del passat.",
          "1.2 Analitzar de manera crítica, responsable i creativa les fonts d'informació analògiques i digitals, contrastant les dades obtingudes i aplicant-les a diferents situacions i contextos.",
          "1.3 Elaborar i comunicar els coneixements adquirits mitjançant recursos expressius que incorporin diferents llenguatges i formats, emprant les possibilitats que ofereixen els entorns i recursos digitals.",
          "1.4 Incorporar i utilitzar adequadament el vocabulari propi de les ciències socials mitjançant intervencions orals, textos escrits i altres produccions, tot avançant en la construcció d'un discurs precís i rigorós."
        ],
        "3r-4t": [
          "1.1 Elaborar continguts propis en diferents formats, mitjançant aplicacions i estratègies de recollida i representació de dades més complexes, contrastant críticament fonts actuals i del passat, tant analògiques com digitals.",
          "1.2 Establir connexions i relacions entre els coneixements i les informacions adquirides, elaborant síntesis interpretatives i explicatives, mitjançant informes, estudis o dossiers que mostrin un avenç en els aprenentatges assolits.",
          "1.3 Transferir adequadament la informació i el coneixement a través de diferents mitjans a contextos i conjuntures actuals, i construir nou coneixement valorant solucions i alternatives diverses.",
          "1.4 Analitzar la veracitat i la fiabilitat de les fonts per diferenciar fets d'opinions, identificant la desinformació i utilitzant la informació seleccionada de manera efectiva per resoldre problemes."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Indagar i argumentar a partir de problemes socials rellevants, locals i globals, per desenvolupar un pensament crític i respectuós amb les diferències",
      "description": "Indagar i argumentar a partir de problemes socials rellevants, locals i globals, per desenvolupar un pensament crític i respectuós amb les diferències, que contribueixi a la construcció de la identitat individual i col·lectiva i a la consecució d'un present i un futur més just i inclusiu.",
      "criteris": {
        "1r-2n": [
          "2.1 Identificar i mostrar interès pels principals problemes que afecten la societat, adoptant una posició crítica, proactiva i de rebuig a situacions injustes i discriminatòries.",
          "2.2 Argumentar de forma crítica sobre problemes socials rellevants utilitzant els coneixements propis de les ciències socials i valorant la importància de trobar solucions dialogades.",
          "2.3 Mantenir una actitud d'alerta i de reflexió davant dels problemes socials, que ajudi a la permanent revisió dels propis criteris i a comprometre's en la construcció de futurs millors.",
          "2.4 Fonamentar els propis arguments en els valors democràtics, els drets humans i la justícia social, assumint els valors de la cultura de la pau en el decurs de debats i tasques cooperatives.",
          "2.5 Posicionar-se amb criteris propis i esdevenir ciutadans crítics amb consciència global mitjançant l'elaboració de productes personals o cooperatius ben argumentats, tot respectant les opinions dels altres."
        ],
        "3r-4t": [
          "2.1 Generar productes originals i creatius tot connectant i reelaborant els coneixements previs mitjançant les eines d'investigació pròpies de les ciències socials.",
          "2.2 Explicar problemes passats i presents de la humanitat a diferents escales temporals i espacials, des del món local al global, utilitzant conceptes, situacions i dades rellevants de les ciències socials.",
          "2.3 Construir la identitat individual i col·lectiva en el context del món actual, dels seus reptes i conflictes, des d'una perspectiva crítica, sistèmica i global, tot reconeixent la diversitat com a element enriquidor de la convivència.",
          "2.4 Elaborar i comunicar productes propis, crítics i argumentats, amb una mirada oberta al diàleg i al respecte a judicis i plantejaments diferents, tot reflexionant sobre el propi procés d'aprenentatge."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Interpretar els canvis i les continuïtats dels processos històrics, mitjançant la realització de projectes d'investigació i l'ús de fonts primàries i secundàries",
      "description": "Interpretar els canvis i les continuïtats dels processos històrics, mitjançant la realització de projectes d'investigació i l'ús de fonts primàries i secundàries, per interpretar els problemes del món actual i fer propostes a favor de la pau, el benestar i el desenvolupament sostenible.",
      "criteris": {
        "1r-2n": [
          "3.1 Identificar els canvis i les continuïtats entre les etapes històriques, a través de processos inductius, reptes i projectes de recerca, i trobar relacions amb el món actual.",
          "3.2 Diferenciar les causes i les conseqüències dels processos històrics i aplicar-ho en problemes actuals relacionats amb els objectius de desenvolupament sostenible.",
          "3.3 Representar adequadament informació geogràfica i històrica a través de diverses formes de representació gràfica, cartogràfica i visual.",
          "3.4 Situar fets i processos històrics en eixos cronològics, trobant relacions entre diferents períodes i simultaneïtats temporals entre diferents territoris.",
          "3.5 Identificar i utilitzar les fonts primàries i secundàries, valorant les seves aportacions al coneixement del medi i de les formes de vida en el present i el passat."
        ],
        "3r-4t": [
          "3.1 Distingir els grans canvis del món actual, als sectors productius, mercats i relacions socials, debatent les seves implicacions per a les generacions futures.",
          "3.2 Realitzar propostes per assolir els objectius de desenvolupament sostenible, mitjançant projectes de recerca, argumentades a partir de gràfics, imatges i mapes.",
          "3.3 Reflexionar sobre els reptes del passat, present i futur, i afrontar-los des de la perspectiva del sistema-món, la justícia social i la sostenibilitat."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Descobrir i analitzar els elements i dinàmiques que configuren el territori, mitjançant l'estudi de casos i problemàtiques geogràfiques",
      "description": "Descobrir i analitzar els elements i dinàmiques que configuren el territori, mitjançant l'estudi de casos i problemàtiques geogràfiques, per valorar els diferents paisatges i proposar alternatives de gestió territorial, amb criteris de sostenibilitat i justícia social.",
      "criteris": {
        "1r-2n": [
          "4.1 Interpretar l'espai des d'una perspectiva sistèmica, a través del concepte de paisatge, identificant-ne els elements i les interrelacions existents.",
          "4.2 Analitzar l'acció humana en els paisatges, dins dels diferents ecosistemes planetaris, valorant la riquesa del patrimoni natural i cultural, i detectant-ne les amenaces de degradació.",
          "4.3 Criticar i denunciar situacions d'injustícia social i de degradació ambiental, a diferents escales, tant en l'àmbit urbà com en el rural, comprometent-se per a la seva millora."
        ],
        "3r-4t": [
          "4.1 Realitzar estudis de casos amb variables múltiples i fer propostes per gestionar les activitats humanes en el territori amb criteris de sostenibilitat i justícia social.",
          "4.2 Actuar en defensa, protecció o millora de l'entorn (natural, rural i urbà) a través d'iniciatives a favor de la sostenibilitat i el repartiment just i solidari dels recursos.",
          "4.3 Comparar models d'organització política, econòmica i territorial per valorar com afecten la vida de les persones i fer propostes d'actuació."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Analitzar de forma crítica els mecanismes que han regulat la vida de les societats al llarg de la història fins a l'actualitat i la construcció dels sistemes democràtics",
      "description": "Analitzar de forma crítica els mecanismes que han regulat la vida de les societats al llarg de la història fins a l'actualitat i la construcció dels sistemes democràtics per participar de manera respectuosa i compromesa en activitats comunitàries que promoguin la convivència, la cohesió social i l'equitat.",
      "criteris": {
        "1r-2n": [
          "5.1 Identificar i analitzar els mecanismes que han regulat la vida en comú d'algunes societats del passat, interpretant els principals models d'organització social i política.",
          "5.2 Distingir els trets fonamentals de les societats democràtiques i valorar les consecucions de la democràcia i la vigència dels drets humans individuals i col·lectius i de les llibertats.",
          "5.3 Analitzar els trets bàsics de l'organització social, política i econòmica d'algunes societats del passat i valorar de manera crítica el grau d'equitat dels intercanvis i relacions amb altres poblacions.",
          "5.4 Mostrar actituds pacífiques i tolerants i assumir els drets i deures del marc de convivència, demostrant capacitat crítica i responent de manera assertiva davant de situacions injustes."
        ],
        "3r-4t": [
          "5.1 Assumir els valors democràtics en la convivència escolar i de l'entorn, fent propostes constructives i rebutjant situacions injustes i discriminatòries.",
          "5.2 Identificar les fites més importants en la lluita per a la democràcia i les llibertats al llarg del segle XX a l'estat espanyol, reconèixer els moviments socials i polítics que les han protagonitzat i preservar llurs memòries plurals.",
          "5.3 Exposar els objectius d'alguns moviments socials que treballen per a l'eliminació de les desigualtats i la resolució pacífica dels conflictes, identificant els elements que promouen la cohesió social i que generen una consciència solidària.",
          "5.4 Reconèixer els desafiaments de les modernes democràcies per a l'exercici d'una ciutadania activa, compromesa, participativa i inclusiva."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Interpretar els processos que han conformat les societats actuals en la seva diversitat i riquesa a partir de l'anàlisi de perspectives i mirades diverses",
      "description": "Interpretar els processos que han conformat les societats actuals en la seva diversitat i riquesa a partir de l'anàlisi de perspectives i mirades diverses per formar-se un criteri propi fonamentat i comprometre's en la defensa dels drets humans, la llibertat i la igualtat davant les situacions d'injustícia i discriminació.",
      "criteris": {
        "1r-2n": [
          "6.1 Explicar els trets definitoris d'algunes civilitzacions històriques, identificar elements de canvi i continuïtat en les formes de vida i subsistència i en l'organització de la societat i reconèixer aspectes significatius de la seva aportació a la cultura universal.",
          "6.2 Reconèixer les desigualtats socials en diferents èpoques històriques, els mecanismes de domini i control que s'hi han donat i les conseqüències en el món actual.",
          "6.3 Identificar els col·lectius que han estat sotmesos, silenciats i invisibilitzats al llarg de la història fins al present i destacar les diferents perspectives i aportacions.",
          "6.4 Caracteritzar els drets humans individuals i col·lectius i l'estat de dret com a sistema institucional que garanteix el seu compliment a tothom."
        ],
        "3r-4t": [
          "6.1 Identificar les fites més importants del procés d'institucionalització dels drets humans al llarg del segle XX i XXI, valorar-ne les consecucions i identificar els mecanismes de protecció i garantia.",
          "6.2 Identificar els sabers i les aportacions dels pobles originaris, especialment dels territoris dominats per pobles colonitzadors, les amenaces que afronten actualment i els moviments socials que defensen els seus drets.",
          "6.3 Caracteritzar els mecanismes dels estats per garantir el dret dels ciutadans a l'accés equitatiu als serveis públics, reduir les desigualtats i garantir una vida digna per a tothom.",
          "6.4 Formar-se un criteri propi sobre alguns problemes rellevants de l'entorn i participar de manera activa i compromesa, individualment i en equip, en projectes socials i cívics que comportin la defensa dels drets de determinats col·lectius."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Identificar els fonaments que sostenen les identitats personals i col·lectives des d'una perspectiva intercultural, respectant els sentiments de pertinença",
      "description": "Identificar els fonaments que sostenen les identitats personals i col·lectives des d'una perspectiva intercultural, respectant els sentiments de pertinença, i valorar les diverses manifestacions culturals i artístiques i el patrimoni material i immaterial per contribuir a la cohesió social i als valors que emanen d'una ciutadania europea responsable i solidària.",
      "criteris": {
        "1r-2n": [
          "7.1 Explicar els trets definitoris d'algunes cultures històriques, identificar elements de canvi i continuïtat en les seves expressions culturals i artístiques i reconèixer aspectes significatius de la seva aportació a la cultura universal.",
          "7.2 Reflexionar sobre els elements culturals que han conformat les diferents identitats individuals i col·lectives de l'entorn i les aportacions de cadascuna d'elles a la cultura humana universal i a la cohesió social, mostrant una actitud respectuosa envers els sentiments de pertinença.",
          "7.3 Assenyalar alguns elements bàsics del llegat històric i cultural d'Europa, així com els fonaments d'una ciutadania europea inclusiva i solidària.",
          "7.4 Valorar, protegir i conservar alguns elements del patrimoni artístic, històric i cultural, material i immaterial, com a fonament de les diverses identitats col·lectives i de la cohesió social i com a gaudi dels pobles."
        ],
        "3r-4t": [
          "7.1 Interpretar els processos que han conformat les societats europees actuals per mitjà d'una anàlisi intercultural i que incorpora una multiplicitat de factors i de perspectives.",
          "7.2 Analitzar les manifestacions artístiques i culturals i relacionar-les amb els seus creadors i la seva època, per interpretar les diverses cosmovisions i la seva finalitat.",
          "7.3 Identificar la importància representativa, expressiva i comunicativa de les imatges en la vida quotidiana de les persones i les societats i crear productes audiovisuals per expressar-se i comunicar resultats de recerques.",
          "7.4 Posicionar-se de manera argumentada davant de situacions de desigualtat, domini, injustícia i discriminació exercida sobre determinats col·lectius i minories.",
          "7.5 Comprometre's en l'exercici d'accions col·lectives orientades a la cohesió social, la solidaritat i la conservació del patrimoni artístic i cultural dins les comunitats de pertinença."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Analitzar les formes de vida i els fets i fenòmens socials, passats i presents, des de la perspectiva de gènere, i comprometre's en la igualtat d'oportunitats",
      "description": "Analitzar les formes de vida i els fets i fenòmens socials, passats i presents, des de la perspectiva de gènere, i comprometre's en la igualtat d'oportunitats, la participació efectiva i la responsabilitat compartida de totes les persones en la societat i l'entorn, superar estereotips i rebutjar qualsevol forma de discriminació i violència.",
      "criteris": {
        "1r-2n": [
          "8.1 Relacionar alguns canvis en els hàbits de vida tradicional i el treball domèstic i contrastar-los amb l'actualitat, identificant les pràctiques compatibles amb la salut, la sostenibilitat, la dignitat i el respecte, i assumir responsabilitats i compromisos en l'àmbit familiar, l'entorn escolar i la comunitat.",
          "8.2 Identificar els reptes en relació amb la corresponsabilitat en el treball reproductiu i comunitari entre homes i dones, remarcant-ne la importància per al funcionament de les societats.",
          "8.3 Identificar les limitacions socials i culturals que han impedit que les persones puguin desenvolupar aspiracions al llarg de diferents generacions i reconèixer la riquesa que aporten els vincles intergeneracionals.",
          "8.4 Prendre consciència de les causes que han relegat les dones a un rol secundari al llarg de la història i emprendre accions per valorar, dignificar i visibilitzar determinades aportacions com a font de riquesa per a tothom.",
          "8.5 Identificar i rebutjar les violències i les actituds irracionals i discriminatòries envers persones i col·lectius, amb una atenció especial a la diversitat d'identitats i expressions de gènere i diversitat afectivosexual."
        ],
        "3r-4t": [
          "8.1 Reconèixer els diferents moviments, causes i lideratges que han lluitat i treballen per a l'eliminació de la desigualtat i la discriminació per raó de gènere i d'opció afectivosexual en l'àmbit local i les seves connexions internacionals.",
          "8.2 Reconèixer les aportacions dels valors, habilitats i actituds que fomenten la convivència i els sentiments de comunitat exercides per les dones en diferents àmbits socials, econòmics i polítics.",
          "8.3 Justificar el principi d'igualtat entre homes i dones en l'àmbit laboral, analitzant críticament la desigualtat en la distribució, gestió i retribució del treball i els reptes en la conciliació familiar i la redistribució dels treballs de cures.",
          "8.4 Adoptar un paper actiu i compromès amb l'entorn, a partir de l'anàlisi crítica de la realitat econòmica i social, i els reptes pendents perquè les persones puguin desenvolupar les seves aspiracions, superant estereotips i prejudicis, de manera respectuosa amb la dignitat humana."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Valorar críticament les dinàmiques d'interdependència entre diferents factors dins un món globalitzat i les desigualtats i conflictes que es generen",
      "description": "Valorar críticament les dinàmiques d'interdependència entre diferents factors dins un món globalitzat i les desigualtats i conflictes que es generen, i relacionar les problemàtiques locals i globals per proposar alternatives basades en la cultura de la pau i adquirir compromisos que permetin la consecució d'un món més solidari i sostenible.",
      "criteris": {
        "1r-2n": [
          "9.1 Analitzar aspectes del funcionament de l'economia en el món, destacant la interdependència entre països, i el seu impacte en la realitat econòmica de l'entorn proper, i les desigualtats que generen, posant èmfasi en els col·lectius més vulnerables.",
          "9.2 Interpretar el paper dels moviments de població a escala global i local i conèixer les situacions que impulsen les persones a migrar per causes econòmiques o a desplaçar-se per buscar refugi.",
          "9.3 Analitzar i entendre l'evolució dels factors que generen conflictes violents, i les estratègies econòmiques, polítiques i socials per prevenir-los.",
          "9.4 Reconèixer les contribucions històriques i actuals a la solució pacífica dels conflictes, la negociació i la transformació social, política, econòmica i cultural en entorns inclusius."
        ],
        "3r-4t": [
          "9.1 Reconèixer els compromisos internacionals a favor de la pau, la seguretat de la mobilitat humana i la cooperació que es desenvolupen des de les institucions i des d'altres entitats no governamentals i de la societat civil.",
          "9.2 Interpretar la interdependència entre el passat i el present i reflexionar sobre la capacitat de decisió personal i col·lectiva com a subjectes històrics, adquirint compromisos per actuar en la millora de l'entorn proper.",
          "9.3 Aplicar estratègies basades en la cultura de la pau, la seguretat humana i la resiliència en la resolució dels conflictes que puguin sorgir en l'entorn escolar i comunitari."
        ]
      }
    }
  ]
},
  "Tecnologia i Digitalització": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Buscar, analitzar i seleccionar la informació adequada, de manera crítica i segura, tot aplicant processos de recerca, mètodes d'anàlisi de productes i experimentant amb eines de simulació",
      "description": "Buscar, analitzar i seleccionar la informació adequada, de manera crítica i segura, tot aplicant processos de recerca, mètodes d'anàlisi de productes i experimentant amb eines de simulació, per delimitar problemes tecnològics i proposar solucions a partir de la informació obtinguda.",
      "criteris": {
        "1r-2n-3r": [
          "1.1 Identificar i definir problemes o necessitats plantejades, tot cercant i contrastant la informació procedent de diferents fonts de manera crítica i segura, fent ús dels coneixements científics i tecnològics, avaluant-ne la fiabilitat i la pertinència.",
          "1.2 Analitzar i examinar productes tecnològics d'ús habitual a través de l'anàlisi d'objectes i sistemes, fent ús dels coneixements científics i tecnològics, utilitzant, si s'escau, eines de simulació, en la construcció de coneixement."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Planificar, dissenyar i desenvolupar solucions a problemes tecnològics amb autonomia i actitud creativa, tot aplicant el procés tecnològic, coneixements interdisciplinaris i treballant de manera ordenada i cooperativa",
      "description": "Planificar, dissenyar i desenvolupar solucions a problemes tecnològics amb autonomia i actitud creativa, tot aplicant el procés tecnològic, coneixements interdisciplinaris i treballant de manera ordenada i cooperativa, per resoldre problemes o necessitats de manera eficaç, innovadora i sostenible. (A 4t ESO, la matèria de Tecnologia recull aquesta competència com CE1: 'Identificar i proposar problemes tecnològics amb iniciativa i creativitat, tot estudiant les necessitats de l'entorn proper, aplicant estratègies i processos col·laboratius i iteratius relatius a projectes, per idear i planificar solucions de manera eficient i innovadora'.)",
      "criteris": {
        "1r-2n-3r": [
          "2.1 Idear i dissenyar solucions tecnològiques originals a problemes plantejats, tot aplicant el procés tecnològic amb conceptes, tècniques i procediments interdisciplinaris amb actitud emprenedora, perseverant i creativa, documentant la informació en una memòria de projecte.",
          "2.2 Seleccionar, planificar i organitzar el temps, els materials i les eines, així com les tasques necessàries per a la construcció d'una solució definida en un projecte, treballant individualment o en grup de manera cooperativa.",
          "2.3 Aplicar criteris de sostenibilitat en el disseny de solucions tecnològiques considerant tot el cicle de vida útil de l'objecte."
        ],
        "4t": [
          "1.1 Idear i planificar solucions tecnològiques emprenedores que generin un valor a la comunitat, a partir de l'observació i l'anàlisi de l'entorn més proper, tot estudiant les necessitats, els requisits i les possibilitats de millora.",
          "1.2 Aplicar, amb iniciativa, estratègies col·laboratives de gestió de projectes amb perspectiva interdisciplinària, seguint un procés iteratiu de validació, des de la fase d'ideació fins a la resolució de problemes.",
          "1.3 Desenvolupar la gestió del projecte de manera creativa, aplicant estratègies i tècniques col·laboratives, així com mètodes de recerca per a la ideació de solucions eficients, innovadores i respectuoses amb el medi ambient."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Aplicar de manera apropiada diferents tècniques i coneixements interdisciplinaris, tot utilitzant operadors, sistemes tecnològics i eines, seguint la planificació i el disseny sostenible previ",
      "description": "Aplicar de manera apropiada diferents tècniques i coneixements interdisciplinaris, tot utilitzant operadors, sistemes tecnològics i eines, seguint la planificació i el disseny sostenible previ per construir solucions tecnològiques que donin resposta a necessitats en diferents contextos. (A 4t ESO, correspon a CE2: 'Aplicar diferents tècniques i coneixements interdisciplinaris utilitzant procediments i recursos tecnològics tot preveient el cicle de vida dels productes per construir solucions tecnològiques sostenibles que donin resposta a necessitats plantejades'.)",
      "criteris": {
        "1r-2n-3r": [
          "3.1 Fabricar objectes o models mitjançant la manipulació i la conformació de materials, tot emprant instruments de mesura, eines i màquines adequades, posant en pràctica els fonaments d'estructures, mecanismes, electricitat i electrònica seguint les normes de seguretat i de salut.",
          "3.2 Avaluar el resultat d'una construcció tot contrastant les seves funcions en relació amb els requeriments tècnics del projecte, mitjançant l'observació i l'ús d'instruments de mesura per validar el resultat final."
        ],
        "4t": [
          "2.1 Analitzar el disseny d'un producte que doni resposta a una necessitat plantejada, avaluant-ne la demanda, l'evolució i la previsió de fi del cicle de vida amb criteri ètic, sostenible i responsable.",
          "2.2 Fabricar productes i solucions tecnològiques, fent ús del disseny assistit, utilitzant les diferents tècniques d'elaboració manual, mecànica i digital, emprant de manera adequada els diferents materials i recursos mecànics, elèctrics, electrònics i digitals.",
          "2.3 Argumentar les solucions tecnològiques aportades a les necessitats plantejades, valorant-ne la viabilitat econòmica, l'ús funcional, sostenible i eficient."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Descriure, representar i intercanviar idees o solucions a problemes tecnològics o digitals, utilitzant els mitjans de representació, simbologia i vocabulari adequats",
      "description": "Descriure, representar i intercanviar idees o solucions a problemes tecnològics o digitals, utilitzant els mitjans de representació, simbologia i vocabulari adequats, així com els instruments i els recursos disponibles, utilitzant les eines digitals per argumentar, comunicar i difondre informació. (A 4t ESO, correspon a CE3: 'Comunicar, argumentar i difondre idees i solucions tecnològiques en diferents espais virtuals, emprant diversos recursos tot aplicant els elements i les tècniques necessàries per intercanviar la informació i fomentar el treball en equip'.)",
      "criteris": {
        "1r-2n-3r": [
          "4.1 Documentar el procés de la creació d'un producte des del disseny fins a l'avaluació, elaborant la documentació tècnica i gràfica amb l'ajuda d'eines digitals, emprant els formats i el vocabulari tècnic adequats, de manera col·laborativa, tant presencialment com en remot.",
          "4.2 Representar objectes, diagrames i esquemes tècnics mitjançant eines digitals col·laboratives, tot aplicant les normes tècniques corresponents.",
          "4.3 Utilitzar dispositius i recursos digitals per a comunicar-se amb els altres, per difondre els propis aprenentatges i argumentar-los."
        ],
        "4t": [
          "3.1 Intercanviar informació i fomentar el treball en equip de manera assertiva, emprant les eines digitals, el vocabulari tècnic, símbols i esquemes de sistemes tecnològics apropiats.",
          "3.2 Presentar i difondre les propostes o solucions tecnològiques de manera concreta, emprant l'entonació, l'expressió, l'adaptació del discurs i del temps, usant un llenguatge inclusiu i lliure d'estereotips sexistes."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Desenvolupar algorismes i aplicacions informàtiques en diferents entorns, tot aplicant els principis del pensament computacional i incorporant les tecnologies emergents",
      "description": "Desenvolupar algorismes i aplicacions informàtiques en diferents entorns, tot aplicant els principis del pensament computacional i incorporant les tecnologies emergents, per resoldre problemes concrets, automatitzar processos i aplicar-los en sistemes de control o robòtica. (A 4t ESO, correspon a CE4: 'Desenvolupar solucions sostenibles a problemes plantejats que incorporin l'automatització i les tecnologies emergents, per dissenyar i construir sistemes de control programables i robòtics'.)",
      "criteris": {
        "1r-2n-3r": [
          "5.1 Descriure, interpretar i dissenyar solucions a problemes informàtics mitjançant algorismes i diagrames de flux, tot aplicant els elements i les tècniques de programació de manera creativa.",
          "5.2 Programar aplicacions senzilles per a diferents dispositius (ordinadors, dispositius mòbils i altres) emprant els elements de programació de manera apropiada, fent servir el programari i els llenguatges de programació adients i mòduls d'intel·ligència artificial que afegeixin funcionalitats.",
          "5.3 Automatitzar processos, màquines i objectes de manera autònoma, amb o sense connexió a Internet, mitjançant l'anàlisi, la construcció i la programació de robots i sistemes de control."
        ],
        "4t": [
          "4.1 Dissenyar, construir, controlar i/o simular sistemes automàtics programables i robots que siguin capaços de fer tasques de forma autònoma, aplicant coneixements de mecànica, electrònica, pneumàtica i components dels sistemes de control, així com altres coneixements interdisciplinaris.",
          "4.2 Integrar a les màquines i sistemes tecnològics aplicacions digitals emergents de control i simulació com Internet de les coses, tractament massiu de dades (big data) i intel·ligència artificial amb sentit crític, ètic i sostenible."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Utilitzar els fonaments del funcionament dels dispositius i de les aplicacions habituals de l'entorn digital d'aprenentatge, analitzant-ne els components i les funcions",
      "description": "Utilitzar els fonaments del funcionament dels dispositius i de les aplicacions habituals de l'entorn digital d'aprenentatge, analitzant-ne els components i les funcions i ajustant-los a les necessitats per fer-ne un ús més eficient i segur, per detectar i resoldre problemes tècnics senzills. (Aquesta competència és pròpia del cicle 1r-2n-3r; a 4t ESO, la matèria de Tecnologia la substitueix per la CE5: 'Emprar les eines digitals de disseny i fabricació, adaptant-les i configurant-les a les necessitats tot aplicant els coneixements interdisciplinaris, per a una producció més eficient i sostenible'.)",
      "criteris": {
        "1r-2n-3r": [
          "6.1 Fer un ús eficient i segur dels dispositius digitals d'ús quotidià en la resolució de problemes senzills, analitzant els components i els sistemes de comunicació, per identificar els riscos i adoptar mesures de seguretat per a la protecció de dades i equips.",
          "6.2 Crear continguts, elaborar materials i difondre'ls en diferents plataformes, configurant correctament les eines digitals habituals de l'entorn d'aprenentatge, ajustant-les a les necessitats i respectant les llicències i els drets d'autoria.",
          "6.3 Organitzar la informació de manera estructurada, aplicant tècniques d'emmagatzematge segur."
        ],
        "4t": [
          "5.1 Resoldre tasques proposades de manera eficient mitjançant l'ús i la configuració de diferents aplicacions i eines digitals, tot aplicant coneixements interdisciplinaris amb autonomia.",
          "5.2 Utilitzar en el disseny de solucions, eines de representació en tres dimensions i d'experimentació virtual mitjançant simuladors, per a la construcció del coneixement tecnològic.",
          "5.3 Emprar diferents gestors de presentació, eines de difusió o publicació de la informació per a la realització de tasques col·laboratives.",
          "5.4 Configurar programes o aplicacions informàtiques per al control de diferents automatismes."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Fer ús ètic, sostenible i ecosocialment responsable de la tecnologia, identificant les repercussions i les aportacions, per valorar l'impacte del desenvolupament tecnològic a la societat i a l'entorn",
      "description": "Fer ús ètic, sostenible i ecosocialment responsable de la tecnologia, identificant les repercussions i les aportacions, per valorar l'impacte del desenvolupament tecnològic a la societat i a l'entorn. (A 4t ESO, correspon a CE6: 'Analitzar processos tecnològics, valorant l'impacte en la societat i l'entorn, tot aplicant criteris de sostenibilitat, per fer un ús ètic i ecosocialment responsable de la tecnologia'.)",
      "criteris": {
        "1r-2n-3r": [
          "7.1 Identificar la influència de l'activitat tecnològica en la societat i en la sostenibilitat ambiental al llarg de la història, analitzant-ne les aportacions i les repercussions tot valorant-ne la importància per al desenvolupament sostenible.",
          "7.2 Fer un ús responsable i ètic de les tecnologies emergents, tot identificant les seves aportacions al benestar, a la igualtat social i a la reducció de l'impacte ambiental.",
          "7.3 Valorar l'economia circular com una aportació tecnològica i social a la sostenibilitat per reduir la necessitat de matèries primeres i aconseguir la reducció de residus."
        ],
        "4t": [
          "6.1 Fer un ús responsable de la tecnologia, mitjançant l'anàlisi i l'aplicació de criteris de sostenibilitat en la selecció de materials, el disseny i els processos de fabricació dels productes tecnològics, tot minimitzant l'impacte en la societat i el planeta.",
          "6.2 Analitzar els beneficis i valorar la contribució de les tecnologies al desenvolupament sostenible i la cura de l'entorn, que aporten l'arquitectura bioclimàtica, les energies renovables i la mobilitat eficient.",
          "6.3 Identificar i valorar la repercussió i els beneficis del desenvolupament de projectes tecnològics de caràcter social per mitjà de comunitats obertes, accions de voluntariat o projectes de servei a la comunitat."
        ]
      }
    }
  ]
},
};
