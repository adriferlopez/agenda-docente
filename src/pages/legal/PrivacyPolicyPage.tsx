import LegalLayout, { H2, P, Ul } from './LegalLayout';

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Política de Privacidad" updatedAt="27 de agosto de 2026">
      <P>
        Esta Política de Privacidad describe cómo Adrián Fernández López (NIF 48598772W, contacto:
        adrianfernandezlopezzz@gmail.com), como responsable del tratamiento de los datos de la cuenta y
        del uso de la aplicación, trata los datos personales al usar Agenda Docente IA, de acuerdo con el
        Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y
        garantía de los derechos digitales (LOPDGDD).
      </P>

      <H2>1. Qué datos tratamos</H2>
      <P>Según el uso que hagas de la aplicación, podemos tratar:</P>
      <Ul>
        <li>Datos de cuenta: nombre, correo electrónico y, si inicias sesión con Google, tu foto de perfil.</li>
        <li>
          Datos profesionales que introduces voluntariamente: horario escolar, asignaturas, programación
          semanal y anual, rúbricas, reuniones y tareas.
        </li>
        <li>
          Datos de tu alumnado, siempre introducidos por ti: nombre y apellidos, grupo/curso, notas y
          resultados de evaluación, y en su caso un indicador de si tiene una adaptación curricular
          asociada (sin más detalle médico o clínico que el que tú mismo decidas anotar en texto libre).
        </li>
        <li>Tu clave de la API de Gemini, si decides activar las funciones de inteligencia artificial (se guarda cifrada, ver apartado 5).</li>
        <li>Datos técnicos básicos de uso del servicio (registros de la aplicación, identificador de usuario) necesarios para su funcionamiento y seguridad.</li>
      </Ul>
      <P>
        No solicitamos ni pretendemos tratar categorías especiales de datos (salud, origen étnico,
        creencias, etc.). Si decides anotar información de este tipo en campos de texto libre (por ejemplo,
        en la descripción de una adaptación), lo haces bajo tu propia responsabilidad y en el ejercicio de
        tu función docente; te recomendamos limitar esos textos a lo estrictamente necesario.
      </P>

      <H2>2. Con qué finalidad y base legal</H2>
      <Ul>
        <li>Prestar el servicio (gestionar tu cuenta y el contenido que creas): ejecución de una relación contractual/de prestación de servicio (art. 6.1.b RGPD).</li>
        <li>Funciones de inteligencia artificial (Profi, generación de rúbricas, exámenes, comentarios, etc.): consentimiento (art. 6.1.a RGPD), que otorgas activando tu propia clave de la API de Gemini; puedes retirarlo en cualquier momento eliminando la clave desde Ajustes.</li>
        <li>Atender solicitudes de soporte o incidencias que nos envíes: consentimiento e interés legítimo en mantener el servicio.</li>
        <li>Cumplir obligaciones legales (por ejemplo, ante requerimientos de una autoridad).</li>
      </Ul>

      <H2>3. Datos de tu alumnado: quién es responsable</H2>
      <P>
        Cuando introduces datos de tu alumnado (nombres, notas, adaptaciones, etc.), el responsable del
        tratamiento de esos datos personales es el centro educativo o la administración educativa de la que
        dependes, no el titular de esta aplicación. Tú, como docente, actúas como usuario autorizado por tu
        centro para el tratamiento de esos datos en el ejercicio de tu función. Agenda Docente IA actúa
        como encargado técnico del tratamiento respecto a esos datos: los almacena y procesa únicamente
        siguiendo tus instrucciones (las acciones que realizas en la aplicación), con medidas de seguridad
        razonables, sin cederlos a terceros ni utilizarlos con fines distintos a prestarte el servicio.
      </P>
      <P>
        Antes de introducir datos de tu alumnado en cualquier herramienta digital de terceros, incluida
        esta, comprueba que tu centro o administración educativa lo permite conforme a sus propias
        políticas de protección de datos.
      </P>

      <H2>4. Con quién compartimos los datos (encargados del tratamiento)</H2>
      <P>Para prestar el servicio usamos los siguientes proveedores, que actúan como encargados del tratamiento bajo sus propios compromisos contractuales y de seguridad:</P>
      <Ul>
        <li>Google Firebase / Google Cloud (Google Ireland Ltd. / Google LLC): alojamiento de la base de datos, autenticación y funciones del servidor. Los datos de la aplicación se procesan en la región europea europe-west1 (Bélgica).</li>
        <li>Cloudflare: entrega del contenido web (frontend) de la aplicación.</li>
        <li>Google (API de Gemini): solo si activas las funciones de IA, y usando tu propia clave de API; las peticiones se procesan a través de la infraestructura de Google para generar la respuesta y no se conservan en nuestros servidores más allá del tiempo necesario para completar cada petición.</li>
      </Ul>
      <P>
        Cuando el tratamiento implica una transferencia de datos fuera del Espacio Económico Europeo (por
        ejemplo, hacia servidores de Google en EE. UU. para determinadas funciones), esta se realiza
        amparada en las garantías legales correspondientes (cláusulas contractuales tipo de la UE o el
        marco de adecuación UE-EE. UU. de protección de datos vigente en cada momento). No vendemos ni
        cedemos tus datos ni los de tu alumnado a terceros con fines publicitarios o comerciales.
      </P>

      <H2>5. Tu clave de la API de Gemini</H2>
      <P>
        Si activas las funciones de inteligencia artificial, tu clave personal se cifra con AES-256-GCM
        antes de guardarse y solo se descifra en el servidor en el momento de realizar cada petición a la
        IA; nunca se muestra de nuevo ni se comparte con otros usuarios ni con terceros.
      </P>

      <H2>6. Plazo de conservación</H2>
      <P>
        Conservamos tus datos y el contenido que creas mientras mantengas tu cuenta activa. Si eliminas tu
        cuenta desde Ajustes → Seguridad, se borran de forma permanente e irreversible tu perfil y todos
        los datos asociados (horario, programaciones, alumnado, notas, rúbricas, etc.).
      </P>

      <H2>7. Tus derechos</H2>
      <P>Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, portabilidad, oposición y limitación del tratamiento:</P>
      <Ul>
        <li>Acceso, rectificación y supresión de tus propios datos de cuenta: directamente desde Ajustes.</li>
        <li>Para cualquier otra solicitud, o dudas sobre el tratamiento de datos de tu alumnado: escríbenos a adrianfernandezlopezzz@gmail.com.</li>
      </Ul>
      <P>
        Si consideras que tus derechos no se han atendido correctamente, puedes presentar una reclamación
        ante la Agencia Española de Protección de Datos (AEPD), a través de{' '}
        <a href="https://www.aepd.es" target="_blank" rel="noreferrer" className="underline">www.aepd.es</a>.
      </P>

      <H2>8. Seguridad</H2>
      <P>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: acceso restringido
        por usuario (reglas de seguridad de Firestore), cifrado de las claves de API, comunicaciones cifradas
        (HTTPS) y actualizaciones periódicas de seguridad. Ningún sistema es completamente invulnerable;
        si detectamos una incidencia que afecte a tus datos, te lo comunicaremos conforme a la normativa
        aplicable.
      </P>

      <H2>9. Menores de edad</H2>
      <P>
        Agenda Docente IA está dirigida a personas docentes mayores de edad. No recogemos directamente
        datos de menores: los datos de alumnado se introducen por el propio docente en los términos
        descritos en el apartado 3.
      </P>
    </LegalLayout>
  );
}
