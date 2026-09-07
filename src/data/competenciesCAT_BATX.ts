/**
 * Competències Específiques i Criteris d'Avaluació del Batxillerat (matèries comunes) de Catalunya
 * Font: Decret 171/2022, de 20 de setembre, d'ordenació dels ensenyaments de batxillerat
 * Llicència: CC BY-NC-SA
 */

import type { AreaCompetencies } from './curriculum/types';

export const COMPETENCIES_CATALUNYA_BATX: Record<string, AreaCompetencies> = {
  "Educació Física": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Autogestionar la condició física per a l'adopció d'un estil de vida actiu i saludable",
      "description": "Autogestionar la condició física per a l'adopció d'un estil de vida actiu i saludable.",
      "criteris": [
        "1.1 Elaborar un pla de treball personalitzat per al manteniment o la millora de la salut.",
        "1.2 Consolidar els hàbits saludables valorant els beneficis que suposen al llarg de la vida.",
        "1.3 Utilitzar els protocols d'actuació dels primers auxilis i de prevenció de lesions.",
        "1.4 Aplicar recursos digitals per a la monitorització de l'activitat física i l'adquisició d'hàbits saludables."
      ]
    },
    {
      "id": "CE2",
      "title": "Resoldre situacions motrius diverses amb control i domini corporal per a la superació de reptes",
      "description": "Resoldre situacions motrius diverses amb control i domini corporal per a la superació de reptes.",
      "criteris": [
        "2.1 Resoldre situacions en diferents modalitats esportives i medis aplicant habilitats tècniques, tàctiques i estratègiques.",
        "2.2 Aplicar els elements i tècniques d'expressió corporal adequats a cada composició."
      ]
    },
    {
      "id": "CE3",
      "title": "Organitzar activitats fisicoesportives per a l'ocupació i el gaudi del temps de lleure activament",
      "description": "Organitzar activitats fisicoesportives per a l'ocupació i el gaudi del temps de lleure activament.",
      "criteris": [
        "3.1 Gestionar activitats, sessions o jornades esportives desenvolupant funcions d'organització i dinamització.",
        "3.2 Crear produccions d'expressió corporal incorporant-hi elements de crítica social.",
        "3.3 Organitzar activitats físiques en el medi natural i urbà aplicant normes de seguretat i de conservació del medi ambient.",
        "3.4 Valorar les sortides professionals associades a l'activitat física i l'esport."
      ]
    },
    {
      "id": "CE4",
      "title": "Aplicar actituds, valors i habilitats socials de forma proactiva en la pràctica d'activitat física i esportiva per a la millora de la convivència",
      "description": "Aplicar actituds, valors i habilitats socials de forma proactiva en la pràctica d'activitat física i esportiva per a la millora de la convivència.",
      "criteris": [
        "4.1 Cooperar en diferents situacions motrius mostrant maduresa en la gestió emocional i personal en l'assumpció dels diferents rols.",
        "4.2 Resoldre conflictes mitjançant l'aplicació d'habilitats socials i valors davant situacions discriminatòries i de violència en la pràctica fisicoesportiva."
      ]
    }
  ]
},
  "Filosofia": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Avaluar i generar arguments a partir de l'anàlisi formal i informal, per produir i valorar discursos orals i escrits de forma rigorosa",
      "description": "Avaluar i generar arguments a partir de l'anàlisi formal i informal, per produir i valorar discursos orals i escrits de forma rigorosa, evitar dogmatismes, biaixos i fal·làcies i distingir els sabers que aporten certesa a l'hora de sostenir opinions i hipòtesis.",
      "criteris": [
        "1.1 Avaluar críticament discursos, orals i escrits, sobre qüestions i problemes filosòfics, demostrant una comprensió correcta de les estructures argumentatives.",
        "1.2 Produir rigorosament arguments, aplicant normes lògiques, retòriques i argumentatives, i detectant i evitant maneres dogmàtiques, fal·laces i esbiaixades per exposar les pròpies opinions i idees, tant oralment com per escrit.",
        "1.3 Distingir entre els sabers que aporten certesa i aquells que no, a partir de la identificació de les seves característiques i l'anàlisi de les estructures argumentatives que els sostenen."
      ]
    },
    {
      "id": "CE2",
      "title": "Interpretar, generar i comunicar qüestions filosòfiques a partir de la selecció i l'anàlisi rigorosa de fonts",
      "description": "Interpretar, generar i comunicar qüestions filosòfiques a partir de la selecció i l'anàlisi rigorosa de fonts per produir i transmetre judicis i tesis personals i desenvolupar una actitud indagadora, autònoma, rigorosa i creativa en l'àmbit de la reflexió filosòfica.",
      "criteris": [
        "2.1 Demostrar un coneixement pràctic dels procediments elementals de la recerca filosòfica mitjançant tasques com la identificació de fonts confiables, la cerca eficient i fiable d'informació i l'anàlisi, la interpretació i l'avaluació d'aquesta.",
        "2.2 Desenvolupar tesis filosòfiques pròpies a partir del disseny, l'elaboració i la comunicació pública de creacions originals com treballs de recerca, dissertacions, comentaris de text i altres."
      ]
    },
    {
      "id": "CE3",
      "title": "Reconèixer i aplicar les normes de l'argumentació i del diàleg filosòfic, en diferents suports i activitats",
      "description": "Reconèixer i aplicar les normes de l'argumentació i del diàleg filosòfic, en diferents suports i activitats, per expressar-se amb rigor argumentatiu i desenvolupar el diàleg respectuós i constructiu amb els altres.",
      "criteris": [
        "3.1 Intercanviar i avaluar críticament idees sobre qüestions filosòfiques a partir del diàleg filosòfic.",
        "3.2 Argumentar rigorosament les pròpies idees en activitats de diàleg filosòfic.",
        "3.3 Participar de manera oberta, compromesa i respectuosa en activitats de diàleg sobre qüestions i problemes filosòficament rellevants."
      ]
    },
    {
      "id": "CE4",
      "title": "Reconèixer com els problemes filosòfics s'han plantejat en les diferents èpoques i les autores i els autors, i comparar-ho",
      "description": "Reconèixer com els problemes filosòfics s'han plantejat en les diferents èpoques i les autores i els autors, i comparar-ho, a partir de l'anàlisi i la interpretació de textos i altres formes d'expressió filosòfica i cultural, per reconèixer la radicalitat i la transcendència d'aquestes qüestions i abordar-les amb el bagatge de les aportacions de la tradició filosòfica.",
      "criteris": [
        "4.1 Distingir les principals preguntes de la filosofia i les diferents respostes filosòfiques mitjançant la indagació, l'anàlisi i la interpretació de textos filosòfics.",
        "4.2 Valorar la radicalitat i la transcendència dels problemes filosòfics mitjançant el reconeixement i l'anàlisi de textos filosòfics i altres formes d'expressió cultural."
      ]
    },
    {
      "id": "CE5",
      "title": "Avaluar de manera global, sistèmica i transdisciplinària problemes ètics i polítics fonamentals i d'actualitat analitzant-los filosòficament",
      "description": "Avaluar de manera global, sistèmica i transdisciplinària problemes ètics i polítics fonamentals i d'actualitat analitzant-los filosòficament per poder tractar-los de manera creativa i prendre una posició.",
      "criteris": [
        "5.1 Desenvolupar una concepció complexa i no dogmàtica dels problemes i de les qüestions fonamentals i d'actualitat mitjançant l'anàlisi filosòfica d'aquests.",
        "5.2 Desenvolupar una posició pròpia amb relació a problemes fonamentals i qüestions d'actualitat mitjançant l'argumentació i el diàleg filosòfics."
      ]
    },
    {
      "id": "CE6",
      "title": "Desenvolupar la sensibilitat i la comprensió crítica de l'art i altres manifestacions amb valor estètic",
      "description": "Desenvolupar la sensibilitat i la comprensió crítica de l'art i altres manifestacions amb valor estètic a partir de les principals idees filosòfiques sobre la bellesa i la creació artística per contribuir a l'educació estètica.",
      "criteris": [
        "6.1 Analitzar críticament obres d'art i altres manifestacions estètiques a partir de les principals idees filosòfiques sobre art i creació.",
        "6.2 Construir judicis propis sobre diferents expressions artístiques, tot aplicant conceptes filosòfics."
      ]
    }
  ]
},
  "Història de la Filosofia": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Avaluar els arguments atenent el seu context històric, social i cultural, identificant les influències que els sustenten i la seva repercussió en la història de la filosofia",
      "description": "Avaluar els arguments atenent el seu context històric, social i cultural, identificant les influències que els sustenten i la seva repercussió en la història de la filosofia per descobrir la naturalesa dels seus possibles dogmatismes i fal·làcies.",
      "criteris": [
        "1.1 Avaluar críticament discursos, orals i escrits, sobre qüestions i problemes filosòfics que apareixen al llarg de la història de la filosofia, demostrant una comprensió correcta de les estructures argumentatives.",
        "1.2 Produir rigorosament arguments a partir de l'estudi de la història de la filosofia, aplicant les normes lògiques, retòriques i argumentatives, i detectant i evitant maneres dogmàtiques, fal·laces i biaixos per exposar les pròpies opinions i idees, tant oralment com per escrit."
      ]
    },
    {
      "id": "CE2",
      "title": "Interpretar i comunicar qüestions filosòfiques a partir de la selecció i l'anàlisi rigorosa de fonts de la història de la filosofia per entendre el nostre present atenent el passat",
      "description": "Interpretar i comunicar qüestions filosòfiques a partir de la selecció i l'anàlisi rigorosa de fonts de la història de la filosofia per entendre el nostre present atenent el passat i per produir i transmetre judicis i tesis personals i desenvolupar una actitud indagadora, autònoma, rigorosa i creativa en l'àmbit de la reflexió filosòfica.",
      "criteris": [
        "2.1 Construir un coneixement rigorós de fonts i textos filosòfics, aplicant tècniques de cerca, anàlisi, organització i comparació i relacionant-los correctament amb els contextos històrics, problemes o tesis, autores i autors, i amb altres àmbits i activitats culturals.",
        "2.2 Construir discursos propis sobre problemes historicofilosòfics, mitjançant l'elaboració i la presentació de documents i treballs de recerca documental, tant de manera individual com grupal."
      ]
    },
    {
      "id": "CE3",
      "title": "Aplicar la dissertació filosòfica per contraposar i posar en diàleg les idees dels diferents pensadors i pensadores de la història de la filosofia",
      "description": "Aplicar la dissertació filosòfica per contraposar i posar en diàleg les idees dels diferents pensadors i pensadores de la història de la filosofia, i així connectar el present amb el passat per transformar-lo d'acord amb els grans consensos sorgits dels drets humans i els objectius de desenvolupament sostenible (ODS).",
      "criteris": [
        "3.1 Intercanviar i avaluar críticament idees sobre qüestions filosòfiques a partir de la dissertació.",
        "3.2 Argumentar rigorosament les pròpies idees en activitats de dissertació filosòfica.",
        "3.3 Participar de manera oberta, compromesa i respectuosa en activitats de diàleg sobre qüestions i problemes filosòficament rellevants per crear una dissertació compartida."
      ]
    },
    {
      "id": "CE4",
      "title": "Reconèixer com els problemes filosòfics s'han plantejat en les diferents èpoques i autores i autors i comparar-ho, a partir de l'anàlisi i interpretació de textos dels principals autors i autores",
      "description": "Reconèixer com els problemes filosòfics s'han plantejat en les diferents èpoques i autores i autors i comparar-ho, a partir de l'anàlisi i la interpretació de textos dels principals autors i autores de la història de la filosofia, per reconèixer la radicalitat i la transcendència d'aquestes qüestions i abordar-les amb el bagatge de les aportacions de la tradició filosòfica.",
      "criteris": [
        "4.1 Distingir les principals preguntes de la història de la filosofia i les diferents respostes filosòfiques mitjançant la indagació i l'anàlisi i la interpretació de textos filosòfics.",
        "4.2 Relacionar les diferents respostes filosòfiques que s'han donat en la cultura, mitjançant l'anàlisi de textos i altres formes d'expressió cultural amb les respostes de la història de la filosofia.",
        "4.3 Comparar les diferents preguntes, idees, tesis i controvèrsies filosòfiques de la història del pensament, mitjançant el diàleg diacrònic amb els textos de la història de la filosofia i amb el diàleg sincrònic sobre els textos de la història de la filosofia.",
        "4.4 Valorar la pluralitat, la complexitat i la dialèctica de la història del pensament, mitjançant la comprensió i l'expressió de les relacions d'oposició i complementarietat entre les tesis, escoles, filòsofes i filòsofs de les mateixes èpoques i tradicions o de diferents."
      ]
    },
    {
      "id": "CE5",
      "title": "Avaluar de manera global, sistèmica i transdisciplinària problemes ètics i polítics fonamentals i d'actualitat analitzant-los filosòficament",
      "description": "Avaluar de manera global, sistèmica i transdisciplinària problemes ètics i polítics fonamentals i d'actualitat analitzant-los filosòficament per poder tractar-los de manera creativa i prendre una posició.",
      "criteris": [
        "5.1 Avaluar críticament problemes contemporanis complexos emprant els conceptes, les idees, les teories i les controvèrsies historicofilosòfics que poden contribuir a clarificar-los.",
        "5.2 Elaborar propostes crítiques i personals sobre els problemes contemporanis complexos fent ús d'idees, teories, estratègies argumentatives i el diàleg filosòfic."
      ]
    },
    {
      "id": "CE6",
      "title": "Desenvolupar la sensibilitat i la comprensió crítica de l'art i altres manifestacions amb valor estètic",
      "description": "Desenvolupar la sensibilitat i la comprensió crítica de l'art i altres manifestacions amb valor estètic a partir de les principals idees filosòfiques sobre la bellesa i la creació artística per contribuir a l'educació estètica.",
      "criteris": [
        "6.1 Comprendre l'evolució de la reflexió estètica sobre la bellesa, l'experiència estètica i els conceptes d'artesania, art i disseny al llarg de la història mitjançant l'anàlisi de textos filosòfics i de diferents expressions artístiques.",
        "6.2 Construir un judici propi sobre diferents expressions artístiques, tot aplicant els conceptes estètics a les valoracions d'aquestes expressions."
      ]
    }
  ]
},
  "Història": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Aplicar els procediments de la recerca històrica a partir de la formulació de preguntes i l'anàlisi de fonts, per interpretar el passat",
      "description": "Aplicar els procediments de la recerca històrica a partir de la formulació de preguntes i l'anàlisi de fonts, per interpretar el passat, formar-se un criteri propi a partir del contrast d'informacions i desenvolupar el pensament crític.",
      "criteris": [
        "1.1 Plantejar-se preguntes i hipòtesis sobre fets o fenòmens històrics, seleccionar, analitzar i obtenir informació de diferents fonts per interpretar el passat de manera crítica, aportant arguments i dades contrastats.",
        "1.2 Comunicar i transferir els coneixements adquirits mitjançant recursos expressius que incorporin formats i llenguatges diversos i la presentació de la informació en mitjans i entorns digitals, així com usar adequadament el vocabulari específic de la història contemporània mitjançant la lectura activa, l'elaboració de textos escrits, les intervencions orals i les produccions audiovisuals, construint un discurs rigorós, coherent i inclusiu.",
        "1.3 Demostrar la comprensió integrada de sabers i mostrar una actitud participativa en el marc de l'exercici d'una ciutadania democràtica."
      ]
    },
    {
      "id": "CE2",
      "title": "Analitzar de forma crítica i comparar els diferents règims polítics de la contemporaneïtat i la construcció de l'estat de dret",
      "description": "Analitzar de forma crítica i comparar els diferents règims polítics de la contemporaneïtat i la construcció de l'estat de dret per participar de manera respectuosa i compromesa en activitats comunitàries que promoguin la convivència, la cohesió social i l'equitat, posant en valor els principis democràtics.",
      "criteris": [
        "2.1 Reconèixer el llegat democràtic i les accions a favor de la llibertat identificant i comparant els diferents règims polítics des de la fallida de la monarquia absoluta i els inicis de l'estat liberal fins a l'actualitat, i l'evolució de les seves institucions i lleis.",
        "2.2 Identificar i valorar de manera crítica la transició cap a la democràcia, analitzant les ruptures i les continuïtats, mitjançant l'estudi de les memòries plurals.",
        "2.3 Valorar de manera crítica la potencialitat del sistema democràtic actual i els reptes pendents, aportant possibles solucions a les problemàtiques actuals."
      ]
    },
    {
      "id": "CE3",
      "title": "Identificar la pluralitat nacional, cultural i lingüística per respectar els sentiments de pertinença, l'existència d'identitats múltiples",
      "description": "Identificar la pluralitat nacional, cultural i lingüística per respectar els sentiments de pertinença, l'existència d'identitats múltiples i desenvolupar l'empatia i el respecte com a base de la convivència en una societat democràtica.",
      "criteris": [
        "3.1 Identificar els diferents processos polítics, socials i culturals que han tingut lloc al llarg de la història en la formació de l'Estat i en la construcció de les diferents nacionalitats i, específicament, en l'evolució del catalanisme.",
        "3.2 Reconèixer i identificar les identitats múltiples existents als territoris per entendre que el respecte dels diferents sentiments de pertinença és la base d'una convivència pacífica en el marc d'un sistema democràtic i plural."
      ]
    },
    {
      "id": "CE4",
      "title": "Analitzar l'evolució econòmica de l'Estat espanyol i els seus efectes, relacionar-la amb la desigualtat social i territorial",
      "description": "Analitzar l'evolució econòmica de l'Estat espanyol i els seus efectes, relacionar-la amb la desigualtat social i territorial, percebre la natura dels canvis en el món actual i actuar amb criteris de sostenibilitat i de manera crítica i compromesa per a la millora de la societat i de l'entorn.",
      "criteris": [
        "4.1 Analitzar l'evolució econòmica de l'Estat espanyol, els seus diferents ritmes i cicles de creixement, en el context dels països del seu entorn.",
        "4.2 Identificar les conseqüències del creixement econòmic, en els contextos històrics i actualment, analitzant críticament la idea de progrés i valorant els seus efectes pel que fa a la desigualtat social, els desequilibris territorials, la degradació ambiental i les relacions de dependència, reflectint actituds en favor dels objectius de desenvolupament sostenible i comportaments ecosocials."
      ]
    },
    {
      "id": "CE5",
      "title": "Analitzar la societat espanyola, els canvis i les continuïtats al llarg del temps, en relació amb l'evolució de la població",
      "description": "Analitzar la societat espanyola, els canvis i les continuïtats al llarg del temps, en relació amb l'evolució de la població, els nivells i les formes de vida i treball i els moviments i conflictes socials, per valorar els progressos i les limitacions per avançar en l'equitat, la justícia i la cohesió social.",
      "criteris": [
        "5.1 Descriure les transformacions socials i les diferents maneres d'organització i participació política que s'han produït del pas de l'Antic Règim a la nova societat de classes, analitzant el sorgiment i l'evolució del concepte de ciutadania i les noves formes de relació social, identificant les desigualtats i la concentració del poder en determinats grups socials.",
        "5.2 Analitzar de manera multicausal l'evolució demogràfica de l'Estat espanyol, la desigual distribució de la població i el paper de les migracions interiors i exteriors i els exilis en la història contemporània d'Espanya.",
        "5.3 Caracteritzar el naixement i l'evolució del moviment obrer durant els segles XIX i XX, interpretant les causes de la conflictivitat social i laboral i la seva articulació en moviments socials i polítics.",
        "5.4 Deduir, per mitjà de l'estudi crític de notícies i dades estadístiques, l'evolució de la societat, identificant els èxits i els retrocessos experimentats i les mesures adoptades per les institucions fins al present, l'evolució dels nivells de vida i de benestar, així com els límits i reptes de futur, des d'una perspectiva solidària a favor dels col·lectius més vulnerables."
      ]
    },
    {
      "id": "CE6",
      "title": "Analitzar críticament el paper de les creences i les ideologies en l'evolució de l'articulació social, en l'ús del poder i en la configuració d'identitats i projectes polítics",
      "description": "Analitzar críticament el paper de les creences i les ideologies en l'evolució de l'articulació social, en l'ús del poder i en la configuració d'identitats i projectes polítics, per comprendre la complexitat de la contemporaneïtat i per valorar i respectar la convivència en una societat plural i democràtica.",
      "criteris": [
        "6.1 Generar opinions argumentades, debatre i transferir idees i coneixements sobre la funció que han exercit les diferents ideologies a l'articulació social i política de l'Espanya contemporània, identificant les principals cultures polítiques que s'han anat succeint, les formes d'organització i els diferents projectes polítics que representaven i expressant actituds respectuoses davant les idees diferents de les pròpies.",
        "6.2 Emprar el rigor metodològic de la història en l'estudi de les grans reformes estructurals que va emprendre la Segona República, identificant-ne els èxits i les reaccions antidemocràtiques que van derivar en el cop d'estat i l'esclat de la Guerra Civil, i en l'estudi del marc conceptual sobre els sistemes totalitaris aplicat en la interpretació del franquisme."
      ]
    },
    {
      "id": "CE7",
      "title": "Analitzar les dinàmiques d'interdependència entre diferents agents en el context d'un món globalitzat per avalar els compromisos de cooperació",
      "description": "Analitzar les dinàmiques d'interdependència entre diferents agents en el context d'un món globalitzat per avalar els compromisos de cooperació, promoure actituds solidàries i proposar alternatives a les problemàtiques locals i globals basades en la cultura de la pau i en la consecució d'un món més solidari i sostenible.",
      "criteris": [
        "7.1 Assenyalar els reptes globals i els principals compromisos de cooperació en l'esfera internacional, així com els que emanen d'una ciutadania europea responsable i solidària.",
        "7.2 Plantejar propostes d'acció que fomentin una actitud solidària i pacífica i alternatives davant de les problemàtiques que es viuen actualment a escala local, europea i global."
      ]
    },
    {
      "id": "CE8",
      "title": "Analitzar els processos i els fenòmens històrics des de la perspectiva de gènere i la investigació sobre el moviment feminista",
      "description": "Analitzar els processos i els fenòmens històrics des de la perspectiva de gènere i la investigació sobre el moviment feminista, per visibilitzar-ne la presència dins la història, promoure actituds en defensa de la igualtat i rebutjar qualsevol forma de discriminació i violència.",
      "criteris": [
        "8.1 Introduir la perspectiva de gènere en l'observació i l'anàlisi de la realitat històrica i actual, identificant els mecanismes de dominació que han generat i mantingut la desigualtat entre homes i dones i l'assignació de rols de gènere i que han relegat les dones a un paper subordinat a la societat.",
        "8.2 Reconèixer els moviments, les causes i els lideratges en pro de l'equitat de gènere i d'opció afectivosexual en l'època contemporània i les aportacions de les dones en diferents àmbits socials, econòmics, polítics i culturals.",
        "8.3 Participar en debats i projectes o accions de defensa de l'equitat de gènere i de rebuig de qualsevol manifestació de discriminació i violència per mitjà de propostes d'actuació."
      ]
    },
    {
      "id": "CE9",
      "title": "Analitzar el llegat cultural i patrimonial per valorar-lo com a expressió de les memòries plurals, individuals i col·lectives",
      "description": "Analitzar el llegat cultural i patrimonial per valorar-lo com a expressió de les memòries plurals, individuals i col·lectives i contribuir a la seva recuperació, conservació i promoció com a element conformador de les identitats i cohesionador de la comunitat.",
      "criteris": [
        "9.1 Elaborar treballs d'indagació i recerca, iniciant-se en la metodologia històrica i la historiografia, generant productes relacionats amb la memòria col·lectiva sobre esdeveniments, personatges o elements patrimonials d'interès social o cultural de l'entorn local, posant en valor el patrimoni històric i considerant-lo un bé comú que s'ha de protegir.",
        "9.2 Participar en accions, recerques i projectes de recuperació de la memòria històrica a partir de la recollida de fonts directes i indirectes i d'arxius personals, locals i institucionals."
      ]
    }
  ]
},
  "Llengua Catalana i Literatura": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Explicar i apreciar la diversitat lingüística del món a partir del coneixement de la realitat plurilingüe i pluricultural de Catalunya i d'Espanya",
      "description": "Explicar i apreciar la diversitat lingüística del món a partir del coneixement de la realitat plurilingüe i pluricultural de Catalunya i d'Espanya, i les seves varietats dialectals, així com de la reflexió sobre els fenòmens del contacte entre llengües, per afavorir el raonament interlingüístic, refutar els estereotips i prejudicis lingüístics i valorar aquesta diversitat com a font de patrimoni cultural.",
      "criteris": {
        "1r": [
          "1.1 Reconèixer i valorar les llengües de Catalunya i d'Espanya i les respectives varietats dialectals, amb una atenció especial a la del propi territori, a partir de l'explicació del seu desenvolupament històric i sociolingüístic i de la situació actual, contrastant de manera explícita i amb el metallenguatge apropiat aspectes lingüístics i discursius de les diferents llengües, així com trets dels dialectes del català i del castellà, en manifestacions orals, escrites i multimodals.",
          "1.2 Qüestionar i refutar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, a partir de l'exploració i la reflexió entorn dels fenòmens de contacte entre llengües, amb especial atenció al paper de les xarxes socials i dels mitjans de comunicació, i de la investigació sobre els drets lingüístics i diversos models de convivència entre llengües."
        ],
        "2n": [
          "1.1 Reconèixer i valorar les llengües de Catalunya i d'Espanya i les respectives varietats dialectals, amb una atenció especial a la del propi territori, contrastant de manera explícita i amb el metallenguatge apropiat aspectes lingüístics i discursius de les llengües i els dialectes en manifestacions orals, escrites i multimodals, diferenciant els trets de llengua que responen a la diversitat dialectal de les que es corresponen amb sociolectes o registres.",
          "1.2 Qüestionar i refutar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, atenent la diversitat de normes cultes i estàndards que es donen en una mateixa llengua, així com analitzant i valorant la rellevància actual dels mitjans de comunicació i de les xarxes socials en els processos de normalització lingüística."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Comprendre i interpretar textos orals i multimodals, amb especial atenció als textos acadèmics i dels mitjans de comunicació",
      "description": "Comprendre i interpretar textos orals i multimodals, amb especial atenció als textos acadèmics i dels mitjans de comunicació, mitjançant la captació del sentit general i la informació rellevant, de la identificació del punt de vista i la intenció de l'emissor, i la valoració de la fiabilitat, la forma i el contingut, per construir coneixement, formar-se opinió i eixamplar críticament les possibilitats de gaudi i lleure.",
      "criteris": {
        "1r": [
          "2.1 Identificar el sentit global, l'estructura, la informació rellevant en funció de les necessitats comunicatives i la intenció de l'emissor en textos orals i multimodals complexos propis de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals complexos, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "2n": [
          "2.1 Identificar el sentit global, l'estructura, la informació rellevant en funció de les necessitats comunicatives i la intenció de l'emissor en textos orals i multimodals especialitzats propis de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals especialitzats, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Produir textos orals i multimodals, amb atenció preferent als textos acadèmics, amb el rigor, la coherència, la fluïdesa i el registre adequats",
      "description": "Produir textos orals i multimodals, amb atenció preferent als textos acadèmics, amb el rigor, la coherència, la fluïdesa i el registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals amb una actitud cooperativa i respectuosa, tant per construir coneixement i establir vincles personals, com per intervenir de manera activa i informada en diferents contextos socials.",
      "criteris": {
        "1r": [
          "3.1 Dur a terme exposicions i argumentacions orals formals amb diferent grau de planificació sobre temes d'interès científic i cultural i de rellevància acadèmica i social, ajustant-se a les convencions pròpies de cada gènere discursiu, i fer-ho amb la fluïdesa, el rigor, la coherència i el registre adequats, en diferents suports i utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals formals i informals i en el treball en equip, amb una actitud d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ],
        "2n": [
          "3.1 Dur a terme exposicions i argumentacions orals extenses i en què es recullin diferents punts de vista, amb diferent grau de planificació sobre temes d'interès científic i cultural i de rellevància acadèmica i social, ajustant-se a les convencions pròpies de cada gènere discursiu, i fer-ho amb la fluïdesa, el rigor, la coherència i el registre adequats, en diferents suports i utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals formals i informals i en el treball en equip, amb una actitud d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Comprendre, interpretar i valorar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals, amb especial atenció a textos acadèmics i dels mitjans de comunicació",
      "description": "Comprendre, interpretar i valorar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals, amb especial atenció a textos acadèmics i dels mitjans de comunicació, reconeixent el sentit global i les idees principals i secundàries, integrant la informació explícita i fent les inferències necessàries, identificant la intenció de l'emissor, reflexionant sobre el contingut i la forma, i avaluant-ne la qualitat i fiabilitat per tal de construir coneixement i donar resposta a necessitats i interessos comunicatius diversos.",
      "criteris": {
        "1r": [
          "4.1 Identificar el sentit global, l'estructura, la informació rellevant i la intenció de l'emissor de textos escrits i multimodals especialitzats, amb una atenció especial a textos acadèmics i dels mitjans de comunicació, fent les inferències necessàries i amb diferents propòsits de lectura.",
          "4.2 Valorar la forma i el contingut de textos complexos, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "2n": [
          "4.1 Identificar el sentit global, l'estructura, la informació rellevant i la intenció de l'emissor de textos escrits i multimodals especialitzats de major complexitat, amb una atenció especial a textos acadèmics i dels mitjans de comunicació, fent les inferències necessàries i amb diferents propòsits de lectura.",
          "4.2 Valorar críticament la forma i el contingut de textos especialitzats, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments lingüístics emprats."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Produir textos escrits i multimodals coherents, cohesionats, adequats i correctes, amb especial atenció als gèneres discursius de l'àmbit acadèmic",
      "description": "Produir textos escrits i multimodals coherents, cohesionats, adequats i correctes, amb especial atenció als gèneres discursius de l'àmbit acadèmic i amb regulació dels iguals i autoregulació autònoma, per construir coneixement i donar resposta de manera informada, eficaç i creativa a propòsits comunicatius concrets.",
      "criteris": {
        "1r": [
          "5.1 Elaborar textos acadèmics coherents, cohesionats i amb el registre adequat sobre temes curriculars o d'interès social i cultural, precedits d'un procés de planificació que atengui la situació comunicativa, el destinatari, el propòsit i el canal, i de redacció i revisió d'esborranys de manera individual o entre iguals, o mitjançant altres instruments de consulta.",
          "5.2 Incorporar procediments per enriquir els textos, atenent l'ús discursiu de diferents elements lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical, de l'àmbit social i acadèmic."
        ],
        "2n": [
          "5.1 Elaborar textos acadèmics coherents, cohesionats i amb el registre adequat sobre temes curriculars o d'interès social i cultural, precedits d'un procés de planificació que atengui la situació comunicativa, el destinatari, el propòsit i el canal, i de redacció i revisió d'esborranys entre iguals o utilitzant altres instruments de consulta.",
          "5.2 Incorporar procediments per enriquir els textos, atenent l'ús discursiu de diferents elements lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical, de l'àmbit social i acadèmic."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Seleccionar i contrastar informació procedent de diferents fonts, avaluant-ne la fiabilitat i la pertinència en funció dels objectius de lectura",
      "description": "Seleccionar i contrastar informació procedent de diferents fonts, avaluant-ne la fiabilitat i la pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació, i integrar-la i transformar-la en coneixement per comunicar-la adoptant un punt de vista crític i personal alhora que respectuós amb la propietat intel·lectual, especialment en el marc de la realització de treballs d'investigació sobre temes del currículum.",
      "criteris": {
        "1r": [
          "6.1 Elaborar treballs d'investigació de manera autònoma, en diferents suports, sobre temes curriculars d'interès cultural que impliquin localitzar, seleccionar i contrastar informació procedent de diferents fonts; calibrar-ne la fiabilitat i la pertinència en funció dels objectius de lectura; organitzar-la i integrar-la en esquemes propis, i reelaborar-la i comunicar-la de manera creativa, adoptant un punt de vista crític i respectuós amb la propietat intel·lectual.",
          "6.2 Avaluar la veracitat de notícies i informacions, amb especial atenció a les xarxes socials i a altres entorns digitals, seguint pautes d'anàlisi, contrast i verificació, fent ús de les eines adequades i mantenint una actitud crítica davant els possibles biaixos de la informació i autoregulant-se'n en l'ús.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ],
        "2n": [
          "6.1 Elaborar treballs d'investigació de manera autònoma, en diferents suports, sobre diversos temes d'interès acadèmic, personal o social que impliquin localitzar, seleccionar i contrastar informació procedent de diferents fonts, amb una atenció especial a la gestió del seu emmagatzematge i de la seva recuperació, així com a l'avaluació de la fiabilitat i la pertinència; organitzar-la i integrar-la en esquemes propis, i reelaborar-la i comunicar-la de manera creativa, adoptant un punt de vista crític i respectuós amb la propietat intel·lectual.",
          "6.2 Avaluar la veracitat de notícies i informacions, amb especial atenció a les xarxes socials i a altres entorns digitals, seguint pautes d'anàlisi, contrast i verificació, fent ús de les eines adequades i mantenint una actitud crítica davant els possibles biaixos de la informació i autoregulant-se'n en l'ús.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Seleccionar i llegir de manera autònoma obres rellevants de la literatura contemporània com a font de plaer i coneixement",
      "description": "Seleccionar i llegir de manera autònoma obres rellevants de la literatura contemporània com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament quant a diversitat, complexitat i qualitat de les obres, i compartir experiències lectores, per construir la pròpia identitat lectora i gaudir de la dimensió social de la lectura.",
      "criteris": {
        "1r": [
          "7.1 Triar i llegir de manera autònoma obres rellevants de la literatura contemporània i deixar constància del progrés de l'itinerari lector i cultural personal mitjançant l'explicació argumentada dels criteris de selecció de les lectures, de les formes d'accés a la cultura literària i de l'experiència de lectura.",
          "7.2 Compartir l'experiència lectora utilitzant un metallenguatge específic i elaborar una interpretació personal establint vincles argumentats amb altres obres i altres experiències artístiques i culturals."
        ],
        "2n": [
          "7.1 Triar i llegir de manera autònoma obres rellevants que es relacionin amb les propostes de lectura guiada, incloent-hi l'assaig literari i les obres actuals que estableixin connexions amb la tradició, i deixar constància del progrés de l'itinerari lector i cultural personal mitjançant l'explicació argumentada dels criteris de selecció de les lectures, de les formes d'accés a la cultura literària i de l'experiència de lectura.",
          "7.2 Compartir l'experiència lectora utilitzant un metallenguatge específic i elaborar una interpretació personal establint vincles argumentats amb altres obres i altres experiències artístiques i culturals."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Llegir, interpretar i valorar obres rellevants de la literatura catalana, castellana i hispanoamericana",
      "description": "Llegir, interpretar i valorar obres rellevants de la literatura catalana, castellana i hispanoamericana, utilitzant un metallenguatge específic i mobilitzant l'experiència biogràfica i els coneixements literaris i culturals, per establir vincles entre textos diversos que configurin un mapa cultural i eixamplin les possibilitats de gaudir de la literatura i de crear textos d'intenció literària.",
      "criteris": {
        "1r": [
          "8.1 Explicar i argumentar la interpretació de les obres llegides mitjançant l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra i de les relacions externes del text amb el context sociohistòric i amb la tradició literària, utilitzant un metallenguatge específic i incorporant judicis de valor vinculats a l'apreciació estètica de les obres.",
          "8.2 Desenvolupar projectes d'investigació que es concretin en una exposició oral, un assaig o una presentació multimodal, mitjançant l'establiment de vincles argumentats entre els clàssics de la literatura catalana, castellana i hispanoamericana, des de l'edat mitjana fins a l'últim quart del segle XIX, objecte de lectura guiada, i altres textos i manifestacions artístiques clàssiques o contemporànies, en funció de temes, tòpics, estructures, llenguatge, recursos expressius i valors ètics i estètics, i explicitant la implicació i la resposta personal del lector a la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en suports diferents i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en què s'utilitzin les convencions formals dels diversos gèneres i estils literaris."
        ],
        "2n": [
          "8.1 Explicar i argumentar la interpretació de les obres llegides a partir de l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra i de les relacions externes del text amb el context sociohistòric i amb la tradició literària, utilitzant un metallenguatge específic i incorporant judicis de valor vinculats a l'apreciació estètica de les obres.",
          "8.2 Desenvolupar projectes d'investigació que es concretin en una exposició oral, un assaig o una presentació multimodal, mitjançant l'establiment de vincles argumentats entre les obres de la literatura catalana, castellana i hispanoamericana des de l'últim quart del segle XIX fins al segle XXI, objecte de lectura guiada, i altres textos i manifestacions artístiques d'ahir i d'avui, en funció de temes, tòpics, estructures, llenguatge, recursos expressius i valors ètics i estètics, i explicitant la implicació i la resposta personal del lector a la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en suports diferents i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en què s'utilitzin les convencions formals dels diversos gèneres i estils literaris."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Consolidar el coneixement explícit i sistemàtic sobre l'estructura de la llengua i els usos i aprofundir-hi, i reflexionar de manera autònoma sobre les eleccions lingüístiques i discursives",
      "description": "Consolidar el coneixement explícit i sistemàtic sobre l'estructura de la llengua i els usos i aprofundir-hi, i reflexionar de manera autònoma sobre les eleccions lingüístiques i discursives, amb la terminologia adequada, per desenvolupar la consciència lingüística, augmentar el repertori comunicatiu i millorar les destreses tant de producció oral i escrita com de recepció crítica.",
      "criteris": {
        "1r": [
          "9.1 Revisar els textos propis i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística i amb un metallenguatge específic, i identificar i resoldre problemes de comprensió lectora utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i un metallenguatge específic, en la comprensió i la producció de textos acadèmics, dels mitjans de comunicació, personals i socials.",
          "9.3 Elaborar i presentar els resultats de petits projectes d'investigació sobre aspectes rellevants del funcionament de la llengua, formulant hipòtesis i establint generalitzacions, utilitzant els conceptes i la terminologia lingüística adequada i consultant de manera autònoma diccionaris, manuals i gramàtiques."
        ],
        "2n": [
          "9.1 Revisar els textos propis i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística i amb un metallenguatge específic, i identificar i resoldre problemes de comprensió lectora utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i un metallenguatge específic, en la comprensió i la producció de textos acadèmics, dels mitjans de comunicació, personals i socials.",
          "9.3 Elaborar i presentar els resultats de petits projectes d'investigació sobre aspectes rellevants del funcionament de la llengua, formulant hipòtesis i establint generalitzacions, utilitzant els conceptes i la terminologia lingüística adequada i consultant de manera autònoma diccionaris, manuals i gramàtiques."
        ]
      }
    },
    {
      "id": "CE10",
      "title": "Posar les pràctiques comunicatives al servei de la convivència democràtica, de la resolució dialogada dels conflictes i de la igualtat de drets de totes les persones",
      "description": "Posar les pràctiques comunicatives al servei de la convivència democràtica, de la resolució dialogada dels conflictes i de la igualtat de drets de totes les persones, utilitzant un llenguatge no discriminatori i rebutjant els abusos de poder mitjançant la paraula per afavorir un ús eficaç, ètic i democràtic del llenguatge.",
      "criteris": {
        "1r": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder mitjançant la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals que regeixen la comunicació entre les persones.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i per a la recerca de consensos tant en l'àmbit personal com educatiu i social."
        ],
        "2n": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder mitjançant la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals que regeixen la comunicació entre les persones.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i per a la recerca de consensos tant en l'àmbit personal com educatiu i social."
        ]
      }
    }
  ]
},
  "Llengua Castellana i Literatura": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Explicar i apreciar la diversitat lingüística del món a partir del coneixement de la realitat plurilingüe i pluricultural de Catalunya i d'Espanya",
      "description": "Explicar i apreciar la diversitat lingüística del món a partir del coneixement de la realitat plurilingüe i pluricultural de Catalunya i d'Espanya, i les seves varietats dialectals, així com de la reflexió sobre els fenòmens del contacte entre llengües, per afavorir el raonament interlingüístic, refutar els estereotips i prejudicis lingüístics i valorar aquesta diversitat com a font de patrimoni cultural.",
      "criteris": {
        "1r": [
          "1.1 Reconèixer i valorar les llengües de Catalunya i d'Espanya i les respectives varietats dialectals, amb una atenció especial a la del propi territori, a partir de l'explicació del seu desenvolupament històric i sociolingüístic i de la situació actual, contrastant de manera explícita i amb el metallenguatge apropiat aspectes lingüístics i discursius de les diferents llengües, així com trets dels dialectes del català i del castellà, en manifestacions orals, escrites i multimodals.",
          "1.2 Qüestionar i refutar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, a partir de l'exploració i la reflexió entorn dels fenòmens de contacte entre llengües, amb especial atenció al paper de les xarxes socials i dels mitjans de comunicació, i de la investigació sobre els drets lingüístics i diversos models de convivència entre llengües."
        ],
        "2n": [
          "1.1 Reconèixer i valorar les llengües de Catalunya i d'Espanya i les respectives varietats dialectals, amb una atenció especial a la del propi territori, contrastant de manera explícita i amb el metallenguatge apropiat aspectes lingüístics i discursius de les llengües i els dialectes en manifestacions orals, escrites i multimodals, diferenciant els trets de llengua que responen a la diversitat dialectal de les que es corresponen amb sociolectes o registres.",
          "1.2 Qüestionar i refutar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la riquesa cultural, lingüística i dialectal, atenent la diversitat de normes cultes i estàndards que es donen en una mateixa llengua, així com analitzant i valorant la rellevància actual dels mitjans de comunicació i de les xarxes socials en els processos de normalització lingüística."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Comprendre i interpretar textos orals i multimodals, amb especial atenció als textos acadèmics i dels mitjans de comunicació",
      "description": "Comprendre i interpretar textos orals i multimodals, amb especial atenció als textos acadèmics i dels mitjans de comunicació, mitjançant la captació del sentit general i la informació rellevant, de la identificació del punt de vista i la intenció de l'emissor, i la valoració de la fiabilitat, la forma i el contingut, per construir coneixement, formar-se opinió i eixamplar críticament les possibilitats de gaudi i lleure.",
      "criteris": {
        "1r": [
          "2.1 Identificar el sentit global, l'estructura, la informació rellevant en funció de les necessitats comunicatives i la intenció de l'emissor en textos orals i multimodals complexos propis de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals complexos, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "2n": [
          "2.1 Identificar el sentit global, l'estructura, la informació rellevant en funció de les necessitats comunicatives i la intenció de l'emissor en textos orals i multimodals especialitzats propis de diferents àmbits, analitzant la interacció entre els diferents codis.",
          "2.2 Valorar la forma i el contingut de textos orals i multimodals especialitzats, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Produir textos orals i multimodals, amb atenció preferent als textos acadèmics, amb el rigor, la coherència, la fluïdesa i el registre adequats",
      "description": "Produir textos orals i multimodals, amb atenció preferent als textos acadèmics, amb el rigor, la coherència, la fluïdesa i el registre adequats, atenent les convencions pròpies dels diferents gèneres discursius, i participar en interaccions orals amb una actitud cooperativa i respectuosa, tant per construir coneixement i establir vincles personals, com per intervenir de manera activa i informada en diferents contextos socials.",
      "criteris": {
        "1r": [
          "3.1 Dur a terme exposicions i argumentacions orals formals amb diferent grau de planificació sobre temes d'interès científic i cultural i de rellevància acadèmica i social, ajustant-se a les convencions pròpies de cada gènere discursiu, i fer-ho amb la fluïdesa, el rigor, la coherència i el registre adequats, en diferents suports i utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals formals i informals i en el treball en equip, amb una actitud d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ],
        "2n": [
          "3.1 Dur a terme exposicions i argumentacions orals extenses i en què es recullin diferents punts de vista, amb diferent grau de planificació sobre temes d'interès científic i cultural i de rellevància acadèmica i social, ajustant-se a les convencions pròpies de cada gènere discursiu, i fer-ho amb la fluïdesa, el rigor, la coherència i el registre adequats, en diferents suports i utilitzant de manera eficaç recursos verbals i no verbals.",
          "3.2 Participar de manera activa i adequada en interaccions orals formals i informals i en el treball en equip, amb una actitud d'escolta activa i estratègies de cooperació conversacional i cortesia lingüística."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Comprendre, interpretar i valorar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals, amb especial atenció a textos acadèmics i dels mitjans de comunicació",
      "description": "Comprendre, interpretar i valorar, amb sentit crític i diferents propòsits de lectura, textos escrits i multimodals, amb especial atenció a textos acadèmics i dels mitjans de comunicació, reconeixent el sentit global i les idees principals i secundàries, integrant la informació explícita i fent les inferències necessàries, identificant la intenció de l'emissor, reflexionant sobre el contingut i la forma, i avaluant-ne la qualitat i fiabilitat per tal de construir coneixement i donar resposta a necessitats i interessos comunicatius diversos.",
      "criteris": {
        "1r": [
          "4.1 Identificar el sentit global, l'estructura, la informació rellevant i la intenció de l'emissor de textos escrits i multimodals especialitzats, amb una atenció especial a textos acadèmics i dels mitjans de comunicació, fent les inferències necessàries i amb diferents propòsits de lectura.",
          "4.2 Valorar la forma i el contingut de textos complexos, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments comunicatius emprats."
        ],
        "2n": [
          "4.1 Identificar el sentit global, l'estructura, la informació rellevant i la intenció de l'emissor de textos escrits i multimodals especialitzats de major complexitat, amb una atenció especial a textos acadèmics i dels mitjans de comunicació, fent les inferències necessàries i amb diferents propòsits de lectura.",
          "4.2 Valorar críticament la forma i el contingut de textos especialitzats, avaluant-ne la qualitat, la fiabilitat i la idoneïtat del canal utilitzat, així com l'eficàcia dels procediments lingüístics emprats."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Produir textos escrits i multimodals coherents, cohesionats, adequats i correctes, amb especial atenció als gèneres discursius de l'àmbit acadèmic",
      "description": "Produir textos escrits i multimodals coherents, cohesionats, adequats i correctes, amb especial atenció als gèneres discursius de l'àmbit acadèmic i amb regulació dels iguals i autoregulació autònoma, per construir coneixement i donar resposta de manera informada, eficaç i creativa a propòsits comunicatius concrets.",
      "criteris": {
        "1r": [
          "5.1 Elaborar textos acadèmics coherents, cohesionats i amb el registre adequat sobre temes curriculars o d'interès social i cultural, precedits d'un procés de planificació que atengui la situació comunicativa, el destinatari, el propòsit i el canal, i de redacció i revisió d'esborranys de manera individual o entre iguals, o mitjançant altres instruments de consulta.",
          "5.2 Incorporar procediments per enriquir els textos, atenent l'ús discursiu de diferents elements lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical, de l'àmbit social i acadèmic."
        ],
        "2n": [
          "5.1 Elaborar textos acadèmics coherents, cohesionats i amb el registre adequat sobre temes curriculars o d'interès social i cultural, precedits d'un procés de planificació que atengui la situació comunicativa, el destinatari, el propòsit i el canal, i de redacció i revisió d'esborranys entre iguals o utilitzant altres instruments de consulta.",
          "5.2 Incorporar procediments per enriquir els textos, atenent l'ús discursiu de diferents elements lingüístics i d'estil, amb precisió lèxica i correcció ortogràfica i gramatical, de l'àmbit social i acadèmic."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Seleccionar i contrastar informació procedent de diferents fonts, avaluant-ne la fiabilitat i la pertinència en funció dels objectius de lectura",
      "description": "Seleccionar i contrastar informació procedent de diferents fonts, avaluant-ne la fiabilitat i la pertinència en funció dels objectius de lectura i evitant els riscos de manipulació i desinformació, i integrar-la i transformar-la en coneixement per comunicar-la adoptant un punt de vista crític i personal alhora que respectuós amb la propietat intel·lectual, especialment en el marc de la realització de treballs d'investigació sobre temes del currículum.",
      "criteris": {
        "1r": [
          "6.1 Elaborar treballs d'investigació de manera autònoma, en diferents suports, sobre temes curriculars d'interès cultural que impliquin localitzar, seleccionar i contrastar informació procedent de diferents fonts; calibrar-ne la fiabilitat i la pertinència en funció dels objectius de lectura; organitzar-la i integrar-la en esquemes propis, i reelaborar-la i comunicar-la de manera creativa, adoptant un punt de vista crític i respectuós amb la propietat intel·lectual.",
          "6.2 Avaluar la veracitat de notícies i informacions, amb especial atenció a les xarxes socials i a altres entorns digitals, seguint pautes d'anàlisi, contrast i verificació, fent ús de les eines adequades i mantenint una actitud crítica davant els possibles biaixos de la informació i autoregulant-se'n en l'ús.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ],
        "2n": [
          "6.1 Elaborar treballs d'investigació de manera autònoma, en diferents suports, sobre diversos temes d'interès acadèmic, personal o social que impliquin localitzar, seleccionar i contrastar informació procedent de diferents fonts, amb una atenció especial a la gestió del seu emmagatzematge i de la seva recuperació, així com a l'avaluació de la fiabilitat i la pertinència; organitzar-la i integrar-la en esquemes propis, i reelaborar-la i comunicar-la de manera creativa, adoptant un punt de vista crític i respectuós amb la propietat intel·lectual.",
          "6.2 Avaluar la veracitat de notícies i informacions, amb especial atenció a les xarxes socials i a altres entorns digitals, seguint pautes d'anàlisi, contrast i verificació, fent ús de les eines adequades i mantenint una actitud crítica davant els possibles biaixos de la informació i autoregulant-se'n en l'ús.",
          "6.3 Adoptar hàbits d'ús crític, segur, sostenible i saludable de les tecnologies digitals en relació amb la cerca i la comunicació de la informació."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Seleccionar i llegir de manera autònoma obres rellevants de la literatura contemporània com a font de plaer i coneixement",
      "description": "Seleccionar i llegir de manera autònoma obres rellevants de la literatura contemporània com a font de plaer i coneixement, configurant un itinerari lector que s'enriqueixi progressivament quant a diversitat, complexitat i qualitat de les obres, i compartir experiències lectores, per construir la pròpia identitat lectora i gaudir de la dimensió social de la lectura.",
      "criteris": {
        "1r": [
          "7.1 Triar i llegir de manera autònoma obres rellevants de la literatura contemporània i deixar constància del progrés de l'itinerari lector i cultural personal mitjançant l'explicació argumentada dels criteris de selecció de les lectures, de les formes d'accés a la cultura literària i de l'experiència de lectura.",
          "7.2 Compartir l'experiència lectora utilitzant un metallenguatge específic i elaborar una interpretació personal establint vincles argumentats amb altres obres i altres experiències artístiques i culturals."
        ],
        "2n": [
          "7.1 Triar i llegir de manera autònoma obres rellevants que es relacionin amb les propostes de lectura guiada, incloent-hi l'assaig literari i les obres actuals que estableixin connexions amb la tradició, i deixar constància del progrés de l'itinerari lector i cultural personal mitjançant l'explicació argumentada dels criteris de selecció de les lectures, de les formes d'accés a la cultura literària i de l'experiència de lectura.",
          "7.2 Compartir l'experiència lectora utilitzant un metallenguatge específic i elaborar una interpretació personal establint vincles argumentats amb altres obres i altres experiències artístiques i culturals."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Llegir, interpretar i valorar obres rellevants de la literatura catalana, castellana i hispanoamericana",
      "description": "Llegir, interpretar i valorar obres rellevants de la literatura catalana, castellana i hispanoamericana, utilitzant un metallenguatge específic i mobilitzant l'experiència biogràfica i els coneixements literaris i culturals, per establir vincles entre textos diversos que configurin un mapa cultural i eixamplin les possibilitats de gaudir de la literatura i de crear textos d'intenció literària.",
      "criteris": {
        "1r": [
          "8.1 Explicar i argumentar la interpretació de les obres llegides mitjançant l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra i de les relacions externes del text amb el context sociohistòric i amb la tradició literària, utilitzant un metallenguatge específic i incorporant judicis de valor vinculats a l'apreciació estètica de les obres.",
          "8.2 Desenvolupar projectes d'investigació que es concretin en una exposició oral, un assaig o una presentació multimodal, mitjançant l'establiment de vincles argumentats entre els clàssics de la literatura catalana, castellana i hispanoamericana, des de l'edat mitjana fins a l'últim quart del segle XIX, objecte de lectura guiada, i altres textos i manifestacions artístiques clàssiques o contemporànies, en funció de temes, tòpics, estructures, llenguatge, recursos expressius i valors ètics i estètics, i explicitant la implicació i la resposta personal del lector a la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en suports diferents i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en què s'utilitzin les convencions formals dels diversos gèneres i estils literaris."
        ],
        "2n": [
          "8.1 Explicar i argumentar la interpretació de les obres llegides a partir de l'anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l'obra i de les relacions externes del text amb el context sociohistòric i amb la tradició literària, utilitzant un metallenguatge específic i incorporant judicis de valor vinculats a l'apreciació estètica de les obres.",
          "8.2 Desenvolupar projectes d'investigació que es concretin en una exposició oral, un assaig o una presentació multimodal, mitjançant l'establiment de vincles argumentats entre les obres de la literatura catalana, castellana i hispanoamericana des de l'últim quart del segle XIX fins al segle XXI, objecte de lectura guiada, i altres textos i manifestacions artístiques d'ahir i d'avui, en funció de temes, tòpics, estructures, llenguatge, recursos expressius i valors ètics i estètics, i explicitant la implicació i la resposta personal del lector a la lectura.",
          "8.3 Crear textos personals o col·lectius amb intenció literària i consciència d'estil, en suports diferents i amb ajuda d'altres llenguatges artístics i audiovisuals, a partir de la lectura d'obres o fragments significatius en què s'utilitzin les convencions formals dels diversos gèneres i estils literaris."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Consolidar el coneixement explícit i sistemàtic sobre l'estructura de la llengua i els usos i aprofundir-hi, i reflexionar de manera autònoma sobre les eleccions lingüístiques i discursives",
      "description": "Consolidar el coneixement explícit i sistemàtic sobre l'estructura de la llengua i els usos i aprofundir-hi, i reflexionar de manera autònoma sobre les eleccions lingüístiques i discursives, amb la terminologia adequada, per desenvolupar la consciència lingüística, augmentar el repertori comunicatiu i millorar les destreses tant de producció oral i escrita com de recepció crítica.",
      "criteris": {
        "1r": [
          "9.1 Revisar els textos propis i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística i amb un metallenguatge específic, i identificar i resoldre problemes de comprensió lectora utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i un metallenguatge específic, en la comprensió i la producció de textos acadèmics, dels mitjans de comunicació, personals i socials.",
          "9.3 Elaborar i presentar els resultats de petits projectes d'investigació sobre aspectes rellevants del funcionament de la llengua, formulant hipòtesis i establint generalitzacions, utilitzant els conceptes i la terminologia lingüística adequada i consultant de manera autònoma diccionaris, manuals i gramàtiques."
        ],
        "2n": [
          "9.1 Revisar els textos propis i fer propostes de millora argumentant els canvis a partir de la reflexió metalingüística i amb un metallenguatge específic, i identificar i resoldre problemes de comprensió lectora utilitzant els coneixements explícits sobre la llengua i el seu ús.",
          "9.2 Explicar i argumentar la interrelació entre el propòsit comunicatiu i les eleccions lingüístiques de l'emissor, així com els seus efectes en el receptor, utilitzant el coneixement explícit de la llengua i un metallenguatge específic, en la comprensió i la producció de textos acadèmics, dels mitjans de comunicació, personals i socials.",
          "9.3 Elaborar i presentar els resultats de petits projectes d'investigació sobre aspectes rellevants del funcionament de la llengua, formulant hipòtesis i establint generalitzacions, utilitzant els conceptes i la terminologia lingüística adequada i consultant de manera autònoma diccionaris, manuals i gramàtiques."
        ]
      }
    },
    {
      "id": "CE10",
      "title": "Posar les pràctiques comunicatives al servei de la convivència democràtica, de la resolució dialogada dels conflictes i de la igualtat de drets de totes les persones",
      "description": "Posar les pràctiques comunicatives al servei de la convivència democràtica, de la resolució dialogada dels conflictes i de la igualtat de drets de totes les persones, utilitzant un llenguatge no discriminatori i rebutjant els abusos de poder mitjançant la paraula per afavorir un ús eficaç, ètic i democràtic del llenguatge.",
      "criteris": {
        "1r": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder mitjançant la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals que regeixen la comunicació entre les persones.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i per a la recerca de consensos tant en l'àmbit personal com educatiu i social."
        ],
        "2n": [
          "10.1 Identificar i rebutjar els usos discriminatoris de la llengua, els abusos de poder mitjançant la paraula i els usos manipuladors del llenguatge a partir de la reflexió i l'anàlisi dels elements lingüístics, textuals i discursius utilitzats, així com dels elements no verbals que regeixen la comunicació entre les persones.",
          "10.2 Utilitzar estratègies per a la resolució dialogada dels conflictes i per a la recerca de consensos tant en l'àmbit personal com educatiu i social."
        ]
      }
    }
  ]
},
  "Anàlisi Musical": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Analitzar una diversitat d’obres musicals de rellevància cultural, social i històrica a través de l’escolta reflexiva i crítica per apreciar el patrimoni musical i desenvolupar la identitat personal i cultural",
      "description": "Analitzar una diversitat d’obres musicals de rellevància cultural, social i històrica a través de l’escolta reflexiva i crítica per apreciar el patrimoni musical i desenvolupar la identitat personal i cultural.",
      "criteris": {
        "1r": [
          "1.1 Reflexionar sobre els aspectes singulars de diferents propostes musicals de manera crítica, estructurada i respectuosa.",
          "1.2 Contextualitzar diferents composicions musicals, determinant el context cultural, social i històric de l’obra fent ús de l’escolta reflexiva."
        ],
        "2n": [
          "1.1 Explicar els factors socials i culturals inherents a les propostes musicals, concretant les seves funcions i característiques a través de l’anàlisi de diferents exemples amb una actitud oberta i respectuosa.",
          "1.2 Defensar les similituds i les diferències dels aspectes identificadors d’una proposta musical exposant criteris personals d’apreciació musical basats en els valors de respecte envers la diversitat cultural."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Examinar l’estructura, la forma i l’harmonia d’una obra musical, mitjançant l’anàlisi auditiva i gràfica per argumentar la relació de les obres musicals amb el seu autor, el context social, la funció comunicativa i el sentit expressiu",
      "description": "Examinar l’estructura, la forma i l’harmonia d’una obra musical, mitjançant l’anàlisi auditiva i gràfica per argumentar la relació de les obres musicals amb el seu autor, el context social, la funció comunicativa i el sentit expressiu.",
      "criteris": {
        "1r": [
          "2.1 Distingir les diferents veus i/o instruments que participen en una interpretació musical, mitjançant l’audició de diferents obres musicals.",
          "2.2 Reconèixer els elements tècnics bàsics i les estructures formals més característiques de composicions musicals diverses, mitjançant l’anàlisi auditiva i gràfica."
        ],
        "2n": [
          "2.1 Determinar les característiques dels principals estils musicals, basant-se en la disposició dels elements tècnics i l’estructura formal amb actitud oberta i valorant-ne l’interès.",
          "2.2 Investigar les intencionalitats artístiques i musicals dels autors i autores de diverses obres, analitzant-ne les característiques estructurals, formals i contextuals."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Opinar críticament sobre obres musicals diverses i la seva relació amb altres arts com la dansa, el teatre i la literatura per comprovar la diversitat creativa i el seu impacte emocional",
      "description": "Opinar críticament sobre obres musicals diverses i la seva relació amb altres arts com la dansa, el teatre i la literatura per comprovar la diversitat creativa i el seu impacte emocional.",
      "criteris": {
        "1r": [
          "3.1 Expressar lliurement les impressions i els sentiments produïts per la música escoltada, utilitzant arguments que mostrin el desenvolupament del pensament crític.",
          "3.2 Participar activament en els processos de difusió cultural, col·laborant com a analistes crítics en els projectes musicals, artístics i culturals del centre."
        ],
        "2n": [
          "3.1 Debatre, de manera crítica i analítica, les impressions i els sentiments produïts per la música mitjançant l’anàlisi de diverses manifestacions artístiques en diferents suports.",
          "3.2 Analitzar diferents propostes musicals mitjançant l’audició i amb el suport de la partitura, relacionant les obres amb el context històric i el vincle amb les altres arts."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Compondre creacions musicals pròpies a partir dels paràmetres d’anàlisi d’una obra mitjançant les eines digitals per produir creacions musicals que donin resposta a una voluntat comunicativa concreta i personal",
      "description": "Compondre creacions musicals pròpies a partir dels paràmetres d’anàlisi d’una obra mitjançant les eines digitals per produir creacions musicals que donin resposta a una voluntat comunicativa concreta i personal.",
      "criteris": {
        "1r": [
          "4.1 Crear composicions musicals pròpies fent ús de diversos suports per a la creació, incloent-hi les eines digitals.",
          "4.2 Utilitzar amb autonomia i confiança diferents eines i llenguatges artístics per a la producció de creacions musicals."
        ],
        "2n": [
          "4.1 Adaptar amb creativitat els diferents elements que constitueixen una obra musical, com a base per a composicions guiades, utilitzant els diferents patrons melòdics, rítmics, harmònics i formals.",
          "4.2 Experimentar col·lectivament amb els diferents usos del llenguatge artístic mitjançant improvisacions grupals demostrant empatia i col·laboració."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Creació de produccions musicals multidisciplinàries i col·laboratives per prendre consciència de la relació de la música amb les altres arts i analitzar el resultat final dels processos de creació propis i dels altres",
      "description": "Creació de produccions musicals multidisciplinàries i col·laboratives per prendre consciència de la relació de la música amb les altres arts i analitzar el resultat final dels processos de creació propis i dels altres.",
      "criteris": {
        "1r": [
          "5.1 Establir relacions entre la música i altres arts mitjançant l’anàlisi guiada de propostes escèniques afavorint el desenvolupament de la identitat cultural i la recerca de l’expressió pròpia.",
          "5.2 Planificar propostes musicals coherents amb un projecte artístic interdisciplinari, posant en valor les opinions del grup.",
          "5.3 Participar en la producció de projectes artístics, escollint músiques adequades segons les seves característiques i la seva intencionalitat, tot implicant-se en el bon desenvolupament de projecte."
        ],
        "2n": [
          "5.1 Integrar amb esperit crític i sensibilitat composicions musicals basades en patrons melòdics, rítmics, harmònics i formals en projectes artístics sostenibles vinculats amb la diversitat cultural.",
          "5.2 Analitzar les creacions musicals de l’aula, posant en valor el producte final i la seva relació amb diferents projectes artístics.",
          "5.3 Organitzar diferents propostes musicals, mitjançant l’ús de diferents suports tecnològics, mostrant iniciativa, respecte cap a l’opinió dels altres i capacitat d’integració i d’adaptació en el grup de treball."
        ]
      }
    }
  ]
},
  "Arts Escèniques": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Analitzar i mostrar percepcions sobre peces escèniques per promoure-les com a font d’enriquiment personal, gaudi estètic i construcció de la identitat cultural, la cohesió social i la llibertat d’expressió",
      "description": "Analitzar i mostrar percepcions sobre peces escèniques per promoure-les com a font d’enriquiment personal, gaudi estètic i construcció de la identitat cultural, la cohesió social i la llibertat d’expressió.",
      "criteris": {
        "1r": [
          "1.1 Analitzar críticament els elements que conformen les manifestacions escèniques i performatives, i explicar la funció exercida per cadascun.",
          "1.2 Comparar diferents manifestacions escèniques i performatives de qualsevol època, des del sentit crític mitjançant diferents suports, establint relacions amb la pròpia identitat cultural.",
          "1.3 Promoure activitats d’expressió escènica i performativa actual, mitjançant accions que tinguin com a finalitat la visibilització, la transformació i la cohesió social.",
          "1.4 Presenciar, amb interès, manifestacions escèniques i performatives, diferenciant-ne els elements constitutius."
        ],
        "2n": [
          "1.1 Promoure activament les manifestacions escèniques i performatives, percebent-les com a element catalitzador de la llibertat d’expressió, tant individual com col·lectiva.",
          "1.2 Analitzar críticament els elements constitutius del patrimoni dramàtic, cercant les respostes ofertes als grans interrogants de l’ésser humà.",
          "1.3 Expressar percepcions sobre el significat dels elements estètics i dramàtics de les manifestacions escèniques i performatives, desenvolupant la capacitat de gaudir-ne amb la recepció.",
          "1.4 Analitzar i valorar la progressió dramàtica de les manifestacions escèniques i performatives, experimentant-ne, de manera compartida, l’efecte desinhibidor i alliberador."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Aplicar les relacions entre anatomia i espai escènic, amb cura de la veu i del cos, per desenvolupar l’expressivitat, la pròpia acceptació i la creativitat",
      "description": "Aplicar les relacions entre anatomia i espai escènic, amb cura de la veu i del cos, per desenvolupar l’expressivitat, la pròpia acceptació i la creativitat.",
      "criteris": {
        "1r": [
          "2.1 Classificar, amb flexibilitat, les manifestacions escèniques i performatives, atenent els requeriments biomecànics i cinèsics derivats de cadascuna i la cura de la veu i del cos.",
          "2.2 Descobrir les possibilitats expressives de la mecànica vocal i corporal, improvisant de manera creativa sobre la base d’un motiu determinat.",
          "2.3 Experimentar, de manera guiada, amb les dimensions temporal i espacial de l’expressió corporal, interactuant amb els altres de manera coordinada i col·laborativa, i complint les exigències del procés."
        ],
        "2n": [
          "2.1 Seleccionar recursos propis d’expressió vocal i corporal, tenint en compte un rol dramàtic o performatiu establert prèviament, enriquint-lo amb la pròpia identitat.",
          "2.2 Desenvolupar expressions artístiques basades en el propi cos, atenent les dimensions temporal i espacial, prenent com a base un motiu previ, de manera col·laborativa."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Interpretar amb la veu i el cos, en un context escènic, de manera col·laborativa i compromesa, per transmetre idees, sentiments i emocions",
      "description": "Interpretar amb la veu i el cos, en un context escènic, de manera col·laborativa i compromesa, per transmetre idees, sentiments i emocions.",
      "criteris": {
        "1r": [
          "3.1 Proposar relacions dramatúrgiques a partir d’un motiu previ, utilitzant l’expressió corporal de manera creativa.",
          "3.2 Aplicar millores en l’expressió vocal i corporal de l’exercici treballant de manera col·laborativa i compromesa."
        ],
        "2n": [
          "3.1 Compondre un rol dramàtic, integrant la pròpia identitat, sobre la base d’un text previ.",
          "3.2 Construir un rol dramàtic atenent les consignes i col·laborant i cooperant en el desenvolupament de la manifestació artística."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Crear propostes escèniques i performatives, a partir de l’anàlisi i la selecció d’elements tècnics, dramàtics, expressius i plàstics, per respondre a una finalitat determinada",
      "description": "Crear propostes escèniques i performatives, a partir de l’anàlisi i la selecció d’elements tècnics, dramàtics, expressius i plàstics, per respondre a una finalitat determinada.",
      "criteris": {
        "1r": [
          "4.1 Definir en un projecte els elements tècnics, dramàtics, expressius i plàstics necessaris per a la proposta a realitzar, cercant-ne l’adequació per a la finalitat establerta, amb creativitat i sentit col·laboratiu.",
          "4.2 Desenvolupar un projecte escènic i performatiu senzill, partint d’una proposta prèviament debatuda, mitjançant el treball col·laboratiu.",
          "4.3 Exposar una proposta escènica i performativa senzilla, partint d’un motiu original o preexistent, que mobilitzi i cohesioni els altres."
        ],
        "2n": [
          "4.1 Defensar una proposta escènica o performativa complexa, partint d’un motiu original o preexistent, que mobilitzi i cohesioni els altres.",
          "4.2 Desenvolupar un projecte escènic o performatiu complex, partint d’un motiu original o preexistent que involucri els altres.",
          "4.3 Adaptar els elements tècnics, dramàtics, expressius i plàstics disponibles als requeriments del projecte a desenvolupar, tenint en compte les intencionalitats buscades i basant-se en el treball col·laboratiu i inclusiu."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Planificar i participar en totes les fases d’una producció escènica, amb eficàcia i creativitat, per dotar de valor i significat tant el procés com el producte final adaptant-se als mitjans disponibles",
      "description": "Planificar i participar en totes les fases d’una producció escènica, amb eficàcia i creativitat, per dotar de valor i significat tant el procés com el producte final adaptant-se als mitjans disponibles.",
      "criteris": {
        "1r": [
          "5.1 Dissenyar les fases d’un projecte escènic o performatiu senzill, coherent amb les intencionalitats acordades, afavorint el treball col·laboratiu.",
          "5.2 Aportar accions i idees en diferents fases d’una producció escènica o performativa senzilla, prèviament acordada, desenvolupant diferents rols i contribuint a aconseguir un procés creatiu eficient, col·laboratiu i integrador."
        ],
        "2n": [
          "5.1 Planificar les diferents fases per les quals ha de transitar un projecte escènic i performatiu complex, optimitzant els recursos disponibles, tenint en compte les intencionalitats i mobilitzant inclusivament els altres.",
          "5.2 Exercir, amb creativitat i eficiència, diferents rols en les diferents fases d’un projecte escènic i performatiu complex, implicant-se en el bon desenvolupament del procés i en la consecució d’un resultat satisfactori, fruit del treball col·laboratiu."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Representar una producció escènica davant del públic, considerant totes les oportunitats socials i econòmiques que se’n deriven, per establir una comunicació inclusiva i cohesionadora amb els espectadors",
      "description": "Representar una producció escènica davant del públic, considerant totes les oportunitats socials i econòmiques que se’n deriven, per establir una comunicació inclusiva i cohesionadora amb els espectadors.",
      "criteris": {
        "1r": [
          "6.1 Representar un projecte escènic i performatiu senzill, adaptant-se a la viabilitat i al context cercant la cohesió social i la inclusió de tots els assistents i participants."
        ],
        "2n": [
          "6.1 Representar públicament un projecte escènic i performatiu complex, involucrant tots els participants i mantenint una comunicació cohesionadora i inclusiva amb els espectadors."
        ]
      }
    }
  ]
},
  "Ciències Generals": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Aplicar les diverses formes de raonament pròpies de la ciència i dur a terme investigacions experimentals i estudis observacionals utilitzant amb precisió material i instruments adequats per respondre a qüestions que esdevenen en l’entorn sobre processos físics, químics, biològics i geològics",
      "description": "Aplicar les diverses formes de raonament pròpies de la ciència i dur a terme investigacions experimentals i estudis observacionals utilitzant amb precisió material i instruments adequats per respondre a qüestions que esdevenen en l’entorn sobre processos físics, químics, biològics i geològics",
      "criteris": [
        "1.1 Definir problemes investigables, formular hipòtesis i planificar de manera coherent processos de recerca d’acord amb les formes de raonament pròpies del pensament científic",
        "1.2 Desenvolupar processos de recerca per verificar o descartar les hipòtesis formulades mb a un problema o fenomen científic investigable aplicant totes les mesures pròpies del treball experimental.",
        "1.3 Processar la informació derivada d’una recerca mitjançant la construcció de taules, gràfics, models, simulacions, diagrames o altres formats i interpretar els fenòmens naturals que expressen aquests instruments.",
        "1.4 Comunicar els resultats d’una recerca mitjançant l’ús de recursos adequats i d’acord amb els principis ètics bàsics.",
        "1.5 Elaborar les conclusions d’una recerca posant de manifest la relació entre els resultats i el marc teòric en què s’interpreten."
      ]
    },
    {
      "id": "CE2",
      "title": "Aplicar principis, lleis i teories científiques vigents en l’explicació i la predicció del comportament dels fenòmens i components de l’entorn per adquirir una visió holística del funcionament de la naturalesa",
      "description": "Aplicar principis, lleis i teories científiques vigents en l’explicació i la predicció del comportament dels fenòmens i components de l’entorn per adquirir una visió holística del funcionament de la naturalesa",
      "criteris": [
        "2.1 Aplicar el coneixement científic vigent en l’elaboració d’explicacions i prediccions del comportament dels fenòmens que es produeixen a la naturalesa.",
        "2.2 Reconèixer, analitzar i interpretar els fenòmens fisicoquímics més rellevants fent servir les principals lleis físiques i químiques.",
        "2.3 Reconèixer, analitzar i interpretar els elements i processos bàsics de la biosfera i la geosfera fent servir els fonaments científics vigents."
      ]
    },
    {
      "id": "CE3",
      "title": "Argumentar sobre la importància d’incorporar hàbits saludables i sostenibles basats en els fonaments científics per adoptar-los i promoure’ls en el seu entorn",
      "description": "Argumentar sobre la importància d’incorporar hàbits saludables i sostenibles basats en els fonaments científics per adoptar-los i promoure’ls en el seu entorn.",
      "criteris": [
        "3.1 Revisar i avaluar les pròpies idees en relació amb l’adopció d’un estil de vida compatible amb un model de desenvolupament sostenible.",
        "3.2 Defensar i justificar, fent propostes d’acció coherents i utilitzant fonaments científics procedents de diferents disciplines, la importància del compromís personal i de l’adopció d’un estil de vida compatible amb un model de desenvolupament sostenible.",
        "3.3 Revisar i avaluar les pròpies idees en relació amb l’adopció d’un estil de vida saludable (dieta equilibrada, rebuig al consum de drogues, exercici físic, higiene del son, postures adequades, etc.).",
        "3.4 Defensar i justificar, fent propostes d’acció coherents i utilitzant fonaments derivats de la fisiologia humana, la importància d’adoptar i promoure hàbits saludables."
      ]
    },
    {
      "id": "CE4",
      "title": "Aplicar els coneixements i les diverses formes de raonament pròpies de la ciència, mantenint la ment oberta amb relació als procediments que segueix i als resultats que obté per resoldre problemes relacionats amb les ciències experimentals",
      "description": "Aplicar els coneixements i les diverses formes de raonament pròpies de la ciència, mantenint la ment oberta amb relació als procediments que segueix i als resultats que obté per resoldre problemes relacionats amb les ciències experimentals",
      "criteris": [
        "4.1 Aplicar els coneixements i les diverses formes de raonament pròpies de la ciència en la resolució de problemes relacionats amb fenòmens i processos físics, químics, biològics i geològics buscant estratègies alternatives de resolució quan sigui necessari.",
        "4.2 Mantenir una ment oberta basant-se en l’anàlisi crítica de les solucions proposades per a problemes relacionats amb fenòmens i processos físics, químics, biològics i geològics reformulant, si s’escau, les estratègies seguides o les conclusions elaborades si així ho suggereixen les dades de què es disposa."
      ]
    },
    {
      "id": "CE5",
      "title": "Justificar la contribució de la ciència, concebuda com un procés col·lectiu i interdisciplinari i en construcció contínua, a la societat i destacar la funció de les persones que s’hi dediquen, per avaluar-ne el paper essencial en el progrés de la humanitat",
      "description": "Justificar la contribució de la ciència, concebuda com un procés col·lectiu i interdisciplinari i en construcció contínua, a la societat i destacar la funció de les persones que s’hi dediquen, per avaluar-ne el paper essencial en el progrés de la humanitat.",
      "criteris": [
        "5.1 Aportar arguments que evidenciïn que la ciència és una àrea de coneixement global formada per diferents disciplines relacionades entre si i dependents les unes de les altres.",
        "5.2 Demostrar la rellevància de la ciència per al progrés de la societat, així com l’important paper que juguen homes i dones en la realització de la recerca científica com a activitat laboral."
      ]
    },
    {
      "id": "CE6",
      "title": "Utilitzar recursos variats, de tipologia i format diversos, per buscar i seleccionar informació fiable i contrastada i establir col·laboracions aplicant el sentit crític i ètic",
      "description": "Utilitzar recursos variats, de tipologia i format diversos, per buscar i seleccionar informació fiable i contrastada i establir col·laboracions aplicant el sentit crític i ètic.",
      "criteris": [
        "6.1 Cercar, contrastar, seleccionar i combinar informació sobre fenòmens i processos físics, químics, biològics o geològics en diferents formats i utilitzant els recursos necessaris, tecnològics o no.",
        "6.2 Establir col·laboracions utilitzant els recursos necessaris, tecnològics o no, en les diferents etapes del projecte científic, en la realització d’activitats o en la resolució de problemes relacionats amb fenòmens i processos físics, químics, biològics o geològics."
      ]
    }
  ]
},
  "Dibuix Artístic": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Interpretar el dibuix com a eina de coneixement, comunicació i expressió, valorant la diversitat de significats que origina com a font de riquesa cultural i artística, per tal d’inferir la pluralitat de representacions que possibilita en diferents propostes plàstiques del patrimoni global",
      "description": "Interpretar el dibuix com a eina de coneixement, comunicació i expressió, valorant la diversitat de significats que origina com a font de riquesa cultural i artística, per tal d’inferir la pluralitat de representacions que possibilita en diferents propostes plàstiques del patrimoni global.",
      "criteris": {
        "1r": [
          "1.1 Identificar el dibuix com un mitjà de coneixement i comprensió del món, reflexionant sobre la presència en múltiples manifestacions culturals i artístiques.",
          "1.2 Comparar i comprendre l’ús que es fa del dibuix en diferents àmbits disciplinaris, fent una anàlisi i un debat constructiu a partir de les formes que adopta en processos creatius.",
          "1.3 Jutjar la promoció i la conservació del patrimoni cultural i artístic com bé essencial per a l’ésser humà, defensant i argumentant criteris personals sobre la seva importància com a llegat universal."
        ],
        "2n": [
          "1.1 Analitzar críticament la presència del dibuix en diferents manifestacions culturals i artístiques, establint relacions entre si i amb la pròpia identitat cultural, incorporant a més la perspectiva de gènere.",
          "1.2 Comparar i comprendre el paper intel·lectual del dibuix en la història de les idees, realitzant una anàlisi i un debat constructiu a partir de les formes que adopta en processos creatius.",
          "1.3 Impulsar la pluralitat cultural i artística i la llibertat d’expressió, a través d’un discurs raonat i argumentat de manera activa, compromesa i respectuosa."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Analitzar, amb actitud crítica i reflexiva, produccions plàstiques incloent-hi les contemporànies, reconeixent el llenguatge, els recursos i l’expressivitat de la creació gràfica presents, per adquirir una capacitat i formació artística que permeti aconseguir una veritable consciència visual i un gaudi estètic",
      "description": "Analitzar, amb actitud crítica i reflexiva, produccions plàstiques incloent-hi les contemporànies, reconeixent el llenguatge, els recursos i l’expressivitat de la creació gràfica presents, per adquirir una capacitat i formació artística que permeti aconseguir una veritable consciència visual i un gaudi estètic.",
      "criteris": {
        "1r": [
          "2.1 Analitzar els llenguatges i els elements plàstics de diferents propostes artístiques, incloent-hi les contemporànies, tot entenent els canvis de tendències que s’han produït al llarg de la història i utilitzant correctament el vocabulari i la terminologia específica.",
          "2.2 Gaudir de l’obra d’art i del dibuix com part inherent d’aquesta, valorant els reptes creatius i estètics que comporta tota producció cultural i artística."
        ],
        "2n": [
          "2.1 Analitzar els llenguatges i els elements plàstics de diferents propostes artístiques, incloent-hi les contemporànies, tot valorant sense prejudicis la intencionalitat del missatge creat en llibertat i utilitzant correctament el vocabulari i la terminologia específics.",
          "2.2 Gaudir de l’obra d’art i del dibuix com part inherent d’aquesta, identificant-la adequadament per visualitzar i materialitzar idees."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Aplicar les diferents eines i llenguatges del dibuix, analitzant, interpretant i comprenent la realitat, per propiciar la representació gràfica objectiva i expressiva tot potenciant la sensibilitat i afavorint el creixement personal",
      "description": "Aplicar les diferents eines i llenguatges del dibuix, analitzant, interpretant i comprenent la realitat, per propiciar la representació gràfica objectiva i expressiva tot potenciant la sensibilitat i afavorint el creixement personal.",
      "criteris": {
        "1r": [
          "3.1 Interpretar i representar gràficament la realitat objectiva i subjectiva de l’alumnat, utilitzant la pròpia expressió de manera espontània i creativa.",
          "3.2 Experimentar amb sensibilitat les possibilitats expressives dels recursos bàsics (punt, línia i forma) i de la seva sintaxi, desenvolupant el seu procés creatiu gràfic."
        ],
        "2n": [
          "3.1 Interpretar i recrear gràficament la realitat objectiva i subjectiva de l’alumnat, utilitzant la pròpia expressió de manera espontània i creativa.",
          "3.2 Experimentar amb sensibilitat les possibilitats expressives de les formes i les textures aportant personalitat al procés creatiu."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Experimentar l’ús de diferents materials, tècniques i suports, incloent-hi el propi cos, reconeixent la importància d’aquests en les propostes artístiques contemporànies, per descobrir el gest del dibuix i l’apropiació de l’espai com a mitjans d’autoexpressió i acceptació personal",
      "description": "Experimentar l’ús de diferents materials, tècniques i suports, incloent-hi el propi cos, reconeixent la importància d’aquests en les propostes artístiques contemporànies, per descobrir el gest del dibuix i l’apropiació de l’espai com a mitjans d’autoexpressió i acceptació personal.",
      "criteris": {
        "1r": [
          "4.1 Desenvolupar una empremta i un gest propis en la realització de dibuixos, combinant l’ús tradicional de materials, tècniques i suports amb una manipulació personal i innovadora.",
          "4.2 Generar composicions bidimensionals, figuratives o abstractes, explorant en la percepció i l’ordenació de l’espai, tot indagant sobre les tècniques, els materials i els suports més convenients al seu propòsit representatiu."
        ],
        "2n": [
          "4.1 Integrar les tècniques tradicionals i l’experimentació amb el propi cos en produccions gràfiques tot reconeixent-ne globalment el valor artístic.",
          "4.2 Percebre gràficament l’espai tridimensional utilitzant diversos mitjans i tècniques, tot experimentant de forma oberta els efectes perceptius de la profunditat."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Interpretar la pràctica artística, reconeixent els referents culturals anteriors com a part inherent a les noves creacions, per valorar aquesta pràctica com a mitjà d’expressió d’idees, opinions i emocions en un context de referències interconnectades en el temps",
      "description": "Interpretar la pràctica artística, reconeixent els referents culturals anteriors com a part inherent a les noves creacions, per valorar aquesta pràctica com a mitjà d’expressió d’idees, opinions i emocions en un context de referències interconnectades en el temps.",
      "criteris": {
        "1r": [
          "5.1 Integrar en els propis dibuixos i creacions gràfiques els procediments o les tècniques utilitzats en referents artístics del seu interès, utilitzant la pràctica creativa per comunicar i expressar de manera oberta les seves idees, sentiments i emocions.",
          "5.2 Descobrir l’acció de dibuixar com un enfrontament personal amb la realitat i amb un mateix, reconeixent el dibuix artístic com un mitjà autònom d’expressió i comunicació."
        ],
        "2n": [
          "5.1 Investigar de manera activa la presència de tecnologies digitals en referents artístics contemporanis i integrar aquesta recerca en el procés creatiu i expressiu.",
          "5.2 Descobrir l’acció de dibuixar com una exploració de l’espai exterior i interior de l’ésser humà, materialitzant en dibuixos els sentiments i les emocions i prenent com a punt de partida la pròpia voluntat i necessitat de crear."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Construir i desconstruir produccions gràfiques expressives i creatives, descobrint la importància dels elements del llenguatge gràfic i la seva organització per desenvolupar un estil personal que millori l’execució tècnica i les qualitats comunicatives i expressives de les pròpies produccions en un clima d’intercanvi d’idees",
      "description": "Construir i desconstruir produccions gràfiques expressives i creatives, descobrint la importància dels elements del llenguatge gràfic i la seva organització per desenvolupar un estil personal que millori l’execució tècnica i les qualitats comunicatives i expressives de les pròpies produccions en un clima d’intercanvi d’idees.",
      "criteris": {
        "1r": [
          "6.1 Controlar els mecanismes de la percepció visual, les seves lleis i principis, així com la composició i l’ordenació dels elements en l’espai, mostrant interès en les seves aplicacions i emprant-los amb intencions comunicatives i/o expressives.",
          "6.2 Experimentar en les seves pròpies representacions amb els elements del llenguatge gràfic, descobrint el traç del dibuix artístic com evidència del sentir i el ser de l’artista."
        ],
        "2n": [
          "6.1 Estudiar la transformació de les formes en entorns urbans o naturals per evidenciar múltiples possibilitats expressives.",
          "6.2 Desenvolupar un traç propi en les representacions gràfiques intentant millorar la connexió mà/cervell durant el procés de creació."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Descobrir i seleccionar les tècniques pròpies del dibuix, tant tradicionals com digitals, identificant les eines, els mitjans, els suports, cercant noves possibilitats experimentals, per integrar-les de forma innovadora en la realització de produccions gràfiques en contextos contemporanis",
      "description": "Descobrir i seleccionar les tècniques pròpies del dibuix, tant tradicionals com digitals, identificant les eines, els mitjans, els suports, cercant noves possibilitats experimentals, per integrar-les de forma innovadora en la realització de produccions gràfiques en contextos contemporanis.",
      "criteris": {
        "1r": [
          "7.1 Elaborar diverses solucions de representacions visuals, a diferents nivells d’iconicitat, tot identificant les eines, els mitjans i els suports necessaris, justificant- ne raonadament i respectuosament l’elecció i buscant la innovació en el seu ús.",
          "7.2 Aplicar de manera oberta les eines, els mitjans i els suports més adequats per fer interpretacions gràfiques de la realitat, tot utilitzant els valors expressius del clarobscur i del color que millor contribueixi a la intenció creativa."
        ],
        "2n": [
          "7.1 Plantejar solucions alternatives a la representació de la realitat, en diferents nivells d’iconicitat, mostrant un pensament divergent, utilitzant amb correcció les eines, els mitjans i els suports seleccionats i buscant activament un resultat final ajustat a unes intencions expressives prèvies.",
          "7.2 Innovar en l’ús d’eines, mitjans i suports en les seves interpretacions gràfiques de la realitat o del seu món interior, utilitzant els valors expressius del clarobscur i del color per contribuir a una intenció creativa concreta."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Adaptar els coneixements i les destreses adquirits, desenvolupant la retentiva i la memòria visual, per experimentar i reaccionar amb creativitat i eficàcia davant de nous desafiaments en la representació gràfica",
      "description": "Adaptar els coneixements i les destreses adquirits, desenvolupant la retentiva i la memòria visual, per experimentar i reaccionar amb creativitat i eficàcia davant de nous desafiaments en la representació gràfica.",
      "criteris": {
        "1r": [
          "8.1 Observar l’entorn de manera conscient i activa, seleccionant i abstraient el més representatiu del model escollit per representar-lo gràficament.",
          "8.2 Aplicar el mètode d’encaix en la resolució de problemes de representació gràfica, analitzant amb interès tant els diferents volums com l’espai que completa el conjunt."
        ],
        "2n": [
          "8.1 Interpretar gràficament la realitat observada emprant la retentiva i la memòria visual per expressar idees i emocions.",
          "8.2 Valorar i aplicar la perspectiva com a mètode per recrear la tridimensionalitat a través del contrast lumínic, dels efectes de profunditat i dels canvis de proporció per augmentar les capacitats expressives."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Dissenyar i crear projectes gràfics col·laboratius, adaptant el disseny i el procés a les necessitats pròpies de l’àmbit disciplinari i contribuint de forma creativa en la seva planificació i realització, per entomar amb més seguretat possibles reptes professionals i valorar l’enriquiment que suposa compartir",
      "description": "Dissenyar i crear projectes gràfics col·laboratius, adaptant el disseny i el procés a les necessitats pròpies de l’àmbit disciplinari i contribuint de forma creativa en la seva planificació i realització, per entomar amb més seguretat possibles reptes professionals i valorar l’enriquiment que suposa compartir.",
      "criteris": {
        "1r": [
          "9.1 Participar activament en el procés de disseny d’un projecte gràfic, dins un àmbit disciplinari, assumint diferents rols de manera col·laborativa i utilitzant amb interès els valors expressius del dibuix artístic i els seus recursos.",
          "9.2 Reflexionar de manera respectuosa sobre les dificultats en planificar un projecte gràfic compartit, entenent-lo com un instrument de millora del resultat final, destacant professions relacionades amb el dibuix artístic i expressant la pròpia opinió de manera raonada."
        ],
        "2n": [
          "9.1 Participar activament en el procés de disseny d’un projecte gràfic, dins un àmbit disciplinari, assumint diferents rols de manera col·laborativa i utilitzant amb interès els valors expressius del dibuix artístic i els seus recursos.",
          "9.2 Reflexionar de manera respectuosa sobre les dificultats en planificar un projecte gràfic compartit, entenent-lo com un instrument de millora del resultat final, destacant professions relacionades amb el dibuix artístic i expressant la pròpia opinió de manera raonada.",
          "9.3 Exposar de manera inclusiva el resultat d’un projecte gràfic, individual o grupal, i explicar com s’han aplicat els valors expressius ii els recursos mobilitzats per tal de millorar la capacitat discursiva i saber difondre tots els valors d’un projecte."
        ]
      }
    }
  ]
},
  "Llengua i Cultura Llatines": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Identificar els aspectes bàsics de la llengua llatina, resoldre i analitzar les unitats lingüístiques i reflexionar-hi mitjançant la comparació amb la llengua d’ensenyament i amb altres llengües del repertori individual de l’alumnat, per traduir textos llatins que siguin significatius per a l’estudiant",
      "description": "Identificar els aspectes bàsics de la llengua llatina, resoldre i analitzar les unitats lingüístiques i reflexionar-hi mitjançant la comparació amb la llengua d’ensenyament i amb altres llengües del repertori individual de l’alumnat, per traduir textos llatins que siguin significatius per a l’estudiant.",
      "criteris": {
        "1r": [
          "1.1 Dur a terme traduccions directes de frases o fragments breus, adaptats, de dificultat baixa, amb correcció ortogràfica i expressiva, per tal d’identificar i analitzar unitats lingüístiques regulars de la llengua i apreciar variants i coincidències amb altres llengües conegudes per l’alumnat.",
          "1.2 Seleccionar de manera progressivament autònoma el significat apropiat de paraules polisèmiques i justificar la decisió, tenint en compte la informació cotextual o contextual i utilitzant eines de suport al procés de traducció en diferents suports, com ara llistes de vocabulari, glossaris, diccionaris, mapes o atles, correctors ortogràfics, gramàtiques i llibres d’estil, amb l’objectiu de millorar la competència lingüística de l’alumnat tant en la llengua de partida com d’arribada.",
          "1.3 Analitzar els progressos i dificultats d’aprenentatge de la llengua llatina, seleccionant les estratègies més adequades i eficaces per superar aquestes dificultats i consolidar-ne l’aprenentatge, per tal de poder fer activitats de planificació del propi aprenentatge, l’autoavaluació i la coavaluació, com ara les proposades al portafolis europeu de les llengües (PEL) o en un diari d’aprenentatge, fent-los explícits i compartint-los."
        ],
        "2n": [
          "1.1 Dur a terme traduccions directes i/o inverses de textos o fragments de dificultat mitjana o alta (originals o adaptats), amb correcció ortogràfica i expressiva, per tal d’identificar i analitzar unitats lingüístiques regulars de la llengua i apreciar variants i coincidències amb altres llengües conegudes per l’alumnat.",
          "1.2 Ampliar el coneixement iniciat en el curs anterior de paraules polisèmiques, a partir de diversos suports, tant escrits com digitals, amb l’objectiu d’aprofundir en la millora de la competència lingüística de l’alumnat tant en la llengua de partida com d’arribada.",
          "1.3 Revisar i esmenar de manera progressivament autònoma les pròpies traduccions i la dels companys i companyes, per tal de ser capaç de fer propostes de millora i argumentar els canvis amb terminologia especialitzada a partir de la reflexió lingüística.",
          "1.4 Aprofundir en l’anàlisi dels progressos i dificultats d’aprenentatge de la llengua llatina, seleccionant les estratègies més adequades i eficaces per superar aquestes dificultats i consolidar-ne l’aprenentatge, amb l’objectiu de poder fer activitats de planificació del propi aprenentatge, l’autoavaluació i la coavaluació, com ara les proposades a primer."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Distingir els ètims i formants llatins presents en el lèxic d’ús quotidià, identificant els canvis semàntics que hagin tingut lloc i establint una comparació amb la llengua d’ensenyament i altres llengües del repertori individual de l’alumnat, per deduir el significat etimològic del lèxic conegut i els significats de lèxic nou o especialitzat",
      "description": "Distingir els ètims i formants llatins presents en el lèxic d’ús quotidià, identificant els canvis semàntics que hagin tingut lloc i establint una comparació amb la llengua d’ensenyament i altres llengües del repertori individual de l’alumnat, per deduir el significat etimològic del lèxic conegut i els significats de lèxic nou o especialitzat.",
      "criteris": {
        "1r": [
          "2.1 Deduir el significat etimològic d’un terme d’ús comú i habitual, tot atenent els canvis fonètics, morfològics o semàntics que hagin tingut lloc, per tal de millorar la precisió lèxica en la llengua o llengües d’ús habitual de l’alumne i alumna",
          "2.2 Comprendre els canvis fonètics, morfològics o semàntics de complexitat baixa que s’han produït tant des del llatí culte com des del llatí vulgar fins a la llengua d’ensenyament, servint-se, quan sigui possible, de la comparació amb altres llengües del repertori de l’alumnat com a base per millorar el coneixement i l’ús correcte de la llengua pròpia.",
          "2.3 Explicar, de manera guiada, la relació del llatí amb el català, el castellà i, si escau, l’aranès, amb l’objectiu d’apreciar la continuïtat de la llengua llatina fins als nostres dies en les llengües oficials de Catalunya.",
          "2.4 Identificar i denunciar prejudicis i estereotips lingüístics, adoptant una actitud de respecte i valoració de la diversitat com a riquesa cultural, lingüística i dialectal, per ajudar a crear una societat més tolerant i integradora."
        ],
        "2n": [
          "2.1 Deduir el significat etimològic d’un terme d’ús específic i poc freqüent i inferir el significat de termes de nova aparició o procedents de lèxic especialitzat, aplicant, de manera guiada, estratègies de reconeixement de formants llatins, tot atenent els canvis fonètics, morfològics o semàntics que hagin tingut lloc, per tal de millorar la precisió lèxica en la llengua o llengües d’ús habitual de l’alumne i alumna.",
          "2.2 Comprendre els canvis fonètics, morfològics o semàntics de complexitat mitjana o alta que s’han produït tant des del llatí culte com des del llatí vulgar fins a la llengua d’ensenyament, servint-se, quan sigui possible, de la comparació amb altres llengües del repertori de l’alumnat com a base per millorar el coneixement i l’ús correcte de la llengua pròpia.",
          "2.3 Explicar la relació del llatí amb les llengües modernes més enllà de les llengües oficials de Catalunya, utilitzant amb iniciativa estratègies i coneixements de les llengües i els llenguatges que conformen el repertori de l’alumnat, amb l’objectiu d’apreciar la continuïtat de la llengua llatina fins als nostres dies en molts idiomes moderns, d’origen romànic o no.",
          "2.4 Analitzar críticament i denunciar prejudicis i estereotips lingüístics, adoptant una actitud de respecte i valoració de la diversitat com a riquesa cultural, lingüística i dialectal, per ajudar a crear una societat més tolerant i integradora."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Interpretar i valorar, amb sentit crític, textos llatins de diferents gèneres i èpoques, assumint el procés creatiu com a complex i inseparable del context històric, social i polític i de les seves influències artístiques, per identificar-ne la genealogia i valorar-ne l’aportació a la literatura europea en general i catalana en particular",
      "description": "Interpretar i valorar, amb sentit crític, textos llatins de diferents gèneres i èpoques, assumint el procés creatiu com a complex i inseparable del context històric, social i polític i de les seves influències artístiques, per identificar-ne la genealogia i valorar-ne l’aportació a la literatura europea en general i catalana en particular.",
      "criteris": {
        "1r": [
          "3.1 Analitzar, interpretar i comentar textos i fragments literaris de diversa índole, de complexitat baixa i de forma guiada, aplicant estratègies d’anàlisi i reflexió que impliquin mobilitzar la pròpia experiència, com a eina per comprendre el món i la condició humana i desenvolupar la sensibilitat estètica i l’hàbit lector.",
          "3.2 Analitzar i explicar els temes, els tòpics, els gèneres i els valors ètics o estètics de fragments literaris llatins, des d’un enfocament intertextual guiat, per tal de valorar les arrels llatines de la civilització occidental.",
          "3.3 Identificar i definir paraules llatines que designen conceptes bàsics i fonamentals per a l’estudi i la comprensió de la civilització romana, i l’aprenentatge dels quals combina coneixements lèxics i culturals, en textos de diferents formats, per introduir l’alumnat en el coneixement de conceptes clau de la civilització llatina i universal.",
          "3.4 Crear textos breus, de manera individual o col·lectiva, amb una mínima intenció literària i consciència d’estil, en diferents suports, a partir de la lectura d’obres o fragments significatius en els quals s’hagi partit de la civilització i la cultura llatines com a font d’inspiració, amb la finalitat que l’alumne o alumna sigui conscient de la utilitat de la llengua i la literatura llatines per millorar la llengua pròpia."
        ],
        "2n": [
          "3.1 Analitzar, interpretar i comentar textos i fragments literaris de diversa índole, de complexitat mitjana-alta, aplicant estratègies d’anàlisi i reflexió que impliquin mobilitzar la pròpia experiència, com a eina per comprendre el món i la condició humana i desenvolupar la sensibilitat estètica i l’hàbit lector.",
          "3.2 Analitzar i explicar els temes, els tòpics, els gèneres i els valors ètics o estètics d’obres literàries llatines, comparant-les amb obres o fragments literaris posteriors (procedents especialment de la literatura catalana), des d’un enfocament intertextual guiat, per tal de valorar les arrels llatines de la civilització occidental.",
          "3.3 Identificar i definir paraules llatines que designen conceptes específics per a l’estudi i la comprensió de la civilització romana, i l’aprenentatge dels quals combina coneixements lèxics i culturals, en textos de diferents formats, perquè l’alumnat aprofundeixi en el coneixement de conceptes clau de la civilització llatina i universal.",
          "3.4 Crear textos d’una certa extensió, de manera individual o col·lectiva, amb una clara intenció literària i consciència d’estil, en diferents suports i amb ajuda d’altres llenguatges artístics i audiovisuals, a partir de la lectura d’obres o fragments significatius en els quals s’hagi partit de la civilització i la cultura llatines com a font d’inspiració, amb la finalitat que l’alumne o alumna sigui conscient de la utilitat de la llengua i la literatura llatines per millorar la llengua pròpia."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Analitzar les característiques de la civilització llatina en l’àmbit personal, religiós i sociopolític, adquirint coneixements sobre el món romà i comparant críticament el present i el passat, per valorar les aportacions del món clàssic llatí al nostre entorn com a base d’una ciutadana democràtica i compromesa",
      "description": "Analitzar les característiques de la civilització llatina en l’àmbit personal, religiós i sociopolític, adquirint coneixements sobre el món romà i comparant críticament el present i el passat, per valorar les aportacions del món clàssic llatí al nostre entorn com a base d’una ciutadana democràtica i compromesa.",
      "criteris": {
        "1r": [
          "4.1 Explicar, a partir de criteris donats, els processos històrics i polítics, la vida quotidiana, les institucions i els costums de la societat romana per apreciar en la seva justa mesura les adaptacions i els canvis experimentats en vista de l’evolució de les societats i els drets humans, i afavorir el desenvolupament d’una cultura compartida i una ciutadania compromesa amb la memòria col·lectiva i els valors democràtics.",
          "4.2 Debatre sobre la continuïtat del llegat romà a la nostra societat, tot mostrant interès, empatia i respecte per les opinions dels altres.",
          "4.3 Elaborar treballs senzills sobre diversos aspectes del llegat de la civilització llatina en l’àmbit personal, religiós i sociopolític, localitzant, seleccionant i contrastant informació procedent de diferents fonts, calibrant-ne la fiabilitat i pertinència i respectant els principis de rigor i propietat intel·lectual, per tal de desvetllar en l’alumnat una actitud responsable i de respecte vers les fonts d’informació utilitzades."
        ],
        "2n": [
          "4.1 Cercar, contrastar, seleccionar i combinar informacions obtingudes des de diferents fonts sobre la pervivència del llegat romà en el món modern i molt especialment en la cultura catalana.",
          "4.2 Debatre sobre la importància, l’evolució, l’assimilació o el qüestionament de diferents aspectes del llegat romà a la nostra societat, tot utilitzant estratègies retòriques i oratòries de manera guiada, per tal que l’estudiant prengui consciència del seu potencial paper com a mediador entre posicions contraposades quan sigui necessari, seleccionant i contrastant informació i experiències veraces i mostrant interès, respecte i empatia per altres opinions i argumentacions.",
          "4.3 Elaborar treballs de recerca de manera progressivament autònoma en diferents suports sobre aspectes del llegat de la civilització llatina en l’àmbit personal, religiós i sociopolític, localitzant, seleccionant i contrastant informació procedent de diferents fonts, calibrant-ne la fiabilitat i pertinència i respectant els principis de rigor i propietat intel·lectual, per tal de desvetllar en l’alumnat una actitud responsable i de respecte vers les fonts d’informació utilitzades."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Valorar críticament el patrimoni històric, arqueològic, artístic i cultural heretat de la civilització romana, interessant-se per la seva sostenibilitat i reconeixent- lo com a producte de la creació humana i com a testimoni de la història, per explicar el llegat material i immaterial llatí com a transmissor de coneixement i font d’inspiració de creacions modernes i contemporànies",
      "description": "Valorar críticament el patrimoni històric, arqueològic, artístic i cultural heretat de la civilització romana, interessant-se per la seva sostenibilitat i reconeixent- lo com a producte de la creació humana i com a testimoni de la història, per explicar el llegat material i immaterial llatí com a transmissor de coneixement i font d’inspiració de creacions modernes i contemporànies.",
      "criteris": {
        "1r": [
          "5.1 Identificar i explicar el llegat material i immaterial de la civilització romana com a font d’inspiració, i analitzar produccions culturals i artístiques posteriors (d’èpoques i orígens diferents) a partir de criteris donats, per prendre així consciència de la petja inesborrable que ha deixat damunt d’elles la civilització romana.",
          "5.2 Investigar, de manera guiada, el patrimoni històric, arqueològic, artístic i cultural català i universal heretat de la civilització romana.",
          "5.3 Explorar les empremtes de la romanització i el llegat romà a l’entorn de l’alumnat, a partir de criteris donats, aplicant els coneixements adquirits, per tal de ser capaç de reflexionar sobre les implicacions dels diferents usos, donar exemples de la pervivència de l’antiguitat clàssica en la vida quotidiana i presentar els seus resultats per mitjà de diferents suports."
        ],
        "2n": [
          "5.1 Aprofundir en la identificació i explicació del llegat material i immaterial de la civilització romana com a font d’inspiració, i analitzar produccions culturals i artístiques posteriors (de l’àmbit fonamentalment català) a partir de criteris donats, per prendre així consciència de la petja inesborrable que ha deixat damunt d’elles la civilització romana.",
          "5.2 Aprofundir en el coneixement i la valoració del patrimoni històric, arqueològic, artístic i cultural universal i, sobretot, català heretat de la civilització romana, interessant-se pels processos de construcció, preservació, conservació i restauració i per aquelles actituds cíviques que n’asseguren la sostenibilitat.",
          "5.3 Fomentar una actitud crítica i compromesa de l’alumnat per ser capaç de denunciar totes aquelles accions que puguin posar en risc la conservació del patrimoni romà (material o immaterial) i la seva pervivència en el futur, tot fent propostes d’acció coherents per protegir- lo i llegar-lo en perfectes condicions a les generacions futures."
        ]
      }
    }
  ]
},
  "Matemàtiques Aplicades a les Ciències Socials": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Modelitzar i resoldre problemes de la vida quotidiana i de diversos àmbits de coneixement, incloent-hi el matemàtic, aplicant diferents estratègies i formes de raonament, per plantejar i resoldre reptes",
      "description": "Modelitzar i resoldre problemes de la vida quotidiana i de diversos àmbits de coneixement, incloent-hi el matemàtic, aplicant diferents estratègies i formes de raonament, per plantejar i resoldre reptes.",
      "criteris": {
        "1r": [
          "1.1 Generar models a partir de situacions plantejades en contextos diversos, tant de la vida quotidiana com del seu àmbit acadèmic, que permeten convertir les situacions en reptes o problemes matemàtics.",
          "1.2 Utilitzar eines i estratègies que permetin resoldre problemes o fer propostes creatives a les situacions que hagin estat modelitzades.",
          "1.3 Obtenir solucions i fer propostes creatives a les situacions plantejades en contextos diversos, tant de la vida quotidiana com del seu àmbit acadèmic."
        ],
        "2n": [
          "1.1 Generar models a partir de situacions plantejades en contextos diversos, tant de la vida quotidiana com del seu àmbit acadèmic, que permeten convertir les situacions en reptes o problemes matemàtics.",
          "1.2 Utilitzar eines i estratègies que permetin resoldre problemes o fer propostes creatives a les situacions que hagin estat modelitzades.",
          "1.3 Obtenir solucions i fer propostes creatives a les situacions plantejades en contextos diversos, tant de la vida quotidiana com del seu àmbit acadèmic.",
          "1.4 Analitzar i valorar diferents modelitzacions, eines i estratègies."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Argumentar la idoneïtat de les solucions d’un problema emprant el raonament i la lògica matemàtica per verificar-ne la validesa",
      "description": "Argumentar la idoneïtat de les solucions d’un problema emprant el raonament i la lògica matemàtica per verificar-ne la validesa.",
      "criteris": {
        "1r": [
          "2.1 Expressar, amb coherència científica, idees i raonaments que permetin justificar la validesa de les solucions, dels processos i de les conclusions.",
          "2.2 Construir i expressar amb coherència científica textos amb arguments matemàtics que permeten fer judicis crítics o prendre decisions tecnològiques, socials, artístiques i culturals en un context sostenible, ètic i respectuós amb el medi ambient, en relació amb la situació o amb el problema plantejat."
        ],
        "2n": [
          "2.1 Expressar, amb coherència científica, idees i raonaments que permetin justificar la validesa de les solucions, dels processos i de les conclusions.",
          "2.2 Construir i expressar amb coherència científica textos amb arguments matemàtics que permeten fer judicis crítics o prendre decisions tecnològiques, socials, artístiques i culturals en un context sostenible, ètic i respectuós amb el medi ambient, en relació amb la situació o amb el problema plantejat."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Formular conjectures o problemes, utilitzant el raonament i l’argumentació, la creativitat i les eines tecnològiques, per generar nou coneixement matemàtic",
      "description": "Formular conjectures o problemes, utilitzant el raonament i l’argumentació, la creativitat i les eines tecnològiques, per generar nou coneixement matemàtic.",
      "criteris": {
        "1r": [
          "3.1 Plantejar preguntes en contextos diversos que es puguin respondre per mitjà del coneixement matemàtic.",
          "3.2 Fer conjectures matemàtiques de manera autònoma i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.).",
          "3.3 Proposar problemes de manera autònoma, creativa i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.)."
        ],
        "2n": [
          "3.1 Plantejar preguntes en contextos diversos que es puguin respondre per mitjà del coneixement matemàtic.",
          "3.2 Fer conjectures matemàtiques de manera autònoma i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.).",
          "3.3 Proposar problemes de manera autònoma, creativa i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.)."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Utilitzar el pensament computacional modificant, creant i generalitzant estratègies i algorismes amb suport digital per modelitzar i resoldre situacions de la vida quotidiana o de diversos àmbits del coneixement, incloent-hi el matemàtic",
      "description": "Utilitzar el pensament computacional modificant, creant i generalitzant estratègies i algorismes amb suport digital per modelitzar i resoldre situacions de la vida quotidiana o de diversos àmbits del coneixement, incloent-hi el matemàtic.",
      "criteris": {
        "1r": [
          "4.1 Descompondre un problema o una situació de la vida quotidiana en diferents parts, abordant-les d’una en una per poder trobar després la solució global amb dispositius digitals.",
          "4.2 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
          "4.3 Trobar els principis que generen els patrons d’un problema descartant les dades irrellevants tot identificant les parts més importants.",
          "4.4 Generar instruccions pas a pas per resoldre un problema i d’altres de similars provant i duent a terme possibles solucions amb llenguatges de programació o també amb fulls de càlcul, GeoGebra i desenvolupadors d’aplicacions mòbils, entre d’altres."
        ],
        "2n": [
          "4.1 Descompondre un problema o una situació de la vida quotidiana en diferents parts, abordant-les d’una en una per poder trobar després la solució global amb dispositius digitals.",
          "4.2 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
          "4.3 Trobar els principis que generen els patrons d’un problema descartant les dades irrellevants tot identificant les parts més importants.",
          "4.4 Generar instruccions pas a pas per resoldre un problema i d’altres de similars provant i duent a terme possibles solucions amb llenguatges de programació o també amb fulls de càlcul, GeoGebra i desenvolupadors d’aplicacions mòbils, entre d’altres."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Connectar diferents idees matemàtiques establint vincles entre conceptes, procediments, arguments i models per donar significat a l’aprenentatge matemàtic i estructurar-lo",
      "description": "Connectar diferents idees matemàtiques establint vincles entre conceptes, procediments, arguments i models per donar significat a l’aprenentatge matemàtic i estructurar-lo.",
      "criteris": {
        "1r": [
          "5.1 Identificar vincles entre diferents models matemàtics per disposar de més eines a l’hora d’abordar un repte.",
          "5.2 Traduir entre diferents representacions d’un mateix concepte matemàtic per extreure’n informació d’un i aplicar-la a l’altre.",
          "5.3 Aplicar conceptes matemàtics interconnectats per abordar un repte.",
          "5.4 Treure conclusions mitjançant una visió integrada de les matemàtiques."
        ],
        "2n": [
          "5.1 Identificar vincles entre diferents models matemàtics per disposar de més eines a l’hora d’abordar un repte.",
          "5.2 Traduir entre diferents representacions d’un mateix concepte matemàtic per extreure’n informació d’un i aplicar-la a l’altre.",
          "5.3 Aplicar conceptes matemàtics interconnectats per abordar un repte.",
          "5.4 Treure conclusions mitjançant una visió integrada de les matemàtiques."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Vincular i contextualitzar les matemàtiques a altres àrees de coneixement, abordant les situacions que se’n desprenguin, per modelitzar i resoldre problemes i desenvolupar la capacitat crítica, creativa i innovadora en situacions diverses",
      "description": "Vincular i contextualitzar les matemàtiques a altres àrees de coneixement, abordant les situacions que se’n desprenguin, per modelitzar i resoldre problemes i desenvolupar la capacitat crítica, creativa i innovadora en situacions diverses.",
      "criteris": {
        "1r": [
          "6.1 Reconèixer i utilitzar les matemàtiques presents a la vida quotidiana usant els processos inherents a la investigació científica i matemàtica: inferir, mesurar, comunicar, classificar, predir, etc., en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.2 Reconèixer i utilitzar les connexions entre les matemàtiques i altres matèries en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.3 Utilitzar el potencial creatiu de les matemàtiques per fer propostes innovadores en contextos científics, tecnològics, socials, artístics i culturals.",
          "6.4 Identificar i valorar l’aportació actual i històrica de les matemàtiques al progrés de la humanitat, també des d’una perspectiva de gènere, davant dels reptes que planteja la societat actual.",
          "6.5 Argumentar matemàticament i amb esperit crític sobre diferents aspectes socioculturals com ara pseudociències, política, medi ambient, economia i consumisme, desigualtats, tradicions i costums, etc."
        ],
        "2n": [
          "6.1 Reconèixer i utilitzar les matemàtiques presents a la vida quotidiana usant els processos inherents a la investigació científica i matemàtica: inferir, mesurar, comunicar, classificar, predir, etc., en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.2 Reconèixer i utilitzar les connexions entre les matemàtiques i altres matèries en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.3 Utilitzar el potencial creatiu de les matemàtiques per fer propostes innovadores en contextos científics, tecnològics, socials, artístics i culturals.",
          "6.4 Identificar i valorar l’aportació actual i històrica de les matemàtiques al progrés de la humanitat, també des d’una perspectiva de gènere, davant dels reptes que planteja la societat actual.",
          "6.5 Argumentar matemàticament i amb esperit crític sobre diferents aspectes socioculturals com ara pseudociències, política, medi ambient, economia i consumisme, desigualtats, tradicions i costums, etc."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Comunicar i representar, de forma individual i col·lectiva, conceptes, procediments i resultats matemàtics, usant el llenguatge oral, escrit, gràfic i multimèdia, mitjançant diferents tipus de suports, incloent-hi els tecnològics, per donar significat al coneixement, transferir-lo i compartir-lo",
      "description": "Comunicar i representar, de forma individual i col·lectiva, conceptes, procediments i resultats matemàtics, usant el llenguatge oral, escrit, gràfic i multimèdia, mitjançant diferents tipus de suports, incloent-hi els tecnològics, per donar significat al coneixement, transferir-lo i compartir-lo.",
      "criteris": {
        "1r": [
          "7.1 Mostrar organització en comunicar les idees matemàtiques.",
          "7.2 Usar la terminologia, la simbologia i el rigor matemàtic en la comunicació i la representació de les matemàtiques.",
          "7.3 Expressar oralment les idees matemàtiques amb un registre coherent i precís.",
          "7.4 Escriure textos matemàtics de tot tipus (descriptius, argumentatius, expositius, instructius, etc.) amb rigor científic, de lectura fluïda i coherent i en els quals l’ús del llenguatge i de la simbologia matemàtica sigui precís.",
          "7.5 Dissenyar representacions matemàtiques que siguin capaces, per si soles, d’expressar idees matemàtiques sintetitzades.",
          "7.6 Utilitzar l’expressió artística i creativa per comunicar, representar i expressar idees i raonaments matemàtics, com per exemple la fotografia matemàtica, els vídeos matemàtics, les obres visuals i la música.",
          "7.7 Dialogar entre iguals i debatre idees matemàtiques per descriure, explicar i justificar raonaments, processos i conclusions."
        ],
        "2n": [
          "7.1 Mostrar organització en comunicar les idees matemàtiques.",
          "7.2 Usar la terminologia, la simbologia i el rigor matemàtic en la comunicació i la representació de les matemàtiques.",
          "7.3 Expressar oralment les idees matemàtiques amb un registre coherent i precís.",
          "7.4 Escriure textos matemàtics de tot tipus (descriptius, argumentatius, expositius, instructius, etc.) amb rigor científic, de lectura fluïda i coherent i en els quals l’ús del llenguatge i de la simbologia matemàtica sigui precís.",
          "7.5 Dissenyar representacions matemàtiques que siguin capaces, per si soles, d’expressar idees matemàtiques sintetitzades.",
          "7.6 Utilitzar l’expressió artística i creativa per comunicar, representar i expressar idees i raonaments matemàtics, com per exemple la fotografia matemàtica, els vídeos matemàtics, les obres visuals i la música.",
          "7.7 Dialogar entre iguals i debatre idees matemàtiques per descriure, explicar i justificar raonaments, processos i conclusions."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Desenvolupar l’autoregulació i les destreses personals que ajudin a identificar i gestionar emocions, aprenent de l’error i afrontant les situacions d’incertesa com una oportunitat, per perseverar i gaudir del procés d’aprendre matemàtiques",
      "description": "Desenvolupar l’autoregulació i les destreses personals que ajudin a identificar i gestionar emocions, aprenent de l’error i afrontant les situacions d’incertesa com una oportunitat, per perseverar i gaudir del procés d’aprendre matemàtiques.",
      "criteris": {
        "1r": [
          "8.1 Identificar els errors propis que es fan en matemàtiques, descobrir els elements conceptuals, de procediment o d’estratègia que els provoquen i, finalment, expressar de manera raonada el motiu de l’error.",
          "8.2 Decidir i posar en pràctica estratègies concretes que permetin evitar l’error i superar la dificultat.",
          "8.3 Perseverar en la consecució dels objectius implementant noves estratègies matemàtiques, i identificant i gestionant les pròpies emocions.",
          "8.4 Participar activament de l’autoavaluació, compartint i consensuant amb el professorat les estratègies de millora.",
          "8.5 Desenvolupar la capacitat creativa fent propostes matemàtiques innovadores relacionades amb aspectes artístics, culturals, socials i tecnològics i gaudint de la llibertat de decidir sense mostrar por a equivocar-se."
        ],
        "2n": [
          "8.1 Identificar els errors propis que es fan en matemàtiques, descobrir els elements conceptuals, de procediment o d’estratègia que els provoquen i, finalment, expressar de manera raonada el motiu de l’error.",
          "8.2 Decidir i posar en pràctica estratègies concretes que permetin evitar l’error i superar la dificultat.",
          "8.3 Perseverar en la consecució dels objectius implementant noves estratègies matemàtiques, i identificant i gestionant les pròpies emocions.",
          "8.4 Participar activament de l’autoavaluació, compartint i consensuant amb el professorat les estratègies de millora.",
          "8.5 Desenvolupar la capacitat creativa fent propostes matemàtiques innovadores relacionades amb aspectes artístics, culturals, socials i tecnològics i gaudint de la llibertat de decidir sense mostrar por a equivocar-se."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Cooperar, desenvolupant les destreses socials necessàries per participar activament en els equips de treball inclusius i reconeixent la diversitat i el valor de les aportacions dels altres, per compartir i construir coneixement matemàtic de manera col·lectiva",
      "description": "Cooperar, desenvolupant les destreses socials necessàries per participar activament en els equips de treball inclusius i reconeixent la diversitat i el valor de les aportacions dels altres, per compartir i construir coneixement matemàtic de manera col·lectiva.",
      "criteris": {
        "1r": [
          "9.1 Aportar i compartir estratègies i raonaments matemàtics amb els companys, valorar l’èxit col·lectiu com una estratègia de millora personal.",
          "9.2 Col·laborar en el treball en equip tant en entorns presencials com virtuals, escoltant els altres i valorant les seves aportacions, respectant la perspectiva de gènere i la multiculturalitat, compartint i construint coneixement matemàtic de manera conjunta.",
          "9.3 Idear, dissenyar i aportar activitats i problemes matemàtics de qualitat conceptual a la resta de companys per tal de participar activament en la construcció col·lectiva del coneixement matemàtic.",
          "9.4 Ajudar a identificar errors i dificultats d’aprenentatge de les companyes i companys fent aportacions constructives i concretes que puguin ajudar a superar- los i a millorar.",
          "9.5 Utilitzar la llengua catalana en l’aprenentatge de les matemàtiques com una eina de cohesió, inclusió i equitat."
        ],
        "2n": [
          "9.1 Aportar i compartir estratègies i raonaments matemàtics amb els companys, valorar l’èxit col·lectiu com una estratègia de millora personal.",
          "9.2 Col·laborar en el treball en equip tant en entorns presencials com virtuals, escoltant els altres i valorant les seves aportacions, respectant la perspectiva de gènere i la multiculturalitat, compartint i construint coneixement matemàtic de manera conjunta.",
          "9.3 Idear, dissenyar i aportar activitats i problemes matemàtics de qualitat conceptual a la resta de companys per tal de participar activament en la construcció col·lectiva del coneixement matemàtic.",
          "9.4 Ajudar a identificar errors i dificultats d’aprenentatge de les companyes i companys fent aportacions constructives i concretes que puguin ajudar a superar- los i a millorar.",
          "9.5 Utilitzar la llengua catalana en l’aprenentatge de les matemàtiques com una eina de cohesió, inclusió i equitat."
        ]
      }
    }
  ]
},
  "Matemàtiques Generals": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Modelitzar i resoldre problemes de la vida quotidiana i de diversos àmbits de coneixement, incloent-hi el matemàtic, aplicant diferents estratègies i formes de raonament per plantejar i resoldre reptes",
      "description": "Modelitzar i resoldre problemes de la vida quotidiana i de diversos àmbits de coneixement, incloent-hi el matemàtic, aplicant diferents estratègies i formes de raonament per plantejar i resoldre reptes.",
      "criteris": [
        "1.1 Generar models a partir situacions plantejades en contextos diversos, tant de la vida quotidiana com del seu àmbit acadèmic, que permeten convertir les situacions en reptes o problemes matemàtics.",
        "1.2 Utilitzar eines i estratègies que permetin resoldre problemes o fer propostes creatives a les situacions que hagin estat modelitzades.",
        "1.3 Obtenir solucions i fer propostes creatives a les situacions plantejades en contextos diversos, tant de la vida quotidiana com del seu àmbit acadèmic, per a l’aprenentatge de les matemàtiques, ja que són processos centrals en la construcció del coneixement matemàtic."
      ]
    },
    {
      "id": "CE2",
      "title": "Argumentar la idoneïtat de les solucions d’un problema emprant el raonament i la lògica matemàtica per verificar-ne la validesa",
      "description": "Argumentar la idoneïtat de les solucions d’un problema emprant el raonament i la lògica matemàtica per verificar-ne la validesa.",
      "criteris": [
        "2.1 Expressar, amb coherència científica, idees i raonaments que permetin justificar la validesa de les solucions, dels processos i de les conclusions.",
        "2.2 Construir i expressar amb coherència científica textos amb arguments matemàtics que permeten fer judicis crítics o prendre decisions tecnològiques, socials, artístiques i culturals en un context sostenible, ètic i respectuós amb el medi ambient, en relació amb la situació o amb el problema plantejat."
      ]
    },
    {
      "id": "CE3",
      "title": "Formular conjectures o problemes, utilitzant el raonament i l’argumentació, la creativitat i les eines tecnològiques, per generar nou coneixement matemàtic",
      "description": "Formular conjectures o problemes, utilitzant el raonament i l’argumentació, la creativitat i les eines tecnològiques, per generar nou coneixement matemàtic.",
      "criteris": [
        "3.1 Plantejar preguntes en contextos diversos que es puguin respondre mitjançant el coneixement matemàtic.",
        "3.2 Fer conjectures matemàtiques de manera autònoma i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.).",
        "3.3 Proposar problemes de manera autònoma, creativa i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.)."
      ]
    },
    {
      "id": "CE4",
      "title": "Utilitzar el pensament computacional modificant, creant i generalitzant estratègies i algorismes amb suport digital per modelitzar i resoldre situacions de la vida quotidiana o de diversos àmbits del coneixement, incloent-hi el matemàtic",
      "description": "Utilitzar el pensament computacional modificant, creant i generalitzant estratègies i algorismes amb suport digital per modelitzar i resoldre situacions de la vida quotidiana o de diversos àmbits del coneixement, incloent-hi el matemàtic.",
      "criteris": [
        "4.1 Descompondre un problema o una situació de la vida quotidiana en diferents parts, abordant-les d’una en una per poder trobar després la solució global amb dispositius digitals.",
        "4.2 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
        "4.3 Trobar els principis que generen els patrons d’un problema descartant les dades irrellevants tot identificant les parts més importants.",
        "4.4 Generar instruccions pas a pas per resoldre un problema i d’altres de similars provant i duent a terme possibles solucions amb llenguatges de programació o també amb fulls de càlcul, GeoGebra i desenvolupadors d’aplicacions mòbils entre d’altres."
      ]
    },
    {
      "id": "CE5",
      "title": "Connectar diferents idees matemàtiques, establint vincles entre conceptes, procediments, arguments i models, per donar significat a l’aprenentatge matemàtic i estructurar-lo",
      "description": "Connectar diferents idees matemàtiques, establint vincles entre conceptes, procediments, arguments i models, per donar significat a l’aprenentatge matemàtic i estructurar-lo.",
      "criteris": [
        "5.1 Identificar vincles entre diferents models matemàtics per disposar de més eines a l’hora d’abordar un repte.",
        "5.2 Traduir entre diferents representacions d’un mateix concepte matemàtic per extreure’n informació d’un i aplicar-la a l’altre.",
        "5.3 Aplicar conceptes matemàtics interconnectats per abordar un repte.",
        "5.4 Treure conclusions per mitjà d’una visió integrada de les matemàtiques."
      ]
    },
    {
      "id": "CE6",
      "title": "Vincular i contextualitzar les matemàtiques a altres àrees de coneixement, abordant les situacions que se’n desprenguin, per modelitzar, resoldre problemes i desenvolupar la capacitat crítica, creativa i innovadora en situacions diverses",
      "description": "Vincular i contextualitzar les matemàtiques a altres àrees de coneixement, abordant les situacions que se’n desprenguin, per modelitzar, resoldre problemes i desenvolupar la capacitat crítica, creativa i innovadora en situacions diverses.",
      "criteris": [
        "6.1 Reconèixer i utilitzar les matemàtiques presents a la vida quotidiana usant els processos inherents a la investigació científica i matemàtica: inferir, mesurar, comunicar, classificar, predir, etc., en situacions susceptibles de ser abordades en termes matemàtics.",
        "6.2 Reconèixer i utilitzar les connexions entre les matemàtiques i altres matèries en situacions susceptibles de ser abordades en termes matemàtics.",
        "6.3 Utilitzar el potencial creatiu de les matemàtiques per fer propostes innovadores en contextos científics, tecnològics, socials, artístics i culturals.",
        "6.4 Identificar i valorar l’aportació actual i històrica de les matemàtiques al progrés de la humanitat, també des d’una perspectiva de gènere, davant dels reptes que planteja la societat actual.",
        "6.5 Argumentar matemàticament i amb esperit crític sobre diferents aspectes socioculturals com ara pseudociències, política, medi ambient, economia i consumisme, desigualtats, tradicions i costums, etc."
      ]
    },
    {
      "id": "CE7",
      "title": "Comunicar i representar, de forma individual i col·lectiva, conceptes, procediments i resultats matemàtics usant el llenguatge oral, escrit, gràfic i multimèdia, mitjançant diferents tipus de suports, incloent-hi els tecnològics, per donar significat al coneixement, transferir-lo i compartir-lo",
      "description": "Comunicar i representar, de forma individual i col·lectiva, conceptes, procediments i resultats matemàtics usant el llenguatge oral, escrit, gràfic i multimèdia, mitjançant diferents tipus de suports, incloent-hi els tecnològics, per donar significat al coneixement, transferir-lo i compartir-lo.",
      "criteris": [
        "7.1 Mostrar organització en comunicar les idees matemàtiques.",
        "7.2 Usar la terminologia, la simbologia i el rigor matemàtic en la comunicació i la representació de les matemàtiques.",
        "7.3 Expressar oralment les idees matemàtiques amb un registre coherent i precís.",
        "7.4 Escriure textos matemàtics de tot tipus (descriptius, argumentatius, expositius, instructius, etc.) amb rigor científic, de lectura fluïda i coherent i en els quals l’ús del llenguatge i de la simbologia matemàtica sigui precís.",
        "7.5 Dissenyar representacions matemàtiques que siguin capaces, per si soles, d’expressar idees matemàtiques sintetitzades.",
        "7.6 Utilitzar l’expressió artística i creativa per comunicar, representar i expressar idees i raonaments matemàtics, com per exemple la fotografia matemàtica, els vídeos matemàtics, les obres visuals i la música.",
        "7.7 Dialogar entre iguals i debatre idees matemàtiques per descriure, explicar i justificar raonaments, processos i conclusions."
      ]
    },
    {
      "id": "CE8",
      "title": "Desenvolupar l’autoregulació i les destreses personals que ajudin a identificar i gestionar emocions, aprenent de l’error i afrontant les situacions d’incertesa com una oportunitat, per perseverar i gaudir del procés d’aprendre matemàtiques",
      "description": "Desenvolupar l’autoregulació i les destreses personals que ajudin a identificar i gestionar emocions, aprenent de l’error i afrontant les situacions d’incertesa com una oportunitat, per perseverar i gaudir del procés d’aprendre matemàtiques.",
      "criteris": [
        "8.1 Identificar els errors propis que es fan en matemàtiques, descobrir els elements conceptuals, de procediment o d’estratègia que els provoquen i, finalment, expressar de manera raonada el motiu de l’error.",
        "8.2 Decidir i posar en pràctica estratègies concretes que permetin evitar l’error i superar la dificultat.",
        "8.3 Perseverar en la consecució dels objectius implementant noves estratègies matemàtiques identificant i gestionant les pròpies emocions.",
        "8.4 Participar activament de l’autoavaluació, compartint i consensuant amb el professorat les estratègies de millora.",
        "8.5 Desenvolupar la capacitat creativa fent propostes matemàtiques innovadores relacionades amb aspectes artístics, culturals, socials i tecnològics gaudint de la llibertat de decidir sense mostrar por a equivocar-se."
      ]
    },
    {
      "id": "CE9",
      "title": "Cooperar, desenvolupant les destreses socials necessàries per participar activament en els equips de treball inclusius i reconeixent la diversitat i el valor de les aportacions dels altres, per compartir i construir coneixement matemàtic de manera col·lectiva",
      "description": "Cooperar, desenvolupant les destreses socials necessàries per participar activament en els equips de treball inclusius i reconeixent la diversitat i el valor de les aportacions dels altres, per compartir i construir coneixement matemàtic de manera col·lectiva.",
      "criteris": [
        "9.1 Aportar i compartir estratègies i raonaments matemàtics amb els companys, valorar l’èxit col·lectiu com una estratègia de millora personal.",
        "9.2 Col·laborar en el treball en equip tant en entorns presencials com virtuals, escoltant els altres i valorant les seves aportacions, respectant la perspectiva de gènere i la multiculturalitat, compartint i construint coneixement matemàtic de manera conjunta.",
        "9.3 Idear, dissenyar i aportar activitats i problemes matemàtics de qualitat conceptual a la resta de companys per tal de participar activament en la construcció col·lectiva del coneixement matemàtic.",
        "9.4 Ajudar a identificar errors i dificultats d’aprenentatge de les companyes i companys fent aportacions constructives i concretes que puguin ajudar a superar-los i a millorar.",
        "9.5 Utilitzar la llengua catalana en l’aprenentatge de les matemàtiques com una eina de cohesió, inclusió i equitat."
      ]
    }
  ]
},
  "Matemàtiques": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Modelitzar i resoldre problemes de la vida quotidiana i de diversos àmbits de coneixement, incloent-hi el matemàtic, aplicant diferents estratègies i formes de raonament, per plantejar i resoldre reptes",
      "description": "Modelitzar i resoldre problemes de la vida quotidiana i de diversos àmbits de coneixement, incloent-hi el matemàtic, aplicant diferents estratègies i formes de raonament, per plantejar i resoldre reptes.",
      "criteris": {
        "1r": [
          "1.1 Generar models a partir de situacions plantejades en contextos diversos, tant de la vida quotidiana com de l’àmbit acadèmic, que permetin convertir les situacions en reptes o problemes matemàtics.",
          "1.2 Utilitzar eines i estratègies que permetin resoldre problemes o fer propostes creatives a les situacions que hagin estat modelitzades.",
          "1.3 Obtenir solucions i fer propostes creatives a les situacions plantejades en contextos diversos, tant de la vida quotidiana com de l’àmbit acadèmic."
        ],
        "2n": [
          "1.1 Generar models a partir de situacions plantejades en contextos diversos, tant de la vida quotidiana com de l’àmbit acadèmic, que permetin convertir les situacions en reptes o problemes matemàtics.",
          "1.2 Utilitzar eines i estratègies que permetin resoldre problemes o fer propostes creatives a les situacions que hagin estat modelitzades.",
          "1.3 Obtenir solucions i fer propostes creatives a les situacions plantejades en contextos diversos, tant de la vida quotidiana com de l’àmbit acadèmic.",
          "1.4 Analitzar i valorar diferents modelitzacions, eines i estratègies."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Argumentar la idoneïtat de les solucions d’un problema, emprant el raonament i la lògica matemàtica, per verificar-ne la validesa",
      "description": "Argumentar la idoneïtat de les solucions d’un problema, emprant el raonament i la lògica matemàtica, per verificar-ne la validesa.",
      "criteris": {
        "1r": [
          "2.1 Expressar amb coherència científica idees i raonaments que permetin justificar la validesa de les solucions, dels processos i de les conclusions.",
          "2.2 Construir i expressar amb coherència científica textos amb arguments matemàtics que permetin fer judicis crítics o prendre decisions tecnològiques, socials, artístiques i culturals en un context sostenible, ètic i respectuós amb el medi ambient, en relació amb la situació o amb el problema plantejat."
        ],
        "2n": [
          "2.1 Expressar amb coherència científica idees i raonaments que permetin justificar la validesa de les solucions, dels processos i de les conclusions.",
          "2.2 Construir i expressar amb coherència científica textos amb arguments matemàtics que permetin fer judicis crítics o prendre decisions tecnològiques, socials, artístiques i culturals en un context sostenible, ètic i respectuós amb el medi ambient, en relació amb la situació o amb el problema plantejat."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Formular conjectures o problemes, utilitzant el raonament i l’argumentació, la creativitat i les eines tecnològiques, per generar nou coneixement matemàtic",
      "description": "Formular conjectures o problemes, utilitzant el raonament i l’argumentació, la creativitat i les eines tecnològiques, per generar nou coneixement matemàtic.",
      "criteris": {
        "1r": [
          "3.1 Plantejar preguntes en contextos diversos que es puguin respondre per mitjà del coneixement matemàtic.",
          "3.2 Fer conjectures matemàtiques de manera autònoma i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.).",
          "3.3 Proposar problemes de manera autònoma, creativa i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.)."
        ],
        "2n": [
          "3.1 Plantejar preguntes en contextos diversos que es puguin respondre per mitjà del coneixement matemàtic.",
          "3.2 Fer conjectures matemàtiques de manera autònoma i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.).",
          "3.3 Proposar problemes de manera autònoma, creativa i raonada en un context en el qual l’alumnat tingui llibertat creativa fent ús, si cal, d’eines tecnològiques (llenguatges de programació, fulls de càlcul, GeoGebra, fotografia matemàtica, vídeo, etc.)."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Utilitzar el pensament computacional modificant, creant i generalitzant estratègies i algorismes amb suport digital per modelitzar i resoldre situacions de la vida quotidiana o de diversos àmbits del coneixement, incloent-hi el matemàtic",
      "description": "Utilitzar el pensament computacional modificant, creant i generalitzant estratègies i algorismes amb suport digital per modelitzar i resoldre situacions de la vida quotidiana o de diversos àmbits del coneixement, incloent-hi el matemàtic.",
      "criteris": {
        "1r": [
          "4.1 Descompondre un problema o una situació de la vida quotidiana en diferents parts, abordant-les d’una en una per poder trobar després la solució global amb dispositius digitals.",
          "4.2 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
          "4.3 Trobar els principis que generen els patrons d’un problema descartant les dades irrellevants tot identificant les parts més importants.",
          "4.4 Generar instruccions pas a pas per resoldre un problema i d’altres de similars provant i duent a terme possibles solucions amb llenguatges de programació o amb fulls de càlcul, GeoGebra i desenvolupadors d’aplicacions mòbils entre d’altres."
        ],
        "2n": [
          "4.1 Descompondre un problema o una situació de la vida quotidiana en diferents parts, abordant-les d’una en una per poder trobar després la solució global amb dispositius digitals.",
          "4.2 Reconèixer patrons, similituds i tendències en els problemes o situacions que es volen solucionar.",
          "4.3 Trobar els principis que generen els patrons d’un problema descartant les dades irrellevants tot identificant les parts més importants.",
          "4.4 Generar instruccions pas a pas per resoldre un problema i d’altres de similars provant i duent a terme possibles solucions amb llenguatges de programació o amb fulls de càlcul, GeoGebra i desenvolupadors d’aplicacions mòbils entre d’altres."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Connectar diferents idees matemàtiques, establint vincles entre conceptes, procediments, arguments i models, per donar significat a l’aprenentatge matemàtic i estructurar-lo",
      "description": "Connectar diferents idees matemàtiques, establint vincles entre conceptes, procediments, arguments i models, per donar significat a l’aprenentatge matemàtic i estructurar-lo.",
      "criteris": {
        "1r": [
          "5.1 Identificar vincles entre diferents models matemàtics per disposar de més eines a l’hora d’abordar un repte.",
          "5.2 Traduir entre diferents representacions d’un mateix concepte matemàtic per extreure informació d’un i aplicar-la a l’altra.",
          "5.3 Aplicar conceptes matemàtics interconnectats per abordar un repte.",
          "5.4 Treure conclusions mitjançant una visió integrada de les matemàtiques."
        ],
        "2n": [
          "5.1 Identificar vincles entre diferents models matemàtics per disposar de més eines a l’hora d’abordar un repte.",
          "5.2 Traduir entre diferents representacions d’un mateix concepte matemàtic per extreure informació d’un i aplicar-la a l’altra.",
          "5.3 Aplicar conceptes matemàtics interconnectats per abordar un repte.",
          "5.4 Treure conclusions mitjançant una visió integrada de les matemàtiques."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Vincular i contextualitzar les matemàtiques a altres àrees de coneixement, abordant les situacions que se’n desprenguin, per modelitzar i resoldre problemes i desenvolupar la capacitat crítica, creativa i innovadora en situacions diverses",
      "description": "Vincular i contextualitzar les matemàtiques a altres àrees de coneixement, abordant les situacions que se’n desprenguin, per modelitzar i resoldre problemes i desenvolupar la capacitat crítica, creativa i innovadora en situacions diverses.",
      "criteris": {
        "1r": [
          "6.1 Reconèixer i utilitzar les matemàtiques presents a la vida quotidiana usant els processos inherents a la investigació científica i matemàtica: inferir, mesurar, comunicar, classificar, predir, etc. en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.2 Reconèixer i utilitzar les connexions entre les matemàtiques i altres matèries en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.3 Utilitzar el potencial creatiu de les matemàtiques per fer propostes innovadores en contextos científics, tecnològics, socials, artístics i culturals.",
          "6.4 Identificar i valorar l’aportació actual i històrica de les matemàtiques al progrés de la humanitat, també des d’una perspectiva de gènere, davant dels reptes que planteja la societat actual.",
          "6.5 Argumentar matemàticament i amb esperit crític sobre diferents aspectes socioculturals com ara pseudociències, política, medi ambient, economia i consumisme, desigualtats, tradicions i costums, etc."
        ],
        "2n": [
          "6.1 Reconèixer i utilitzar les matemàtiques presents a la vida quotidiana usant els processos inherents a la investigació científica i matemàtica: inferir, mesurar, comunicar, classificar, predir, etc. en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.2 Reconèixer i utilitzar les connexions entre les matemàtiques i altres matèries en situacions susceptibles de ser abordades en termes matemàtics.",
          "6.3 Utilitzar el potencial creatiu de les matemàtiques per fer propostes innovadores en contextos científics, tecnològics, socials, artístics i culturals.",
          "6.4 Identificar i valorar l’aportació actual i històrica de les matemàtiques al progrés de la humanitat, també des d’una perspectiva de gènere, davant dels reptes que planteja la societat actual.",
          "6.5 Argumentar matemàticament i amb esperit crític sobre diferents aspectes socioculturals com ara pseudociències, política, medi ambient, economia i consumisme, desigualtats, tradicions i costums, etc."
        ]
      }
    },
    {
      "id": "CE7",
      "title": "Comunicar i representar, de forma individual i col·lectiva, conceptes, procediments i resultats matemàtics usant el llenguatge oral, escrit, gràfic i multimèdia, mitjançant diferents tipus de suports, incloent-hi els tecnològics, per donar significat al coneixement, transferir-lo i compartir-lo",
      "description": "Comunicar i representar, de forma individual i col·lectiva, conceptes, procediments i resultats matemàtics usant el llenguatge oral, escrit, gràfic i multimèdia, mitjançant diferents tipus de suports, incloent-hi els tecnològics, per donar significat al coneixement, transferir-lo i compartir-lo.",
      "criteris": {
        "1r": [
          "7.1 Mostrar organització en comunicar les idees matemàtiques.",
          "7.2 Usar la terminologia, la simbologia i el rigor matemàtic en la comunicació i la representació de les matemàtiques.",
          "7.3 Expressar oralment les idees matemàtiques amb un registre coherent i precís.",
          "7.4 Escriure textos matemàtics de tot tipus (descriptius, argumentatius, expositius, instructius, etc.) amb rigor científic, de lectura fluïda i coherent i en els quals l’ús del llenguatge i de la simbologia matemàtica sigui precís.",
          "7.5 Dissenyar representacions matemàtiques que siguin capaces, per si soles, d’expressar idees matemàtiques sintetitzades.",
          "7.6 Utilitzar l’expressió artística i creativa per comunicar, representar i expressar idees i raonaments matemàtics, com per exemple la fotografia matemàtica, els vídeos matemàtics, les obres visuals i la música.",
          "7.7 Dialogar entre iguals i debatre idees matemàtiques per descriure, explicar i justificar raonaments, processos i conclusions."
        ],
        "2n": [
          "7.1 Mostrar organització en comunicar les idees matemàtiques.",
          "7.2 Usar la terminologia, la simbologia i el rigor matemàtic en la comunicació i la representació de les matemàtiques.",
          "7.3 Expressar oralment les idees matemàtiques amb un registre coherent i precís.",
          "7.4 Escriure textos matemàtics de tot tipus (descriptius, argumentatius, expositius, instructius, etc.) amb rigor científic, de lectura fluïda i coherent i en els quals l’ús del llenguatge i de la simbologia matemàtica sigui precís.",
          "7.5 Dissenyar representacions matemàtiques que siguin capaces, per si soles, d’expressar idees matemàtiques sintetitzades.",
          "7.6 Utilitzar l’expressió artística i creativa per comunicar, representar i expressar idees i raonaments matemàtics, com per exemple la fotografia matemàtica, els vídeos matemàtics, les obres visuals i la música.",
          "7.7 Dialogar entre iguals i debatre idees matemàtiques per descriure, explicar i justificar raonaments, processos i conclusions."
        ]
      }
    },
    {
      "id": "CE8",
      "title": "Desenvolupar l’autoregulació i les destreses personals que ajudin a identificar i gestionar emocions, aprenent de l’error i afrontant les situacions d’incertesa com una oportunitat, per perseverar i gaudir del procés d’aprendre matemàtiques",
      "description": "Desenvolupar l’autoregulació i les destreses personals que ajudin a identificar i gestionar emocions, aprenent de l’error i afrontant les situacions d’incertesa com una oportunitat, per perseverar i gaudir del procés d’aprendre matemàtiques.",
      "criteris": {
        "1r": [
          "8.1 Identificar els errors propis que es fan en matemàtiques, descobrir els elements conceptuals, de procediment o d’estratègia que els provoquen i, finalment, expressar de manera raonada el motiu de l’error.",
          "8.2 Decidir i posar en pràctica estratègies concretes que permetin evitar l’error i superar la dificultat.",
          "8.3 Perseverar en la consecució dels objectius implementant noves estratègies matemàtiques tot identificant i gestionant les pròpies emocions.",
          "8.4 Participar activament de l’autoavaluació, compartint i consensuant amb el professorat les estratègies de millora.",
          "8.5 Desenvolupar la capacitat creativa fent propostes matemàtiques innovadores relacionades amb aspectes artístics, culturals, socials i tecnològics i gaudint de la llibertat de decidir sense mostrar por a equivocar-se."
        ],
        "2n": [
          "8.1 Identificar els errors propis que es fan en matemàtiques, descobrir els elements conceptuals, de procediment o d’estratègia que els provoquen i, finalment, expressar de manera raonada el motiu de l’error.",
          "8.2 Decidir i posar en pràctica estratègies concretes que permetin evitar l’error i superar la dificultat.",
          "8.3 Perseverar en la consecució dels objectius implementant noves estratègies matemàtiques tot identificant i gestionant les pròpies emocions.",
          "8.4 Participar activament de l’autoavaluació, compartint i consensuant amb el professorat les estratègies de millora.",
          "8.5 Desenvolupar la capacitat creativa fent propostes matemàtiques innovadores relacionades amb aspectes artístics, culturals, socials i tecnològics i gaudint de la llibertat de decidir sense mostrar por a equivocar-se."
        ]
      }
    },
    {
      "id": "CE9",
      "title": "Cooperar, desenvolupant les destreses socials necessàries per participar activament en els equips de treball inclusius reconeixent la diversitat i el valor de les aportacions dels altres, per compartir i construir coneixement matemàtic de manera col·lectiva",
      "description": "Cooperar, desenvolupant les destreses socials necessàries per participar activament en els equips de treball inclusius reconeixent la diversitat i el valor de les aportacions dels altres, per compartir i construir coneixement matemàtic de manera col·lectiva.",
      "criteris": {
        "1r": [
          "9.1 Aportar i compartir estratègies i raonaments matemàtics amb els companys i valorar l’èxit col·lectiu com una estratègia de millora personal.",
          "9.2 Col·laborar en el treball en equip tant en entorns presencials com virtuals, escoltant els altres i valorant les seves aportacions, respectant la perspectiva de gènere i la multiculturalitat, compartint i construint coneixement matemàtic de manera conjunta.",
          "9.3 Idear, dissenyar i aportar activitats i problemes matemàtics de qualitat conceptual a la resta de companys per tal de participar activament en la construcció col·lectiva del coneixement matemàtic.",
          "9.4 Ajudar a identificar errors i dificultats d’aprenentatge de les companyes i companys fent aportacions constructives i concretes que puguin ajudar a superar- los i a millorar.",
          "9.5 Utilitzar la llengua catalana en l’aprenentatge de les matemàtiques com una eina de cohesió, inclusió i equitat."
        ],
        "2n": [
          "9.1 Aportar i compartir estratègies i raonaments matemàtics amb els companys i valorar l’èxit col·lectiu com una estratègia de millora personal.",
          "9.2 Col·laborar en el treball en equip tant en entorns presencials com virtuals, escoltant els altres i valorant les seves aportacions, respectant la perspectiva de gènere i la multiculturalitat, compartint i construint coneixement matemàtic de manera conjunta.",
          "9.3 Idear, dissenyar i aportar activitats i problemes matemàtics de qualitat conceptual a la resta de companys per tal de participar activament en la construcció col·lectiva del coneixement matemàtic.",
          "9.4 Ajudar a identificar errors i dificultats d’aprenentatge de les companyes i companys fent aportacions constructives i concretes que puguin ajudar a superar- los i a millorar.",
          "9.5 Utilitzar la llengua catalana en l’aprenentatge de les matemàtiques com una eina de cohesió, inclusió i equitat."
        ]
      }
    }
  ]
},
  "Biologia": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Interpretar, comunicar informació i dades procedents de treballs científics, i argumentar amb precisió i utilitzant diferents formats, per analitzar conceptes, processos, mètodes, experiments o resultats de les ciències biològiques",
      "description": "Interpretar, comunicar informació i dades procedents de treballs científics, i argumentar amb precisió i utilitzant diferents formats, per analitzar conceptes, processos, mètodes, experiments o resultats de les ciències biològiques.",
      "criteris": {
        "1r": [
          "1.1 Analitzar críticament conceptes i processos relacionats amb els sabers de la Biologia, seleccionant i interpretant informació en diferents formats (models, gràfics, taules, diagrames, fórmules, esquemes o d’altres).",
          "1.2 Comunicar informacions o opinions raonades relacionades amb els sabers de la matèria de Biologia transmetent-les de manera clara i rigorosa, utilitzant la terminologia i el format adequats (models, gràfics, taules, informes, diagrames, fórmules, continguts digitals o d’altres) i responent de manera fonamentada a les qüestions que puguin sorgir durant el procés.",
          "1.3 Argumentar sobre aspectes relacionats amb els sabers de la matèria de Biologia, defensant una posició de manera raonada i amb una actitud oberta, flexible, receptiva, respectuosa davant l’opinió dels altres i basada en els coneixements científics."
        ],
        "2n": [
          "1.1 Analitzar críticament conceptes i processos relacionats amb els sabers de la Biologia, seleccionant i interpretant informació en diferents formats (models, gràfics, taules, diagrames, fórmules, esquemes o d’altres).",
          "1.2 Comunicar informacions o opinions raonades relacionades amb els sabers de la matèria de Biologia, transmetre-les de manera clara i rigorosa, utilitzant la terminologia i el format adequats (models, gràfics, taules, vídeos, informes, diagrames, fórmules, esquemes, símbols, continguts digitals o d’altres) i responent de manera fonamentada i precisa a les qüestions que puguin sorgir durant el procés.",
          "1.3 Argumentar sobre aspectes relacionats amb els sabers de la matèria de Biologia, considerant els punts forts i febles de diferents posicions de manera raonada i amb una actitud oberta, flexible, receptiva i respectuosa davant l’opinió dels altres i basada en els coneixements científics."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Identificar, seleccionar, organitzar i avaluar críticament informació, contrastant-ne la fiabilitat per resoldre preguntes plantejades de manera autònoma i crear continguts relacionats amb les ciències biològiques",
      "description": "Identificar, seleccionar, organitzar i avaluar críticament informació, contrastant-ne la fiabilitat per resoldre preguntes plantejades de manera autònoma i crear continguts relacionats amb les ciències biològiques.",
      "criteris": {
        "1r": [
          "2.1 Plantejar i resoldre qüestions relacionades amb els sabers de la matèria, localitzant i citant fonts adequades i seleccionant, organitzant i analitzant críticament la informació.",
          "2.2 Contrastar i justificar la credibilitat de la informació relacionada amb els sabers de la matèria, utilitzant fonts fiables i adoptant una actitud crítica i escèptica vers informacions interessades, sense autoria contrastada o sense una base científica, com ara pseudociències, teories de la conspiració, creences infundades, rumors, etc.",
          "2.3 Argumentar sobre la contribució de la ciència a la societat i la tasca de les persones que s’hi dediquen, reflexionant sobre els biaixos de gènere en les ciències i entenent la investigació com una tasca col·lectiva i interdisciplinària en constant evolució influïda pel context polític i els recursos econòmics."
        ],
        "2n": [
          "2.1 Plantejar i resoldre qüestions i crear continguts relacionats amb els sabers de la matèria de Biologia localitzant i citant fonts adequades i seleccionant, organitzant i analitzant críticament la informació.",
          "2.2 Contrastar i justificar la credibilitat d’informació relacionada amb els sabers de la matèria, utilitzant fonts fiables, aportant dades i adoptant una actitud crítica i escèptica vers informacions interessades, sense autoria contrastada o sense una base científica, com ara pseudociències, teories de la conspiració, creences infundades, rumors, etc."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Dissenyar i desenvolupar projectes de recerca relacionats amb la biologia i analitzar críticament els resultats d’aquests projectes i de treballs d’investigació i divulgació, comprovant si segueixen els passos de la metodologia científica, per avaluar la fiabilitat de les conclusions",
      "description": "Dissenyar i desenvolupar projectes de recerca relacionats amb la biologia i analitzar críticament els resultats d’aquests projectes i de treballs d’investigació i divulgació, comprovant si segueixen els passos de la metodologia científica, per avaluar la fiabilitat de les conclusions.",
      "criteris": {
        "1r": [
          "3.1 Plantejar preguntes i formular hipòtesis que puguin ser respostes o contrastades utilitzant mètodes científics i intentin explicar fenòmens biològics, i fer prediccions sobre aquests fenòmens.",
          "3.2 Avaluar la fiabilitat de les conclusions d’un treball de recerca propi d’acord amb la interpretació dels resultats obtinguts.",
          "3.3 Dissenyar l’experimentació, la presa de dades i l’anàlisi de fenòmens biològics, i seleccionar els instruments necessaris, de manera que permetin respondre preguntes investigables concretes i contrastar una hipòtesi plantejada minimitzant els biaixos en la mesura que sigui possible.",
          "3.4 Portar a terme experiments i prendre dades quantitatives i qualitatives sobre fenòmens biològics, seleccionant i utilitzant els instruments, les eines o les tècniques adequats amb correcció i precisió.",
          "3.5 Interpretar i analitzar resultats obtinguts en el projecte de recerca utilitzant, quan calgui, eines matemàtiques i tecnològiques i reconeixent-ne l’abast i les limitacions per obtenir conclusions raonades i fonamentades o valorar la impossibilitat de fer-ho.",
          "3.6 Establir col·laboracions dins i fora del centre educatiu en les diferents fases del projecte científic per treballar amb més eficiència, utilitzant les eines tecnològiques adequades, valorant la importància de la cooperació a la recerca, respectant la diversitat i afavorint la inclusió."
        ],
        "2n": [
          "3.1 Avaluar la fiabilitat de les conclusions d’un treball de recerca o de divulgació científica relacionat amb els sabers de la matèria d’acord amb la interpretació dels resultats obtinguts.",
          "3.2 Argumentar, utilitzant exemples concrets, sobre la contribució de la ciència a la societat i la tasca de les persones que s’hi han dedicat, reflexionant sobre els biaixos de gènere en les ciències i entenent la investigació com una tasca col·lectiva i interdisciplinària en constant evolució influïda pel context polític i els recursos econòmics."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Aplicar els aprenentatges de manera integrada i les diverses formes de raonament pròpies de la ciència, per plantejar i resoldre problemes relacionats amb les ciències biològiques, cercant i utilitzant les estratègies adequades, analitzant críticament les solucions i reformulant el procediment, si calgués",
      "description": "Aplicar els aprenentatges de manera integrada i les diverses formes de raonament pròpies de la ciència, per plantejar i resoldre problemes relacionats amb les ciències biològiques, cercant i utilitzant les estratègies adequades, analitzant críticament les solucions i reformulant el procediment, si calgués.",
      "criteris": {
        "1r": [
          "4.1 Resoldre problemes o donar explicació a processos biològics fent servir recursos variats com ara coneixements, dades i informació, raonament lògic, pensament computacional o recursos digitals.",
          "4.2 Analitzar críticament la solució a problemes sobre fenòmens biològics, i modificar els procediments utilitzats o conclusions obtingudes si aquesta solució no és viable o davant de noves dades aportades o trobades amb posterioritat."
        ],
        "2n": [
          "4.1 Explicar fenòmens relacionats amb els sabers de la matèria mitjançant el plantejament i la resolució de problemes, cercant i utilitzant les estratègies i els recursos adequats.",
          "4.2 Analitzar críticament la solució a un problema fent servir els sabers de la matèria de Biologia i reformular els procediments utilitzats o les conclusions si aquesta solució no fos viable o davant de noves dades aportades o trobades amb posterioritat."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Dissenyar, promoure i executar iniciatives de conservació del medi ambient basades en fonaments científics i analitzar els impactes d’activitats humanes sobre el medi ambient o la disponibilitat de recursos, a partir d’observacions de camp i d’informació en diferents formats per promoure i adoptar hàbits compatibles amb el desenvolupament sostenible",
      "description": "Dissenyar, promoure i executar iniciatives de conservació del medi ambient basades en fonaments científics i analitzar els impactes d’activitats humanes sobre el medi ambient o la disponibilitat de recursos, a partir d’observacions de camp i d’informació en diferents formats per promoure i adoptar hàbits compatibles amb el desenvolupament sostenible.",
      "criteris": {
        "1r": [
          "5.1 Analitzar les causes i les conseqüències ecològiques, socials i econòmiques dels principals problemes mediambientals des d’una perspectiva individual, local i global, concebent-los com a grans reptes de la humanitat i basant-se en dades científiques i en els sabers de la matèria de Biologia.",
          "5.2 Proposar i justificar la necessitat d’adoptar hàbits i portar a terme iniciatives sostenibles i saludables en l’àmbit local i argumentar sobre els efectes positius i la urgència d’adoptar- los basant-se en els sabers de la matèria."
        ],
        "2n": [
          "5.1 Argumentar sobre la importància d’adoptar hàbits saludables i un model de desenvolupament sostenible, basant-se en els principis de la biologia, en particular de la biologia molecular, i relacionar-los amb els processos macroscòpics."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Descriure, integrar i relacionar els principals processos característics dels éssers vius per justificar la complexitat de la vida i desmarcar-la del que és inert",
      "description": "Descriure, integrar i relacionar els principals processos característics dels éssers vius per justificar la complexitat de la vida i desmarcar-la del que és inert.",
      "criteris": {
        "1r": [
          "6.1 Identificar i diferenciar les diferents biomolècules pròpies dels éssers vius.",
          "6.2 Identificar experimentalment diferents tipus de biomolècules i relacionar-les amb les estructures biològiques i els aliments.",
          "6.3 Justificar el concepte de cèl·lula com a unitat estructural i funcional dels éssers vius."
        ],
        "2n": [
          "6.1 Explicar les característiques i els processos vitals dels éssers vius mitjançant l’anàlisi de les seves biomolècules, de les seves funcions, de les interaccions bioquímiques entre biomolècules i de les seves reaccions metabòliques.",
          "6.2 Aplicar metodologies analítiques al laboratori utilitzant els materials adequats amb precisió.",
          "6.3 Justificar la importància del processament de la matèria i l’energia per al manteniment de la vida en diferents nivells (cel·lular, organisme, ecosistema) i per a la seva capacitat d’autoconservació.",
          "6.4 Argumentar la importància del programa genètic per a la vida dels éssers vius i la seva relació amb l’evolució biològica."
        ]
      }
    }
  ]
},
  "Dibuix Tècnic": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Examinar elements i formes de l’entorn que permetin fer evidents conceptes propis de la geometria plana i projectiva, per analitzar de forma raonada les estructures geomètriques i els elements tècnics implícits",
      "description": "Examinar elements i formes de l’entorn que permetin fer evidents conceptes propis de la geometria plana i projectiva, per analitzar de forma raonada les estructures geomètriques i els elements tècnics implícits.",
      "criteris": {
        "1r": [
          "1.1 Analitzar, al llarg de la història, la relació entre les matemàtiques i el dibuix geomètric valorant-ne la importància en diferents camps com l’arquitectura o l’enginyeria."
        ],
        "2n": [
          "1.1 Analitzar l’evolució de les formes geomètriques a l’arquitectura i a les enginyeries contemporànies valorant la influència de la tecnologia i les eines digitals en camps com l’arquitectura o l’enginyeria."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Analitzar formes i traçats d’acord amb els principis propis del llenguatge de la geometria plana, per decidir els procediments idonis que permetin traçar-los gràficament amb precisió i de forma raonada",
      "description": "Analitzar formes i traçats d’acord amb els principis propis del llenguatge de la geometria plana, per decidir els procediments idonis que permetin traçar-los gràficament amb precisió i de forma raonada.",
      "criteris": {
        "1r": [
          "2.1 Solucionar gràficament càlculs matemàtics i transformacions bàsiques aplicant conceptes i propietats de la geometria plana.",
          "2.2 Traçar gràficament construccions poligonals basant-se en les seves propietats i mostrant interès per la precisió, la claredat i la neteja.",
          "2.3 Resoldre gràficament tangències i traçar corbes aplicant-ne les propietats amb una actitud de rigor en la seva execució."
        ],
        "2n": [
          "2.1 Construir figures planes aplicant els traçats propis de les transformacions geomètriques.",
          "2.2 Resoldre tangències aplicant els conceptes de potència, valorant la necessitat de la precisió dels traçats.",
          "2.3 Representar corbes còniques i les seves tangents aplicant propietats i mètodes de construcció, valorant la necessitat de la precisió dels traçats."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Avaluar i decidir els procediments més adequats, fent ús de la geometria plana i descriptiva, així com de les convencions pròpies de la normalització de forma apropiada, per crear i concretar formes bidimensionals i tridimensionals",
      "description": "Avaluar i decidir els procediments més adequats, fent ús de la geometria plana i descriptiva, així com de les convencions pròpies de la normalització de forma apropiada, per crear i concretar formes bidimensionals i tridimensionals.",
      "criteris": {
        "1r": [
          "3.1 Representar en sistema dièdric directe els elements bàsics a l’espai i determinar-ne la relació de pertinença, posició i distància.",
          "3.2 Definir en sistemes axonomètrics elements i figures planes valorant-ne la importància com a mètodes de representació espacial.",
          "3.3 Dibuixar elements a l’espai fent servir la perspectiva cònica."
        ],
        "2n": [
          "3.1 Valorar els procediments propis de l’operativitat dièdrica (abatiment, canvi de pla i gir) resolent i concretant formes en sistema dièdric directe i avaluant la idoneïtat de cada procediment.",
          "3.2 Representar sòlids polièdrics i de revolució aplicant els fonaments del sistema dièdric directe.",
          "3.3 Representar sòlids polièdrics aplicant els procediments de les perspectives axonomètriques.",
          "3.4 Dissenyar projectes gràfics senzills fent ús del sistema de plans acotats."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Dissenyar i reelaborar formes bidimensionals i tridimensionals, valorant la importància del croquis a mà alçada, per representar-les amb precisió en projectes gràfics col·laboratius que permetin proposar, criticar, revisar, comparar, fer hipòtesis i traçar de forma consensuada i eficaç, fent ús de les eines digitals disponibles",
      "description": "Dissenyar i reelaborar formes bidimensionals i tridimensionals, valorant la importància del croquis a mà alçada, per representar-les amb precisió en projectes gràfics col·laboratius que permetin proposar, criticar, revisar, comparar, fer hipòtesis i traçar de forma consensuada i eficaç, fent ús de les eines digitals disponibles.",
      "criteris": {
        "1r": [
          "4.1 Documentar gràficament objectes senzills mitjançant les vistes acotades aplicant la normativa UNE ISO en la utilització de sintaxi, escales i formats, valorant la importància d’usar un llenguatge tècnic comú.",
          "4.2 Crear figures planes i tridimensionals mitjançant programes de dibuix vectorial, fent ús de les eines que aporten i les tècniques associades.",
          "4.3 Recrear virtualment peces en tres dimensions per a la presentació de projectes en grup."
        ],
        "2n": [
          "4.1 Desenvolupar projectes col·laboratius elaborant la documentació gràfica (croquis, plànols) necessària fent ús de les convencions pròpies de la normalització.",
          "4.2 Desenvolupar projectes col·laboratius integrant les eines digitals CAD, valorant les possibilitats que aporten al desenvolupament de projectes compartits."
        ]
      }
    }
  ]
},
  "Física": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Analitzar fenòmens i resoldre problemes basats en situacions properes mitjançant l’ús de les teories, principis i lleis de la física, atenent la seva base experimental, la descripció teòrica i el desenvolupament matemàtic, per evidenciar la seva implicació en el desenvolupament de la tecnologia, l’economia, la societat i la sostenibilitat ambiental",
      "description": "Analitzar fenòmens i resoldre problemes basats en situacions properes mitjançant l’ús de les teories, principis i lleis de la física, atenent la seva base experimental, la descripció teòrica i el desenvolupament matemàtic, per evidenciar la seva implicació en el desenvolupament de la tecnologia, l’economia, la societat i la sostenibilitat ambiental.",
      "criteris": {
        "1r": [
          "1.1 Aplicar les teories, els principis i les lleis de la física en l’anàlisi de fenòmens quotidians, comprenent les causes que els produeixen i explicant-les utilitzant diversitat de suports i mitjans de comunicació.",
          "1.2 Resoldre problemes plantejats a partir de situacions quotidianes, aplicant les lleis i les teories científiques per trobar i argumentar les solucions i expressant adequadament els resultats.",
          "1.3 Identificar situacions problemàtiques a l’entorn quotidià, emprendre iniciatives i cercar solucions sostenibles des de la física, analitzant críticament l’impacte produït en la societat i el medi ambient."
        ],
        "2n": [
          "1.1 Reconèixer la rellevància i les aportacions de la física en el desenvolupament de la ciència, la tecnologia, l’economia, la societat i la sostenibilitat ambiental, emprant adequadament els fonaments científics relatius a aquests àmbits.",
          "1.2 Resoldre problemes plantejats a partir de situacions quotidianes de manera experimental i analítica, fent servir principis, lleis i teories de la física."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Analitzar l’entorn proper i predir-ne l’evolució a partir dels models, de les teories i les lleis de la física mitjançant la formulació de preguntes investigables, la indagació i la cerca d’evidències per proposar solucions generals a problemes quotidians relacionats amb les aplicacions pràctiques de la física en el camp tecnològic, industrial i biosanitari",
      "description": "Analitzar l’entorn proper i predir-ne l’evolució a partir dels models, de les teories i les lleis de la física mitjançant la formulació de preguntes investigables, la indagació i la cerca d’evidències per proposar solucions generals a problemes quotidians relacionats amb les aplicacions pràctiques de la física en el camp tecnològic, industrial i biosanitari.",
      "criteris": {
        "1r": [
          "2.1 Formular i verificar hipòtesis com a respostes a diferents problemes i observacions de l’entorn proper, mitjançant l’ús amb destresa del treball experimental, la indagació, la recerca d’evidències i el raonament logicomatemàtic.",
          "2.2 Utilitzar diferents mètodes per trobar la resposta a una sola qüestió o observació, confrontant els resultats obtinguts per garantir-ne la coherència i la fiabilitat.",
          "2.3 Integrar els models, les teories i les lleis de la física en el procés de validació de les hipòtesis formulades, aplicant relacions qualitatives i quantitatives entre les diferents variables, de manera que el procés sigui més fiable i coherent amb el coneixement científic."
        ],
        "2n": [
          "2.1 Analitzar i comprendre l’evolució dels sistemes naturals, utilitzant models, lleis i teories de la física.",
          "2.2 Inferir solucions generals a problemes generals a partir de l’anàlisi de situacions particulars i les variables de què depenen.",
          "2.3 Utilitzar els models, les lleis i les teories de la física per analitzar i comprendre el funcionament general d’aplicacions pràctiques i productes útils per a la societat en el camp tecnològic, industrial i biosanitari."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Utilitzar amb propietat, correcció i fluïdesa, als diferents registres de comunicació de la ciència, el llenguatge de la física amb la formulació matemàtica dels seus principis, magnituds, unitats de mesura, etc., per evidenciar la necessitat d’establir una eina de comunicació entre comunitats científiques i en la investigació",
      "description": "Utilitzar amb propietat, correcció i fluïdesa, als diferents registres de comunicació de la ciència, el llenguatge de la física amb la formulació matemàtica dels seus principis, magnituds, unitats de mesura, etc., per evidenciar la necessitat d’establir una eina de comunicació entre comunitats científiques i en la investigació.",
      "criteris": {
        "1r": [
          "3.1 Utilitzar i relacionar de manera rigorosa el Sistema Internacional d’Unitats (SI) i altres sistemes d’unitats, emprant correctament la seva notació i les seves equivalències, reconeixent el seu paper com a eina de comunicació efectiva entre la comunitat científica.",
          "3.2 Extreure, interpretar i expressar informació provinent de diferents formats relativa a un procés concret, relacionant entre si la informació i extraient-ne el més rellevant durant la resolució d’un problema.",
          "3.3 Posar en pràctica els coneixements adquirits en l’experimentació científica al laboratori o altres entorns, incloent-hi l’ús correcte dels aparells de mesura i de recollida de dades i la normativa bàsica d’ús, així com les normes de seguretat pròpies d’aquests espais."
        ],
        "2n": [
          "3.1 Aplicar els principis, les lleis i les teories científiques en l’anàlisi crítica de processos físics de l’entorn, com els observats i els publicats en diferents mitjans de comunicació, analitzant, comprenent i explicant de manera argumentada les causes que els produeixen.",
          "3.2 Utilitzar de manera rigorosa les unitats de les variables físiques expressades en el Sistema Internacional d’Unitats (SI) i altres sistemes d’unitats rellevants, emprant correctament la seva notació i equivalències, així com l’elaboració i la interpretació adequada de gràfiques que relacionin variables físiques, reconeixent el seu paper com a eina de comunicació efectiva entre la comunitat científica.",
          "3.3 Expressar de manera adequada els resultats, argumentant les solucions obtingudes, en la resolució d’exercicis i problemes definits a partir de situacions basades en contextos realistes o ideals."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Seleccionar i avaluar críticament informació i recursos, en diferents formats i plataformes, tant al treball individual com col·lectiu, per crear continguts científics i de divulgació relacionats amb la física i argumentar sobre el seu paper a la societat",
      "description": "Seleccionar i avaluar críticament informació i recursos, en diferents formats i plataformes, tant al treball individual com col·lectiu, per crear continguts científics i de divulgació relacionats amb la física i argumentar sobre el seu paper a la societat.",
      "criteris": {
        "1r": [
          "4.1 Interactuar amb altres membres de la comunitat educativa mitjançant diferents entorns d’aprenentatge, reals i virtuals, utilitzant de manera autònoma i eficient recursos variats, tradicionals analògics i digitals, de manera rigorosa i respectuosa i analitzant críticament totes les aportacions",
          "4.2 Gestionar de manera autònoma i versàtil, individualment i en grup, la informació i la creació de continguts, amb fonament científic, utilitzant amb criteri i rigor les fonts i eines més adequades, millorant així l’aprenentatge propi i col·lectiu."
        ],
        "2n": [
          "4.1 Consultar, elaborar i intercanviar materials científics i divulgatius en diferents formats amb altres membres de l’entorn d’aprenentatge, utilitzant de manera autònoma i eficient plataformes digitals.",
          "4.2 Usar de manera crítica, ètica i responsable mitjans de comunicació digitals i tradicionals com a manera d’enriquir l’aprenentatge i el treball individual i col·lectiu i de reconèixer la presència de la física a la societat."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Aplicar tècniques de treball i indagació pròpies de la física com l’experimentació en entorns reals o virtuals, el raonament logicomatemàtic, de forma individual o en entorns col·laboratius similars als de la comunitat científica, per reconèixer el paper de la física i predir la influència dels seus avenços en una societat basada en valors ètics i sostenibles",
      "description": "Aplicar tècniques de treball i indagació pròpies de la física com l’experimentació en entorns reals o virtuals, el raonament logicomatemàtic, de forma individual o en entorns col·laboratius similars als de la comunitat científica, per reconèixer el paper de la física i predir la influència dels seus avenços en una societat basada en valors ètics i sostenibles.",
      "criteris": {
        "1r": [
          "5.1 Participar de manera activa en la construcció del coneixement científic, evidenciant la presència de la interacció, la cooperació i l’avaluació entre iguals, millorant la capacitat de qüestionament, la reflexió i el debat per assolir el consens en la resolució d’un problema o situació d’aprenentatge.",
          "5.2 Construir i produir coneixements a través del treball col·lectiu, mitjançant l’anàlisi, la discussió i la síntesi i obtenint com a resultat productes representats en informes, pòsters, presentacions, articles científics o de divulgació, etc.",
          "5.3 Debatre, de manera informada i argumentada, sobre les diferents qüestions mediambientals, socials i ètiques relacionades amb el desenvolupament de les ciències, aconseguint un consens en l’impacte d’aquests avenços en la societat i proposant solucions creatives en comú a les qüestions plantejades."
        ],
        "2n": [
          "5.1 Obtenir relacions entre variables físiques, mesurant i tractant les dades experimentals, determinant-ne els errors i utilitzant sistemes de representació gràfica en entorns analògics o digitals.",
          "5.2 Reproduir en laboratoris, siguin reals o virtuals, determinats processos físics modificant les variables que els condicionen, considerant els principis, les lleis o les teories implicats, generant el corresponent informe amb format adequat i incloent-hi argumentacions, conclusions, taules de dades, gràfiques i referències bibliogràfiques.",
          "5.3 Valorar les aportacions de la física a la societat, debatent de manera fonamentada sobre el seu impacte des del punt de vista de l’ètica i de la sostenibilitat, i reflexionant sobre les causes i les conseqüències dels biaixos de gènere en les ciències."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Justificar el caràcter multidisciplinari de la física i la seva contribució històrica a l’avenç del coneixement científic, per actuar com a agents crítics en l’anàlisi i la difusió de la informació i promoure una societat igualitària, saludable i sostenible",
      "description": "Justificar el caràcter multidisciplinari de la física i la seva contribució històrica a l’avenç del coneixement científic, per actuar com a agents crítics en l’anàlisi i la difusió de la informació i promoure una societat igualitària, saludable i sostenible.",
      "criteris": {
        "1r": [
          "6.1 Identificar i argumentar científicament les repercussions de les accions que l’alumne o alumna emprèn en la seva vida quotidiana, analitzant com la física pot ajudar a millorar-les com a manera de participar activament en la construcció d’una societat igualitària, saludable i sostenible.",
          "6.2 Detectar les necessitats de la societat sobre les quals aplicar els coneixements científics adequats que ajudin a millorar- la, incidint especialment en aspectes com el desenvolupament sostenible i la preservació de la salut."
        ],
        "2n": [
          "6.1 Identificar els principals avenços científics relacionats amb la física que han contribuït a les lleis i teories acceptades actualment en el conjunt de les disciplines científiques, com les fases per a la comprensió de les metodologies de la ciència, la seva evolució constant i la seva universalitat.",
          "6.2 Reconèixer el caràcter multidisciplinari de la ciència i les contribucions d’unes disciplines sobre les altres, establint relacions entre la física i altres disciplines com la química, la biologia o les matemàtiques a partir de propostes d’aprenentatge contextualitzades i realistes."
        ]
      }
    }
  ]
},
  "Geologia i Ciències Ambientals": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Interpretar, comunicar i argumentar informació i dades procedents de treballs científics, amb precisió i utilitzant diferents formats, per analitzar processos, mètodes, experiments o resultats de les ciències geològiques i ambientals",
      "description": "Interpretar, comunicar i argumentar informació i dades procedents de treballs científics, amb precisió i utilitzant diferents formats, per analitzar processos, mètodes, experiments o resultats de les ciències geològiques i ambientals.",
      "criteris": {
        "1r": [
          "1.1 Analitzar críticament conceptes i processos de la matèria de Geologia i Ciències Ambientals seleccionant i interpretant informació en diferents formats (mapes, models, talls gràfics, taules, etc.).",
          "1.2 Comunicar informacions o opinions raonades sobre temes de geologia i ciències ambientals, transmetent-les de manera clara i rigorosa, utilitzant la terminologia i el format adequats (mapes, models, gràfics, taules, informes, diagrames, fórmules, continguts digitals, etc.) i responent de manera fonamentada a les qüestions que puguin sorgir durant l’exposició.",
          "1.3 Tenir discussions científiques sobre aspectes relacionats amb els sabers de la geologia i les ciències ambientals considerant raonadament els punts forts i febles de diferents posicions i amb una actitud receptiva i respectuosa davant de l’opinió dels altres."
        ],
        "2n": [
          "1.1 Analitzar críticament conceptes i processos de la matèria de Geologia i Ciències Ambientals interpretant informació en diferents formats (models, gràfics, taules, diagrames, fórmules, esquemes, etc.).",
          "1.2 Comunicar informacions o opinions raonades sobre temes de geologia i ciències ambientals, transmetent-les de manera clara i rigorosa, utilitzant la terminologia i el format adequats (models, gràfics, taules, informes, diagrames, fórmules, etc.) i eines digitals, responent de manera fonamentada a les qüestions que puguin sorgir durant l’exposició.",
          "1.3 Argumentar sobre situacions relacionades amb la geologia i les ciències ambientals defensant una posició raonada científicament i amb una actitud oberta, flexible, receptiva i respectuosa davant de l’opinió dels altres."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Identificar, seleccionar, organitzar i avaluar críticament informació, contrastant-ne la fiabilitat per resoldre preguntes plantejades de manera autònoma i crear continguts relacionats amb les ciències geològiques i ambientals",
      "description": "Identificar, seleccionar, organitzar i avaluar críticament informació, contrastant-ne la fiabilitat per resoldre preguntes plantejades de manera autònoma i crear continguts relacionats amb les ciències geològiques i ambientals.",
      "criteris": {
        "1r": [
          "2.1 Plantejar i resoldre qüestions relacionades amb la geologia i les ciències ambientals, localitzant i citant fonts adequades i seleccionant, organitzant i analitzant críticament la informació.",
          "2.2 Contrastar i justificar la veracitat d’informació relacionada amb la geologia les ciències ambientals utilitzant fonts fiables i adoptant una actitud crítica i escèptica davant informacions sense base científica.",
          "2.3 Argumentar sobre la contribució de la ciència a la societat i la tasca de les persones que s’hi dediquen, reflexionant sobre els biaixos de gènere en les ciències i entenent la investigació com una tasca col·lectiva i interdisciplinària, en constant evolució i influïda pel context polític i els recursos econòmics."
        ],
        "2n": [
          "2.1 Plantejar i resoldre qüestions i crear continguts relacionats amb la geologia i les ciències ambientals, localitzant i citant fonts de manera adequada i seleccionant, organitzant i analitzant críticament la informació.",
          "2.2 Contrastar i justificar la veracitat i d’informació relacionada amb la geologia i les ciències ambientals utilitzant fonts fiables, aportant dades i adoptant una actitud crítica i escèptica davant informacions sense base científica."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Dissenyar i desenvolupar projectes de recerca de ciències geològiques i ambientals i analitzar críticament els resultats, així com els de treballs d’investigació i divulgació, comprovant si segueixen els passos de la metodologia científica per avaluar-ne la fiabilitat de les conclusions",
      "description": "Dissenyar i desenvolupar projectes de recerca de ciències geològiques i ambientals i analitzar críticament els resultats, així com els de treballs d’investigació i divulgació, comprovant si segueixen els passos de la metodologia científica per avaluar-ne la fiabilitat de les conclusions.",
      "criteris": {
        "1r": [
          "3.1 Plantejar preguntes, fer prediccions i formular hipòtesis que puguin ser respostes o contrastades utilitzant mètodes científics i intentin explicar fenòmens geològics i ambientals.",
          "3.2 Dissenyar l’experimentació i la presa de dades per a l’anàlisi de fenòmens geològics i ambientals, seleccionant els instruments adequats per respondre a les preguntes de recerca i contrastar les hipòtesis plantejades.",
          "3.3 Fer experiments i prendre dades quantitatives i qualitatives sobre fenòmens geològics i ambientals seleccionant i utilitzant els instruments, les eines o les tècniques adequades amb correcció i precisió.",
          "3.4 Interpretar i analitzar resultats obtinguts en projectes de recerca utilitzant, quan calgui, eines matemàtiques i tecnològiques i reconeixent-ne l’abast i les limitacions per obtenir conclusions raonades i fonamentades.",
          "3.5 Establir col·laboracions dins i fora del centre educatiu en les diferents fases d’un projecte científic per treballar amb més eficiència, utilitzant les eines tecnològiques adequades, valorant la importància de la cooperació a la recerca, respectant la diversitat i afavorint-ne la inclusió.",
          "3.6 Presentar de manera clara i rigorosa la introducció, la metodologia, els resultats i les conclusions d’un projecte científic utilitzant el format adequat i les eines digitals."
        ],
        "2n": [
          "3.1 Avaluar la fiabilitat de les conclusions de treballs de recerca o divulgació científica relacionats amb la geologia o les ciències ambientals a partir de la interpretació dels resultats obtinguts.",
          "3.2 Argumentar, usant exemples concrets, sobre la contribució de la ciència a la societat i la tasca de les persones dedicades, reflexionant sobre els biaixos de gènere en les ciències i entenent la investigació com una tasca col·lectiva i interdisciplinària en constant evolució influïda pels contextos polític i econòmic."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Aplicar els aprenentatges de manera integrada i les diverses formes de raonament pròpies de la ciència, per plantejar i resoldre problemes relacionats amb les ciències geològiques i ambientals, cercant i utilitzant les estratègies adequades, analitzant críticament les solucions i reformulant el procediment, si calgués",
      "description": "Aplicar els aprenentatges de manera integrada i les diverses formes de raonament pròpies de la ciència, per plantejar i resoldre problemes relacionats amb les ciències geològiques i ambientals, cercant i utilitzant les estratègies adequades, analitzant críticament les solucions i reformulant el procediment, si calgués.",
      "criteris": {
        "1r": [
          "4.1 Resoldre problemes per donar explicació a processos geològics o ambientals cercant i utilitzant recursos diversos com coneixements, dades, informació, raonament o eines i recursos digitals.",
          "4.2 Analitzar críticament la solució a problemes sobre fenòmens geològics o ambientals i modificar els procediments de resolució utilitzats o conclusions obtingudes si aquestes no fossin viables o davant de noves dades."
        ],
        "2n": [
          "4.1 Explicar fenòmens relacionats amb la geologia i les ciències ambientals a través del plantejament i la resolució de problemes, buscant i utilitzant estratègies i recursos adequats i diversos.",
          "4.2 Analitzar críticament la solució a problemes de geologia o ciències ambientals reformulant els procediments utilitzats o les conclusions obtingudes si aquestes no fossin viables o davant de noves dades."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Analitzar els impactes d’activitats humanes sobre el medi ambient o la disponibilitat de recursos, a partir d’observacions de camp i d’informació en diferents formats, per dissenyar, promoure i executar iniciatives de conservació del medi ambient i adoptar hàbits compatibles amb el desenvolupament sostenible basats en fonaments científics",
      "description": "Analitzar els impactes d’activitats humanes sobre el medi ambient o la disponibilitat de recursos, a partir d’observacions de camp i d’informació en diferents formats, per dissenyar, promoure i executar iniciatives de conservació del medi ambient i adoptar hàbits compatibles amb el desenvolupament sostenible basats en fonaments científics.",
      "criteris": {
        "1r": [
          "5.1 Analitzar a partir d’observacions i coneixements científics de geologia i ciències ambientals les causes i les conseqüències ecològiques, socials i econòmiques dels principals problemes mediambientals des d’una perspectiva personal, local i global, concebent-los com a grans reptes de la humanitat.",
          "5.2 Proposar i justificar la necessitat de posar en pràctica hàbits i iniciatives sostenibles en l’àmbit local, argumentant d’acord amb coneixements científics de geologia i ciències ambientals sobre els seus efectes positius i la urgència d’adoptar-los."
        ],
        "2n": [
          "5.1 Promoure i adoptar hàbits sostenibles a partir de l’anàlisi dels usos dels diferents tipus de recursos naturals i els impactes mediambientals que se’n deriven.",
          "5.2 Relacionar l’impacte de l’explotació de determinats recursos amb el deteriorament mediambiental, argumentant amb fonamentació científica la importància i la necessitat d’adoptar hàbits de consum sostenibles."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Identificar i analitzar elements geològics del relleu utilitzant coneixements científics amb informació en diferents formats o observacions de camp, per explicar fenòmens, reconstruir la història geològica, fer prediccions i identificar possibles riscos naturals",
      "description": "Identificar i analitzar elements geològics del relleu utilitzant coneixements científics amb informació en diferents formats o observacions de camp, per explicar fenòmens, reconstruir la història geològica, fer prediccions i identificar possibles riscos naturals.",
      "criteris": {
        "1r": [
          "6.1 Deduir i explicar la història geològica d’una àrea determinada identificant-ne i analitzant-ne els elements geològics a partir d’informació en diferents formats (fotografies, talls, mapes geològics, etc.).",
          "6.2 Relacionar usant coneixements de geologia i el raonament lògic els grans esdeveniments de la història terrestre amb elements del registre geològic i amb successos que tenen lloc actualment.",
          "6.3 Resoldre problemes de datació analitzant elements del registre geològic i fòssil i aplicant altres mètodes."
        ],
        "2n": [
          "6.1 Deduir i explicar la història geològica d’una àrea determinada identificant-ne i analitzant-ne els elements geològics a partir d’informació en diferents formats (fotografies, talls, mapes geològics, etc.).",
          "6.2 Fer prediccions sobre fenòmens i riscos naturals en una àrea determinada analitzant la influència de diferents factors (activitats humanes, climatologia, relleu, vegetació, localització, processos geològics interns, etc.) i proposar accions per prevenir o minimitzar-ne els efectes negatius."
        ]
      }
    }
  ]
},
  "Química": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Analitzar fenòmens i resoldre problemes basats en situacions relacionades amb la química mitjançant l’ús dels seus models, lleis i teories, atenent la base experimental i la conceptualització, per evidenciar la importància de la química com a ciència rellevant, i les connexions amb la vida quotidiana, el benestar comú i la sostenibilitat ambiental",
      "description": "Analitzar fenòmens i resoldre problemes basats en situacions relacionades amb la química mitjançant l’ús dels seus models, lleis i teories, atenent la base experimental i la conceptualització, per evidenciar la importància de la química com a ciència rellevant, i les connexions amb la vida quotidiana, el benestar comú i la sostenibilitat ambiental.",
      "criteris": {
        "1r": [
          "1.1 Aplicar els models, les lleis i les teories científiques en l’anàlisi de fenòmens fisicoquímics quotidians, interpretant les causes que els produeixen i explicant-les utilitzant diversitat de suports i mitjans de comunicació.",
          "1.2 Resoldre problemes fisicoquímics plantejats a partir de situacions quotidianes, aplicant els models, les lleis i les teories científiques per proposar i argumentar possibles solucions, expressant adequadament els resultats.",
          "1.3 Identificar situacions problemàtiques a l’entorn quotidià, locals o globals, emprendre iniciatives i cercar solucions sostenibles des de la química, analitzant críticament l’impacte produït en la societat i en el medi ambient."
        ],
        "2n": [
          "1.1 Reconèixer la importància de la química i les seves connexions amb altres àrees en el desenvolupament de la societat, el progrés de la ciència, la tecnologia, l’economia i la sostenibilitat, identificant els avenços en el camp de la química que han estat fonamentals en aquests aspectes.",
          "1.2 Descriure els principals processos químics que succeeixen a l’entorn i les propietats dels sistemes materials a partir dels coneixements, les destreses i les actituds propis de les diferents disciplines de la química.",
          "1.3 Reconèixer la naturalesa experimental i interdisciplinària de la química i la seva influència en la investigació científica i en els àmbits econòmic i laboral actuals i les seves aplicacions en altres camps del coneixement i de l’activitat humana."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Formular preguntes i hipòtesis i contrastar-les a través de la indagació i l’experimentació atenent normes de seguretat, i argumentar mitjançant models i lleis de la química en situacions relacionades amb els sistemes materials i les aplicacions pràctiques de la química per proposar solucions a problemàtiques sociomediambientals",
      "description": "Formular preguntes i hipòtesis i contrastar-les a través de la indagació i l’experimentació atenent normes de seguretat, i argumentar mitjançant models i lleis de la química en situacions relacionades amb els sistemes materials i les aplicacions pràctiques de la química per proposar solucions a problemàtiques sociomediambientals.",
      "criteris": {
        "1r": [
          "2.1 Formular i contrastar hipòtesis com a respostes a diferents problemes i observacions, utilitzant de manera adient el treball experimental, la indagació, la recerca d’evidències i el raonament logicomatemàtic.",
          "2.2 Utilitzar diferents mètodes per cercar la resposta a una sola qüestió o observació, confrontant els resultats obtinguts per diferents mètodes i assegurant-ne la coherència i fiabilitat.",
          "2.3 Integrar les lleis i les teories científiques conegudes en el procediment de contrast de les hipòtesis formulades, aplicant relacions qualitatives i quantitatives entre les diferents variables, per garantir-ne la fiabilitat i la coherència amb el coneixement científic.",
          "2.4 Posar en pràctica els coneixements adquirits en l’experimentació científica al laboratori, al camp o a altres entorns, incloent-hi el coneixement dels materials i els aparells de mesura i de recollida i tractament de dades, la normativa bàsica i normes de seguretat pròpies d’aquests espais, i comprenent la importància de la seguretat en el progrés científic i emprenedor."
        ],
        "2n": [
          "2.1 Relacionar la química amb situacions problemàtiques actuals, associades al desenvolupament de la ciència i la tecnologia, analitzant com es presenta a través dels mitjans de comunicació o com són percebuts en la vida quotidiana.",
          "2.2 Reconèixer i comunicar que la química constitueix un cos de coneixement imprescindible per a l’estudi i la discussió de qüestions significatives en els àmbits social, econòmic, polític i ètic, identificant-ne la presència i la influència.",
          "2.3 Aplicar de manera informada, coherent i raonada els models i les lleis de la química, explicant i predient les conseqüències d’experiments, fenòmens naturals, processos industrials i descobriments científics.",
          "2.4 Posar en pràctica els coneixements adquirits en l’experimentació científica al laboratori, al camp o a altres entorns, incloent-hi el coneixement dels materials i els aparells de mesura i de recollida i tractament de dades, la normativa bàsica i normes de seguretat pròpies d’aquests espais, i comprenent la importància de la seguretat en el progrés científic i emprenedor."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Interpretar i organitzar informació en diferents formats a partir de fonts diverses, utilitzant de manera adequada els diversos registres de comunicació de la química (unitats, formulació, llenguatge simbòlic, matemàtic i d’altres), per evidenciar la necessitat d’establir una eina de comunicació entre comunitats científiques i en la investigació",
      "description": "Interpretar i organitzar informació en diferents formats a partir de fonts diverses, utilitzant de manera adequada els diversos registres de comunicació de la química (unitats, formulació, llenguatge simbòlic, matemàtic i d’altres), per evidenciar la necessitat d’establir una eina de comunicació entre comunitats científiques i en la investigació.",
      "criteris": {
        "1r": [
          "3.1 Utilitzar i relacionar de manera rigorosa el Sistema Internacional d’Unitats (SI) i altres sistemes d’unitats, emprant correctament la seva notació i les seves equivalències, tot fent possible una comunicació efectiva amb tota la comunitat científica.",
          "3.2 Anomenar i formular correctament substàncies simples, ions i compostos químics inorgànics i orgànics utilitzant les normes de la IUPAC, com a part d’un llenguatge integrador i universal per a tota la comunitat científica.",
          "3.3 Emprar diferents formats per interpretar i expressar informació relativa un procés fisicoquímic concret, relacionant i extraient la informació més rellevant de cada format per a la resolució d’un problema.",
          "3.4 Posar en pràctica els coneixements adquirits en l’experimentació científica al laboratori, al camp o a altres entorns, incloent-hi el coneixement dels materials els aparells de mesura i de recollida i tractament de dades, la normativa bàsica normes de seguretat pròpies d’aquests espais, i comprenent la importància de la seguretat en el progrés científic i emprenedor."
        ],
        "2n": [
          "3.1 Utilitzar correctament el Sistema Internacional d’Unitats (SI) i altres sistemes d’unitats i les normes de nomenclatura de la IUPAC com a base d’un llenguatge universal per a la química, que permeti una comunicació efectiva amb tota la comunitat científica.",
          "3.2 Emprar amb rigor eines matemàtiques per donar suport al desenvolupament del pensament científic, aplicant aquestes eines en la resolució de problemes, usant equacions, unitats i operacions.",
          "3.3 Practicar i fer respectar les normes de seguretat relacionades amb la manipulació a de substàncies químiques al laboratori i en altres entorns, i els procediments per a la correcta gestió i eliminació dels residus, utilitzant correctament els codis de comunicació característics de la química."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Seleccionar i avaluar críticament informació i recursos, en diferents formats i plataformes, tant en el treball individual com col·lectiu, crear i comunicar coneixement de manera efectiva i en diversos formats i argumentar l’ús responsable de substàncies i processos químics per al reconeixement de la influència positiva de la química en la societat",
      "description": "Seleccionar i avaluar críticament informació i recursos, en diferents formats i plataformes, tant en el treball individual com col·lectiu, crear i comunicar coneixement de manera efectiva i en diversos formats i argumentar l’ús responsable de substàncies i processos químics per al reconeixement de la influència positiva de la química en la societat.",
      "criteris": {
        "1r": [
          "4.1 Interactuar amb altres membres de la comunitat educativa, mitjançant diferents entorns d’aprenentatge, reals i virtuals, utilitzant de forma autònoma i eficient recursos variats, analògics i digitals, de forma rigorosa i respectuosa i analitzant críticament totes les aportacions.",
          "4.2 Gestionar de forma autònoma i versàtil, individualment i en grup, la informació i la creació de continguts, amb fonament científic, utilitzant amb criteri i rigor les fonts i les eines més fiables, millorant així l’aprenentatge propi i col·lectiu."
        ],
        "2n": [
          "4.1 Analitzar la composició química dels sistemes materials que es troben a l’entorn proper, al medi natural i a l’entorn industrial i tecnològic, argumentant que les seves propietats, aplicacions i beneficis estan basats en els principis de la química.",
          "4.2 Argumentar de manera informada, aplicant les teories i les lleis de la química, que els efectes negatius de determinades substàncies a l’ambient i a la salut són degudes al mal ús que es fa d’aquests productes o a la negligència, i no a la ciència química en si.",
          "4.3 Explicar, emprant els coneixements científics adequats, quins són els beneficis dels nombrosos productes de la tecnologia química i com el seu ús i la seva aplicació han contribuït al progrés de la societat."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Resoldre i interpretar problemes en contextos relacionats amb la química, aplicant habilitats de cooperació, coordinació, emprenedoria i tècniques de treball pròpies de la comunitat química (experimentació, indagació, raonament logicomatemàtic, etc.), per reconèixer el paper de la química i predir la influència dels seus avenços en una societat basada en valors ètics i sostenibles",
      "description": "Resoldre i interpretar problemes en contextos relacionats amb la química, aplicant habilitats de cooperació, coordinació, emprenedoria i tècniques de treball pròpies de la comunitat química (experimentació, indagació, raonament logicomatemàtic, etc.), per reconèixer el paper de la química i predir la influència dels seus avenços en una societat basada en valors ètics i sostenibles.",
      "criteris": {
        "1r": [
          "5.1 Participar de manera activa en la construcció del coneixement científic, evidenciant la presència de la interacció, la cooperació i l’avaluació entre iguals, millorant la capacitat de qüestionament, la reflexió i el debat en’ assolir el consens en la resolució d’un problema o d’una situació d’aprenentatge.",
          "5.2 Construir i produir coneixements per mitjà del treball col·lectiu, a més d’explorar alternatives per superar l’assimilació de coneixements ja elaborats i trobant moments per a l’anàlisi, la discussió i la síntesi, obtenint com a resultat l’elaboració de productes representats en informes, pòsters, presentacions, articles, etc.",
          "5.3 Debatre, de manera informada i argumentada, sobre les diferents qüestions mediambientals, socials i ètiques relacionades amb el desenvolupament de les ciències, aconseguint un consens sobre les conseqüències d’aquests avenços i proposant solucions creatives en comú a les qüestions plantejades."
        ],
        "2n": [
          "5.1 Reconèixer la important contribució a la química del treball col·laboratiu entre especialistes de diferents disciplines científiques posant en relleu les connexions entre les lleis i les teories pròpies de cada disciplina.",
          "5.2 Reconèixer l’aportació de la química al desenvolupament del pensament científic i a l’autonomia de pensament crític a través de la posada en pràctica de les metodologies de treball pròpies de les disciplines científiques.",
          "5.3 Valorar les aportacions de la física a la societat, debatent de manera fonamentada sobre el seu impacte des del punt de vista de l’ètica i de la sostenibilitat, i reflexionant sobre les causes i les conseqüències dels biaixos de gènere en les ciències.",
          "5.4 Resoldre problemes relacionats amb la química i estudiar situacions relacionades amb aquesta ciència, reconeixent la importància de la contribució particular de cada membre de l’equip i la diversitat de pensament, i consolidant habilitats socials positives en els equips de treball.",
          "5.5 Representar i visualitzar de forma eficient els conceptes de química que presentin més dificultats utilitzant eines digitals i recursos variats, incloent-hi experiències de laboratori real i virtual."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Construir coneixement químic de forma activa, col·lectiva i evolutiva a partir de situacions de l’entorn proper o global, i argumentar el caràcter multidisciplinari i versàtil de la química i les seves relacions amb altres camps de coneixement per actuar com a agents crítics en l’anàlisi i la difusió d’informació i promoure una societat igualitària, saludable i sostenible",
      "description": "Construir coneixement químic de forma activa, col·lectiva i evolutiva a partir de situacions de l’entorn proper o global, i argumentar el caràcter multidisciplinari i versàtil de la química i les seves relacions amb altres camps de coneixement per actuar com a agents crítics en l’anàlisi i la difusió d’informació i promoure una societat igualitària, saludable i sostenible.",
      "criteris": {
        "1r": [
          "6.1 Identificar i argumentar científicament les repercussions de les accions que l’alumne o alumna emprèn en la seva vida quotidiana, i analitzar com millorar- les com a forma de participar activament en la construcció d’una societat millor.",
          "6.2 Detectar les necessitats de la societat sobre les quals aplicar els coneixements científics adequats que ajudin a millorar- la, incidint especialment en aspectes importants com ara el desenvolupament sostenible i la preservació de la salut."
        ],
        "2n": [
          "6.1 Explicar i raonar els conceptes fonamentals que es troben a la base de la química aplicant els conceptes, les lleis i les teories d’altres disciplines científiques (especialment de la física) per mitjà de l’experimentació i la indagació.",
          "6.2 Deduir les idees fonamentals d’altres disciplines científiques (per exemple, la biologia o la tecnologia) per mitjà de la relació entre els seus continguts bàsics i les lleis i teories que són pròpies de la química.",
          "6.3 Solucionar problemes i qüestions que són característics de la química utilitzant les eines proveïdes per les matemàtiques i la tecnologia, reconeixent així la relació entre els fenòmens experimentals i naturals i conceptes propis d’aquesta disciplina."
        ]
      }
    }
  ]
},
  "Tecnologia i Enginyeria": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Analitzar, coordinar i dissenyar projectes de recerca amb una actitud crítica i emprenedora, ideant i implementant estratègies i tècniques sostenibles i eficients de resolució de problemes, tot comunicant els resultats de manera ordenada i raonada, per crear i millorar productes i sistemes de manera continuada",
      "description": "Analitzar, coordinar i dissenyar projectes de recerca amb una actitud crítica i emprenedora, ideant i implementant estratègies i tècniques sostenibles i eficients de resolució de problemes, tot comunicant els resultats de manera ordenada i raonada, per crear i millorar productes i sistemes de manera continuada.",
      "criteris": {
        "1r": [
          "1.1 Investigar i dissenyar projectes tècnics que mostrin la creació i millora d’un producte o sistema, argumentant-ho mitjançant la interpretació i la referenciació d’informació.",
          "1.2 Participar en el desenvolupament i la coordinació de projectes de creació i innovació contínua de productes viables i socialment responsables, identificant millores i creant prototips mitjançant un procés iteratiu, amb una actitud emprenedora.",
          "1.3 Col·laborar en les tasques tecnològiques, mostrant una actitud proactiva i de respecte cap a les aportacions i raonaments duts a terme per tots els membres del grup, fomentant la cooperació i el benestar grupal.",
          "1.4 Elaborar la documentació tècnica, de manera precisa i acurada, que inclogui la informació més significativa de caràcter textual, numèrica i gràfica tot utilitzant aplicacions digitals.",
          "1.5 Comunicar de manera eficaç i organitzada les idees i solucions tecnològiques, emprant el suport, la terminologia i el rigor apropiats."
        ],
        "2n": [
          "1.1 Desenvolupar projectes de recerca i innovació amb la finalitat de crear i millorar productes de manera continuada i sostenible, utilitzant models de gestió cooperatius i flexibles.",
          "1.2 Comunicar, argumentar i difondre de manera clara, ordenada i comprensible el projecte elaborat, presentant la documentació tècnica tot utilitzant aplicacions digitals.",
          "1.3 Perseverar en la consecució d’objectius en situacions d’incertesa, identificant i gestionant emocions, acceptant i aprenent de la crítica raonada i fent servir l’error com a part del procés d’aprenentatge."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Comparar i seleccionar materials, aplicant criteris tècnics i sostenibles, per fabricar productes de qualitat i elaborar estudis d’impacte que aportin respostes a problemes o a situacions plantejades amb un enfocament ètic i ecosocialment responsable",
      "description": "Comparar i seleccionar materials, aplicant criteris tècnics i sostenibles, per fabricar productes de qualitat i elaborar estudis d’impacte que aportin respostes a problemes o a situacions plantejades amb un enfocament ètic i ecosocialment responsable.",
      "criteris": {
        "1r": [
          "2.1 Determinar el cicle de vida d’un producte, planificant i aplicant mesures de control de qualitat en les diferents etapes, des del disseny fins a la comercialització, tenint en consideració estratègies de millora continuada.",
          "2.2 Comparar i seleccionar materials, tradicionals o de nova generació, per a la fabricació de productes de qualitat basant-se en les característiques tècniques i atenent els criteris de sostenibilitat de manera responsable i ètica.",
          "2.3 Fabricar models o prototips emprant les tècniques de fabricació més adients, aplicant-hi criteris tècnics i sostenibles."
        ],
        "2n": [
          "2.1 Analitzar i valorar la idoneïtat dels materials tècnics en la fabricació de productes sostenibles i de qualitat, tot estudiant l’estructura interna, les propietats i els tractaments de modificació i millora de les seves propietats.",
          "2.2 Elaborar, argumentar i difondre informes tècnics d’avaluació de l’impacte ambiental que valori les repercussions que es poden derivar de la implementació d’un projecte tècnic."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Seleccionar, utilitzar i configurar les eines digitals necessàries, aplicant coneixements interdisciplinaris, per resoldre tasques i comunicar els resultats de manera ordenada i precisa, amb l’ús acurat del llenguatge gràfic i la terminologia tècnica adequada",
      "description": "Seleccionar, utilitzar i configurar les eines digitals necessàries, aplicant coneixements interdisciplinaris, per resoldre tasques i comunicar els resultats de manera ordenada i precisa, amb l’ús acurat del llenguatge gràfic i la terminologia tècnica adequada.",
      "criteris": {
        "1r": [
          "3.1 Resoldre amb autonomia i de manera òptima tasques i funcions proposades, mitjançant l’ús i la configuració de diferents eines digitals, tot aplicant coneixements interdisciplinaris.",
          "3.2 Efectuar la presentació de projectes tècnics, argumentant les decisions preses, tot emprant les aplicacions digitals més adients per a cada situació."
        ],
        "2n": [
          "3.1 Resoldre els problemes associats a les diferents fases del desenvolupament i de la gestió d’un projecte tècnic (disseny, simulació, muntatge i presentació), utilitzant les eines i les aplicacions digitals adients."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Construir nous coneixements i millorar les destreses tècniques, aplicant i transferint sabers d’altres disciplines amb una actitud creativa, per calcular, mesurar i resoldre problemes o aportar respostes a diferents necessitats pròpies dels àmbits de l’enginyeria",
      "description": "Construir nous coneixements i millorar les destreses tècniques, aplicant i transferint sabers d’altres disciplines amb una actitud creativa, per calcular, mesurar i resoldre problemes o aportar respostes a diferents necessitats pròpies dels àmbits de l’enginyeria.",
      "criteris": {
        "1r": [
          "4.1 Experimentar, mesurar, interpretar i resoldre problemes associats a sistemes d’instal·lacions mecàniques aplicant els fonaments de mecanismes de transmissió i transformació del moviment.",
          "4.2 Experimentar, mesurar, interpretar i resoldre problemes associats als sistemes mecànics de suport i d’unió fixos i mòbils.",
          "4.3 Experimentar, mesurar, interpretar i resoldre problemes associats a sistemes de circuits electrònics i d’instal·lacions elèctriques, tot aplicant els fonaments dels circuits de corrent continu, així com de les màquines elèctriques rotatives."
        ],
        "2n": [
          "4.1 Calcular, simular i experimentar amb estructures senzilles, analitzant i valorant els tipus de càrregues a les quals es puguin veure sotmeses, tot avaluant-ne els esforços i l’estabilitat.",
          "4.2 Analitzar i comparar les diferents màquines tèrmiques: màquines frigorífiques, bombes de calor i motors tèrmics, diferenciant-ne i interpretant-ne el funcionament i duent a terme els càlculs essencials per poder-ne determinar l’eficiència.",
          "4.3 Interpretar, dissenyar, simular o construir circuits pneumàtics d’automatització, relacionant cadascun dels elements del circuit en el funcionament del sistema.",
          "4.4 Interpretar, dissenyar i simular circuits oleohidràulics, relacionant cadascun dels elements del circuit amb el funcionament del sistema.",
          "4.5 Experimentar i dissenyar circuits combinacionals i seqüencials físics i simulats aplicant fonaments de l’electrònica digital i explicant-ne el funcionament en el disseny de solucions tecnològiques."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Dissenyar, crear i avaluar sistemes tecnològics aplicant coneixements de la regulació automàtica, del control programat i de les possibilitats que ofereixen les tecnologies emergents, per estudiar, controlar i automatitzar tasques en sistemes tecnològics i robòtics",
      "description": "Dissenyar, crear i avaluar sistemes tecnològics aplicant coneixements de la regulació automàtica, del control programat i de les possibilitats que ofereixen les tecnologies emergents, per estudiar, controlar i automatitzar tasques en sistemes tecnològics i robòtics.",
      "criteris": {
        "1r": [
          "5.1 Controlar i experimentar el funcionament de sistemes tecnològics i robòtics, utilitzant llenguatges de programació i aplicant les possibilitats que ofereixen les tecnologies emergents, com ara la intel·ligència artificial, la telemetria, la internet de les coses, el tractament massiu de dades (big data), etc.",
          "5.2 Automatitzar, programar i experimentar funcionalitats i trajectòries de robots, mitjançant la seva modelització i aplicant algorismes senzills."
        ],
        "2n": [
          "5.1 Interpretar, simular i experimentar el funcionament dels processos tecnològics basats en sistemes automàtics de llaç obert i llaç tancat, aplicant tècniques de simplificació i analitzant-ne l’estabilitat."
        ]
      }
    },
    {
      "id": "CE6",
      "title": "Identificar i analitzar els diferents sistemes tecnològics dels àmbits de l’enginyeria, estudiant i comparant les seves característiques, tot valorant l’ús de l’energia i l’eficiència energètica per avaluar i valorar l’ús sostenible i ecosocialment responsable que es fa de la tecnologia",
      "description": "Identificar i analitzar els diferents sistemes tecnològics dels àmbits de l’enginyeria, estudiant i comparant les seves característiques, tot valorant l’ús de l’energia i l’eficiència energètica per avaluar i valorar l’ús sostenible i ecosocialment responsable que es fa de la tecnologia.",
      "criteris": {
        "1r": [
          "6.1 Analitzar i avaluar els diferents sistemes de generació i distribució d’energia elèctrica i les característiques dels mercats energètics, desenvolupant els càlculs necessaris per determinar-ne i valorar-ne l’eficiència i l’impacte ambiental, social i econòmic."
        ],
        "2n": [
          "6.1 Analitzar les diferents instal·lacions d’un habitatge des del punt de vista de l’eficiència energètica, cercant aquelles opcions més compromeses amb la sostenibilitat i aplicant solucions basades en baixos requeriments energètics i energies renovables."
        ]
      }
    }
  ]
},
  "Economia, Emprenedoria i Activitat Empresarial": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Analitzar i reflexionar sobre les aportacions de la ciència econòmica i la interrelació amb altres disciplines, de manera crítica, per entendre la realitat del món des d’una visió integral i actuar com a ciutadans responsables, autònoms i compromesos",
      "description": "Analitzar i reflexionar sobre les aportacions de la ciència econòmica i la interrelació amb altres disciplines, de manera crítica, per entendre la realitat del món des d’una visió integral i actuar com a ciutadans responsables, autònoms i compromesos.",
      "criteris": [
        "1.1 Incorporar les aportacions de la ciència econòmica i d’altres disciplines interrelacionades per fer propostes de resolució a reptes del món global com a ciutadà responsable, autònom i compromès.",
        "1.2 Utilitzar models de la ciència econòmica per a l’anàlisi de la realitat, sent conscients de les seves limitacions.",
        "1.3 Caracteritzar les funcions dels diferents agents en el sistema econòmic de mercat, mostrant-ne les interrelacions."
      ]
    },
    {
      "id": "CE2",
      "title": "Contrastar la presa de decisions econòmiques, individuals i col·lectives, amb un enfocament interdisciplinari, reflexionant sobre el problema de l’escassetat i els seus efectes, per comprendre els canvis econòmics i socials que se’n deriven i actuar en conseqüència",
      "description": "Contrastar la presa de decisions econòmiques, individuals i col·lectives, amb un enfocament interdisciplinari, reflexionant sobre el problema de l’escassetat i els seus efectes, per comprendre els canvis econòmics i socials que se’n deriven i actuar en conseqüència.",
      "criteris": [
        "2.1 Identificar els rols que assumeixen els diferents agents en el sistema econòmic, la interdependència de les seves decisions i els efectes en el medi ambient.",
        "2.2 Reflexionar i posicionar-se sobre les desigualtats que l’escassetat genera en l’accés als recursos i en la distribució de la riquesa al món."
      ]
    },
    {
      "id": "CE3",
      "title": "Relacionar els objectius de desenvolupament sostenible amb el desenvolupament econòmic i social, emprant eines econòmiques i empresarials, per donar resposta als reptes actuals com a ciutadà responsable i proactiu",
      "description": "Relacionar els objectius de desenvolupament sostenible amb el desenvolupament econòmic i social, emprant eines econòmiques i empresarials, per donar resposta als reptes actuals com a ciutadà responsable i proactiu.",
      "criteris": [
        "3.1 Relacionar casos reals amb els objectius de desenvolupament sostenible proposant solucions solidàries i responsables.",
        "3.2 Prendre consciència dels problemes mundials analitzant-los mitjançant eines econòmiques i empresarials."
      ]
    },
    {
      "id": "CE4",
      "title": "Identificar i valorar les habilitats i les competències emprenedores, així com la forma d’afrontar reptes, analitzant el perfil de l’emprenedor actual, per aplicarles a situacions reals de la vida",
      "description": "Identificar i valorar les habilitats i les competències emprenedores, així com la forma d’afrontar reptes, analitzant el perfil de l’emprenedor actual, per aplicarles a situacions reals de la vida.",
      "criteris": [
        "4.1 Reconèixer i valorar habilitats i competències de persones emprenedores reals, per potenciar les pròpies.",
        "4.2 Aplicar destreses emprenedores per afrontar reptes de la vida quotidiana."
      ]
    },
    {
      "id": "CE5",
      "title": "Interpretar les estratègies empresarials i els nous models de negoci de diferents àmbits i sectors, per reconèixer i valorar, amb sentit crític, l’activitat de l’empresa a la societat actual",
      "description": "Interpretar les estratègies empresarials i els nous models de negoci de diferents àmbits i sectors, per reconèixer i valorar, amb sentit crític, l’activitat de l’empresa a la societat actual.",
      "criteris": [
        "5.1 Analitzar, amb esperit crític, l’evolució de les estratègies empresarials així com els models de negoci posant en valor la seva contribució a la societat.",
        "5.2 Comparar models de negoci de diferents àmbits i sectors, analitzant-ne les possibilitats i les limitacions en el mercat."
      ]
    },
    {
      "id": "CE6",
      "title": "Reconèixer la importància de la innovació i la revolució digital en l’activitat empresarial, analitzant la transformació econòmica i social, per interpretar i valorar les respostes de les empreses en una economia globalitzada",
      "description": "Reconèixer la importància de la innovació i la revolució digital en l’activitat empresarial, analitzant la transformació econòmica i social, per interpretar i valorar les respostes de les empreses en una economia globalitzada.",
      "criteris": [
        "6.1 Comprendre les respostes que ofereixen les empreses als desafiaments actuals, analitzant la transformació econòmica i social que està experimentant la societat.",
        "6.2 Proposar solucions emprenedores sostenibles, reconeixent la importància de la innovació i la revolució digital en un món globalitzat."
      ]
    }
  ]
},
  "Moviments Culturals i Artístics": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Analitzar produccions de diferents moviments culturals i artístics i de contextos socials i històrics diversos, identificant-ne els aspectes singulars, per descobrir-los, sense prejudicis, com a representatius de l’esperit d’una època",
      "description": "Analitzar produccions de diferents moviments culturals i artístics i de contextos socials i històrics diversos, identificant-ne els aspectes singulars, per descobrir-los, sense prejudicis, com a representatius de l’esperit d’una època.",
      "criteris": [
        "1.1 Especificar els aspectes singulars de diferents produccions culturals i artístiques, relacionant-los amb els seus contextos històrics, de manera oberta i sense prejudicis.",
        "1.2 Descobrir els moviments culturals i artístics com a reflexos del sentir i pensar de cada època, establint relacions amb la pròpia identitat cultural."
      ]
    },
    {
      "id": "CE2",
      "title": "Argumentar sobre la importància de la llibertat creativa i expressiva en les produccions culturals i artístiques que formen part del patrimoni per enriquir la pròpia identitat a partir d’aportacions plurals i des d’una perspectiva intercultural",
      "description": "Argumentar sobre la importància de la llibertat creativa i expressiva en les produccions culturals i artístiques que formen part del patrimoni per enriquir la pròpia identitat a partir d’aportacions plurals i des d’una perspectiva intercultural.",
      "criteris": [
        "2.1 Dur a terme accions per difondre i conservar el patrimoni com a bé compartit i com a element essencial per al desenvolupament de les persones i de les societats des d’una perspectiva intercultural.",
        "2.2 Aportar arguments raonats sobre la importància de la llibertat creativa i expressiva i mostrar compromís en processos de creació."
      ]
    },
    {
      "id": "CE3",
      "title": "Fer recerca sobre els llenguatges, codis i tècniques de diferents manifestacions culturals i artístiques, a partir de la indagació i la participació activa, per comprendre’n les especificitats i intencionalitats i descobrir possibles relacions i referents comuns",
      "description": "Fer recerca sobre els llenguatges, codis i tècniques de diferents manifestacions culturals i artístiques, a partir de la indagació i la participació activa, per comprendre’n les especificitats i intencionalitats i descobrir possibles relacions i referents comuns.",
      "criteris": [
        "3.1 Dur a terme indagacions sobre diferents llenguatges, codis i tècniques i sobre els valors artístics de diferents propostes a partir de l’anàlisi de la seva especificitat i de la participació activa.",
        "3.2 Analitzar les intencionalitats de diferents manifestacions culturals i artístiques, considerant i respectant la presència de referents comuns una font de riquesa social i personal."
      ]
    },
    {
      "id": "CE4",
      "title": "Interpretar l’evolució dels moviments culturals i artístics de la història recent per reconèixer la implicació social dels i de les artistes, apreciar les tecnologies digitals com a motors creatius i desenvolupar la sensibilitat artística i el gaudi estètic",
      "description": "Interpretar l’evolució dels moviments culturals i artístics de la història recent per reconèixer la implicació social dels i de les artistes, apreciar les tecnologies digitals com a motors creatius i desenvolupar la sensibilitat artística i el gaudi estètic.",
      "criteris": [
        "4.1 Valorar la influència que els nous llenguatges, mitjans i tècniques han tingut en la cultura i l’art i apreciar l’actitud innovadora de les i dels artistes.",
        "4.2 Interpretar la repercussió i el compromís social de l’art i de la cultura, mostrar sensibilitat, empatia i respecte per la implicació creativa i valorar les tecnologies digitals com a mitjans creatius de les persones i dels col·lectius en un món global."
      ]
    },
    {
      "id": "CE5",
      "title": "Participar en pràctiques culturals i artístiques com a mitjans per expressar idees, sentiments i emocions, a través de l’observació i l’exploració actives, per establir nous vincles afectius amb l’entorn, mostrar empatia i respecte per les creacions alienes i progressar en el creixement personal",
      "description": "Participar en pràctiques culturals i artístiques com a mitjans per expressar idees, sentiments i emocions, a través de l’observació i l’exploració actives, per establir nous vincles afectius amb l’entorn, mostrar empatia i respecte per les creacions alienes i progressar en el creixement personal.",
      "criteris": [
        "5.1 Experimentar amb interès, curiositat i respecte per les creacions alienes diferents pràctiques culturals i artístiques i identificar les seves possibilitats comunicatives i expressives.",
        "5.2 Interpretar la pràctica creativa com un mitjà per expressar idees, sentiments i emocions, exterioritzar sensacions i establir connexions personals i vincles afectius amb manifestacions culturals i artístiques contemporànies de l’entorn."
      ]
    },
    {
      "id": "CE6",
      "title": "Analitzar els processos, fenòmens i produccions artístics i culturals des la perspectiva de gènere, per mitjà d’una aproximació oberta i integradora, per comprometre’s en la igualtat d’oportunitats i rebutjar qualsevol forma de discriminació i violència",
      "description": "Analitzar els processos, fenòmens i produccions artístics i culturals des la perspectiva de gènere, per mitjà d’una aproximació oberta i integradora, per comprometre’s en la igualtat d’oportunitats i rebutjar qualsevol forma de discriminació i violència.",
      "criteris": [
        "6.1 Identificar les causes que han relegat les dones a un rol secundari en el món de la cultura i de les arts i emprendre accions per valorar, dignificar i visibilitzar les aportacions plurals com a font de riquesa per a tothom.",
        "6.2 Adoptar un paper actiu i compromès amb l’entorn perquè les persones puguin desenvolupar les seves aspiracions, superant estereotips i prejudicis i rebutjant qualsevol forma de discriminació i violència."
      ]
    },
    {
      "id": "CE7",
      "title": "Dur a terme produccions culturals i artístiques col·laboratives amb diferents mitjans, suports i tècniques, integrant-los amb creativitat i aportant solucions personals, per generar respostes creatives davant de problemàtiques socials actuals",
      "description": "Dur a terme produccions culturals i artístiques col·laboratives amb diferents mitjans, suports i tècniques, integrant-los amb creativitat i aportant solucions personals, per generar respostes creatives davant de problemàtiques socials actuals.",
      "criteris": [
        "7.1 Idear solucions creatives a possibles reptes professionals vinculats a la cultura, aportant una visió personal i partint d’uns objectius compromesos i inclusius amb la societat.",
        "7.2 Crear produccions culturals i artístiques, de manera col·laborativa, seleccionant i integrant diferents mitjans i suports, valorar tant el procés expressiu individual com compartit i preservar els drets d’autoria."
      ]
    },
    {
      "id": "CE8",
      "title": "Expressar idees pròpies sobre manifestacions i esdeveniments culturals i artístics amb arguments i sensibilitat estètica, debatre de forma respectuosa i constructiva sobre qüestions culturals i artístiques i la seva repercussió social",
      "description": "Expressar idees pròpies sobre manifestacions i esdeveniments culturals i artístics amb arguments i sensibilitat estètica, debatre de forma respectuosa i constructiva sobre qüestions culturals i artístiques i la seva repercussió social.",
      "criteris": [
        "8.1 Argumentar la repercussió social de diferents manifestacions culturals i artístiques, valorant-les i relacionant-les amb les oportunitats personals i col·lectives que ofereixen.",
        "8.2 Expressar idees pròpies sobre manifestacions culturals i artístiques i fer valoracions estètiques des d’una actitud respectuosa i constructiva."
      ]
    }
  ]
},
  "Funcionament de l’Empresa i Disseny de Models de Negoci": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Reconèixer la importància que l’activitat empresarial i l’emprenedoria tenen en la transformació de la societat, analitzant el valor de la innovació i la digitalització, per comprendre el funcionament de l’economia globalitzada",
      "description": "Reconèixer la importància que l’activitat empresarial i l’emprenedoria tenen en la transformació de la societat, analitzant el valor de la innovació i la digitalització, per comprendre el funcionament de l’economia globalitzada.",
      "criteris": [
        "1.1 Valorar el paper de l’empresa i l’empresariat com a agents econòmics generadors de rendes i benestar en la societat, per comprendre el funcionament del sistema econòmic.",
        "1.2 Identificar l’impacte que l’activitat empresarial i emprenedora genera en la transformació de la societat, cap al bé comú.",
        "1.3 Analitzar empreses i organitzacions que posen en valor la innovació i la digitalització en l’entorn canviant."
      ]
    },
    {
      "id": "CE2",
      "title": "Conèixer l’entorn econòmic i social i la seva influència en l’activitat empresarial, analitzant amb sentit crític la sostenibilitat i la responsabilitat social en l’activitat productiva i en l’ètica empresarial",
      "description": "Conèixer l’entorn econòmic i social i la seva influència en l’activitat empresarial, analitzant amb sentit crític la sostenibilitat i la responsabilitat social en l’activitat productiva i en l’ètica empresarial.",
      "criteris": [
        "2.1 Valorar la capacitat d’adaptació de les empreses a l’entorn microeconòmic i macroeconòmic, donant respostes sostenibles, solidàries, viables i respectuoses amb el medi ambient.",
        "2.2 Identificar les característiques de l’entorn on l’empresa desenvolupa la seva activitat, analitzant les diferents estratègies i decisions adoptades i les possibles implicacions socials i mediambientals de la seva activitat.",
        "2.3 Conèixer els tipus, els elements i les funcions de les empreses, relacionant amb cadascuna les responsabilitats legals, i seleccionar la més adient al cas proposat."
      ]
    },
    {
      "id": "CE3",
      "title": "Comparar diferents models de negoci analitzant les decisions estratègiques de planificació, gestió i optimització d’activitats, recursos i associacions, per dissenyar, amb creativitat i esperit transformador, un model de negoci innovador que respongui a les necessitats de la societat",
      "description": "Comparar diferents models de negoci analitzant les decisions estratègiques de planificació, gestió i optimització d’activitats, recursos i associacions, per dissenyar, amb creativitat i esperit transformador, un model de negoci innovador que respongui a les necessitats de la societat.",
      "criteris": [
        "3.1 Investigar el mercat, les tendències clau del moment i la situació macroeconòmica com a punt de partida per proposar idees emprenedores.",
        "3.2 Utilitzar estratègies i eines per dissenyar, amb iniciativa i creativitat, un model de negoci innovador a partir d’una proposta de valor.",
        "3.3 Desenvolupar idees emprenedores analitzant decisions estratègiques de planificació, gestió i optimització d’activitats, recursos i associacions, per contribuir al benestar econòmic i social."
      ]
    },
    {
      "id": "CE4",
      "title": "Seleccionar i aplicar estratègies comunicatives eficaces aplicades al món empresarial, gestionant la informació i verificant-ne la fiabilitat, per prendre decisions empresarials en un mercat global",
      "description": "Seleccionar i aplicar estratègies comunicatives eficaces aplicades al món empresarial, gestionant la informació i verificant-ne la fiabilitat, per prendre decisions empresarials en un mercat global.",
      "criteris": [
        "4.1 Utilitzar noves fórmules comunicatives i de gestió de la informació, que facilitin la presa de decisions aplicades al món empresarial.",
        "4.2 Exposar el model de negoci utilitzant eines de comunicació efectiva amb originalitat i iniciativa, per ressaltar la creació de valor i l’interès dels altres."
      ]
    },
    {
      "id": "CE5",
      "title": "Dissenyar i validar projectes empresarials, emprant els recursos necessaris, per organitzar i gestionar el desenvolupament del model de negoci",
      "description": "Dissenyar i validar projectes empresarials, emprant els recursos necessaris, per organitzar i gestionar el desenvolupament del model de negoci.",
      "criteris": [
        "5.1 Elaborar un pla d’empresa de manera col·laborativa, justificant les decisions preses.",
        "5.2 Identificar les dades més rellevants del balanç i del compte de pèrdues i guanys, explicant-ne el significat i diagnosticant la situació.",
        "5.3 Analitzar les diferents viabilitats del model de negoci dissenyat, per avaluar-ne el potencial, proposant idees de millora."
      ]
    }
  ]
},
  "Economia": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Prendre consciència de la importància de prendre decisions a escala econòmica, comparant els sistemes econòmics i reflexionant sobre la interdependència dels factors i dels agents econòmics, valorant els processos d’integració econòmica per intervenir en la realitat econòmica actual",
      "description": "Prendre consciència de la importància de prendre decisions a escala econòmica, comparant els sistemes econòmics i reflexionant sobre la interdependència dels factors i dels agents econòmics, valorant els processos d’integració econòmica per intervenir en la realitat econòmica actual.",
      "criteris": [
        "1.1 Interpretar la realitat econòmica prenent consciència de la importància de prendre decisions econòmiques i de les seves repercussions, segons els diferents sistemes econòmics.",
        "1.2 Identificar l’escassetat com a problema bàsic de l’economia determinant el comportament i les interrelacions dels agents econòmics, i valorar les diferents estratègies econòmiques per resoldre’l.",
        "1.3 Analitzar els processos de presa de decisions econòmiques, tant individuals com col·lectives, i l’impacte que tenen en la societat."
      ]
    },
    {
      "id": "CE2",
      "title": "Analitzar el funcionament de mercat, utilitzant i valorant els models per a l’anàlisi de la realitat econòmica, per prendre decisions en l’àmbit microeconòmic",
      "description": "Analitzar el funcionament de mercat, utilitzant i valorant els models per a l’anàlisi de la realitat econòmica, per prendre decisions en l’àmbit microeconòmic.",
      "criteris": [
        "2.1 Analitzar les fallades de mercat i identificar mesures de correcció, amb esperit crític, proposant-ne solucions.",
        "2.2 Utilitzar els models econòmics per comprendre el funcionament del mercat i els seus elements, per actuar com a ciutadans formats i informats.",
        "2.3 Valorar l’estat del benestar i les polítiques econòmiques com a font de millora econòmica i social."
      ]
    },
    {
      "id": "CE3",
      "title": "Interpretar les interrelacions que es produeixen entre els agents econòmics en el flux circular de la renda, valorant-ne els beneficis i els costos que provoquen, per contribuir a un desenvolupament econòmic sostenible i al benestar de la societat",
      "description": "Interpretar les interrelacions que es produeixen entre els agents econòmics en el flux circular de la renda, valorant-ne els beneficis i els costos que provoquen, per contribuir a un desenvolupament econòmic sostenible i al benestar de la societat.",
      "criteris": [
        "3.1 Analitzar les funcions i les interrelacions dels diferents agents en el flux circular de la renda determinant-ne la repercussió en el desenvolupament econòmic.",
        "3.2 Valorar-ne la contribució al desenvolupament sostenible i al benestar social."
      ]
    },
    {
      "id": "CE4",
      "title": "Comprendre i valorar el funcionament del sistema financer, comparant diverses fonts de finançament, valorant-ne els efectes sobre l’economia real, per planificar i gestionar les pròpies finances com a ciutadans responsables",
      "description": "Comprendre i valorar el funcionament del sistema financer, comparant diverses fonts de finançament, valorant-ne els efectes sobre l’economia real, per planificar i gestionar les pròpies finances com a ciutadans responsables.",
      "criteris": [
        "4.1 Comprendre el funcionament del sistema financer en l’economia real, analitzant els elements que hi intervenen.",
        "4.2 Identificar diferents fonts de finançament per prendre decisions financeres fonamentades.",
        "4.3 Aplicar els coneixements financers adquirits per planificar i gestionar amb responsabilitat i autonomia les finances personals."
      ]
    },
    {
      "id": "CE5",
      "title": "Identificar i valorar els reptes i els desafiaments de l’economia actual, analitzant críticament la globalització, la nova economia i la revolució digital, per proposar iniciatives que fomentin l’equitat, la justícia i la sostenibilitat",
      "description": "Identificar i valorar els reptes i els desafiaments de l’economia actual, analitzant críticament la globalització, la nova economia i la revolució digital, per proposar iniciatives que fomentin l’equitat, la justícia i la sostenibilitat.",
      "criteris": [
        "5.1 Identificar els reptes que planteja l’economia analitzant, amb sentit crític, l’impacte que provoca la globalització, la nova economia i la revolució digital al benestar econòmic i social dels ciutadans.",
        "5.2 Argumentar, de manera crítica i constructiva, per proposar iniciatives que fomentin l’equitat, la justícia i la sostenibilitat a partir dels desafiaments de l’economia actual."
      ]
    },
    {
      "id": "CE6",
      "title": "Analitzar els problemes econòmics actuals, utilitzant diverses fonts d’informació, tècniques de l’anàlisi econòmica i procediments de recerca, per plantejar solucions innovadores i sostenibles que responguin a necessitats individuals i col·lectives",
      "description": "Analitzar els problemes econòmics actuals, utilitzant diverses fonts d’informació, tècniques de l’anàlisi econòmica i procediments de recerca, per plantejar solucions innovadores i sostenibles que responguin a necessitats individuals i col·lectives.",
      "criteris": [
        "6.1 Utilitzar procediments de recerca i tècniques d’anàlisi econòmica, seleccionant i emprant fonts diverses d’informació, per plantejar solucions innovadores i sostenibles als problemes de la societat actual.",
        "6.2 Comprendre els factors psicològics, socials, cognitius, emocionals i mediambientals que condicionen les decisions dels agents econòmics que responguin a necessitats individuals i col·lectives."
      ]
    }
  ]
},
  "Geografia": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Cercar, seleccionar i combinar informació sobre els reptes ecosocials actuals de l’Estat espanyol, comparant fonts i analitzant-ne el nivell de fiabilitat, per desenvolupar el pensament crític i posicionar-se a favor dels objectius de desenvolupament sostenible",
      "description": "Cercar, seleccionar i combinar informació sobre els reptes ecosocials actuals de l’Estat espanyol, comparant fonts i analitzant-ne el nivell de fiabilitat, per desenvolupar el pensament crític i posicionar-se a favor dels objectius de desenvolupament sostenible.",
      "criteris": [
        "1.1 Qüestionar maneres de vida insostenibles i socialment injustes mitjançant la cerca i l’anàlisi geogràfica de tota mena de fonts d’informació que tractin els reptes ecosocials presents i futurs des d’arguments basats en dades analitzades.",
        "1.2 Aportar arguments a favor de la sostenibilitat i la justícia social a Espanya, utilitzant suport digital de gràfics, imatges i cartografia per presentar en públic dades rigoroses de manera eficient."
      ]
    },
    {
      "id": "CE2",
      "title": "Descobrir i analitzar la complexitat de l’espai geogràfic català, amb els elements i dinàmiques que el configuren, per valorar els diferents paisatges rurals i urbans i proposar alternatives de gestió territorial, amb criteris de sostenibilitat, equilibri i dinamisme econòmic",
      "description": "Descobrir i analitzar la complexitat de l’espai geogràfic català, amb els elements i dinàmiques que el configuren, per valorar els diferents paisatges rurals i urbans i proposar alternatives de gestió territorial, amb criteris de sostenibilitat, equilibri i dinamisme econòmic.",
      "criteris": [
        "2.1 Trobar i transmetre els valors dels diferents paisatges rurals i urbans de Catalunya reconeixent la complexitat sistèmica del medi natural i de les activitats humanes.",
        "2.2 Proposar alternatives de gestió territorial, amb criteris de sostenibilitat i dinamisme econòmic, a partir de l’anàlisi del territori."
      ]
    },
    {
      "id": "CE3",
      "title": "Identificar i caracteritzar els medis naturals catalans i espanyols, relacionantlos amb els europeus i mundials, i amb els paisatges a què han donat lloc, per valorar-ne el grau de preservació i d’equilibri ecològic",
      "description": "Identificar i caracteritzar els medis naturals catalans i espanyols, relacionantlos amb els europeus i mundials, i amb els paisatges a què han donat lloc, per valorar-ne el grau de preservació i d’equilibri ecològic.",
      "criteris": [
        "3.1 Identificar i explicar els elements físics de Catalunya i Espanya, localitzant i reconeixent en mapes regions geomorfològiques i bioclimàtiques amb característiques comunes i específiques.",
        "3.2 Relacionar els elements físics i l’acció antròpica en la configuració dels paisatges a diferents escales, discutint i valorant-ne el grau d’explotació, les potencialitats i els riscos."
      ]
    },
    {
      "id": "CE4",
      "title": "Aplicar mètodes i tècniques pròpies de la geografia per localitzar i interpretar fenòmens territorials i les seves interrelacions, plantejar investigacions, fer propostes d’actuacions i comunicar els resultats emprant el vocabulari pertinent",
      "description": "Aplicar mètodes i tècniques pròpies de la geografia per localitzar i interpretar fenòmens territorials i les seves interrelacions, plantejar investigacions, fer propostes d’actuacions i comunicar els resultats emprant el vocabulari pertinent.",
      "criteris": [
        "4.1 Emprar l’escala apropiada per localitzar i analitzar fenòmens territorials, amb el propòsit de dur a terme una recerca o per resoldre una tasca concreta, justificant les dades i els mètodes escollits.",
        "4.2 Crear productes propis individuals o en grup, comunicant diagnòstics, formulant hipòtesis o elaborant conclusions, aplicant eficientment les tecnologies de la informació geogràfica (TIG) i fent ús d’un vocabulari específic i acurat."
      ]
    },
    {
      "id": "CE5",
      "title": "Interpretar la globalització com a context de l’evolució dels sistemes econòmics i els comportaments socials recents, investigant les seves relacions de causa i efecte, per promoure el respecte a la dignitat humana i al medi ambient com a base d’una ciutadania global",
      "description": "Interpretar la globalització com a context de l’evolució dels sistemes econòmics i els comportaments socials recents, investigant les seves relacions de causa i efecte, per promoure el respecte a la dignitat humana i al medi ambient com a base d’una ciutadania global.",
      "criteris": [
        "5.1 Respectar i posicionar-se a favor de la dignitat humana, investigant el sistema de relacions econòmiques globalitzades i els seus efectes territorials sobre els sectors productius, i plantejar solucions raonades.",
        "5.2 Crear productes propis que expressin la necessitat de preservar el medi natural, indagant sobre els impactes de les maneres de producció, distribució i consum a escala local i global, i proposar actuacions de millora."
      ]
    },
    {
      "id": "CE6",
      "title": "Reflexionar críticament sobre la cohesió territorial i les injustícies socials en els àmbits català i espanyol, mitjançant l’anàlisi de la seva diversitat d’estructures socioeconòmiques, demogràfiques i paràmetres de gènere, per fer propostes d’acció amb criteris de solidaritat, compromís i justícia social",
      "description": "Reflexionar críticament sobre la cohesió territorial i les injustícies socials en els àmbits català i espanyol, mitjançant l’anàlisi de la seva diversitat d’estructures socioeconòmiques, demogràfiques i paràmetres de gènere, per fer propostes d’acció amb criteris de solidaritat, compromís i justícia social.",
      "criteris": [
        "6.1 Denunciar les desigualtats individuals i els problemes territorials, identificant-ne l’origen en processos passats i recents d’estructures socioeconòmiques, demogràfiques o paràmetres de gènere, amb un compromís a favor de la solidaritat i la cohesió territorial.",
        "6.2 Proposar solucions a problemes relacionats amb la falta de cohesió territorial, les desigualtats socials i laborals, o per motiu de gènere, que sorgeixin de la reflexió crítica i el coneixement."
      ]
    },
    {
      "id": "CE7",
      "title": "Mobilitzar i valorar coneixements geogràfics per aportar solucions innovadores a contextos en transformació, millorar la vida de les persones i fomentar l’autoaprenentatge permanent",
      "description": "Mobilitzar i valorar coneixements geogràfics per aportar solucions innovadores a contextos en transformació, millorar la vida de les persones i fomentar l’autoaprenentatge permanent.",
      "criteris": [
        "7.1 Aplicar el coneixement geogràfic sobre problemes rellevants en contextos diversos, a diferents escales, revisant críticament coneixements previs i nous.",
        "7.2 Valorar el paper de la geografia en la resolució de problemes territorials, diagnosticant problemes i oportunitats i raonant possibles solucions."
      ]
    }
  ]
},
  "Història de l’Art": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Identificar diferents concepcions de l’art al llarg de la història, seleccionant i analitzant informació diversa de forma crítica, per fer recerques pròpies i valorar la diversitat de manifestacions artístiques com a producte de la creativitat humana, individual i col·lectiva, des del respecte i el reconeixement mutu",
      "description": "Identificar diferents concepcions de l’art al llarg de la història, seleccionant i analitzant informació diversa de forma crítica, per fer recerques pròpies i valorar la diversitat de manifestacions artístiques com a producte de la creativitat humana, individual i col·lectiva, des del respecte i el reconeixement mutu.",
      "criteris": [
        "1.1 Reconèixer i respectar la diversitat de manifestacions artístiques, especialment de la contemporaneïtat, a partir de la recerca i el debat al voltant de les diferents concepcions i definicions de l’art.",
        "1.2 Cercar informació rigorosa i contrastada i tractar-la per identificar i analitzar la varietat de manifestacions, expressions i concepcions."
      ]
    },
    {
      "id": "CE2",
      "title": "Reconèixer els diversos llenguatges artístics com a formes de comunicació i expressió lliure d’idees, desitjos i emocions, per crear produccions pròpies utilitzant la terminologia específica i les eines digitals, mostrant respecte per les opinions i produccions dels altres",
      "description": "Reconèixer els diversos llenguatges artístics com a formes de comunicació i expressió lliure d’idees, desitjos i emocions, per crear produccions pròpies utilitzant la terminologia específica i les eines digitals, mostrant respecte per les opinions i produccions dels altres.",
      "criteris": [
        "2.1 Elaborar productes en què s’expressin de manera raonada, coherent i amb fluïdesa judicis i emocions les obres d’art, utilitzant la terminologia i el vocabulari específic de la matèria.",
        "2.2 Reconèixer algunes pautes i codis propis de llenguatges artístics d’èpoques i cultures diverses i de les formes d’expressió i comunicació amb què es vinculen."
      ]
    },
    {
      "id": "CE3",
      "title": "Distingir les diferents funcions de l’art al llarg de la història, analitzant la dimensió ideològica, política, social, econòmica i estètica de les obres d’art i dels processos de producció i recepció, per formar-se un judici argumentat propi que permeti establir vincles amb el present",
      "description": "Distingir les diferents funcions de l’art al llarg de la història, analitzant la dimensió ideològica, política, social, econòmica i estètica de les obres d’art i dels processos de producció i recepció, per formar-se un judici argumentat propi que permeti establir vincles amb el present.",
      "criteris": [
        "3.1 Demostrar una apreciació complexa i un judici crític i informat de les obres d’art i els processos de producció i recepció artística, mitjançant la distinció i l’anàlisi de les funcions i de les dimensions ideològica, política, social, econòmica, subjectiva i pròpiament estètica.",
        "3.2 Identificar i comprendre la complexitat dels processos de creació artística i de les pròpies obres d’art, analitzant i investigant continuïtats i ruptures amb el present."
      ]
    },
    {
      "id": "CE4",
      "title": "Caracteritzar els principals moviments artístics al llarg de la història, reconeixent relacions d’influència, préstec i ruptura per identificar i comprendre les pervivències i les transformacions en el món actual i analitzar críticament mecanismes d’intercanvi i fenòmens d’aculturació",
      "description": "Caracteritzar els principals moviments artístics al llarg de la història, reconeixent relacions d’influència, préstec i ruptura per identificar i comprendre les pervivències i les transformacions en el món actual i analitzar críticament mecanismes d’intercanvi i fenòmens d’aculturació.",
      "criteris": [
        "4.1 Reconèixer els mecanismes que regeixen l’evolució de la història de l’art a partir de l’anàlisi comparativa d’obres i moviments de diverses èpoques.",
        "4.2 Explicar les relacions d’influència, intercanvi i préstec que es produeixen entre estils, autors i moviments, així com certes pervivències i ruptures en moviments posteriors i en l’actualitat, i alguns fenòmens d’aculturació."
      ]
    },
    {
      "id": "CE5",
      "title": "Identificar i contextualitzar espacialment i temporalment les manifestacions i les personalitats artístiques més rellevants, analitzant l’entorn personal i social, per valorar les obres i l’autoria com a expressió de l’època i de la societat i adoptar una actitud oberta i receptiva davant de formes artístiques de cultures i col·lectius minoritzats",
      "description": "Identificar i contextualitzar espacialment i temporalment les manifestacions i les personalitats artístiques més rellevants, analitzant l’entorn personal i social, per valorar les obres i l’autoria com a expressió de l’època i de la societat i adoptar una actitud oberta i receptiva davant de formes artístiques de cultures i col·lectius minoritzats.",
      "criteris": [
        "5.1 Valorar i respectar diverses obres i formes de creació i manifestació artística, especialment les que han estat marginades i minoritzades, i apreciar-ne la creativitat i la contribució social i cultural.",
        "5.2 Analitzar el paper dels artistes, individualment i col·lectivament, en el procés creador mitjançant la recerca sobre el context històric, les circumstàncies personals, les funcions i les motivacions."
      ]
    },
    {
      "id": "CE6",
      "title": "Reconèixer i valorar el patrimoni artístic, a partir de l’anàlisi d’alguns exemples, per contribuir a la seva recuperació, la conservació i la difusió com a element conformador de les identitats individuals i col·lectives i per al gaudi i la cohesió de la comunitat dins un món global",
      "description": "Reconèixer i valorar el patrimoni artístic, a partir de l’anàlisi d’alguns exemples, per contribuir a la seva recuperació, la conservació i la difusió com a element conformador de les identitats individuals i col·lectives i per al gaudi i la cohesió de la comunitat dins un món global.",
      "criteris": [
        "6.1 Comprendre la importància de la conservació i la promoció del patrimoni artístic, investigant sobre els processos de recuperació, conservació i difusió d’obres d’art.",
        "6.2 Analitzar el paper conformador de les identitats individuals i col·lectives que posseeix l’art i el patrimoni artístic, així com el seu paper en la creació de vincles comunitaris."
      ]
    },
    {
      "id": "CE7",
      "title": "Distingir els canvis estètics i les diferents formes de representació humana en determinades èpoques i en l’actualitat, establint-hi vincles, per formar-se un concepte assertiu de la pròpia imatge, conformar els gustos personals i desenvolupar sensibilitat i respecte per la diversitat, superant estereotips i prejudicis",
      "description": "Distingir els canvis estètics i les diferents formes de representació humana en determinades èpoques i en l’actualitat, establint-hi vincles, per formar-se un concepte assertiu de la pròpia imatge, conformar els gustos personals i desenvolupar sensibilitat i respecte per la diversitat, superant estereotips i prejudicis.",
      "criteris": [
        "7.1 Formar-se una imatge ajustada de si mateix, a partir de l’anàlisi i la comparació de la representació humana en diverses èpoques i en l’actualitat, desenvolupant els gustos personals i la sensibilitat.",
        "7.2 Apreciar la diversitat com a font d’enriquiment i respectar les idees estètiques de les altres persones, superant estereotips i prejudicis."
      ]
    },
    {
      "id": "CE8",
      "title": "Analitzar els processos i fenòmens de la història de l’art des de la perspectiva de gènere, a través d’una aproximació oberta i integradora per comprometre’s en la igualtat d’oportunitats, i rebutjar qualsevol forma de discriminació i violència",
      "description": "Analitzar els processos i fenòmens de la història de l’art des de la perspectiva de gènere, a través d’una aproximació oberta i integradora per comprometre’s en la igualtat d’oportunitats, i rebutjar qualsevol forma de discriminació i violència.",
      "criteris": [
        "8.1 Identificar certs processos i fenòmens de la història de l’art que han negat o ocultat la capacitat creadora de les dones i reconèixer i visibilitzar artistes i col·lectius invisibilitzats per raó de gènere.",
        "8.2 Analitzar críticament la imatge de la dona en la història de l’art, mitjançant l’anàlisi comparativa d’obres de diferents èpoques i cultures en les quals estigui representada la figura femenina."
      ]
    }
  ]
},
  "Història del Món Contemporani": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Cercar, tractar i comunicar informació procedent de diferents mitjans i fonts historiogràfiques, tant analògics com digitals, i analitzar-la críticament per adquirir consciència de la diversitat d’interpretacions existents sobre els fets i els processos històrics i aplicar les metodologies bàsiques de la recerca històrica",
      "description": "Cercar, tractar i comunicar informació procedent de diferents mitjans i fonts historiogràfiques, tant analògics com digitals, i analitzar-la críticament per adquirir consciència de la diversitat d’interpretacions existents sobre els fets i els processos històrics i aplicar les metodologies bàsiques de la recerca històrica.",
      "criteris": [
        "1.1 Adquirir consciència de la diversitat d’interpretacions historiogràfiques per mitjà de l’ús contrastat i crític de fonts i punts de vista diferents sobre un mateix fet o procés històric.",
        "1.2 Utilitzar les metodologies bàsiques de la disciplina aplicant estratègies de cerca, selecció, anàlisi, interpretació i elaboració d’informació històrica.",
        "1.3 Comunicar i transferir els coneixements adquirits mitjançant recursos expressius que incorporin formats i llenguatges diversos, emprant les opcions de gestió i presentació de la informació que ofereixen els mitjans i entorns digitals.",
        "1.4 Incorporar i usar adequadament el vocabulari específic de la història contemporània mitjançant la lectura activa, l’elaboració de textos escrits, les intervencions orals i les produccions audiovisuals, construint progressivament un discurs precís, rigorós i inclusiu."
      ]
    },
    {
      "id": "CE2",
      "title": "Investigar i comparar diferents moviments revolucionaris i altres processos de canvi, ruptura i transformació històrica de l’època contemporània, per argumentar i debatre sobre la seva contribució al desenvolupament de les identitats col·lectives, a la conquesta de les llibertats i a la consolidació dels drets humans i dels sistemes democràtics",
      "description": "Investigar i comparar diferents moviments revolucionaris i altres processos de canvi, ruptura i transformació històrica de l’època contemporània, per argumentar i debatre sobre la seva contribució al desenvolupament de les identitats col·lectives, a la conquesta de les llibertats i a la consolidació dels drets humans i dels sistemes democràtics.",
      "criteris": [
        "2.1 Comprendre els conceptes de revolució i canvi en el món contemporani, així com els elements i factors que els condicionen, a partir de l’estudi de casos històricament significatius i valorant els moviments d’acció i reacció que han generat.",
        "2.2 Explicar i argumentar la contribució dels diferents moviments revolucionaris contemporanis a la consolidació dels valors i dels principis democràtics, identificant-ne i descrivint-ne de manera documentada l’origen i el desenvolupament, tant en els aspectes ideològics com pel que fa a la resta de les seves dimensions històriques.",
        "2.3 Reconèixer i valorar les característiques i els principis dels règims democràtics per mitjà del contrast amb els trets específics dels diferents règims totalitaris que s’han succeït al llarg de la història contemporània.",
        "2.4 Explicitar mecanismes de defensa dels drets humans i de participació ciutadana, rebutjant qualsevol sistema polític basat en la injustícia, la discriminació o el domini."
      ]
    },
    {
      "id": "CE3",
      "title": "Adquirir una visió global de l’evolució de les relacions i dels conflictes internacionals durant els segles XIX, XX i principi del XXI, per mitjà de fonts històriques fiables, per analitzar-ne de forma crítica les causes i conseqüències, reconèixer les víctimes i desenvolupar una cultura de la pau basada en els valors universals de la llibertat, la justícia i la igualtat",
      "description": "Adquirir una visió global de l’evolució de les relacions i dels conflictes internacionals durant els segles XIX, XX i principi del XXI, per mitjà de fonts històriques fiables, per analitzar-ne de forma crítica les causes i conseqüències, reconèixer les víctimes i desenvolupar una cultura de la pau basada en els valors universals de la llibertat, la justícia i la igualtat.",
      "criteris": [
        "3.1 Comprendre l’evolució de les relacions internacionals en l’època contemporània mitjançant l’estudi de casos i l’explicació dels equilibris de poder, els sistemes d’aliances i les situacions de dependència i primacia internacional.",
        "3.2 Relacionar de manera argumentada els múltiples factors que provoquen determinats conflictes del món contemporani, com les guerres mundials, la guerra freda o el terrorisme i el ciberterrorisme, mitjançant la identificació i l’anàlisi comparativa de fonts fiables, identificant, si escau, les notícies falses o desinformacions.",
        "3.3 Valorar els esforços internacionals per mantenir la pau i fer complir els drets humans, per mitjà del reconeixement de la tasca que fan a aquest respecte diferents institucions, organitzacions civils i individus particulars, i la importància de la preservació de la memòria històrica i el reconeixement de les víctimes.",
        "3.4 Defensar, mitjançant propostes d’acció coherents i ben argumentades des del punt de vista històric, la importància de resoldre els conflictes mitjançant la no-violència, desenvolupant una cultura de pau basada en valors universals com la llibertat, la justícia i la igualtat."
      ]
    },
    {
      "id": "CE4",
      "title": "Examinar els canvis i les permanències en l’organització social de la població, en les relacions socials i en l’acció d’individus o grups, incorporant visions i perspectives contraposades i investigant-ne les aportacions als diversos processos de canvi, per adoptar una posició crítica i solidària davant les desigualtats socials, la intolerància i les situacions de discriminació, i contribuir a la consecució de comunitats més justes i cohesionades",
      "description": "Examinar els canvis i les permanències en l’organització social de la població, en les relacions socials i en l’acció d’individus o grups, incorporant visions i perspectives contraposades i investigant-ne les aportacions als diversos processos de canvi, per adoptar una posició crítica i solidària davant les desigualtats socials, la intolerància i les situacions de discriminació, i contribuir a la consecució de comunitats més justes i cohesionades.",
      "criteris": [
        "4.1 Analitzar canvis i permanències en la societat contemporània, atenent processos de llarga durada com els cicles vitals i els modes de vida, identificant els mecanismes de control i domini i els escenaris de lluita per la dignitat i contra la discriminació de diversos col·lectius.",
        "4.2 Prendre consciència de les desigualtats socials i les situacions de discriminació a partir de l’anàlisi històrica i el debat sobre els canvis en les relacions socials, i de les condicions de vida i aspiracions dels sectors més desfavorits de la societat.",
        "4.3 Incloure les visions, els relats i els interessos de diferents col·lectius i agents socials en l’anàlisi dels processos històrics, posant en relació contextos propers amb interpretacions globals i incorporant-hi protagonistes de diferents gèneres, classes, edats, condicions i procedències.",
        "4.4 Adoptar una posició crítica i empàtica davant de les desigualtats socials i les situacions de discriminació dels grups històricament invisibilitzats, a través del coneixement i la presa de contacte amb organismes, moviments socials i persones que contribueixin o hagin contribuït a processos concrets de canvi i millora social."
      ]
    },
    {
      "id": "CE5",
      "title": "Reconèixer els reptes i els problemes socialment més rellevants de l’actualitat, analitzant-ne l’origen, les causes i l’interès històric, així com les implicacions i conseqüències presents i futures, a través del contrast de fonts i de mitjans de comunicació, per elaborar i exposar judicis personals des d’una actitud d’alerta, crítica i compromesa amb l’acció i la millora de la societat",
      "description": "Reconèixer els reptes i els problemes socialment més rellevants de l’actualitat, analitzant-ne l’origen, les causes i l’interès històric, així com les implicacions i conseqüències presents i futures, a través del contrast de fonts i de mitjans de comunicació, per elaborar i exposar judicis personals des d’una actitud d’alerta, crítica i compromesa amb l’acció i la millora de la societat.",
      "criteris": [
        "5.1 Identificar la situació dels principals conflictes, reptes i problemes del món actual, elaborant i exposant treballs de síntesi o projectes en què s’analitzi i avaluï la informació de diferents fonts i mitjans de comunicació.",
        "5.2 Generar i exposar judicis personals, amb actitud crítica, racional i compromesa amb la millora de l’entorn, analitzant i debatent de manera fonamentada qüestions i reptes de rellevància local o global, incidint en aquells relacionats amb la globalització, la desigualtat, la discriminació, la interculturalitat i l’assoliment dels objectius de desenvolupament sostenible.",
        "5.3 Desenvolupar la capacitat d’anàlisi d’informació per afrontar diferents punts de vista, identificar la desinformació i elaborar arguments complexos, tot valorant críticament els problemes socials i cercant-ne els antecedents i les explicacions històriques."
      ]
    },
    {
      "id": "CE6",
      "title": "Analitzar els canvis demogràfics, econòmics, socials i culturals relacionats amb el desenvolupament dels sistemes econòmics característics de l’època contemporània, per interpretar i valorar les seves repercussions socials i ambientals i adoptar compromisos envers la sostenibilitat, la defensa dels drets socials i l’accés universal als recursos bàsics",
      "description": "Analitzar els canvis demogràfics, econòmics, socials i culturals relacionats amb el desenvolupament dels sistemes econòmics característics de l’època contemporània, per interpretar i valorar les seves repercussions socials i ambientals i adoptar compromisos envers la sostenibilitat, la defensa dels drets socials i l’accés universal als recursos bàsics.",
      "criteris": [
        "6.1 Identificar i explicar l’origen històric, la naturalesa i els trets dels sistemes econòmics contemporanis, analitzant-ne els cicles de creixement i crisi, i reflexionant de manera informada i crítica sobre els límits del creixement i el desenvolupament sostenible.",
        "6.2 Analitzar i valorar les conseqüències econòmiques, socials, polítiques i culturals dels sistemes econòmics contemporanis, especialment aquelles relacionades amb les condicions de vida dels diferents grups socials, la desigualtat en l’accés als recursos bàsics, la pobresa, la dependència a escala mundial i el deteriorament mediambiental, mitjançant el contrast i la interpretació de documents, dades i material gràfic.",
        "6.3 Abordar críticament el significat històric de la idea de progrés i les seves múltiples conseqüències socials, territorials i ambientals, argumentant la necessitat d’adoptar comportaments que garanteixin la sostenibilitat del planeta."
      ]
    },
    {
      "id": "CE7",
      "title": "Identificar els principals processos històrics contemporanis, comparar-ne els trets i les interrelacions i investigar-ne les causes i les conseqüències, mitjançant l’anàlisi i el comentari crític d’aproximacions historiogràfiques, per inferir-ne la influència en l’actualitat i preveure’n els possibles desenvolupaments futurs",
      "description": "Identificar els principals processos històrics contemporanis, comparar-ne els trets i les interrelacions i investigar-ne les causes i les conseqüències, mitjançant l’anàlisi i el comentari crític d’aproximacions historiogràfiques, per inferir-ne la influència en l’actualitat i preveure’n els possibles desenvolupaments futurs.",
      "criteris": [
        "7.1 Analitzar les causes, el desenvolupament i les conseqüències per al present de processos rellevants de la història contemporània, per mitjà de l’anàlisi i el comentari crític de fonts, dades, mapes i altre material gràfic i documental.",
        "7.2 Interpretar i argumentar la rellevància dels processos històrics més importants del món contemporani, tals com el nacionalisme, l’imperialisme, el parlamentarisme, la construcció de la Unió Europea o el fenomen de la globalització, desenvolupant la capacitat de pensar històricament."
      ]
    },
    {
      "id": "CE8",
      "title": "Incorporar la perspectiva de gènere a l’estudi de la història contemporània, mitjançant l’anàlisi multidisciplinària de la presència de les dones en tots els àmbits socials, i la investigació de les seves mobilitzacions i lluites polítiques, per denunciar i combatre les desigualtats i els estereotips, ressituar-la a la història i generar una actitud proactiva de cara a aconseguir la igualtat efectiva entre totes les persones",
      "description": "Incorporar la perspectiva de gènere a l’estudi de la història contemporània, mitjançant l’anàlisi multidisciplinària de la presència de les dones en tots els àmbits socials, i la investigació de les seves mobilitzacions i lluites polítiques, per denunciar i combatre les desigualtats i els estereotips, ressituar-la a la història i generar una actitud proactiva de cara a aconseguir la igualtat efectiva entre totes les persones.",
      "criteris": [
        "8.1 Introduir la perspectiva de gènere en l’observació i l’anàlisi dels esdeveniments i processos històrics del món contemporani, identificant i qüestionant els mecanismes de dominació que han generat i mantingut la desigualtat entre homes i dones.",
        "8.2 Mostrar una actitud proactiva en relació amb l’assoliment de la igualtat efectiva entre totes les persones a través del reconeixement de la presència i la rellevància històrica de les dones, l’anàlisi de les lluites del feminisme a favor de l’emancipació i l’equiparació de drets, i la identificació de moviments, causes i lideratges en pro de l’equitat de gènere i d’opció afectivosexual.",
        "8.3 Rebutjar les actituds discriminatòries, les relacions abusives i les violències envers persones i col·lectius, amb una atenció especial a la diversitat d’identitats i expressions de gènere, i visibilitzar les dificultats associades a altres formes de discriminació que es creuen amb la de gènere (interseccionalitat)."
      ]
    }
  ]
},
  "Literatura Castellana": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Llegir, interpretar i valorar clàssics de la literatura castellana atenent tant les relacions internes dels elements constitutius del gènere i a les seves funcions en les obres, com les relacions externes de les obres amb el seu context de producció i la seva inscripció en la tradició cultural, per eixamplar les possibilitats de gaudi de la literatura",
      "description": "Llegir, interpretar i valorar clàssics de la literatura castellana atenent tant les relacions internes dels elements constitutius del gènere i a les seves funcions en les obres, com les relacions externes de les obres amb el seu context de producció i la seva inscripció en la tradició cultural, per eixamplar les possibilitats de gaudi de la literatura.",
      "criteris": [
        "1.1 Explicar i argumentar la interpretació de les obres llegides a partir de l’anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l’obra i de les relacions externes del text amb el context sociohistòric i amb la tradició literària, utilitzant un metallenguatge específic i incorporant judicis de valor vinculats a l’apreciació estètica de les obres."
      ]
    },
    {
      "id": "CE2",
      "title": "Llegir de manera autònoma clàssics de la literatura castellana com a font de plaer i coneixement, compartir experiències de lectura i crear textos d’intenció literària, per construir la pròpia identitat lectora, gaudir de la dimensió social de la lectura i estimular la creativitat literària i artística",
      "description": "Llegir de manera autònoma clàssics de la literatura castellana com a font de plaer i coneixement, compartir experiències de lectura i crear textos d’intenció literària, per construir la pròpia identitat lectora, gaudir de la dimensió social de la lectura i estimular la creativitat literària i artística.",
      "criteris": [
        "2.1 Elaborar una interpretació personal a partir de la lectura autònoma d’obres rellevants de la literatura castellana atenent aspectes temàtics, de gènere i subgènere, elements de l’estructura i l’estil, i valors ètics i estètics de les obres, i establint vincles argumentats amb altres obres i altres experiències artístiques i culturals.",
        "2.2 Accedir a diverses manifestacions de la cultura literària en el marc d’un itinerari lector personal que enriqueixi, de manera conscient i sistemàtica, la identitat lectora pròpia, i compartir les experiències de lectura pròpies amb l’ajuda d’un metallenguatge específic.",
        "2.3 Crear textos personals o col·lectius amb intenció literària i consciència d’estil, en diferents suports i amb l’ajuda d’altres llenguatges artístics i audiovisuals, a partir de la lectura d’obres o fragments significatius en què es facin servir les convencions formals dels diversos gèneres i estils literaris."
      ]
    },
    {
      "id": "CE3",
      "title": "Establir vincles entre obres de diferents èpoques, contextos, gèneres, imaginaris i llenguatges artístics, reconeixent semblances i diferències en funció dels respectius contextos de producció i de la interrelació entre literatura i societat, per constatar l’existència d’universals temàtics i vies formals recurrents al llarg de la història de la cultura",
      "description": "Establir vincles entre obres de diferents èpoques, contextos, gèneres, imaginaris i llenguatges artístics, reconeixent semblances i diferències en funció dels respectius contextos de producció i de la interrelació entre literatura i societat, per constatar l’existència d’universals temàtics i vies formals recurrents al llarg de la història de la cultura.",
      "criteris": [
        "3.1 Comparar dos textos literaris o un fragment literari i una obra artística argumentant oralment o per escrit els elements de semblança i contrast, tant pel que fa a aspectes temàtics i de contingut, com formals i expressius, atenent també els seus valors ètics i estètics.",
        "3.2 Desenvolupar projectes de recerca que es concretin en una exposició oral, un assaig o una presentació multimodal i que mostrin la implicació i la resposta personal com a lector o lectora, al voltant d’una qüestió que estableixi vincles argumentats entre els clàssics de la literatura objecte de lectura guiada i altres textos i manifestacions artístiques d’ahir i d’avui, en funció de temes, tòpics, imaginaris, estructures, llenguatge, recursos expressius i valors ètics i estètics."
      ]
    },
    {
      "id": "CE4",
      "title": "Consolidar un marc de referències compartides a partir del coneixement d’alguns trets dels principals moviments estètics i d’algunes de les obres literàries més rellevants del patrimoni en llengua castellana per construir un mapa cultural en el qual inscriure les experiències literàries i culturals personals",
      "description": "Consolidar un marc de referències compartides a partir del coneixement d’alguns trets dels principals moviments estètics i d’algunes de les obres literàries més rellevants del patrimoni en llengua castellana per construir un mapa cultural en el qual inscriure les experiències literàries i culturals personals.",
      "criteris": [
        "4.1 Elaborar de manera individual o col·lectiva una exposició multimodal que situï els textos llegits al seu horitzó historicocultural, i que ofereixi una panoràmica de conjunt sobre moviments artístics i obres rellevants de la literatura castellana."
      ]
    },
    {
      "id": "CE5",
      "title": "Participar en la construcció d’un cànon literari que integri la perspectiva d’experiència de les dones i altres perspectives que no han estat visibilitzades, mitjançant la lectura d’obres d’escriptores i d’altres autors i autores marginats en llengua castellana, per desenvolupar el pensament crític pel que fa a la construcció discursiva del món i dels seus imaginaris",
      "description": "Participar en la construcció d’un cànon literari que integri la perspectiva d’experiència de les dones i altres perspectives que no han estat visibilitzades, mitjançant la lectura d’obres d’escriptores i d’altres autors i autores marginats en llengua castellana, per desenvolupar el pensament crític pel que fa a la construcció discursiva del món i dels seus imaginaris.",
      "criteris": [
        "5.1 Elaborar un projecte de recerca sobre autores de rellevància o autors marginats en llengua castellana per motius socials, polítics, sexuals i d’altres, o sobre qüestions temàtiques o formals que aportin una mirada diversa i crítica de la construcció dels imaginaris que proposa la tradició literària.",
        "5.2 Elaborar comentaris crítics de textos, orals o escrits, i participar en debats o taules rodones sobre lectures en què s’incorpori la perspectiva de gènere i altres perspectives que no han estat visibilitzades, com també qualsevol altre discurs predominant en la nostra societat que representi opressió sobre qualsevol minoria."
      ]
    }
  ]
},
  "Literatura Catalana": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Llegir, interpretar i valorar clàssics de la literatura catalana atenent tant les relacions internes dels elements constitutius del gènere i les seves funcions en les obres, com les relacions externes de les obres amb el seu context de producció i la seva inscripció en la tradició cultural, per eixamplar les possibilitats de gaudi de la literatura",
      "description": "Llegir, interpretar i valorar clàssics de la literatura catalana atenent tant les relacions internes dels elements constitutius del gènere i les seves funcions en les obres, com les relacions externes de les obres amb el seu context de producció i la seva inscripció en la tradició cultural, per eixamplar les possibilitats de gaudi de la literatura.",
      "criteris": [
        "1.1 Explicar i argumentar la interpretació de les obres llegides a partir de l’anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l’obra i de les relacions externes del text amb el context sociohistòric i amb la tradició literària, utilitzant un metallenguatge específic i incorporant judicis de valor vinculats a l’apreciació estètica de les obres."
      ]
    },
    {
      "id": "CE2",
      "title": "Llegir de manera autònoma clàssics de la literatura catalana com a font de plaer i coneixement, compartir experiències de lectura i crear textos d’intenció literària, per construir la pròpia identitat lectora, gaudir de la dimensió social de la lectura i estimular la creativitat literària i artística",
      "description": "Llegir de manera autònoma clàssics de la literatura catalana com a font de plaer i coneixement, compartir experiències de lectura i crear textos d’intenció literària, per construir la pròpia identitat lectora, gaudir de la dimensió social de la lectura i estimular la creativitat literària i artística.",
      "criteris": [
        "2.1 Elaborar una interpretació personal a partir de la lectura autònoma d’obres rellevants de la literatura universal, atenent aspectes temàtics, de gènere i subgènere, elements de l’estructura i l’estil, i valors ètics i estètics de les obres, i establint vincles argumentats amb altres obres i altres experiències artístiques i culturals.",
        "2.2 Accedir a diverses manifestacions de la cultura literària en el marc d’un itinerari lector personal que enriqueixi, de manera conscient i sistemàtica, la identitat lectora pròpia, i compartir les experiències de lectura pròpies amb l’ajuda d’un metallenguatge específic.",
        "2.3 Crear textos personals o col·lectius amb intenció literària i consciència d’estil, en diferents suports i amb l’ajuda d’altres llenguatges artístics i audiovisuals, a partir de la lectura d’obres o fragments significatius en què es facin servir les convencions formals dels diversos gèneres i estils literaris."
      ]
    },
    {
      "id": "CE3",
      "title": "Establir vincles entre obres de diferents èpoques, contextos, gèneres i llenguatges artístics, reconeixent semblances i diferències en funció dels respectius contextos de producció i de la interrelació entre literatura i societat, per constatar l’existència d’universals temàtics i de vies formals recurrents al llarg de la història de la cultura",
      "description": "Establir vincles entre obres de diferents èpoques, contextos, gèneres i llenguatges artístics, reconeixent semblances i diferències en funció dels respectius contextos de producció i de la interrelació entre literatura i societat, per constatar l’existència d’universals temàtics i de vies formals recurrents al llarg de la història de la cultura.",
      "criteris": [
        "3.1 Comparar dos textos literaris o un fragment literari i una obra artística argumentant oralment o per escrit els elements de semblança i contrast, tant pel que fa a aspectes temàtics i de contingut, com formals i expressius, atenent també els seus valors ètics i estètics.",
        "3.2 Desenvolupar projectes de recerca que es concretin en una exposició oral, un assaig o una presentació multimodal i que mostrin la implicació i la resposta personal com a lector o lectora, al voltant d’una qüestió que estableixi vincles argumentats entre els clàssics de la literatura catalana objecte de lectura guiada i altres textos i manifestacions artístiques d’ahir i d’avui, en funció de temes, tòpics, estructures, llenguatge, recursos expressius i valors ètics i estètics."
      ]
    },
    {
      "id": "CE4",
      "title": "Consolidar un marc de referències compartides a partir del coneixement d’alguns trets dels principals moviments estètics i d’algunes de les obres literàries més rellevants del patrimoni en llengua catalana, per construir un mapa cultural en el qual inscriure les experiències literàries i culturals personals",
      "description": "Consolidar un marc de referències compartides a partir del coneixement d’alguns trets dels principals moviments estètics i d’algunes de les obres literàries més rellevants del patrimoni en llengua catalana, per construir un mapa cultural en el qual inscriure les experiències literàries i culturals personals.",
      "criteris": [
        "4.1 Elaborar de manera individual o col·lectiva una exposició multimodal que situï els textos llegits al seu horitzó historicocultural, i que ofereixi una panoràmica de conjunt sobre moviments artístics i obres rellevants de la literatura catalana."
      ]
    },
    {
      "id": "CE5",
      "title": "Participar en la construcció d’un cànon literari que integri la perspectiva d’experiència de les dones i altres perspectives que no han estat visibilitzades, mitjançant la lectura d’obres d’escriptores i altres autors i autores marginats en llengua catalana, per desenvolupar el pensament crític pel que fa a la construcció discursiva del món i els seus imaginaris",
      "description": "Participar en la construcció d’un cànon literari que integri la perspectiva d’experiència de les dones i altres perspectives que no han estat visibilitzades, mitjançant la lectura d’obres d’escriptores i altres autors i autores marginats en llengua catalana, per desenvolupar el pensament crític pel que fa a la construcció discursiva del món i els seus imaginaris.",
      "criteris": [
        "5.1 Elaborar un projecte de recerca sobre autores de rellevància o autors marginats en llengua catalana per motius socials, polítics, religiosos, sexuals i d’altres, o sobre qüestions temàtiques o formals que aportin una mirada diversa i crítica de la construcció dels imaginaris que proposa la tradició literària.",
        "5.2 Elaborar comentaris crítics de textos, orals o escrits, i participar en debats o taules rodones sobre lectures en què s’incorpori la perspectiva de gènere, i qualsevol altre discurs predominant en la nostra societat que representi opressió sobre qualsevol minoria."
      ]
    }
  ]
},
  "Literatura Universal": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Llegir, interpretar i valorar clàssics de la literatura universal atenent tant les relacions internes dels elements constitutius del gènere i les seves funcions en les obres, com les relacions externes de les obres amb el seu context de producció i la seva inscripció en la tradició cultural, per eixamplar les possibilitats de gaudi de la literatura",
      "description": "Llegir, interpretar i valorar clàssics de la literatura universal atenent tant les relacions internes dels elements constitutius del gènere i les seves funcions en les obres, com les relacions externes de les obres amb el seu context de producció i la seva inscripció en la tradició cultural, per eixamplar les possibilitats de gaudi de la literatura.",
      "criteris": [
        "1.1 Explicar i argumentar la interpretació de les obres llegides a partir de l’anàlisi de les relacions internes dels seus elements constitutius amb el sentit de l’obra i de les relacions externes del text amb el context sociohistòric i amb la tradició literària, utilitzant un metallenguatge específic i incorporant judicis de valor vinculats a l’apreciació estètica de les obres."
      ]
    },
    {
      "id": "CE2",
      "title": "Llegir de manera autònoma clàssics de la literatura universal com a font de plaer i coneixement, compartir experiències de lectura i crear textos d’intenció literària, per construir la pròpia identitat lectora, gaudir de la dimensió social de la lectura i estimular la creació literària i artística",
      "description": "Llegir de manera autònoma clàssics de la literatura universal com a font de plaer i coneixement, compartir experiències de lectura i crear textos d’intenció literària, per construir la pròpia identitat lectora, gaudir de la dimensió social de la lectura i estimular la creació literària i artística.",
      "criteris": [
        "2.1 Elaborar una interpretació personal a partir de la lectura autònoma d’obres rellevants de la literatura universal, atenent aspectes temàtics, de gènere i subgènere, elements de l’estructura i l’estil, i valors ètics i estètics de les obres, i establint vincles argumentats amb altres obres i altres experiències artístiques i culturals.",
        "2.2 Accedir a diverses manifestacions de la cultura literària en el marc d’un itinerari lector personal que enriqueixi, de manera conscient i sistemàtica, la identitat lectora pròpia, i compartir les experiències de lectura pròpies amb l’ajuda d’un metallenguatge específic.",
        "2.3 Crear textos personals o col·lectius amb intenció literària i consciència d’estil, en diferents suports i amb l’ajuda d’altres llenguatges artístics i audiovisuals, a partir de la lectura d’obres o fragments significatius en què es facin servir les convencions formals dels diversos gèneres i estils literaris."
      ]
    },
    {
      "id": "CE3",
      "title": "Establir vincles entre obres de diferents èpoques, contextos, gèneres i llenguatges artístics, reconeixent semblances i diferències en funció dels respectius contextos de producció i de la interrelació entre literatura i societat, per constatar l’existència d’universals temàtics i de vies formals recurrents al llarg de la història de la cultura",
      "description": "Establir vincles entre obres de diferents èpoques, contextos, gèneres i llenguatges artístics, reconeixent semblances i diferències en funció dels respectius contextos de producció i de la interrelació entre literatura i societat, per constatar l’existència d’universals temàtics i de vies formals recurrents al llarg de la història de la cultura.",
      "criteris": [
        "3.1 Comparar dos textos literaris o un fragment literari i una obra artística argumentant oralment o per escrit els elements de semblança i contrast, tant pel que fa a aspectes temàtics i de contingut, com formals i expressius, atenent també els seus valors ètics i estètics.",
        "3.2 Desenvolupar projectes de recerca que es concretin en una exposició oral, un assaig o una presentació multimodal i que mostrin la implicació i la resposta personal com a lector o lectora, al voltant d’una qüestió que estableixi vincles argumentats entre els clàssics de la literatura universal objecte de lectura guiada i altres textos i manifestacions artístiques d’ahir i d’avui, en funció de temes, tòpics, estructures, llenguatge, recursos expressius i valors ètics i estètics."
      ]
    },
    {
      "id": "CE4",
      "title": "Consolidar un marc de referències compartides a partir del coneixement d’alguns trets dels principals moviments estètics i d’algunes de les obres literàries més rellevants del patrimoni universal per construir un mapa cultural en el qual inscriure les experiències literàries i culturals personals",
      "description": "Consolidar un marc de referències compartides a partir del coneixement d’alguns trets dels principals moviments estètics i d’algunes de les obres literàries més rellevants del patrimoni universal per construir un mapa cultural en el qual inscriure les experiències literàries i culturals personals.",
      "criteris": [
        "4.1 Elaborar de manera individual o col·lectiva una exposició multimodal que situï els textos llegits al seu horitzó historicocultural, i que ofereixi una panoràmica de conjunt sobre moviments artístics i obres rellevants de la literatura universal."
      ]
    },
    {
      "id": "CE5",
      "title": "Participar en la construcció d’un cànon literari universal que integri la perspectiva d’experiència de les dones mitjançant la lectura d’obres d’escriptores i que superi els marcs de la cultura occidental per desenvolupar el pensament crític pel que fa a la construcció discursiva del món i els seus imaginaris",
      "description": "Participar en la construcció d’un cànon literari universal que integri la perspectiva d’experiència de les dones mitjançant la lectura d’obres d’escriptores i que superi els marcs de la cultura occidental per desenvolupar el pensament crític pel que fa a la construcció discursiva del món i els seus imaginaris.",
      "criteris": [
        "5.1 Realitzar un projecte de recerca sobre autores de rellevància, obres literàries de contextos no occidentals o qüestions temàtiques o formals que aportin una mirada diversa i crítica sobre la construcció d’imaginaris que proposa la tradició literària.",
        "5.2 Elaborar comentaris crítics de textos, orals o escrits, i participar en converses literàries sobre lectures en què s’incorpori la perspectiva de gènere i es posi en qüestió la mirada etnocèntrica pròpia del cànon occidental, i també qualsevol altre discurs predominant en la nostra societat que representi opressió sobre qualsevol minoria."
      ]
    }
  ]
},
  "Llengua i Cultura Gregues": {
  "competencies": [
    {
      "id": "CE1",
      "title": "Identificar els aspectes bàsics de la llengua grega, distingir i analitzar les unitats lingüístiques i reflexionar-hi mitjançant la comparació amb la llengua d’ensenyament i amb altres llengües del repertori individual de l’alumnat, per traduir i interpretar textos grecs que siguin significatius per a l’estudiant",
      "description": "Identificar els aspectes bàsics de la llengua grega, distingir i analitzar les unitats lingüístiques i reflexionar-hi mitjançant la comparació amb la llengua d’ensenyament i amb altres llengües del repertori individual de l’alumnat, per traduir i interpretar textos grecs que siguin significatius per a l’estudiant.",
      "criteris": {
        "1r": [
          "1.1 Fer traduccions directes de frases o fragments breus, adaptats, de dificultat baixa, amb correcció ortogràfica i expressiva, per tal d’identificar i analitzar unitats lingüístiques regulars de la llengua grega i apreciar variants i coincidències amb altres llengües conegudes per l’alumnat.",
          "1.2 Seleccionar de manera progressivament autònoma el significat apropiat de paraules polisèmiques i justificar la decisió, tenint en compte la informació cotextual o contextual i utilitzant les diferents eines de suport al procés de traducció, com ara llistes de vocabulari, glossaris, diccionaris, mapes o atles, correctors ortogràfics, gramàtiques i llibres d’estil, amb l’objectiu de millorar la competència lingüística de l’alumnat tant en la llengua de partida com en la d’arribada.",
          "1.3 Analitzar els progressos i les dificultats d’aprenentatge de la llengua grega, seleccionant les estratègies més adequades i eficaces per superar aquestes dificultats i consolidar-ne l’aprenentatge, per tal de poder fer activitats de planificació del propi aprenentatge, autoavaluació i coavaluació, com les proposades al portafolis europeu de les llengües (PEL) o en un diari d’aprenentatge, fent-los explícits i compartint-los."
        ],
        "2n": [
          "1.1 Fer traduccions directes i/o inverses de textos o fragments de dificultat mitjana-alta (originals o adaptats), amb correcció ortogràfica i expressiva, per tal d’identificar i analitzar unitats lingüístiques regulars de la llengua grega i apreciar variants i coincidències amb altres llengües conegudes per l’alumnat.",
          "1.2 Ampliar el coneixement iniciat en el curs anterior de paraules polisèmiques, a partir de diversos suports, tant escrits com digitals, amb l’objectiu d’aprofundir en la millora de la competència lingüística de l’alumnat tant en la llengua de partida com d’arribada.",
          "1.3 Revisar i esmenar de manera progressivament autònoma les pròpies traduccions i les dels companys i companyes, per tal de ser capaç de fer propostes de millora i argumentar els canvis amb terminologia especialitzada a partir de la reflexió lingüística.",
          "1.4 Aprofundir en l’anàlisi dels progressos i de les dificultats d’aprenentatge de la llengua grega, seleccionant les estratègies més adequades i eficaces per superar aquestes dificultats i consolidar-ne l’aprenentatge, amb l’objectiu de poder fer activitats de planificació del propi aprenentatge, autoavaluació i coavaluació, com les proposades a primer."
        ]
      }
    },
    {
      "id": "CE2",
      "title": "Distingir els ètims i formants grecs presents en el lèxic d’ús quotidià, identificant els canvis semàntics que hagin tingut lloc i establint una comparació amb la llengua d’ensenyament i altres llengües del repertori individual de l’alumnat, per deduir el significat etimològic del lèxic conegut i els significats de lèxic nou o especialitzat",
      "description": "Distingir els ètims i formants grecs presents en el lèxic d’ús quotidià, identificant els canvis semàntics que hagin tingut lloc i establint una comparació amb la llengua d’ensenyament i altres llengües del repertori individual de l’alumnat, per deduir el significat etimològic del lèxic conegut i els significats de lèxic nou o especialitzat.",
      "criteris": {
        "1r": [
          "2.1 Deduir el significat etimològic d’un terme d’ús comú i habitual, tot atenent els canvis fonètics, morfològics o semàntics que hagin tingut lloc, per tal de millorar la precisió lèxica en la llengua o llengües d’ús habitual de l’alumne i alumna.",
          "2.2 Explicar, de manera guiada, la relació del grec amb el català, el castellà i, si s’escau, amb l’aranès, amb l’objectiu d’apreciar la continuïtat de la llengua grega fins als nostres dies en les llengües oficials de Catalunya.",
          "2.3 Identificar i denunciar prejudicis i estereotips lingüístics, adoptant una actitud de respecte i valoració de la diversitat com a riquesa cultural, lingüística i dialectal, per ajudar a crear una societat més tolerant i integradora."
        ],
        "2n": [
          "2.1 Deduir el significat etimològic d’un terme d’ús específic i poc freqüent i inferir el significat de termes de nova aparició o procedents de lèxic especialitzat, aplicant, de manera guiada, estratègies de reconeixement de formants grecs, tot atenent els canvis fonètics, morfològics o semàntics que hagin tingut lloc, per tal de millorar la precisió lèxica en la llengua o llengües d’ús habitual de l’alumne o alumna.",
          "2.2 Explicar la relació del grec amb les llengües modernes més enllà de les llengües oficials de Catalunya i molt especialment amb el grec modern, utilitzant amb iniciativa estratègies i coneixements de les llengües i els llenguatges que conformen el repertori de l’alumnat, amb l’objectiu d’apreciar la continuïtat de la llengua grega fins als nostres dies en molts idiomes moderns.",
          "2.3 Analitzar críticament i denunciar prejudicis i estereotips lingüístics adoptant una actitud de respecte i valoració de la diversitat com a riquesa cultural, lingüística i dialectal per ajudar a crear una societat més tolerant i integradora."
        ]
      }
    },
    {
      "id": "CE3",
      "title": "Interpretar i valorar, amb sentit crític, textos grecs de diferents gèneres i èpoques, assumint el procés creatiu com a complex i inseparable del context històric, social i polític i de les seves influències artístiques, per identificar-ne la genealogia i valorar-ne l’aportació a la literatura europea en general i catalana en particular",
      "description": "Interpretar i valorar, amb sentit crític, textos grecs de diferents gèneres i èpoques, assumint el procés creatiu com a complex i inseparable del context històric, social i polític i de les seves influències artístiques, per identificar-ne la genealogia i valorar-ne l’aportació a la literatura europea en general i catalana en particular.",
      "criteris": {
        "1r": [
          "3.1 Analitzar, interpretar i comentar textos i fragments literaris de diversa índole, de complexitat baixa i de manera guiada, aplicant estratègies d’anàlisi i reflexió que impliquin mobilitzar la pròpia experiència, com a eina per comprendre el món i la condició humana i desenvolupar la sensibilitat estètica i l’hàbit lector.",
          "3.2 Analitzar i explicar els temes, els tòpics i els valors ètics o estètics de fragments literaris grecs, des d’un enfocament intertextual guiat, per tal de valorar les arrels gregues de la civilització occidental.",
          "3.3 Identificar i definir paraules gregues que designen conceptes bàsics i fonamentals per a l’estudi i la comprensió de la civilització hel·lena, l’aprenentatge dels quals combina coneixements lèxics i culturals, en textos de diferents formats, per introduir l’alumnat en el coneixement de conceptes clau de la civilització grega universal.",
          "3.4 Crear textos breus, de manera individual o col·lectiva, amb una mínima intenció literària i consciència d’estil, en diferents suports, a partir de la lectura d’obres o fragments significatius en els quals s’hagi partit de la civilització i la cultura gregues com a font d’inspiració, amb la finalitat que l’alumne o alumna sigui conscient de la utilitat de la llengua i la literatura gregues per millorar la llengua pròpia."
        ],
        "2n": [
          "3.1 Analitzar, interpretar i comentar textos i fragments literaris de diversa índole, de complexitat mitjana o alta, aplicant estratègies d’anàlisi i reflexió que impliquin mobilitzar la pròpia experiència, com a eina per comprendre el món i la condició humana i desenvolupar la sensibilitat estètica i l’hàbit lector.",
          "3.2 Analitzar i explicar els temes, els tòpics, els gèneres i els valors ètics o estètics d’obres o fragments literaris grecs, comparant-los amb obres o fragments literaris posteriors (procedents especialment de la literatura catalana), des d’un enfocament intertextual guiat, per tal de valorar les arrels gregues de la civilització occidental.",
          "3.3 Identificar i definir paraules gregues que designen conceptes específics per a l’estudi i la comprensió de la civilització hel·lena, l’aprenentatge dels quals i combina coneixements lèxics i culturals, en textos de diferents formats, perquè l’alumnat aprofundeixi en el coneixement de conceptes clau de la civilització grega i universal.",
          "3.4 Crear textos d’una certa extensió, de manera individual o col·lectiva, amb una clara intenció literària i consciència d’estil, en diferents suports i amb ajuda d’altres llenguatges artístics i audiovisuals, a partir de la lectura d’obres o fragments significatius en els quals s’hagi partit de la civilització i la cultura gregues com a font d’inspiració, amb la finalitat que l’alumne o alumna sigui conscient de la utilitat de la llengua i la literatura gregues per millorar la llengua pròpia."
        ]
      }
    },
    {
      "id": "CE4",
      "title": "Analitzar i percebre les característiques de la civilització grega en l’àmbit personal —individual i col·lectiu— religiós i sociopolític, adquirint coneixements sobre el món hel·lènic i comparant críticament el present i el passat, per valorar les aportacions del món clàssic grec al nostre entorn com a base d’una ciutadania democràtica i compromesa",
      "description": "Analitzar i percebre les característiques de la civilització grega en l’àmbit personal —individual i col·lectiu— religiós i sociopolític, adquirint coneixements sobre el món hel·lènic i comparant críticament el present i el passat, per valorar les aportacions del món clàssic grec al nostre entorn com a base d’una ciutadania democràtica i compromesa.",
      "criteris": {
        "1r": [
          "4.1 Explicar, a partir de criteris donats, els processos històrics i polítics, la vida quotidiana, les institucions i els costums de la societat grega per apreciar en la seva justa mesura les adaptacions i els canvis experimentats amb vista a l’evolució de les societats i els drets humans, i afavorir el desenvolupament d’una cultura compartida i una ciutadania compromesa amb la memòria col·lectiva i els valors democràtics.",
          "4.2 Debatre sobre la continuïtat del llegat grec a la nostra societat, tot mostrant interès, empatia i respecte per les opinions dels altres.",
          "4.3 Elaborar treballs senzills sobre diversos aspectes del llegat de la civilització grega en l’àmbit personal, religiós i sociopolític, localitzant, seleccionant i contrastant informació procedent de diferents fonts, calibrant-ne la fiabilitat i pertinència i respectant els principis de rigor i propietat intel·lectual, per tal de desvetllar en l’alumnat una actitud responsable i de respecte vers les fonts d’informació utilitzades."
        ],
        "2n": [
          "4.1 Cercar, contrastar, seleccionar i combinar informacions obtingudes des de diferents fonts sobre la pervivència del llegat grec en el món modern i molt especialment en la cultura catalana.",
          "4.2 Debatre sobre la importància, l’evolució, l’assimilació o el qüestionament de diferents aspectes del llegat grec a la nostra societat, tot utilitzant estratègies retòriques i oratòries de manera guiada, per tal que l’estudiant prengui consciència del seu potencial paper com a mediador entre posicions contraposades quan sigui necessari, seleccionant i contrastant informació i experiències veraces i mostrant interès, respecte i empatia per altres opinions i argumentacions.",
          "4.3 Elaborar treballs de recerca de manera progressivament autònoma en diferents suports sobre aspectes del llegat de la civilització grega en l’àmbit personal, religiós i sociopolític, localitzant, seleccionant i contrastant informació procedent de diferents fonts, calibrant-ne la fiabilitat i pertinència i respectant els principis de rigor i propietat intel·lectual, per tal de desvetllar en l’alumnat una actitud responsable i de respecte vers les fonts d’informació utilitzades."
        ]
      }
    },
    {
      "id": "CE5",
      "title": "Valorar críticament el patrimoni històric, arqueològic, artístic i cultural heretat de la civilització grega, promovent-ne la sostenibilitat i reconeixent-lo com a producte de la creació humana i com a testimoni de la història, per explicar el llegat material i immaterial grec com a transmissor de coneixement i font d’inspiració de creacions modernes i contemporànies",
      "description": "Valorar críticament el patrimoni històric, arqueològic, artístic i cultural heretat de la civilització grega, promovent-ne la sostenibilitat i reconeixent-lo com a producte de la creació humana i com a testimoni de la història, per explicar el llegat material i immaterial grec com a transmissor de coneixement i font d’inspiració de creacions modernes i contemporànies.",
      "criteris": {
        "1r": [
          "5.1 Identificar i explicar el llegat material i immaterial de la civilització grega com a font d’inspiració, i analitzar produccions culturals i artístiques posteriors (d’èpoques i orígens diferents) a partir de criteris donats, per prendre així consciència de la petja inesborrable que ha deixat damunt d’aquestes la civilització grega.",
          "5.2 Investigar, de manera guiada, el patrimoni històric, arqueològic, artístic i cultural català i universal heretat de la civilització grega.",
          "5.3 Explorar les empremtes del llegat grec, com també del romà com a continuador del llegat grec, a l’entorn de l’alumnat, a partir de criteris donats, aplicant els coneixements adquirits, per tal de ser capaç de reflexionar sobre les implicacions dels diferents usos, donar exemples de la continuïtat i la pervivència de l’antiguitat clàssica en la vida quotidiana i presentar els seus resultats mitjançant diferents suports."
        ],
        "2n": [
          "5.1 Aprofundir en la identificació i l’explicació del llegat material i immaterial de la civilització grega com a font d’inspiració, i analitzar produccions culturals i artístiques posteriors (de l’àmbit fonamentalment català) a partir de criteris donats, per prendre així consciència de la petja inesborrable que ha deixat damunt d’aquestes la civilització grega.",
          "5.2 Aprofundir en el coneixement i la valoració del patrimoni històric, arqueològic, artístic i cultural universal i, sobretot, català, heretat de la civilització grega, interessant-se pels processos de construcció, preservació, conservació i restauració i per les actituds cíviques que n’asseguren la sostenibilitat.",
          "5.3 Fomentar una actitud crítica i compromesa de l’alumnat per ser capaç de denunciar totes les accions que puguin posar en risc la conservació del patrimoni grec (material o immaterial) i la seva pervivència en el futur, tot fent propostes d’acció coherents per protegir-lo i llegar-lo en perfectes condicions a les generacions futures."
        ]
      }
    }
  ]
},
};
