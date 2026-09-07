/**
 * Sabers de l'Educació Secundària Obligatòria (ESO) de Catalunya
 * Font: Departament d'Educació, Generalitat de Catalunya
 * Llicència: CC BY-NC-SA
 */

import type { SaberAreaGeneric } from './curriculum/types';

export const SABERS_CATALUNYA_ESO: Record<string, SaberAreaGeneric> = {
  "Física i Química": {
    name: "Física i Química",
    courseKeys: ["1r-2n-3r", "4t"],
    courseLabels: {"1r-2n-3r": "1r, 2n i 3r ESO", "4t": "4t ESO"},
    blocs: {
      "Habilitats i destreses científiques bàsiques": {
        "1r-2n-3r": ["Utilització de metodologies pròpies de la investigació científica per a la identificació i la formulació de qüestions, l’elaboració d’hipòtesis i el seu contrast experimental.", "Disseny i realització de treball experimental i emprenedoria de projectes de recerca per a la resolució de problemes mitjançant l’ús de l’experimentació, la indagació, la deducció, la recerca d’evidències o el raonament logicomatemàtic per fer inferències vàlides a partir de les observacions i l’elaboració de conclusions pertinents i generals que vagin més enllà de les condicions experimentals, per aplicar-les a nous escenaris.", "Ús de diversos entorns i recursos d’aprenentatge científic, com ara el laboratori o els entorns virtuals, utilitzant de forma correcta els materials, els productes i les eines tecnològiques i atenent les normes d’ús de cada espai per assegurar la conservació de la salut pròpia i comunitària, la seguretat en xarxes i el respecte al medi ambient."],
        "4t": ["Disseny del treball experimental i emprenedoria de projectes de recerca per a la resolució de problemes mitjançant l’ús de l’experimentació i el tractament de l’error, la indagació, la deducció, la recerca d’evidències o el raonament logicomatemàtic per fer inferències vàlides sobre la base de les observacions i treure’n conclusions pertinents i generals que vagin més enllà de les condicions experimentals per aplicar-les a nous escenaris.", "Ús de diversos entorns i recursos d’aprenentatge científic, com ara el laboratori o els entorns virtuals, utilitzant de forma correcta els materials, les substàncies i les eines tecnològiques i atenent les normes d’ús de cada espai per assegurar la conservació de la salut pròpia i comunitària, la seguretat a les xarxes i el respecte pel medi ambient.", "Ús del llenguatge científic, incloent-hi l’ús adequat de sistemes d’unitats i eines matemàtiques bàsiques, per argumentar i comunicar amb diferents entorns científics i d’aprenentatge.", "Interpretació i producció d’informació científica en diferents formats i a partir de diferents mitjans per desenvolupar un criteri propi basat en les aportacions de la ciència a la millora de la societat.", "Valoració de la cultura científica i del paper de científics i científiques en les principals fites històriques i actuals de la física i la química per a l’avenç i la millora de la societat."],
      },
      "Habilitats i destreses científiques bàsiques - Ús del llenguatge científic, incloent-hi l’ús adequat de representacions, sistemes d’unitats i eines matemàtiques, per aconseguir una comunicació argumentada en diferents entorns científics i d’aprenentatge.": {
        "1r-2n-3r": ["Interpretació i producció d’informació científica en diferents formats i amb diferents mitjans per desenvolupar un criteri propi basat en allò que el pensament científic aporta a la millora de la societat.", "Valoració de la cultura científica i del paper de les científiques i els científics en les principals fites històriques i actuals de la física i la química, posant de manifest referents femenins invisibilitzats, per a l’avenç i la millora d’una societat equitativa i plural."],
        "4t": [],
      },
      "La matèria": {
        "1r-2n-3r": ["Aplicació del model cinètic de la matèria i la teoria cineticomolecular a partir d’observacions sobre la matèria per explicar-ne les propietats, els estats d’agregació i els canvis d’estat, i la formació de barreges i dissolucions.", "Realització d’experiments relacionats amb els sistemes materials per conèixer-ne i descriure’n les propietats, la composició i la classificació.", "Diferenciació de substàncies i mescles per les seves propietats, i de substàncies elementals i compostes."],
        "4t": ["Realització d’activitats de naturalesa variada sobre els sistemes materials més comuns, incloent-hi dissolucions i sistemes dispersos, per a la resolució de problemes relacionats amb situacions quotidianes diverses.", "Argumentació i predicció de les propietats macroscòpiques de diverses substàncies (estat, conductivitat, densitat, temperatura d’ebullició i de fusió...) amb relació al tipus de substància i la seva estructura.", "Reconeixement dels principals models atòmics i dels constituents dels àtoms per establir la relació amb els avenços de la física i de la química més rellevants de la història recent.", "Relació, a partir de la seva configuració electrònica, de la distribució dels elements a la taula periòdica amb les seves propietats fisicoquímiques més importants, per trobar-hi generalitats.", "Valoració de la utilitat dels compostos químics a partir de les seves propietats en relació amb com es combinen els àtoms, com a manera de reconèixer la importància de les aplicacions de la química en diferents àmbits.", "Càlculs senzills utilitzant la quantitat de matèria en situacions quotidianes i d’especial rellevància i interès, utilitzant de manera adient el llenguatge científic.", "Utilització adequada de la formulació i nomenclatura de compostos químics inorgànics més comuns mitjançant les regles de la IUPAC.", "Introducció a la formulació i la nomenclatura dels compostos orgànics mitjançant les regles de la IUPAC, com a base per entendre la gran varietat de compostos de l’entorn basats en el carboni."],
      },
      "La matèria - Identificació dels criteris d’ordenació dels elements en la taula periòdica i la seva utilitat.": {
        "1r-2n-3r": ["Aplicació dels coneixements sobre l’estructura atòmica de la matèria per entendre la formació de ions, l‘existència d’isòtops i les seves propietats, el desenvolupament històric del model atòmic i la seva contribució a l’ordenació dels elements a la taula periòdica.", "Relació entre les propietats físiques i químiques de les substàncies elementals i la situació dels corresponents elements a la taula periòdica.", "Valoració de les aplicacions dels principals compostos químics, la seva formació i les seves propietats físiques i químiques, així com l’expressió de la quantitat de matèria.", "Ús adequat d’un llenguatge científic comú i universal a través de la formulació i la nomenclatura de substàncies simples, ions monoatòmics i compostos binaris més freqüents mitjançant les regles de nomenclatura de la IUPAC."],
        "4t": [],
      },
      "L’energia - Formulació de qüestions i hipòtesis sobre l’energia, les manifestacions i les propietats per a l’elaboració d’explicacions amb relació als processos de canvi.": {
        "1r-2n-3r": ["Raonament dels aspectes energètics associats a canvis físics i els canvis químics i la seva identificació en fenòmens quotidians.", "Experimentació amb materials d’ús quotidià de fenòmens de transferència d’energia en forma de llum i so.", "Representació i interpretació de gràfics de temperatura, temps en processos d’escalfament i refredament i en els canvis d’estat.", "Anàlisi i aplicació dels mecanismes i efectes de la transferència i conducció de calor sobre els sistemes materials (fluids i sòlids), l’assoliment de l’equilibri tèrmic, en situacions quotidianes i de rellevància ambiental i social.", "Realització d’experiments relacionats amb la naturalesa elèctrica de la matèria, i comprovació i interpretació de les propietats conductores dels materials.", "Disseny, muntatge i anàlisi de circuits elèctrics elementals, tant en un entorn físic com simulat.", "Disseny i comprovació experimental d’hipòtesis relacionades amb l’ús domèstic i industrial de l’energia en les diferents formes i les seves transferències i transformacions.", "Elaboració fonamentada d’hipòtesis sobre el medi ambient i la sostenibilitat a partir de les diferències entre fonts d’energia renovables i no renovables i el seu contrast amb dades reals i la presa argumentada de decisions.", "Anàlisi crítica dels diferents processos d’obtenció d’energia elèctrica, per desenvolupar consciència sobre la necessitat de l’estalvi energètic i la conservació sostenible del medi ambient i la societat."],
        "4t": [],
      },
      "L’energia": {
        "1r-2n-3r": [],
        "4t": ["Formulació i comprovació d’hipòtesis sobre les diferents formes d’energia i les seves aplicacions a partir de les seves propietats i del principi de conservació, per a la resolució de problemes relacionats amb l’energia mecànica en situacions quotidianes i de rellevància social.", "Reconeixement dels diferents processos de transferència d’energia en què estan implicats forces o diferències de temperatura, com a base de la resolució de problemes quotidians.", "Estimació de valors d’energia i consums energètics en situacions quotidianes mitjançant l’aplicació de coneixements, la cerca d’informació contrastada, l’experimentació i el raonament científic per debatre i comprendre la importància de l’energia a la societat i el seu ús responsable."],
      },
      "Interacció": {
        "1r-2n-3r": ["Predicció de les característiques fonamentals del moviment dels objectes a partir dels conceptes de la cinemàtica, per formular hipòtesis sobre valors futurs d’aquestes magnituds, mitjançant l’ús del càlcul numèric elemental, la interpretació de gràfiques i el disseny, muntatge i anàlisi d’activitats experimentals com a eines de contrast de les hipòtesis relacionades amb el moviment dels objectes.", "Diferenciació dels efectes de les forces, com a agents del canvi tant a l’estat de moviment o de repòs d‘un cos, així com productores de deformacions, amb els canvis que produeixen en els sistemes sobre els quals actuen.", "Descripció dels efectes de les forces a partir d’observacions de fenòmens quotidians o de situacions simulades en el laboratori.", "Identificació i comparació de les propietats elàstiques dels materials i relació amb la seva utilització.", "Aplicació de les lleis de Newton per entendre com es comporten els sistemes materials davant l’acció de les forces i predir-ne els efectes en situacions quotidianes i de seguretat viària."],
        "4t": ["Predicció i comprovació, utilitzant l’experimentació i el raonament logicomatemàtic, de les magnituds, equacions i gràfiques principals que descriuen el moviment d’un cos, per relacionar-lo amb situacions quotidianes i la millora de la qualitat de vida.", "Reconeixement de la força com a agent de canvis als cossos que s’aplica a altres camps com el disseny, l’esport o l’enginyeria, entre d’altres.", "Ús de la representació vectorial en gràfics i operacions numèriques amb forces i la seva aplicació a la resolució de problemes relacionats amb sistemes sotmesos a conjunts de forces, i valoració de la seva importància en situacions quotidianes.", "Identificació i representació de les principals forces de l’entorn quotidià, com ara el pes, la normal, el fregament, la tensió o l’empenta, i el seu ús en l’explicació de fenòmens físics en diferents contextos.", "Valoració dels efectes de les forces aplicades en líquids i gasos, i especialment del concepte de pressió, i els seus efectes en diferents situacions."],
      },
      "El canvi": {
        "1r-2n-3r": ["Anàlisi dels diferents tipus de canvis que experimenten els sistemes materials per relacionar-los amb les causes que els produeixen i amb les conseqüències que tenen.", "Diferenciació de canvis físics i canvis químics basant-se en evidències experimentals i en el concepte de substància.", "Interpretació de les reaccions químiques a escala macroscòpica i submicroscòpica per explicar les relacions de la química amb el medi ambient, la tecnologia i la societat.", "Cerca de similituds i diferències entre processos en els quals intervenen àcids i bases, oxidacions i formacions de precipitats i interpretació de les propietats de les substàncies que intervenen en contextos quotidians i d’actualitat.", "Aplicació de la llei de conservació de la massa i de la llei de les proporcions definides, per utilitzar-les com a evidències experimentals, i interpretació sobre la base del model atomicomolecular de la matèria.", "Anàlisi dels factors que afecten les reaccions químiques per predir-ne l’evolució de forma qualitativa i valoració de la contribució de diversos àmbits de la química en la resolució de problemes actuals, al desenvolupament sostenible, a la salut i el benestar i als productes quotidians."],
        "4t": ["Descripció qualitativa de reaccions químiques de l’entorn quotidià, incloent-hi les combustions, les neutralitzacions i els processos electroquímics, comprovant-ne experimentalment alguns dels paràmetres, per fer una valoració de les seves implicacions a la tecnologia, la societat o el medi ambient.", "Utilització de la informació continguda en una equació química ajustada i de les lleis més rellevants de les reaccions químiques per fer prediccions qualitatives i quantitatives per mètodes experimentals i numèrics, i relacionar- ho amb els processos fisicoquímics de la indústria, el medi ambient i la societat.", "Relació de les variables termodinàmiques i cinètiques bàsiques a les reaccions químiques, aplicant models com la teoria de col·lisions, per explicar la reordenació dels àtoms i realitzar prediccions aplicades als processos quotidians més importants."],
      },
    },
  },
  "Ciències Socials: Geografia i Història": {
    name: "Ciències Socials: Geografia i Història",
    courseKeys: ["1r-2n", "3r-4t"],
    courseLabels: {"1r-2n": "1r i 2n ESO", "3r-4t": "3r i 4t ESO"},
    blocs: {
      "Reptes del món actual - Objectius de desenvolupament sostenible": {
        "1r-2n": ["Debat sobre els dilemes del món actual, punt de partida per al pensament crític i el desenvolupament de judicis propis.", "Valoració de les accions, tant individuals com col·lectives, que permeten avançar en la implantació de l’Agenda 2030."],
        "3r-4t": ["Reconeixement dels moviments, causes i lideratges en pro de l’emergència climàtica, la sostenibilitat i l’equitat en diferents moments i llocs del planeta i des de perspectives diverses.", "Identificació dels reptes de desenvolupament sostenible i de les accions que permeten avançar en l’Agenda 2030."],
      },
      "Reptes del món actual - Ubicació espacial": {
        "1r-2n": ["Representació de l’espai, orientació i escales.", "Utilització de recursos digitals i tecnologies de la informació geogràfica (TIG) en l’elaboració i interpretació de mapes, esquemes, imatges i gràfics de diferent tipologia."],
        "3r-4t": [],
      },
      "Reptes del món actual - Emergència climàtica": {
        "1r-2n": ["Reconeixement dels elements i factors que condicionen el clima i el seu impacte sobre les activitats humanes.", "Identificació, prevenció i resiliència de la població davant de les catàstrofes naturals i els efectes del canvi climàtic, tot incidint en els beneficis d’incloure els joves en la gestió dels desastres mediambientals."],
        "3r-4t": [],
      },
      "Reptes del món actual - Biodiversitat, recursos naturals i desigualtat": {
        "1r-2n": ["Identificació dels processos, dinàmiques i amenaces dels ecosistemes planetaris. Valoració de la riquesa i conservació del patrimoni natural.", "Anàlisi de l’acció humana en l’alteració dels ecosistemes i descripció de casos que se’n deriven, especialment en entorns propers, cercant causes i conseqüències.", "Diferenciació dels recursos renovables i no renovables, anàlisi de la seva distribució desigual i identificació d’algunes conseqüències i tensions que se’n deriven."],
        "3r-4t": [],
      },
      "Reptes del món actual - Prevenció de riscos": {
        "1r-2n": ["Identificació dels principals riscos d’origen natural com inundacions, incendis o epidèmies, i d’origen tecnològic, com el nuclear, el químic o la contaminació d’aigües.", "Caracterització de les accions encaminades a prevenir aquests riscos."],
        "3r-4t": [],
      },
      "Reptes del món actual - Tecnologies de la informació i societat del coneixement.": {
        "1r-2n": ["Maneig i utilització segura de dispositius, aplicacions informàtiques i plataformes digitals, valorant les seves aportacions a la geografia i la història.", "Cerca, tractament de la informació i elaboració de coneixement.", "Introducció als objectius i estratègies de les ciències socials i ús dels seus procediments, termes i conceptes en la formació de persones amb capacitat crítica."],
        "3r-4t": [],
      },
      "Reptes del món actual - Desafiaments demogràfics al món actual.": {
        "1r-2n": ["Estudi de la composició i estructures demogràfiques a diferents escales.", "Aplicació dels conceptes bàsics de demografia a la comprensió de dinàmiques demogràfiques actuals i els moviments migratoris, analitzant les seves causes i conseqüències.", "Identificació dels factors que expliquen la desigual distribució de la població i anàlisi dels desafiaments, oportunitats i problemes actuals de viure al camp i a les ciutats."],
        "3r-4t": [],
      },
      "Reptes del món actual - Concentració i distribució de la riquesa.": {
        "1r-2n": ["Representació i maneres de percebre la desigualtat.", "Conscienciació i accions per a l’accés universal als béns bàsics i per a un repartiment just de la riquesa que permeti avançar cap a una societat més equitativa.", "Reflexió sobre la qüestió del mínim vital."],
        "3r-4t": [],
      },
      "Reptes del món actual - Igualtat de gènere.": {
        "1r-2n": ["Valoració i denúncia de situacions discriminatòries de les nenes i de les dones al món.", "Qüestionament dels rols de gènere i la seva manifestació en tots els àmbits de la societat i la cultura, inclòs l’entorn escolar."],
        "3r-4t": [],
      },
      "Reptes del món actual - Consciència global i sostenibilitat.": {
        "1r-2n": [],
        "3r-4t": ["Identificació de les característiques del sistema-món i de la interdependència entre països.", "Relació entre factors naturals i antròpics a la Terra.", "Adquisició d’estils de vida respectuosos amb els recursos, saludables i socialment compromesos."],
      },
      "Reptes del món actual - Tècniques i mètodes de recerca de les ciències socials.": {
        "1r-2n": [],
        "3r-4t": ["Anàlisi de textos, interpretació i elaboració de mapes, esquemes i síntesis, representació de gràfics i interpretació d’imatges a través de mitjans digitals accessibles.", "Aplicació de tècniques d’informació geogràfica i d’anàlisi espacial en la interpretació d’alguns fenòmens.", "Ús de mitjans, gèneres i formats digitals diversos per crear continguts i comunicar resultats de recerques."],
      },
      "Reptes del món actual - Societat de la informació i cultura mediàtica.": {
        "1r-2n": [],
        "3r-4t": ["Cerca, tractament de la informació, ús de dades en entorns digitals, interpretació de les fonts i avaluació de la fiabilitat.", "Anàlisi i valoració dels arguments que sustenten es diferents posicionaments davant de fets i fenòmens.", "Identificació de les notícies falses i enganyoses.", "Ús de mitjans audiovisuals per crear produccions personals i col·lectives i comunicar recerques."],
      },
      "Reptes del món actual - Migracions i interculturalitat.": {
        "1r-2n": [],
        "3r-4t": ["Reconeixement dels factors de diversitat social, etnicocultural i de gènere i la seva contribució a la cultura i a la societat.", "Identificació de les característiques de les cultures originàries d’indrets sotmesos a la dominació i a l’aculturació.", "Participació en activitats que promoguin actituds de respecte envers persones i col·lectius per mitjà del diàleg i d’una aproximació intercultural."],
      },
      "Reptes del món actual - Global i local.": {
        "1r-2n": [],
        "3r-4t": ["Aplicació dels mètodes de recerca de les ciències socials en l’anàlisi problematitzada i multicausal de fenòmens de l’entorn i dels seus vincles amb fenòmens globals.", "Establiment d’anàlisis comparades de l’espai natural, rural i urbà, la seva evolució i els reptes de futur."],
      },
      "Reptes del món actual - Economia i sostenibilitat.": {
        "1r-2n": [],
        "3r-4t": ["Identificació de les estructures econòmiques al món actual, els canvis dels sectors productius i el funcionament del mercat.", "Reconeixement dels límits del creixement econòmic i les desigualtats generades en l’àmbit global i local.", "Proposta d’alternatives des d’una perspectiva ecosocial.", "Caracterització de les energies renovables i de l’economia circular."],
      },
      "Reptes del món actual - Desigualtats i justícia social.": {
        "1r-2n": [],
        "3r-4t": ["Identificació de les desigualtats i injustícies en el context local i global.", "Participació en projectes que promoguin el respecte i la solidaritat amb persones i col·lectius desfavorits de l’entorn i la cohesió social."],
      },
      "Reptes del món actual - Geopolítica, conflictes i cultura de la pau.": {
        "1r-2n": [],
        "3r-4t": ["Identificació dels focus de conflicte en el món actual i les seves causes, així com de les conseqüències del comerç d’armes.", "Valoració del diàleg i de la cooperació com a formes pacífiques de resolució de conflictes.", "Col·laboració en la prevenció i resolució de conflictes des d’un enfocament restauratiu en entorns escolars i comunitaris."],
      },
      "Reptes del món actual - Equitat de gènere i d’opcions afectivosexuals.": {
        "1r-2n": [],
        "3r-4t": ["Reconeixement dels moviments, causes i lideratges en pro de l’equitat de gènere i d’opció afectivosexual.", "Participació en debats i projectes per a l’eliminació de les desigualtats, discriminacions i violències."],
      },
      "Societats i territoris - Mètodes de les ciències socials": {
        "1r-2n": ["Recerca i metodologies per a la construcció del coneixement de les ciències socials.", "Identificació i ús de les fonts històriques, arqueològiques i geogràfiques i la seva valoració com a patrimoni col·lectiu.", "Participació en projectes conjuntament amb arxius, biblioteques i museus."],
        "3r-4t": [],
      },
      "Societats i territoris - Cronologia i temps històric.": {
        "1r-2n": ["Construcció i interpretació de línies del temps.", "Aplicació de les variables històriques de canvi, continuïtat i simultaneïtat per a la comprensió de l’evolució de la humanitat com un procés no lineal."],
        "3r-4t": [],
      },
      "Societats i territoris - Origen de la humanitat.": {
        "1r-2n": ["Anàlisi multidisciplinària de l’origen de l’ésser humà i del sorgiment de les primeres formes d’organització social.", "Estudi de les grans migracions humanes i el naixement de les primeres cultures."],
        "3r-4t": [],
      },
      "Societats i territoris - Primeres civilitzacions.": {
        "1r-2n": ["Interpretacions històriques del sorgiment de les civilitzacions i la influència dels condicionants geogràfics.", "Reconeixement de les grans rutes comercials i les estratègies pel control dels recursos a l’antiguitat."],
        "3r-4t": [],
      },
      "Societats i territoris - Origen i evolució de l’organització social.": {
        "1r-2n": ["Valoració de les desigualtats socials i les disputes pel poder des de l’antiguitat i en diferents contextos històrics.", "Anàlisi de formes d’organització política del món antic, medieval i modern: democràcies, repúbliques, imperis i regnes.", "Interpretació de la seva evolució i comparació entre algunes formes d’organització política, incidint en els aspectes referits a la desigualtat entre els grups socials."],
        "3r-4t": [],
      },
      "Societats i territoris - Les arrels de la cultura occidental.": {
        "1r-2n": ["Identificació del llegat cultural del món clàssic, del judeocristià i de la civilització islàmica i valoració de les seves aportacions a Europa.", "Anàlisi de les petjades d’aquest llegat en el patrimoni material i immaterial."],
        "3r-4t": [],
      },
      "Societats i territoris - Religió i organització social.": {
        "1r-2n": ["Anàlisi de les relacions entre religió i poder en el context del sorgiment de les grans religions politeistes i monoteistes, així com el paper de l’Església en la configuració de cultures i mentalitats.", "Descripció de les persecucions i conflictes per motius religiosos i ideològics, i paral·lelismes amb fets o situacions de l’actualitat."],
        "3r-4t": [],
      },
      "Societats i territoris - Evolució dels sistemes econòmics i dels models d’organització social.": {
        "1r-2n": ["Valoració crítica de la distribució desigual dels recursos i del treball des de la prehistòria fins a l’edat moderna.", "Comparació amb situacions i fets de l’actualitat."],
        "3r-4t": [],
      },
      "Societats i territoris - Territori i paisatge.": {
        "1r-2n": ["Anàlisi de l’evolució de la ciutat i el món rural al llarg de la història.", "Valoració i conservació dels components ambientals, històrics, artístics i culturals del paisatge."],
        "3r-4t": [],
      },
      "Societats i territoris - Violència i conflictes armats.": {
        "1r-2n": ["Identificació de les causes i conseqüències d’alguns conflictes en diferents èpoques històriques.", "Valoració de la necessitat de trobar solucions dialogades als problemes."],
        "3r-4t": [],
      },
      "Societats i territoris - L’ampliació del món conegut i les civilitzacions no europees.": {
        "1r-2n": ["Contextualització dels grans viatges, descobriments i sistemes d’intercanvi en l’edat moderna.", "Reflexió sobre la geopolítica i les disputes per l’hegemonia, incidint en les seves conseqüències.", "Valoració crítica de la visió eurocèntrica del món."],
        "3r-4t": [],
      },
      "Societats i territoris - Les persones invisibilitzades de la història.": {
        "1r-2n": ["Conscienciació sobre la marginació, segregació, control i submissió de les dones, els esclaus i altres col·lectius en la història de la humanitat.", "Posada en valor del protagonisme individual i col·lectiu de les dones al llarg de la història.", "Reconeixement de la resistència a l’opressió com a dret fonamental dels pobles."],
        "3r-4t": [],
      },
      "Societats i territoris - Evolució de les expressions artístiques i culturals.": {
        "1r-2n": ["Anàlisi i valoració de la diversitat i riquesa de les expressions artístiques i culturals a partir de fonts diverses i de l’observació directa i indirecta dels estils i obres.", "Conscienciació sobre el respecte i conservació del patrimoni material i immaterial."],
        "3r-4t": [],
      },
      "Societats i territoris - Ciència, medicina i avenços tecnològics.": {
        "1r-2n": ["Reconeixement de la lluita contra epidèmies i pandèmies, i comparació amb fets i situacions de l’actualitat.", "Contrast i anàlisi crítica de les supersticions i desinformacions davant les explicacions racionals i empíriques."],
        "3r-4t": [],
      },
      "Societats i territoris - El llegat històric.": {
        "1r-2n": ["Reflexió sobre la construcció d’identitats a partir de l’herència cultural i els processos històrics viscuts en una comunitat i territori.", "Aplicació dels coneixements històrics a la comprensió i identificació d’alguns dels problemes de l’actualitat."],
        "3r-4t": [],
      },
      "Societats i territoris - Recerca en les ciències socials.": {
        "1r-2n": [],
        "3r-4t": ["Aplicació de metodologies de recerca en l’anàlisi i interpretació de problemes socials rellevants, individualment i en equip.", "Comunicació argumentada dels resultats obtinguts.", "Ús específic del lèxic relatiu als àmbits històric, artístic i geogràfic."],
      },
      "Societats i territoris - Fiabilitat de les fonts.": {
        "1r-2n": [],
        "3r-4t": ["Ús de fonts històriques i geogràfiques per a la construcció del coneixement sobre el passat recent i fenòmens actuals.", "Contrast i valoració crítica d’informacions diferents, incloses les dels mitjans de comunicació, sobre un mateix fet o fenomen, valorant solucions i alternatives als problemes."],
      },
      "Societats i territoris - Consciència històrica.": {
        "1r-2n": [],
        "3r-4t": ["Elaboració de judicis propis i argumentats davant de problemes d’actualitat contextualitzats històricament, i defensa i exposició crítica a través de presentacions i debats.", "Establiment de relacions entre la cronologia històrica general i la història familiar, comunitària i local."],
      },
      "Societats i territoris - Transformació i revolució.": {
        "1r-2n": [],
        "3r-4t": ["Anàlisi de les permanències i canvis a l’època contemporània.", "Interpretació de les transicions, revolucions i resistències a la Catalunya i l’Espanya contemporànies i els seus lligams internacionals."],
      },
      "Societats i territoris - La construcció de les democràcies.": {
        "1r-2n": [],
        "3r-4t": ["Establiment de relacions multicausals en la construcció de les democràcies modernes i els orígens dels totalitarismes en el segle XX: la lluita per la llibertat, la igualtat i els drets humans.", "Interpretació dels processos d’evolució i d’involució i dels reptes pendents de l’actual democràcia."],
      },
      "Societats i territoris - Sistemes econòmics i desigualtat.": {
        "1r-2n": [],
        "3r-4t": ["Interpretació dels fonaments del sistema capitalista i la seva relació amb el colonialisme i l’imperialisme.", "Anàlisi crítica de les noves formes de subordinació econòmica i cultural.", "Identificació de les principals fites de les lluites socials i laborals contemporànies i els reptes pendents de l’estat del benestar."],
      },
      "Societats i territoris - Població, territori i recursos.": {
        "1r-2n": [],
        "3r-4t": ["Interpretació de les transformacions del territori per l’acció humana i la distribució desigual dels recursos i del treball.", "Anàlisi dels cicles demogràfics mundials i locals i de les migracions al llarg de la història i en el món actual."],
      },
      "Societats i territoris - Paisatge i territori.": {
        "1r-2n": [],
        "3r-4t": ["Interpretació de les transformacions del territori i del paisatge a Catalunya i Espanya: causes de la despoblació i de la concentració urbana i conseqüències de la petjada humana.", "Actitud proactiva en la preservació dels paisatges i reconeixement dels programes de protecció.", "Identificació dels reptes en la gestió del territori a Catalunya."],
      },
      "Societats i territoris - Sostenibilitat i producció d’aliments.": {
        "1r-2n": [],
        "3r-4t": ["Reconeixement dels factors implicats en el canvi climàtic, les seves conseqüències i de les mesures per revertir-lo a escala global i local.", "Conceptualització de la sobirania alimentària, valorant el consum responsable i de proximitat.", "Establiment de relacions entre l’equitat i el desenvolupament sostenible."],
      },
      "Societats i territoris - Conflictes i violències al món actual.": {
        "1r-2n": [],
        "3r-4t": ["Establiment de relacions causals en alguns conflictes i violències del segle XX i XXI i de les seves conseqüències en el present.", "Caracterització dels genocidis i dels crims contra la humanitat.", "Valoració de la cultura de la pau i de la mediació com a formes de gestió dels conflictes."],
      },
      "Societats i territoris - Geopolítica i globalització.": {
        "1r-2n": [],
        "3r-4t": ["Identificació dels fonaments geoestratègics des de la segona meitat del segle XX fins a l’actualitat: la política de blocs, els conflictes de la descolonització i el paper dels organismes internacionals.", "Valoració de la interdependència dins el sistema-món."],
      },
      "Societats i territoris - Catalunya i Espanya a l’època contemporània.": {
        "1r-2n": [],
        "3r-4t": ["Contextualització de les principals transformacions polítiques, econòmiques, socials i culturals, incidint en la Segona República, la guerra, el franquisme i la transició democràtica.", "Identificació de les lluites i moviments socials i d’emancipació nacional."],
      },
      "Societats i territoris - Perspectiva de gènere.": {
        "1r-2n": [],
        "3r-4t": ["Identificació dels moviments, causes i lideratges que treballen per a l’equitat i la no discriminació per raó de gènere i d’opció afectiva i sexual al llarg dels segles XX i XXI.", "Reconeixement de les aportacions de les dones en diferents àmbits socials, culturals, artístics, econòmics i polítics."],
      },
      "Societats i territoris - Cultura, arts i patrimoni.": {
        "1r-2n": [],
        "3r-4t": ["Caracterització d’algunes manifestacions artístiques i culturals que conformen la diversitat del món actual.", "Actitud proactiva i respectuosa per la conservació del patrimoni material i immaterial de l’entorn.", "Coneixement dels espais i organismes que vetllen per la conservació i difusió dels elements del patrimoni natural i artisticocultural."],
      },
      "Societats i territoris - Salut, ciència i tecnologia.": {
        "1r-2n": [],
        "3r-4t": ["Descobriment de les grans fites en la transformació científica i tecnològica.", "Establiment de relacions entre la ciència i la tecnologia, la dimensió ètica i social i la sostenibilitat.", "Identificació dels reptes de la societat de la informació i de la seva relació amb els canvis culturals i socials.", "Reconeixement del dret individual i col·lectiu a la salut i al benestar."],
      },
      "Societats i territoris - La Unió Europea dins el món.": {
        "1r-2n": [],
        "3r-4t": ["Caracterització dels principals fets del procés de constitució de la Unió Europea i de les seves institucions.", "Identificació dels reptes de la Unió Europea dins el sistema-món.", "Participació en projectes amb estudiants de països europeus."],
      },
      "Societats i territoris - Normes i lleis per garantir els drets individuals i col·lectius.": {
        "1r-2n": [],
        "3r-4t": ["Coneixement dels principals ordenaments jurídics d’àmbit autonòmic, estatal, europeu i internacional com a garants de drets i llibertats per a l’exercici de la ciutadania."],
      },
      "Societats i territoris - La memòria democràtica.": {
        "1r-2n": [],
        "3r-4t": ["Distinció i complementarietat entre la història i la memòria.", "Preservació de les memòries plurals de persones i col·lectius de l’entorn proper.", "Valoració de la funció de la memòria històrica en la construcció del futur."],
      },
      "Compromís cívic - Dignitat humana i drets universals.": {
        "1r-2n": ["Reconeixement dels drets i deures individuals i col·lectius, identificant i rebutjant les situacions de desigualtat, injustícia i discriminació.", "Comparació dels drets de l’infant actuals amb la situació dels infants i joves en altres èpoques històriques."],
        "3r-4t": ["Identificació de les principals fites en la Declaració Universal dels Drets Humans i dels reptes pendents.", "Debat dels problemes que afecten la dignitat de les persones, superant estereotips i prejudicis."],
      },
      "Compromís cívic - Alteritat.": {
        "1r-2n": ["Respecte i acceptació de l’altre, incorporant visions i perspectives contraposades d’un relat o d’una interpretació.", "Defensa de comportaments no discriminatoris i contraris a qualsevol actitud diferenciadora i segregadora."],
        "3r-4t": [],
      },
      "Compromís cívic - Igualtat de gènere.": {
        "1r-2n": ["Reconeixement i denúncia del masclisme en la història i l’actualitat.", "Posicionament a favor de manifestacions i conductes no sexistes."],
        "3r-4t": [],
      },
      "Compromís cívic - Convivència cívica i cultura democràtica.": {
        "1r-2n": ["Identificació dels trets fonamentals de les societats democràtiques, valorant les consecucions de la democràcia com a sistema polític.", "Participació en projectes comunitaris de l’entorn, mostrant empatia i accions de suport a col·lectius en situacions de pobresa, vulnerabilitat i exclusió social.", "Interès davant els reptes i problemes d’actualitat a l’àmbit local i global, deixant-ne constància mitjançant produccions diverses."],
        "3r-4t": [],
      },
      "Compromís cívic - Consciència ambiental.": {
        "1r-2n": ["Implicació en la defensa de la biodiversitat i la protecció del medi ambient.", "Recerca d’actuacions orientades a aconseguir una mobilitat sostenible."],
        "3r-4t": [],
      },
      "Compromís cívic - Conservació i defensa del patrimoni històric, artístic i cultural.": {
        "1r-2n": ["Compromís per la defensa i preservació del llegat artístic i cultural, distingint-ne la diversitat, així com de la memòria històrica en la seva pluralitat."],
        "3r-4t": [],
      },
      "Compromís cívic - Les xarxes socials.": {
        "1r-2n": ["Conscienciació sobre la seguretat i prevenció dels riscos i perills de l’ús de les tecnologies de la informació i de la comunicació.", "Reflexió sobre les maneres de participar en les xarxes socials."],
        "3r-4t": [],
      },
      "Compromís cívic - Gestió de les emocions.": {
        "1r-2n": ["Identificació de les emocions pròpies i dels altres, i la seva importància en comportaments individuals i col·lectius."],
        "3r-4t": [],
      },
      "Compromís cívic - Ús del temps de lleure i hàbits de salut i de consum.": {
        "1r-2n": ["Caracterització i reflexió sobre diferents formes de vida i l’ús del temps de lleure en el passat i en el present, i reconeixement d’hàbits saludables."],
        "3r-4t": [],
      },
      "Compromís cívic - Pluralitat i riquesa culturals.": {
        "1r-2n": [],
        "3r-4t": ["Reconeixement del concepte plurinacional de l’estat i de la necessitat de preservació de les llengües i les cultures com a font de riquesa compartida."],
      },
      "Compromís cívic - Cultura i inclusió.": {
        "1r-2n": [],
        "3r-4t": ["Participació en mesures i accions a favor de la igualtat i de la plena inclusió.", "Actitud oberta i receptiva davant de formes culturals diverses i, en especial, de col·lectius minoritzats"],
      },
      "Compromís cívic - Equitat de gènere.": {
        "1r-2n": [],
        "3r-4t": ["Reconeixement de les principals fites en la lluita per la igualtat real de dones i homes i dels marcs legislatius.", "Identificació dels principals motius de discriminació per raó de sexe i d’orientació sexual a Catalunya i Espanya.", "Posicionament de rebuig de la violència masclista, homòfoba i transfòbica."],
      },
      "Compromís cívic - Ciutadania i compromís cívic.": {
        "1r-2n": [],
        "3r-4t": ["Ús de la mediació i de la gestió pacífica dels conflictes en l’àmbit escolar i comunitari.", "Col·laboració en projectes de l’entorn proper que lluitin per l’equitat i la no discriminació.", "Reconeixement del caràcter inacabat de la lluita pels drets humans i la democràcia."],
      },
      "Compromís cívic - Responsabilitat ecosocial.": {
        "1r-2n": [],
        "3r-4t": ["Assumpció de compromisos davant dels objectius del desenvolupament sostenible per mitjà d’accions que generin valor afegit.", "Implicació en la defensa i la protecció del medi ambient i dels paisatges a través de la participació en projectes comunitaris i en la difusió de les accions."],
      },
      "Compromís cívic - El patrimoni cultural i artístic.": {
        "1r-2n": [],
        "3r-4t": ["Participació en accions de posada en valor i difusió del patrimoni local amb actitud col·laborativa i emprenedora."],
      },
      "Compromís cívic - Ciutadania ètica digital.": {
        "1r-2n": [],
        "3r-4t": ["Reflexió crítica sobre les oportunitats i els reptes de la societat de la informació i de les xarxes socials.", "Ús responsable, col·laboratiu i ètic de les plataformes virtuals.", "Actitud oberta a l’aprenentatge permanent al llarg de la vida."],
      },
      "Compromís cívic - Benestar i sensibilitat.": {
        "1r-2n": [],
        "3r-4t": ["Expressió de les emocions a partir d’un concepte assertiu sobre la pròpia imatge i de la sensibilitat i el respecte per la diversitat.", "Superació dels estereotips i els prejudicis i actitud oberta per incorporar les experiències i sabers dels altres.", "Consolidació d’hàbits de salut física i mental, individuals i col·lectius."],
      },
      "Compromís cívic - Les cures i la comunitat.": {
        "1r-2n": [],
        "3r-4t": ["Assumpció de responsabilitats individuals i col·lectives per contribuir a la cura i al benestar dels membres de la comunitat escolar i de l’entorn.", "Participació en activitats intergeneracionals i de voluntariat."],
      },
    },
  },
  "Llengua Catalana i Literatura": {
    name: "Llengua Catalana i Literatura",
    courseKeys: ["1r-2n", "3r-4t"],
    courseLabels: {"1r-2n": "1r i 2n ESO", "3r-4t": "3r i 4t ESO"},
    blocs: {
      "Les llengües i els seus parlants": {
        "1r-2n": ["Observació de la pròpia biografia lingüística i de la diversitat lingüística de centre, i comprensió de les famílies lingüístiques i les llengües del món, els sistemes d’escriptura i nocions bàsiques: fórmules de salutació i comiat, agraïment i disculpa, en situacions de l’àmbit escolar i la vida quotidiana.", "Reconeixement de les llengües d’Espanya, el seu origen i distribució geogràfica, amb especial atenció a les diferències entre plurilingüisme i diversitat dialectal, parant especial atenció al context de Catalunya.", "Aproximació a les llengües de signes en el context de l’aula i la vida quotidiana.", "Comparació de trets de les principals varietats dialectals del català i del castellà, amb especial atenció a la del propi territori.", "Iniciació a la reflexió interlingüística en el context de la matèria.", "Identificació de prejudicis i estereotips lingüístics i formulació de formes d’evitar-los, tant a l’aula com a la vida quotidiana de l’alumnat i els mitjans de comunicació."],
        "3r-4t": ["Anàlisi de la pròpia biografia lingüística i de la diversitat lingüística del centre i de la localitat.", "Anàlisi del desenvolupament sociohistòric de les llengües d’Espanya, amb especial atenció a la llengua catalana, per a la comprensió de la realitat plurilingüe i pluricultural.", "Comparació i contrastació dels trets propis de les varietats dialectals (fònics, gramaticals i lèxics) i els relatius als sociolectes i els registres que permetin la comprensió de la realitat plurilingüe i pluricultural i el respecte a aquesta diversitat.", "Desenvolupament de la reflexió interlingüística en el context de la matèria.", "Exploració i qüestionament de prejudicis i estereotips lingüístics, especialment en els fenòmens de contacte entre llengües: bilingüisme, préstecs, interferències; diglòssia lingüística i diglòssia dialectal, que permetin la comprensió de la realitat plurilingüe i pluricultural i el respecte a aquesta diversitat.", "Indagació entorn dels drets lingüístics i la seva expressió en lleis i declaracions institucionals."],
      },
      "Comunicació - Context": {
        "1r-2n": ["Anàlisi dels components de fet comunicatiu: grau de formalitat de la situació i caràcter públic o privat; distància social entre els interlocutors; propòsits comunicatius i interpretació d’intencions; canal de comunicació i elements no verbals de la comunicació, en situacions d’aula, de la vida quotidiana i dels mitjans de comunicació."],
        "3r-4t": [],
      },
      "Comunicació - Gèneres discursius": {
        "1r-2n": ["Detecció, anàlisi i ús de gèneres discursius de l’àmbit personal (conversa); educatiu de caràcter narratiu, descriptiu, dialogat i expositiu, d’acord amb les propietats textuals (adequació, coherència, cohesió i correcció), i social, parant especial atenció a les xarxes socials i mitjans de comunicació; respecte a l’etiqueta digital; avaluació de riscos de desinformació, manipulació i vulneració de la privacitat a la xarxa. Anàlisi de la imatge i elements paratextuals dels textos icònics, verbals i multimodals."],
        "3r-4t": [],
      },
      "Comunicació - Processos": {
        "1r-2n": ["Interacció oral i escrita de caràcter informal. Consciència i ús dels actes de prendre i deixar la paraula, de la cooperació conversacional i la cortesia lingüística; de l’escolta activa, l’assertivitat i la resolució dialogada dels conflictes en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Comprensió del sentit global del text oral i relació entre les seves parts, selecció i retenció de la informació rellevant. Detecció i rebuig d’usos discriminatoris del llenguatge verbal i no verbal. en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Planificació i recerca d’informació, textualització i revisió de la producció oral formal. Adequació a l’audiència i al temps d’exposició. Detecció i utilització d’elements no verbals. Anàlisi i ús dels trets discursius i lingüístics de l’oralitat formal, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Comprensió del sentit global del text escrit i relació entre les parts. La intenció de l’emissor. Detecció d’usos discriminatoris del llenguatge verbal i icònic, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Planificació, redacció, revisió i edició en diferents suports de textos escrits. Correcció gramatical i ortogràfica. Propietat lèxica. Usos de l’escriptura per a l’organització del pensament: presa de notes, esquemes, mapes conceptuals, definicions, resums, etc., en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Cerca i selecció de la informació amb criteris de fiabilitat, qualitat i pertinència; anàlisi, valoració, reorganització i síntesi de la informació en esquemes propis i transformació en coneixement; comunicació i difusió de manera creativa i respectuosa amb la propietat intel·lectual. Utilització de plataformes virtuals per a la realització de projectes escolars."],
        "3r-4t": ["Interacció oral i escrita de caràcter informal. Prendre i deixar la paraula. Cooperació conversacional i cortesia lingüística. Escolta activa, assertivitat i resolució dialogada dels conflictes, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Comprensió del sentit global del text oral i relació entre les seves parts, selecció i retenció de la informació rellevant. La intenció de l’emissor. Detecció d’usos discriminatoris del llenguatge verbal i no verbal. Valoració de la forma i el contingut del text, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Planificació i recerca d’informació, textualització i revisió en la producció oral formal. Adequació a l’audiència i al temps d’exposició. Detecció i utilització d’elements no verbals. Anàlisi i ús dels trets discursius i lingüístics de l’oralitat formal, amb especial atenció a la deliberació oral argumentada, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Comprensió del sentit global del text escrit i relació entre les parts. La intenció de l’emissor. Detecció i rebuig d’usos discriminatoris del llenguatge verbal i icònic. Valoració de la forma i el contingut del text, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Planificació, redacció, revisió i edició en diferents suports de textos escrits. Usos de l’escriptura per a l’organització del pensament: presa de notes, esquemes, mapes conceptuals, definicions, resums, etc., en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Cerca i selecció de la informació amb criteris de fiabilitat, qualitat i pertinència; anàlisi, valoració, reorganització i síntesi de la informació en esquemes propis i transformació en coneixement; comunicació i difusió de manera creativa i respectuosa amb la propietat intel·lectual. Utilització de plataformes virtuals per a la realització de projectes escolars."],
      },
      "Comunicació - Reconeixement i ús discursiu dels elements lingüístics": {
        "1r-2n": ["Reconeixement, anàlisi i ús discursiu dels elements lingüístics amb especial atenció als recursos lingüístics per mostrar la implicació de l’emissor en els textos: formes de dixi (personal, temporal i espacial) i procediments de modalització; recursos lingüístics per adequar el registre a la situació de comunicació; mecanismes de cohesió; connectors textuals temporals, explicatius, d’ordre i de contrast; mecanismes de referència interna gramaticals (substitucions pronominals) i lèxics (repeticions, sinònims, hiperònims i el·lipsis); coherència de les formes verbals en els textos; els temps de pretèrit en la narració; correlació temporal en el discurs relatat, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Correcció lingüística i revisió ortogràfica i gramatical de diferents tipus de text i en diferents situacions. Ús de diccionaris, manuals de consulta i de correctors ortogràfics en suport analògic o digital per a la correcció i millora dels textos.", "Ús dels signes bàsics de puntuació com a mecanisme organitzador del text escrit, la seva relació amb el significat."],
        "3r-4t": ["Reconeixement, anàlisi i ús discursiu, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques, dels elements lingüístics amb especial atenció a l’expressió de la subjectivitat en textos de caràcter expositiu i argumentatiu; la identificació i ús de les variacions de les formes díctiques (fórmules de confiança i cortesia) en relació amb situacions de comunicació diverses; recursos lingüístics per adequar el registre a la situació de comunicació; procediments explicatius bàsics: l’aposició i les oracions de relatiu; mecanismes de cohesió: connectors textuals distributius, d’ordre, contrast, explicació, causa, conseqüència, condició i hipòtesi; mecanismes de referència interna, gramaticals i lèxics (nominalitzacions i hiperònims de significat abstracte); coherència de les formes verbals en els textos; correlació temporal en la coordinació i subordinació d’oracions, i en el discurs relatat.", "Correcció lingüística i revisió ortogràfica i gramatical dels textos. Ús de diccionaris, manuals de consulta i de correctors ortogràfics en suport analògic o digital per a la correcció i millora dels textos.", "Ús dels signes de puntuació com a mecanisme organitzador del text escrit, la seva relació amb el significat."],
      },
      "Comunicació - Context: components de fet comunicatiu": {
        "1r-2n": [],
        "3r-4t": ["Anàlisi dels components de fet comunicatiu: grau de formalitat de la situació i caràcter públic o privat; distància social entre els interlocutors; propòsits comunicatius i interpretació d’intencions; canal de comunicació i elements no verbals de la comunicació, en situacions d’aula, de la vida quotidiana i dels mitjans de comunicació."],
      },
      "Comunicació - Els gèneres discursius": {
        "1r-2n": [],
        "3r-4t": ["Detecció, anàlisi i ús de gèneres discursius de l’àmbit personal (conversa, amb especial atenció als actes de parla que amenacen la imatge de l’interlocutor (la discrepància, la queixa, l’ordre, la reprovació); educatiu de caràcter expositiu i argumentatiu, d’acord amb les propietats textuals (adequació, coherència, cohesió i correcció), i social, parant especial atenció a les xarxes socials i mitjans de comunicació; respecte a l’etiqueta digital; avaluació de riscos de desinformació, manipulació i vulneració de la privacitat a la xarxa. Anàlisi de la imatge i elements paratextuals dels textos icònics, verbals i multimodals."],
      },
      "Educació literària - Lectura autònoma": {
        "1r-2n": ["Implicació en la lectura de manera progressivament autònoma a partir d’una preselecció de textos variats que incloguin obres d’autores i autors. Reflexió sobre els textos i sobre la pròpia pràctica de lectura sustentada en models.", "Selecció d’obres variades que incloguin autores i autors de manera orientada a partir de l’exploració guiada de la biblioteca escolar i pública disponible.", "Participació activa en actes culturals vinculats al circuit literari i lector.", "Aplicació d’estratègies de presa de consciència dels propis gustos i identitat lectora, en l’àmbit personal i social (lectures compartides).", "Expressió, a través de models comentats a l’aula o bé aportats per l’alumnat, de l’experiència lectora i de diferents formes d’apropiació i recreació dels textos llegits.", "Aplicació d’estratègies de mobilització de l’experiència personal i lectora que permetin establir vincles entre l’obra llegida i aspectes de l’actualitat, així com amb altres textos i manifestacions artístiques, en l’àmbit personal i en conversa a l’aula.", "Aplicació d’estratègies per a la recomanació de les lectures, en suports variats o bé oralment entre iguals."],
        "3r-4t": ["Implicació en la lectura de manera progressivament autònoma i reflexió sobre els textos llegits i sobre la pròpia pràctica de lectura.", "Selecció, de manera progressivament autònoma, d’obres variades que incloguin autores i autors a partir de la utilització autònoma de la biblioteca escolar i pública disponible.", "Participació activa en actes culturals vinculats al circuit literari i lector.", "Aplicació d’estratègies de presa de consciència i verbalització dels propis gustos i identitat lectora en l’àmbit personal i social (lectures compartides).", "Expressió de l’experiència lectora i de diferents formes d’apropiació i recreació dels textos llegits, en el context personal i social (converses a l’aula).", "Aplicació d’estratègies de mobilització de l’experiència personal, lectora i cultural que permetin establir vincles de manera argumentada entre l’obra llegida i aspectes de l’actualitat, així com amb altres textos i manifestacions artístiques.", "Aplicació d’estratègies per a la recomanació de les lectures en suports variats o bé oralment entre iguals, emmarcant de manera bàsica les obres en els gèneres i subgèneres literaris."],
      },
      "Educació literària - Lectura guiada": {
        "1r-2n": ["Lectura d’obres rellevants de la literatura juvenil contemporània i del patrimoni literari universal, inscrites en itineraris temàtics o de gènere, que incloguin la presència d’autores i autors, en el context de l’aula i de l’entorn proper que permeti fer la transferència a altres situacions de caràcter literari i cultural amb vincles amb la pròpia vida.", "Aplicació d’estratègies i models de construcció compartida de la interpretació de les obres a través de converses literàries, clubs de lectura i canals de difusió com revistes, blogs o clips audiovisuals.", "Relació i contrast entre els elements constitutius del gènere literari i la construcció del sentit de l’obra. Anàlisi bàsica del valor dels recursos expressius; els seus efectes en la recepció.", "Relació i comparació dels textos llegits amb altres textos, amb altres manifestacions artístiques i amb les noves formes de ficció en funció de gèneres, temes, tòpics, estructures i llenguatges. Gèneres: novel·la, narració breu, teatre, poesia, assaig, etc. Temes: amor, amistat, mort, viatge, etc. Tòpics: carpe diem, tempus fugit, locus amoenus, captatio benevolentiae, ubi sunt, etc.", "Aplicació d’estratègies, models i pautes per a l’expressió de la interpretació i valoració personal d’obres i fragments literaris, a través de processos i suports diversificats i tenint en compte la perspectiva de gènere.", "Lectura expressiva, dramatització i recitació dels textos atenent als processos de comprensió, apropiació i oralització implicats.", "Creació de textos a partir de l’apropiació de les convencions del llenguatge literari i en referència a models donats (imitació, transformació, continuació, etc.) en el context de l’expressió dels sentiments, emocions i experiències pròpies."],
        "3r-4t": ["Lectura d’obres rellevants del patrimoni literari nacional i universal i de la literatura actual inscrites en itineraris temàtics o de gènere, que incloguin la presència d’autores i autors, en el context de l’aula i de l’entorn proper, i que permetin fer la transferència a altres situacions de caràcter literari i cultural amb vincles amb la pròpia vida. Gèneres: novel·la, narració breu, teatre, poesia, etc. Temes: amor, amistat, mort, viatge, etc. Tòpics: carpe diem, tempus fugit, locus amoenus, captatio benevolentiae, ubi sunt, etc.", "Aplicació d’estratègies de construcció compartida de la interpretació de les obres a través de discussions, converses literàries, clubs de lectura i canals de difusió com revistes, blogs o clips audiovisuals.", "Relació i contrast entre els elements constitutius del gènere literari i la construcció del sentit de l’obra. Anàlisi dels efectes dels seus recursos expressius en la recepció.", "Aplicació d’estratègies d’utilització d’informació sociohistòrica, cultural i artística bàsica que permetin construir la interpretació de les obres literàries.", "Relació i comparació dels textos llegits amb altres textos orals, escrits o multimodals, amb altres manifestacions artístiques i amb les noves formes de ficció en funció de temes, tòpics, estructures i llenguatges. Elements de continuïtat i ruptura.", "Aplicació d’estratègies per interpretar obres i fragments literaris a partir de la integració dels diferents aspectes analitzats i atenent els valors culturals, ètics i estètics presents en els textos, així com la lectura amb perspectiva de gènere.", "Indagació al voltant de les obres llegides que promoguin l’interès per construir la interpretació de les obres i establir connexions entre textos.", "Lectura expressiva, dramatització i recitació dels textos atenent als processos de comprensió, apropiació i oralització implicats.", "Creació de textos a partir de l’apropiació de les convencions del llenguatge literari i en referència a models donats (imitació, transformació, continuació, etc.) en el context de l’expressió dels sentiments, emocions i experiències pròpies."],
      },
      "Reflexió sobre la llengua": {
        "1r-2n": ["Aplicació d’estratègies per a la construcció guiada de conclusions pròpies sobre el sistema lingüístic. Observació, comparació i classificació d’unitats comunicatives. Experimentació amb estructures, formulació d’hipòtesis, contraexemples, generalitzacions i contrast entre llengües, utilitzant el metallenguatge específic, en el marc de la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Observació i comparació de les diferències rellevants i interseccions entre llengua oral i llengua escrita atenent a aspectes sintàctics, lèxics i pragmàtics. per a la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Comprensió i anàlisi de la llengua com a sistema i de les seves unitats bàsiques tenint en compte els diferents nivells: el so i sistema d’escriptura, les paraules (forma i significat), la seva organització en el discurs (ordre de les paraules, components de les oracions o connexió entre els significats), per a la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Distinció entre la forma (categoria gramatical) i la funció de les paraules (funcions sintàctiques), i coneixement dels procediments lèxics (afixos) i sintàctics per al canvi de categoria en situacions de comprensió i expressió de textos orals i escrits.", "Relació entre els esquemes semàntic i sintàctic de l’oració simple. Observació i transformació d’enunciats d’acord amb aquests esquemes i ús de la terminologia sintàctica necessària. Reflexió i aplicació correcta de l’ordre de les paraules i concordança, que facin comprensibles els textos.", "Descripció i anàlisi dels procediments d’adquisició i formació de paraules. Reflexió sobre els canvis en el seu significat, les relacions semàntiques entre paraules i els seus valors denotatius i connotatius en funció del context i el propòsit comunicatiu, en la comprensió dels textos.", "Aplicació d’estratègies d’ús progressivament autònom de diccionaris i manuals de gramàtica que permetin obtenir informació gramatical bàsica."],
        "3r-4t": ["Aplicació d’estratègies per a la construcció guiada de conclusions pròpies sobre el sistema lingüístic. Observació, comparació i classificació d’unitats comunicatives. Experimentació amb estructures, formulació d’hipòtesis, contraexemples, generalitzacions i contrast entre llengües, utilitzant el metallenguatge específic, en el marc de la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Observació, contrast i anàlisi de les diferències rellevants i interseccions entre llengua oral i llengua escrita atenent a aspectes sintàctics, lèxics i pragmàtics, per a la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Comprensió, anàlisi i valoració de la llengua com a sistema i de les seves unitats bàsiques tenint en compte els diferents nivells: el so i sistema d’escriptura, les paraules (forma i significat), la seva organització en el discurs (ordre de les paraules, components de les oracions o connexió entre els significats), per a la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Distinció i reflexió entre la forma (categoria gramatical) i la funció de les paraules (funcions sintàctiques de l’oració simple) i consolidació dels procediments lèxics (afixos) i sintàctics per al canvi de categoria, en situacions de comprensió i expressió de textos orals i escrits.", "Relació entre els esquemes semàntic i sintàctic de l’oració simple. Observació i transformació d’enunciats d’acord amb aquests esquemes i ús de la terminologia sintàctica necessària per fer comprensible els textos.", "Anàlisi i valoració dels procediments d’adquisició i formació de paraules. Reflexió sobre els canvis en el seu significat, les relacions semàntiques entre paraules i els seus valors denotatius i connotatius en funció del context i el propòsit comunicatiu, per a la comprensió i enriquiment dels textos.", "Aplicació d’estratègies d’ús progressivament autònom de diccionaris i manuals de gramàtica."],
      },
    },
  },
  "Llengua Castellana i Literatura": {
    name: "Llengua Castellana i Literatura",
    courseKeys: ["1r-2n", "3r-4t"],
    courseLabels: {"1r-2n": "1r i 2n ESO", "3r-4t": "3r i 4t ESO"},
    blocs: {
      "Les llengües i els seus parlants": {
        "1r-2n": ["Observació de la pròpia biografia lingüística i de la diversitat lingüística de centre, i comprensió de les famílies lingüístiques i les llengües del món, els sistemes d’escriptura i nocions bàsiques: fórmules de salutació i comiat, agraïment i disculpa, en situacions de l’àmbit escolar i la vida quotidiana.", "Reconeixement de les llengües d’Espanya, el seu origen i distribució geogràfica, amb especial atenció a les diferències entre plurilingüisme i diversitat dialectal, parant especial atenció al context de Catalunya.", "Aproximació a les llengües de signes en el context de l’aula i la vida quotidiana.", "Comparació de trets de les principals varietats dialectals del català i del castellà, amb especial atenció a la del propi territori.", "Iniciació a la reflexió interlingüística en el context de la matèria.", "Identificació de prejudicis i estereotips lingüístics i formulació de formes d’evitar-los, tant a l’aula com a la vida quotidiana de l’alumnat i els mitjans de comunicació."],
        "3r-4t": ["Anàlisi de la pròpia biografia lingüística i de la diversitat lingüística del centre i de la localitat.", "Anàlisi del desenvolupament sociohistòric de les llengües d’Espanya, amb especial atenció a la llengua catalana, per a la comprensió de la realitat plurilingüe i pluricultural.", "Comparació i contrastació dels trets propis de les varietats dialectals (fònics, gramaticals i lèxics) i els relatius als sociolectes i els registres que permetin la comprensió de la realitat plurilingüe i pluricultural i el respecte a aquesta diversitat.", "Desenvolupament de la reflexió interlingüística en el context de la matèria.", "Exploració i qüestionament de prejudicis i estereotips lingüístics, especialment en els fenòmens de contacte entre llengües: bilingüisme, préstecs, interferències; diglòssia lingüística i diglòssia dialectal, que permetin la comprensió de la realitat plurilingüe i pluricultural i el respecte a aquesta diversitat.", "Indagació entorn dels drets lingüístics i la seva expressió en lleis i declaracions institucionals."],
      },
      "Comunicació - Context": {
        "1r-2n": ["Anàlisi dels components de fet comunicatiu: grau de formalitat de la situació i caràcter públic o privat; distància social entre els interlocutors; propòsits comunicatius i interpretació d’intencions; canal de comunicació i elements no verbals de la comunicació, en situacions d’aula, de la vida quotidiana i dels mitjans de comunicació."],
        "3r-4t": [],
      },
      "Comunicació - Gèneres discursius": {
        "1r-2n": ["Detecció, anàlisi i ús de gèneres discursius de l’àmbit personal (conversa); educatiu de caràcter narratiu, descriptiu, dialogat i expositiu, d’acord amb les propietats textuals (adequació, coherència, cohesió i correcció), i social, parant especial atenció a les xarxes socials i mitjans de comunicació; respecte a l’etiqueta digital; avaluació de riscos de desinformació, manipulació i vulneració de la privacitat a la xarxa. Anàlisi de la imatge i elements paratextuals dels textos icònics, verbals i multimodals."],
        "3r-4t": [],
      },
      "Comunicació - Processos": {
        "1r-2n": ["Interacció oral i escrita de caràcter informal. Consciència i ús dels actes de prendre i deixar la paraula, de la cooperació conversacional i la cortesia lingüística; de l’escolta activa, l’assertivitat i la resolució dialogada dels conflictes en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Comprensió del sentit global del text oral i relació entre les seves parts, selecció i retenció de la informació rellevant. Detecció i rebuig d’usos discriminatoris del llenguatge verbal i no verbal. en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Planificació i recerca d’informació, textualització i revisió de la producció oral formal. Adequació a l’audiència i al temps d’exposició. Detecció i utilització d’elements no verbals. Anàlisi i ús dels trets discursius i lingüístics de l’oralitat formal, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Comprensió del sentit global del text escrit i relació entre les parts. La intenció de l’emissor. Detecció d’usos discriminatoris del llenguatge verbal i icònic, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Planificació, redacció, revisió i edició en diferents suports de textos escrits. Correcció gramatical i ortogràfica. Propietat lèxica. Usos de l’escriptura per a l’organització del pensament: presa de notes, esquemes, mapes conceptuals, definicions, resums, etc., en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Cerca i selecció de la informació amb criteris de fiabilitat, qualitat i pertinència; anàlisi, valoració, reorganització i síntesi de la informació en esquemes propis i transformació en coneixement; comunicació i difusió de manera creativa i respectuosa amb la propietat intel·lectual. Utilització de plataformes virtuals per a la realització de projectes escolars."],
        "3r-4t": ["Interacció oral i escrita de caràcter informal. Prendre i deixar la paraula. Cooperació conversacional i cortesia lingüística. Escolta activa, assertivitat i resolució dialogada dels conflictes, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Comprensió del sentit global del text oral i relació entre les seves parts, selecció i retenció de la informació rellevant. La intenció de l’emissor. Detecció d’usos discriminatoris del llenguatge verbal i no verbal. Valoració de la forma i el contingut del text, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Planificació i recerca d’informació, textualització i revisió en la producció oral formal. Adequació a l’audiència i al temps d’exposició. Detecció i utilització d’elements no verbals. Anàlisi i ús dels trets discursius i lingüístics de l’oralitat formal, amb especial atenció a la deliberació oral argumentada, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Comprensió del sentit global del text escrit i relació entre les parts. La intenció de l’emissor. Detecció i rebuig d’usos discriminatoris del llenguatge verbal i icònic. Valoració de la forma i el contingut del text, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Planificació, redacció, revisió i edició en diferents suports de textos escrits. Usos de l’escriptura per a l’organització del pensament: presa de notes, esquemes, mapes conceptuals, definicions, resums, etc., en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Cerca i selecció de la informació amb criteris de fiabilitat, qualitat i pertinència; anàlisi, valoració, reorganització i síntesi de la informació en esquemes propis i transformació en coneixement; comunicació i difusió de manera creativa i respectuosa amb la propietat intel·lectual. Utilització de plataformes virtuals per a la realització de projectes escolars."],
      },
      "Comunicació - Reconeixement i ús discursiu dels elements lingüístics": {
        "1r-2n": ["Reconeixement, anàlisi i ús discursiu dels elements lingüístics amb especial atenció als recursos lingüístics per mostrar la implicació de l’emissor en els textos: formes de dixi (personal, temporal i espacial) i procediments de modalització; recursos lingüístics per adequar el registre a la situació de comunicació; mecanismes de cohesió; connectors textuals temporals, explicatius, d’ordre i de contrast; mecanismes de referència interna gramaticals (substitucions pronominals) i lèxics (repeticions, sinònims, hiperònims i el·lipsis); coherència de les formes verbals en els textos; els temps de pretèrit en la narració; correlació temporal en el discurs relatat, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques.", "Correcció lingüística i revisió ortogràfica i gramatical de diferents tipus de text i en diferents situacions. Ús de diccionaris, manuals de consulta i de correctors ortogràfics en suport analògic o digital per a la correcció i millora dels textos.", "Ús dels signes bàsics de puntuació com a mecanisme organitzador del text escrit, la seva relació amb el significat."],
        "3r-4t": ["Reconeixement, anàlisi i ús discursiu, en el context de l’aula, de la vida quotidiana i dels mitjans de comunicació, incloses les xarxes, i en les activitats acadèmiques, dels elements lingüístics amb especial atenció a l’expressió de la subjectivitat en textos de caràcter expositiu i argumentatiu; la identificació i ús de les variacions de les formes díctiques (fórmules de confiança i cortesia) en relació amb situacions de comunicació diverses; recursos lingüístics per adequar el registre a la situació de comunicació; procediments explicatius bàsics: l’aposició i les oracions de relatiu; mecanismes de cohesió: connectors textuals distributius, d’ordre, contrast, explicació, causa, conseqüència, condició i hipòtesi; mecanismes de referència interna, gramaticals i lèxics (nominalitzacions i hiperònims de significat abstracte); coherència de les formes verbals en els textos; correlació temporal en la coordinació i subordinació d’oracions, i en el discurs relatat.", "Correcció lingüística i revisió ortogràfica i gramatical dels textos. Ús de diccionaris, manuals de consulta i de correctors ortogràfics en suport analògic o digital per a la correcció i millora dels textos.", "Ús dels signes de puntuació com a mecanisme organitzador del text escrit, la seva relació amb el significat."],
      },
      "Comunicació - Context: components de fet comunicatiu": {
        "1r-2n": [],
        "3r-4t": ["Anàlisi dels components de fet comunicatiu: grau de formalitat de la situació i caràcter públic o privat; distància social entre els interlocutors; propòsits comunicatius i interpretació d’intencions; canal de comunicació i elements no verbals de la comunicació, en situacions d’aula, de la vida quotidiana i dels mitjans de comunicació."],
      },
      "Comunicació - Els gèneres discursius": {
        "1r-2n": [],
        "3r-4t": ["Detecció, anàlisi i ús de gèneres discursius de l’àmbit personal (conversa, amb especial atenció als actes de parla que amenacen la imatge de l’interlocutor (la discrepància, la queixa, l’ordre, la reprovació); educatiu de caràcter expositiu i argumentatiu, d’acord amb les propietats textuals (adequació, coherència, cohesió i correcció), i social, parant especial atenció a les xarxes socials i mitjans de comunicació; respecte a l’etiqueta digital; avaluació de riscos de desinformació, manipulació i vulneració de la privacitat a la xarxa. Anàlisi de la imatge i elements paratextuals dels textos icònics, verbals i multimodals."],
      },
      "Educació literària - Lectura autònoma": {
        "1r-2n": ["Implicació en la lectura de manera progressivament autònoma a partir d’una preselecció de textos variats que incloguin obres d’autores i autors. Reflexió sobre els textos i sobre la pròpia pràctica de lectura sustentada en models.", "Selecció d’obres variades que incloguin autores i autors de manera orientada a partir de l’exploració guiada de la biblioteca escolar i pública disponible.", "Participació activa en actes culturals vinculats al circuit literari i lector.", "Aplicació d’estratègies de presa de consciència dels propis gustos i identitat lectora, en l’àmbit personal i social (lectures compartides).", "Expressió, a través de models comentats a l’aula o bé aportats per l’alumnat, de l’experiència lectora i de diferents formes d’apropiació i recreació dels textos llegits.", "Aplicació d’estratègies de mobilització de l’experiència personal i lectora que permetin establir vincles entre l’obra llegida i aspectes de l’actualitat, així com amb altres textos i manifestacions artístiques, en l’àmbit personal i en conversa a l’aula.", "Aplicació d’estratègies per a la recomanació de les lectures, en suports variats o bé oralment entre iguals."],
        "3r-4t": ["Implicació en la lectura de manera progressivament autònoma i reflexió sobre els textos llegits i sobre la pròpia pràctica de lectura.", "Selecció, de manera progressivament autònoma, d’obres variades que incloguin autores i autors a partir de la utilització autònoma de la biblioteca escolar i pública disponible.", "Participació activa en actes culturals vinculats al circuit literari i lector.", "Aplicació d’estratègies de presa de consciència i verbalització dels propis gustos i identitat lectora en l’àmbit personal i social (lectures compartides).", "Expressió de l’experiència lectora i de diferents formes d’apropiació i recreació dels textos llegits, en el context personal i social (converses a l’aula).", "Aplicació d’estratègies de mobilització de l’experiència personal, lectora i cultural que permetin establir vincles de manera argumentada entre l’obra llegida i aspectes de l’actualitat, així com amb altres textos i manifestacions artístiques.", "Aplicació d’estratègies per a la recomanació de les lectures en suports variats o bé oralment entre iguals, emmarcant de manera bàsica les obres en els gèneres i subgèneres literaris."],
      },
      "Educació literària - Lectura guiada": {
        "1r-2n": ["Lectura d’obres rellevants de la literatura juvenil contemporània i del patrimoni literari universal, inscrites en itineraris temàtics o de gènere, que incloguin la presència d’autores i autors, en el context de l’aula i de l’entorn proper que permeti fer la transferència a altres situacions de caràcter literari i cultural amb vincles amb la pròpia vida.", "Aplicació d’estratègies i models de construcció compartida de la interpretació de les obres a través de converses literàries, clubs de lectura i canals de difusió com revistes, blogs o clips audiovisuals.", "Relació i contrast entre els elements constitutius del gènere literari i la construcció del sentit de l’obra. Anàlisi bàsica del valor dels recursos expressius; els seus efectes en la recepció.", "Relació i comparació dels textos llegits amb altres textos, amb altres manifestacions artístiques i amb les noves formes de ficció en funció de gèneres, temes, tòpics, estructures i llenguatges. Gèneres: novel·la, narració breu, teatre, poesia, assaig, etc. Temes: amor, amistat, mort, viatge, etc. Tòpics: carpe diem, tempus fugit, locus amoenus, captatio benevolentiae, ubi sunt, etc.", "Aplicació d’estratègies, models i pautes per a l’expressió de la interpretació i valoració personal d’obres i fragments literaris, a través de processos i suports diversificats i tenint en compte la perspectiva de gènere.", "Lectura expressiva, dramatització i recitació dels textos atenent als processos de comprensió, apropiació i oralització implicats.", "Creació de textos a partir de l’apropiació de les convencions del llenguatge literari i en referència a models donats (imitació, transformació, continuació, etc.) en el context de l’expressió dels sentiments, emocions i experiències pròpies."],
        "3r-4t": ["Lectura d’obres rellevants del patrimoni literari nacional i universal i de la literatura actual inscrites en itineraris temàtics o de gènere, que incloguin la presència d’autores i autors, en el context de l’aula i de l’entorn proper, i que permetin fer la transferència a altres situacions de caràcter literari i cultural amb vincles amb la pròpia vida. Gèneres: novel·la, narració breu, teatre, poesia, etc. Temes: amor, amistat, mort, viatge, etc. Tòpics: carpe diem, tempus fugit, locus amoenus, captatio benevolentiae, ubi sunt, etc.", "Aplicació d’estratègies de construcció compartida de la interpretació de les obres a través de discussions, converses literàries, clubs de lectura i canals de difusió com revistes, blogs o clips audiovisuals.", "Relació i contrast entre els elements constitutius del gènere literari i la construcció del sentit de l’obra. Anàlisi dels efectes dels seus recursos expressius en la recepció.", "Aplicació d’estratègies d’utilització d’informació sociohistòrica, cultural i artística bàsica que permetin construir la interpretació de les obres literàries.", "Relació i comparació dels textos llegits amb altres textos orals, escrits o multimodals, amb altres manifestacions artístiques i amb les noves formes de ficció en funció de temes, tòpics, estructures i llenguatges. Elements de continuïtat i ruptura.", "Aplicació d’estratègies per interpretar obres i fragments literaris a partir de la integració dels diferents aspectes analitzats i atenent els valors culturals, ètics i estètics presents en els textos, així com la lectura amb perspectiva de gènere.", "Indagació al voltant de les obres llegides que promoguin l’interès per construir la interpretació de les obres i establir connexions entre textos.", "Lectura expressiva, dramatització i recitació dels textos atenent als processos de comprensió, apropiació i oralització implicats.", "Creació de textos a partir de l’apropiació de les convencions del llenguatge literari i en referència a models donats (imitació, transformació, continuació, etc.) en el context de l’expressió dels sentiments, emocions i experiències pròpies."],
      },
      "Reflexió sobre la llengua": {
        "1r-2n": ["Aplicació d’estratègies per a la construcció guiada de conclusions pròpies sobre el sistema lingüístic. Observació, comparació i classificació d’unitats comunicatives. Experimentació amb estructures, formulació d’hipòtesis, contraexemples, generalitzacions i contrast entre llengües, utilitzant el metallenguatge específic, en el marc de la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Observació i comparació de les diferències rellevants i interseccions entre llengua oral i llengua escrita atenent a aspectes sintàctics, lèxics i pragmàtics. per a la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Comprensió i anàlisi de la llengua com a sistema i de les seves unitats bàsiques tenint en compte els diferents nivells: el so i sistema d’escriptura, les paraules (forma i significat), la seva organització en el discurs (ordre de les paraules, components de les oracions o connexió entre els significats), per a la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Distinció entre la forma (categoria gramatical) i la funció de les paraules (funcions sintàctiques), i coneixement dels procediments lèxics (afixos) i sintàctics per al canvi de categoria en situacions de comprensió i expressió de textos orals i escrits.", "Relació entre els esquemes semàntic i sintàctic de l’oració simple. Observació i transformació d’enunciats d’acord amb aquests esquemes i ús de la terminologia sintàctica necessària. Reflexió i aplicació correcta de l’ordre de les paraules i concordança, que facin comprensibles els textos.", "Descripció i anàlisi dels procediments d’adquisició i formació de paraules. Reflexió sobre els canvis en el seu significat, les relacions semàntiques entre paraules i els seus valors denotatius i connotatius en funció del context i el propòsit comunicatiu, en la comprensió dels textos.", "Aplicació d’estratègies d’ús progressivament autònom de diccionaris i manuals de gramàtica que permetin obtenir informació gramatical bàsica."],
        "3r-4t": ["Aplicació d’estratègies per a la construcció guiada de conclusions pròpies sobre el sistema lingüístic. Observació, comparació i classificació d’unitats comunicatives. Experimentació amb estructures, formulació d’hipòtesis, contraexemples, generalitzacions i contrast entre llengües, utilitzant el metallenguatge específic, en el marc de la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Observació, contrast i anàlisi de les diferències rellevants i interseccions entre llengua oral i llengua escrita atenent a aspectes sintàctics, lèxics i pragmàtics, per a la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Comprensió, anàlisi i valoració de la llengua com a sistema i de les seves unitats bàsiques tenint en compte els diferents nivells: el so i sistema d’escriptura, les paraules (forma i significat), la seva organització en el discurs (ordre de les paraules, components de les oracions o connexió entre els significats), per a la millora en la comprensió i producció dels textos orals, escrits i multimodals en situacions diverses, tant personals i socials com acadèmiques.", "Distinció i reflexió entre la forma (categoria gramatical) i la funció de les paraules (funcions sintàctiques de l’oració simple) i consolidació dels procediments lèxics (afixos) i sintàctics per al canvi de categoria, en situacions de comprensió i expressió de textos orals i escrits.", "Relació entre els esquemes semàntic i sintàctic de l’oració simple. Observació i transformació d’enunciats d’acord amb aquests esquemes i ús de la terminologia sintàctica necessària per fer comprensible els textos.", "Anàlisi i valoració dels procediments d’adquisició i formació de paraules. Reflexió sobre els canvis en el seu significat, les relacions semàntiques entre paraules i els seus valors denotatius i connotatius en funció del context i el propòsit comunicatiu, per a la comprensió i enriquiment dels textos.", "Aplicació d’estratègies d’ús progressivament autònom de diccionaris i manuals de gramàtica."],
      },
    },
  },
  "Llengua Estrangera": {
    name: "Llengua Estrangera",
    courseKeys: ["1r-2n", "3r-4t"],
    courseLabels: {"1r-2n": "1r i 2n ESO", "3r-4t": "3r i 4t ESO"},
    blocs: {
      "Les llengües i els seus parlants": {
        "1r-2n": ["Anàlisi i valoració de la llengua estrangera com a mitjà de comunicació interpersonal i internacional, font d’informació, i com a eina per a l’enriquiment personal, en situacions de la vida quotidiana i acadèmica.", "Interès en la realització d’intercanvis comunicatius a través de diferents mitjans amb parlants o estudiants de la llengua estrangera, per al desenvolupament i millora de l’aprenentatge de la llengua.", "Explicació i anàlisi d’aspectes socioculturals i sociolingüístics bàsics relatius a la vida quotidiana, les condicions de vida i les relacions interpersonals; convencions socials bàsiques; llenguatge no verbal, cortesia lingüística i etiqueta digital; cultura, costums i valors propis de països on es parla la llengua estrangera.", "Aplicació d’estratègies bàsiques per entendre i apreciar la diversitat lingüística, cultural i artística, atenent a valors ecològics, socials i democràtics, en escenaris presencials, híbrids i en línia."],
        "3r-4t": ["Anàlisi i valoració de la llengua estrangera com a mitjà de comunicació interpersonal i internacional, font d’informació, i com a eina de participació social i d’enriquiment personal, en situacions de la vida personal, social i acadèmica, incloses les xarxes socials i els mitjans de comunicació.", "Interès i iniciativa en la realització d’intercanvis comunicatius a través de diferents mitjans amb parlants o estudiants de la llengua estrangera per al desenvolupament i millora de l’aprenentatge de la llengua.", "Anàlisi i valoració d’aspectes socioculturals i sociolingüístics d’ús comú relatius a la vida quotidiana, les condicions de vida i les relacions interpersonals; convencions socials d’ús comú; llenguatge no verbal, cortesia lingüística i etiqueta digital; cultura, normes, actituds, costums i valors propis de països on es parla la llengua estrangera.", "Aplicació d’estratègies d’ús comú per entendre i apreciar la diversitat lingüística, cultural i artística, atenent a valors ecològics, socials i democràtics en escenaris presencials, híbrids i en línia."],
      },
      "Comunicació - Context": {
        "1r-2n": ["Anàlisi dels components de fet comunicatiu: grau de formalitat de la situació i caràcter públic o privat; distància social entre els interlocutors; propòsits comunicatius i interpretació d’intencions; canal de comunicació i elements no verbals de la comunicació, en situacions d’aula, de la vida quotidiana i dels mitjans de comunicació."],
        "3r-4t": ["Anàlisi dels components de fet comunicatiu: grau de formalitat de la situació i caràcter públic o privat; distància social entre els interlocutors; propòsits comunicatius i interpretació d’intencions; canal de comunicació i elements no verbals de la comunicació, en situacions d’aula, de la vida quotidiana i dels mitjans de comunicació."],
      },
      "Comunicació - Gèneres discursius": {
        "1r-2n": ["Anàlisi i ús de models contextuals i gèneres discursius bàsics en la comprensió, producció i coproducció de textos orals, escrits i multimodals, breus i senzills, literaris i no literaris: característiques i reconeixement del context (participants i situació), expectatives generades pel context; organització i estructuració segons el gènere, la funció textual i l’estructura."],
        "3r-4t": ["Anàlisi, argumentació i ús de models contextuals i gèneres discursius d’ús comú en la comprensió, producció i coproducció de textos orals, escrits i multimodals, breus i senzills, literaris i no literaris: característiques i reconeixement del context (participants i situació), expectatives generades pel context; organització i estructuració segons el gènere, la funció textual i l’estructura."],
      },
      "Comunicació - Processos": {
        "1r-2n": ["Desenvolupament progressiu de l’autoconfiança. Valoració de l’error com a instrument de millora i proposta de reparació en qualsevol tipus de situació d’aprenentatge de la llengua (formal, no formal, informal).", "Aplicació d’estratègies d’ús comú per a la planificació, execució, control i reparació de la comprensió, la producció i la coproducció de textos orals i multimodals, com ara reformular, comparar i contrastar, resumir, col·laborar, debatre, resoldre problemes i gestionar situacions compromeses, en situacions comunicatives informals, semiformals, no formals i formals.", "Aplicació d’estratègies d’ús comú per a la planificació, execució, control i reparació de la comprensió, la producció i la coproducció de textos orals, escrits i multimodals, com ara reformular, comparar i contrastar, resumir, col·laborar, debatre, resoldre problemes i gestionar situacions compromeses, identificar informació rellevant, realitzar inferències, determinar l’actitud i el propòsit del parlant, en situacions comunicatives informals, semiformals, no formals i formals.", "Utilització d’eines analògiques i digitals d’ús comú per a la comprensió, producció i coproducció oral, escrita i multimodal; i plataformes virtuals d’interacció i col·laboració educativa (aules virtuals, videoconferències, eines digitals col·laboratives...) per a l’aprenentatge, la comunicació i el desenvolupament de projectes amb parlants o estudiants de la llengua estrangera.", "Anàlisi i ús de funcions comunicatives bàsiques adequades a l’àmbit i al context comunicatiu: salutacions, comiats i presentacions; descripció de persones, objectes i llocs; situar esdeveniments en el temps; situar objectes, persones i llocs en l’espai; petició i intercanvi d’informació sobre qüestions quotidianes; instruccions i ordres; oferir, acceptar i rebutjar ajuda, proposicions o suggeriments; expressar parcialment el gust o l’interès i emocions bàsiques; narració d’esdeveniments passats, descripció de situacions presents, i expressió de successos futurs; expressar l’opinió i la possibilitat.", "Identificació i respecte de l’autoria de les fonts consultades i els continguts utilitzats, en contextos personals, socials i acadèmics.", "Cerca d’informació que impliqui l’ús de recursos per a l’aprenentatge i estratègies bàsiques: diccionaris, llibres de consulta, biblioteques, recursos digitals i informàtics, etc. en contextos de l’àmbit personal i acadèmic."],
        "3r-4t": ["Desenvolupament de l’autoconfiança i iniciativa. Valoració de l’error com a part integrant del procés d’aprenentatge de la llengua.", "Aplicació d’estratègies d’ús comú per a la planificació, execució, control i reparació de la comprensió, la producció i la coproducció de textos orals, escrits i multimodals, com ara reformular, comparar i contrastar, resumir, col·laborar, debatre, resoldre problemes i gestionar situacions compromeses, identificar informació rellevant, realitzar inferències, determinar l’actitud i el propòsit del parlant, en situacions comunicatives informals, semiformals, no formals i formals.", "Utilització d’eines analògiques i digitals d’ús comú per a la comprensió, producció i coproducció oral, escrita i multimodal; i plataformes virtuals d’interacció i col·laboració educativa (aules virtuals, videoconferències, eines digitals col·laboratives...) per a l’aprenentatge, la comunicació i el desenvolupament de projectes amb parlants o estudiants de la llengua estrangera.", "Anàlisi, argumentació i ús de funcions comunicatives d’ús comú adequades a l’àmbit i al context comunicatiu: salutacions, comiats i presentacions; descripció i caracterització de persones, objectes, llocs, fenòmens i esdeveniments; situar esdeveniments en el temps; situar objectes, persones i llocs en l’espai; petició i intercanvi d’informació sobre qüestions quotidianes; instruccions i ordres; oferir, acceptar i rebutjar ajuda, proposicions o suggeriments; expressar parcialment el gust o l’interès i emocions; narració d’esdeveniments passats, descripció de situacions presents, i expressió de successos futurs; expressar l’opinió i la possibilitat; argumentacions senzilles; realitzar hipòtesis i suposicions; expressar la possibilitat, la incertesa i el dubte; reformular i resumir.", "Respecte a la propietat intel·lectual i drets d’autor sobre les fonts consultades i continguts utilitzats, en contextos personals, socials i acadèmics.", "Cerca i selecció d’informació que impliqui l’ús de recursos per a l’aprenentatge i estratègies d’ús comú: diccionaris, llibres de consulta, biblioteques, recursos digitals i informàtics, etc., en contextos de l’àmbit personal, acadèmic i social diversos."],
      },
      "Comunicació - Reconeixement, anàlisi i ús discursiu dels elements lingüístics": {
        "1r-2n": ["Identificació, reflexió i aplicació de convencions i estratègies conversacionals bàsiques, en format síncron o asíncron, per iniciar, mantenir i acabar la comunicació, prendre i cedir la paraula, demanar i donar aclariments i explicacions, reformular, comparar i contrastar, resumir, col·laborar, debatre, etc.", "Anàlisi i utilització d’unitats lingüístiques bàsiques i significats associats a aquestes unitats tals com l’expressió de l’entitat i les seves propietats, quantitat i qualitat, l’espai i les relacions espacials, el temps i les relacions temporals, l’afirmació, l socials i acadèmiques.", "Anàlisi i ús de lèxic d’ús comú i d’interès per a l’alumnat, relatiu a la identificació personal, relacions interpersonals, llocs i entorns propers, oci i temps lliua negació, la interrogació i l’exclamació, relacions lògiques bàsiques en situacions personals,re, vida quotidiana, salut i activitat física, habitatge i llar, clima i entorn natural, tecnologies de la informació i la comunicació, tenint en compte la perspectiva de gènere.", "Reconeixement, anàlisi i ús de patrons sonors, accentuals, rítmics i d’entonació d’ús comú, i significats i intencions comunicatives generals associades a aquests patrons, en situacions informals i semiformals.", "Inferència i aplicació de convencions ortogràfiques bàsiques i significats i intencions comunicatives associats als formats, patrons i elements gràfics, inclosos els recursos i plataformes digitals."],
        "3r-4t": ["Anàlisi i aplicació de convencions i estratègies conversacionals d’ús comú, en format síncron o asíncron, per iniciar, mantenir i acabar la comunicació, prendre i cedir la paraula, demanar i donar aclariments i explicacions, reformular, comparar i contrastar, resumir, col·laborar, debatre, etc.", "Anàlisi , valoració i utilització d’unitats lingüístiques d’ús comú i significats associats a aquestes unitats tals com l’expressió de l’entitat i les seves propietats, quantitat i qualitat, l’espai i les relacions espacials, el temps i les relacions temporals, l’afirmació, la negació, la interrogació i l’exclamació, relacions lògiques habituals, en situacions personals, socials i acadèmiques.", "Anàlisi, valoració i ús de lèxic d’ús comú i d’interès per a l’alumnat, relatiu a la identificació personal, relacions interpersonals, llocs i entorns, oci i temps lliure, salut i activitat física, vida quotidiana, habitatge i llar, clima i entorn natural, tecnologies de la informació i la comunicació, sistema escolar i formació, tenint en compte la perspectiva de gènere.", "Reconeixement, anàlisi i ús de patrons sonors, accentuals, rítmics i d’entonació d’ús comú, i significats i intencions comunicatives generals associades a aquests patrons, en situacions informals i semiformals.", "Anàlisi i aplicació de convencions ortogràfiques d’ús comú i significats i intencions comunicatives associats als formats, patrons i elements gràfics."],
      },
      "Educació literària": {
        "1r-2n": ["Implicació en la lectura de manera progressivament autònoma a partir d’una preselecció de textos variats que incloguin obres d’autores i autors. Reflexió sobre els textos i sobre la pròpia pràctica de lectura sustentada en models.", "Selecció d’obres variades que incloguin autores i autors de manera orientada a partir de l’exploració guiada de la biblioteca escolar i pública disponible.", "Aplicació d’estratègies de presa de consciència dels propis gustos i identitat lectora, en l’àmbit personal i social (lectures compartides).", "Expressió, a través de models comentats a l’aula o bé aportats per l’alumnat, de l’experiència lectora i de diferents formes d’apropiació i recreació dels textos llegits.", "Aplicació d’estratègies de mobilització de l’experiència personal i lectora que permetin establir vincles entre l’obra llegida i aspectes de l’actualitat, així com amb altres textos i manifestacions artístiques, en l’àmbit personal i en conversa a l’aula.", "Aplicació d’estratègies per a la recomanació de les lectures, en suports variats o bé oralment entre iguals."],
        "3r-4t": ["Implicació en la lectura de manera progressivament autònoma i reflexió sobre els textos llegits i sobre la pròpia pràctica de lectura.", "Selecció, de manera progressivament autònoma, d’obres variades que incloguin autores i autors a partir de la utilització autònoma de la biblioteca escolar i pública disponible.", "Aplicació d’estratègies de presa de consciència i verbalització dels propis gustos i identitat lectora en l’àmbit personal i social (lectures compartides).", "Expressió de l’experiència lectora i de diferents formes d’apropiació i recreació dels textos llegits, en el context personal i social (converses a l’aula).", "Aplicació d’estratègies de mobilització de l’experiència personal, lectora i cultural que permetin establir vincles de manera argumentada entre l’obra llegida i aspectes de l’actualitat, així com amb altres textos i manifestacions artístiques.", "Aplicació d’estratègies per a la recomanació de les lectures en suports variats o bé oralment entre iguals, emmarcant de manera bàsica les obres en els gèneres i subgèneres literaris."],
      },
      "Reflexió sobre la llengua": {
        "1r-2n": ["Desenvolupament dels coneixements, destreses i actituds que permetin detectar i col·laborar en activitats de mediació en situacions quotidianes senzilles.", "Aplicació d’estratègies i tècniques per respondre eficaçment a una necessitat comunicativa bàsica i concreta de manera entenedora, tot i les limitacions derivades del nivell de competència en la llengua estrangera i en les llengües familiars, en comunicacions orals, escrites i multimodals.", "Aplicació d’estratègies bàsiques per identificar, organitzar, retenir, recuperar i utilitzar creativament unitats lingüístiques (lèxic, morfosintaxi, patrons sonors, etc.) a partir de l’ús tàctic dels coneixements que es tenen de les llengües, i les seves varietats, i que conformen el repertori lingüístic, de forma autònoma.", "Aplicació d’estratègies i eines bàsiques d’autoavaluació i coavaluació, analògiques i digitals, individuals i cooperatives, per al desenvolupament, regulació i millora del procés d’aprenentatge de la llengua.", "Ús d’estructures morfosintàctiques i de lèxic adequat, tot reflexionant sobre els processos comunicatius implicats, amb la utilització del metallenguatge específic.", "Aplicació dels coneixements de les diferents llengües del repertori lingüístic com a eina d’aprenentatge de la llengua estrangera."],
        "3r-4t": ["Desenvolupament dels coneixements, destreses i actituds que permeten dur a terme activitats de mediació en situacions informals, semiformals, no formals i formals.", "Aplicació d’estratègies i tècniques per respondre eficaçment i amb nivells creixents de fluïdesa, adequació i correcció a una necessitat comunicativa concreta tot i les limitacions derivades del nivell de competència en la llengua estrangera i en les llengües familiars, en comunicacions orals, escrites i multimodals.", "Aplicació d’estratègies d’ús comú per identificar, organitzar, retenir, recuperar i utilitzar creativament unitats lingüístiques (lèxic, morfosintaxi, patrons sonors, etc.), a partir de l’ús tàctic dels coneixements que es tenen de les llengües, i les seves varietats, i que conformen el repertori lingüístic, de forma autònoma.", "Aplicació d’estratègies i eines d’ús comú per a l’autoavaluació, la coavaluació i l’autoreparació, analògiques i digitals, individuals i cooperatives que permetin el desenvolupament, la regulació i la millora del procés d’aprenentatge de la llengua.", "Ús d’estructures morfosintàctiques i de lèxic adequat, tot reflexionant sobre els processos comunicatius implicats, amb la utilització del metallenguatge específic.", "Aplicació dels coneixements de les diferents llengües del repertori lingüístic com a eina d’aprenentatge de la llengua estrangera."],
      },
    },
  },
  "Matemàtiques": {
    name: "Matemàtiques",
    courseKeys: ["1r-2n-3r", "4t"],
    courseLabels: {"1r-2n-3r": "1r, 2n i 3r ESO", "4t": "4t ESO"},
    blocs: {
      "Sentit numèric - Comptatge": {
        "1r-2n-3r": ["Resolució de problemes i situacions de la vida quotidiana en els quals s’hagin de fer recomptes sistemàtics, utilitzant diferents estratègies (diagrames d’arbre, tècniques de combinatòria, etc.)."],
        "4t": ["Resolució de problemes i situacions de la vida quotidiana en els quals s’hagin de fer recomptes sistemàtics, utilitzant diferents estratègies (diagrames d’arbre, tècniques de combinatòria, etc.)."],
      },
      "Sentit numèric - Quantitat": {
        "1r-2n-3r": ["Interpretació de nombres grans i petits, reconeixement i utilització de la notació exponencial i científica. Incloent la lectura d’aquestes quantitats en la calculadora o full de càlcul.", "Expressió d’estimacions amb la precisió requerida.", "Reconeixement i aplicació de diferents formes de representació de nombres enters, fraccionaris i decimals, inclosa la recta numèrica.", "Selecció i utilització de la representació més adequada d’una mateixa quantitat (natural, sencer, decimal o fracció) per a cada situació o problema.", "Ús dels nombres enters, fraccions, decimals i arrels per a expressar quantitats en diferents contextos, inclosos els de la vida quotidiana, amb la precisió requerida.", "Ús dels nombres indoaràbics, la introducció del zero i els nombres negatius en la història de les matemàtiques.", "Ús de les fraccions en l’antiguitat (Egipte, l’Índia i Grècia) i en l’actualitat."],
        "4t": ["Expressió d’estimacions en diversos contextos analitzant l’error comès.", "Reconeixement i aplicació de diferents formes de representació de nombres enters, racionals i reals, inclosa la recta numèrica, adequada a cada situació o problema.", "Identificació del conjunt numèric que serveix per respondre a diferents necessitats: comptar, mesurar, comparar, etc.", "Ús dels nombres reals per expressar quantitats en diferents contextos, inclosos els de la vida quotidiana, amb la precisió requerida."],
      },
      "Sentit numèric - Sentit de les operacions": {
        "1r-2n-3r": ["Aplicació d’estratègies de càlcul mental amb nombres naturals, fraccions i decimals.", "Reconeixement i aplicació de les operacions amb nombres enters, fraccionaris o decimals útils per resoldre situacions contextualitzades.", "Comprensió i utilització de les relacions inverses, entre: l’addició i la sostracció, la multiplicació i la divisió, la potència i les arrels, per simplificar i resoldre problemes.", "Interpretació dels efectes de les operacions aritmètiques amb nombres enters, fraccions i expressions decimals.", "Ús de les propietats de les operacions aritmètiques (suma, resta, multiplicació i divisió) per realitzar càlculs de manera eficient amb nombres naturals, enters, fraccionaris i decimals tant mentalment com de manera manual, amb calculadora o full de càlcul, adaptant les estratègies a cada situació."],
        "4t": ["Evolució històrica de les diferents aproximacions al nombre pi.", "Identificació i anàlisi de patrons i regularitats numèriques en les quals intervinguin nombres reals.", "Elecció de les operacions adequades amb nombres reals per resoldre situacions contextualitzades.", "Ús de les propietats de les operacions aritmètiques per realitzar càlculs amb nombres reals de manera eficient amb calculadora i, a vegades, manualment, adaptant les estratègies a cada situació.", "Reconeixement d’alguns nombres irracionals en situacions de la vida quotidiana", "Evolució històrica de les diferents aproximacions al nombre pi"],
      },
      "Sentit numèric - Relacions": {
        "1r-2n-3r": ["Comparació i ordenació de fraccions, decimals i percentatges amb eficàcia trobant la seva situació exacta o aproximada en la recta numèrica.", "Utilització de factors primers, múltiples i divisors per a resoldre problemes, mitjançant estratègies i/o eines diverses, inclòs l’ús de la calculadora."],
        "4t": ["Comparació i ordenació de nombres reals amb eficàcia trobant la seva situació exacta o aproximada en la recta numèrica.", "Ús del triangle aritmètic al llarg de la història per a resoldre problemes."],
      },
      "Sentit numèric - Raonament proporcional": {
        "1r-2n-3r": ["Identificació de situacions proporcionals i no proporcionals (incloent situacions de proporcionalitat inversa) en problemes de la vida quotidiana. Comprensió i representació de les relacions quantitatives.", "Percentatges: comprensió i utilització en la resolució de problemes, inclosos els majors que 100% o menors que 1%.", "Desenvolupament i anàlisi de mètodes per resoldre problemes en situacions de proporcionalitat directa en diferents contextos (augments i disminucions percentuals, rebaixes i pujades de preus, impostos, canvis de divises, càlculs geomètrics, escales, etc.)."],
        "4t": [],
      },
      "Sentit numèric - Educació financera": {
        "1r-2n-3r": ["Interpretació de la informació numèrica en contextos financers senzills.", "Mètodes per a la presa de decisions de consum responsable ateses les relacions qualitat-preu i al valor-preu en contextos quotidians."],
        "4t": ["Desenvolupament, anàlisi i explicació de mètodes per a la resolució de problemes relacionats amb augments i disminucions percentuals, d’interessos i taxes en contextos financers."],
      },
      "Sentit de la mesura - Magnitud": {
        "1r-2n-3r": ["Atributs mesurables dels objectes físics i matemàtics: recerca i relació entre aquests.", "Elecció de les unitats i operacions adequades en situacions que impliquin mesura.", "Comparació de les unitats pròpies del sistema mètric decimal amb unes altres presents en diferents contextos.", "Avaluació de la importància de l’establiment del metre com a mesura universal en el context històric en què es va produir i en el context actual."],
        "4t": [],
      },
      "Sentit de la mesura - Mesurament": {
        "1r-2n-3r": ["Selecció i ús d’instruments (analògic o digital) i unitats adequades per mesurar de manera directa diferents magnituds de l’entorn.", "Deducció, interpretació i aplicació de les principals estratègies per obtenir longituds, àrees i volums en figures planes i tridimensionals.", "Relació entre les aplicacions dels teoremes de Tales i de Pitàgores en els diferents contextos històrics en què s’han utilitzat (Grècia, Índia, Xina).", "Ús de representacions planes d’objectes tridimensionals per visualitzar i resoldre problemes d’àrees, entre d’altres.", "Generació de representacions planes, manualment o digitalment, d’objectes geomètrics plans o tridimensionals, amb característiques donades, com les longituds dels costats, les mesures dels angles, les longituds de les arestes."],
        "4t": ["Deducció de les mesures dels elements d’un triangle en situacions que es poden modelitzar amb triangles rectangles.", "(*) Utilització de les raons trigonomètriques i les seves relacions en la resolució de problemes que es poden modelitzar amb triangles rectangles.", "Origen i ús de la trigonometria al llarg de la història i en particular per mesurar la distància Terra-Sol i Terra-Lluna."],
      },
      "Sentit de la mesura - Estimació i relacions": {
        "1r-2n-3r": ["Formulació de conjectures sobre mesures o relacions entre les mateixes basades en estimacions.", "Presa de decisió justificada del grau de precisió requerida en situacions de mesura.", "Valoració de les mesures del radi de la Terra i de les distàncies Terra-Lluna a la Grècia antiga."],
        "4t": [],
      },
      "Sentit espacial - Formes geomètriques de 2D o 3D": {
        "1r-2n-3r": ["Descripció i classificació de formes geomètriques planes i tridimensionals en funció de les seves propietats o característiques.", "Reconeixement de les relacions geomètriques com la congruència, la semblança i la relació pitagòrica en figures planes i tridimensionals.", "Construcció de formes geomètriques amb diferents eines: materials manipulables, instruments de dibuix, programes de geometria dinàmica, realitat augmentada, etc.", "Construcció de figures geomètriques en diferents contextos històrics, en particular a la Grècia antiga (Euclides).", "Construcció de formes geomètriques amb diferents eines: materials manipulables, instruments de dibuix, programes de geometria dinàmica, realitat augmentada, etc.", "Construcció de figures geomètriques en diferents contextos històrics, en particular a la Grècia antiga (Euclides)."],
        "4t": ["Elaboració de conjectures i reconeixement de propietats geomètriques de figures planes i tridimensionals a través de la recerca amb programes de geometria dinàmica.", "Ús de propietats geomètriques de figures planes i tridimensionals que modelitzen situacions de la vida quotidiana."],
      },
      "Sentit espacial - Localització i sistemes de representació": {
        "1r-2n-3r": ["Localització i descripció de relacions espacials: coordenades geomètriques i altres sistemes de representació."],
        "4t": ["Ús de nocions bàsiques de geometria analítica per a la representació de figures geomètriques de dues dimensions i l’anàlisi de les seves propietats.", "Origen i evolució històrica de l’ús de les coordenades cartesianes.", "(*) Reconeixement de diferents expressions algebraiques d’una recta i selecció de l’expressió més adequada en funció de la situació a resoldre."],
      },
      "Sentit espacial - Moviments i transformacions": {
        "1r-2n-3r": ["Anàlisis de transformacions elementals com a girs, translacions i simetries en situacions diverses utilitzant eines tecnològiques i/o manipulatives."],
        "4t": ["Anàlisi de transformacions elementals incloent homotècies en situacions diverses utilitzant eines tecnològiques i/o manipulatives (*) o mitjançant l’ús de la geometria analítica."],
      },
      "Sentit espacial - Visualització i modelització geomètrica": {
        "1r-2n-3r": ["Reconeixement de connexions entre el sentit espacial amb els altres sentits (numèric, algebraic…) i amb altres disciplines (art, ciència, vida diària).", "Ús de models geomètrics per representar i explicar relacions numèriques i algebraiques en situacions diverses."],
        "4t": ["Generació de models geomètrics per representar i explicar relacions numèriques i algebraiques en situacions diverses, incloent-hi les quotidianes."],
      },
      "Sentit algebraic - Patrons": {
        "1r-2n-3r": ["identificació i comprensió, determinant la regla de formació de col·leccions numèriques o gràfiques.", "Identificació de la successió de Fibonacci i la proporció àuria a la natura.", "Fórmules i termes generals: obtenció mitjançant l’observació de pautes i regularitats senzilles i la seva generalització."],
        "4t": ["Comprensió i anàlisi de patrons, determinant la regla de formació de diverses col·leccions numèriques o gràfiques."],
      },
      "Sentit algebraic - Model matemàtic": {
        "1r-2n-3r": ["Modelització i resolució de problemes contextualitzats, també de la vida quotidiana, secundant-se en representacions matemàtiques i en el llenguatge algebraic.", "Obtenció de conclusions raonables sobre una situació de la vida quotidiana una vegada modelitzada."],
        "4t": ["Modelització i resolució de problemes contextualitzats, també de la vida quotidiana, secundant-se en representacions matemàtiques i en el llenguatge algebraic, fent ús de diferents tipus de funcions.", "Obtenció i anàlisi de conclusions raonables d’una situació de la vida quotidiana una vegada modelitzada."],
      },
      "Sentit algebraic - Variable": {
        "1r-2n-3r": ["Comprensió del concepte de variable en les seves diferents naturaleses."],
        "4t": ["Utilització dels diferents usos de variables associant expressions simbòliques al context del problema.", "Evolució històrica del concepte de variable i de l’ús de l’àlgebra simbòlica com a llenguatge de la ciència."],
      },
      "Sentit algebraic - Igualtat i desigualtat": {
        "1r-2n-3r": ["Ús de l’àlgebra simbòlica per representar relacions lineals i quadràtiques en situacions contextualitzades, també de la vida quotidiana.", "Anàlisi dels diferents mètodes de resolució d’equacions al llarg de la història, en particular els mètodes geomètrics d’Al-Khwarizmi.", "Identificació i aplicació de l’equivalència d’expressions algebraiques en la resolució de problemes basats en relacions lineals i quadràtiques.", "Cerca de solucions en equacions o sistemes lineals i equacions quadràtiques, tant de manera manual com utilitzant la tecnologia."],
        "4t": ["Ús de l’àlgebra simbòlica per representar relacions funcionals en contextos diversos, també de la vida quotidiana.", "Utilització i generació de formes equivalents d’expressions algebraiques en la resolució d’inequacions lineals."],
      },
      "Sentit algebraic - Relacions i funcions": {
        "1r-2n-3r": ["Aplicació i comparació de les diferents formes de representació d’una relació.", "Identificació i ús de funcions, lineals o no lineals i comparació de les seves propietats a partir de taules, gràfiques o expressions algebraiques.", "Identificació de relacions quantitatives en situacions contextualitzades, incloent la vida quotidiana i determinació dels tipus de funcions que les modelitzen (lineals i quadràtiques).", "Deducció de la informació rellevant d’una funció mitjançant l’ús de diferents representacions simbòliques."],
        "4t": ["Identificació i ús de la forma de representació més adequada de funcions elementals en la resolució de situacions contextualitzades, incloent la vida quotidiana", "Identificació de relacions quantitatives en situacions contextualitzades, incloent la vida quotidiana i determinació dels tipus de funcions que les modelitzen (proporcionalitat inversa i exponencial)", "Interpretació de diferents característiques del canvi mitjançant la representació gràfica de les relacions funcionals estudiades."],
      },
      "Sentit algebraic - Pensament computacional": {
        "1r-2n-3r": ["Identificació i ús d’estratègies quan s’interpreten, modifiquen o creen algorismes de programació per blocs i/o programació textuals que incorporen: diferenciació entre processos seqüencials i paral·lels; comprensió de les instruccions de bucle, condicionals i instruccions niades; comprensió de la gestió de dades amb variables; ús d’operadors lògics i d’esdeveniments.", "Formulació de qüestions susceptibles de ser analitzades utilitzant programes i altres eines."],
        "4t": ["Identificació i anàlisi d’estratègies (seqüències de passos ordenats, esquemes, simulacions, patrons repetitius, bucles, instruccions niades i condicionals, representacions computacionals, programació per blocs, robòtica educativa...) per a la interpretació, modificació i creació d’algorismes", "Identificació i anàlisi d’estratègies quan s’interpreten, modifiquen o creen algorismes de programació per blocs i/o programació textuals que incorporen: diferenciació entre processos seqüencials i paral·lels; comprensió de les instruccions de bucle, condicionals i instruccions niades; comprensió de la gestió de dades amb variables; ús d’operadors lògics i d’esdeveniments.", "Formulació i anàlisi de problemes de la vida quotidiana utilitzant programes i eines adequades."],
      },
      "Sentit estocàstic - Inferència": {
        "1r-2n-3r": ["Formulació de preguntes adequades per conèixer les característiques d’interès d’una població.", "Presentació de dades rellevants per donar resposta a qüestions plantejades en recerques estadístiques.", "Obtenció de conclusions raonables a partir dels resultats obtinguts amb la finalitat d’emetre judicis i prendre decisions adequades.", "Ús de dades estadístiques al llarg de la història en la construcció de censos de població.", "Usos de dades estadístiques en la medicina actual (covid 19) i en la història, el cas de Florence Nightingale."],
        "4t": ["Disseny d’estudis estadístics reflexionant sobre les diferents etapes del procés estadístic.", "Presentació i interpretació de dades rellevants en recerques estadístiques mitjançant la utilització de mètodes estadístics i eines digitals adequades.", "Interpretació de la relació entre dues variables, valorant gràficament amb eines tecnològiques la pertinència d’una regressió lineal.", "Evolució històrica de l’aplicació de l’estadística a les ciències socials."],
      },
      "Sentit estocàstic - Distribució": {
        "1r-2n-3r": ["Anàlisi i interpretació de taules i gràfics estadístics de variables qualitatives, quantitatives discretes i quantitatives contínues.", "Recollida i organització de dades de situacions contextualitzades, incloent la vida quotidiana, que involucren una sola variable.", "Generació de representacions gràfiques adequades mitjançant diferents tecnologies (calculadora, full de càlcul, apps...) per esbrinar com es distribueixen les dades, interpretar-les i obtenir conclusions raonades.", "Mesures de centralització i dispersió: interpretació i càlcul.", "Comparació de dos conjunts de dades ateses les mesures de centralització i dispersió.", "Reconeixement que les mesures de dispersió descriuen la variabilitat de les dades.", "Càlcul, amb suport tecnològic, i interpretació de les mesures de centralització i dispersió en situacions reals.", "Generació de representacions gràfiques adequades mitjançant diferents tecnologies (calculadora, full de càlcul, apps...) per esbrinar com es distribueixen les dades, interpretar-les i obtenir conclusions raonades."],
        "4t": ["Anàlisi i interpretació de taules i gràfics estadístics de dues variables qualitatives, quantitatives discretes i quantitatives contínues.", "Recollida i organització de dades de situacions contextualitzades, incloent de la vida quotidiana que involucrin dues variables.", "Generació de representacions gràfiques mitjançant l’ús de mitjans tecnològics adequats per a interpretar la informació estadística i obtenir conclusions raonades.", "Comparació de distribucions de dades atenent mesures de posició i dispersió", "Generació de representacions gràfiques mitjançant l’ús de mitjans tecnològics adequats per a interpretar la informació estadística i obtenir conclusions raonades."],
      },
      "Sentit estocàstic - Predictibilitat i incertesa": {
        "1r-2n-3r": ["Identificació de fenòmens deterministes i aleatoris.", "Interpretació de la probabilitat com a mesura associada a la incertesa d’experiments aleatoris.", "Planificació i realització d’experiències senzilles per analitzar el comportament de fenòmens aleatoris.", "Assignació de la probabilitat a partir de l’experimentació i el concepte de freqüència relativa.", "Anàlisi de l’origen de la teoria de la probabilitat (Fermat i Pascal) en el context dels jocs d’atzar.", "Assignació de probabilitats mitjançant la regla de Laplace."],
        "4t": ["Planificació i realització d’experiments simples i compostos per a estudiar el comportament de fenòmens aleatoris.", "Aplicació del càlcul de probabilitats per a prendre decisions fonamentades en diferents contextos, aplicant la regla de Laplace i tècniques de recompte en experiments simples i compostos."],
      },
      "Sentit socioemocional - Creences, actituds i emocions pròpies": {
        "1r-2n-3r": ["Desenvolupament de la curiositat, la iniciativa, la perseverança i la resiliència cap a l’aprenentatge de les matemàtiques.", "Gestió de les emocions que intervenen en l’aprenentatge com l’autoconsciència i l’autoregulació.", "Desenvolupament de la flexibilitat cognitiva per acceptar un canvi d’estratègia quan sigui necessari i transformar l’error en una oportunitat d’aprenentatge i al seu torn, interpretar cada problema resolt com una oportunitat per generar noves preguntes."],
        "4t": ["Desenvolupament de la curiositat, la iniciativa, la perseverança i la resiliència cap a l’aprenentatge de les matemàtiques.", "Gestió de les emocions que intervenen en l’aprenentatge com l’autoconsciència i l’autoregulació.", "Desenvolupament de la flexibilitat cognitiva per acceptar un canvi d’estratègia quan sigui necessari i transformar l’error en una oportunitat d’aprenentatge i al seu torn, interpretar cada problema resolt com una oportunitat per generar noves preguntes."],
      },
      "Sentit socioemocional - Treball en equip, inclusió, respecte i diversitat": {
        "1r-2n-3r": ["Selecció de tècniques cooperatives per compartir i construir coneixement de manera col·lectiva.", "Ús d’estratègies de gestió i presa de decisions adequades per a resoldre situacions pròpies del treball en equip.", "Assumpció de responsabilitats i participació activa per optimitzar el treball en equip."],
        "4t": ["Selecció de tècniques cooperatives per compartir i construir coneixement de manera col·lectiva.", "Ús d’estratègies de gestió i presa de decisions adequades per a resoldre situacions pròpies del treball en equip.", "Assumpció de responsabilitats i participació activa per optimitzar el treball en equip."],
      },
    },
  },
  "Tecnologia i Digitalització": {
    name: "Tecnologia i Digitalització",
    courseKeys: ["1r-2n-3r", "4t"],
    courseLabels: {"1r-2n-3r": "1r, 2n i 3r ESO", "4t": "4t ESO"},
    blocs: {
      "Procés de resolució de problemes i de projectes": {
        "1r-2n-3r": ["Aplicació d’estratègies, tècniques i marcs de resolució de problemes en diferents contextos i les seves fases.", "Aplicació d’estratègies de cerca crítica d’informació per a la recerca i la definició de problemes plantejats.", "Anàlisi de productes i de sistemes tecnològics per a la construcció de coneixement des de diferents enfocaments i àmbits.", "Anàlisi i disseny d’estructures per a la construcció de models.", "Anàlisi i disseny de sistemes mecànics bàsics. Muntatges físics i/o ús de simuladors.", "Muntatge d’esquemes i circuits elèctrics o electrònics, físics o simulats.", "Interpretació, càlcul, disseny i aplicació en projectes.", "Identificar les característiques dels materials d’ús tecnològic i el seu impacte ambiental.", "Utilització d’eines i tècniques de manipulació i mecanització de materials per a la construcció d’objectes i de prototips. Iniciació a la fabricació digital. Aplicació de les normes de seguretat i d’higiene.", "Desenvolupament de l’emprenedoria, la resiliència, la perseverança i la creativitat per resoldre problemes des d’una perspectiva interdisciplinària."],
        "4t": ["Aplicació d’estratègies de gestió de projectes col·laboratius i de tècniques de resolució de problemes iteratives.", "Cerca, comparació i estudi de les necessitats del centre educatiu, dels àmbits local i regional, etc. per al plantejament de projectes col·laboratius o cooperatius.", "Implementació de diferents tècniques d’ideació per a la resolució de problemes.", "Anàlisi del cicle de vida d’un producte i identificació de les diferents fases."],
      },
      "Procés de resolució de problemes i de projectes - Operadors tecnològics": {
        "1r-2n-3r": [],
        "4t": ["Representació, anàlisi, disseny, simulació i muntatge de circuits pneumàtics bàsics amb components que compleixin una determinada funció en un mecanisme o màquina.", "Identificació dels components electrònics analògics bàsics i la seva simbologia, amb l’anàlisi i el muntatge físic i simulats de circuits elementals", "Representació, anàlisi, disseny, simulació i muntatge de circuits electrònics digitals senzills i la seva aplicació.", "Selecció i utilització de diferents productes i materials per a la resolució de problemes.", "Selecció de materials tot utilitzant diverses estratègies, d’acord amb les seves propietats o requisits, per a la resolució de problemes i projectes.", "Valoració, selecció i utilització de diferents tècniques de fabricació en la resolució de problemes i projectes.", "Utilització de diferents eines de disseny i de fabricació assistit per ordinador en 2D i 3D, per a la representació i/o fabricació de peces aplicades a projectes.", "Valoració, selecció i utilització de diferents tècniques de fabricació manual i mecànica, en les aplicacions pràctiques.", "Implementació, en aplicacions pràctiques, de tècniques de fabricació digital, com la impressió 3D i el tall.", "Resolució de problemes amb actitud emprenedora, creativa i perseverant, des d’una perspectiva interdisciplinària de l’activitat tecnològica, tot fomentant la satisfacció i l’interès pel treball i la qualitat del mateix.", "Documentació, presentació i difusió de projectes, integrant diferents elements, tècniques i eines. Utilització d’una comunicació efectiva basada en una entonació, expressió, gestió del temps i adaptació del discurs i amb un ús de llenguatge inclusiu i lliure d’estereotips de gènere.", "Anàlisi, descripció i relació dels diferents elements mecànics, electrònics i pneumàtics aplicats a la robòtica, fent ús del muntatge físic o simulat."],
      },
      "Pensament computacional, programació /automatització i robòtica": {
        "1r-2n-3r": ["Resolució de processos mitjançant algorísmica i representació amb diagrames de flux.", "Implementació d’aplicacions informàtiques senzilles per a ordinador i dispositius mòbils i iniciació a la intel·ligència artificial.", "Disseny i implementació de sistemes de control programat.", "Muntatge físic i/o ús de simuladors i programació senzilla de dispositius. Internet de les coses.", "Iniciació a la robòtica. Muntatge i control programat de robots o dispositius programables de manera física o mitjançant simuladors.", "Aplicació de tècniques de depuració iteratives d’un programa informàtic per a la identificació de l’error com a part del procés d’aprenentatge i afirmació de l’autoconfiança."],
        "4t": ["Disseny i implementació d’aplicacions informàtiques per a ordinador i dispositius mòbils. Utilització de simuladors informàtics en la verificació i comprovació del funcionament dels sistemes dissenyats. Introducció de les aplicacions de la intel·ligència artificial i al tractament massiu de dades (big data). Ús d’espais digitals compartits i discos virtuals per l’emmagatzematge i compartició d’informació.", "Utilització de diferents components de sistemes de control programat: controladors, sensors i actuadors, que permetin l’optimització dels recursos i apliquin l’automatització i la robotització.", "Integració de les telecomunicacions en els sistemes de control digital; Internet de les coses amb els diferents elements, comunicacions i control, mitjançant l’aplicació pràctica per donar resposta a les necessitats personals o col·lectives.", "Disseny, construcció i control de robots senzills de manera física o simulada per al desenvolupament de tasques reals o fictícies."],
      },
      "Tecnologia sostenible": {
        "1r-2n-3r": ["Desenvolupament tecnològic: creativitat, innovació, investigació, obsolescència i impacte social i ambiental. Utilització ètica de les aplicacions i les tecnologies emergents.", "Aplicació de la tecnologia sostenible. Valoració crítica de la contribució a la consecució dels objectius de desenvolupament sostenible.", "Valoració de l’energia com a factor tecnològic clau del desenvolupament sostenible. Eficiència energètica, consum responsable i energies renovables."],
        "4t": ["Selecció de materials i disseny de processos, productes i sistemes tecnològics per a una sostenibilitat mediambiental, econòmica i social.", "Anàlisi i valoració de la mobilitat sostenible dels diferents mitjans de transport públic o privat.", "Cerca, aplicació i disseny d’estratègies d’estalvi energètic en edificis. Anàlisi de l’arquitectura bioclimàtica i sostenible en la reducció de l’impacte ambiental tant en l’àmbit local com en el global.", "Justificació de l’energia com a factor tecnològic clau del desenvolupament sostenible. Eficiència energètica, consum responsable i energies renovables.", "Creació de comunitats obertes d’aprenentatge, foment del voluntariat tecnològic i la implementació de projectes de servei a la comunitat amb un compromís actiu tant en l’àmbit local com en el global."],
      },
    },
  },
  "Educació en Valors Cívics i Ètics": {
    name: "Educació en Valors Cívics i Ètics",
    courseKeys: ["4t"],
    courseLabels: {"4t": "4t ESO"},
    blocs: {
      "Autoconeixement i autonomia moral": {
        "4t": ["Investigació ètica i resolució de problemes complexos a partir del pensament crític i filosòfic en situacions de debat a l’aula.", "Construcció de l’autoconcepte i la identitat personal en un context plural, a partir de la identificació de les pròpies capacitats, tant físiques i sensorials, com cognitives i emocionals.", "Manifestació d’actituds de superació personal, basades en la resiliència i la perseverança, en la relació amb un mateix, amb els altres i amb l’entorn.", "Desenvolupament crític de l’autonomia i la responsabilitat, tenint en compte la voluntat i el judici moral en diversos entorns amb gran varietat d’interessos.", "Valoració de l’ètica com a principi de les nostres accions i de l’establiment de normes presents a la societat, de forma crítica i raonada.", "Identificació i presa de consciència dels riscos que implica l’ús acrític, l’abús i la sobreexposició a les xarxes socials en la preservació de la privacitat i la vulneració de la pròpia identitat i la dels altres en la societat actual.", "Identificació i presa de consciència de les conseqüències d’un mal ús i abús de les noves tecnologies, en el temps de lleure, que poden derivar en conductes addictives relacionades tant amb l’ús dels dispositius com amb els continguts que ofereixen.", "Anàlisi del conflicte entre moralitat i legalitat, tenint en compte els drets individuals en un context global."],
      },
      "Societat, justícia i democràcia": {
        "4t": ["Valoració del diàleg i de l’argumentació en la presa democràtica de decisions i en la resolució pacífica de conflictes en la relació amb els altres i en contextos diversos.", "Investigació sobre la naturalesa social i política de l’ésser humà, i la comprensió crítica i l’ús dels conceptes de «llei», «poder», «sobirania», «justícia», «estat», «democràcia» i «drets humans» en el context social.", "Anàlisi de les formes d’estat i tipus de govern, així com dels principis, procediments i institucions democràtics fins a arribar a la memòria democràtica en projectes d’aula que hi estiguin vinculats.", "Estudi de la naturalesa i origen de la societat, i de conceptes relacionats, com «competència», «cooperació», «egoisme» i «altruisme» a escala relacional i social.", "Integració de la constitució històrica de les diferents generacions de drets humans, en especial dels drets de l’infant, atenent a la seva rellevància ètica en la relació entre les persones tant en el centre educatiu com fora d’aquest.", "Anàlisi i diàleg raonat sobre la desigualtat econòmica i la lluita contra la pobresa; el dret a la feina, la salut, l’educació i la justícia, i la promoció del comerç just en una societat globalitzada.", "Presa de consciència de la importància de les accions individuals i col·lectives i de la contribució de l’Estat, dels organismes internacionals, de les ONG i de les ONGD a favor de la pau, la seguretat i la cooperació internacional en la societat actual.", "Promoció de l’associacionisme i el voluntariat, i la participació democràtica en el marc d’uns codis deontològics i ètics en el context social proper.", "Relació entre el dret internacional i la ciutadania global en un món actual interconnectat.", "Identificació de les estructures socials i dels grups de pertinença que conformen una societat en propostes d’aula que ho requereixin.", "Reflexió sobre la bioètica, el desafiament de la intel·ligència artificial, les propostes transhumanistes i els fins i límits ètics de la investigació científica en la societat moderna i global.", "Manifestació d’una posició informada i èticament fonamentada sobre el valor i pertinència dels drets humans, el respecte per la diversitat etnicocultural, la consideració dels béns públics globals i la percepció del valor social dels impostos en el context proper.", "Reconeixement de la història democràtica de l’Estat espanyol, les seves institucions, la realitat democràtica i institucional catalana, organismes internacionals i associacions civils dirigides a assolir la pau, la seguretat i la solidaritat entre els pobles i les persones, en projectes d’aula que hi estiguin vinculats."],
      },
      "Sostenibilitat i ètica ambiental": {
        "4t": ["Identificació de l’ecodependència i la interconnexió entre els estils de vida i l’entorn, en situacions quotidianes.", "Anàlisi crítica dels límits del planeta, l’emergència climàtica i la petjada ecològica de les accions humanes en el món actual.", "Proposta d’accions locals i globals sobre la relació individu-natura des de diferents perspectives en situacions de debat crític a l’aula.", "Creació d’estratègies per al desenvolupament sostenible en un context local i global.", "Debat sobre diversos plantejaments ètics, científics i polítics en relació amb els problemes ecosocials i ambientals, en el marc de projectes realitzats a l’aula.", "Establiment d’un compromís actiu amb la protecció de la vida animal i el medi ambient des de la perspectiva biocèntrica en situacions de debat a l’aula.", "Desenvolupament i promoció d’hàbits i actuacions individuals i col·lectives en el marc dels objectius de desenvolupament sostenible en un context local i global.", "Integració de l’ecofeminisme, l’economia circular i l’economia blava en el propi projecte vital i en situacions de la vida quotidiana.", "Consolidació i promoció d’hàbits de vida sostenible tenint en compte el consum responsable i de productes de proximitat, la gestió òptima dels recursos naturals i dels residus, i de la mobilitat en l’orientació que donem al nostre estil de vida.", "Coneixement de la sobirania alimentària i d’estratègies que afavoreixen la reducció del malbaratament alimentari en un context global."],
      },
      "Educació emocional": {
        "4t": ["Presa de consciència, expressió assertiva i regulació de les emocions pròpies i alienes, basades en una autoestima ajustada, com a aspecte determinant en la millora del benestar individual i col·lectiu amb un mateix i amb els altres.", "Construcció i valoració de relacions afectives saludables a partir del reconeixement de la igualtat i del respecte mutu, com a factors que les determinen, en el context social.", "Integració crítica i constructiva de la interdependència entre els aspectes afectius i el desenvolupament de la sexualitat, implicant-se de forma responsable en la millora del benestar emocional individual i col·lectiu en les relacions entre iguals.", "Manifestació d’actituds de respecte i empatia amb relació als drets LGTBIQ+ i a la pluralitat cultural, política, religiosa i altres, com a condicions essencials per a la millora del benestar individual i col·lectiu en una societat moderna amb diversitat d’opcions.", "Valoració de situacions de conflicte i desenvolupament d’accions de prevenció enfront les relacions abusives i el maltractament entre iguals en l’entorn educatiu."],
      },
      "Educació emocional - Gestió personal i emocional": {
        "4t": ["Organització i participació activa de gran varietat de situacions motrius essent capaç d’assumir diferents rols.", "Desenvolupament de la consciència, regulació i autonomia emocional com a capacitat de reconèixer, gestionar i autoregular les emocions (superació, perseverança, estrès, autocontrol en les situacions de contacte…) en contextos fisicoesportius."],
      },
      "Educació emocional - Habilitats socials i valors": {
        "4t": ["Aplicació d’habilitats socials que fomentin la convivència i la cohesió social en tot tipus de situacions.", "Comunicació assertiva, respecte per la resta i col·laboració i cooperació responsable i activa en contextos motrius diversos.", "Interiorització dels valors educatius de l’esport en el creixement personal."],
      },
      "Educació emocional - Activitat física, gènere i discriminació": {
        "4t": ["Responsabilitat i compromís actiu davant d’estereotips, actuacions discriminatòries de gènere, ètniques, socioeconòmiques, de competència motriu i qualsevol tipus de violència que es pugui donar.", "Promoció de la igualtat de gènere en la pràctica de qualsevol esport, en la difusió en mitjans de comunicació i en el reconeixement de referents esportius.", "Influència social, cultural i econòmica de l’esport en la societat actual: aspectes positius i negatius."],
      },
    },
  },
  "Educació Física": {
  "name": "Educació Física",
  "courseKeys": [
    "1r-2n",
    "3r-4t"
  ],
  "courseLabels": {
    "1r-2n": "1r i 2n ESO",
    "3r-4t": "3r i 4t ESO"
  },
  "blocs": {
    "Vida activa i saludable - Activitat física saludable": {
      "1r-2n": [
        "Identificació dels aspectes importants per a la planificació de l'activitat física: parts d'una sessió d'activitat física (fase d'activació, fase d'assoliment d'objectius o part principal, i tornada a la calma), els principis bàsics de l'entrenament (adaptació, continuïtat i progressió), valoració del nivell individual, la freqüència cardíaca com a indicador d'intensitat i recuperació, càrrega d'entrenament (volum i intensitat)...",
        "Planificació de seqüències senzilles d'activitat física adaptades a la pròpia realitat i objectius personals.",
        "Desenvolupament i manteniment de la condició física i de la pràctica habitual d'activitat física com una font de salut."
      ],
      "3r-4t": [
        "Disseny i planificació de l'entrenament: fase d'activació, pla de treball, proves de valoració de la condició física, control de la intensitat, de les càrregues de treball i dosificació de l'esforç, temporització i continuïtat, progressió, fases de treball i recuperació.",
        "Autoregulació i millora en el desenvolupament de la condició física: qualitats físiques, característiques, efectes i mètodes d'entrenament."
      ]
    },
    "Vida activa i saludable - Hàbits saludables": {
      "1r-2n": [
        "Importància del valor nutricional dels aliments per mantenir una alimentació i una hidratació saludables.",
        "Reconeixement de les malalties associades als trastorns alimentaris.",
        "Pràctica de tècniques de millora de la postura corporal, respiració i relaxació aconseguint el benestar físic i mental.",
        "Adopció progressiva d'hàbits higiènics i saludables (hores de son, pràctica regular d'activitat física..) que assegurin la qualitat de vida.",
        "Anàlisi dels efectes que poden suposar els comportaments i hàbits saludables i no saludables en la salut.",
        "Valoració de l'activitat física com a font de gaudi, d'alliberació de tensions i benestar.",
        "Identificació de les característiques que ha de tenir la roba, el calçat i el material esportiu per a la bona pràctica d'activitat física."
      ],
      "3r-4t": [
        "Anàlisis crític del valor nutricional dels aliments i de la publicitat d'aquests, essent conscient dels aliments saludables i dels que no ho són, adaptant-hi els hàbits alimentaris.",
        "Reconeixement de les actituds i comportaments que les malalties associades a trastorns alimentaris —complex d'Adonis (vigorexia), anorèxia, bulímia— poden comportar i conscienciació del risc que poden suposar per a la salut.",
        "Utilització autònoma de tècniques de millora de la postura corporal, la respiració i la relaxació aconseguint el benestar físic i mental.",
        "Valoració i ús d'hàbits higiènics i conductes saludables (hores de son, pràctica regular d'activitat física) que assegurin la qualitat de vida.",
        "Conscienciació del risc i de les conseqüències que poden suposar algunes pràctiques, comportaments i hàbits poc saludables (drogues, alcohol, suplements, dopatge).",
        "Valoració i integració de l'activitat física com a font de gaudi, d'alliberació de tensions i benestar."
      ]
    },
    "Vida activa i saludable - Primers auxilis i prevenció de lesions": {
      "1r-2n": [
        "Apreciació de situacions que poden comportar risc en la pràctica d'activitat física: mesures de seguretat i possibles lesions.",
        "Actuacions bàsiques dels primers auxilis, tècnica PAS (protegir, ajudar, socorrer), protocol 112 i suport vital bàsic (SVB) en accidents durant la pràctica d'activitats físiques."
      ],
      "3r-4t": [
        "Aplicació de protocols, mesures de seguretat i prevenció de lesions en la pràctica d'activitat física.",
        "Identificació de l'ergonomia corporal com a mesura de la prevenció de lesions i optimització del moviment.",
        "Actuacions i tècniques davant d'accidents, reanimació mitjançant desfibril·lador, protocol de reanimació cardiopulmonar, maniobra de Heimlich, senyals d'ictus..."
      ]
    },
    "Vida activa i saludable - Recursos digitals al servei de la pràctica esportiva": {
      "1r-2n": [
        "Reconeixement dels recursos i aplicacions digitals com una eina útil per a la pràctica d'activitat física."
      ],
      "3r-4t": [
        "Utilització d'eines, recursos i aplicacions digitals per a la gestió de la pràctica d'activitat física."
      ]
    },
    "Resolució de problemes en situacions motrius - Esquema corporal": {
      "1r-2n": [
        "Desenvolupament de les capacitats perceptivomotrius per a la millora de la resposta motriu en diferents situacions motrius i esportives.",
        "Utilització conscient del cos mostrant control i domini corporal en les manifestacions fisicoesportives que es realitzen."
      ],
      "3r-4t": [
        "Ús de les capacitats perceptivomotrius en la resolució eficient de tasques individuals de certa complexitat.",
        "Utilització conscient del cos mostrant control i domini corporal en les manifestacions fisicoesportives que es realitzen."
      ]
    },
    "Resolució de problemes en situacions motrius - Habilitats motrius bàsiques i específiques (tècnica, tàctica i estratègia)": {
      "1r-2n": [
        "Consolidació de les diferents habilitats motrius bàsiques associades a l'activitat motriu.",
        "Execució d'habilitats tècniques associades a diferents esports individuals, d'adversari i col·lectius en joc reduït.",
        "Posada en pràctica de les habilitats tàctiques comunes dels esports individuals, d'adversari i col·lectius en situacions de joc reduït.",
        "Assimilació dels principis bàsics de la fase ofensiva i defensiva dels esports d'equip en situacions de joc reduït.",
        "Planificació d'estratègies prèvies d'atac i defensa en funció de les característiques dels integrants de l'equip en jocs o esports d'equip.",
        "Pràctica de diferents jocs i esports individuals, d'adversari amb contacte i sense contacte i col·lectius respectant el reglament bàsic, les normes i les persones implicades en el joc."
      ],
      "3r-4t": [
        "Identificació i correcció d'errors freqüents en l'execució de diferents habilitats tècniques d'esports individuals, d'adversari i col·lectius en situacions de joc reduït o joc real.",
        "Aprofundiment en l'execució de diferents habilitats tècniques d'esports individuals, d'adversari i col·lectius en situacions de joc reduït i joc real.",
        "Pràctica d'esports inclosos en el programa dels Jocs Paralímpics i altres modalitats d'esport adaptat emfatitzant-ne els valors.",
        "Introducció a diferents esports alternatius com una manera d'entendre la pràctica esportiva més enllà dels esports mediàtics.",
        "Posada en pràctica de les habilitats tècniques, tàctiques, estratègiques dels esports individuals, d'adversari i col·lectius en situacions de joc reduït i real.",
        "Resolució eficaç de situacions d'atac i/o defensa en situacions de joc reduït o joc real en els esports d'equip.",
        "Planificació d'estratègies prèvies d'atac i defensa en funció de les característiques dels integrants de l'equip en jocs o esports d'equip.",
        "Pràctica de diferents jocs i esports individuals, d'adversari, col·lectius i adaptats respectant el reglament bàsic, les normes i les persones implicades en el joc."
      ]
    },
    "Resolució de problemes en situacions motrius - Resolució de reptes i projectes motors": {
      "1r-2n": [
        "Esforç per completar reptes individuals i en grup adaptant la pròpia condició física als requeriments de les diferents propostes plantejades.",
        "Realització de l'acció o de la tasca en situacions cooperatives mitjançant pautes grupals per optimitzar els recursos motrius del grup.",
        "Resolució de reptes i projectes motors amb originalitat i riquesa creativa de manera individual i en grup.",
        "Valoració del treball personal durant el procés i del resultat final en la consecució del repte.",
        "Utilització de materials alternatius en jocs i esports valorant la riquesa motriu de la pràctica fisicoesportiva."
      ],
      "3r-4t": [
        "Esforç per completar reptes individuals i en grup adaptant la pròpia condició física als requeriments de les diferents propostes plantejades.",
        "Participació equilibrada en el grup de treball durant el procés de resolució de reptes i/o projectes motors.",
        "Resolució eficient de tasques de certa complexitat en situacions motrius individuals i/o en grup.",
        "Creació de reptes i projectes motors amb possibles solucions d'acord a les capacitats, les habilitats i els recursos individuals i/o del grup.",
        "Valoració del treball personal durant el procés i del resultat final en la consecució del repte.",
        "Organització de competicions esportives utilitzant diferents tipologies i modalitats de competicions."
      ]
    },
    "Activitats motrius lúdiques, culturals i expressives - Jocs i danses populars": {
      "1r-2n": [
        "Aportacions dels jocs i danses populars a l'herència cultural pròpia i d'altres cultures.",
        "Pràctica de jocs i danses tradicionals d'arreu del món valorant l'herència cultural pròpia i d'altres cultures."
      ],
      "3r-4t": []
    },
    "Activitats motrius lúdiques, culturals i expressives - Expressió i comunicació corporal": {
      "1r-2n": [
        "Ús de tècniques d'expressió i comunicació en diferents contextos.",
        "Ús de tècniques d'imitació i gestualització per expressar emocions, missatges i situacions quotidianes.",
        "Valoració i pràctica de les activitats ritmicomusicals com a eina expressiva i comunicativa.",
        "Creació i representació de composicions individuals i col·lectives amb i sense base musical.",
        "Influència social de les activitats motrius culturals i artístiques en la societat actual: aspectes positius i negatius."
      ],
      "3r-4t": [
        "Ús i adaptació personal de tècniques d'expressió i comunicació en diferents contextos.",
        "Dramatització de situacions diverses utilitzant tècniques d'expressió i comunicació corporal.",
        "Pràctica i creació d'activitats ritmicomusicals com a eina expressiva i comunicativa.",
        "Representació i creació d'espectacles i esdeveniments de caràcter artisticoexpressiu.",
        "Aplicació de les tècniques de circ amb i sense material (acrobàcies, equilibris, malabars, clown…) en espectacles i representacions."
      ]
    },
    "Interacció amb l'entorn en el temps de lleure - Consum i conservació responsable dels recursos materials i d'espai": {
      "1r-2n": [
        "Autoconstrucció de materials alternatius i complementaris per a la pràctica d'activitat física i esports.",
        "Pràctica d'activitat física en el medi natural tenint cura i conservant l'espai de pràctica."
      ],
      "3r-4t": [
        "Manteniment i reparació de material esportiu per a la pràctica fisicoesportiva.",
        "Ús sostenible i manteniment dels recursos naturals i urbans per a la pràctica d'activitat física.",
        "Cura i conservació del medi natural i urbà durant la pràctica d'activitat física."
      ]
    },
    "Interacció amb l'entorn en el temps de lleure - Normes i mesures de seguretat": {
      "1r-2n": [
        "Realització de desplaçaments i activitats respectant les normes vials.",
        "Realització d'activitats en el medi natural respectant les normes de seguretat i les mesures de prevenció d'accidents.",
        "Ús d'eines, equipament i tècniques adequades durant la pràctica d'activitat física al medi natural."
      ],
      "3r-4t": [
        "Aplicació de normes i mesures col·lectives de prevenció i seguretat per a la realització d'activitats en el medi natural i urbà.",
        "Gestió del risc propi i del de les altres persones en la realització d'activitats en el medi natural.",
        "Ús d'eines, equipament i tècniques adequades durant la pràctica d'activitat física al medi natural."
      ]
    },
    "Interacció amb l'entorn en el temps de lleure - Espais per a la pràctica esportiva en l'entorn proper": {
      "1r-2n": [
        "Aprofitament d'espais i recursos urbans (parkour, skate…) i naturals (orientació, plogging, activitats aquàtiques…) per realitzar activitats físiques.",
        "Valoració de les possibilitats que ofereixen les activitats en el medi natural i l'entorn per practicar activitat física en el temps de lleure."
      ],
      "3r-4t": [
        "Ús d'espais urbans per realitzar activitat física per millorar la condició física (crossfit, gimnasos urbans, circuits de calistència, entre altres).",
        "Disseny i organització d'activitats físiques en el medi natural i urbà.",
        "Utilització de les possibilitats que ens ofereix l'entorn per practicar activitat física en el temps de lleure."
      ]
    },
    "Valors, autoregulació emocional i interacció social en situacions motrius - Gestió personal i emocional": {
      "1r-2n": [
        "Participació activa en tot tipus de situacions motrius essent capaç d'assumir diferents rols.",
        "Desenvolupament de la consciència, la regulació i l'autonomia emocionals com a capacitat de reconèixer, gestionar i autoregular les emocions (superació, perseverança, estrès, autocontrol en les situacions de contacte…) en contextos fisicoesportius."
      ],
      "3r-4t": [
        "Organització i participació activa de gran varietat de situacions motrius essent capaç d'assumir diferents rols.",
        "Desenvolupament de la consciència, la regulació i l'autonomia emocionals com a capacitat de reconèixer, gestionar i autoregular les emocions (superació, perseverança, estrès, autocontrol en les situacions de contacte…) en contextos fisicoesportius."
      ]
    },
    "Valors, autoregulació emocional i interacció social en situacions motrius - Habilitats socials i valors": {
      "1r-2n": [
        "Desenvolupament progressiu d'habilitats socials (escolta activa, diàleg, resolució de conflictes, entesa, compromís social) en situacions motrius col·lectives.",
        "Adopció d'habilitats personals i socials que permetin col·laborar i cooperar en contextos motrius diversos.",
        "Interiorització de l'esportivitat com a valor per sobre de la consecució de resultats."
      ],
      "3r-4t": [
        "Aplicació d'habilitats socials que fomentin la convivència i la cohesió social en tot tipus de situacions.",
        "Comunicació assertiva, respecte als altres i col·laboració i cooperació responsable i activa en contextos motrius diversos.",
        "Interiorització dels valors educatius de l'esport en el creixement personal."
      ]
    },
    "Valors, autoregulació emocional i interacció social en situacions motrius - Activitat física, gènere i discriminació": {
      "1r-2n": [
        "Valoració d'aspectes positius i negatius de l'esport i l'activitat física en l'actualitat: competició vers cooperació, principis d'igualtat i solidaritat, aportació individual envers l'equip.",
        "Reconeixement de les discriminacions de gènere, ètniques i de la diversitat motriu en la pràctica de l'activitat física i esportiva."
      ],
      "3r-4t": [
        "Influència social, cultural i econòmica de l'esport en la societat actual: aspectes positius i negatius.",
        "Responsabilitat i compromís actiu davant d'estereotips, actuacions discriminatòries de gènere, ètniques, socioeconòmiques, de competència motriu i qualsevol tipus de violència que es pugui donar.",
        "Promoció de la igualtat de gènere en la pràctica de qualsevol esport, en la difusió en mitjans de comunicació i en el reconeixement de referents esportius."
      ]
    }
  }
},
  "Biologia i Geologia": {
  "name": "Biologia i Geologia",
  "courseKeys": [
    "1r-2n-3r",
    "4t"
  ],
  "courseLabels": {
    "1r-2n-3r": "1r, 2n i 3r ESO",
    "4t": "4t ESO"
  },
  "blocs": {
    "Projecte Científic": {
      "1r-2n-3r": [
        "Formulació de preguntes, hipòtesis i conjectures científiques.",
        "Estratègies d'utilització d'eines digitals per a la cerca d'informació, col·laboració i comunicació de processos, resultats o idees en diferents formats (presentació, gràfica, vídeo, pòster, informe…) en el context de problemes investigables.",
        "Reconeixement i utilització de fonts fiables d'informació científica.",
        "Disseny de recerques, experiments i estudis observacionals, per respondre a una qüestió científica determinada fent servir instruments i espais (laboratori, aules, entorn…) de manera adequada.",
        "Elaboració de maquetes i models per a la representació i comprensió de conceptes, processos o elements de la natura.",
        "Utilització de diferents mètodes d'observació i presa de dades de fenòmens naturals en el context de problemes investigables.",
        "Utilització de diferents mètodes estadístics d'anàlisi de resultats i diferenciació entre correlació i causalitat.",
        "Contribució de les grans científiques i científics al desenvolupament de les ciències biològiques i geològiques."
      ],
      "4t": [
        "Formulació de preguntes, hipòtesis i conjectures científiques.",
        "Estratègies d'utilització d'eines digitals per a la cerca d'informació, col·laboració i comunicació de processos, resultats o idees en diferents formats (presentació, gràfica, vídeo, pòster, informe…) en el context de problemes investigables.",
        "Reconeixement i utilització de fonts fiables d'informació científica.",
        "Argumentació sobre l'essencialitat del control experimental amb relació a la validesa científica dels resultats experimentals.",
        "Disseny i realització d'experiments que impliquin control experimental (negatiu i positiu), per respondre a una qüestió científica determinada utilitzant els instruments i espais (laboratori, aules, entorn…) de forma adequada i precisa.",
        "Elaboració de maquetes i models per a la representació i comprensió de conceptes, processos o elements de la natura.",
        "Utilització de diferents mètodes d'observació i de recollida de dades de fenòmens naturals en el context de problemes investigables.",
        "Utilització de diferents mètodes estadístics d'anàlisi de resultats i diferenciació entre correlació i causalitat.",
        "Paper de les grans científiques i científics en el desenvolupament de les ciències biològiques i geològiques.",
        "Anàlisi de l'evolució històrica d'un descobriment científic determinat."
      ]
    },
    "Geologia": {
      "1r-2n-3r": [
        "Relació i diferenciació entre el concepte de roca i mineral.",
        "Ús d'estratègies de classificació de les roques sedimentàries, metamòrfiques i ígnies de l'entorn.",
        "Identificació d'algunes roques i minerals rellevants de l'entorn.",
        "Relació de determinats objectes i materials quotidians amb els minerals i les roques que s'utilitzen en la seva fabricació i anàlisi de casos amb impacte econòmic i social.",
        "Anàlisi de l'estructura bàsica de la geosfera i relació amb el seu origen."
      ],
      "4t": [
        "Relació i interpretació de l'estructura i dinàmica de la geosfera i les manifestacions externes a través de la tectònica de plaques.",
        "Investigació i anàlisi dels riscos naturals i la seva relació amb els processos geològics externs i interns."
      ]
    },
    "La cèl·lula": {
      "1r-2n-3r": [
        "Reflexió i justificació sobre la cèl·lula com a unitat estructural i funcional de tots els éssers vius, el cas dels virus.",
        "Diferenciació entre la cèl·lula procariota i l'eucariota i identificació dels organismes de què formen part.",
        "Diferenciació entre la cèl·lula animal i vegetal i relació amb l'estratègia nutritiva dels organismes de què formen part.",
        "Ús del microscopi i de diferents tècniques per a l'observació i la comparació de tipus de cèl·lules al microscopi.",
        "Relació entre el material genètic i les funcions que exerceix qualsevol tipus cel·lular."
      ],
      "4t": [
        "Interpretació del model simplificat de l'estructura de l'ADN i de l'ARN i relació amb la seva funció i síntesi."
      ]
    },
    "Genètica i Evolució (propi de 4t, requereix els sabers previs de La cèl·lula i Els éssers vius de 1r-2n-3r)": {
      "1r-2n-3r": [],
      "4t": [
        "Relació entre el material genètic i les característiques observables d'un organisme (especialment en humans) a través de les etapes de l'expressió gènica i diferenciació entre genotip i fenotip.",
        "Investigació sobre la naturalesa i mecanisme d'herència de malalties genètiques a partir de l'anàlisi de casos.",
        "Resolució de problemes senzills d'herència genètica de caràcters amb relació de dominància, recessivitat, de codominància, dominància incompleta i al·lelisme múltiple. Resolució de problemes relatius al mecanisme de determinació del sexe genètic i herència lligada a aquest mecanisme.",
        "Justificació de la importància de la mitosi i de la meiosi en el context de la interpretació del cicle cel·lular dels humans, del desenvolupament, creixement i reproducció.",
        "Argumentació sobre el paper de les mutacions a l'origen de la biodiversitat i la seva relació amb els processos evolutius.",
        "Interpretació dels fenòmens evolutius des de la perspectiva de diferents teories explicatives (lamarckiana, neodarwinista), anàlisi de casos."
      ]
    },
    "Els éssers vius": {
      "1r-2n-3r": [
        "Observació i identificació de les característiques distintives d'espècies representatives de l'entorn proper i ubicació dels principals grups taxonòmics corresponents.",
        "Ús d'estratègies per al reconeixement de les espècies més comunes dels ecosistemes de l'entorn (guies, claus dicotòmiques, eines digitals, visu…)."
      ],
      "4t": []
    },
    "Ecologia i sostenibilitat (propi del cicle 1r-2n-3r, sense correspondència a 4t)": {
      "1r-2n-3r": [
        "Identificació dels elements integrants de diferents ecosistemes de l'entorn, així com de les relacions intraespecífiques i interespecífiques que tenen.",
        "Reconeixement de la importància de la conservació dels ecosistemes, la biodiversitat i la implantació d'un model de desenvolupament sostenible. Anàlisi de la relació de la sostenibilitat amb alguns ODS (ODS 11. Ciutats i comunitats sostenibles; ODS 12. Consum i producció responsables; ODS 13. Acció climàtica).",
        "Anàlisi de les funcions de l'atmosfera i la hidrosfera i el seu paper essencial per a la vida a la Terra a partir dels impactes que genera l'activitat humana i dels riscos que se'n deriven.",
        "Descripció de la importància de diferents interaccions entre atmosfera, hidrosfera, geosfera i biosfera en processos clau per a la vida.",
        "Anàlisi de comportaments relacionats amb les causes del canvi climàtic i de les conseqüències sobre els ecosistemes i la vida de les persones. Anàlisi de la relació de la sostenibilitat amb alguns ODS (ODS 14. Vida submarina; ODS 15. Vida terrestre).",
        "Valoració de la importància dels hàbits i producció sostenibles (consum responsable, gestió de residus, respecte al medi ambient...)."
      ],
      "4t": []
    },
    "Cos humà (propi del cicle 1r-2n-3r, sense correspondència a 4t)": {
      "1r-2n-3r": [
        "Reflexió sobre les necessitats de l'organisme humà relatives a la seva supervivència i relació amb el conjunt d'aparells i sistemes d'òrgans que integren el cos humà.",
        "Relació entre l'anatomia, la fisiologia i la funció dels aparells i sistemes d'òrgans implicats en les diferents necessitats (nutrició, relació, reproducció).",
        "Investigació sobre situacions i problemes relatius a la salut relacionats amb l'anatomia i la fisiologia de l'organisme humà."
      ],
      "4t": []
    },
    "Hàbits saludables (propi del cicle 1r-2n-3r, sense correspondència a 4t)": {
      "1r-2n-3r": [
        "Comparació i valoració de dietes saludables i no recomanables a partir de la identificació dels seus components.",
        "Diferenciació entre sexe, gènere, identitat i orientació sexual i valoració de la importància del respecte vers la llibertat i la diversitat sexual.",
        "Investigació i reflexió sobre situacions relatives a les malalties de transmissió sexual i els embarassos no desitjats i la importància de la seva prevenció mitjançant l'ús d'anticonceptius i pràctiques sexuals responsables.",
        "Investigació, reflexió i debat sobre situacions relatives a temes afectivosexuals, de manera respectuosa i responsable, avaluant idees preconcebudes mitjançant l'ús de fonts d'informació adequades.",
        "Investigació, reflexió i debat sobre situacions relatives al consum de drogues (incloent-hi aquelles de curs legal) destacant els efectes perjudicials sobre la salut dels consumidors i les persones del seu entorn proper.",
        "Valoració del desenvolupament d'hàbits encaminats a la conservació de la salut física, mental i social (higiene de son, hàbits posturals, ús responsable de les noves tecnologies, exercici físic, desplaçaments segurs, control de l'estrès...)."
      ],
      "4t": []
    },
    "Salut i malaltia (propi del cicle 1r-2n-3r, sense correspondència a 4t)": {
      "1r-2n-3r": [
        "Anàlisi dels factors que incideixen sobre la salut i de les causes de les malalties.",
        "Diferenciació entre malaltia i símptomes, exploració i diagnòstic a partir de casos concrets.",
        "Estudi dels tipus de fàrmacs més comuns a la farmaciola i diferenciació de la seva acció terapèutica.",
        "Diferenciació de les malalties infeccioses i raonament sobre les mesures de prevenció i tractaments en funció de l'agent causant i la reflexió sobre l'ús adequat dels antibiòtics i de l'automedicació.",
        "Anàlisi dels diferents tipus de mecanismes de defensa de l'organisme davant d'agents patògens (barreres externes i sistema immunitari) i el seu paper en la prevenció i la superació de malalties infeccioses.",
        "Argumentació sobre la importància de la vacunació en la prevenció de malalties i la millora de la qualitat de vida humana a partir de l'anàlisi de casos.",
        "Valoració de la importància dels trasplantaments i la donació d'òrgans."
      ],
      "4t": []
    },
    "La Terra en l'univers (propi de 4t, sense correspondència al cicle 1r-2n-3r)": {
      "1r-2n-3r": [],
      "4t": [
        "Descripció de l'origen de l'univers i la seva relació amb els astres que componen el sistema solar.",
        "Anàlisi i comparació de les hipòtesis sobre l'origen de la vida, arguments.",
        "Discussió sobre les investigacions principals en el camp de l'astrobiologia."
      ]
    }
  }
},
};

export const SABERS_AREAS_ESO = ["Física i Química", "Ciències Socials: Geografia i Història", "Llengua Catalana i Literatura", "Llengua Castellana i Literatura", "Llengua Estrangera", "Matemàtiques", "Tecnologia i Digitalització", "Educació en Valors Cívics i Ètics", "Educació Física", "Biologia i Geologia"];
